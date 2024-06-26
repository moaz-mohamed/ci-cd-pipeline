const weatherForm = document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');
const weaherIcon = document.querySelector('#weather-icon');
const weatherStatus = document.querySelector('#weather-status');
const weatherTemp = document.querySelector('#weather-temp');
const weatherHum = document.querySelector('#weather-hum');
const weatherLoc = document.querySelector('#weather-loc');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearForm();
    const currentUrl = window.location.href;
    console.log(currentUrl);
    fetch(currentUrl + 'weather?city=' + cityInput.value)
        .then((response) => response.json())
        .then((data) => {
            if (!data.error) {
                const {city} = data;
                const {country} = data.sys;
                const {description, icon} = data.weather[0];
                const {temp, feels_like, humidity} = data.main;
                document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + city + "')";
                weaherIcon.src = 'https://openweathermap.org/img/wn/' + icon + '@2x.png'
                weatherStatus.textContent = 'It`s ' + description + ' today';
                weatherTemp.textContent = 'Temaperature outside is ' + Math.round(temp) + '°C and it feels like ' + Math.round(feels_like) + '°C';
                weatherHum.textContent = 'Humidity: ' + humidity + "%";
                weatherLoc.textContent = 'In ' + city + ", " + country;
            }
            else {
                weatherStatus.textContent = data.error;
            }

        });
});


const clearForm = () => {
    weatherHum.src = '';
    weaherIcon.src = '';
    weatherStatus.textContent = '';
    weatherTemp.textContent = '';
    weatherHum.textContent = '';
    weatherLoc.textContent ='';
}


