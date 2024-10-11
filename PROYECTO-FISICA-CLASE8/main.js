// Seleccionamos el elemento canvas y el contexto de dibujo 2D
const canvas = document.getElementById('lienzo');
const ctx = canvas.getContext('2d');

// Configura el tamaño del canvas para que ocupe toda la ventana
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Función para ajustar el tamaño del canvas si la ventana se redimensiona
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    dibujarCuadrado(); // Vuelve a dibujar el cuadrado si cambia el tamaño
    dibujarCirculosAleatorios(50); // Dibuja múltiples círculos dentro del cuadrado
});

// Función para dibujar un cuadrado en el centro del canvas
function dibujarCuadrado() {
    const size = 600; // Tamaño del cuadrado
    const x = (canvas.width - size) / 2; // Posición X centrada
    const y = (canvas.height - size) / 2; // Posición Y centrada

    // Estilo del cuadrado
    ctx.fillStyle = 'black'; // Color de relleno del cuadrado
    ctx.strokeStyle = 'red'; // Color del borde del cuadrado
    ctx.lineWidth = 2; // Grosor del borde

    // Dibujar el cuadrado
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    ctx.fillRect(x, y, size, size); // Dibujar el relleno del cuadrado
    ctx.strokeRect(x, y, size, size); // Dibujar el borde del cuadrado

    // Dibuja círculos aleatorios dentro del cuadrado
    dibujarCirculosAleatorios(300, x, y, size); // 50 círculos dentro del cuadrado
}

// Función para dibujar círculos aleatorios dentro del cuadrado
function dibujarCirculosAleatorios(cantidad, cuadradoX, cuadradoY, cuadradoSize) {
    for (let i = 0; i < cantidad; i++) {
        const radius = Math.random() * 50; // Tamaño aleatorio del radio entre 0 y 50
        const x = cuadradoX + Math.random() * cuadradoSize; // Posición X aleatoria dentro del cuadrado
        const y = cuadradoY + Math.random() * cuadradoSize; // Posición Y aleatoria dentro del cuadrado

        // Establecer colores aleatorios para el círculo
       // const fillColor = `hsl(${Math.random() * 360}, 100%, 50%)`; // Color aleatorio
       const fillColor = "pink";
        dibujarCirculo(x, y, radius, fillColor);
    }
}

// Función para dibujar un círculo
function dibujarCirculo(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2); // Dibuja el círculo
    ctx.fillStyle = color; // Color de relleno
    ctx.fill(); // Rellena el círculo
    
}

// Llamamos a la función para dibujar el cuadrado y los círculos inicialmente
dibujarCuadrado();

