function dateFormat(date) {
  let day = date.getDay();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let dates = date.getDate();

  let weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${weekDay[day]}, ${dates}th , ${hour}:${minute}`;
}

let date = new Date();
let DateLocator = document.querySelector(".time");
DateLocator.innerHTML = dateFormat(date);

function weatherApi(event) {
  debugger;
  event.preventDefault();
  let searchResult = document.querySelector("#city-search");
  let searchResultValue = searchResult.value;
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchResultValue}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(temperature) {
  let weather = Math.round(temperature.data.main.temp);
  let country = temperature.data.sys.country;
  let cityName = temperature.data.name;
  let description = temperature.data.weather[0].description;
  let maxTemperature = Math.round(temperature.data.main.temp_max);
  let humidity = temperature.data.main.humidity;
  let wind = Math.round(temperature.data.wind.speed);

  console.log(weather);

  let barcelona = document.querySelector("#country-title");
  let numberTemperature = document.querySelector(".number-temp");
  let descriptionTitle = document.querySelector(".weather-description");
  let humidityList = document.querySelector("#humidity-li");
  let maxTempList = document.querySelector("#max-temp");
  let windSpeedList = document.querySelector("#wind-speed");

  barcelona.innerHTML = `${cityName}, ${country} `;
  numberTemperature.innerHTML = `${weather}°C`;
  descriptionTitle.innerHTML = `${description}`;
  maxTempList.innerHTML = `Max Temperature: ${maxTemperature}°C`;
  humidityList.innerHTML = `Humidity: ${humidity}%`;
  windSpeedList.innerHTML = `Wind: ${wind} km/h`;
}

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", weatherApi);

function fetchCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a95c2c6739994ba4903e007ee817e7d1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(fetchCurrentLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);
