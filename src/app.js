const path = require('path');
const express = require('express');
const { fileURLToPath } = require('url');
const { geocode } = require('./utils/geocode.js');
const { forecast } = require('./utils/forecast.js');




const app = express()
const port = process.env.PORT || 3000;

//const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));


app.get('', (req, res) => {
    res.render('pages/index', {
        title: 'Welcome to the Weather App',
        name: 'Moaz Mohamed'
    })
});

app.get('/about', (reg, res) => {
    res.render('pages/about', {
        title: 'This website is built by Moaz Mohamed',
        name: 'Moaz Mohamed'
    });
});

app.get('/help', (reg, res) => {
    res.render('pages/help', {
        title: 'No need for help ;)',
        name: 'Moaz Mohamed'
    });
});



app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'Please provide a city'
        })
    }

    geocode(req.query.city, (coordinates, geoError) => {

        if (geoError) return res.send({
            error: geoError
        });

        forecast(coordinates, (weather, weatherError) => {
            if (weatherError) return res.send({
                error: weatherError
            });

            weather.city = req.query.city;
            return res.send(weather);
        });

    });
})

app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/error', {
        title: 'ERROR 404: PAGE NOTE FOUND',
        name: 'Moaz Mohamed',
    })
});




app.listen(port, () => {
    console.log("Server is running on port " + port);
});

module.exports =  app ;