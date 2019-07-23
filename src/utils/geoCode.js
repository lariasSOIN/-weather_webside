const request = require("request");

const geoCode = (address, callback) => {
    const geoCode = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibGFyaWFzIiwiYSI6ImNqeWE2c2RhYzA4dTkzbW8ycm00czJjZDgifQ.vQ89Bdi1Q2jfEMnX78O1sw&limit=1';
    request({ url: geoCode, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find!", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geoCode;
