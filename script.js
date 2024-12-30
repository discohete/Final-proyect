// Consumo de la API del clima
async function fetchClima() {
    const url = "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=35.5&lon=-78.5&units=imperial&lang=en";
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "30f26ac04emsh8465f53de822f60p1b8565jsn96fb0964deb9",
            "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        const clima = data.data[0];
        document.getElementById("clima").innerHTML = `🌡️ ${clima.temp}°F - ${clima.weather.description}`;
    } catch (error) {
        console.error("Error fetching clima:", error);
    }
}

fetchClima();

// Generación dinámica de productos
const productos = [
    { id: 1, nombre: "Repostería Casera", imagen: "libro1.jpg", precio: 9999 },
    { id: 2, nombre: "El Gran Libro de las Carnes: Guía Definitiva", imagen: "libro2.jpg", precio: 9999 },
    { id: 3, nombre: "Del Mar a la Mesa: Guía Completa de Pescados", imagen: "libro3.jpg", precio: 9999 },
    { id: 4, nombre: "Cocina Saludable: El Placer de Comer Bien", imagen: "libro4.jpg", precio: 9999 },
    { id: 5, nombre: "Manjares Selectos: Recetas de Autor", imagen: "libro5.jpg", precio: 9999 },
];

function renderProductos() {
    const container = document.getElementById("productos-container");
    container.innerHTML = productos
        .map(
            (producto) => `
        <div class="product-card">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        </div>
    `
        )
        .join("");
}

renderProductos();

// Funcionalidad del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(id) {
    const producto = productos.find((p) => p.id === id);
    const productoEnCarrito = carrito.find((p) => p.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1; // Incrementar la cantidad si ya está en el carrito
    } else {
        producto.cantidad = 1; // Agregar la cantidad si es nuevo
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();

    // Mostrar el notificador
    mostrarNotificador();
}

function mostrarNotificador() {
    const notificador = document.getElementById("notificador");
    notificador.style.display = "block";
    setTimeout(() => {
        notificador.style.display = "none";
    }, 3000); // Ocultar después de 3 segundos
}

function actualizarCarrito() {
    document.getElementById("carrito-count").textContent = carrito.reduce((total, p) => total + p.cantidad, 0);
    renderCarrito();
    actualizarTotal();
}

function renderCarrito() {
    const container = document.getElementById("carrito-items");
    container.innerHTML = carrito
        .map(
            (producto) => `
        <div class="carrito-item">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <input type="number" min="1" value="${producto.cantidad}" onchange="actualizarCantidad(${producto.id}, this.value)">
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        </div>
    `
        )
        .join("");
}

function actualizarCantidad(id, cantidad) {
    const productoEnCarrito = carrito.find((p) => p.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad = parseInt(cantidad);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter((p) => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarTotal() {
    const total = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);
    document.getElementById("total-pagar").textContent = total.toFixed(2);
}

// Mostrar y ocultar el carrito flotante
document.addEventListener("DOMContentLoaded", () => {
    const carritoLink = document.getElementById("carrito-link");
    const carritoFlotante = document.getElementById("carrito-flotante");
    const cerrarCarrito = document.getElementById("cerrar-carrito");

    // Mostrar el carrito flotante al hacer clic en el enlace
    carritoLink.addEventListener("click", (e) => {
        e.preventDefault();
        carritoFlotante.classList.toggle("oculto");
    });

    // Cerrar el carrito flotante
    cerrarCarrito.addEventListener("click", () => {
        carritoFlotante.classList.add("oculto");
    });
});

// Vaciar el carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
});

// Inicializar el carrito
actualizarCarrito();

// Validación del formulario de contacto
document.getElementById("contacto-form").addEventListener("submit", function (event) {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const emailValue = emailInput.value;

    // Validar que el email contenga "@" y ".com"
    if (!emailValue.includes("@") || !emailValue.includes(".com")) {
        emailError.style.display = "block"; // Mostrar mensaje de error
        event.preventDefault(); // Evitar que el formulario se envíe
    } else {
        emailError.style.display = "none"; // Ocultar mensaje de error si el email es válido
    }
});



