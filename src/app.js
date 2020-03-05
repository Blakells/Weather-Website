const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Serve static directory
app.use(express.static(publicDir));

// Setup hbs engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Blake Bailey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Blake Bailey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Blake Bailey',
        info: 'Go to the "weather" page, enter a location by Address, Zip Code, or State and see the current weather forecast for today!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }
    geocode(req.query.address, ({latitude, longitude, location = 'Try Another Search'} = {}) => {
        forecast(latitude, longitude, (forecastData) => {
            res.send({
                location,
                dailySummary: forecastData.dailySummary,
                temperature: forecastData.currentTemp,
                rainChance: forecastData.rainChance
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Blake Bailey',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Blake Bailey',
        errorMessage: '404 Error page not found'
    })
})

app.listen(3000, () => {
    console.log('Server up and running')
})