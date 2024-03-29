const { Telegraf, Markup, Scenes, session} = require('telegraf');
const supportScene = require("../../src/scenes/support");
const { WORLD_FOR_HEARS, LIMIT_CONFIG, STICKER_ID} = require('../../src/constants/constants');
const { keys, sendKeys } = require('../../src/commands/keys/keys');
const start = require('../../src/commands/start/start');
const learn = require('../../src/commands/learn/learn');
const documentation = require('../../src/commands/documentation/documentation');
const sendQuestion = require('../../src/commands/sendQuestion/sendQuestion');
const lessonsMenu = require('../../src/commands/lessonsMenu/lessonsMenu');
const lessonDetails = require('../../src/commands/lessonDetails/lessonDetails');
const showAlgorithmsMenu = require('../../src/commands/showAlgorithmsMenu/showAlgorithmsMenu');
const showAlgorithmDetails = require('../../src/commands/showAlgorithmDetails/showAlgorithmDetails');
const showStructuresMenu = require('../../src/commands/showStructuresMenu/showStructuresMenu');
const showStructureDetails = require('../../src/commands/showStructureDetails/showStructureDetails');
const sendAnswer = require('../../src/commands/sendAnswer/sendAnswer');
const rateLimit = require("telegraf-ratelimit");
const support = require("../../src/commands/support/support");
const donate = require("../../src/commands/donate/donate");
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const stage = new Scenes.Stage([supportScene]);

bot.use(session());
bot.use(stage.middleware());
bot.use(rateLimit(LIMIT_CONFIG));

// events
bot.on('sticker', (ctx) => {
    ctx.replyWithSticker(STICKER_ID);
});

// commands
bot.command('start', start);
bot.command('learn', learn);
bot.command('keys', keys);
bot.command('documentation', documentation);
bot.command('support', support);
bot.command('donate', donate);

// hears
bot.hears(WORLD_FOR_HEARS, sendQuestion);

// actions
bot.action(/^download-keys-(\w+)$/, sendKeys);
bot.action(/section-menu[\s\S]*?(\w+)/, lessonsMenu);
bot.action(/section-details-(\w+)-(.+)/, lessonDetails);
bot.action('algorithms', showAlgorithmsMenu);
bot.action(/^algorithm_(\d+)$/, showAlgorithmDetails);
bot.action('structures', showStructuresMenu);
bot.action(/^structure_(\d+)$/, showStructureDetails);
bot.action(/.*/, sendAnswer);

bot.catch((err, ctx) => {
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    console.error(err);
});

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        await bot.handleUpdate(body);
        return { statusCode: 200, body: '' };
    } catch (e) {
        console.error('error in handler:', e);
        return {
            statusCode: 400,
            body: 'This endpoint is meant for bot and telegram communication',
        };
    }
};
