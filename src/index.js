const { Telegraf } = require('telegraf');
const start = require('./commands/start/start');
const documentation = require('./commands/documentation/documentation');
const sendQuestion = require('./commands/sendQuestion/sendQuestion');
const sendAnswer = require('./commands/sendAnswer/sendAnswer');
const showAlgorithmDetails = require('./commands/showAlgorithmDetails/showAlgorithmDetails');
const showAlgorithmsMenu = require('./commands/showAlgorithmsMenu/showAlgorithmsMenu');
const learn = require('./commands/learn/learn');
const showStructuresMenu = require('./commands/showStructuresMenu/showStructuresMenu');
const showStructureDetails = require('./commands/showStructureDetails/showStructureDetails');
const lessonDetails = require('./commands/lessonDetails/lessonDetails');
const lessonsMenu = require('./commands/lessonsMenu/lessonsMenu');
const { keys, sendKeys } = require('./commands/keys/keys');
const { WORLD_FOR_HEARS } = require('./constants/constants');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// commands
bot.command('start', start);
bot.command('learn', learn);
bot.command('keys', keys);
bot.command('documentation', documentation);

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

bot.launch();
