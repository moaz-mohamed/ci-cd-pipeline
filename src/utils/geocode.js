const fetch = require('node-fetch');

const getCoordinates = async (city) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=19c9e54dda6ad3043e6a7cf04f35b438`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const { lat, lon } = data[0];

        return { lat, lon }
    }
    catch (e) {
        console.log("Cooridnates error occured, try again later");
    }

};

const geocode = (city, callback) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=19c9e54dda6ad3043e6a7cf04f35b438`;
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            const { lat, lon } = data[0];
            callback({ lat, lon })
        })
        .catch((error) => callback(undefined, 'Unable to find this location, please try a different city'))

};

module.exports = { geocode, getCoordinates };