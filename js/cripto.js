// cripto.js
document.addEventListener('DOMContentLoaded', () => {
    const selectMoneda = document.getElementById("select-moneda");
    const botonBuscar = document.getElementById('boton-buscar-cripto');
    const resultado = document.getElementById('resultado-container');
    let cargando = false;

    // Cargar criptomonedas dinámicamente (top 10)
    async function cargarCriptos() {
        try {
            const resp = await fetch("https://api.coingecko.com/api/v3/coins/list");
            const data = await resp.json();

            const top10 = ["bitcoin","ethereum","tether","bnb","usd-coin","ripple","cardano","dogecoin","polygon","litecoin"];
            top10.forEach(id => {
                const cripto = data.find(c => c.id === id);
                if(cripto){
                    const option = document.createElement("option");
                    option.value = cripto.id;
                    option.textContent = cripto.name;
                    selectMoneda.appendChild(option);
                }
            });
        } catch (error) {
            console.error("Error al cargar criptomonedas:", error);
            resultado.innerHTML = `<p style="color:red; text-align:center;">No se pudieron cargar las criptomonedas.</p>`;
        }
    }

    // Función para buscar y mostrar datos de la cripto seleccionada
    async function obtenerDatosCripto() {
        if (cargando) return; // evita múltiples clicks rápidos
        const criptoId = selectMoneda.value;
        const criptoNombre = selectMoneda.options[selectMoneda.selectedIndex].text;

        limpiarResultados();

        if (!criptoId) {
            alert("Por favor, selecciona una criptomoneda.");
            return;
        }

        cargando = true;
        try {
            const resp = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${criptoId}`);
            if(!resp.ok) throw new Error(`Error ${resp.status}: No se pudo obtener la cotización.`);

            const data = await resp.json();

            if(!data.length) throw new Error("Criptomoneda no encontrada.");

            const cripto = data[0];
            mostrarDatos(criptoNombre, cripto);

        } catch (error) {
            console.error(error);
            resultado.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
        } finally {
            cargando = false;
        }
    }

    function mostrarDatos(nombre, cripto) {
        const cambio = cripto.price_change_percentage_24h;
        const colorCambio = (cambio !== null && cambio >= 0) ? "green" : "red";
        const cambioFormateado = (cambio !== null) ? cambio.toFixed(2) : "N/A";

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-cripto","animada");
        tarjeta.innerHTML = `
            <h2>${nombre}</h2>
            <img src="${cripto.image}" alt="${nombre}" style="width:100px; border-radius:10px; margin:10px 0;">
            <p><strong>Precio USD:</strong> $${cripto.current_price?.toLocaleString() || 'N/A'}</p>
            <p><strong>Cambio 24h:</strong> <span style="color:${colorCambio}">${cambioFormateado}%</span></p>
            <p><strong>Market Cap:</strong> $${cripto.market_cap?.toLocaleString() || 'N/A'}</p>
        `;
        resultado.appendChild(tarjeta);
    }

    function limpiarResultados() {
        resultado.innerHTML = "";
    }

    // Eventos
    botonBuscar.addEventListener('click', obtenerDatosCripto);
    selectMoneda.addEventListener('keyup', (e) => {
        if (e.key === "Enter") obtenerDatosCripto();
    });

    // Inicializar
    cargarCriptos();
});
