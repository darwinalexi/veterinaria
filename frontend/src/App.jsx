import { Route, BrowserRouter as  Router, Routes, } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Pets from './pages/Pets'
import Create_Pets from './pages/Createp'
import Sow_pet from './pages/Sow_pet'

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route  path='/' Component={Login} />
      <Route path='/mascotas' Component={Pets}/>
      <Route path='/crear_mascota' Component={Create_Pets}/>
      <Route path='/mostrar_mascota' Component={Sow_pet}/>
      </Routes>
    </Router>
   </>
  )
}

export default App
