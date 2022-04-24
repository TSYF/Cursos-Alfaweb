export default {
    required: (value, field = "actual") => !!value || `El campo "${field}, es requerido`,
    name: [
        this.required('"Nombre"'),
        v => (v && v.length <= 12) || 'Nombre debe tener menos de 12 caracteres',
    ],
    email: [
        this.required('"Email"'),
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El email no es válido',
    ],
    password: [
        this.required('"Contraseña"'),
        v => (v && v.length >= 6) || 'La contraseña debe tener más de 6 caracteres',
    ],
    passwordConfirmation: [
        this.required('"Confirmar Contraseña"'),
        v => v === this.password || 'Las contraseñas no coinciden',
    ],
}