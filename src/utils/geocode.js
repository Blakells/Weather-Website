const axios = require('axios');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=1&access_token=pk.eyJ1IjoiYmxha2VsbHMiLCJhIjoiY2s3YXk2dDMyMDBjeTNpbnoyY3pxNW01dCJ9.30YWMCeopSO_XFbO7yNFFA';
    
    axios.get(url)
    .then((res) => {
        var data = res.data.features[0];
        var latitude = data.center[1];
        var longitude = data.center[0];
        var location = data.place_name;
        callback({
            latitude,
            longitude,
            location
        })
    })
    .catch((err) => {
        if (err) {
            return callback(console.log(err,'Try another search'));
        } else {
            return console.log(err);
        }
    })
}

module.exports = geocode;