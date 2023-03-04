let cityList = $('#city-list');
let submitBtn = $('#submit-button');

function cityListEl (event) {
    event.preventDefault();

    let cityInput = $('input[name="user-input"]').val();

    if(!cityInput) {
        swal({
            title: "Cannot Be Blank!", icon: "error", text:' ', button: false, timer: 1200
        })
        return;
    } else {
        let cityInputEl = $(
        '<li class="flex-row justify-space-between align-center p-2" style="font-size: 25px; list-style: none; background-color: lightblue; margin-right: 5px; margin-top: 5px">'
        );
        cityInputEl.text(cityInput);
        cityInputEl.append('<button class="btn btn-danger btn-small remove-btn" style="float: right;">Clear</button>');
        cityList.append(cityInputEl);
    }
    $('input[name="user-input"]').val('');
}

cityList.on('click', '.remove-btn', function(event) {
    $(event.target).parent().remove();
})

submitBtn.on('click', cityListEl);