document.getElementById('getWeatherBtn').addEventListener('click', function () {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Proszę wpisać nazwę miasta.');
        return;
    }

    // API keys and endpoints
    const apiKey = 'da20f5c1a03393db22eeb2af2e58953d'; // Podstaw swój klucz API z OpenWeather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

    // Clear previous results
    document.getElementById('currentWeather').textContent = '';
    document.getElementById('forecast').innerHTML = '';

    // Current weather using XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('GET', currentWeatherUrl);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log('Bieżąca pogoda:', data); // Logowanie odpowiedzi API
            document.getElementById('currentWeather').textContent = 
                `Obecna pogoda w ${data.name}: ${data.weather[0].description}, temperatura: ${data.main.temp}°C`;
        } else {
            alert('Nie udało się pobrać danych o obecnej pogodzie.');
        }
    };
    xhr.onerror = function () {
        alert('Wystąpił błąd podczas żądania o obecną pogodę.');
    };
    xhr.send();

    // 5-day forecast using Fetch API
    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Nie udało się pobrać danych o prognozie pogody.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Prognoza pogody:', data); // Logowanie odpowiedzi API
            const forecastList = data.list.filter(entry => entry.dt_txt.includes('12:00:00')); // Filtr godzin 12:00
            const forecastElement = document.getElementById('forecast');
            forecastList.forEach(forecast => {
                const li = document.createElement('li');

                // Ikona pogody
                const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
                const iconImg = document.createElement('img');
                iconImg.src = iconUrl;
                iconImg.alt = forecast.weather[0].description;
                iconImg.style.width = '50px';
                iconImg.style.verticalAlign = 'middle';

                // Treść prognozy
                li.textContent = `Data: ${forecast.dt_txt}, Pogoda: ${forecast.weather[0].description}, Temp: ${forecast.main.temp}°C `;
                li.appendChild(iconImg);
                forecastElement.appendChild(li);
            });
        })
        .catch(error => {
            alert(error.message);
        });
});
