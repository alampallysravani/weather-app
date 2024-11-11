// Updated JavaScript
document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();  // Prevent page reload on form submit
    const city = document.getElementById('city').value;

    if (!city) {
        document.getElementById('error-message').innerText = 'Please enter a city';
        return;
    }

    document.getElementById('error-message').innerText = '';  // Clear previous errors

    try {
        const response = await fetch(`http://localhost:3000/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            document.getElementById('error-message').innerText = data.error;
            document.getElementById('weather-info').style.display = 'none';
        } else {
            document.getElementById('city-name').innerText = data.name;
            document.getElementById('temperature').innerText = `${data.main.temp}°C`;
            document.getElementById('description').innerText = data.weather[0].description;
            document.getElementById('humidity').innerText = `${data.main.humidity}%`;
            document.getElementById('weather-info').style.display = 'block';
        }
    } catch (error) {
        document.getElementById('error-message').innerText = 'Failed to fetch weather data.';
    }
});

