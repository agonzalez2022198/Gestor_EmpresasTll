import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'Necesitas el nombre'],
    },

    correo: {
        type: String,
        required: [true, 'Necesitas un correo'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Y tu contraseña?'],
    },

    estado: {
        type: Boolean,
        default: true,
    }
});


UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}


export default mongoose.model('User', UserSchema);