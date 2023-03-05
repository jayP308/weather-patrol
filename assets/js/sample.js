let cityDisplay = document.getElementById("city-display");
let cityList = document.getElementById("city-list");
let submitBtn = document.getElementById('submit-button');
let userInput = document.getElementById('user-input');
let clearBtn = document.getElementById('clear-button');
let cityName = document.querySelector(".city-name");
let savedCities1 = JSON.parse(localStorage.getItem("data")) || [];

let currentWeatherData ='https://api.openweathermap.org/data/2.5/weather?q=';
let currentWeather ='https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=298a7fbb0e1f26ad78c570cfb48a026b';
var fiveWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
let APIKey = '298a7fbb0e1f26ad78c570cfb48a026b';


submitBtn.addEventListener("click", () => {

    let cityInput = userInput.value;
    
    if(cityInput === ''){
        swal ({
            title: 'Cannot Be Blank! Please Try Again',
            icon: 'warning',
            button: false,
            text: ' ',
            timer: 1200
        })
        return;
    } else {
        let cityInputEl = document.createElement("p");
        cityInputEl.className = "hover-effect";
        for (let i=0; i < cityInput.length; i++) {
            if(savedCities1.indexOf(cityInput) == -1){
                savedCities1.push(cityInput)
                cityDisplay.appendChild(cityInputEl);
                cityInputEl.textContent = cityInput;
                localStorage.setItem("data", JSON.stringify(savedCities1));
            }
            clearBtn.addEventListener("click", function() {
                localStorage.removeItem("data");
                cityDisplay.textContent = " ";
                cityInputEl.style.backgroundColor = "transparent";
            })
        }
    }
    $('#user-input').val('');
});

for(let i=0; i < savedCities1.length; i++) {
    let storeCity = document.createElement("p");
    storeCity.textContent = savedCities1[i];
    storeCity.className = "hover-effect";
    cityDisplay.appendChild(storeCity);

    clearBtn.addEventListener("click", function() {
        localStorage.removeItem("data");
        storeCity.textContent = " ";
        storeCity.style.backgroundColor = "transparent";
    })

    storeCity.addEventListener('click', () => {
        let Url2 = currentWeatherData + savedCities1[i] + "&units=imperial" + '&appid=298a7fbb0e1f26ad78c570cfb48a026b';
        let fiveDayUrl2 = fiveWeatherURL + savedCities1[i] + "&units=imperial" + '&appid=298a7fbb0e1f26ad78c570cfb48a026b';

        fetch(Url2)
        .then(res => res.json())
        .then(data => {
        if(data.name === savedCities1[i]){
            userInput.value = "";
            renderCurrentWeather(data);
        }
        }) 
        .catch(error => console.log(error));

        fetch(fiveDayUrl2)
        .then(res => res.json())
        .then(data1 => {
           console.log(data1);
        })
        .catch(error => console.log(error));

        })
}

function renderCurrentWeather (data) {
    cityName.innerHTML = " ";
    let weatherName = data.name;
    let date = new Date();
    let todaysDate = date.toLocaleDateString('en-US');
    let weatherIcon = data.weather[0].icon;
    let weatherPic = 'https://openweathermap.org/img/wn/' + weatherIcon + '.png';
    let weatherTemp = data.main.temp_max;
    let weatherWind = data.wind.speed;
    let weatherHumid = data.main.humidity;

    let weatherIconEl = document.createElement("img");
    weatherIconEl.className = "weather-info1"
    weatherIconEl.src = weatherPic;
    cityName.appendChild(weatherIconEl);

    let weatherNameEl = document.createElement("h2");
    weatherNameEl.textContent = weatherName + " " +"("+ todaysDate + ")";
    cityName.appendChild(weatherNameEl);

    let weatherTempEl = document.createElement("p");
    weatherTempEl.className = "weather-info";
    weatherTempEl.textContent = "Temperature:" + " " + weatherTemp + " " + "℉";
    cityName.appendChild(weatherTempEl);

    let weatherWindEl = document.createElement("p");
    weatherWindEl.className = "weather-info";
    weatherWindEl.textContent = "Wind:" + " " + weatherWind + " " + "MPH";
    cityName.appendChild(weatherWindEl);

    let weatherHumidEl = document.createElement("p");
    weatherHumidEl.className = "weather-info";
    weatherHumidEl.textContent = "Humid:" + " " + weatherHumid + " " + "%";
    cityName.appendChild(weatherHumidEl);
  }

  function renderFutureWeather(data1) {
    console.log(data1);
  }