import axios from "axios";
import { API_URL } from "../../../_utiles/config";

export const proxyurl = "https://cors-anywhere.herokuapp.com/";
export const VENDOR_URL = `${API_URL}/admin/vendors`;
export const ADD_VENDORMEAL_URL = `${API_URL}/admin/vendors_transport`;


export function getVendor() {
    return axios.get(`${VENDOR_URL}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}

export function getVendorTransports() {
    return axios.get(`${ADD_VENDORMEAL_URL}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}

export function addVendorTransport(vendorTransportData, token) {
    if(JSON.parse(vendorTransportData)["id"] == 0){
        return axios.post(`${ADD_VENDORMEAL_URL}`, vendorTransportData, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
    }
    else{
        return axios.patch(`${ADD_VENDORMEAL_URL}`, vendorTransportData, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
    }
}

export function getVendorTransportData(id, token) {
    return axios.get(`${ADD_VENDORMEAL_URL}`+'/'+id, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}

export function getVendorTransportLists() {
    return axios.get(`${ADD_VENDORMEAL_URL}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}