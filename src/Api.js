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

function doGetOne(id){
  const res = fetch(`${URL}${id}`, {method: "GET"})
    .then((response) => response.json())
    .catch((error) => console.log(error));
  return res;
}

function doPut(id, data){
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  };
  console.log(data)
  const res = fetch(`${URL}${id}`, requestOptions)
    .then((response) => response.statusText)
    .catch((error) => console.log(error));
  return res;
}

export {URL, useObtenerContactos, doPost, doGetOne, doPut}