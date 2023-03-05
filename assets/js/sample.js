let cityDisplay = document.getElementById("city-display");
let cityList = document.getElementById("city-list");
let submitBtn = document.getElementById('submit-button');
let userInput = document.getElementById('user-input');
let savedCities1 = JSON.parse(localStorage.getItem("data")) || [];


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
        for (let i=0; i < cityInput.length; i++) {
            if(savedCities1.indexOf(cityInput) == -1){
                savedCities1.push(cityInput)
                cityDisplay.appendChild(cityInputEl);
                cityInputEl.textContent = cityInput;
                localStorage.setItem("data", JSON.stringify(savedCities1));

            }
        }
    }
    cityInput.textContent = " ";
});

for(let i=0; i < savedCities1.length; i++) {
    let storeCity = document.createElement("p");
    let clearBtn = document.createElement("button");
    clearBtn.textContent = "X"
    storeCity.textContent = savedCities1[i];
    storeCity.className = "hover-effect";
    clearBtn.className = "clear-button";
    cityDisplay.appendChild(storeCity);
    storeCity.appendChild(clearBtn);
}

