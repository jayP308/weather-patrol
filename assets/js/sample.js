let cityDisplay = document.getElementById("city-display");
let cityList = document.getElementById("city-list");
let submitBtn = document.getElementById('submit-button');
let userInput = document.getElementById('user-input');
let clearBtn = document.getElementById('clear-button');
let cityName = document.querySelector(".city-name");
let cityName1 = document.querySelector(".city-name1");
let todaysDate = document.getElementById('date-display');
let savedCities1 = JSON.parse(localStorage.getItem("data")) || [];

let d = new Date();
let displayMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let displayDays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let currentWeatherData ='https://api.openweathermap.org/data/2.5/weather?q=';
let currentWeather ='https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=298a7fbb0e1f26ad78c570cfb48a026b';
var fiveWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
let APIKey = '298a7fbb0e1f26ad78c570cfb48a026b';
dateDisplay();

function dateDisplay () {
    let month = displayMonths[d.getMonth()];
    let day = displayDays[d.getDay()];
    document.getElementById("date-display").innerHTML = month + " " + d.getDate() + "," + " " + d.getFullYear() + " " + "-" + " " + day; 
} 

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
                cityDisplay.style.backgroundColor = "none";
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
        cityDisplay.style.display = "none";
        window.location.reload();
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
        } else {
            storeCity.value = " ";
            return;
        }
        }) 
        .catch(error => console.log(error));

        fetch(fiveDayUrl2)
        .then(res => res.json())
        .then(data1 => {
            console.log(data1);
            renderFutureWeather(data1);
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
    weatherHumidEl.textContent = "Humidity:" + " " + weatherHumid + " " + "%";
    cityName.appendChild(weatherHumidEl);
  }

  function renderFutureWeather(data1) {
    console.log(data1);
    cityName1.innerHTML = " ";
    let date = new Date()
    let nextDay = (date.getMonth()+ 1) + "/" + (date.getDate() + 1) + "/" + date.getFullYear();
    let futureTemp = data1.list[0].main.temp_max;
    let futureWind = data1.list[0].wind.speed;
    let futureHumid = data1.list[0].main.humidity;

    let nextDayEl = document.createElement("h2");
    nextDayEl.textContent = nextDay;
    cityName1.appendChild(nextDayEl);

    let futureTempEl = document.createElement("p");
    futureTempEl.textContent = "Temperature:" + " " + futureTemp + " " + "℉";
    futureTempEl.className = "weather-info";
    cityName1.appendChild(futureTempEl);

    let futureWindEl = document.createElement("p");
    futureWindEl.textContent = "Wind:" + " " + futureWind + " " + "MPH";
    futureWindEl.className = "weather-info";
    cityName1.appendChild(futureWindEl)

    let futureHumidEl = document.createElement("p");
    futureHumidEl.textContent = "Humidity:" + " " + futureHumid + " " + "%";
    futureHumidEl.className = "weather-info";
    cityName1.appendChild(futureHumidEl)


  }
