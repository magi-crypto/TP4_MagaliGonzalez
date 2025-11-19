// rick.js
document.addEventListener('DOMContentLoaded', () => {
    const botonBuscar = document.getElementById('boton-buscar-rick');
    const inputRick = document.getElementById('input-rick');
    const resultado = document.getElementById('resultado-container');

    botonBuscar.addEventListener('click', obtenerDatosRick);
    inputRick.addEventListener('keyup', (e) => {
        if (e.key === "Enter") obtenerDatosRick();
    });

    async function obtenerDatosRick() {
        const characterId = inputRick.value.trim();
        limpiarResultados();

        if (!characterId || isNaN(characterId) || parseInt(characterId) < 1) {
            alert("Por favor, ingresa un ID de personaje válido (un número positivo).");
            return;
        }

        try {
            const URL = `https://rickandmortyapi.com/api/character/${characterId}`;
            const response = await fetch(URL);

            if (!response.ok) throw new Error(`Personaje con ID ${characterId} no encontrado.`);

            const data = await response.json();
            mostrarDatos(data);

        } catch (error) {
            console.error(error);
            resultado.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
        }
    }

    function mostrarDatos(personaje) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-rick","animada");

        tarjeta.innerHTML = `
            <h2>${personaje.name}</h2>
            <img src="${personaje.image}" alt="Imagen de ${personaje.name}" class="rick-imagen">
            <p><strong>Estado:</strong> ${formatearEstado(personaje.status)}</p>
            <p><strong>Especie:</strong> ${personaje.species}</p>
        `;

        resultado.appendChild(tarjeta);
    }

    function formatearEstado(estado) {
        switch (estado.toLowerCase()) {
            case 'alive': return '💚 Vivo';
            case 'dead': return '🔴 Muerto';
            default: return '❓ Desconocido';
        }
    }

    function limpiarResultados() {
        resultado.innerHTML = "";
    }
});
