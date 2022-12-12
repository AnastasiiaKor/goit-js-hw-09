const startBtn = document.querySelector('button[data-start]');
const bodyEl = document.querySelector('body');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = 0;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  startBtn.disabled = true;
  timerId = setInterval(changingColor, 1000);
}

function onStopBtnClick() {
  clearInterval(timerId);
  startBtn.disabled = false;
}

function changingColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
