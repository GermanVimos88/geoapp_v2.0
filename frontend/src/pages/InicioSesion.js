import React, { Component, useState, useEffect } from 'react';
import'../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';
import Registro from './Registro';
const cookies = new Cookies();

const baseUrl= 'http://localhost/apicatastro/index.php/usuarios/' //"https://cheerful-marzipan-12e313.netlify.app/api/";//"http://f0783168.xsph.ru/index.php/usuarios/";
const host = window.location.origin;
var currentForm = 'login';


const InicioSesion =() => {
    
    const [usuario, setUsuario]=useState({
        id: '',
        primer_apellido: '',
        segundo_apellido: '',
        nombre: '',
        username: '',
        password: ''
    })
    

    const handleChange=e=>{
        const {name, value}=e.target;
        setUsuario((prevState)=>({
            ...prevState,
            [name]: value
        }))
        //console.log(usuario);
    } 
    
    
    const registro=()=>{
        window.location.href='./registro';        
    }  
    
    const iniciarSesion=async()=>{
        await axios.get(baseUrl, {params:{username: usuario.username, password: md5(usuario.password)}})
        .then(response=>{
            console.log(response.data);
            return response.data;            
        })
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id', respuesta.id, {path: "/"});
                cookies.set('primer_apellido', respuesta.primer_apellido, {path: "/"});
                cookies.set('segundo_apellido', respuesta.segundo_apellido, {path: "/"});
                cookies.set('nombre', respuesta.nombre, {path: "/"});
                cookies.set('username', respuesta.username, {path: "/"});
                alert('Bienvenido');
                window.location.href='./menu';
            }else{
                alert('El usuario o la contraseña no son correctos');
            }
            

        }) 
        .catch(error=>{
            console.log(error);
        })

    }

    
    useEffect(()=>{
        
        if(cookies.get('username')){
            window.location.href="./menu";
        }

    },[])

        return (            
        <div className="containerPrincipal">
            <div>
            <label style={{color:'blue'}}><b>Sistema de catastro y cartografía</b></label>
                <br/>
                <br/>
            </div> 
            
            <div className="containerSecundario">
                <div className="form-group">
                    <label> Usuario: </label>    
                    <br/>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        onChange={handleChange}
                    />
                    <br />
                    <label> Contraseña: </label>
                    <br/>
                    <input 
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handleChange}
                    />
                    <br/>
                    <button className="btn btn-primary" onClick={()=> iniciarSesion()}>Iniciar sesión</button>                    
                    <br/>
                    <button className="btn btn-primary" onClick={()=> registro()}>Registrarse</button>                    
                    
                </div>         
            </div>
        
        </div>          

        );
    
}

export default InicioSesion;