require('dotenv').config();
const express = require('express');
const cors = require('cors');
const TelegramBot = require('node-telegram-bot-api');

const apiRoutes = require("./routes/api-routes");
const botIncomeMassages = require("./helpers/botHelpers");

const app = express();

const bot = new TelegramBot(process.env.TOKEN_BOT, { polling: true });

const mockPort = 6060;
const mainPort = process.env.PORT || mockPort;

let difficultyLevels = {
    easy: { range: 10, attempts: 4 },
    medium: { range: 20, attempts: 3 },
    hard: { range: 30, attempts: 2 }
};

let rounds = 3;
let currentRound = 1;
let number, range, attempts;

function generateRandomNumber() {
  return Math.floor(Math.random() * range) + 1;
}

bot.onText(botIncomeMassages.start, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Добро пожаловать! Я чат-бот для игры в угадай число. Выбери сложность: /easy, /medium, /hard.`);
});

bot.onText(botIncomeMassages.easy, (msg) => {
    startGame(msg, 'easy');
});

bot.onText(botIncomeMassages.medium, (msg) => {
    startGame(msg, 'medium');
});

bot.onText(botIncomeMassages.hard, (msg) => {
    startGame(msg, 'hard');
});

function startGame(msg, difficulty) {
    const chatId = msg.chat.id;
    range = difficultyLevels[difficulty].range;
    attempts = difficultyLevels[difficulty].attempts;
    number = generateRandomNumber();

    bot.sendMessage(chatId, `Начинаем игру на сложности ${difficulty}. Раунд ${currentRound}. Угадай число от 1 до ${range}.`);
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    
    if (msg.text && !isNaN(msg.text)) {
        const guess = parseInt(msg.text);

        if (guess === number) {
            bot.sendMessage(chatId, `Поздравляю, ты угадал число!`);

        if (currentRound < rounds) {
            number = generateRandomNumber();
            currentRound++;
            bot.sendMessage(chatId, `Раунд ${currentRound}. Угадай число от 1 до ${range}.`);
        } else {
            bot.sendMessage(chatId, `Игра окончена. Спасибо за участие!`);
        }
        } else {
            attempts--;

            if (attempts === 0) {
                bot.sendMessage(chatId, `Увы, попытки закончились. Правильный ответ был ${number}.`);
                
                if (currentRound < rounds) {
                    number = generateRandomNumber();
                    attempts = difficultyLevels[difficulty].attempts;
                    currentRound++;
                    bot.sendMessage(chatId, `Раунд ${currentRound}. Угадай число от 1 до ${range}.`);
                } else {
                    bot.sendMessage(chatId, `Игра окончена. Спасибо за участие!`);
                }
            } else {
                bot.sendMessage(chatId, `Неверно. Осталось попыток: ${attempts}.`);
            }
        }
    }
});



app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: 'GET,OPTIONS',
    secure: true,
}));
app.use('', apiRoutes);

app.disable('x-powered-by');

const start = async () => {
    try {
        app.listen(mainPort, (error) => {
            error ? console.log(error) : console.log(`Server opened in PORT: ${mainPort}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();