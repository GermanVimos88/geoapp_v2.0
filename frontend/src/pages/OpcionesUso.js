import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
//import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHouseDamage } from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const OpcionesUso = () => {

    
    const location = useLocation();
  
    const path = location.pathname
    
    var id = ''
    var clave = ''
    var idPropietario = ''

    for (var i=0 ; i < path.length ; i++) {
        if(path.substring(i, i+1)===':' )
        {
          for (var j=i+2; j < path.length ; j++) {
            if(path.substring(j, j+1)===':' ) {
              for (var k=j+2; k < path.length; k++){
                if(path.substring(k, k+1)===':'){
                    id= path.substring(i+1, j)
                    clave=path.substring(j+1, k)              
                    idPropietario=path.substring(k+1, path.length)                
                }
              }          
            }
          }
        }
      }

       
    const baseUrl='http://localhost/apicatastro/index.php/opcion/?id='+id; //'http://f0783168.xsph.ru/index.php/opcion/?id='+id;
    const [data, setData]=useState();    
        
    const [idopciones, cambiarIdOpciones] = useState ({campo: '', valido: null});
    const [clave_predio, cambiarClavePredio] = useState ({campo: '', valido: null});

    const [iduso_predio, cambiarIdUsoPredio] = useState ({campo: '', valido: null});
    const [descripcion, cambiarDescripcion] = useState ({campo: '', valido: null}); 
    
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{1,400}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,400}$/, // Letras y espacios, pueden llevar acentos.
				
	}

const peticionGet=async()=>{
    const response = await axios.get(baseUrl) 
    cambiarClavePredio({campo: response.data[0].clave_predio});
    cambiarDescripcion({campo: response.data[0].eje_principal});    
    
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
        //peticionGet();
    }
            
},[]);

//if (!data) return null;


    return (
        <main>
               <h1><b>Opciones de Uso: <FontAwesomeIcon icon={faHouseDamage}/></b></h1> 
              <br/>
              <label>Clave Catastral: <b>{clave_predio.campo}</b></label> <td> </td>                
              <br/>

            <Formulario action="" onSubmit={onSubmit}>
            
        <center>          
            <br/>
            <p>
                
                <ComponenteInput
                    estado={descripcion}
                    cambiarEstado={cambiarDescripcion}
                    tipo= "text"
                    label="Descripción"
                    placeholder= "Ingrese una observación o descripción "
                    name = "descripcion"
                    leyendaError = ""
                    expresionRegular = ""
                />              
                
            </p>           
            <br/>
            <br/>
            <br/>  
            
        </center>       

                <ContenedorTerminos>
                    <Label>
                        <input 
                            type="checkbox" 
                            name="terminos" 
                            id="terminos" 
                            checked={terminos}
                            onChange={onChangeTerminos}
                            
                            />
                        Acepto los Términos y Condiciones
                    </Label>                    
                </ContenedorTerminos>
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


export default OpcionesUso;
