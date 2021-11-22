import axios from "axios";
import { API_URL } from "../../../../_utiles/config";

export const proxyurl = "https://cors-anywhere.herokuapp.com/";
export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/auth/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot-password`;
export const ME_URL = `${API_URL}/admin/admin_users/2`;

export function login(username, password) {
  return axios.post(LOGIN_URL, { username, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
