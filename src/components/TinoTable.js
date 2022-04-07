/* eslint-disable no-self-assign */
import React from "react";
import { useObtenerContactos, doDelete } from "../API/Api";

export default function TinoTable({modificar}) {
  
  let contactos = useObtenerContactos();

  const eliminar = async (id) => {
    const estado = await doDelete(id);
    console.log(estado);
    window.location.href = window.location.href;
  };

  return (
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
                  onClick={
                    () => modificar(contacto.id)
                  }
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
  );
}
