/* 

  there are two functions in the area before search-box which is used for showing current weather.

  First, loading default weather data - location setting is Taipei. 

  Second, updating weather data depending on user's choice.

  * weather data from openweathermap API

*/

const button = document.querySelector('.input-btn');
const inputPlace = document.querySelector('.input');
const weather = document.getElementById('weather');

// API setting
const api = {
  key: "3d716a0e2a794f526b62dcd5f05c9440",
  base: "https://api.openweathermap.org/data/2.5/"
}

// default weather location - taipei 
function loadWeather(){
  axios.get(`${api.base}weather?q=taipei&units=metric&appid=${api.key}`)
    .then(res => {
      const weatherDefault = `
      <i class="icon wi wi-night-sleet wi-owm-${res.data.weather[0].id}"></i>
      <h1 class="city">${res.data.name}</h1>
      <p class="temp">${Math.round(res.data.main.temp)}<sup>°C</sup></p> 
      `;
      
      weather.innerHTML = weatherDefault;

      // console.log(data.name,data.weather[0].id, Math.round(data.main.temp));
    });
}

// update weather location - user's input
function updateWeather(){
  return axios.get(`${api.base}weather?q=${inputPlace.value}&units=metric&appid=${api.key}`)
    .then(res => {
      const weatherUpdate = `
        <i class="icon wi wi-night-sleet wi-owm-${res.data.weather[0].id}"></i>
        <h1 class="city">${res.data.name}</h1>
        <p class="temp">${Math.round(res.data.main.temp)}<sup>°C</sup></p> 
      `;

      weather.innerHTML = weatherUpdate;

      // get countryId to updateTime
      const countryId = res.data.sys.country;
      return countryId
      // console.log(data.name,data.weather[0].id, Math.round(data.main.temp),data.sys.country);
    })
    .catch(err => {
      if(inputPlace.value) {
        const error = 
        `
          <p class="err">Wrong City Name!</p>
          <p class="err">Please try again.</p> 
         `;

        weather.innerHTML = error;
      }
    });
}


/* 

  The area after search-box is used to show current time based on user's location.

  * current time info from moment.js
  
*/

const date = document.querySelector(".date");
const time = document.querySelector(".time");

// default time - user's current location
function loadTime(){
  let monYear = moment().format("LL");
  let day = moment().format("ddd");
  let hourMin = moment().format("LT");

  date.innerText = `${day}, ${monYear}`;
  time.innerText = `${hourMin}`;
}

// update time - user inputted location
function updateTime(){
  updateWeather().then(res => {
    let data = ct.getTimezonesForCountry(`${res}`);
    let timeZone = data[0].aliasOf;

    let monYear = moment().tz(`${timeZone}`).format("LL");
    let day = moment().tz(`${timeZone}`).format("ddd");
    let hourMin = moment().tz(`${timeZone}`).format("LT");

    date.innerText = `${day}, ${monYear}`;
    time.innerText = `${hourMin}`;
    
    // console.log(data, timeZone[0].aliasOf);
    // console.log(day,monYear, hourMin)
  })
}

window.addEventListener("load", () => {
  loadWeather();
  loadTime();
});
button.addEventListener("click", () => {
  updateWeather();
  updateTime();
});
inputPlace.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      updateWeather();
      updateTime()
      inputPlace.blur();
    }
})


/* 

  click circle button to choose background color.

*/

const inputColor = document.querySelector('input[type="color"]');

function changeBackground(){
  let colorValue = inputColor.value;

  document.body.style.backgroundColor = colorValue;
  inputColor.style.backgroundColor = colorValue;
}

inputColor.addEventListener("change", changeBackground);


/* 

  Resolve input focus issue

*/

function goTop() {
  window.scrollTo(0, 0);
}

inputPlace.addEventListener('blur', goTop);
