function formatTime(date) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = weekDays[now.getDay()];
  const hour = now.getHours();
  const min = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();

  return `${day} ${hour}:${min}`;
}

const now = new Date();
const localTime = document.getElementById("local-time");
localTime.innerHTML = formatTime(now);


function success(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const unit = "metric";
  const apiKey = "31b4e5b138aa68767a86bde182ff2f27";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  const cityElement = document.querySelector("h1");
  cityElement.innerHTML = "Your Current Location";

  const locationdot = document.getElementById("clickable-locationdot");
  locationdot.addEventListener("click", getPosition);

  axios.get(apiUrl).then(update);

  function getPosition(event) {
    navigator.geolocation.getCurrentPosition(success);
  }
}

const celsiusButton = document.getElementById("degree-celsius");
const fahrenheitButton = document.getElementById("degree-fahrenheit");
const tempValueElement = document.getElementById("city-temperature");
let isCelsius = true;

function convertTemperature(unit) {
  const tempData = parseFloat(tempValueElement.textContent);
  if (unit === "F") {
    tempValueElement.textContent = ((tempData * 9) / 5 + 32).toFixed(1);
  } else {
    tempValueElement.textContent = ((tempData - 32) * (5 / 9)).toFixed(1);
  }
}

celsiusButton.addEventListener("click", function () {
  if (!isCelsius) {
    convertTemperature("C");
    isCelsius = true;
  }
});

fahrenheitButton.addEventListener("click", function () {
  if (isCelsius) {
    convertTemperature("F");
    isCelsius = false;
  }
});

let originalTempData;
let convertedTempData;

function updateTemperatures(tempInCelsius) {
  originalTempData = tempInCelsius;
  convertedTempData = (originalTempData * 9) / 5 + 32;

  const tempValueElement = document.getElementById("city-temperature");

  if (isCelsius) {
    tempValueElement.textContent = originalTempData.toFixed(1);
  } else {
    tempValueElement.textContent = convertedTempData.toFixed(1);
  }
}

function update(response) {
  const tempInCelsius = Math.round(response.data.main.temp);
  updateTemperatures(tempInCelsius);
}

celsiusButton.addEventListener("click", function () {
  if (!isCelsius) {
    isCelsius = true;
    updateTemperatures(originalTempData);
  }
});

fahrenheitButton.addEventListener("click", function () {
  if (isCelsius) {
    isCelsius = false;
    updateTemperatures(convertedTempData);
  }
});

function updateCityName(cityName) {
  const cityNameElement = document.getElementById("city-name");
  cityNameElement.textContent = cityName;
}

function getWeatherData(event) {
  event.preventDefault();
  const userCity = document.getElementById("user-city").value;

  const apiKey = "31b4e5b138aa68767a86bde182ff2f27";
  const unit = "metric";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${apiKey}&units=${unit}`;

  axios
    .get(apiUrl)
    .then(function (response) {
      update(response);
      updateCityName(userCity);
      updateWeatherParameters(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function updateWeatherParameters(response) {
  const weatherDescriptionData = response.data.weather[0].description;
  const humidityData = response.data.main.humidity;
  const windSpeedData = Math.round(response.data.wind.speed);

  const weatherDescriptionElement = document.getElementById(
    "weather-description"
  );
  const humidityElement = document.getElementById("humidity");
  const windSpeedElement = document.getElementById("wind-speed");

  weatherDescriptionElement.textContent =
    "Description: " + weatherDescriptionData;
  humidityElement.textContent = "Humidity: " + humidityData + "%";
  windSpeedElement.textContent = "Wind Speed: " + windSpeedData + " km/h";
}

const searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", getWeatherData);