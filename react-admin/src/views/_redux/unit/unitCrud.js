import axios from "axios";
import { API_URL } from "../../../_utiles/config";

export const proxyurl = "https://cors-anywhere.herokuapp.com/";
export const UNI_URL = `${API_URL}/estate`;

export function addUnit(product) {
  return axios.post(`${UNI_URL}/`, product, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
    },
  });
}

export function getUnitLists() {
  return axios.get(`${UNI_URL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
    },
  });
}

export function updateUnit(data) {
  return axios.post(`${UNI_URL}/update/${data.id}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
    },
  });
}

export function deleteUnit(id) {
  return axios.delete(`${UNI_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
    },
  });
}

export function getUnitListsByProjectCode(title) {
  return axios.post(
    `${UNI_URL}/getbycode`,
    { title: title },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc`,
      },
    }
  );
}
