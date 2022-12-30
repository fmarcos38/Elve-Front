export const regExp = {
    name: {
        regExp: /^[a-zA-Z\s]*$/,
        errorLeyend: 'Ingrese solo caracteres.'
    },
    email: {
        regExp: /\S+@\S+\.\S+/,
        errorLeyend: 'Ingrese un e-mail válido.'
    },
    password: {
        regExp: /^.{6,24}$/,
        errorLeyend: 'La contraseña debe tener entre 6 y 24 caracteres.'
    },
    tel: {
        regExp: /^.{6,24}$/,
        errorLeyend: 'El num de tel debe tener más de 6 digitos.'
    },
};
 