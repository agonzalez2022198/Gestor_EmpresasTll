import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import Empresa from './empresa.model.js';
import ExcelJS from 'exceljs';

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


export const empresasGetAZ = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, empresas] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .sort({ categoriaEmp: 1 }) // Ordena por la variable "categoria" de manera ascendente (de la 'a' a la 'z')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            empresas
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error al obtener las empresas',
            error: error.message
        });
    }
};


export const empresasGetZA = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, empresas] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .sort({ categoriaEmp: -1 }) // Ordena por la variable "categoria" de manera descendente (de la 'z' a la 'a')
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            empresas
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error al obtener las empresas',
            error: error.message
        });
    }
};


export const reporteExcel = async (req, res) => {

    const query = {estado: true};

    try {
        const empresas = await Empresa.find (query);

        const workbook = new ExcelJS.Workbook();
        const workSheet = workbook.addWorksheet('Empresas');

        workSheet.columns = [
            { header: 'Nombre', key: 'nombre', width: 20 },
            { header: 'Descripción', key: 'descripcion', width: 40 },
            { header: 'Nivel de Impacto', key: 'nivelImpacto', width: 15 },
            { header: 'Años de Trayectoria', key: 'añosTrayect', width: 20 },
            { header: 'Categoría', key: 'categoriaEmp', width: 20 }
        ];

        empresas.forEach(empresa =>{
            workSheet.addRow({
                nombre: empresa.nombre,
                descripcion: empresa.descripcion,
                nivelImpacto: empresa.nivelImpacto,
                añosTrayect: empresa.añosTrayect,
                categoriaEmp: empresa.categoriaEmp
            });
        });


        const buffer = await workbook.xlsx.writeBuffer();

        res.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.set('Content-Disposition', 'attachment; filename="reporte_empresas.xlsx"');
        res.send(buffer);



    } catch (e) {
        console.log('Error al generar el reporte Excel:', e);
        res.status(500).json({
            msg: 'Hubo un error al generar el reporte Excel',
            e: e.message
        });

    }
}
