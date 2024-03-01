'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';

import userRoutes from '../src/usuario/usuario.routes.js';
import empresaRoutes from '../src/empresa/empresa.routes.js';
import authRoutes from '../src/auth/auth.routes.js';

//Routes en esta parte...

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //Rutas
        this.usuarioPath = '/api/usuario';
        this.empresaPath = '/api/empresa';
        this.authPath = '/api/auth';

        this.middlewares();
        this.conectarDB();
        this.routes();
    }


    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }


    routes(){
        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.empresaPath, empresaRoutes);
        this.app.use(this.authPath, authRoutes);
    }


    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}


export default Server;