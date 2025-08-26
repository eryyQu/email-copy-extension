# Email Copy – Chrome Extension

Email Copy is a simple Chrome extension that makes it easier to work with email addresses.  
Instead of copying entire text blocks and cleaning them manually, this tool extracts only the email addresses from your selection and copies them directly to the clipboard.

## ✨ Features
- Extracts only valid email addresses from selected text
- Copies them to the clipboard in format: `mail1@example.com; mail2@example.com;`
- Shortcut: **Alt+C** (macOS: ⌥C)
- Toggle On/Off from the popup menu
- Small toast notification when emails are copied

## 🚀 Installation
1. Download the latest release from [Releases](https://github.com/eryyQu/email-copy-extension/releases).
2. Unzip the file.
3. Open Chrome and go to: `chrome://extensions/`
4. Enable **Developer mode**.
5. Click **Load unpacked** and select the extension folder.

## 🖥️ Usage
1. Select any text that contains email addresses.
2. Press **Alt+C**.
3. The extracted emails will be copied to your clipboard, separated by `;`.

## ⚠️ Notes
- Content scripts don’t work on Chrome internal pages (`chrome://extensions`, Chrome Web Store, etc.).
- Works on all regular websites.

## 📬 Contact
If you find a bug or have a feature request, feel free to open an [issue](https://github.com/eryyQu/email-copy-extension/issues).
