import { API_URL } from "_utiles/config";
const url = require('../config');
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("firstname", "William");
urlencoded.append("lastname", "Peter");
urlencoded.append("email", "peter@gmail.com");
urlencoded.append("role", "admin");
urlencoded.append("phonenumber", "234234235234");
urlencoded.append("password", "1234");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: urlencoded,
  redirect: 'follow'
};

fetch(API_URL + "/auth/add-user", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));