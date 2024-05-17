import React, { useEffect, useState } from 'react'
import axios from "axios";


const Pets = () => {
const [pets, setpets]=useState([])
    const listar_pets=async()=>{
        try {
            const listar= await axios.get("http://localhost:4001/listar_pets")
            console.log(listar.data)
            setpets(listar.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        listar_pets();
    },[])

    return (
    <>
    <div className='bg-red-700  w-screen absolute left-0'>
      <h1>Mascotas</h1>
     
        {pets.map((pet) => (
            <div key={pet.id}>
                <div>
                    <img src={`http://localhost:4001/img/${pet.foto}`} alt="" />
                    <p>{pet.raza}</p>
                </div>
            </div>
        ))}
      </div>
    </>
  )
}

export default Pets;
