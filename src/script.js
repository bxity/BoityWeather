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

function update(response) {
  const cityData = response.data.name;
  const tempData = Math.round(response.data.main.temp);
  const maxTempData = Math.round(response.data.main.temp_max);
  const minTempData = Math.round(response.data.main.temp_min);
  const descrData = response.data.weather[0].main;
  const humidityData = response.data.main.humidity;
  const windSpeedData = Math.round(response.data.wind.speed);

  const city = document.querySelector("h1");
  const temp = document.getElementById("city-temperature");
  const weatherReport = document.getElementById("weather-report");
  const weatherParams = document.getElementById("weather-params");

  city.innerHTML = cityData;
  temp.innerHTML = tempData;
  weatherReport.innerHTML =
    descrData + "<br />" + maxTempData + "°&nbsp;&nbsp" + minTempData + "°";
  weatherParams.innerHTML =
    "Humidity: " +
    humidityData +
    "%" +
    "<br />" +
    "Wind: " +
    windSpeedData +
    " km/h";

    const weatherDescriptionData = response.data.weather[0].description;

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


const weatherIconsMap = {
  "01d": "owf owf-800",
  "02d": "owf owf-801",
  "03d": "owf owf-803",
  "04d": "owf owf-804",
  "09d": "owf owf-502",
  "10d": "owf owf-501",
  "11d": "owf owf-200",
  "13d": "owf owf-600",
  "50d": "owf owf-741",

};


function updateWeatherIcon(conditionCode) {
  const iconElement = document.getElementById("weather-icon");
  const iconClass = weatherIconsMap[conditionCode] || "owf owf-800"; 


  iconElement.className = iconClass;
}


const apiResponse = {
  weather: [
    {
      icon: "01d" 
    }
  ]
};


updateWeatherIcon(apiResponse.weather[0].icon);
