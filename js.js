const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const messageList = document.querySelector('.message-list');

function addText(text, isUserMessage) {
    const messageItem = document.createElement('li');
    messageItem.textContent = text;
    messageItem.style.color = isUserMessage ? 'green' : 'red';
    messageItem.style.textAlign = isUserMessage ? 'right' : 'left';
    messageItem.style.wordBreak = 'break-all';
    messageItem.style.whiteSpace = 'normal';
    messageItem.style.maxWidth = '100%';
    messageList.appendChild(messageItem);
    messageList.scrollTop = messageList.scrollHeight;

    //плавный текст 
    if (!isUserMessage) {
        let index = 0;
        function type() {
            if (index < text.length) {
                messageItem.textContent = text.substring(0, index + 1);
                index++;
                requestAnimationFrame(type);
            }
        }
        requestAnimationFrame(type);
    }
}

// Ответ бота
function botResponse(userText) {
    const lowerText = userText.toLowerCase();
    if (lowerText.includes('привет') || lowerText.includes('здарова') || lowerText.includes('привт')) {
        return 'Привет! Чем могу помочь?';
    } else if (lowerText.includes('я не могу зарегистрироваться в binance') || lowerText.includes('я не могу зарегистрироваться на бинансе')) {
        return 'Если у вас не совпадает пароль, пожалуйста, поменяйте его в гугле. Это очень просто. Если вам нужна помощь, скажите, я помогу.';
    } else if (lowerText.includes('не получается')) {
        return 'Пожалуйста, скажите, что у вас конкретно не получается.';
    } else if (lowerText === 'time' || lowerText === 'какое дата' || lowerText === 'дата') {
        return `Сейчас ${new Date().toLocaleDateString()}`;
    } else if (lowerText === 'clear' || lowerText === 'очистка') {
        messageList.innerHTML = '';
        return '';
    } else if (lowerText.includes('как дела?') || lowerText.includes('как дела')) {
        return 'Рад, что спросил! У меня все отлично! А у тебя как дела? Чем могу помочь?'
    } else if (lowerText === 'время?'|| (lowerText.includes('время'))) {
        return `Текущее время: ${new Date().toLocaleTimeString()}`;
    } else if (lowerText.includes('создай мне сайт')) {
        return `Я создам для вас простой сайт с использованием HTML и CSS. Вот пример:\n\n
        <pre>
        <!DOCTYPE html>
        <html lang="ru">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Прикольный сайт</title>
        </head>
        <body>
            <h1>Добро пожаловать на мой сайт!</h1>
            <button>Нажми меня!</button>
        </body>
        </html>
        </pre>`
    } else if(lowerText.includes('гасан')){
        return 'Это тот человек, который всегда был рядом, когда мне нужно было. Он помогал, поддерживал и верил в меня, когда даже я сомневался. Я искренне уважаю его, ведь мы прошли через многое вместе. Мы дружим уже 10 лет, и каждый год лишь укрепляет наши отношения. На данный момент меня нет рядом, но помни, этот проект был создан с мыслью, чтобы наша дружба пережила время и расстояние. Я передаю тебе этот проект, брат мой, потому что знаю, что ты продолжишь его, как и я когда-то. Пусть этот проект станет символом того, что настоящая дружба не исчезает, даже когда нас нет рядом.  '
    } else if (lowerText.includes('юсиф')) {
        return ('Юсиф — человек с ярким характером. Он увлекается многими вещами, но иногда бывает сложно убедить его изменить мнение. Он шутит, но порой его шутки могут быть немного резкими. Несмотря на это, у него доброе сердце, и если кто-то нуждается в помощи, он всегда поддержит. Иногда он не завершает начатое, но если что-то по-настоящему его захватывает, он способен проявить упорство.')
    }
}


function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText) {
        addText(messageText, true)
        const botReply = botResponse(messageText);  
        setTimeout(() => {
            addText(botReply, false)
            saveMessages()
        }, 1000);
        messageInput.value = ''
    }
}



function saveMessages() {
    const messages = Array.from(messageList.querySelectorAll('li')).map(item => ({
        text: item.textContent,
        isUserMessage: item.style.color === 'green'
    }));
    localStorage.setItem('messages', JSON.stringify(messages))
}

document.addEventListener('DOMContentLoaded', () => {
    const savedMessages = JSON.parse(localStorage.getItem('messages'))
    if (savedMessages) {
        savedMessages.forEach(message => {
            addText(message.text, message.isUserMessage)
        })
    }
})


sendButton.addEventListener('click', () => {
    sendMessage();
})


messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        console.log('нажата клавиша Enter');
        sendMessage();
    } else if (event.key === 'PgUp') {
        console.log("Нажата клавиша Page Up");
    } else if (event.key === 'PgDn') {
        console.log("Нажата клавиша Page Down");
    }
});