import { Conexion } from "../database/conexion.js";
import  multer from"multer";
import { validationResult } from "express-validator";
import fs from"node:fs"

export const listar_pets= async(req, res)=>{
    try {
        console.log(req.file);
        const { id, raza, categoria_id, genero_id, id_dueño } = req.body;
        const foto = req.file;

        // Verificar si hay un archivo adjunto
        if (!foto) {
            return res.status(400).json({ mensaje: "No se ha adjuntado ningún archivo." });
        }

        const fotos = saveimg(foto);
        const [listar] = await Conexion.query("insert into mascotas(id,raza,categoria_id,foto,genero_id,id_dueño)values(?,?,?,?,?,?)", [id, raza, categoria_id, fotos, genero_id, id_dueño]);

        if (listar.affectedRows > 0) {
            res.status(200).json({ mensaje: "se crea co exito" });
        } else {
            res.status(404).json({ mensaje: "no se creo la mascota " });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }

}


//se crea el directorio
 export  const upload = multer({dest:"./public/img"})
//se guarda con el nombre oriinal
 function saveimg(file){
    const newfile=`./public/img/${file.originalname}`
    fs.renameSync(file.path,newfile);
    return newfile
}

export const crear_pets = async (req, res) => {
    try {

        console.log(req.file);
        const { raza, categoria_id, genero_id, id_dueño } = req.body;
        const foto = req.file;
        console.log("Raza:", raza);
        console.log("Categoria ID:", categoria_id);
        console.log("Genero ID:", genero_id);
        console.log("ID Dueño:", id_dueño);

        if (!foto) {
            return res.status(400).json({ mensaje: "No se ha adjuntado ningún archivo." });
        }
        //se pasa la const que tiene el archivo
        const fotos = saveimg(foto);

        const [listar] = await Conexion.query("insert into mascotas(raza, categoria_id, foto, genero_id, id_dueño) values (?, ?, ?, ?, ?)", [raza, categoria_id, fotos, genero_id, id_dueño]);

        if (listar.affectedRows > 0) {
            res.status(200).json({ mensaje: "Se creó con éxito." });

        } else {
            res.status(404).json({ mensaje: "No se creó la mascota." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};



export const actualizar_pets = async(req, res)=>{
    try {
        const{id}= req.params;
        const { raza, categoria_id,foto, genero_id}= req.body;
        const [listar]= await Conexion.query("update mascotas set raza=?,categoria_id=? ,foto=?, genero_id=? where id=?",[raza,categoria_id,foto,genero_id, id]);

        if (listar.affectedRows>0) {
            res.status(200).json({
                "mensaje":"se actualizo con exito"
            })
        }else{
            res.status(404).json({
                "mensaje":"no se actualizo la mascota "
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "message":error
        })
    }
}

export const eliminar_pets= async(req,res)=>{
    try {
        const {id}= req.params
        const [ eliminar]=await Conexion.query("delete from mascotas where id=?",[id])

        if (eliminar.affectedRows>0) {
            res.status(200).json({
                "message":"se elimino con exito"
            })
        }else{
            res.status(404).json({
                "mesage":"no se elimino"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "mensaje":error
        })
    }
}