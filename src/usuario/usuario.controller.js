import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import User from './usuario.model.js';

export const usuarioGet = async ( req = request, res = response ) => {

    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, usuarios]= await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total, usuarios
    });

}


export const usuariosPost = async (req, res) => {
    const { nombre, correo, password } = req.body;

    try {
        // Crea una instancia del modelo User
        const usuario = new User({ nombre, correo, password });

        // Hashea la contraseña antes de guardarla en la base de datos
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password, salt);

        // Guarda el usuario en la base de datos
        await usuario.save();

        res.status(200).json({
            usuario
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error al crear el usuario',
            error: error.message
        });
    }
};



export const getUsuarioById = async (req, res= response) => {

    const {id} = req.params;
    const usuario= await User.findOne({_id: id});

    res.status(200).json({
        usuario
    });

}


export const usuariosPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if(password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    await User.findByIdAndUpdate(id, resto);

    const usuario = await User.findOne({_id: id});

    res.status(200).json({
        usuario,
        msg: 'Usuario Actualizado'
        
    });
}


export const usuariosDelete = async (req, res) => {
    const {id} = req.params;


    const usuario = await User.findByIdAndUpdate(id, { estado: false});
    const usuarioAutenticado = req.usuario;

    res.status(200).json({msg:'Usuario a eliminar', usuario, usuarioAutenticado });
}