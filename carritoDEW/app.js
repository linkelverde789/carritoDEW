// Constructor para productos genéricos
function Producto(nombre, precio, imagen) {
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
}

// Constructor para productos con descuento (hereda de Producto)
function ProductoConDescuento(nombre, precio, imagen, descuento) {
    Producto.call(this, nombre, precio, imagen); // Llamamos al constructor de Producto
    this.descuento = descuento; // Agregamos la propiedad descuento
}

// Configuramos la herencia de ProductoConDescuento desde Producto
ProductoConDescuento.prototype = Object.create(Producto.prototype);
ProductoConDescuento.prototype.constructor = ProductoConDescuento;

// Método para calcular el precio con descuento
ProductoConDescuento.prototype.obtenerPrecioConDescuento = function () {
    return this.precio * (1 - this.descuento);
};

// Lista de productos que incluye objetos de ambos tipos
const productos = [
    new Producto("Pokémon Negro 2", 39.99, "pkmn2.png"),
    new ProductoConDescuento("Pokémon Y", 39.99, "pkmy.png", 0.15),
    new Producto("Super Mario 3D Land", 29.99, "sml3.png"),
    new Producto("The Legend of Zelda: A Link Between Worlds", 39.99, "tlozla.png"),
    new ProductoConDescuento("Animal Crossing: New Leaf", 29.99, "acnl.png", 0.1),
    new Producto("Mario Kart 7", 29.99, "mk7.png"),
    new Producto("Fire Emblem: Awakening", 39.99, "fea.png"),
    new ProductoConDescuento("Luigi's Mansion: Dark Moon", 34.99, "lm2.png", 0.2),
    new Producto("Pokémon Rubí Omega", 39.99, "pkmor.png"),
    new ProductoConDescuento("Super Smash Bros. 3DS", 39.99, "ssb.png", 0.25),
    new Producto("Mario & Luigi: Dream Team", 29.99, "mldt.png"),
    new Producto("Pokémon Diamante", 34.99, "pkmd.png"),
    new ProductoConDescuento("New Super Mario Bros.", 29.99, "smb.png", 0.2),
    new Producto("The Legend of Zelda: Phantom Hourglass", 29.99, "tlozph.png"),
    new Producto("Castlevania: Dawn of Sorrow", 24.99, "cds.png"),
    new ProductoConDescuento("Mario & Luigi: Compañeros en el tiempo", 34.99, "mlpit.png", 0.15)
];

// Índice que indica el producto actual mostrado
let indiceProductoActual = 0;

// Función para actualizar la visualización de los productos
function actualizarVisualizacionProducto() {
    const productoIzquierda = productos[indiceProductoActual]; // Producto en el lado izquierdo
    const productoDerecha = productos[(indiceProductoActual + 1) % productos.length]; // Producto en el lado derecho

    // Actualizamos imagen y nombre del producto izquierdo
    document.getElementById('product-image-left').src = './imagenes/'+productoIzquierda.imagen;
    document.getElementById('product-name-left').textContent = productoIzquierda.nombre;

    // Actualizamos precio del producto izquierdo, mostrando el descuento si aplica
    if (productoIzquierda instanceof ProductoConDescuento) {
        const precioOriginal = productoIzquierda.precio.toFixed(2);
        const precioConDescuento = productoIzquierda.obtenerPrecioConDescuento().toFixed(2);
        document.getElementById('product-price-left').innerHTML = `
            <span style="text-decoration: line-through;">${precioOriginal}€</span>
            <span style="color: red;">${precioConDescuento}€</span>
        `;
    } else {
        document.getElementById('product-price-left').textContent = `${productoIzquierda.precio.toFixed(2)}€`;
    }

    // Repetimos el mismo proceso para el producto derecho
    document.getElementById('product-image-right').src = './imagenes/'+productoDerecha.imagen;
    document.getElementById('product-name-right').textContent = productoDerecha.nombre;

    if (productoDerecha instanceof ProductoConDescuento) {
        const precioOriginal = productoDerecha.precio.toFixed(2);
        const precioConDescuento = productoDerecha.obtenerPrecioConDescuento().toFixed(2);
        document.getElementById('product-price-right').innerHTML = `
            <span style="text-decoration: line-through;">${precioOriginal}€</span>
            <span style="color: red;">${precioConDescuento}€</span>
        `;
    } else {
        document.getElementById('product-price-right').textContent = `${productoDerecha.precio.toFixed(2)}€`;
    }

    // Agregamos descripción para accesibilidad (lector de pantalla)
    document.getElementById('product-display').setAttribute('aria-label', `Producto actual: ${productoIzquierda.nombre},
        ${productoDerecha.nombre}, Precios: ${productoIzquierda.precio.toFixed(2)}€, ${productoDerecha.precio.toFixed(2)}€`);

    // Añadimos una animación simple para mostrar cambios de producto
    document.getElementById('product-display').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('product-display').style.opacity = '1';
    }, 50);
}

