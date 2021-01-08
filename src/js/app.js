const button = document.querySelector('.input-btn');
const input = document.querySelector('.input');
const weather = document.getElementById('weather');


// API setting
const api = {
  key: "3d716a0e2a794f526b62dcd5f05c9440",
  base: "https://api.openweathermap.org/data/2.5/"
}

// default weather location - taipei 
window.addEventListener('load', () => {
  fetch(`${api.base}weather?q=taipei&units=metric&appid=${api.key}`)
  .then(response => response.json())
  .then(data => {
    const weatherDefault = `
      <i class="icon wi wi-night-sleet wi-owm-${data.weather[0].id}"></i>
      <h1 class="city">${data.name}</h1>
      <p class="temp">${Math.round(data.main.temp)}<sup>°C</sup></p> 
    `
    weather.innerHTML = weatherDefault;

    console.log(data.name,data.weather[0].id, Math.round(data.main.temp));
  })
});


button.addEventListener('click', () => {
  fetch(`${api.base}weather?q=${input.value}&units=metric&appid=${api.key}`)
    .then(response => response.json())
    .then(data => {
      const weatherUpdate = `
        <i class="icon wi wi-night-sleet wi-owm-${data.weather[0].id}"></i>
        <h1 class="city">${data.name}</h1>
        <p class="temp">${Math.round(data.main.temp)}<sup>°C</sup></p> 
      `;

      weather.innerHTML = weatherUpdate;

      console.log(data.name,data.weather[0].id, Math.round(data.main.temp));
    })
})

/* ============================ */

const nowDate = document.querySelector('.date');
const nowTime = document.querySelector('.time');

function setTime() {
  /* get date */
  const today = new Date();
  const year = today.getFullYear();
  const date = today.getDate();
  const months = [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                  'August',
                  'September',
                  'October',
                  'November',
                  'December'
                  ]
  const month = months[today.getMonth()];
  const days = [
                  'Sun',
                  'Mon',
                  'Tue',
                  'Wed',
                  'Thu',
                  'Fri',
                  'Sat'
                  ]
  const day = days[today.getDay()];

  const formattedDate = `${day}, ${date} ${month}, ${year}`

  nowDate.innerText = formattedDate;
  // console.log(formatted)

  /* get time */
  let hrs = today.getHours();
  let mins = today.getMinutes(); 


  hrs = hrs < 10 ? `0${hrs}`: hrs;
  mins = mins < 10 ? `0${mins}` : mins;

  const formattedTime = `${hrs}:${mins}`;

  nowTime.innerText = formattedTime;
  setInterval(setTime,1000);
  // console.log(formattedTime);
}

setTime();
