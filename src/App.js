/* eslint-disable no-self-assign */
//import logo from "./logo.svg";
import { useState } from "react";
import { doPost, useObtenerContactos } from "./Api";
import "./App.css";

function App() {
  let contactos = useObtenerContactos();
  
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fono, setFono] = useState('');
  const [email, setEmail] = useState('');
  const [fecha_nac, setFechaNac] = useState('');
  //const [flag, setflag] = useState(false);


  // formulario
  const controlaEnvio = (e) => {
    e.preventDefault();
    const datos = doPost({
      nombre: nombre,
      apellido: apellido,
      fono: fono,
      email: email,
      fecha_nac: fecha_nac
    });
    console.log(datos)
    window.location.href = window.location.href;
    //setflag(true);
    e.target.reset();
  };

  /* const eventoClick = (e) => {
    window.location.href = window.location.href;
  } */

  return (
    <div
      className="container align-content-center align-items-center"
      style={{ paddingTop: "60px" }}
    >
      <div className="row">
        <div className="col">
          <form onSubmit={controlaEnvio}>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
                onChange={(e) => {setNombre(e.target.value)}}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="apellido"
                required
                onChange={(e) => {setApellido(e.target.value)}}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fono" className="form-label">
                Fono
              </label>
              <input
                type="text"
                className="form-control"
                id="fono"
                required
                onChange={(e) => {setFono(e.target.value)}}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                onChange={(e) => {setEmail(e.target.value)}}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fechaNac" className="form-label">
                Fecha de nacimiento (dd-mm-aaaa)
              </label>
              <input
                type="text"
                className="form-control"
                id="fecha_nac"
                onChange={(e) => {setFechaNac(e.target.value)}}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </div>
          </form>
        </div>
        <div className="col">
        {/* <button type="button" className="btn btn-primary" onClick={eventoClick}>
            Refrescar contactos
        </button> */}
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Fono</th>
                <th scope="col">Email</th>
                <th scope="col">FechaNac</th>
              </tr>
            </thead>
            <tbody>
              {contactos.map((contacto) => (
                <tr key={contacto.id}>
                  <th scope="row">{contacto.id}</th>
                  <td>{contacto.nombre}</td>
                  <td>{contacto.apellido}</td>
                  <td>{contacto.fono}</td>
                  <td>{contacto.email}</td>
                  <td>{contacto.fecha_nac}</td>
                  <td>
                    <button type="submit" className="btn btn-secondary">
                      Modificar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
