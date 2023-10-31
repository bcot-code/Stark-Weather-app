// Current Weather in Austin TX
const cityInputEl = document.querySelector(".cityInput");

//Current time and date
let currentTime = new Date();

let now = document.querySelector("#now");
now.textContent = `${currentTime.toLocaleString("en-us", {
  year: "numeric",
  month: "short",
  day: "2-digit",
})}, ${String(currentTime.getHours()).padStart(2, "0")}:${String(
  currentTime.getMinutes()
).padStart(2, "0")}`;

function currentCity(e) {
  e.preventDefault();
  let newName = document.querySelector("#cityName").value;

  console.log(newName);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${newName},us&units=imperial&appid=50fa4024e3b1d5eac2f51ab18a47e997`
  )
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      console.log(data);

      let tempFahrenheit = data.main.temp;
      let cityName = data.name;
      let humidity = data.main.humidity;
      let windSpeed = data.wind.speed;
      // Display Temp
      const temperatureDisplay = document.getElementById("Temp");
      console.log("temperature", temperatureDisplay);
      temperatureDisplay.textContent = `${cityName}: ${Math.round(
        tempFahrenheit
      )}°F`;
      //Display Humidity
      const humidityDisplay = document.getElementById("Humidity");
      humidityDisplay.textContent = `Humidity: ${humidity}%`;
      const windDisplay = document.getElementById("Wind");
      windDisplay.textContent = `Wind Speed: ${Math.round(
        (windSpeed * 3600) / 100
      )} mph`;
      //Display ICON
      let currenticon = data.weather[0].icon;
      console.log(currenticon);
      const iconDisplay = document.getElementById("wicon");
      iconDisplay.src = `https://openweathermap.org/img/wn/${currenticon}.png`;

      fiveForecast(newName);
    });
}
// The Current Weather
cityInputEl.addEventListener("click", currentCity);

function fiveForecast(city) {
  console.log(city);
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=50fa4024e3b1d5eac2f51ab18a47e997"
  )
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      console.log(data);

      for (let i = 0; i < 5; i++) {
        let today = new Date();
        let forecastDay = new Date(today.getTime() + i * 86400000);

        let forecastDate = forecastDay.toLocaleDateString();
        // ToDo WEATHER FIVE DAY
        let temp = Math.floor(data.list[i].main.temp - 273);
        let humidity = data.list[i].main.humidity;
        let wind = data.list[i].wind.speed;
        let icon = data.list[i].weather[0].icon;
        let iconDisplay = `https://openweathermap.org/img/wn/${icon}.png`;
        // TODO Create the Five Day Forecast boxes
        let forecastBox1 = `
        <h4>${forecastDate}</h4>
        <p><img src=${iconDisplay}> ${temp}&deg;</p>
        <p><span id='humidity'>Humidity: ${humidity}%</span></p>
        <p><span id='wind'> Wind Speed: ${wind} mph</span> </p>`;

        document.querySelector(`.day[data-day="${i}"]`).innerHTML =
          forecastBox1;
      }
      newName = "";
    });
}
