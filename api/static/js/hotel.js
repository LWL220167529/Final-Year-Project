/*function selectCard() {
     $('.hotel-select').on('click', function() {
         // Toggle the visibility of other cards
        $(this).closest('.card').toggleClass('selected');
        if ($(this).closest('.card').hasClass('selected')) {
            // If the card is selected, hide others
            $('.card').not('.selected').hide();
            $(this).text('Deselect');

             // Log the selected hotel's data
             var hotelData = $(this).closest('.card').data('hotel');
            console.log('Selected Hotel:', hotelData);

        } else {
            // If deselected, show all cards
            $('.card').show();
            $(this).text('Select');
        }
      });
   }*/


$(document).ready(function () {
    var allHotels = [];
    var filteredHotels = [];
    var minPriceRange = $('#minPriceRange');
    var maxPriceRange = $('#maxPriceRange');
    var minPriceInput = $('#minPriceInput');
    var maxPriceInput = $('#maxPriceInput');

    $('#hotel_items').on('click', '.hotel-select', function () {
        var card = $(this).closest('.card');
        card.toggleClass('selected');
        if (card.hasClass('selected')) {
            // If the card is selected, hide others
            $('.card').not('.selected').hide();
            $(this).text('Deselect');
            // Log the selected hotel's data
            var hotelData = card.data('hotel');
            console.log('Selected Hotel:', hotelData);
        } else {
            // If deselected, show all cards
            $('.card').show();
            $(this).text('Select');
        }
    });

    // Retrieve stored data from session storage
    /* var storedData = sessionStorage.getItem('tripData');
     var tripData = storedData ? JSON.parse(storedData) : null;
 
     console.log('Stored Data:', storedData);
     console.log('Trip Data:', tripData);*/

    function selectCard() {
        $('.hotel-select').on('click', function () {
            // Toggle the visibility of other cards
            $(this).closest('.card').toggleClass('selected');
            if ($(this).closest('.card').hasClass('selected')) {
                // If the card is selected, hide others
                $('.card').not('.selected').hide();
                $(this).text('Deselect');

                // Log the selected hotel's data
                var hotelData = $(this).closest('.card').data('hotel');
                console.log('Selected Hotel:', hotelData);

            } else {
                // If deselected, show all cards
                $('.card').show();
                $(this).text('Select');
            }
        });
    }

    function loadHotels() {
        // Use axios to make a GET request to load the data from the local JSON file
        axios.get('/static/api/hotel.json')
            .then(function (response) {
                allHotels = response.data['data']['propertySearch']['properties'];
                filteredHotels = allHotels;
                createBootstrapCards(filteredHotels);
                selectCard();
            })
            .catch(function (error) {
                console.error('Error loading hotel', error);
                // Handle errors here
            });
    }
    /* if(tripData) {
            const options = {
                method: 'POST',
                url: 'https://hotels4.p.rapidapi.com/properties/v2/list',
                headers: {
                    'content-type': 'application/json',
                    'X-RapidAPI-Key': '9dd4a43e57msh580d6989141c77ep1f6a87jsn0b698a38873f',
                    'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
                },
                data: {
                    currency: 'USD',
                    locale: 'en_US',
                    destination: {
                        coordinates: {
                            latitude: tripData.destinationlattitude,
                            longitude: tripData.destinationllongttitude
                        }
                    },
                    checkInDate: calculateDate(tripData.travelDate),
                    checkOutDate: calculateDate(tripData.travelDate, parseInt(tripData.numOfDays)),
                    rooms: [
                        {
                            adults: parseInt(tripData.numOfPeople)
                        }
                    ],
                    resultsStartingIndex: 0,
                    resultsSize: 12,
                    sort: 'RECOMMENDED',
                    filters: {
                        guestRating: 45
                    }
                }
            };

axios.request(options).then(function(response) {
allHotels = response.data.data.propertySearch.properties;
filteredHotels = allHotels;
createBootstrapCards(filteredHotels);
selectCard();
}).catch(function(error) {
console.error(error);
// Handle errors here
});
}
}*/

    // Function to calculate date based on a start date and an offset of days
    /*   function calculateDate(startDate, offsetDays = 0) {
       var date = new Date(startDate);
       date.setDate(date.getDate() + offsetDays);
       return {
           day: date.getDate(),
           month: date.getMonth() + 1, // JavaScript months are 0-indexed
           year: date.getFullYear()
       };
     }*/

    // Call loadHotels function to fetch and display hotels
    loadHotels();

    function createBootstrapCards(responseData) {
        let cardsHtml = '';

        responseData.forEach(property => {
            const hotelId = property.id;
            const imageUrl = property.propertyImage?.image?.url || 'default-image-path.jpg';
            const imageDescription = property.propertyImage?.image?.description || 'No description available';
            const neighborhoodName = property.neighborhood?.name || 'Unknown neighborhood';
            const distanceValue = property.destinationInfo?.distanceFromDestination?.value || 'Unknown';
            const distanceUnit = property.destinationInfo?.distanceFromDestination?.unit || '';
            const priceLabel = property.mapMarker?.label || 'Unknown price';
            const offerText = property.offerBadge?.secondary?.text || 'No offer available';
            const rating = property.reviews?.score || 'No rating';
            const reviewCount = property.reviews?.total || 'No';

            cardsHtml += `
                <div class="card mb-3 h-100 hotelCard" style="max-width: 700px; data-hotel-id="${hotelId}>
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${imageUrl}" class="img-fluid rounded-start h-100" alt="${imageDescription}">
                        </div>
                        <div class="col-md-8 d-flex flex-column">
                            <div class="card-body d-flex flex-grow-1">
                                <div class="w-100">
                                    <h5 class="card-title">${property.name}</h5>
                                    <p class="card-text"><small class="text-muted">${neighborhoodName}, ${distanceValue} ${distanceUnit} from destination</small></p>
                                </div>
                            </div>
                            <div class="card-footer bg-white border-top-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="price">
                                        <small class="text-muted">Price/night :</small>
                                        <span class="badge bg-success">${priceLabel}</span>                          
                                    </div>
                                    <div class="rating d-flex flex-column">
                                        <span class="badge bg-primary">Rating: ${rating}</span>
                                    </div>
                                    <button type="button" class="btn btn-warning hotel-select">Select</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });

        $('#hotel_items').html(cardsHtml);
    }

    // Function to apply filters
    function applyFilters() {
        const priceFilter = {
            min: parseInt(minPriceRange.val()),
            max: parseInt(maxPriceRange.val())
        };
        const ratingFilter = parseFloat($('input[name="guestRating"]:checked').val());
        const searchText = $('#searchInput').val().toLowerCase();

        var filteredHotels = allHotels.filter(hotel => {
            const price = parseInt(hotel.mapMarker?.label?.replace(/^\D+/g, '')) || 0;
            const rating = hotel.reviews?.score || 0;
            const name = hotel.name.toLowerCase();
            return name.includes(searchText) && rating >= ratingFilter && price >= priceFilter.min && price <= priceFilter.max;
        });

        createBootstrapCards(filteredHotels);
    }

    // Event listener for rating filter change
    $('input[name="guestRating"]').on('change', function () {
        applyFilters();
    });

    // Event listeners for price range changes
    minPriceRange.on('input', function () {
        minPriceInput.val('Min $' + $(this).val());
        applyFilters();
    });

    maxPriceRange.on('input', function () {
        maxPriceInput.val('Max $' + $(this).val());
        applyFilters();
    });

    // Event listener for the property name search
    $('#searchInput').on('input', function () {
        applyFilters();
    });


});