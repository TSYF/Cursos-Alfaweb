export default {
    name: [
        v => !!v || 'El nombre es obligatorio',
        v => (v && v.length <= 12) || 'Nombre debe tener menos de 12 caracteres',
    ],
    email: [
        v => !!v || 'El email es obligatorio',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'El email no es válido',
    ],
    password: [
        v => !!v || 'La contraseña es obligatoria',
        v => (v && v.length >= 6) || 'La contraseña debe tener más de 6 caracteres',
    ],
    passwordConfirmation: [
        v => !!v || 'La confirmación de la contraseña es obligatoria',
        v => v === this.password || 'Las contraseñas no coinciden',
    ],
}