document.addEventListener('DOMContentLoaded', () => {
    const nombreCompleto = localStorage.getItem('nombreUsuario');
    
    if (!nombreCompleto) {
        // Pedir nombre y apellido
        let nombre = prompt("¡Bienvenido al TP4! Por favor, ingresa tu Nombre:");
        let apellido = prompt("Ahora, ingresa tu Apellido:");
        
        // Manejar posibles cancelaciones o entradas vacías
        if (!nombre) nombre = "Invitado";
        if (!apellido) apellido = "";

        const nombreUsuario = `${nombre} ${apellido}`.trim();
        localStorage.setItem('nombreUsuario', nombreUsuario);
        mostrarSaludo(nombreUsuario);
    } else {
        // Si ya está almacenado
        mostrarSaludo(nombreCompleto);
    }
});

function mostrarSaludo(usuario) {
    const bienvenidaH2 = document.getElementById('bienvenida-mensaje');
    const saludoP = document.getElementById('nombre-usuario-display');
    const spanUsuario = document.getElementById('usuario-saludo');

    if (bienvenidaH2 && saludoP && spanUsuario) {
        bienvenidaH2.classList.add('hidden');
        saludoP.classList.remove('hidden');
        
        spanUsuario.textContent = usuario.toUpperCase();
    }
}