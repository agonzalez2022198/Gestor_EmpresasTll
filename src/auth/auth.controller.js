import bcryptjs from 'bcryptjs';
import Usuario from '../usuario/usuario.model.js';
import {generarJWT} from '../helper/generate-jwt.js';

export const login = async (req, res) => {
    const {correo, password} = req.body;


    try {
        
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg: "Credenciales incorrectas, correo no está en la DB"
            });
        }

        if (!usuario.estado) {
            return res.status(400).json({
              msg: "El usuario no existe en la base de datos",
            });
          }
          // verificar la contraseña
          const validPassword = bcryptjs.compareSync(password, usuario.password);
          if (!validPassword) {
            return res.status(400).json({
              msg: "La contraseña es incorrecta",
            });
          }
          //generar el JWT
          const token = await generarJWT( usuario.id);
      
          res.status(200).json({
            msg: 'Login Ok!!!',
            usuario,
            token
          });

    } catch (e) {
        console.log (e);
        res.status(500).json({
            msg: "Comuniquese con el administrador"
        });
    }

}