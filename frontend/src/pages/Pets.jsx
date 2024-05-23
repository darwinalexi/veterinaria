import { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [modal, setModal] = useState(false); // Corregido a booleano
  const [selectPet, setSelectedPet] = useState(null); // Renombrado para claridad

  const openModal = (pet) => {
    setSelectedPet(pet); // Usar setSelectedPet para actualizar selectPet
    setModal(true); // Abrir el modal
  };

  const closeModal = () => {
    setModal(false); // Cerrar el modal
  };

  const listarPets = async () => {
    try {
      const response = await axios.get("http://localhost:4001/listar_pets");
      console.log(response.data);
      setPets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listarMascota = async () => {
    try {
      const response = await axios.get(`http://localhost:4001/buscar_mascota/${id}`);
      console.log(response);
      setPets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listarPets(); // Corregido para usar la función renombrada
  }, []);

  const borrarPets = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4001/eliminar_pets/${id}`);
      if (response.status === 200) {
        console.log("Se eliminó");
      } else {
        console.log("No se eliminó");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-red-700 w-screen absolute left-0">
        <h1>Administrar Mascotas</h1>
        <br />
        <Link to={"/crear_mascota"} className="bg-sky-400 pl-12 pr-12 p-2 mb-12">
          Crear Mascota
        </Link>
        <Link to={"/mostrar_mascota"} className="bg-sky-400 pl-12 pr-12 p-2 mb-12">
          Mostrar
        </Link>
        {pets.map((pet) => (
          <div key={pet.id} className="flex items-center mb-4">
            <div className="bg-red-500 rounded-full w-full">
              <img src={`http://localhost:4001/img/${pet.foto}`} className="rounded-full w-1/4 h-1/4" />
            </div>
            <div className="absolute left-1/4 bg-blue-200">
              <p className="font-bold">{pet.nombre_mas}</p>
              <p>{pet.nombre_r}</p>
            </div>
            <button onClick={() => borrarPets(pet.id)} className="absolute right-20">
              Borrar
            </button>
            <button onClick={() => openModal(pet)}>Mostrar</button>
          </div>
        ))}
        {modal && (
          <div className='bg-blue-400 h-full w-full'>
            <div className='bg-sky-900 '>
              <h1>Mi Mascota</h1>
              <p>ID: {selectPet.id}</p>
              <img src={`http://localhost:4001/img/${selectPet.foto}`} className=" rounded-full m-13" />
              <p>nombre : {selectPet.nombre_mas}</p>
              <p>{selectPet.categoria_id}</p>
            </div>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Pets;
