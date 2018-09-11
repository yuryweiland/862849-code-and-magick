/**
 * Created by Вайланд on 06.09.2018.
 */

'use strict';

var CLOUD_WIDTH = 370; // Ширина облака, пкс
var CLOUD_HEIGHT = 270; // Высота облака, пкс
var CLOUD_X = 150; // Отступ слева от облака, пкс
var CLOUD_Y = 0; // Отступ сверху от облака, пкс
var OFFSET = 10; // Разамер (отступ) тени, пкс
var BAR_OFFSET = 50; // Отступ между столбцами в статистике, пкс
var TEXT_WIDTH = 50; // Ширина текста, пкс
var BAR_WIDTH = 40; // Ширина колонки, пкс
var BAR_HEIGHT = 130; // Высота колонки, пкс
var TEXT_OFFSET = 20; // Отступ текста в заголовке, пкс
var TEXT_OFFSET_STATS = 30; // Отступ текста по статистике, пкс
var MAX_VALUE_STATS = 10000;
var FIGURE_COLOR = '#000';
var BACK_COLOR = '#fff';
var FONT_STYLE = '16px PT Mono';
var FONT_BASELINE = 'hanging';
var TEXT_HEAD_COLOR = 'rgba(0, 0, 0, 1)';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.5)';
var TEXT_TOP_OFFSET = 45;
var TEXT_BOTTOM_OFFSET = 30;
var STATS_TEXT_OFFSET = 70;

// Рисуем облака
function renderCloud(ctx, x, y, color) {
    drawCloud(ctx, x, y, color);
    drawCloudShadow(ctx, x, y, color);
}

// Рисуем основное облако результата
function drawCloud(ctx, x, y, color) {
    ctx.fillStyle = color; // Цвет заливки
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT); // Заливаем облако цветом
}

// Рисуем тень
function drawCloudShadow(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.strokeRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT); // Контур вокруг облака/тени
}

// Получечние наибольшего результата в статистике
function getMaxResult(arr) {
    // Заглушка - если в arr - пустой массив - добавляем в него 4 рандомных результата
    if (arr.length === 0) {
        for (var j = 0; j < 4; j++) {
            arr.push(Math.floor(Math.random() * MAX_VALUE_STATS));
        }
    }

    var maxResult = arr[0];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxResult) {
            maxResult = arr[i];
        }
    }

    return maxResult;
}

// Сравниваем длину массивов с именами игроков и кол-вом попыток
// Если длины массивов не равны - сравниваем по наибольшему
function equalArrays(names, times) {
    if (names.length !== times.length) {
        if (names.length > times.length) {
            times.length = names.length;
        } else {
            names.length = times.length;
        }
    }
}

// Рендерим текст
function renderText(ctx) {
    ctx.fillStyle = FIGURE_COLOR; // Заливка шрифта
    ctx.font = FONT_STYLE; // Заливка шрифта
    ctx.textBaseline = FONT_BASELINE; // Выровнить шрифт по базовой линии
    ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_OFFSET, CLOUD_Y + TEXT_OFFSET); // Текст
    ctx.fillText('Список результатов:', CLOUD_X + TEXT_OFFSET, CLOUD_Y + TEXT_TOP_OFFSET); // Текст
}

// Рендерим заголовок
function renderStatsName(ctx, names, times, i, maxTime) {
    // Текст
    var textXHeader = CLOUD_X + TEXT_OFFSET_STATS + (BAR_WIDTH + TEXT_WIDTH) * i;
    var parsedTime = parseInt(times[i], 10);

    ctx.fillStyle = TEXT_HEAD_COLOR;
    ctx.fillText(parsedTime, textXHeader, (CLOUD_Y + CLOUD_HEIGHT - STATS_TEXT_OFFSET) - (BAR_HEIGHT * times[i]) / maxTime);
    ctx.fillText(names[i], textXHeader, CLOUD_Y + CLOUD_HEIGHT - TEXT_BOTTOM_OFFSET);
}

function renderStats(ctx, names, times) {
    var maxTime = getMaxResult(times); // Поиск максимального результата

    // Бежим по циклу результатов (ограничиваем кол-вом имён участников)
    for (var i = 0; i < names.length; i++) {

        // Координата верхней левой точки прямоугольника (по X)
        var statsX = CLOUD_X + TEXT_OFFSET_STATS + (BAR_WIDTH + BAR_OFFSET) * i;

        // Координата верхней левой точки прямоугольника (по Y)
        var statsY = CLOUD_Y + CLOUD_HEIGHT - BAR_OFFSET;

        // Ширина прямоугольника
        var barResultStats = -(BAR_HEIGHT * times[i]) / maxTime;

        // Высота прямоугольника
        renderStatsName(ctx, names, times, i, maxTime);

        if (names[i] === 'Вы') {
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
        } else {
            ctx.fillStyle = 'rgba(0, 0, ' + Math.floor(Math.random() * 255) + ', 1)';
        }

        ctx.fillRect(statsX, statsY, BAR_WIDTH, barResultStats);
    }
}

window.renderStatistics = function (ctx, names, times) {
    // Приводим кол-во результатов к кол-ву игроков
    equalArrays(names, times);

    // Рендерим облако
    renderCloud(ctx, CLOUD_X + OFFSET, CLOUD_Y + OFFSET, SHADOW_COLOR);

    // Рендерим подложку (тень) под облаком
    renderCloud(ctx, CLOUD_X, CLOUD_Y, BACK_COLOR);

    // Рендер текста
    renderText(ctx);

    // Рендер результатов
    renderStats(ctx, names, times);
};
