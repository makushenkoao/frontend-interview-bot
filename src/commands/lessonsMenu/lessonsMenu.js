const { Markup } = require('telegraf');
const db = require('../../../databases/main.json');

const lessonsMenu = async (ctx) => {
    const match = ctx.match[1];

    if (match === 'mock') {
        return ctx.reply('Скоро завезем меню!');
    }

    const keyboard = Markup.inlineKeyboard(
        Object.keys(db[match]).map((_) => {
            return [
                Markup.button.callback(
                    db[match][_].title || 'Обновление!',
                    `section-details-${match}-${_}`,
                ),
            ];
        }),
    );

    ctx.replyWithMarkdown('Выберите тему для изучени:', keyboard);
};

module.exports = lessonsMenu;
