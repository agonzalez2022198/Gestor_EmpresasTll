import User from '../usuario/usuario.model.js';
import Empresa from '../empresa/empresa.model.js';
import Cliente from "../cliente/cliente.model.js";


export const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({correo});
    if (existeEmail){
        throw new Error(`El email ${correo} ya fue registrado`);
    }
}


export const existeUsuarioById = async (id = '') => {
    const existeUsuario = await User.findById(id);
    if (!existeUsuario){
        throw new Error(`El ID: ${id} No existe`);
    }
}


export const existeEmpresaById = async (id = '') => {
    const existeEmp = await Empresa.findById(id);
    if (!existeEmp){
        throw new Error(`El ID: ${id} No existe`);
    }
}


export const existeClienteById = async (id = '') => {
    const existeCli = await Cliente.findById(id);
    if (!existeCli){
        throw new Error(`El cliente con ID: ${id} No existe`);
    }
}