document.getElementById('translateBtn').addEventListener('click', async () => {
  const text = document.getElementById('inputText').value.trim();
  const lang = document.getElementById('language').value;
  const resultDiv = document.getElementById('result');
  if (!text) {
    resultDiv.innerHTML = '<span class="text-red-500">Please enter text to translate.</span>';
    return;
  }
  resultDiv.innerHTML = '<span class="text-gray-400">Translating...</span>';
  try {
    const sourceLang = 'en'; // default to English as source
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${lang}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.responseData && data.responseData.translatedText) {
      resultDiv.innerHTML = `<div class='theme-result rounded p-3 font-semibold' style='margin-top:10px;'>${data.responseData.translatedText}</div>`;
    } else {
      resultDiv.innerHTML = '<span class="text-red-500">Translation failed.</span>';
    }
  } catch (e) {
    resultDiv.innerHTML = '<span class="text-red-500">Error connecting to translation service.</span>';
  }
}); 