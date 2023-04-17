import React, { Component, useState, useEffect } from 'react';
import'../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import Registro from './Registro';
import InicioSesion from './InicioSesion';
const cookies = new Cookies();

//const baseUrl= "https://cheerful-marzipan-12e313.netlify.app/api/";//"http://f0783168.xsph.ru/index.php/usuarios/";
const host = window.location.origin;

const Login = () =>{

return (
    <main className="App">
      <InicioSesion />
    </main>
  );
}
export default Login;