import { Router } from "express";
import { actualizar_pets, crear_pets, eliminar_pets, listar_pets } from "../controller/controller.pets.js";
import { upload } from "../controller/controller.pets.js";
import { validator_create } from "../middlewares/middleware.pets.js";

const ruta_pets= Router();

ruta_pets.use(upload.single('foto')); 
ruta_pets.get("/listar_pets",listar_pets);
ruta_pets.post("/crear_pets",validator_create, crear_pets)
ruta_pets.put("/actualizar_pets/:id",actualizar_pets)
ruta_pets.delete("/eliminar_pets/:id",eliminar_pets)


export default ruta_pets