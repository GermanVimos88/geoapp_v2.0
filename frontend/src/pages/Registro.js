import React, { Component, useState, useEffect } from 'react';
import'../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


const Registro = () => {
    const baseUrl= "http://localhost/apicatastro/index.php/usuarios/";//"http://f0783168.xsph.ru/index.php/usuarios/";
    const host = window.location.origin;
    const [idUsuario, setIdUsuario] = useState({campo:''});
    const [primerApellido, setPrimerApellido] = useState({campo:''});
    const [segundoApellido, setSegundoApellido] = useState({campo:''});
    const [nombre, setNombre] = useState({campo:''});
    const [username, setUsername] = useState({campo:''});
    const [password, setPassword] = useState({campo:''});
    const [usuario, setUsuario] = useState({
        id: '',
        primer_apellido: '',
        segundo_apellido: '',
        nombre: '',
        username: '',
        password: ''

    });
    
    const handleChange=e=>{
        const {name, value}=e.target;
        setUsuario((prevState)=>({
            ...prevState,
            [name]: value
        }))
        //console.log(usuario);
    } 
    
    const registrarUsuario=async()=>{
         const usuarioNuevo = {
            //id: idUsuario.campo,
            primer_apellido: primerApellido.campo,
            segundo_apellido: segundoApellido.campo,
            nombre: nombre.campo,
            username: username.campo,
            password: password.campo
        }
                
        await axios.post('http://localhost/apicatastro/index.php/usuarios/nuevo', usuarioNuevo)  //https://cheerful-marzipan-12e313.netlify.app/usuarios/nuevo
        .then(response=>{
            //setData(data.concat(response.data));
            //abrirCerrarModalInsertar();
            //peticionGet();
            //console.log(usuarioNuevo);
            alert('Usuario creado exitosamente');
        }).catch(error=>{
            console.error(error);
        });
    }
   
    
    
        return ( 
        
        <div className="containerPrincipal">
            
            <center>            
            <br/>   
            <label style={{color:'blue', fontWeight:'900'}}>Registro</label>
            </center>   
            <br/>            
            <div className="containerSecundario">
                <div className="form-group">
                    <label for="primer_apellido" >Primer Apellido: </label>
                    <br/>
                    <input 
                        style={{ marginBottom:'0.8rem' }}
                        type="text"
                        className="form-control"
                        id="primer_apellido"
                        name="primer_apellido"
                        onChange={(e) => {
                            const primerApellido = e.target.value;
                            setPrimerApellido({campo: primerApellido});
                            }}
                    />                    
                    
                    <label for="segundo_apellido" >Segundo apellido: </label>
                    <br/>
                    <input 
                        style={{ marginBottom:'0.8rem' }}
                        type="text"
                        className="form-control"
                        id="segundo_apellido"
                        name="segundo_apellido"
                        onChange={(e) =>{
                            const segundoApellido = e.target.value;
                            setSegundoApellido({campo: segundoApellido});
                            }}
                    />
                    
                    <label for="nombre"> Nombre: </label>
                    <br/>
                    <input 
                        style={{ marginBottom:'0.8rem' }}
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        onChange={(e) =>{
                            const nmobreUsr = e.target.value;
                            setNombre({campo: nmobreUsr});
                            }}
                    />                    
                                     
                    <label for="username"> Username: </label>
                    <br/>
                    <input 
                        style={{ marginBottom:'0.8rem' }}
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        onChange={(e) =>{
                            const usr = e.target.value;
                            setUsername({campo: usr});
                            }}
                    />
                    <label for="password"> Contraseña: </label>
                    <br/>
                    <input 
                        style={{ marginBottom:'1rem' }}
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        onChange={(e)=>{
                            const psw = e.target.value
                            setPassword({campo: md5(psw)})}
                        }
                            
                    />
                                        
                    <button className="btn btn-primary" onClick={()=> registrarUsuario()}>Registrarse</button>                    
                    <br/>
                    <p>
                        ¿Está registrado?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="./">Log In</a>
                        </span>
                    </p>
                </div>         
            </div>
        </div>         

        );
    }


export default Registro;


