const productos = [];
const url = "./js/productos.json";
const campoBusqueda = document.querySelector('input#buscar');
const contenedorResultados = document.querySelector('#resultadosBusqueda div#card-productos');
const seccionesOcultas = document.querySelectorAll('main > section');
const productosContainer = document.querySelector('#card-productos');

function cardProductosEnContenedor(array, contenedor) {
    contenedor.innerHTML = '';

    array.forEach((producto) => {
        const card = document.createElement('div');
        card.className = 'col-md-2 mb-3 mr-3';

        card.innerHTML = `
            <div class="card">
                <img src="${producto.imagen}" class="card-img-top" alt="Imagen del producto">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Cod. ${producto.codigo}</p>
                    <h6 class="card-text">$${producto.precio}</h6>
                    <button class="btn btn-outline-light agregar-carrito" onclick="agregarAlCarrito(${producto.codigo})">
                        <img class="carrito-mas" src="../assets/img/carrito-mas.svg" alt="">
                    </button>
                </div>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

function cardProductos(array) {
    cardProductosEnContenedor(array, productosContainer);
}


async function cargarProductos() {
    const response = await fetch(url);
    const data = await response.json();

    productos.push(...data);
    cardProductos(productos);
}

cargarProductos()


function buscarProductos(palabraClave) {
    palabraClave = palabraClave.toLowerCase().trim();

    const resultados = productos.filter(producto => {
        return (
            producto.nombre.toLowerCase().includes(palabraClave) ||
            producto.codigo.toString().includes(palabraClave)
        );
    });

    return resultados;
}

function mostrarResultados(resultados) {
    if (resultados.length === 0) {
        contenedorResultados.innerHTML = '<p>No se encontraron resultados.</p>';
    } else {
        cardProductosEnContenedor(resultados, contenedorResultados);
    }

    seccionesOcultas.forEach(seccion => {
        if (seccion !== contenedorResultados.parentElement) {
            seccion.style.display = 'none';
        }
    });

    contenedorResultados.style.display = 'block';
}

campoBusqueda.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const palabraClave = campoBusqueda.value;
        const resultados = buscarProductos(palabraClave);
        mostrarResultados(resultados);
    }
});


