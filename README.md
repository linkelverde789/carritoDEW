# 🛒 Carrito de Compras con Carrusel de Productos

## Descripción

Este proyecto es una aplicación web interactiva desarrollada en JavaScript que permite a los usuarios explorar un catálogo de productos mediante un carrusel dinámico, agregar productos a un carrito de compras, y administrar los elementos seleccionados. Además, se emplea localStorage para preservar el estado del carrito entre sesiones.

## Características

1. **Carrusel de Productos**:
   - Muestra los productos disponibles con imagen, nombre y precio.
   - Navegación entre productos mediante botones de "anterior" y "siguiente".
   - Resalta productos al pasar el cursor sobre ellos.

2. **Carrito de Compras**:
   - Permite agregar productos al carrito desde el carrusel.
   - Muestra los productos agregados con su nombre, precio y cantidad.
   - Calcula dinámicamente el total de la compra.
   - Permite eliminar productos del carrito.

3. **LocalStorage**:
   - Guarda el contenido del carrito en el navegador para mantenerlo al recargar la página.

4. **Prototipos y Herencia**:
   - Uso de prototipos para la representación de productos y herencia para manejar productos con descuento.

5. **Eventos Interactivos**:
   - Uso de eventos como `click` y `mouseover` para mejorar la experiencia de usuario.

6. **Finalización de Compra**:
   - Incluye un botón que simula la finalización de la compra y muestra un resumen con fecha y hora.

## Estructura del Proyecto

### 1. **Modelo de Productos**
- **Producto**: Representa los productos con propiedades como nombre, precio e imagen.
- **ProductoConDescuento**: Hereda de Producto y añade propiedades específicas para descuentos.

### 2. **Carrusel**
- Permite la navegación entre productos con botones de "anterior" y "siguiente".
- Actualiza dinámicamente la interfaz con los datos del producto mostrado.

### 3. **Carrito de Compras**
- Representado como un arreglo de productos.
- Funciones para agregar, eliminar y calcular el total de la compra.

### 4. **LocalStorage**
- Almacena el carrito y lo recupera al recargar la página.

## Archivos

1. `index.html`: Contiene la estructura HTML de la página, el carrusel y el carrito.
2. `styles.css`: Define los estilos visuales de la aplicación.
3. `app.js`: Contiene toda la lógica de la aplicación, incluyendo la implementación de prototipos, eventos y localStorage.

