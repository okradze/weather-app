const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address,
    )}.json?access_token=pk.eyJ1Ijoib2tyYWR6ZW1pcmlhbiIsImEiOiJjanVqbDJicmoxbXB2NGV1amxxNXhqdDRhIn0.pvmy4Pb95nUw48p7dOBD7w`;

    request({ url, json: true }, (error, { body }) => {
        const { features } = body;

        if (error) {
            callback('Unable to connect to location services');
        } else if (features.length === 0) {
            callback('Unable to find location');
        } else {
            callback(undefined, {
                latitude: features[0].center[1],
                longitude: features[0].center[0],
                location: features[0].place_name,
            });
        }
    });
};

module.exports = geocode;
