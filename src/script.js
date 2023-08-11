function getCurrentDateTime() {
  const currentDate = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  };
  return currentDate.toLocaleTimeString("en-US", options);
}

function updateDateTime() {
  const currentDateTimeElement = document.getElementById("currentDateTime");
  currentDateTimeElement.textContent = getCurrentDateTime();
}

function displayWeatherData(data) {
  const cityName = data.name;
  const currentTemp = data.main.temp;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <p>City: ${cityName}</p>
    <p>Current Temperature: ${currentTemp} °C</p>`;
}

function handleWeatherError(error) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "<p>Please enter a valid city.</p>";
  console.error("Error fetching weather data:", error);
}

function fetchWeatherData(city) {
  const apiKey = "31b4e5b138aa68767a86bde182ff2f27";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then((response) => displayWeatherData(response.data))
    .catch(handleWeatherError);
}

function handleSubmit(event) {
  event.preventDefault();
  const city = document.getElementById("city").value;
  fetchWeatherData(city);
}

function initWeatherApp() {
  setInterval(updateDateTime, 1000);

  const weatherForm = document.getElementById("weatherForm");
  weatherForm.addEventListener("submit", handleSubmit);
}

initWeatherApp();
