import axios from "axios";
import { API_URL } from "../../../_utiles/config";

export const proxyurl = "https://cors-anywhere.herokuapp.com/";
export const SALESAGENT_URL = `${API_URL}/admin/sales_agent`;


export function getSalesAgents() {
    return axios.get(`${SALESAGENT_URL}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}
export function addSalesAgent(salesAgent, token) {
    if(JSON.parse(salesAgent)["id"] > 0) {
        return axios.patch(`${SALESAGENT_URL}`, salesAgent, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
    }else {
        return axios.post(`${SALESAGENT_URL}`, salesAgent, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
    }
}
export function getSalesAgentData(id, token) {
    return axios.get(`${SALESAGENT_URL}`+'/'+id, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}

export function getSalesAgentLists() {
    return axios.get(`${SALESAGENT_URL}`, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOjEsImlhdCI6MTYyMTg2NDY4OX0.CSQnjulYvsKewlUINhB__jrrsKAicXbyviVmgZ0zOYc` } });
}