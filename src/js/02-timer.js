import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
};

let timerId = 0;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    checkingDate(selectedDates);
  },
};
const fp = flatpickr(refs.input, options);

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.startBtn.disabled = true;

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  timerId = setInterval(updateTimer, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateTimer() {
  const inputDate = new Date(refs.input.value);
  const dif = inputDate.getTime() - Date.now();
  if (dif < 0) {
    clearInterval(timerId);
  } else {
    const convertedMS = convertMs(dif);
    drawTimer(({ days, hours, minutes, seconds } = convertedMS));
  }
}

function drawTimer(obj) {
  refs.timer.innerHTML = `<div class="field">
        <span class="value" data-days>${days}</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-hours>${hours}</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>${minutes}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>${seconds}</span>
        <span class="label">Seconds</span>
      </div>`;
}
function checkingDate(object) {
  if (object[0].getTime() <= Date.now()) {
    refs.startBtn.disabled = true;
    Notify.failure('Please choose a date in the future');
  } else {
    refs.startBtn.disabled = false;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
