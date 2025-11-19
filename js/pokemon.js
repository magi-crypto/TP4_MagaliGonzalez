// pokemon.js
document.addEventListener('DOMContentLoaded', () => {
    const botonBuscar = document.getElementById('boton-buscar-pokemon');
    const inputPokemon = document.getElementById('input-pokemon');
    const resultado = document.getElementById('resultado-container');

    botonBuscar.addEventListener('click', obtenerDatosPokemon);
    inputPokemon.addEventListener('keyup', (e) => {
        if (e.key === "Enter") obtenerDatosPokemon();
    });

    async function obtenerDatosPokemon() {
        const busqueda = inputPokemon.value.toLowerCase().trim();
        limpiarResultados();

        if (!busqueda) {
            alert("Por favor, ingresa el nombre o ID de un Pokémon.");
            return;
        }

        try {
            const URL = `https://pokeapi.co/api/v2/pokemon/${busqueda}`;
            const response = await fetch(URL);

            if (!response.ok) throw new Error(`Pokémon "${busqueda}" no encontrado.`);

            const data = await response.json();
            mostrarDatos(data);

        } catch (error) {
            console.error(error);
            resultado.innerHTML = `<p style="color:red; text-align:center;">${error.message}</p>`;
        }
    }

    function mostrarDatos(pokemon) {
        const nombre = pokemon.name.toUpperCase();
        const pesoKg = (pokemon.weight / 10).toFixed(1); 
        const tipos = pokemon.types.map(t => t.type.name.toUpperCase()).join(' / ');
        const imagenUrl = pokemon.sprites.front_default;

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-pokemon", "animada");
        tarjeta.innerHTML = `
            <h2>${nombre} (ID: ${pokemon.id})</h2>
            ${imagenUrl ? `<img src="${imagenUrl}" alt="Sprite de ${nombre}" class="pokemon-imagen">` : ""}
            <p><strong>Tipo(s):</strong> ${tipos}</p>
            <p><strong>Peso:</strong> ${pesoKg} kg</p>
        `;

        resultado.appendChild(tarjeta);
    }

    function limpiarResultados() {
        resultado.innerHTML = "";
    }
});
