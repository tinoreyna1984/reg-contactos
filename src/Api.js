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

async function doGetOne(id){
  try {
    const res = await fetch(`${URL}${id}`, { method: "GET" });
    const item = await res.json();
    return item;
  } catch (error) {
    console.log(error)
  }
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

function doPut(id, data){
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data, getCircularReplacer()),
  };
  console.log(data)
  const res = fetch(`${URL}${id}`, requestOptions)
    .then((response) => response.statusText)
    .catch((error) => console.log(error));
  return res;
}

async function doDelete(id){
  try {
    const res = await fetch(`${URL}${id}`, { method: "DELETE" });
    const statusText = await res.statusText;
    return statusText;
  } catch (error) {
    console.log(error)
  }
}

export {URL, useObtenerContactos, doPost, doGetOne, doPut, doDelete}