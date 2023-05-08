import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
//import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faReply, faStoreAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const UsoPredio = () => {
       
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
        
    const baseUrl='http://localhost/apicatastro/index.php/uso/?id='+id; //'http://f0783168.xsph.ru/index.php/uso/?id='+id; 
           
    const [iduso_predio, cambiarIdusoPredio] = useState ({campo: '', valido: null});
    const [clave_predio, cambiarClavePredio] = useState ({campo: '', valido: null});
    const [uso_principal, cambiarUsoPrincipal] = useState ({campo: '', valido: null});
    const [uso_secundario, cambiarUsoSecundario] = useState ({campo: '', valido: null});
    const [descripcion, cambiarDescripcion] = useState ({campo: '', valido: null});
        
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{1,400}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,400}$/, // Letras y espacios, pueden llevar acentos.
				
	}
    
const peticionGet=async()=>{
    const response = await axios.get(baseUrl) 
    cambiarIdusoPredio({campo: response.data[0].iduso_predio});
    cambiarClavePredio({campo: response.data[0].clave_predio});
    cambiarUsoPrincipal({campo: response.data[0].uso_principal});
    cambiarUsoSecundario({campo: response.data[0].uso_secundario});
    cambiarDescripcion({campo: response.data[0].descripcion});
    
    //console.log(clave_predio.campo);
    //console.log(uso_principal.campo);
    //console.log(uso_secundario.campo);
    //console.log(descripcion.campo);
    
}

//Función PUT
 const putUsoPredio=async()=>{
        const uso = {
            //clave_predio: clave,
            uso_principal: uso_principal.campo,
            uso_secundario: uso_secundario.campo,          
            descripcion: descripcion.campo  

        } 
        
        await axios.put('http://localhost/apicatastro/index.php/uso/actualizar?id='+id, uso)
        .then(response=>{
            //cambiarClavePredio({campo: uso.clave_predio});
            cambiarUsoPrincipal({campo: uso.uso_principal});
            cambiarUsoSecundario({campo: uso.uso_secundario});
            cambiarDescripcion({campo: uso.descripcion});
            
        }).catch(error=>{
            console.error(error);
        });
    }


const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked); 
}


const onSubmit = (e) => {
    e.preventDefault();
     
         // CONEXION CRUD (PETICIONES AJAX/HTTP)
         putUsoPredio();
         peticionGet();
         //cambiarFormularioValido(true);
         alert('Datos actualizados correctamente');
}

/* const menu=()=>{
        
    //Retorno al menú principal        
    window.location.href='/menu';
}
const cerrarSesion=()=>{
    cookies.remove('id', {path: "/"});
    cookies.remove('primer_apellido', {path: "/"});
    cookies.remove('segundo_apellido', {path: "/"});
    cookies.remove('nombre', {path: "/"});
    cookies.remove('username', {path: "/"});
    window.location.href='./';
} */

useEffect(()=>{
    
    if(!cookies.get('username')){
        window.location.href="./";
    }
    else{
        peticionGet();        
    }
            
},[]);

