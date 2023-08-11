// Описаний в документації
import flatpickr from "flatpickr";
import notiflix from 'notiflix';
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";


document.addEventListener('DOMContentLoaded', () => {
    startButton.disabled = true;
    startButton.classList.add('disabled');
  });

  let selectedDate
  const options = {
      enableTime: true,
      time_24hr: true,
      defaultDate: new Date(),
      minuteIncrement: 1,

        onClose(selectedDates) {
          selectedDate = selectedDates[0];
          const currentDate = new Date();
  
          if (!selectedDate) {
            return;
          }
  
          if (selectedDate <= currentDate) {
            notiflix.Notify.failure('Please choose a date in the future');
            document.querySelector('[data-start]').setAttribute('disabled', 'true');
            document.querySelector('[data-start]').classList.add('disabled');
          } else {
            document.querySelector('[data-start]').removeAttribute('disabled');
            document.querySelector('[data-start]').classList.remove('disabled');
          }
        },
      };
  
      const datetimePicker = flatpickr("#datetime-picker", options);
      const startButton = document.querySelector('[data-start]');
      const daysElement = document.querySelector('[data-days]');
      const hoursElement = document.querySelector('[data-hours]');
      const minutesElement = document.querySelector('[data-minutes]');
      const secondsElement = document.querySelector('[data-seconds]');
  
      startButton.addEventListener('click', () => {
        const currentDate = new Date();
  
        if (!selectedDate || selectedDate <= currentDate) {
          notiflix.Notify.failure('Please choose a valid date in the future');
          return;
        }
  
        startButton.disabled = true;
        startButton.classList.add('disabled');
        datetimePicker._input.classList.add('disabled');
        datetimePicker._input.disabled = true;
        datetimePicker._input.style.cursor = 'auto';
        countdownInterval = setInterval(updateCountdown, 1000);
        updateCountdown();
  
        function updateCountdown() {
          const timeDiff = selectedDate - new Date();
          if (timeDiff <= 0) {
            clearInterval(countdownInterval);
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            startButton.classList.remove('disabled');
            notiflix.Notify.success('Countdown finished!');
          } else {
            const timeValues = convertMs(timeDiff);
            daysElement.textContent = addLeadingZero(timeValues.days);
            hoursElement.textContent = addLeadingZero(timeValues.hours);
            minutesElement.textContent = addLeadingZero(timeValues.minutes);
            secondsElement.textContent = addLeadingZero(timeValues.seconds);
          }
        }
      });


    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;
    
        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    
        return { days, hours, minutes, seconds };
    }

    function addLeadingZero(value) {
        return value < 10 ? `0${value}` : value;
    }