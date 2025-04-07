"use strict"

// FREE API TIER
// API KEY AVAILABLE ON "https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/#request-base-url"
const URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const unitGroup = "metric"
const contentType = "json"

let callPath = `${URL}Uppsala?key=${API_KEY}&unitGroup=${unitGroup}&contentType=${contentType}`;

// console.log(callPath);

let response = fetch(`${URL}Uppsala?key=${API_KEY}&unitGroup=${unitGroup}&contentType=${contentType}`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {console.log(json)})