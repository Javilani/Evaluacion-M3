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



// Seleccionar contenedor de la lista médica
const listaMedico = document.querySelector(".listaMedico");
const btnDoctores = document.getElementById("btn-doctores");
const btnEnfermeros = document.getElementById("btn-enfermeros");
const btnBuscar = document.getElementById("btn-buscar");
const inputBuscar = document.getElementById("input-buscar");

// Variable global para almacenar los datos cargados
let equipoMedico = [];

// Cargar datos desde el archivo JSON
fetch('./assets/js/equipoMedico.json')
    .then((response) => {
        if (!response.ok) throw new Error('No se pudo cargar el archivo JSON');
        return response.json();
    })
    .then((data) => {
        equipoMedico = data; // Guardar datos en la variable global
    })
    .catch((error) => console.error("Error:", error.message));

// Función para mostrar la información de un doctor específico
function mostrarDoctorEspecifico(nombreDoctor) {
    // Buscar al doctor con el nombre específico
    const doctor = equipoMedico.doctores.find((doctor) => doctor.nombre.toLowerCase() === nombreDoctor.toLowerCase());

    if (doctor) {
        // Destructuring para obtener las propiedades del doctor
        const {
            nombre,
            especialidad,
            descripcion,
            img,
            aniosExperiencia,
            disponibilidad,
            detalles: { horarios, contacto }
        } = doctor;

        // Mostrar la información en la consola
        console.log(`Nombre: ${nombre}`);
        console.log(`Especialidad: ${especialidad}`);
        console.log(`Descripción: ${descripcion}`);
        console.log(`Años de experiencia: ${aniosExperiencia}`);
        console.log(`Disponibilidad: ${disponibilidad ? 'Disponible' : 'No disponible'}`);
        console.log("Horarios:");
        for (const [dia, horario] of Object.entries(horarios)) {
            console.log(`${dia}: ${horario}`);
        }
        console.log(`Email: ${contacto.email}`);
        console.log(`Teléfono: ${contacto.telefono}`);

        // Mostrar la información en la interfaz web
        listaMedico.innerHTML = ""; // Limpiar contenido anterior
        const card = document.createElement("div");
        card.classList.add("listaMedico__item");
        card.innerHTML = `
            <img class="listaMedico__img" src="${img}" alt="${nombre}" width="300px">
            <h3>${nombre}</h3>
            <h4>Especialidad: ${especialidad}</h4>
            <p>${descripcion}</p>
            <p>Años de experiencia: ${aniosExperiencia}</p>
            <p>Disponibilidad: ${disponibilidad ? "Disponible" : "No disponible"}</p>
            <h4>Horarios:</h4>
            <ul>
                ${Object.entries(horarios).map(([dia, horario]) => `<li>${dia}: ${horario}</li>`).join("")}
            </ul>
            <h4>Contacto:</h4>
            <p>Email: ${contacto.email}</p>
            <p>Teléfono: ${contacto.telefono}</p>
        `;
        listaMedico.appendChild(card);
    } else {
        console.log("Doctor no encontrado");
        alert("Doctor no encontrado");
        listaMedico.innerHTML = ""; // Limpiar lista si no se encuentra al doctor
    }
}

// Función para mostrar contenido filtrado
function mostrarMiembros(filtro) {
    listaMedico.innerHTML = ""; // Limpiar contenido anterior

    equipoMedico[filtro].forEach((miembro) => {
        const card = document.createElement("div");
        card.classList.add("listaMedico__item");
        card.innerHTML = `
            <img class="listaMedico__img" src="${miembro.img}" alt="${miembro.nombre}" width="300px">
            <h3>${miembro.nombre}</h3>
            <h4>Especialidad: ${miembro.especialidad}</h4>
            <p>${miembro.descripcion}</p>
            <p>Años de experiencia: ${miembro.aniosExperiencia}</p>
            <p>Disponibilidad: ${miembro.disponibilidad ? "Disponible" : "No disponible"}</p>
            <h4>Horarios:</h4>
            <ul>
                ${Object.entries(miembro.detalles.horarios).map(([dia, horario]) => `<li>${dia}: ${horario}</li>`).join("")}
            </ul>
            <h4>Contacto:</h4>
            <p>Email: ${miembro.detalles.contacto.email}</p>
            <p>Teléfono: ${miembro.detalles.contacto.telefono}</p>
        `;
        listaMedico.appendChild(card);
    });
}

// Asociar los eventos de los botones
btnDoctores.addEventListener("click", () => mostrarMiembros("doctores"));
btnEnfermeros.addEventListener("click", () => mostrarMiembros("enfermeros"));
btnBuscar.addEventListener("click", () => {
    const nombreDoctor = inputBuscar.value.trim();
    if (nombreDoctor) {
        mostrarDoctorEspecifico(nombreDoctor);
    } else {
        alert("Por favor, ingresa el nombre de un doctor.");
    }
});

