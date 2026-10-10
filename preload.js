const { contextBridge, ipcRenderer, webUtils } = require('electron');
contextBridge.exposeInMainWorld('nativeApi', {
  getPath: (file) => { try { return webUtils.getPathForFile(file); } catch (e) { return ''; } },
  probe: (p) => ipcRenderer.invoke('probe', p),
  audioBase: () => ipcRenderer.invoke('audio-base'),
  writeFile: (p, c) => ipcRenderer.invoke('write-file', p, c),
  saveDialog: (def) => ipcRenderer.invoke('save-dialog', def),
});
