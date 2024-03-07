const { Markup } = require('telegraf');
const learn = (ctx) => {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('Введение JS', 'section-menu-introduction')],
        [Markup.button.callback('Основы JavaScript JS', 'section-menu-basics')],
        [Markup.button.callback('Качество кода JS', 'section-menu-mock')],
        [Markup.button.callback('Объекты: основы JS', 'section-menu-mock')],
        [Markup.button.callback('Типы данных JS', 'section-menu-mock')],
        [
            Markup.button.callback(
                'Продвинутая работа с функциями JS',
                'section-menu-mock',
            ),
        ],
        [
            Markup.button.callback(
                'Свойства объекта, их конфигурация JS',
                'section-menu-mock',
            ),
        ],
        [
            Markup.button.callback(
                'Прототипы, наследование JS',
                'section-menu-mock',
            ),
        ],
        [Markup.button.callback('Классы JS', 'section-menu-mock')],
        [Markup.button.callback('Обработка ошибок JS', 'section-menu-mock')],
        [
            Markup.button.callback(
                'Промисы, async/await JS',
                'section-menu-mock',
            ),
        ],
        [
            Markup.button.callback(
                'Генераторы, продвинутая итерация JS',
                'section-menu-mock',
            ),
        ],
        [Markup.button.callback('Модули JS', 'section-menu-mock')],
        [Markup.button.callback('Разное JS', 'section-menu-mock')],
        [Markup.button.callback('Алгоритмы JS', 'algorithms')],
        [Markup.button.callback('Структуры данных JS', 'structures')],
    ]);

    ctx.replyWithMarkdown('Выберите тему, которую хотите изучить:', keyboard);
};

module.exports = learn;
