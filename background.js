// Context menu click: send selected text and language to content script in the current tab
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId && info.selectionText) {
    chrome.tabs.sendMessage(tab.id, {
      action: 'translate-selection',
      text: info.selectionText,
      lang: info.menuItemId
    }, (response) => {
      if (chrome.runtime.lastError) {
        // Suppress or log the error if content script is not present
        // console.warn('Content script not found:', chrome.runtime.lastError.message);
      }
    });
  }
});

// On install, create context menu items
chrome.runtime.onInstalled.addListener(() => {
  const languages = [
    { code: 'de', name: 'German' },
    { code: 'kn', name: 'Kannada' },
    { code: 'hi', name: 'Hindi' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'ta', name: 'Tamil' }
  ];
  languages.forEach(lang => {
    chrome.contextMenus.create({
      id: lang.code,
      title: `Translate to ${lang.name}`,
      contexts: ['selection']
    });
  });
});

async function translateSelectedText(langCode) {
  const selection = window.getSelection().toString();
  if (!selection) return;
  const sourceLang = 'en'; // default to English as source
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(selection)}&langpair=${sourceLang}|${langCode}`;
  const res = await fetch(url);
  const data = await res.json();
  const translated = data.responseData.translatedText;
  chrome.runtime.sendMessage({ translation: translated, original: selection, lang: langCode });
} 