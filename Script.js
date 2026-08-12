let cityInput = document.querySelector("#cityInput");
let weatherButton = document.querySelector("#weatherButton");
let weather = document.querySelector("#weather");

weatherButton.addEventListener("click", async function() {

    let city = cityInput.value;

    if (city === "") {
        weather.innerText = "Please enter a city name.";
        return;
    }

    weather.innerText = "Loading weather...";

    try {

        // Find the city
        let locationResponse = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" 
            + encodeURIComponent(city) 
            + "&count=1&language=en&format=json"
        );

        let locationData = await locationResponse.json();

        if (!locationData.results) {
            weather.innerText = "City not found.";
            return;
        }

        let latitude = locationData.results[0].latitude;
        let longitude = locationData.results[0].longitude;
        let cityName = locationData.results[0].name;

        // Get weather
        let weatherResponse = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude="
            + latitude
            + "&longitude="
            + longitude
            + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m"
        );

        let weatherData = await weatherResponse.json();

        let temperature = weatherData.current.temperature_2m;
        let humidity = weatherData.current.relative_humidity_2m;
        let windSpeed = weatherData.current.wind_speed_10m;

        weather.innerHTML =
            "<h2>" + cityName + "</h2>" +
            "<p>Temperature: " + temperature + " °C</p>" +
            "<p>Humidity: " + humidity + " %</p>" +
            "<p>Wind Speed: " + windSpeed + " km/h</p>";

    } catch (error) {

        weather.innerText = "Unable to get weather information.";

    }

});
