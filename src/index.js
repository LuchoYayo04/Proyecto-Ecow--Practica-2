import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

//Con esto redirige a index.html mediante su id 'root'
//Inicializamos en la pagina
ReactDOM.render(
  <React.StrictMode>
    <App/> 
  </React.StrictMode>,
  document.getElementById('root')
);
