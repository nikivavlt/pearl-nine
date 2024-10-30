const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate';

export const translateText = async (text, targetLanguage) => {
  try {
    const response = await fetch(DEEPL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        auth_key: process.env.REACT_APP_DEEPL_API_KEY,
        text: text,
        target_lang: targetLanguage.toUpperCase(), // DeepL expects uppercase language codes
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.translations[0].text; // Return the translated text
  } catch (error) {
    console.error('Error translating text:', error);
    throw error; // Re-throw the error to handle it in the component if needed
  }
};
