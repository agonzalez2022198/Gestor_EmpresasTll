import { response, request} from "express";
import bcryptjs from "bcryptjs";
import Cliente from "./cliente.model.js";

export const clientesGet = async (req=request, res=response) =>{

    const {limite,desde} = req.query;
    const query = {estado: true};


    const [total, clientes] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total, clientes
    });

}


export const clientesPost = async (req,res)=>{

    const {nombre, apellido, correo, number} = req.body;
    const cliente = new Cliente({nombre, apellido, correo, number});

    await cliente.save();

    res.status(200).json({
        cliente, msg: "Agregado!!!!"
    });

}