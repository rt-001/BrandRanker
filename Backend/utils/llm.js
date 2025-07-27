const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function parse(text) {
  return text
    .split("\n")
    .map((line) => line.match(/^(\d+)\.\s*(.+)$/))
    .filter((match) => match)
    .map(([, rank, brand]) => ({ rank: +rank, brand }));
}

exports.callLLM = async function (prompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  return parse(response.choices[0].message.content);
};
