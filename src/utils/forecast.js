const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/764faeb13a7f7cae9fd60864bff3907a/${latitude},${longitude}?lang=ka&units=si`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback('Unable to find location');
        } else {
            callback(undefined, {
                forecast: `${body.daily.data[0].summary} ახლა არის ${
                    body.currently.temperature
                }C. მოსალოდნელი წვიმის შანსია ${
                    body.currently.precipProbability
                }%`,
            });
        }
    });
};

module.exports = forecast;
