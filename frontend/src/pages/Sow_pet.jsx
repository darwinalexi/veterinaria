
import { useEffect } from "react"
import axios from "axios"


const Sow_pet=()=>{

   

    const listar_pets = async () => {
        try {
          const listar = await axios.get("http://localhost:4001/listar_pets")
          console.log(listar.data)
       
        } catch (error) {
          console.log(error)
        }
      }
    
    useEffect(()=>{
listar_pets();
    },[])
return(
    <>
<h1>mostrar mascota</h1>
    </>
)
}

export default Sow_pet;