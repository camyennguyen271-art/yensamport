/**
 * Utility function to translate text from Vietnamese to English
 * using Google Translate free single API endpoint.
 */
export async function translateViToEn(text: string): Promise<string> {
  if (!text || !text.trim()) return '';
  try {
    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=${encodeURIComponent(text.trim())}`
    );
    if (!response.ok) return text;
    const data = await response.json();
    if (Array.isArray(data) && Array.isArray(data[0])) {
      const translated = data[0].map((item: any) => item[0]).join('');
      return translated || text;
    }
  } catch (err) {
    console.warn('Auto-translation error:', err);
  }
  return text;
}
