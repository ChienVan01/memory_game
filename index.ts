const wordText = document.querySelector('.word'),
  levelText = document.querySelector('.level span'),
  hintText = document.querySelector('.hint span'),
  timeText = document.querySelector('.time b'),
  inputField = document.getElementsByTagName('input'),
  refreshBtn = document.querySelector('.refresh-word'),
  checkBtn = document.querySelector('.check-word');

let correctWord: Array<number>, timer;

const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return ((timeText as HTMLInputElement).innerText = maxTime);
    }
  }, 1000);
};

const initGame = (turn: number = 1 || undefined) => {
  (levelText as HTMLInputElement).innerText = `${turn} - 5`;

  initTimer(turn);

  let randomObj: Array<number> = [];

  if (turn === 1) {
    for (let i = 0; i < 5; i++) {
      let numRand = Math.floor(Math.random() * (9 - 0 + 1)) + 0;

      randomObj.push(numRand);
    }
  }
  if (turn === 2) {
    for (let i = 0; i < 5; i++) {
      let numRand = Math.floor(Math.random() * (99 - 10 + 1)) + 10;

      randomObj.push(numRand);
    }
  }
  if (turn === 3) {
    for (let i = 0; i < 5; i++) {
      let numRand = Math.floor(Math.random() * (999 - 100 + 1)) + 100;

      randomObj.push(numRand);
    }
  }
  if (turn === 4) {
    for (let i = 0; i < 5; i++) {
      let numRand = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;

      randomObj.push(numRand);
    }
  }
  if (turn === 5) {
    for (let i = 0; i < 5; i++) {
      let numRand = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

      randomObj.push(numRand);
    }
  }
  console.log('randomObj', randomObj);

  const timeOut = turn * 1000;

  (timeText as HTMLInputElement).innerText = turn.toString();

  setTimeout(() => {
    (hintText as HTMLInputElement).innerText = '';
  }, timeOut);

  const hint = () => {
    let text;
    for (let index = 0; index < randomObj.length; index++) {
      if (index === 0) {
        text = randomObj[index] + ' - ';
      } else if (index === randomObj.length - 1) {
        text = text + randomObj[index];
      } else {
        text = text + randomObj[index] + ' - ';
      }
    }
    return text;
  };

  (hintText as HTMLInputElement).innerText = hint();

  correctWord = randomObj;

  for (let index = 0; index < inputField.length; ++index) {
    inputField[index]!.value = '';
  }
};
initGame();

const compareArrays = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

const checkWord = () => {
  let userNumber: Array<number> = [];

  for (let index = 0; index < correctWord.length; index++) {
    const element = (
      document.getElementById(`number${index + 1}`) as HTMLInputElement
    ).value;
    userNumber.push(parseInt(element));
  }

  console.log('userNumber', userNumber);

  if (!userNumber) return alert('Please enter the word to check!');

  if (!compareArrays(userNumber, correctWord))
    return alert(`Oops! ${userNumber} is not a correct word`);

  if (
    compareArrays(userNumber, correctWord) &&
    parseInt((levelText as HTMLInputElement).innerText + 1) === 5
  ) {
    alert(`You have a super memory`);
    initGame();
  } else {
    alert(`Congrats! ${correctWord} is the correct word`);
    initGame(parseInt((levelText as HTMLInputElement).innerText) + 1);
  }
};

const refreshGame = () => {
  initGame();
};

refreshBtn!.addEventListener('click', refreshGame);
checkBtn!.addEventListener('click', checkWord);
