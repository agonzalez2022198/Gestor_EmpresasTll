import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import Empresa from './empresa.model.js';

export const empresasGet = async ( req = request, res = response ) => {

    const {limite, desde} = req.query;
    const query = {estado: true};

    const [total, empresas]= await Promise.all([
        Empresa.countDocuments(query),
        Empresa.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total, empresas
    });

}


export const empresasPost = async (req, res) => {
    const { nombre, descripcion, nivelImpacto, añosTrayect, categoriaEmp } = req.body;

    try {
        // Crea una instancia del modelo User
        const empresa = new Empresa({ nombre, descripcion, nivelImpacto, añosTrayect, categoriaEmp });

        // Guarda el usuario en la base de datos
        await empresa.save();

        res.status(200).json({
            empresa
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error al crear la empresa',
            error: error.message
        });
    }
};



export const getEmpresaById = async (req, res= response) => {

    const {id} = req.params;
    const empresa= await Empresa.findOne({_id: id});

    res.status(200).json({
        empresa
    });

}


export const empresaPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, ...resto} = req.body;

    await Empresa.findByIdAndUpdate(id, resto);

    const empresa = await Empresa.findOne({_id: id});

    res.status(200).json({
        empresa,
        msg: 'Empresa Actualizada'
        
    });
}


export const empresaDelete = async (req, res) => {
    const {id} = req.params;


    const empresa = await Empresa.findByIdAndUpdate(id, { estado: false});
    const empresaAutentificada = req.usuario;

    res.status(200).json({msg:'Usuario a eliminar', empresa, empresaAutentificada, msg: 'Eliminado!!!' });
}