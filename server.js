const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Weather app server running at http://localhost:${port}`);
});


app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = '93d55a3cdc94763058236c646e2b38fe';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            return res.json({ error: 'City not found' });
        }

        res.json(data);
    } catch (error) {
        res.json({ error: 'Unable to fetch weather data' });
    }
});

// Export the app for testing purposes
module.exports = app;

