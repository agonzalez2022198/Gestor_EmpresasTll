import mongoose from  'mongoose';

const EmpresaSchema = mongoose.Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre de la empresa es obligatorio']
    },

    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    },

    nivelImpacto: {
        type: String,
        required: [true, 'El nivel de impacto es obligatorio']
    },

    añosTrayect: {
        type: String,
        required: [true, 'Los años de trayectoria son obligatorios']
    },

    categoriaEmp: {
        type: String,
        required: [true, 'Es necesaria la categoria']
    },

    estado: {
        type: Boolean,
        default: true
    }

});


EmpresaSchema.methods.toJSON = function(){
    const { __v, _id, ...empresa} = this.toObject();
    empresa.uid = _id;
    return empresa;
  }
  
  export default mongoose.model('Empresa', EmpresaSchema);