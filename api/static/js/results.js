
$(document).ready(function () {
    $('#refreshTripButton').click(function (event) {
        event.preventDefault(); // Prevent the default anchor action

        // Fetch new trip data
        $.getJSON('assets/api/refreshTrip.json', function (data) {
            // Update the itinerary for each day
            updateItineraryContent(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Error loading new trip data: ' + textStatus);
        });
    });

    function updateItineraryContent(data) {
        // Iterate over each day
        $.each(data, function (dayKey, dayActivities) {
            var dayNumber = dayKey.replace('Day', ''); // Extract the day number (e.g., '1' from 'Day1')

            // Update morning, afternoon, and evening activities
            $.each(dayActivities, function (timeOfDay, activity) {
                // Determine the index based on the time of day
                var index = timeOfDay === 'Morning' ? '1' : (timeOfDay === 'Afternoon' ? '2' : '3');

                // Construct the IDs for button and tab content
                var buttonId = '#day' + dayNumber + 'Location' + index;
                var tabId = '#day' + dayNumber + 'Location' + index + 'deatils';

                // Update the button text with the location name
                $(buttonId).text(activity.Name);

                // Update the content for each activity
                var tabContent = $(tabId);
                tabContent.find('.card-img-top').attr('src', activity.Image);
                tabContent.find('#day' + dayNumber + 'location' + index + 'description').html('<i class="fa-regular fa-clipboard"></i> &nbsp;' + activity.Description);
                tabContent.find('#day' + dayNumber + 'location' + index + 'transport').html('<i class="fa-solid fa-train-subway"></i>&nbsp; ' + activity.Transport);
            });
        });
    }
});