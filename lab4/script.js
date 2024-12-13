document.addEventListener('DOMContentLoaded', function() {
    // Восстановление предложений из сервера при загрузке страницы
    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(suggestions => {
            suggestions.forEach(suggestion => addSuggestionToList(suggestion));
        })
        .catch(error => console.error('Ошибка при загрузке предложений:', error));

    document.getElementById('suggestion-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Отменяем стандартное поведение формы

        const suggestion = document.getElementById('suggestion').value;

        // Проверка введённых данных (например, длина текста)
        if (suggestion.length < 10) {
            alert('Ваше предложение должно содержать не менее 10 символов.');
            return;
        }

        // Асинхронный запрос на сервер
        fetch('http://localhost:3000/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ suggestion }) // Отправляем данные в формате JSON
        })
        .then(response => {
            if (!response.ok) { // Проверка на успешный ответ
                throw new Error('Сеть ответила с ошибкой ' + response.status);
            }
            return response.json(); // Преобразуем ответ в JSON
        })
        .then(data => {
            document.getElementById('response-message').innerText = 'Предложение успешно отправлено!';

            // Добавляем новое предложение в список и localStorage
            addSuggestionToList(suggestion);

            console.log(data); // Выводим данные в консоль (для отладки)

            // Очищаем текстовое поле после отправки
            document.getElementById('suggestion').value = '';
        })
        .catch(error => {
            document.getElementById('response-message').innerText = 'Произошла ошибка: ' + error.message;
            console.error('Ошибка:', error); // Логируем ошибку в консоль
        });
    });

    // Функция для добавления предложения в список на странице
    function addSuggestionToList(suggestion) {
        const suggestionList = document.getElementById('suggestion-list');

        const listItem = document.createElement('li'); // Создаём новый элемент списка
        listItem.textContent = suggestion; // Устанавливаем текст элемента списка

        suggestionList.appendChild(listItem); // Добавляем элемент списка в список на странице
    }
});
