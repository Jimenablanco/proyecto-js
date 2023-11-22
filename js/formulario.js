const form = document.querySelector('form#miFormulario');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.querySelector('input#nombre').value;
    const email = document.querySelector('input#email').value;
    const telefono = document.querySelector('input#telefono').value;
    const mensaje = document.querySelector('textarea#mensaje').value;

    const formData = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        mensaje: mensaje
    };

    const jsonData = JSON.stringify(formData);

    localStorage.setItem('datosFormularioContacto', jsonData);

    form.reset();

    const notification = document.querySelector('div#notification');
    notification.style.display = 'block';
    notification.classList.add('show', 'alert-success');

});

const datosGuardados = localStorage.getItem('datosFormularioContacto');
    if (datosGuardados) {
        const formData = JSON.parse(datosGuardados);
        document.querySelector('input#nombre').value = formData.nombre;
        document.querySelector('input#email').value = formData.email;
        document.querySelector('input#telefono').value = formData.telefono;
        document.querySelector('textarea#mensaje').value = formData.mensaje;
    }