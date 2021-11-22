import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import * as _redux from "./redux";
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import store from "./redux/store";
import "@fortawesome/fontawesome-free/css/all.min.css";


_redux.setupAxios(axios, store);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
