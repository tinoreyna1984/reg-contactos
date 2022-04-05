import { useEffect, useState } from "react";

const URL = 'https://api-contactos-django.herokuapp.com/contacto/';

function useObtenerContactos(){
    const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(URL, { method: "GET" })
      .then((response) => response.json())
      .then((datos) => {
        setItems(datos);
      })
      .catch((error) => console.log(error));
  }, []);

  return items;
}

export {useObtenerContactos}