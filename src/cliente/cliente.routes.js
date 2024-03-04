import {Router} from "express";
import {check} from "express-validator";

import {clientesGet, clientesPost} from "./cliente.controller.js";

import {existeClienteById} from "../helper/db-validator.js";

import {validarCampos} from "../middlewares/validar-campos.js";

const router = Router();

router.get("/", clientesGet);

router.post(
    "/",
    [
      check("nombre", "El nombre es obligatorio").not().isEmpty(),
      check("apellido", "El apellido es obligatorio").not().isEmpty(),
      check("correo", "Este no es un correo válido").isEmail(),
      check("number", "El number es obligatorio").not().isEmpty(),
      validarCampos,
    ],
    clientesPost
);


router.put(
  "/:id",
  [
      check('id', 'No es un id válido').isMongoId(),
      check('id').custom(existeUsuarioById),
      check("role").custom(esRoleValido),
      validarCampos
  ], putUsuarios);


export default router;