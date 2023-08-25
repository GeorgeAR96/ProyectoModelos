const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    cedula: /^\d{9}$/, // Cédula de 9 números.
    fecha: /^\d{4}-\d{2}-\d{2}$/ // Fecha en formato YYYY-MM-DD.
};

const campos = {
    correo: false,
    cedula: false,
    fecha: false,
};

const validarFormulario = (e) => {
    const campo = e.target.name;
    validarCampo(expresiones[campo], e.target, campo);
};

const validarCampo = (expresion, input, campo) => {
    const grupo = document.getElementById(`grupo__${campo}`);
    const icono = grupo.querySelector('i');
    const error = grupo.querySelector('.formulario__input-error');

    if (expresion.test(input.value)) {
        grupo.classList.remove('formulario__grupo-incorrecto');
        grupo.classList.add('formulario__grupo-correcto');
        icono.classList.remove('fa-times-circle');
        icono.classList.add('fa-check-circle');
        error.classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        grupo.classList.add('formulario__grupo-incorrecto');
        grupo.classList.remove('formulario__grupo-correcto');
        icono.classList.add('fa-times-circle');
        icono.classList.remove('fa-check-circle');
        error.classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terminos = document.getElementById('terminos');
    if (campos.correo && campos.cedula && campos.fecha) {
        formulario.reset();

        const exitoMensaje = document.getElementById('formulario__mensaje-exito');
        exitoMensaje.classList.add('formulario__mensaje-exito-activo');
        setTimeout(() => {
            exitoMensaje.classList.remove('formulario__mensaje-exito-activo');
        }, 5000);

        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });
    } else {
        const errorMensaje = document.getElementById('formulario__mensaje');
        errorMensaje.classList.add('formulario__mensaje-activo');
    }
});
