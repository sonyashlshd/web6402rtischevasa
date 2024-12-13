const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Модуль для работы с файловой системой
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Путь к файлу для хранения предложений
const suggestionsFilePath = path.join(__dirname, 'suggestions.json');

// Функция для чтения предложений из файла
function readSuggestionsFromFile() {
    if (fs.existsSync(suggestionsFilePath)) {
        const data = fs.readFileSync(suggestionsFilePath);
        return JSON.parse(data);
    }
    return [];
}

// Функция для записи предложений в файл
function writeSuggestionsToFile(suggestions) {
    fs.writeFileSync(suggestionsFilePath, JSON.stringify(suggestions, null, 2));
}

// Эндпоинт для получения данных (предложений)
app.get('/data', (req, res) => {
    const suggestions = readSuggestionsFromFile();
    res.json(suggestions);
});

// Эндпоинт для обработки POST-запроса
app.post('/data', (req, res) => {
    const { suggestion } = req.body;

    // Проверка на наличие предложения
    if (!suggestion || suggestion.length < 10) {
        return res.status(400).json({ error: 'Предложение должно содержать не менее 10 символов.' });
    }

    // Чтение существующих предложений
    const suggestions = readSuggestionsFromFile();

    // Добавление нового предложения в массив
    suggestions.push(suggestion);

    // Запись обновленного массива в файл
    writeSuggestionsToFile(suggestions);

    // Возврат успешного ответа
    res.json({ message: 'Предложение успешно добавлено!', suggestion });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
