import { Conexion } from "../database/conexion.js";
import jwt from"jsonwebtoken"

export const login= async (req, res) => {
try {
    const {correo, contrasena}=req.body;
    const[logueo]= await Conexion.query("select*from usuarios where correo=? and contrasena=?",[correo,contrasena])
const user= logueo[0]
    if (logueo.length>0) {
        const token = jwt.sign({logueo},process.env.AUTO_SECRET,{expiresIn:process.env.AUTO_EXPIRE})
        return res.status(200).json({
            "mensaje":logueo,
            "token":token
        })
    }else{
        res.status(404).json({
            "mensaje":"usuario no se enconto"
        })
    }
} catch (error) {
   console.log(error) 
   res.status(500).json({
    "mensaje":error
})
}
}