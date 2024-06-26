const fetch = require('node-fetch');

const getWeather = async (coordinates) => {
    // console.log(coordinates);
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=19c9e54dda6ad3043e6a7cf04f35b438&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        //   console.log(data);
        return data
    }
    catch (e) {
        console.log("Weather error occured, try again later");
    }

};

const forecast = (coordinates, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=19c9e54dda6ad3043e6a7cf04f35b438&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then((data)=>{
        callback(data)
        //console.log(data)
    })
    .catch(error => {
        console.error('Weather Error, try different city');
    });


}

module.exports = { forecast, getWeather };