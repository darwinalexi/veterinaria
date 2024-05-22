
import { useEffect, useState } from 'react'
import axios from "axios";
import {Link} from"react-router-dom"

const Pets = () => {
  const [pets, setpets] = useState([])

 

 const listar_pets = async () => {
    try {
      const listar = await axios.get("http://localhost:4001/listar_pets")
      console.log(listar.data)
      setpets(listar.data)
    } catch (error) {
      console.log(error)
    }
  }

  const listar_mascota=async()=>{
    try {
        const mostrar = await axios.get(`http://localhost:4001/buscar_mascota/${id}`)
        console.log(mostrar)
        setpets(mostrar)
    } catch (error) {
        console.log(error)
    }
}


  useEffect(() => {
    listar_pets();
  }, [])

  const borrar_pets=async(id)=>{
    try {
        const borrar = await axios.delete(`http://localhost:4001/eliminar_pets/${id}`)

        if(borrar.status===200){
            console.log("se elimino")
        }else{
            console.log("no se elimino")
        }
    } catch (error) {
        console.log(error)
    }
}


  return (
    <>
      <div className='bg-red-700 w-screen absolute left-0'>

        <h1>Administrar Mascotas</h1>
        <br />
        <Link to={'/crear_mascota'} className='bg-sky-400 pl-12 pr-12 p-2 mb-12'>Crear Macota</Link>
        <Link to={'/mostrar_mascota'} className='bg-sky-400 pl-12 pr-12 p-2 mb-12'>mostar</Link>
        {pets.map((pet) => (
          <div key={pet.id} className="flex items-center  mb-4">
            <div className="bg-red-500 rounded-full w-full ">
              <img src={`http://localhost:4001/img/${pet.foto}`} className=" rounded-full w-1/4 h-1/4" />
            </div>
            <div className='absolute left-1/4 bg-blue-200'>
              <p className="font-bold">{pet.nombre_mas}</p>
              <p>{pet.nombre_r}</p>
              
              
            </div>
            <button onClick={(event)=>borrar_pets(pet.id, event)} className='absolute right-20'>borrar</button>
            <button onClick={listar_mascota(pet.id)}>mostrar</button>
          </div>
        ))}
      </div>
    </>
  )
}



export default Pets;
