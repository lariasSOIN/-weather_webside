const path = require('path');
const express = require("express");
const hbs = require('hbs');
const request = require("request");
const geoCode = require("./utils/geoCode.js");
const forecast = require("./utils/forecast.js");
const app = express();

//define paths for Express config
const publicDiretoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDiretoryPath));


app.get('',(req, res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'Estiven'
    });
});


app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Estiven'
    });
});

app.get('/help', (req, res) => {
    res.render('help',{
        message: 'We gona help you!',
        title: 'Help'
    });
});

app.get('/products', (req, res)=> {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });

});

app.get('/weather', (req, res)=> {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            res.send({error});
            return console.log({error});
        }
        console.log(latitude, longitude);
    
        forecast(latitude, longitude, (error, data) => {
            if(error) {
                res.send({ error });
                return console.log({ error });
            }
            res.send({
                forecast: data,
                location,
                address: req.query.address
            });
            console.log({
                data,
                location,
                address: req.query.address
            });
          })
    });
});

app.get('/help/*', (req, res) => {
    res.render('error',{
        title: 'Error 404',
        message: 'Help article not found',
        name: 'Estiven'
    });
});

app.get('*', (req, res) => {
    res.render('error',{
        title: 'Error 404',
        message: 'Page not found',
        name: 'Estiven'
    });
});

app.listen(3000, ()=> {
    console.log('Running in port 3000');
});