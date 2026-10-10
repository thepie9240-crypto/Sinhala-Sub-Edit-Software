const { app, BrowserWindow, Menu, ipcMain, dialog, nativeTheme } = require('electron');
const path = require('path');
const fs = require('fs');
const http = require('http');
const crypto = require('crypto');
const { spawn, execFile } = require('child_process');

app.commandLine.appendSwitch('enable-blink-features', 'AudioVideoTracks');

const unpacked = (p) => p.replace(`app.asar${path.sep}`, `app.asar.unpacked${path.sep}`);
const ffmpegPath = unpacked(require('ffmpeg-static'));

nativeTheme.themeSource = 'dark';

let win;
const stateFile = () => path.join(app.getPath('userData'), 'window-state.json');
function loadState() {
  try { return JSON.parse(fs.readFileSync(stateFile(), 'utf8')); } catch (e) { return {}; }
}
function createWindow() {
  const st = loadState();
  win = new BrowserWindow({
    width: st.width || 1400, height: st.height || 900, x: st.x, y: st.y, minWidth: 520, minHeight: 480,
    backgroundColor: '#18191d', title: 'Sinhala Subtitle Editor',
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(__dirname, 'preload.js') }
  });
  if (st.maximized) win.maximize();
  Menu.setApplicationMenu(null);
  win.loadFile(path.join(__dirname, 'index.html'));
  let t;
  const save = () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (!win || win.isDestroyed()) return;
      const nb = win.getNormalBounds();
      try { fs.writeFileSync(stateFile(), JSON.stringify({ ...nb, maximized: win.isMaximized() })); } catch (e) {}
    }, 400);
  };
  win.on('resize', save); win.on('move', save); win.on('close', () => { clearTimeout(t); try { const nb = win.getNormalBounds(); fs.writeFileSync(stateFile(), JSON.stringify({ ...nb, maximized: win.isMaximized() })); } catch (e) {} });
}

ipcMain.handle('write-file', (_e, p, content) => { fs.writeFileSync(p, content, 'utf8'); return true; });
ipcMain.handle('save-dialog', async (_e, def) => {
  const r = await dialog.showSaveDialog(win, { defaultPath: def, filters: [{ name: 'SRT Subtitle', extensions: ['srt'] }] });
  return r.canceled ? null : r.filePath;
});

// Lists every audio stream (parsed from `ffmpeg -i`, so no separate ffprobe binary is needed)
const chanCount = (l) => {
  const t = (l || '').toLowerCase();
  if (t.startsWith('mono')) return 1; if (t.startsWith('stereo')) return 2;
  const m = /^(\d+)\.(\d)/.exec(t); if (m) return parseInt(m[1], 10) + parseInt(m[2], 10);
  const n = parseInt(t, 10); return isNaN(n) ? 0 : n;
};
ipcMain.handle('probe', (_e, file) => new Promise((resolve, reject) => {
  execFile(ffmpegPath, ['-hide_banner', '-i', file], { maxBuffer: 16 * 1024 * 1024, windowsHide: true }, (err, stdout, stderr) => {
    const text = String(stderr || '');
    if (!/Input #0/.test(text)) return reject(new Error(text || (err && err.message) || 'ffmpeg failed'));
    let duration = 0;
    const dm = /Duration:\s*(\d+):(\d+):([\d.]+)/.exec(text);
    if (dm) duration = (+dm[1]) * 3600 + (+dm[2]) * 60 + parseFloat(dm[3]);
    const audio = []; let cur = null, inMeta = false;
    for (const line of text.split(/\r?\n/)) {
      const sm = /^\s*Stream #0:(\d+)(?:\[0x[0-9a-fA-F]+\])?(?:\(([^)]*)\))?[^:]*:\s*(\w+):\s*(.*)$/.exec(line);
      if (sm) {
        inMeta = false; cur = null;
        if (sm[3] === 'Audio') {
          const rest = sm[4];
          const parts = rest.split(',').map(x => x.trim());
          const codec = (parts[0].match(/^[\w-]+/) || [''])[0];
          const layout = (parts[2] || '').replace(/\s*\(.*$/, '');
          cur = { n: audio.length, index: parseInt(sm[1], 10), codec, profile: '', channels: chanCount(parts[2]), layout,
                  sampleRate: (parts[1] || '').replace(/\D/g, ''), lang: sm[2] && sm[2] !== 'und' ? sm[2] : '', title: '', isDefault: /\(default\)/.test(rest) };
          audio.push(cur);
        }
        continue;
      }
      if (/^\s*Metadata:/.test(line)) { inMeta = true; continue; }
      if (cur && inMeta) {
        const tm = /^\s*title\s*:\s*(.*)$/i.exec(line);
        if (tm) cur.title = tm[1].trim();
      }
    }
    resolve({ audio, duration });
  });
}));

// Live audio streaming: ffmpeg decodes ANY codec (AC3, DTS, TrueHD...) from the chosen track,
// starting at the requested time, and streams it as MP3 - so switching tracks is instant.
const token = crypto.randomBytes(16).toString('hex');
let audioPort = 0;
const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://127.0.0.1');
  if (u.searchParams.get('k') !== token) { res.writeHead(403); return res.end(); }
  const file = u.searchParams.get('f');
  const idx = parseInt(u.searchParams.get('i'), 10);
  const t = Math.max(0, parseFloat(u.searchParams.get('t')) || 0);
  if (!file || !fs.existsSync(file) || isNaN(idx)) { res.writeHead(404); return res.end(); }
  const args = ['-v', 'error', '-ss', t.toFixed(3), '-i', file, '-map', `0:${idx}`, '-vn', '-sn', '-dn',
    '-c:a', 'libmp3lame', '-q:a', '3', '-ac', '2', '-flush_packets', '1', '-f', 'mp3', 'pipe:1'];
  const p = spawn(ffmpegPath, args, { windowsHide: true, stdio: ['ignore', 'pipe', 'ignore'] });
  res.writeHead(200, { 'Content-Type': 'audio/mpeg', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'no-store' });
  p.stdout.pipe(res);
  res.on('close', () => { try { p.kill(); } catch (e) {} });
  p.on('close', () => res.end());
});
server.listen(0, '127.0.0.1', () => { audioPort = server.address().port; });
ipcMain.handle('audio-base', () => ({ port: audioPort, token }));

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
app.on('quit', () => server.close());
