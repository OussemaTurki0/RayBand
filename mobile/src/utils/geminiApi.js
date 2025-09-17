const GEMINI_API_KEY = "AIzaSyBmR7-QEXWccq_EKDnq41KE17kRFX7_2co";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export async function askGemini(userMessage) {
  try {
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      }),
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No reply";
    return reply;
  } catch (err) {
    console.error("Gemini API error:", err);
    return "⚠️ Error contacting AI";
  }
}
