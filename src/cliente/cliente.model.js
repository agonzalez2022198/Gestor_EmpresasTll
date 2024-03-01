import mongoose from 'mongoose';

const ClienteSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },

    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },

    correo: {
        type: String,
        required: [true, 'Es necesario el Email']
    },

    number: {
        type: String,
        required: [true, 'El número es obligatorio|']
    },

    registro: {
        type: Date,
        default: Date.now,
        required: [true, 'El registro es automático, parce.']
    },

    estado: {
        type: Boolean,
        default: true
    }

});


export default mongoose.model('Cliente', ClienteSchema);