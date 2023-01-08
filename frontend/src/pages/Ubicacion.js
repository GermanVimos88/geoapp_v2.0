import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
//import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Ubicacion = () => {
    
    
    const location = useLocation();
  
    const path = location.pathname
    
    var id = ''
    var clave = ''

    for (var i=0 ; i < path.length ; i++) {
        if(path.substring(i, i+1)==':' )
        {
        for (var j=i+2; j < path.length ; j++) {
            if(path.substring(j, j+1)==':' ) {
            id= path.substring(i+1, j)
            clave=path.substring(j+1, path.length)
            }
        }
        }
    }

        
    const baseUrl='http://apicatastro/ubicacion/?id='+id;
    const [data, setData]=useState([]);
    const [id_ubicacion, cambiarIdUbicacion] = useState({campo: '', valido: null});
	const [clave_catastral, cambiarClaveCatastral] = useState({campo: '', valido: null}); 
    //const [clave_anterior, cambiarClaveAnterior] = useState({campo: '', valido: null}); 
	const [eje_principal, cambiarEjePrincipal] = useState({campo: '', valido: null}); // Input
  	const [codigo_placa, cambiarCodigoPlaca] = useState({campo: '', valido: null}); // Input
  	const [eje_secundario, cambiarEjeSecundario] = useState({campo: '', valido: null}); //Input
  	const [nombre_predio, cambiarNombrePredio] = useState({campo: '', valido: null}); // Input
  	const [sector, cambiarSector] = useState({campo: '', valido: null}); //Input   



    //const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const expresiones = {
		usuario: /^[a-z/A-Z0-9_-]{1,20}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{4,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        cedula: /^\d{10}$/, // 10 numeros.
        area: /^\d{1,10}$/ // 1 a 10 numeros.
	}

    const peticionGet=async()=>{
        const response = await axios.get(baseUrl) 

        cambiarClaveCatastral({campo: response.data[0].clave_predio});
        cambiarEjePrincipal({campo: response.data[0].eje_principal});
        cambiarCodigoPlaca({campo: response.data[0].codigo_placa});
        cambiarEjeSecundario({campo: response.data[0].eje_secundario});
        cambiarNombrePredio({campo: response.data[0].nombre_predio});
        cambiarSector({campo: response.data[0].sector}); 
        
    }

    const onChangeTerminos = (e) => {

        cambiarTerminos(e.target.checked); 
    }


    const onSubmit = (e) => {
        e.preventDefault();

        if(
            
            terminos
        ){
            
            // CONEXION CRUD (PETICIONES AJAX/HTTP)
            
        } else {
            cambiarFormularioValido(false);         
        }
    }

useEffect(()=>{
    
    if(!cookies.get('username')){
        window.location.href="./";
    }
    else{
            peticionGet();            
            //console.log(data); 
        }            
},[])
    
if (!data) return null;            


    return (        
        <main>
              
              <h1><b>📌 Ubicación</b></h1> 
              <br/>
                <label>Clave Catastral: <b>{clave_catastral.campo}</b></label> <td> </td>                
              <br/>

            <Formulario onSubmit={onSubmit}>

            <center>
            <div>                
                
                <p>
                    <td><b>Eje principal:</b></td>
                    <tr>                    
                    
                    <td>
                    <select 
                        className="custom-select"
                        id="eje_principal" 
                        name="eje_principal" 
                        value= {eje_principal}
                        onChange = {(e) => {
                            const ejePrincipalSeleccionado = e.target.value;
                            cambiarEjePrincipal(ejePrincipalSeleccionado);
                        }} 
                    >
                        
                    <option value={eje_principal.campo} checked>{eje_principal.campo}</option>
                    <option value="" disabled>----------</option>
                                                       
                    <option value="Vía Interoceánica">Vía Interoceánica </option>
                    <option value="Huila">Huila </option>
                            
                </select> </td>
                </tr>
                </p>
                
                <p>
                    <td><b>Eje Secundario (calle):</b></td>
                    <tr>    
                    
                    <td>
                    <select 
                        className="custom-select"
                        id="eje_secundario" 
                        name="eje_secundario"
                        value={eje_secundario}
                        onChange = {(e) => {
                            const ejeSecundarioSeleccionado = e.target.value;
                            cambiarEjeSecundario(ejeSecundarioSeleccionado);
                        }}                      
                    >                       

                    <option value={eje_secundario.campo} checked>{eje_secundario.campo}</option>
                    <option value="" disabled>----------</option>    
                                    
                    <option value="Jesús del Gran Poder">Jesús del Gran Poder </option>
                    <option value="Huila">Huila </option>
                    <option value="Oriente">Oriente </option>
                            
                    </select> </td>
                    </tr>
                </p>  
                <br/>       
       
        </div>
            
    </center>


    <center>          
        <br/>
        <div>  
              
            <p>
                
                <ComponenteInput
                    estado={codigo_placa}
                    cambiarEstado={cambiarCodigoPlaca}
                    tipo= "text"
                    label="Placa predial"
                    placeholder= "Ingrese el código de placa predial"
                    name = "placa_predial"
                    leyendaError = "Letras y números. Puede llevar acentos"
                    expresionRegular = {expresiones.usuario}                
                /> 
                <ComponenteInput
                    estado={nombre_predio}
                    cambiarEstado={cambiarNombrePredio}
                    tipo= "text"
                    label="Nombre predio"
                    placeholder= "Ingrese el nombre del predio"
                    name = "nombre_predio"
                    leyendaError = "Letras y espacios. Puede llevar acentos"
                    expresionRegular = {expresiones.usuario}                
                /> 
                
            </p>
            
        </div>
      </center>
                
                <ContenedorBotonCentrado>
                
                <p>
                <tr>    
                    
                    <td><b>Nombre del Sector:</b></td> &nbsp;&nbsp;
                    <td>
                    <select 
                        className="custom-select"
                        id="sector" 
                        name="sector" 
                        value={sector}
                        onChange = {(e) => {
                            const sectorSeleccionado = e.target.value;
                            cambiarSector(sectorSeleccionado);
                        }}
                    >
                    <option value={sector.campo} checked>{sector.campo}</option>
                    <option value="" disabled>----------</option>  
                                        
                    <option value="Cuyuja">Cuyuja </option>
                    <option value="La Bahía">La Bahía </option>
                                
                    </select> </td>
                    </tr>
                    <br/>
                    <br/>
                </p>    
                
                </ContenedorBotonCentrado>  


                
                {formularioValido === false && <MensajeError>
                    <p>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <b>Error: </b> Por favor rellena correctamente el formulario. 
                    </p>                    
                </MensajeError>}
                <ContenedorBotonCentrado>
                    <Boton type="submit">Enviar</Boton>
                    {formularioValido === true && <MensajeExito> Formulario enviado exitosamente! </MensajeExito>}
                </ContenedorBotonCentrado>                
                
            </Formulario>

        </main>
    )

}



export default Ubicacion;
