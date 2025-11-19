// Tu API Key de OpenWeather
const API_KEY = "332918a9350ed4ab4713752edfea9a8e";

const botonBuscar = document.getElementById("boton-buscar");
const resultado = document.getElementById("resultado");
const inputCiudad = document.getElementById("ciudad");
const ciudadDisplay = document.getElementById("ciudad-display");
const tempDisplay = document.getElementById("temp-display");
const humedadDisplay = document.getElementById("humedad-display");
const descDisplay = document.getElementById("desc-display");

botonBuscar.addEventListener("click", () => {
    const ciudad = inputCiudad.value.trim();

    if (!ciudad) {
        alert("Por favor ingresa una ciudad.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ciudad no encontrada");
            }
            return response.json();
        })
        .then(data => {
            ciudadDisplay.textContent = data.name;
            tempDisplay.textContent = `${data.main.temp} °C`;
            humedadDisplay.textContent = `${data.main.humidity}%`;
            descDisplay.textContent = data.weather[0].description;
        })
        .catch(error => {
            resultado.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
        });
});

