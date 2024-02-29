const exp = require("express");
const { write } = require("fs");
const http = require("https");
const bodyparser = require("body-parser");
const app = exp();

app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
    const city = req.body.cityName;
    http.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0364288fdeb681533c11956be6fdeab7&units=metric", (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>Weather description is: " + desc);
            res.write("<h1>Temperature in " + city + " is: " + temp + " degree Celcius</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send();
        });
    })
});

app.listen(2000, () => console.log("Port to 2000"));