//if (!data) return null;


    return (
        <div>
            {/* <h6 style={{ float: 'right', marginRight:'3rem', marginTop:'2rem'}}><ul><a onClick={()=>cerrarSesion()} title='Cerrar sesión'> <FontAwesomeIcon icon={faUserCircle} size={'lg'} /> {cookies.get('username')} </a></ul>  </h6>
            <h6 style={{ float: 'right', marginRight: '-4.5rem', marginTop:'5rem'}}><ul><a onClick={()=>menu()} title='Regresar a menú principal'> <FontAwesomeIcon icon={faReply} size={'lg'} /> Menú <br/> Principal </a></ul>  </h6> */}
        <main>
               <label style={{ fontWeight:'900', fontSize:'32px' }}>Uso del Predio <FontAwesomeIcon icon={faStoreAlt} /></label> 
              <br/>
              <label>Clave Catastral: {clave}</label> <td> </td>                
              <br/>

            <Formulario action="" onSubmit={onSubmit}>

            
            
            <ContenedorBotonCentrado>
            <p style={{ float:'left' }}>                
                                                         
                        <label for="uso_principal" style={{ fontWeight:'900' }}>Uso Principal:</label> &nbsp;&nbsp;&nbsp;&nbsp;
                        <td>
                        <select
                            className="custom-select"
                            id="uso_principal" 
                            name="uso_principal" 
                            value={uso_principal.campo}
                            onChange = {(e) => {
                            const usoPrincipalSeleccionado = e.target.value;
                            cambiarUsoPrincipal({campo: usoPrincipalSeleccionado});
                        }}     
                        >
                
                        <option value={uso_principal.campo} checked>{uso_principal.campo}</option>
                        <option value="" disabled>----------</option>
                              
                        <option value="No tiene">No tiene </option>
                        <option value="Acuacultura">Acuacultura </option>
                        <option value="Agrícola">Agrícola </option>
                        <option value="Agroindustrial">Agroindustrial </option>
                        <option value="Bienestar social">Bienestar social </option>
                        <option value="Casa comunal">Casa comunal </option>
                        <option value="Comercial">Comercial </option>
                        <option value="Comercial y residencial">Comercial y residencial </option>
                        <option value="Conservación">Conservación </option>
                        <option value="Cultural">Cultural </option>
                        <option value="Diplomático">Diplomático </option>
                        <option value="Educación">Educación </option>
                        <option value="Espacio público">Espacio público </option>
                        <option value="Financiero">Financiero </option>
                        <option value="Forestal">Forestal </option>
                        <option value="Hidrocarburo">Hidrocarburo </option>
                        <option value="Industrial">Industrial </option>
                        <option value="Institucional privado">Institucional privado </option>
                        <option value="Institucional público">Institucional público </option>
                        <option value="Minero">Minero </option>
                        <option value="Pecuario">Pecuario </option>
                        <option value="Preservación patrimonial">Preservación patrimonial </option>
                        <option value="Protección ecológica">Protección ecológica </option>
                        <option value="Recreación y deporte">Recreación y deporte </option>
                        <option value="Religioso">Religioso </option>
                        <option value="Residencial">Residencial </option>
                        <option value="Salúd">Salúd </option>
                        <option value="Seguridad">Seguridad </option>
                        <option value="Servicios">Servicios </option>
                        <option value="Servicios especiales">Servicios especiales </option>
                        <option value="Transporte">Transporte </option>
                        <option value="Turismo">Turismo </option>
                        
                        </select> </td>
                    
                    </p>
                    

            <p>                
            <label for="uso_secundario" style={{ fontWeight:'900' }}>Uso Secundario:</label>
                                
                        
                        <td>
                        <select
                            className="custom-select"
                            id="uso_secundario" 
                            name="uso_secundario" 
                            value={uso_secundario.campo}
                            onChange = {(e) => {
                            const usoSecundarioSeleccionado = e.target.value;
                            cambiarUsoSecundario({campo: usoSecundarioSeleccionado});
                            
                        }} 
                        >
                        
                        <option value={uso_secundario.campo} checked>{uso_secundario.campo}</option>
                        <option value="" disabled>----------</option>
                                        
                        <option value="No tiene">No tiene </option>
                        <option value="Acuacultura">Acuacultura </option>
                        <option value="Agrícola">Agrícola </option>
                        <option value="Agroindustrial">Agroindustrial </option>
                        <option value="Bienestar social">Bienestar social </option>
                        <option value="Casa comunal">Casa comunal </option>
                        <option value="Comercial">Comercial </option>
                        <option value="Comercial y residencial">Comercial y residencial </option>
                        <option value="Conservación">Conservación </option>
                        <option value="Cultural">Cultural </option>
                        <option value="Diplomático">Diplomático </option>
                        <option value="Educación">Educación </option>
                        <option value="Espacio público">Espacio público </option>
                        <option value="Financiero">Financiero </option>
                        <option value="Forestal">Forestal </option>
                        <option value="Hidrocarburo">Hidrocarburo </option>
                        <option value="Industrial">Industrial </option>
                        <option value="Institucional privado">Institucional privado </option>
                        <option value="Institucional público">Institucional público </option>
                        <option value="Minero">Minero </option>
                        <option value="Pecuario">Pecuario </option>
                        <option value="Preservación patrimonial">Preservación patrimonial </option>
                        <option value="Protección ecológica">Protección ecológica </option>
                        <option value="Recreación y deporte">Recreación y deporte </option>
                        <option value="Religioso">Religioso </option>
                        <option value="Residencial">Residencial </option>
                        <option value="Salúd">Salúd </option>
                        <option value="Seguridad">Seguridad </option>
                        <option value="Servicios">Servicios </option>
                        <option value="Servicios especiales">Servicios especiales </option>
                        <option value="Transporte">Transporte </option>
                        <option value="Turismo">Turismo </option>
                        
                        </select> </td>
                    
                    </p>  

                    <center>            
            
                    <div style={{ float:'center', width:'25rem'}}>
            
                    <ComponenteInput
                        estado={descripcion}
                        cambiarEstado={cambiarDescripcion}
                        tipo= "text"
                        label="Descripción"
                        placeholder= "Ingrese una observación"
                        name = "descripcion"
                        leyendaError = ""
                        expresionRegular = ""
                    />
                    </div>
                    </center>
                    </ContenedorBotonCentrado>
                         
                
        <br/>                
            
                <ContenedorBotonCentrado>  
                
                    <Boton type="submit">Enviar</Boton>                
                </ContenedorBotonCentrado>                
            
                
            </Formulario>
        </main>
        </div>
    )
}

export default UsoPredio;
