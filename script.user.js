// ==UserScript==
// @name         YouTube: Enter для полного экрана
// @name:en      YouTube: Enter for Fullscreen
// @namespace    http://tampermonkey.net
// @version      1.2
// @description  Нажатие на Enter включает полноэкранный режим, если ты не пишешь комментарий
// @description:en Press Enter to toggle fullscreen mode if you are not typing a comment
// @author       Digital Dark & Ai
// @match        *://*.youtube.com/*
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Функция, которая вешает обработчик на клавиши // Function that attaches the keydown event listener
    function initScript() {
        document.removeEventListener('keydown', handleKeyPress, true);
        document.addEventListener('keydown', handleKeyPress, true);
    }

    // Обработчик нажатия клавиш // Event handler for key presses
    function handleKeyPress(event) {
        // Проверяем, что нажат именно Enter // Check if the pressed key is Enter
        if (event.key === 'Enter') {

            // Находим элемент, на котором сейчас фокус // Find the currently focused element
            const activeElem = document.activeElement;

            // Проверяем, не пишет ли бро коммент, сообщение в чате или запрос в поиске // Check if the user is typing a comment, chat message, or search query
            const isTyping = activeElem && (
                activeElem.tagName === 'INPUT' ||
                activeElem.tagName === 'TEXTAREA' ||
                activeElem.isContentEditable
            );

            // Если пишет — выходим из функции // If typing, exit the function
            if (isTyping) return;

            // Ищем кнопку полноэкранного режима в плеере Ютуба // Look for the fullscreen button in the YouTube player
            const fsButton = document.querySelector('.ytp-fullscreen-button');

            // Если кнопка найдена — кликаем по ней // If the button is found, click it
            if (fsButton) {
                event.preventDefault(); // Глушим стандартное действие Enter // Prevent default Enter behavior
                fsButton.click();       // Кликаем по кнопке во весь экран // Click the fullscreen button
            }
        }
    }

    // Запускаем сразу при загрузке страницы // Run immediately when the page loads
    initScript();

    // Подстраховка для Ютуба при переходе на новые видео // Backup for YouTube when navigating to new videos
    window.addEventListener('yt-navigate-finish', initScript);
})();
