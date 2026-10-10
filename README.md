# Subtitle Editor V25 (Sinhala Subtitle Editor)

🇬🇧 English | [🇱🇰 සිංහල](#-සිංහල)

---

## 🇬🇧 English

### Why this app exists

Tools like **Subtitle Edit** and **Aegisub** do not let you edit subtitles while the video is playing in **Full Screen**. You have to leave full screen, fix the line, and go back, which breaks the flow when you are proofreading a whole movie or episode.

**Subtitle Editor V25** solves this. You watch the video in full screen and fix the Sinhala subtitles directly on the video, right when you see a mistake. Click the subtitle (or press `Tab`), type the correction, press `Enter`, and the video continues playing.

### Features

- **Edit directly on the video**, even in Full Screen. Click a Sinhala subtitle (or press `Tab`); the video pauses, you type, `Enter` saves and resumes.
- **Full Screen player** with an auto-hiding control bar (move the mouse to the bottom edge, like VLC / PotPlayer).
- **MKV / MP4 with multiple audio tracks**. Every audio track is detected and you can switch instantly, including AC3 / DTS / E-AC3 (decoded live with bundled ffmpeg).
- **English reference subtitle** shown on top of the video while you edit the Sinhala one.
- **ASS Tags mode**: renders `{\an8}`, `{\pos()}`, `{\i1}`, `{\b1}`, `{\c&H...&}`, `<i>`, `<b>`, `<u>`, `<font color>` as styled / positioned subtitles.
- **Subtitle List tab**, **floating Context Editor** (`Shift`) and **External Window** (`F2`, great for a second monitor), all live-synced.
- **Find & Replace** (`Ctrl`) with per-line selection.
- **Translate** (`=`) the current English line, or a hovered / selected word, into Sinhala (needs internet).
- **Auto-save every 5 seconds** and session restore if the app closes unexpectedly.
- Subtitle timing is never changed, only the text you edit.
- Settings (subtitle size, colour, position, skip time, table font size) are remembered.

Press `F1` inside the app for the full built-in guide.

### Quick start

1. **Load Video** (or drag & drop the video file).
2. **Load Eng SRT** (optional, reference) and **Load Sin SRT** (the one you edit).
3. Watch, click a Sinhala subtitle, fix it, press `Enter`.
4. **Save to Original SRT** or **Download New SRT**.

### Keyboard shortcuts

| Key | Action |
|---|---|
| `Space` | Play / Pause |
| `←` `→` | Skip backward / forward |
| `↑` `↓` / mouse wheel | Volume (up to 200%) |
| `Tab` / click subtitle | Edit subtitle |
| `Enter` / `Tab` (while editing) | Save and continue |
| `Shift`+`Enter` | New line |
| `Shift` | Show / hide Context Editor |
| `F2` | External Window |
| `Ctrl` | Find & Replace |
| `=` | Translate |
| `Ctrl`+`U` / `Ctrl`+`I` (in edit box) | Add `{\an8}` / toggle italic |
| `F1` | Help |
| `Esc` | Close guide / leave Full Screen |

### Project structure

| File | Purpose |
|---|---|
| `index.html` | Whole UI and logic (renderer) |
| `main.js` | Electron main process (window, ffmpeg, file handling) |
| `preload.js` | Secure bridge between renderer and main |
| `package.json` / `package-lock.json` | Dependencies and build config |

This source was extracted from `SubtitleEditor 25.0.0.exe` (Electron 44.5.1, electron-builder 26.15.3, ffmpeg-static 5.3.0).

### Run & build

Requires [Node.js](https://nodejs.org/).

```bash
npm ci
npx electron .        # run the app
npm run build         # build portable exe into dist/
```

---

## 🇱🇰 සිංහල

### මේ app එක හදපු හේතුව

**Subtitle Edit** සහ **Aegisub** වැනි මෙවලම් වලින් video එක **Full Screen** වෙලා තියෙන ගමන් subtitle edit කරන්න බැහැ. Full Screen එකෙන් එළියට ඇවිත්, වැරැද්ද හදලා, ආයෙත් Full Screen යන්න ඕනේ. මුළු චිත්‍රපටයක් හෝ episode එකක් proofread කරද්දී මේක ලොකු කරදරයක්.

**Subtitle Editor V25** මේකට විසඳුමයි. Full Screen එකේ video එක බලන ගමන්ම, වැරැද්ද දකින මොහොතේම සිංහල subtitle එක කෙලින්ම video එක උඩ ඉඳන් හදන්න පුළුවන්. Subtitle එක click කරන්න (හෝ `Tab` ඔබන්න), නිවැරදි කරන්න, `Enter` ඔබන්න, video එක ආයෙත් play වෙනවා.

### විශේෂාංග

- **Video එක උඩම edit කිරීම**, Full Screen එකේදීත්. සිංහල subtitle එක click කරන්න (හෝ `Tab`); video එක pause වෙනවා, type කරන්න, `Enter` එකෙන් save වෙලා play වෙනවා.
- **Full Screen player**: control bar එක auto-hide වෙනවා (VLC / PotPlayer වගේ mouse එක පහළ කෙළවරට ගෙනාවම පෙන්නනවා).
- **Audio track කිහිපයක් ඇති MKV / MP4**: හැම audio track එකක්ම හඳුනාගෙන, එක පාරටම මාරු කරන්න පුළුවන්. AC3 / DTS / E-AC3 ඇතුළුව (ඇතුළත් ffmpeg මගින් decode කරනවා).
- සිංහල subtitle එක edit කරද්දී **English reference subtitle** එක video එකේ ඉහළින් පෙන්වනවා.
- **ASS Tags mode**: `{\an8}`, `{\pos()}`, `{\i1}`, `{\b1}`, `{\c&H...&}`, `<i>`, `<b>`, `<u>`, `<font color>` ආදිය styled / positioned subtitles විදිහට පෙන්වනවා.
- **Subtitle List tab**, **floating Context Editor** (`Shift`), **External Window** (`F2`, දෙවැනි monitor එකකට හොඳයි). සියල්ල live sync වෙනවා.
- **Find & Replace** (`Ctrl`), පේළි තෝරාගෙන replace කරන්න පුළුවන්.
- **Translate** (`=`): වත්මන් English පේළිය, හෝ hover / select කරපු වචනය සිංහලට පරිවර්තනය කරනවා (internet ඕනේ).
- **තත්පර 5කට වරක් auto-save**; app එක හදිසියේ වැහුණොත් session එක ආපහු ගන්න පුළුවන්.
- Subtitle වල වෙලාවන් කිසිවිටක වෙනස් වෙන්නේ නැහැ, ඔයා edit කරන text එක පමණයි වෙනස් වෙන්නේ.
- Settings (subtitle ප්‍රමාණය, වර්ණය, පිහිටීම, skip කාලය, table font size) මතක තබාගන්නවා.

App එක ඇතුළේ `F1` ඔබලා සම්පූර්ණ guide එක බලන්න.

### ඉක්මන් ආරම්භය

1. **Load Video** (හෝ video file එක drag & drop කරන්න).
2. **Load Eng SRT** (optional, reference සඳහා) සහ **Load Sin SRT** (edit කරන එක).
3. බලන්න, සිංහල subtitle එක click කරලා හදන්න, `Enter` ඔබන්න.
4. **Save to Original SRT** හෝ **Download New SRT**.

### Keyboard shortcuts

| යතුර | ක්‍රියාව |
|---|---|
| `Space` | Play / Pause |
| `←` `→` | ආපස්සට / ඉදිරියට skip |
| `↑` `↓` / mouse wheel | Volume (200% දක්වා) |
| `Tab` / subtitle click | Subtitle edit |
| `Enter` / `Tab` (edit කරද්දී) | Save කරලා continue |
| `Shift`+`Enter` | අලුත් පේළියක් |
| `Shift` | Context Editor පෙන්වන / සඟවන |
| `F2` | External Window |
| `Ctrl` | Find & Replace |
| `=` | Translate |
| `Ctrl`+`U` / `Ctrl`+`I` (edit box එකේ) | `{\an8}` එකතු / italic toggle |
| `F1` | උදව් |
| `Esc` | Guide වසන / Full Screen එකෙන් ඉවත් වෙන |

### Project ව්‍යුහය

| ෆයිල් | කාර්යය |
|---|---|
| `index.html` | සම්පූර්ණ UI සහ logic (renderer) |
| `main.js` | Electron main process (window, ffmpeg, ෆයිල් handling) |
| `preload.js` | Renderer සහ main අතර ආරක්ෂිත bridge එක |
| `package.json` / `package-lock.json` | Dependencies සහ build config |

මේ source එක `SubtitleEditor 25.0.0.exe` එකෙන් extract කළ එකක් (Electron 44.5.1, electron-builder 26.15.3, ffmpeg-static 5.3.0).

### Run සහ build කිරීම

[Node.js](https://nodejs.org/) ඕනේ.

```bash
npm ci
npx electron .        # app එක run කරන්න
npm run build         # portable exe එක dist/ ට build කරන්න
```
