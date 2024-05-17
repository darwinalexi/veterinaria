import { Route, BrowserRouter as  Router, Routes, } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Pets from './pages/Pets'

function App() {

  return (
    <>
    <Router>
      <Routes>
      <Route  path='/' Component={Login} />
      <Route path='/mascotas' Component={Pets}/>
      </Routes>
    </Router>
   </>
  )
}

export default App
