import { Link } from "react-router-dom";


function Login() {
  const backgroundImageStyle = {
    backgroundImage: "url('./src/img/bg-login.svg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="w-full h-screen rounded-xl relative left-0  sm:w-2/4 sm:left-52 sm:ml-14 sm:h-screen" style={backgroundImageStyle}>

      <div className="p-5 absolute top-40 w-full ">
        <form action="" className="p-5 relative top-48 w-full">
        <h1>Iniciar Sesion</h1>
        <br />
          <input type="email"name="" placeholder="Ingresa Tu Usuario" className="w-full h-full rounded-full bg-custom-gray opacity-50  p-4 placeholder:text-slate-400 focus:outline-none "/>
          <br />
          <br />
          <input
            type="password"
            name=""
            placeholder="Ingrese La Clave"
            className="w-full h-full rounded-full opacity-50 placeholder:text-slate-400 focus:outline-none p-4 bg-custom-gray "/>
          <br />
          <button className="bg-sky-800   p-4 w-full m-2 rounded-full">Ingresar</button>
          <Link to='/mascotas'>mascotas</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;