const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6c5a3407d5b6db9bc6a45720b674121e/' + latitude + ',' + longitude;
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect!", undefined);
        } else if (body.error) {
            callback("Unable to find!", undefined);
        } else {
            callback(undefined, {
                Summary: body.daily.data[0].summary,
                Temperature: body.currently.temperature,
                PrecipProbability: body.currently.precipProbability,
                Humidity: body.currently.humidity,
                Pressure: body.currently.pressure
            });
        }
    });
}

module.exports = forecast;