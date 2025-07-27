const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function parse(text) {
  return text
    .split("\n")
    .map((l) => l.match(/^(\d+)\.\s*(.+)$/))
    .filter((m) => m)
    .map(([, num, brand]) => ({ rank: +num, brand }));
}

exports.callLLM = async function (prompt) {
  const resp = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });
  return parse(resp.choices[0].message.content);
};
