import { Conexion } from "../database/conexion.js";
import  multer from"multer";
import { validationResult } from "express-validator";


const storage= multer.diskStorage({
    destination:function(req, file, cb ){
        cb(null, './public/img')
    },
    filename:function(req, file, cb ){
cb(null, file.originalname)
    }
})

const upload= multer({storage:storage})

export const saveimg=upload.single('foto')

export const listar_pets= async(req, res)=>{
    try {
        const [listar] = await Conexion.query("select nombre_r, nombre_mas, foto, mascotas.id from razas JOIN mascotas ON razas.id = mascotas.raza");

        if (listar.length > 0) {
            res.status(200).json(listar);
        } else {
            res.status(404).json({ mensaje: "no se encontraron  mascotas registradas"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }

}



export const crear_pets = async (req, res) => {
    try {
       const {raza, categoria_id, genero_id, id_amo, nombre}=req.body;
       const foto = req.file.originalname;
       const [regiterpets]= await Conexion.query("insert into mascotas(raza, categoria_id,foto,genero_id,id_amo, nombre_mas)values(?,?,?,?,?,?)",[raza,categoria_id,foto,genero_id,id_amo, nombre])
       

       if (regiterpets.affectedRows>0) {
        return res.status(200).json({
            "mensaje":"se creo con exito"
        })
        }else{
            res.status(404).json({
                "mensaje":"no se creo con exito"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};



export const actualizar_pets = async(req, res)=>{
    try {
        const{id}= req.params;
        const { raza, categoria_id,genero_id, nombre}= req.body;

        const foto=req.file.originalname
        const [actualizar]= await Conexion.query("update mascotas set raza=?,categoria_id=? ,foto=?, genero_id=?, nombre=? where id=?",[raza,categoria_id,foto,genero_id, id,nombre]);

        if (actualizar.affectedRows>0) {
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

export const listar_mascota= async(req, res)=>{
    try{
const{id}=req.params
        const[mostrar]= await Conexion.query("select*from mascotas where id=?",[id]);

        if (mostrar.length>0) {

            res.status(200).json({
                "MENSAJE":mostrar
            })
        }else{
            res.status(404).json({
                "MENSAJE":"no hay registro de  mascotas"
            })
        }
    }catch(error){
        res.status(500).json({
            "MENSAJE":error
        })
    }
}




export const listar_mascotas= async(req, res)=>{
    try{

        const[mostrar]= await Conexion.query("select*from mascotas ");

        if (mostrar.length>0) {

            res.status(200).json({
                "MENSAJE":mostrar
            })
        }else{
            res.status(404).json({
                "MENSAJE":"no hay registro de  mascotas"
            })
        }
    }catch(error){
        res.status(500).json({
            "MENSAJE":error
        })
    }
}