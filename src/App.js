/* eslint-disable no-self-assign */
//import logo from "./logo.svg";
import { useState } from "react";
import { URL, doPost, useObtenerContactos } from "./Api";
import "./App.css";

function App() {
  let contactos = useObtenerContactos();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fono, setFono] = useState("");
  const [email, setEmail] = useState("");
  const [fecha_nac, setFechaNac] = useState("");
  //const [flag, setflag] = useState(false);

  // formulario
  const controlaEnvio = (e) => {
    e.preventDefault();
    const datos = doPost({
      nombre: nombre,
      apellido: apellido,
      fono: fono,
      email: email,
      fecha_nac: fecha_nac,
    });
    console.log(datos);
    window.location.href = window.location.href;
    e.target.reset();
  };

  // tabla
  const modificar = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`${URL}${id}`, { method: "GET" });
      const item = await res.json();
      console.log(item);
      const nombre = document.getElementById("nombre");
      const apellido = document.getElementById("apellido");
      const fono = document.getElementById("fono");
      const email = document.getElementById("email");
      const fecha_nac = document.getElementById("fecha_nac");
      nombre.value = item.nombre;
      apellido.value = item.apellido;
      fono.value = item.fono;
      email.value = item.email;
      fecha_nac.value = item.fecha_nac;
    } catch (error) {
      console.log(error);
    }
    console.log(nombre);
  };

  return (
    <div
      className="container align-content-center align-items-center"
      style={{ paddingTop: "60px" }}
    >
      <div className="row">
        <div className="col border rounded">
          <h1>Agregar contacto</h1>
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
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
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
                onChange={(e) => {
                  setApellido(e.target.value);
                }}
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
                onChange={(e) => {
                  setFono(e.target.value);
                }}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setFechaNac(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary" id="add">
                Agregar
              </button>
              <br />
              <button type="submit" className="btn btn-primary" id="update">
                Enviar modificación
              </button>
            </div>
          </form>
        </div>
        <div className="col border rounded">
          <h1>Lista de contactos</h1>
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
            <tbody id="contactos">
              {contactos.map((contacto) => (
                <tr key={contacto.id}>
                  <th scope="row">{contacto.id}</th>
                  <td>{contacto.nombre}</td>
                  <td>{contacto.apellido}</td>
                  <td>{contacto.fono}</td>
                  <td>{contacto.email}</td>
                  <td>{contacto.fecha_nac}</td>
                  <td>
                    <button
                      key={contacto.id}
                      type="submit"
                      className="btn btn-secondary"
                      onClick={() => modificar(contacto.id)}
                      id="setreg"
                    >
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
