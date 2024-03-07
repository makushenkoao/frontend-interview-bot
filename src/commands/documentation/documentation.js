const db = require('../../../databases/main.json');

const documentation = async (ctx) => {
    const docs = db.documentations;

    await ctx.reply('Выберите то, что Вас интересует:', {
        reply_markup: {
            inline_keyboard: docs.map((doc) => [
                { text: doc.title, url: doc.link },
            ]),
        },
    });
};

module.exports = documentation;
