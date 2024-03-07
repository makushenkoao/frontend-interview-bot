const db = require("../../../databases/main.json");
const showAlgorithmDetails = (ctx) => {
  const { algorithms } = db;
  const algorithmId = ctx.match[1];

  const algorithm = algorithms.find((alg) => alg.id == algorithmId);

  if (algorithm) {
    let message = `*${algorithm.title}*\n\n`;

    algorithm.child.forEach((childAlgorithm, index) => {
      message += `*${index + 1}. ${childAlgorithm.title}:*\n\n`;
      message += `${childAlgorithm.description}\n`;
      message += `*Сложность данного алгоритма: ${childAlgorithm.complexity}*\n\n`;

      if (childAlgorithm.code.trim() !== "") {
        message += `[Посмотреть пример](${childAlgorithm.code})\n\n`;
      }
    });

    const backButton = {
      text: "Назад",
      callback_data: "algorithms",
    };

    const replyMarkup = {
      inline_keyboard: [[backButton]],
    };

    ctx.replyWithMarkdown(message, {
      reply_markup: replyMarkup,
      disable_web_page_preview: true,
    });
  } else {
    ctx.reply("Алгоритм не найден.");
  }
};

module.exports = showAlgorithmDetails;
