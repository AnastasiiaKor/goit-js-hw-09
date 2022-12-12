import { Notify } from 'notiflix/build/notiflix-notify-aio';
const formEl = document.querySelector('.form');
const array = [];
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const delayValue = Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  array.lenght = Number(formEl.amount.value);

  for (
    let position = 1, delay = delayValue;
    position <= array.lenght;
    position += 1, delay += step
  ) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
