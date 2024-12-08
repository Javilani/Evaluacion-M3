class Paciente {
    constructor() {
        this.lista = []; // Arreglo para almacenar pacientes
    }

    // Método para agregar un paciente
    agregarPaciente(nombre) {
        const paciente = { nombre };
        this.lista.push(paciente);
    }

    // Método para atender al primer paciente en la cola
    atenderPaciente() {
        if (this.lista.length > 0) {
            return this.lista.shift(); // Elimina y retorna el primer paciente
        }
        return null; // Si no hay pacientes, retorna null
    }
}

// Clase Doctor
class Doctor {
    constructor(nombre, especialidad, aniosDeExperiencia) {
        this.nombre = nombre;
        this.especialidad = especialidad;
        let _aniosDeExperiencia = aniosDeExperiencia; // Propiedad privada simulada

        // Getter para años de experiencia
        this.getAniosDeExperiencia = () => _aniosDeExperiencia;

        // Setter para años de experiencia
        this.setAniosDeExperiencia = (nuevosAnios) => {
            if (nuevosAnios < 0) {
                console.log("Los años de experiencia no pueden ser negativos.");
            } else {
                _aniosDeExperiencia = nuevosAnios;
            }
        };
    }

    // Método para mostrar la información del doctor
    mostrarInformacion() {
        return `
        Nombre: ${this.nombre}
        Especialidad: ${this.especialidad}
        Años de experiencia: ${this.getAniosDeExperiencia()}
        `;
    }

    // Método para agregar pacientes atendidos
    atenderPaciente(numeroDePacientes) {
        if (!numeroDePacientes || numeroDePacientes < 0) {
            console.log("El número de pacientes debe ser un valor positivo.");
            return;
        }
        this.pacientesAtendidos += numeroDePacientes;
        console.log(`${numeroDePacientes} pacientes han sido añadidos.`);
    }

    // Método para calcular el total de pacientes atendidos
    obtenerTotalPacientes() {
        return `Total de pacientes atendidos: ${this.pacientesAtendidos}`;
    }

    // Método genérico para consultas
    calcularConsultasRealizadas() {
        return "Método para calcular consultas aún no implementado.";
    }
}

class Cirujano extends Doctor {
    constructor(nombre, especialidad, aniosDeExperiencia, especialidadQuirurgica) {
        super(nombre, especialidad, aniosDeExperiencia);
        this.especialidadQuirurgica = especialidadQuirurgica;
        this.operacionesRealizadas = 0;
    }

    // Sobrescribir método para calcular operaciones realizadas (polimorfismo)
    calcularConsultasRealizadas() {
        return `Número de operaciones realizadas: ${this.operacionesRealizadas}`;
    }

    // Método para registrar una operación realizada
    registrarOperacion(cantidad) {
        if (!cantidad || cantidad < 0) {
            console.log("No se puede registrar un número negativo de operaciones.");
            return;
        }
        this.operacionesRealizadas += cantidad;
        console.log(`${cantidad} operación(es) registrada(s).`);
    }
}



// Ejemplo de uso
const doctor1 = new Doctor("Dr. Juan Pérez", "Cardiología", 15);
console.log(doctor1.mostrarInformacion());

doctor1.atenderPaciente(10);
console.log(doctor1.obtenerTotalPacientes());

const cirujano1 = new Cirujano("Dra. Ana García", "Cirugía General", 10, "Cirugía laparoscópica");
console.log(cirujano1.mostrarInformacion());

// Registrar operaciones
cirujano1.registrarOperacion(5);
console.log(cirujano1.calcularConsultasRealizadas());

// Encapsulamiento: modificar y obtener años de experiencia
cirujano1.setAniosDeExperiencia(12);
console.log(`Años de experiencia actualizados: ${cirujano1.getAniosDeExperiencia()}`);
