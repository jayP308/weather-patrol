let cityDisplay = document.getElementById("city-display");
let cityList = document.getElementById("city-list");
let submitBtn = document.getElementById('submit-button');
let userInput = document.getElementById('user-input');
let clearBtn = document.getElementById('clear-button');
let cityName = document.querySelector(".city-name");
let cityName1 = document.querySelector(".city-name1");
let cityName2 = document.querySelector(".city-name2");
let cityName3 = document.querySelector(".city-name3");
let cityName4 = document.querySelector(".city-name4");
let cityName5 = document.querySelector(".city-name5");
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
        if(data.name === savedCities1[i] ){
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
    // Render 1st future weather
    console.log(data1);
    cityName1.innerHTML = " ";
    let date = new Date()
    let nextDay = (date.getMonth()+ 1) + "/" + (date.getDate() + 1) + "/" + date.getFullYear();
    let weatherIcon = data1.list[0].weather[0].icon;
    let weatherPic = 'https://openweathermap.org/img/wn/' + weatherIcon + '.png';
    let futureTemp = data1.list[0].main.temp_max;
    let futureWind = data1.list[0].wind.speed;
    let futureHumid = data1.list[0].main.humidity;

    let weatherIconEl = document.createElement("img");
    weatherIconEl.className = "weather-info1"
    weatherIconEl.src = weatherPic;
    cityName1.appendChild(weatherIconEl);

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

    // Renders 2nd future weather
    cityName2.innerHTML = " ";
    let nextDay1 = (date.getMonth()+ 1) + "/" + (date.getDate() + 2) + "/" + date.getFullYear();
    let weatherIcon1 = data1.list[10].weather[0].icon;
    let weatherPic1 = 'https://openweathermap.org/img/wn/' + weatherIcon1 + '.png';
    let futureTemp1 = data1.list[10].main.temp_max;
    let futureWind1 = data1.list[10].wind.speed;
    let futureHumid1= data1.list[10].main.humidity;

    let weatherIconEl1 = document.createElement("img");
    weatherIconEl1.className = "weather-info1"
    weatherIconEl1.src = weatherPic1;
    cityName2.appendChild(weatherIconEl1);

    let nextDayEl1 = document.createElement("h2");
    nextDayEl1.textContent = nextDay1;
    nextDayEl1.className = "wweather-info";
    cityName2.appendChild(nextDayEl1);

    let futureTempEl1 = document.createElement("p");
    futureTempEl1.textContent = "Temperature:" + " " + futureTemp1 + " " + "℉";
    futureTempEl1.className = "weather-info";
    cityName2.appendChild(futureTempEl1);

    let futureWindEl1 = document.createElement("p");
    futureWindEl1.textContent = "Wind:" + " " + futureWind1 + " " + "MPH";
    futureWindEl1.className = "weather-info";
    cityName2.appendChild(futureWindEl1);

    let futureHumidEl1 = document.createElement("p");
    futureHumidEl1.textContent = "Humidity:" + " " + futureHumid1 + " " + "%";
    futureHumidEl1.className = "weather-info";
    cityName2.appendChild(futureHumidEl1);

     // Renders 3rd future weather
     cityName3.innerHTML = " ";
     let nextDay2 = (date.getMonth()+ 1) + "/" + (date.getDate() + 3) + "/" + date.getFullYear();
     let weatherIcon2 = data1.list[20].weather[0].icon;
     let weatherPic2 = 'https://openweathermap.org/img/wn/' + weatherIcon2 + '.png';
     let futureTemp2 = data1.list[20].main.temp_max;
     let futureWind2 = data1.list[20].wind.speed;
     let futureHumid2= data1.list[20].main.humidity;

     let weatherIconEl2 = document.createElement("img");
     weatherIconEl2.className = "weather-info1"
     weatherIconEl2.src = weatherPic2;
     cityName3.appendChild(weatherIconEl2);
 
     let nextDayEl2 = document.createElement("h2");
     nextDayEl2.textContent = nextDay2;
     nextDayEl2.className = "wweather-info";
     cityName3.appendChild(nextDayEl2);
 
     let futureTempEl2 = document.createElement("p");
     futureTempEl2.textContent = "Temperature:" + " " + futureTemp2 + " " + "℉";
     futureTempEl2.className = "weather-info";
     cityName3.appendChild(futureTempEl2);
 
     let futureWindEl2 = document.createElement("p");
     futureWindEl2.textContent = "Wind:" + " " + futureWind2 + " " + "MPH";
     futureWindEl2.className = "weather-info";
     cityName3.appendChild(futureWindEl2);
 
     let futureHumidEl2 = document.createElement("p");
     futureHumidEl2.textContent = "Humidity:" + " " + futureHumid2 + " " + "%";
     futureHumidEl2.className = "weather-info";
     cityName3.appendChild(futureHumidEl2);

     // Renders 4th future weather
     cityName4.innerHTML = " ";
     let nextDay3 = (date.getMonth()+ 1) + "/" + (date.getDate() + 4) + "/" + date.getFullYear();
     let weatherIcon3 = data1.list[30].weather[0].icon;
     let weatherPic3 = 'https://openweathermap.org/img/wn/' + weatherIcon3 + '.png';
     let futureTemp3 = data1.list[30].main.temp_max;
     let futureWind3 = data1.list[30].wind.speed;
     let futureHumid3= data1.list[30].main.humidity;

     let weatherIconEl3 = document.createElement("img");
     weatherIconEl3.className = "weather-info1"
     weatherIconEl3.src = weatherPic3;
     cityName4.appendChild(weatherIconEl3);
 
     let nextDayEl3 = document.createElement("h2");
     nextDayEl3.textContent = nextDay3;
     nextDayEl3.className = "wweather-info";
     cityName4.appendChild(nextDayEl3);
 
     let futureTempEl3 = document.createElement("p");
     futureTempEl3.textContent = "Temperature:" + " " + futureTemp3 + " " + "℉";
     futureTempEl3.className = "weather-info";
     cityName4.appendChild(futureTempEl3);
 
     let futureWindEl3 = document.createElement("p");
     futureWindEl3.textContent = "Wind:" + " " + futureWind3 + " " + "MPH";
     futureWindEl3.className = "weather-info";
     cityName4.appendChild(futureWindEl3);
 
     let futureHumidEl3 = document.createElement("p");
     futureHumidEl3.textContent = "Humidity:" + " " + futureHumid3 + " " + "%";
     futureHumidEl3.className = "weather-info";
     cityName4.appendChild(futureHumidEl3);

     // Renders 5th future weather
     cityName5.innerHTML = " ";
     let nextDay4 = (date.getMonth()+ 1) + "/" + (date.getDate() + 5) + "/" + date.getFullYear();
     let weatherIcon4 = data1.list[39].weather[0].icon;
     let weatherPic4 = 'https://openweathermap.org/img/wn/' + weatherIcon4 + '.png';
     let futureTemp4 = data1.list[39].main.temp_max;
     let futureWind4 = data1.list[39].wind.speed;
     let futureHumid4= data1.list[39].main.humidity;

     let weatherIconEl4 = document.createElement("img");
     weatherIconEl4.className = "weather-info1"
     weatherIconEl4.src = weatherPic4;
     cityName5.appendChild(weatherIconEl4);
 
     let nextDayEl4 = document.createElement("h2");
     nextDayEl4.textContent = nextDay4;
     nextDayEl4.className = "wweather-info";
     cityName5.appendChild(nextDayEl4);
 
     let futureTempEl4 = document.createElement("p");
     futureTempEl4.textContent = "Temperature:" + " " + futureTemp4 + " " + "℉";
     futureTempEl4.className = "weather-info";
     cityName5.appendChild(futureTempEl4);
 
     let futureWindEl4 = document.createElement("p");
     futureWindEl4.textContent = "Wind:" + " " + futureWind4 + " " + "MPH";
     futureWindEl4.className = "weather-info";
     cityName5.appendChild(futureWindEl4);
 
     let futureHumidEl4 = document.createElement("p");
     futureHumidEl4.textContent = "Humidity:" + " " + futureHumid4 + " " + "%";
     futureHumidEl4.className = "weather-info";
     cityName5.appendChild(futureHumidEl4);

  }
