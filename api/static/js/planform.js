
var destinationlattitude, destinationllongttitude;
var neLatitude, neLongitude, swLatitude, swLongitude;

document.addEventListener("DOMContentLoaded", function() {
    var startDateInput = document.getElementById("startDate");
    if (startDateInput) {
        startDateInput.min = new Date().toISOString().split("T")[0];
    }
});

const input_place = document.getElementById("input_place");

$(document).ready(function () {
    var inputTimeout;

    $('#input_place').on("input", function () {
        clearTimeout(inputTimeout); // Clear any previous timeout

        inputTimeout = setTimeout(function () {
            console.log($('#input_place').val());
            $.ajax({
                cache: false,
                url: `/estimatePlace`,
                method: "GET",
                dataType: "json",
                data: {
                    city: $('#input_place').val()
                },
                success: function(response) {
                    console.log(response);
                    $('#placeList').html('');
                    response.forEach(function(element) {
                        $('#placeList').append(`<option value="${element.message}">`);
                    });
                },
                error: function(xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        }, 1000); // Delay the execution by 1 second (1000 milliseconds)
    });
});

function initAutocomplete() {
    var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('input_place'), { types: ['geocode'] }
    );

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
        }
        var location = place.geometry.location;
        var viewport = place.geometry.viewport;
        var ne = viewport.getNorthEast(); // northeast corner of the viewport
        var sw = viewport.getSouthWest(); // southwest corner of the viewport

        neLatitude = ne.lat();
        neLongitude = ne.lng();
        swLatitude = sw.lat();
        swLongitude = sw.lng();
        destinationlattitude = location.lat();
        destinationllongttitude = location.lng();

        // Assuming you want to display these in the HTML
        // document.getElementById('tr_latitude').textContent = ne.lat();
        // document.getElementById('tr_longitude').textContent = ne.lng();
        // document.getElementById('bl_latitude').textContent = sw.lat();
        // document.getElementById('bl_longitude').textContent = sw.lng();
        // document.getElementById('latitude').textContent = location.lat();
        // document.getElementById('longitude').textContent = location.lng()
    });
}


// google.maps.event.addDomListener(window, 'load', initAutocomplete);

$(document).ready(function () {
    $('.activity-box').click(function () {
        // This will toggle the 'selected' class on and off when user click on an activity box
        $(this).toggleClass('selected');
    });

    $(document).ready(function () {
        var today = new Date().toISOString().substring(0, 10);
        $('#startDate').val(today);
    });
});


function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
}



function handleSubmit() {
    // Capture form data
    var country = document.getElementById('input_place').value;
    var travelDate = document.getElementById('startDate').value;
    var numOfDays = document.getElementById('numDays').value;
    var numOfPeople = document.getElementById('peopleCount').value;
    var budget = document.getElementById('budgetSelect').value;
    var selectedActivities = Array.from(document.querySelectorAll('.activity-box.selected'))
        .map(box => box.getAttribute('data-activity'));


    // Create AllTravelDates array
    var AllTravelDates = [travelDate];
    for (var i = 1; i < numOfDays; i++) {
        AllTravelDates.push(addDays(travelDate, i));
    }

    // Create destination object
    var destination = {
        bl_lat: swLatitude,
        bl_lng: swLongitude,
        tr_lat: neLatitude,
        tr_lng: neLongitude
    };

    // Store data in session storage
    sessionStorage.setItem('tripData', JSON.stringify({
        "userID": 18,
        destination,
        country,
        travelDate,
        numOfDays,
        AllTravelDates,
        selectedActivities,
        budget,
        numOfPeople,
        destinationlattitude: destinationlattitude,
        destinationllongttitude: destinationllongttitude
    }));

    window.location.href = '/travel/hotel';
}