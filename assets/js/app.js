
function reservarCita() {
    // Función para solicitar nombre
    function obtenerNombre() {
        let nombre;
        while (true) {
            nombre = prompt("Nombre del paciente: ");
            if (nombre.trim() !== "") {
                return nombre;
            } else {
                alert("El nombre no puede estar vacío. Intente nuevamente.");
            }
        }
    }

    // Función para solicitar edad
    function obtenerEdad() {
        let edad;
        while (true) {
            edad = Number(prompt("Edad del paciente: "));
            if (typeof edad === "number" && !isNaN(edad) && Number.isInteger(edad)) {
                return edad;
            } else {
                alert("La edad ingresada no es válida. Intente nuevamente y asegúrese de ingresar un número.");
            }
        }
    }

    // Función para solicitar correo
    function obtenerEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let email;
        while (true) {
            email = prompt("Por favor, ingresa tu correo electrónico: ");
            if (emailRegex.test(email)) {
                return email;
            } else {
                alert("El correo ingresado no es válido. Intente nuevamente.");
            }
        }
    }

    // Solicitar datos
    const nombre = obtenerNombre();
    console.log(`Nombre ingresado: ${nombre}`);
    
    const edad = obtenerEdad();
    console.log(`Edad ingresada: ${edad}`);
    
    const email = obtenerEmail();
    console.log(`Correo ingresado: ${email}`);

    // Confirmación de datos ingresados
    alert(`Datos ingresados:\nNombre: ${nombre}\nEdad: ${edad}\nEmail: ${email}`);
}
