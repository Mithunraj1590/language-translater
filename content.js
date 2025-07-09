chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'translate-selection' && msg.text && msg.lang) {
    translateAndShowPopup(msg.text, msg.lang);
  }
});

async function translateAndShowPopup(text, lang) {
  removeExistingPopup();
  // Show loading popup
  const popup = document.createElement('div');
  popup.id = 'regional-translator-popup';
  popup.style.position = 'fixed';
  popup.style.zIndex = '9999';
  popup.style.background = 'white';
  popup.style.border = '1px solid #d1d5db';
  popup.style.borderRadius = '0.5rem';
  popup.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  popup.style.padding = '1rem';
  popup.style.maxWidth = '40rem';
  popup.style.maxHeight = '60vh';
  popup.style.overflowY = 'auto';
  popup.style.color = '#1f2937';
  popup.innerHTML = `
    <div style="font-weight:bold;margin-bottom:0.5rem;">Translating...</div>
  `;
  document.body.appendChild(popup);

  // Center the popup in the viewport (initially for loading)
  popup.style.top = `${(window.innerHeight - popup.offsetHeight) / 2}px`;
  popup.style.left = `${(window.innerWidth - popup.offsetWidth) / 2}px`;

  // Translate
  const sourceLang = 'en';
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${lang}`;
  try {
    const res = await fetch(url);
    const result = await res.json();
    const translated = result.responseData && result.responseData.translatedText ? result.responseData.translatedText : 'Translation failed.';
    popup.innerHTML = `
      <div style="font-weight:700;font-size:1.1rem;color:#1B3C53;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.5rem;">
        <svg style='width:1.5em;height:1.5em;vertical-align:middle;color:#1B3C53' fill='none' stroke='currentColor' stroke-width='2' viewBox='0 0 24 24'><path stroke-linecap='round' stroke-linejoin='round' d='M3 5h12M9 3v2m0 4v12m0 0l-3-3m3 3l3-3'/></svg>
        Translation (${lang.toUpperCase()})
      </div>
      <div style="margin-bottom:0.5rem;font-size:0.95rem;color:#374151;background:#e6eef3;padding:0.5rem 0.75rem;border-radius:0.4rem;">${text}</div>
      <div style="font-size:1rem;color:#000;font-weight:600;margin:18px 0 10px 0;line-height:1.3;background:#d3e3ed;padding:0.75rem 1rem;border-radius:0.4rem;box-shadow:0 2px 8px rgba(27,60,83,0.07);">${translated}</div>
      <button id="regional-translator-close-btn" style="margin-top:0.75rem;padding:0.4rem 1.2rem;background:linear-gradient(90deg,#1B3C53,#274d6b);color:white;border:none;border-radius:0.3rem;cursor:pointer;font-weight:500;box-shadow:0 2px 8px rgba(27,60,83,0.10);transition:background 0.2s;">Close</button>
    `;
    // Attach close event
    const closeBtn = popup.querySelector('#regional-translator-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        popup.remove();
      });
    }
    // Re-center the popup after rendering translation
    setTimeout(() => {
      popup.style.top = `${(window.innerHeight - popup.offsetHeight) / 2}px`;
      popup.style.left = `${(window.innerWidth - popup.offsetWidth) / 2}px`;
    }, 0);
  } catch (e) {
    popup.innerHTML = '<span style="color:red;">Error connecting to translation service.</span>';
    // Re-center the popup after rendering error
    setTimeout(() => {
      popup.style.top = `${(window.innerHeight - popup.offsetHeight) / 2}px`;
      popup.style.left = `${(window.innerWidth - popup.offsetWidth) / 2}px`;
    }, 0);
  }
}

function removeExistingPopup() {
  const existing = document.getElementById('regional-translator-popup');
  if (existing) existing.remove();
} 