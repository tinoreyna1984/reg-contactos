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

function doPost(data) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  };
  console.log(data)
  const res = fetch(URL, requestOptions)
    .then((response) => response.statusText)
    .catch((error) => console.log(error));
  return res;
}

export {useObtenerContactos, doPost}