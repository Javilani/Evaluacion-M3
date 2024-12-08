
# Evaluación Módulo 3

## Manipulación de datos JSON

#### Descripción de los datos manipulados

Este archivo JSON organiza información sobre el personal médico y de enfermería del Hospital Akilar. Los datos están divididos en dos categorías: doctores y enfermeros, cada uno con detalles específicos.

**Categorías Principales**
- **doctores:** Lista de médicos, con especialidades y disponibilidad.
- **enfermeros:** Lista de enfermeros/as con experiencia y horarios.

**Campos Comunes**
- **nombre:** Nombre completo.
- **genero:** Género ("M" o "F").
- **rol:** Rol ("doctor" o "enfermero").
- **especialidad:** Área de especialización.
- **aniosExperiencia:** Años de experiencia.
- **descripcion:** Breve biografía.
- **img:** Ruta de la imagen.
- **disponibilidad:** Estado (true o false).
- **detalles:** Incluye:
- **horarios:** Días y horas de atención.
- **contacto:** Email y teléfono.

#### Ejemplo de Uso
 **Cargar Datos con JavaScript**

        fetch('equipoMedico.json')
            .then(response => response.json())
            .then(data => console.log(data.doctores));

## Algoritmos y estructura de datos


## Funciones, Clases y Manejo de Eventos

### Funciones

#### Currying

El **currying** es una técnica que permite transformar una función que toma múltiples argumentos en una serie de funciones que toman un solo argumento.

**Ejemplo Implementado:** La función `calcularCostoConsulta` utilizada en el archivo `appContacto.js`, implementa currying para calcular el costo total de las consultas de un paciente.

        const calcularCostoConsulta = (precioConsulta) => (numeroConsultas) => precioConsulta * numeroConsultas;

        // Uso:
        const costoPorConsulta = calcularCostoConsulta(20000);
        const costoTotal = costoPorConsulta(5); // Resultado: 100000

#### Composición de funciones

La **composición de funciones** combina varias funciones simples para formar una función más compleja. Esto ayuda a crear cadenas de operaciones reutilizables.

**Ejemplo Implementado:** La función `compose(f, g)` toma dos funciones y las combina. La primera función (`f`) se aplica al resultado de la segunda función (`g`). En este caso, se utiliza para combinar el cálculo del costo con el descuento.

        function compose(f, g) {
                return function(x) {
                        return f(g(x));
                };
        }

#### Recursión
La **recursión** se emplea para calcular de forma acumulativa un resultado al dividir un problema en subproblemas más pequeños.

**Ejemplo Implementado:** La función `calcularHorasSemanalesRecursivo` implementada en `appAdmin.js` calcula de forma recursiva las horas de consulta disponibles para un doctor a lo largo de la semana.

        function calcularHorasSemanalesRecursivo(horarios, dias, index = 0, total = 0) {
                if (index >= dias.length) return total; // Caso base
                const horasDia = horarios[dias[index]] ? calcularHoras(horarios[dias[index]]) : 0;
                return calcularHorasSemanalesRecursivo(horarios, dias, index + 1, total + horasDia);
        }

        // Uso:
        const horarios = { lunes: "09:00 - 13:00", miércoles: "14:00 - 18:00" };
        const diasSemana = ["lunes", "miércoles"];
        const totalHoras = calcularHorasSemanalesRecursivo(horarios, diasSemana); // Resultado: 8


### Clases

#### 1. Clase Paciente

Esta clase se encarga de manejar una lista de pacientes en un sistema de cola. Es especialmente útil para gestionar el orden en el que los pacientes son atendidos.

**Propiedades:**

- `lista`: Un arreglo para almacenar los pacientes.

**Métodos:**

- `agregarPaciente(nombre)`: Añade un paciente a la lista. Recibe el nombre del paciente como parámetro.
- `atenderPaciente()`: Atiende al primer paciente en la cola (FIFO). Elimina y retorna el primer paciente. Si no hay pacientes, retorna null.

#### 2. Clase Doctor

Representa a un médico con su información profesional y funcionalidades básicas para gestionar su práctica médica.

**Propiedades:**

