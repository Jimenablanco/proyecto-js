let productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

function agregarAlCarrito(codigoProducto) {
    const producto = productos.find(producto => producto.codigo === codigoProducto);

    if (producto) {
        productosEnCarrito.push(producto);
        localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
    }
}

function mostrarProductosEnCarrito(productos) {
    const contenedorProductos = document.querySelector('#productos-carrito');

    if (contenedorProductos) {
        productos.forEach((producto) => {
            const row = document.createElement('tr');

            const imagenColumn = document.createElement('td');
            const imagen = document.createElement('img');
            imagen.src = producto.imagen;
            imagen.width = 50;
            imagenColumn.appendChild(imagen);

            const nombreColumn = document.createElement('td');
            nombreColumn.textContent = producto.nombre;

            const codigoColumn = document.createElement('td');
            codigoColumn.textContent = producto.codigo;

            const precioColumn = document.createElement('td');
            precioColumn.textContent = `$${producto.precio.toFixed(2)}`;

            const eliminarColumn = document.createElement('td');
            const botonEliminar = document.createElement('button');
            const imagenEliminar = document.createElement('img');
            imagenEliminar.src = '../assets/img/eliminar.svg'
            imagenEliminar.alt = 'Eliminar';
            imagenEliminar.width = 20;
            imagenEliminar.height = 20;
            botonEliminar.className = 'btn btn-outline-danger btn-sm btn-eliminar';
            botonEliminar.appendChild(imagenEliminar);
            botonEliminar.onclick = function() {
                eliminarDelCarrito(producto.codigo);
            };
            eliminarColumn.appendChild(botonEliminar);
            
            row.appendChild(imagenColumn);
            row.appendChild(nombreColumn);
            row.appendChild(codigoColumn);
            row.appendChild(precioColumn);
            row.appendChild(eliminarColumn);

            contenedorProductos.appendChild(row);
        });
    }
}

function eliminarDelCarrito(codigoProducto) {
    const indiceProducto = productosEnCarrito.findIndex(producto => producto.codigo === codigoProducto);
    if (indiceProducto !== -1) {
        productosEnCarrito.splice(indiceProducto, 1);
        localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));

        const contenedorProductos = document.querySelector('#productos-carrito');
        contenedorProductos.innerHTML = '';
        mostrarProductosEnCarrito(productosEnCarrito);

        mostrarTotal(productosEnCarrito);
    }
}

mostrarProductosEnCarrito(productosEnCarrito);


function mostrarTotal(productos) {
    let total = 0;

    productos.forEach((producto) => {
        total += producto.precio;
    });

    const totalElement = document.querySelector('#total');
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;

        const totalCuotas = total / 3;
        const cuotasElement = document.querySelector('#cuotas');
        if (cuotasElement) {
            cuotasElement.textContent = `$${totalCuotas.toFixed(2)}`;
        }
    }
}

mostrarTotal(productosEnCarrito);
