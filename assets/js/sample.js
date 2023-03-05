let cityDisplay = document.getElementById("city-display");
let cityList = document.getElementById("city-list");
let submitBtn = document.getElementById('submit-button');
let userInput = document.getElementById('user-input');
let clearBtn = document.getElementById('clear-button');

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
}
