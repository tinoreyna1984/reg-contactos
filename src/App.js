/* eslint-disable no-self-assign */
//import logo from "./logo.svg";
import "./App.css";
import { doGetOne } from "./API/Api";
import TinoForm from "./components/TinoForm";
import TinoTable from "./components/TinoTable";
//import { useState } from "react";

function App() {

  // contacto que debo obtener y enviar
  let item = null

  // callback que necesito para obtener uno de los contactos
  const obtieneUno = async (id) => {
    //console.log("id: ", id);
    item = await doGetOne(id);
    //console.log("contacto que obtengo de tabla: ", item);
    document.getElementById('idContacto').value = item.id;
    document.getElementById('nombre').value = item.nombre;
    document.getElementById('apellido').value = item.apellido;
    document.getElementById('fono').value = item.fono;
    document.getElementById('email').value = item.email;
    document.getElementById('fecha_nac').value = item.fecha_nac;
  };
  
  return (
    <div
      className="container align-content-center align-items-center"
      style={{ paddingTop: "60px" }}
    >
      <div className="row">
        {/* Formulario */}
        < TinoForm />
        {/* Tabla */}
        < TinoTable modificar={(e) => obtieneUno(e) } />
      </div>
      <div className="row">
        <a
          href="https://api-contactos-django.herokuapp.com/contacto/"
          target="_blank"
          rel="noreferrer"
        >
          Aquí está el API REST Django
        </a>
      </div>
    </div>
  );
}

export default App;
