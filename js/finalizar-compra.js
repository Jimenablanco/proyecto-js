function obtenerMontos() {
    const totalCompra = localStorage.getItem('totalCompra');
    const totalCuotas = localStorage.getItem('totalCuotas');
    return { totalCompra, totalCuotas };
}


function actualizarOpc() {
    const montos = obtenerMontos();
    const select = document.querySelector('#floatingSelect');

    if (select) {
        const optionTotal = select.querySelector('#total');
        const optionCuotas = select.querySelector('#cuotas');

        if (optionTotal && optionCuotas) {
            optionTotal.textContent = `1 cuota de $${montos.totalCompra || '0.00'}`;
            optionTotal.value = montos.totalCompra || '0';

            optionCuotas.textContent = `3 cuotas sin interés de $${montos.totalCuotas || '0.00'}`;
            optionCuotas.value = montos.totalCuotas || '0';
        }
    }
}

actualizarOpc();


const btnComprar = document.querySelector('#btnComprar');

    if (btnComprar) {
        btnComprar.addEventListener('click', function() {
            Swal.fire({
                title: '¡Gracias por elegirnos!',
                text: 'En breve recibirá un email con los datos de su compra.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#bda488'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.removeItem('productosEnCarrito');

                    setTimeout(() => {
                        window.location.href = '../index.html';
                    }, 2000);
                }
            });
        });
    }

