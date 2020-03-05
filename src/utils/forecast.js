const axios = require('axios');
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = ((lat, long, callback) => {
    var lat = encodeURIComponent(lat);
    var long = encodeURIComponent(long);
    const darkSkyUrl = 'https://api.darksky.net/forecast/d255a587fb7f98c04ae70972ce2f8d4c/' + lat +','+ long+'';

    axios.get(darkSkyUrl)
    .then((res) => {
        var current = res.data.currently;
        var currentTemp = current.temperature;
        var rainChance = current.precipProbability;
        var dailySummary = res.data.daily.data[0].summary;
        callback({
            dailySummary,
            currentTemp,
            rainChance
        })
    })
    .catch((err) => {
        return callback(err);
    })
})
module.exports = forecast;