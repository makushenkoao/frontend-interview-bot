const db = require("../../../databases/main.json");

const showStructureDetails = (ctx) => {
  const { structures } = db;
  const structureId = ctx.match[1];

  const structure = structures.find((str) => str.id == structureId);

  if (structure) {
    let message = `*${structure.title} (${structure.title_original})*\n\n`;
    message += `${structure.description}\n\n`;

    message += "*Преимущества:*\n";
    structure.advantages.forEach((advantage) => {
      message += `- ${advantage}\n`;
    });
    message += "\n";

    message += "*Недостатки:*\n";
    structure.disadvantages.forEach((disadvantage) => {
      message += `- ${disadvantage}\n`;
    });
    message += "\n";

    message += "*Сложность (в среднем):*\n";
    message += `Доступ: ${structure.complexities.average.access}\n`;
    message += `Поиск: ${structure.complexities.average.search}\n`;
    message += `Вставка: ${structure.complexities.average.insertion}\n`;
    message += `Удаление: ${structure.complexities.average.deletion}\n\n`;

    message += "*Сложность (в худшем случае):*\n";
    message += `Доступ: ${structure.complexities.worst.access}\n`;
    message += `Поиск: ${structure.complexities.worst.search}\n`;
    message += `Вставка: ${structure.complexities.worst.insertion}\n`;
    message += `Удаление: ${structure.complexities.worst.deletion}\n\n`;

    const backButton = {
      text: "Назад",
      callback_data: "structures",
    };

    const replyMarkup = {
      inline_keyboard: [[backButton]],
    };

    ctx.replyWithMarkdown(message, {
      reply_markup: replyMarkup,
      disable_web_page_preview: true,
    });
  } else {
    ctx.reply("Структура данных не найдена.");
  }
};

module.exports = showStructureDetails;
