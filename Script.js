let cityInput = document.querySelector("input");
let weatherButton = document.querySelector("button");

weatherButton.addEventListener("click", function() {

    let city = cityInput.value;

    let weather = document.querySelector("#weather");

    weather.innerText = "You searched for: " + city;

});
