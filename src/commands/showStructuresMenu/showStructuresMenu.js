const db = require("../../../databases/main.json");

const showStructuresMenu = (ctx) => {
  const { structures } = db;

  if (structures) {
    ctx.replyWithMarkdown(
      "*Структуры данных* - это способы организации и хранения данных в компьютере, которые позволяют эффективно выполнить определенные операции. Они представляют собой абстрактные модели, которые могут быть реализованы различными способами в программировании. Примеры структур данных включают в себя массивы, списки, деревья, хеш-таблицы и графы. Выбор подходящей структуры данных зависит от конкретной задачи и требований к эффективности операций вставки, удаления, поиска и обновления данных\n\n*Выберите структуру данных с которой хотел бы познакомиться:*",
      {
        reply_markup: {
          inline_keyboard: structures.map((structure) => [
            {
              text: `${structure.title} (${structure.title_original})`,
              callback_data: `structure_${structure.id}`,
            },
          ]),
        },
      },
    );
  } else {
    ctx.reply("Структуры данных не найдены.");
  }
};

module.exports = showStructuresMenu;
