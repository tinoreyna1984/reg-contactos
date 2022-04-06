/* eslint-disable no-self-assign */
//import logo from "./logo.svg";
import { useState } from "react";
import { doPost, doGetOne, useObtenerContactos, doPut, doDelete } from "./Api";
import "./App.css";

function App() {
  let contactos = useObtenerContactos();
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fono, setFono] = useState("");
  const [email, setEmail] = useState("");
  const [fecha_nac, setFechaNac] = useState("");
  const [flag, setFlag] = useState(false);
  const btnAgregar = document.getElementById("add");
  const btnModificar = document.getElementById("update");

  // formulario
  const controlaEnvio = (e) => {
    e.preventDefault();
    console.log("flag: ", flag);
    if (!flag) {
      if (nombre.length > 0 && apellido.length > 0 && fono.length > 0) {
        const datos = doPost({
          nombre: nombre,
          apellido: apellido,
          fono: fono,
          email: email,
          fecha_nac: fecha_nac,
        });
        //console.log('long nombre: ', nombre.length)
        console.log(datos);
      } else {
        alert(
          "Los campos nombre, apellido y teléfono son obligatorios. Pruebe nuevamente"
        );
      }
    } else {
      //console.log("flag en true");
      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const fono = document.getElementById("fono").value;
      const email = document.getElementById("email").value;
      const fecha_nac = document.getElementById("fecha_nac").value;
      //console.log(nombre, apellido, fono, email, fecha_nac);
      if (nombre.length > 0 && apellido.length > 0 && fono.length > 0) {
        const datos = doPut(id, {
          nombre: nombre,
          apellido: apellido,
          fono: fono,
          email: email,
          fecha_nac: fecha_nac,
        });
        //console.log('long nombre: ', nombre.length)
        console.log(datos);
      } else {
        alert(
          "Los campos nombre, apellido y teléfono son obligatorios. Pruebe nuevamente"
        );
      }
    }
    //window.location.href = window.location.href;
    e.target.reset();
  };

  // tabla
  const modificar = async (id) => {
    console.log(id);
    try {
      const item = await doGetOne(id);
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
      btnAgregar.disabled = true;
      btnModificar.disabled = false;
      setId(id);
      setNombre(nombre);
      setApellido(apellido);
      setFono(fono);
      setEmail(id);
      setFechaNac(fecha_nac);
      setFlag(true);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id) => {
    const estado = await doDelete(id);
    console.log(estado);
    window.location.href = window.location.href;
  };

  return (
    <div
      className="container align-content-center align-items-center"
      style={{ paddingTop: "60px" }}
    >
      <div className="row">
        <div className="col border rounded">
          <h4>Agregar/modificar contacto</h4>
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
              <button
                type="submit"
                className="btn btn-primary"
                id="update"
                disabled
              >
                Enviar modificación
              </button>
            </div>
          </form>
        </div>
        <div className="col border rounded">
          <h4>Lista de contactos</h4>
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
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => modificar(contacto.id)}
                      id="setreg"
                    >
                      Modificar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => eliminar(contacto.id)}
                      id="delreg"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