- `nombre`: El nombre del doctor.
- `especialidad`: La especialidad médica del doctor.
- `getAniosDeExperiencia()`: Getter para acceder a los años de experiencia del doctor.
- `setAniosDeExperiencia(nuevosAnios)`: Setter para actualizar los años de experiencia, asegurando que no sean valores negativos.

**Métodos:**

- `mostrarInformacion()`: Retorna un string con la información del doctor (nombre, especialidad y años de experiencia).
- `atenderPaciente(numeroDePacientes)`: Incrementa el número de pacientes atendidos por el doctor.
- `obtenerTotalPacientes()`: Devuelve el total de pacientes atendidos.
- `calcularConsultasRealizadas()`: Método genérico que puede ser sobrescrito para adaptarse a diferentes especialidades médicas.

#### 3. SubClase Cirujano

Hereda de la clase `Doctor` y agrega funcionalidades específicas para cirujanos, como el seguimiento de operaciones realizadas.

**Propiedades:**

- `especialidadQuirurgica`: Define la especialidad quirúrgica del cirujano.
- `operacionesRealizadas`: Número de operaciones realizadas por el cirujano (inicializado en 0).

**Métodos:**

- `calcularConsultasRealizadas()`: Sobrescribe el método genérico de la clase `Doctor` para calcular y mostrar el número de operaciones realizadas.
- `registrarOperacion(cantidad)`: Registra una o más operaciones realizadas, asegurando que el valor no sea negativo.

#### 4. Conceptos de Programación Aplicados

- **Encapsulamiento:** La propiedad `_aniosDeExperiencia` está protegida mediante closures y accesible únicamente a través de getters y setters.
- **Herencia:** La clase `Cirujano` extiende a `Doctor`, reutilizando sus métodos y propiedades.
- **Polimorfismo:** El método `calcularConsultasRealizadas()` es sobrescrito en `Cirujano` para adaptarlo a su especialidad.
Este proyecto puede ser una base para sistemas más complejos de gestión hospitalaria, ideal para alguien apasionado por los sistemas y la programación web como tú. ¡Espero que te sirva para consolidar tus conocimientos en desarrollo!

### Manejo de Eventos

#### Funcionamiento

1. Captura de Elemento HTML
- Se selecciona un botón en el DOM usando su ID:

        document.getElementById('calcularCostosBtn')

2. Asociar un Evento
- Se añade un manejador al evento `click` con `addEventListener` para ejecutar una función al hacer clic en el botón:

        .addEventListener('click', function() { /* Código */ });

3. Manejador de Eventos

- Solicita al usuario el precio y número de consultas con `prompt`.
- Calcula el costo base y aplica un descuento usando funciones (`calcularCostoConsulta`, `obtenerDescuento`).
- Muestra el resultado en un elemento HTML con el ID `resultado`:

        document.getElementById('resultado').textContent = `El costo total es ${costoFinal.toFixed(0)} CLP.`;

#### Estructura HTML
- Debe incluir un botón y un contenedor para mostrar el resultado:

        <button id="calcularCostosBtn">Calcular Costos</button>
        <div id="resultado"></div>



## Instrucciones para Visualizar el Proyecto

### Requisitos Previos

- Tener **Node.js** y **npm** instalados en tu computadora.
- Tener **SASS** instalado globalmente. Si no lo tienes, puedes instalarlo ejecutando el siguiente comando:

        npm install -g sass

### Pasos para Ejecutar el Proyecto

1. Clona el repositorio en tu máquina local:

        git clone <URL del repositorio>
        cd <nombre del repositorio>
2. Instala las dependencias necesarias (si es que usas alguna para el proyecto):

        npm install
3. Compila los archivos SASS en CSS ejecutando el siguiente comando:

        sass --watch assets/scss:assets/css
4. Abre el archivo `index.html` (o cualquier otro archivo HTML del proyecto) en tu navegador:
- Utiliza Live Server (si estás trabajando en VS Code) para ver la página en tu navegador
- Haz clic derecho sobre `index.html`.
- Selecciona "Open with Live Server" para iniciar la página en tu navegador.

## Authors

- Javier Lagos con colaboración de Valentina Moreno