// Navegación entre productos (previo y siguiente)
document.getElementById('prev-product').addEventListener('click', () => {
    indiceProductoActual = (indiceProductoActual - 1 + productos.length) % productos.length; // Producto anterior
    actualizarVisualizacionProducto();
});

document.getElementById('next-product').addEventListener('click', () => {
    indiceProductoActual = (indiceProductoActual + 1) % productos.length; // Producto siguiente
    actualizarVisualizacionProducto();
});

// Carrito de compras
let carrito = [];

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const elementosCarrito = document.getElementById('cart-items'); // Contenedor de elementos del carrito
    elementosCarrito.innerHTML = ''; // Limpiamos el contenido previo
    let total = 0;

    // Agrupamos productos para mostrar cantidades
    const productosAgrupados = agruparProductos(carrito);

    productosAgrupados.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        const precio = item.producto instanceof ProductoConDescuento ? item.producto.obtenerPrecioConDescuento() : item.producto.precio;
        const subtotal = precio * item.cantidad;

        // Nombre del producto
        const nombreProducto = document.createElement('div');
        nombreProducto.className = 'cart-name';
        nombreProducto.textContent = item.producto.nombre;
        li.appendChild(nombreProducto);

        // Precio y cantidad
        const infoPrecio = document.createElement('div');
        infoPrecio.className = 'cart-price';
        infoPrecio.textContent = `${precio.toFixed(2)}€ x ${item.cantidad} = ${subtotal.toFixed(2)}€`;
        li.appendChild(infoPrecio);

        // Botón para eliminar producto del carrito
        const botonEliminar = document.createElement('button');
        botonEliminar.className = 'delete-button';
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', () => {
            eliminarDelCarrito(item.producto.nombre); // Lógica para eliminar
        });
        li.appendChild(botonEliminar);

        elementosCarrito.appendChild(li); // Añadimos el producto al carrito visualizado
        total += subtotal; // Sumamos al total
    });

    document.getElementById('cart-total').textContent = total.toFixed(2); // Mostramos el total
}

// Agrupa productos iguales en el carrito
function agruparProductos(carrito) {
    const productosAgrupados = [];
    carrito.forEach((producto) => {
        const productoExistente = productosAgrupados.find(item => item.producto.nombre === producto.nombre);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            productosAgrupados.push({ producto, cantidad: 1 });
        }
    });
    return productosAgrupados;
}

// Elimina un producto del carrito
function eliminarDelCarrito(nombreProducto) {
    const indice = carrito.findIndex(item => item.nombre === nombreProducto);
    if (indice !== -1) {
        carrito.splice(indice, 1);
        actualizarCarrito(); // Actualizamos visualización
        guardarCarritoEnLocalStorage(); // Guardamos cambios en almacenamiento local
    }
}

// Añadir productos al carrito
document.getElementById('add-to-cart-left').addEventListener('click', () => {
    const producto = productos[indiceProductoActual];
    carrito.push(producto);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
});

document.getElementById('add-to-cart-right').addEventListener('click', () => {
    const producto = productos[(indiceProductoActual + 1) % productos.length];
    carrito.push(producto);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();
});

// Proceso de compra (vacía el carrito)
document.getElementById('checkout').addEventListener('click', () => {
    const ahora = new Date();
    alert(`¡Gracias por su compra el ${ahora.toLocaleString()}!`);
    carrito = []; // Vaciamos el carrito
    actualizarCarrito(); // Actualizamos visualización
    guardarCarritoEnLocalStorage(); // Guardamos estado vacío
});

// Guardar carrito en almacenamiento local
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Cargar carrito del almacenamiento local al iniciar la página
function cargarCarritoDeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

// Inicialización de la página
actualizarVisualizacionProducto();
cargarCarritoDeLocalStorage();

// Efectos visuales en el área de productos
document.getElementById('product-display').addEventListener('mouseover', () => {
    document.getElementById('product-display').style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
});

document.getElementById('product-display').addEventListener('mouseout', () => {
    document.getElementById('product-display').style.boxShadow = 'none';
});
