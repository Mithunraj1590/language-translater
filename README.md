# Language Translator Chrome Extension

A simple Chrome extension that allows you to translate selected text on any webpage into multiple Indian languages using the context menu.

---

## Approach

This extension leverages Chrome's context menu API to provide translation options when you right-click selected text. When a language is chosen, the extension sends the selected text to a translation API and displays the result. The extension is designed to be lightweight, user-friendly, and easy to set up for local development or personal use.

**Key Features:**
- Adds context menu items for translating selected text into German, Kannada, Hindi, Malayalam, and Tamil.
- Uses the [MyMemory Translation API](https://mymemory.translated.net/) for fetching translations.
- Simple popup and background scripts for handling user actions and API requests.

---

## Setup Instructions

### 1. Clone or Download the Repository

Download or clone this repository to your local machine.

```
git clone <repo-url>
```

Or download the ZIP and extract it.

### 2. Load the Extension in Chrome

1. Open Google Chrome.
2. Go to `chrome://extensions` in the address bar.
3. Enable **Developer mode** (toggle in the top right).
4. Click **Load unpacked**.
5. Select the folder where you saved/extracted the extension files.
6. The extension should now appear in your list of Chrome extensions.

---

## Usage

1. **Navigate to any webpage.**
2. **Select the text** you want to translate by highlighting it with your mouse.
3. **Right-click** on the selected text.
4. In the context menu, you will see options like:
   - Translate to German
   - Translate to Kannada
   - Translate to Hindi
   - Translate to Malayalam
   - Translate to Tamil
5. **Click** on the language you want. The extension will process your request and display the translated text (the display method depends on your implementation, e.g., popup or notification).

---

## File Structure

- `manifest.json` – Chrome extension manifest file.
- `background.js` – Handles context menu creation and message passing.
- `content.js` – Handles displaying the translation on the page.
- `popup.html` / `popup.js` – (Optional) Popup UI for the extension.
- `icons/` – Extension icons.

---

## Customization

- To add more languages, edit the `languages` array in `background.js`.
- To change the translation API, update the fetch logic in `background.js` and `content.js` as needed.

---

## Notes

- This extension uses a free public API (MyMemory). For production or heavy use, consider using a paid translation API for better reliability and quota.
- The extension is for educational and personal use.

---

## By Mithun raj


