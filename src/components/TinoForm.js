/* eslint-disable no-self-assign */
import React, { useState } from "react";
import { doGetOne, doPost, doPut } from "../API/Api";

export default function TinoForm() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fono, setFono] = useState("");
  const [email, setEmail] = useState("");
  const [fecha_nac, setFechaNac] = useState("");
  let flag = false;

  const controlaEnvio = async (e) => {
    e.preventDefault();
    try {
      const idContacto = document.getElementById("idContacto").value;
      const item = await doGetOne(idContacto);
      if (item.nombre) {
        flag = true;
        console.log("Actualizar")
      } else {
        flag = false;
        console.log("Crear")
      }
      if (!flag) {
        if (nombre.length > 0 && apellido.length > 0 && fono.length > 0) {
          const datos = doPost({
            nombre: nombre,
            apellido: apellido,
            fono: fono,
            email: email,
            fecha_nac: fecha_nac,
          });
          console.log(datos);
        } else {
          alert(
            "Los campos nombre, apellido y teléfono son obligatorios. Pruebe nuevamente"
          );
        }
      } else {
        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const fono = document.getElementById("fono").value;
        const email = document.getElementById("email").value;
        const fecha_nac = document.getElementById("fecha_nac").value;
        console.log(idContacto, nombre, apellido, fono, email, fecha_nac);
        if (nombre.length > 0 && apellido.length > 0 && fono.length > 0) {
          const datos = doPut(idContacto, {
            nombre: nombre,
            apellido: apellido,
            fono: fono,
            email: email,
            fecha_nac: fecha_nac,
          });
          console.log(datos);
        } else {
          alert(
            "Los campos nombre, apellido y teléfono son obligatorios. Pruebe nuevamente"
          );
        }
      }
      window.location.href = window.location.href;
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarCampos = () =>{
    document.getElementById("idContacto").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("fono").value = "";
    document.getElementById("email").value = "";
    document.getElementById("fecha_nac").value = "";
  }

  return (
    <div className="col border rounded">
      <h4>Agregar/modificar contacto</h4>
      <form onSubmit={controlaEnvio} id="formulario">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="idContacto"
            hidden
            disabled
          />
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
            Agregar/modificar
          </button>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            id="clean"
            onClick={limpiarCampos}
          >
            Limpiar campos
          </button>
        </div>
      </form>
    </div>
  );
}
