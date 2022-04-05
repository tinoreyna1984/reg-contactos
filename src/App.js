//import logo from "./logo.svg";
import { useObtenerContactos } from "./Api";
import "./App.css";

function App() {
  const contactos = useObtenerContactos();
  //console.log(contactos);

  return (
    <div
      className="container align-content-center align-items-center"
      style={{ paddingTop: "60px" }}
    >
      <div className="row">
        <div className="col">
          <form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="fono" className="form-label">
                Fono
              </label>
              <input
                type="number"
                className="form-control"
                id="fono"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="correo" />
            </div>
            <div className="mb-3">
              <label htmlFor="fechaNac" className="form-label">
                Fecha de nacimiento (dd-mm-aaaa)
              </label>
              <input type="text" className="form-control" id="fechaNac" />
            </div>
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </div>
          </form>
        </div>
        <div className="col">
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
