const express = require('express');
const path = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mirian Okradze',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mirian Okradze',
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a search term',
        });
    }
    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error,
                });
            }
            forecast(latitude, longitude, (error, { forecast }) => {
                if (error) {
                    return res.send({
                        error,
                    });
                }
                res.send({
                    forecast,
                    location,
                });
            });
        },
    );
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        text: 'Page not found!',
        name: 'Mirian Okradze',
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is up');
});
