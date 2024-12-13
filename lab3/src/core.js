/**
 * Проверяет, является ли число целым, используя побитовые операторы
 * @param {*} n
 * @returns {boolean}
 */
function isInteger(n) {
    return (n | 0) === n;
}

/**
 * Возвращает массив четных чисел от 2 до 20 включительно
 * @returns {number[]}
 */
function even() {
    const evens = [];
    for (let i = 2; i <= 20; i += 2) {
        evens.push(i);
    }
    return evens;
}

/**
 * Считает сумму чисел до заданного с использованием цикла
 * @param {*} n
 * @returns {number}
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Считает сумму чисел до заданного с использованием рекурсии
 * @param {*} n
 * @returns {number}
 */
function recSumTo(n) {
    if (n === 1) return 1;
    return n + recSumTo(n - 1);
}

/**
 * Считает факториал заданного числа
 * @param {*} n
 * @returns {number}
 */
function factorial(n) {
    if (n < 0) return undefined; // Факториал для отрицательных чисел не определен
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

/**
 * Определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 * @returns {boolean}
 */
function isBinary(n) {
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Находит N-е число Фибоначчи
 * @param {*} n
 * @returns {number}
 */
function fibonacci(n) {
    if (n < 0) return undefined; // Отрицательные индексы не имеют смысла
    if (n === 0) return 0;
    if (n === 1) return 1;

    let a = 0, b = 1, temp;
    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

/**
 * Принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * @param initialValue
 * @param operatorFn
 * @returns {function}
 */
function getOperationFn(initialValue, operatorFn = () => initialValue) {
    let currentValue = initialValue;

    return function(newValue) {
        if (operatorFn) {
            currentValue = operatorFn(currentValue, newValue);
        }
        return currentValue;
    };
}

/**
 * Создает генератор арифметической последовательности.
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step - число шаг последовательности
 * @returns {function}
 */
function sequence(start = 0, step = 1) {
    let current = start;

    return function() {
        const nextValue = current;
        current += step;
        return nextValue;
    };
}

/**
 * Принимает два значения и возвращает true только в случае равенства значений или объектов с одинаковыми свойствами.
 * @param {object} firstObject
 * @param {object} secondObject
 * @returns {boolean}
 */
function deepEqual(firstObject, secondObject) {
    // Проверка на идентичность
    if (firstObject === secondObject) {
        return true;
    }

    // Проверка на NaN
    if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
        return true;
    }

    // Если одно из значений не является объектом или равно null, возвращаем false
    if (firstObject == null || secondObject == null || typeof firstObject !== 'object' || typeof secondObject !== 'object') {
        return false;
    }

    // Получаем ключи объектов
    const keysFirst = Object.keys(firstObject);
    const keysSecond = Object.keys(secondObject);

    // Сравниваем количество ключей
    if (keysFirst.length !== keysSecond.length) {
        return false;
    }

    // Рекурсивное сравнение значений по ключам
    for (const key of keysFirst) {
        // Проверяем наличие ключа во втором объекте и рекурсивно сравниваем значения
        if (!keysSecond.includes(key) || !deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }

    return true;
}


module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};