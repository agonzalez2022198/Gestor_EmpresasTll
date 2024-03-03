import { Router } from "express";
import { check } from "express-validator";
import {
  empresasGet,
  empresaPut,
  getEmpresaById,
  empresasPost,
  empresaDelete,
  empresasGetAZ,
  empresasGetZA
} from "./empresa.controller.js";


import {
  existeEmpresaById,
} from "../helper/db-validator.js";


import { validarCampos } from "../middlewares/validar-campos.js";
//import { tieneRole } from "../middlewares/validar-roles.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

//router.get("/", empresasGet);

router.get("/", empresasGetAZ);

router.get("/za", empresasGetZA);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeEmpresaById),
    validarCampos,
  ],
  getEmpresaById
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("nivelImpacto", "Nivel de impacto es obligatorio").not().isEmpty(),
    check("añosTrayect", "Años de trayectoria es obligatorio").not().isEmpty(),
    check("categoriaEmp", "Necesitas poner la categoria").not().isEmpty(),
    //check("role").custom(esRoleValido),
    validarCampos,
  ],
  empresasPost
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeEmpresaById),
    validarCampos,
  ],
  empresaPut
);

router.delete(
  "/:id",
  [
    //validarJWT,
    //tieneRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeEmpresaById),
    validarCampos,
  ],
  empresaDelete
);

export default router;