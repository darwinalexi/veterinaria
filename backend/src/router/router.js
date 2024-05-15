import { Router } from "express";
import { actualizar_user, buscar_user, crear_user, listar_user } from "../controller/controller.user.js";

 const ruta_user= Router();
ruta_user.get("/listar",listar_user)
ruta_user.post("/crear",crear_user)
ruta_user.put("/actualizar/:id",actualizar_user)
ruta_user.get("/buscar/:id",buscar_user)

export default ruta_user