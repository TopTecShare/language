import axios from "axios";
import { API_URL } from "../../../_utiles/config";

export const proxyurl = "https://cors-anywhere.herokuapp.com/";
export const VENDOR_URL = `${API_URL}/admin/vendors`;
export const ADD_VENDORMEAL_URL = `${API_URL}/admin/vendors_meals`;


export function getVendor() {
    return axios.get(`${VENDOR_URL}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}

export function getVendorMeals() {
    return axios.get(`${ADD_VENDORMEAL_URL}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}

export function addVendorMeal(vendorMealData, token) {
    if(JSON.parse(vendorMealData)["id"] == 0){
        return axios.post(`${ADD_VENDORMEAL_URL}`, vendorMealData, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
    }
    else{
        return axios.patch(`${ADD_VENDORMEAL_URL}`, vendorMealData, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
    }
}

export function getVendorMealData(id, token) {
    return axios.get(`${ADD_VENDORMEAL_URL}`+'/'+id, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}

export function getVendorMealLists() {
    return axios.get(`${ADD_VENDORMEAL_URL}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}