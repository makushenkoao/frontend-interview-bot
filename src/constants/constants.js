const WORLD_FOR_HEARS = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node',
    'Next',
    'TypeScript',
    'RN',
    'Случайный вопрос',
];

const LIMIT_CONFIG = {
    window: 1500,
    limit: 1,
    onLimitExceeded: (ctx) =>
        ctx.reply(
            'Йееей!\nКуда Вы так торопитесь?\nПодождите немного перед отправкой новой команды.\nПростите за неудобства.',
        ),
};

const STICKER_ID =
    'CAACAgIAAxkBAAIFvGXrOkU1Xr4h1yUiEFj8DsV6pa2tAAKEPAACGYOZSLEbn6p37U3rNAQ';

module.exports = {
    WORLD_FOR_HEARS,
    LIMIT_CONFIG,
    STICKER_ID
};
