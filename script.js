"use strict";

let env = "PROD";

// FREE API TIER
// API KEY AVAILABLE ON "https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/#request-base-url"

// API SETUP
const API_KEY = "N23MVHB8C2TU7AX9H2YD2F89E";
const URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const unitGroup = "metric";
const contentType = "json";

// QUERY SELECTORS
const container = document.querySelector("#container");
const btnFetch = document.querySelector("#btnFetch");
const weatherForm = document.querySelector("#weatherForm");
const weatherResult = document.querySelector("#weatherResult");

// FUNCTIONS
const renderResult = function (result) {
  const markup = `<p>Address: ${result.resolvedAddress}</p><p>Latitude: ${result.latitude}, Longitude: ${result.longitude}, Description: ${result.description}</p><p>Current Temperature: ${result.currentConditions.temp} C</p>`;
  weatherResult.insertAdjacentHTML("beforeend", markup);
};

const renderError = function (result, message) {
  const markup = `<p>Error in query. Error: ${result.message}</p>`;
  weatherResult.insertAdjacentHTML("beforeend", markup);
};

const fetchData = async function (url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    renderResult(json);
  } catch (error) {
    console.error(error.message);
    renderError(error);
  }
};

const formSubmit = function (form, submitter) {
  let obj = {};
  const formData = new FormData(form, submitter);
  for (const [key, value] of formData) {
    obj[key] = value;
  }
  return obj;
};

// EVENT LISTENERS
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = formSubmit(weatherForm, btnFetch);
  const place = data.place;
  if (place === "") {
    console.log(`No value given`);
  } else {
    const callPath = `${URL}${place}?key=${API_KEY}&unitGroup=${unitGroup}&contentType=${contentType}`;
    if (env === "TEST") {
      console.log(`test environment: ${env}`);
    } else {
      weatherResult.innerHTML = "";
      fetchData(callPath);
      weatherForm.reset();
    }
  }
});
