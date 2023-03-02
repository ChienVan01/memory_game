var wordText = document.querySelector('.word'), levelText = document.querySelector('.level span'), hintText = document.querySelector('.hint span'), timeText = document.querySelector('.time b'), inputField = document.getElementsByTagName('input'), refreshBtn = document.querySelector('.refresh-word'), checkBtn = document.querySelector('.check-word');
var correctWord, timer;
var initTimer = function (maxTime) {
    clearInterval(timer);
    timer = setInterval(function () {
        if (maxTime > 0) {
            maxTime--;
            return (timeText.innerText = maxTime);
        }
    }, 1000);
};
var initGame = function (turn) {
    if (turn === void 0) { turn = 1 || undefined; }
    levelText.innerText = "".concat(turn, " - 5");
    initTimer(turn);
    var randomObj = [];
    if (turn === 1) {
        for (var i = 0; i < 5; i++) {
            var numRand = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
            randomObj.push(numRand);
        }
    }
    if (turn === 2) {
        for (var i = 0; i < 5; i++) {
            var numRand = Math.floor(Math.random() * (99 - 10 + 1)) + 10;
            randomObj.push(numRand);
        }
    }
    if (turn === 3) {
        for (var i = 0; i < 5; i++) {
            var numRand = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
            randomObj.push(numRand);
        }
    }
    if (turn === 4) {
        for (var i = 0; i < 5; i++) {
            var numRand = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            randomObj.push(numRand);
        }
    }
    if (turn === 5) {
        for (var i = 0; i < 5; i++) {
            var numRand = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
            randomObj.push(numRand);
        }
    }
    console.log('randomObj', randomObj);
    var timeOut = turn * 1000;
    timeText.innerText = turn.toString();
    setTimeout(function () {
        hintText.innerText = '';
    }, timeOut);
    var hint = function () {
        var text;
        for (var index = 0; index < randomObj.length; index++) {
            if (index === 0) {
                text = randomObj[index] + ' - ';
            }
            else if (index === randomObj.length - 1) {
                text = text + randomObj[index];
            }
            else {
                text = text + randomObj[index] + ' - ';
            }
        }
        return text;
    };
    hintText.innerText = hint();
    correctWord = randomObj;
    for (var index = 0; index < inputField.length; ++index) {
        inputField[index].value = '';
    }
};
initGame(4);
var compareArrays = function (a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
};
var checkWord = function () {
    var userNumber = [];
    for (var index = 0; index < correctWord.length; index++) {
        var element = document.getElementById("number".concat(index + 1)).value;
        userNumber.push(parseInt(element));
    }
    console.log('userNumber', userNumber);
    if (!userNumber)
        return alert('Please enter the word to check!');
    if (!compareArrays(userNumber, correctWord))
        return alert("Oops! ".concat(userNumber, " is not a correct word"));
    if (compareArrays(userNumber, correctWord) &&
        parseInt(levelText.innerText + 1) === 5) {
        alert("You have a super memory");
        initGame();
    }
    else {
        alert("Congrats! ".concat(correctWord, " is the correct word"));
        initGame(parseInt(levelText.innerText) + 1);
    }
};
var refreshGame = function () {
    initGame();
};
refreshBtn.addEventListener('click', refreshGame);
checkBtn.addEventListener('click', checkWord);
