import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
//import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderStyle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const CaracteristicasLote = () => {

   
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

    //console.log(clave);
    //console.log(id);
    
    const baseUrl= 'http://localhost/apicatastro/index.php/caracteristicas/?id='+id; //'https://cheerful-marzipan-12e313.netlify.app/caracteristicas/?id='+id; //'http://f0783168.xsph.ru/index.php/caracteristicas/?id='+id 
    

    const [idcaracteristicas_lote, cambiarIdCaracteristicas] = useState ({campo: '', valido: null});
    const [clave_predio, cambiarClavePredio] = useState ({campo: '', valido: null});
    const [idubicacion, cambiaridUbicacion] = useState ({campo: '', valido: null});
    const [ocupacion, cambiarOcupacion] = useState ({campo: '', valido: null});
    const [localizacion_manzana, cambiarLocalizacionManzana] = useState ({campo: '', valido: null});
    const [forma, cambiarForma] = useState ({campo: '', valido: null});
    const [topografia, cambiarTopografia] = useState ({campo: '', valido: null});
    const [cobertura_nativa_predominante, cambiarCoberturaNativaPredominante] = useState ({campo: '', valido: null});
    const [ecosistema_relevante, cambiarEcosistemaRelevante] = useState ({campo: '', valido: null});
    const [afectaciones, cambiarAfectaciones] = useState ({campo: '', valido: null});
    const [riesgos, cambiarRiesgos] = useState ({campo: '', valido: null});
    const [calidad_suelo, cambiarCalidadSuelo] = useState ({campo: '', valido: null});  
    
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{1,40}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{4,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        cedula: /^\d{10}$/, // 10 numeros.
        area: /^\d{1,10}$/ // 1 a 10 numeros.
	}


const peticionGet=async()=>{
        const response = await axios.get(baseUrl) 

        cambiarIdCaracteristicas({campo: response.data[0].idcaracteristicas});
        cambiarClavePredio({campo: response.data[0].clave_predio});
        cambiaridUbicacion({campo: response.data[0].idubicacion});
        cambiarOcupacion({campo: response.data[0].ocupacion});
        cambiarLocalizacionManzana({campo: response.data[0].manzana_locacion});
        cambiarForma({campo: response.data[0].forma});
        cambiarTopografia({campo: response.data[0].topografia});
        cambiarCoberturaNativaPredominante({campo: response.data[0].cobertura_nativa});
        cambiarEcosistemaRelevante({campo: response.data[0].ecosistema});
        cambiarAfectaciones({campo: response.data[0].afectaciones});
        cambiarRiesgos({campo: response.data[0].riesgos});
        cambiarCalidadSuelo({campo: response.data[0].calidad_suelo});    
        
    }

   //Función PUT
   const putCaracteristicasLote=async()=>{
    const c_lote = {        
        clave_predio: clave_predio.campo,
        idubicacion: idubicacion.campo,
        ocupacion: ocupacion.campo,
        manzana_locacion: localizacion_manzana.campo,
        forma: forma.campo,
        topografia: topografia.campo,
        cobertura_nativa: cobertura_nativa_predominante.campo,
        ecosistema: ecosistema_relevante.campo,
        afectaciones: afectaciones.campo,
        riesgos: riesgos.campo,
        calidad_suelo: calidad_suelo.campo
    } 

    await axios.put('http://localhost/apicatastro/index.php/caracteristicas/actualizar/?id='+id, c_lote)
    .then(response=>{
        //cambiarIdCaracteristicas({campo: c_lote.idcaracteristicas});
        cambiarClavePredio({campo: c_lote.clave_predio});
        cambiaridUbicacion({campo: c_lote.idubicacion});
        cambiarOcupacion({campo: c_lote.ocupacion});
        cambiarLocalizacionManzana({campo: c_lote.manzana_locacion});
        cambiarForma({campo: c_lote.forma});
        cambiarTopografia({campo: c_lote.topografia});
        cambiarCoberturaNativaPredominante({campo: c_lote.cobertura_nativa});
        cambiarEcosistemaRelevante({campo: c_lote.ecosistema});
        cambiarAfectaciones({campo: c_lote.afectaciones});
        cambiarRiesgos({campo: c_lote.riesgos});
        cambiarCalidadSuelo({campo: c_lote.calidad_suelo}); 
        
    }).catch(error=>{
        console.error(error);
    });
}

const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked); 
}


const onSubmit = (e) => {
    e.preventDefault();

    if(
        //predio.valido === 'true' &&        
        terminos
     ){         
        // CONEXION CRUD (PETICIONES AJAX/HTTP)
        putCaracteristicasLote();
        peticionGet();
        cambiarFormularioValido(true);
        //alert('Datos actualizados correctamente');
         
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
    }
            
},[]);

//if (!data) return null;

    return (
        <main>
               <h1><b>Características del Lote <FontAwesomeIcon icon={faBorderStyle} /></b></h1> 
              <br/> 
              <label>Clave Catastral: <b>{clave_predio.campo}</b></label> <td> </td>
              

            <Formulario action="" onSubmit={onSubmit}>

            <center>
            <div id="contenedor">
                
                <br/>
                <p>
                    <tr>
                    <td>Ocupación:</td>
                    <td>
                    <select 
                        className='custom-select'
                        id="ocupacion" 
                        name="ocupacion"
                        value= {ocupacion}
                        onChange = {(e) => {
                            const ocupacionSeleccionado = e.target.value;
                            cambiarOcupacion({campo: ocupacionSeleccionado});
                        }}  
                    
                    >
                    <option value={ocupacion.campo} checked>{ocupacion.campo}</option>
                    <option value="" disabled>----------</option>    
                    
                    <option value="Edificado">Edificado </option>
                    <option value="No Edificado">No Edificado </option>
                    <option value="En construcción">En construcción </option>
                            
                    </select> </td>
                    </tr>
                </p>
                
                <p>
                <tr>    
                    <td>Localización en la manzana:</td>
                        <td>
                        <select 
                            className='custom-select'
                            id="localizacion_manzana" 
                            name="localizacion_manzana"
                            value= {localizacion_manzana}
                            onChange = {(e) => {
                                const localizacionSeleccionado = e.target.value;
                                cambiarLocalizacionManzana({campo: localizacionSeleccionado});
                        }}  
                    
                    >
                        <option value={localizacion_manzana.campo} checked>{localizacion_manzana.campo}</option>
                        <option value="" disabled>----------</option>     

                        <option value="No tiene">No tiene </option>
                        <option value="Esquinero">Esquinero </option>
                        <option value="En cabecera">En cabecera </option>
                        <option value="Intermedio">Intermedio </option>
                        <option value="En L">En L </option>
                        <option value="En T">En T </option>
                        <option value="En cruz">En cruz </option>
                        <option value="Manzanero">Manzanero </option>
                        <option value="Triángulo">Triángulo </option>
                        <option value="En callejón">En callejón </option>
                        <option value="Interior">Interior </option>
                                
                    </select> </td>
                    </tr>
                </p>  
                
                <p>
                    <tr>   
                    <td>Forma:</td>
                        <td>
                        <select 
                            className='custom-select'
                            id="forma" 
                            name="forma" 
                            value= {forma}
                            onChange = {(e) => {
                                const formaSeleccionado = e.target.value;
                                cambiarForma({campo: formaSeleccionado});
                        }}  
                    
                    >
                        <option value={forma.campo} checked>{forma.campo}</option>
                        <option value="" disabled>----------</option> 
                        
                        <option value="Regular">Regular </option>
                        <option value="Irregular">Irregular </option>
                        <option value="Muy irregular">Muy irregular </option>
                                
                        </select> </td>
                    </tr>
                </p>       
        </div>            
    </center>

    <center>          
        
        <div id="contenedor">              
                <p>
                    <tr>        
                        <td>Topografía:</td> &nbsp;&nbsp;&nbsp;&nbsp;
                        <td>
                        <select 
                            className='custom-select'
                            id="topografia" 
                            name="topografia" 
                            value= {topografia}
                            onChange = {(e) => {
                                const topografiaSeleccionado = e.target.value;
                                cambiarTopografia({campo: topografiaSeleccionado});
                        }}  
                    
                    >
                        <option value={topografia.campo} checked>{topografia.campo}</option>
                        <option value="" disabled>----------</option>                        

                        <option value="A nivel">A nivel </option>
                        <option value="Bajo nivel">Bajo nivel </option>
                        <option value="Sobre nivel">Sobre nivel </option>
                        <option value="Escarpado arriba">Escarpado arriba </option>
                        <option value="Escarpado abajo">Escarpado abajo </option>
                        <option value="Accidentado">Accidentado </option>
                                    
                        </select> </td>
                    </tr>
                </p>
                
                <p>
                <tr>    
                    <br/>
                    <td>Cobertura nativa predominante (Rural):</td>
                        <td>
                        <select 
                            className='custom-select'
                            id="cobertura_nativa_predominante" 
                            name="cobertura_nativa_predominante"
                            value= {cobertura_nativa_predominante}
                            onChange = {(e) => {
                                const coberturaSeleccionado = e.target.value;
                                cambiarCoberturaNativaPredominante({campo: coberturaSeleccionado});
                        }}  
                    
                    >
                        <option value={cobertura_nativa_predominante.campo} checked>{cobertura_nativa_predominante.campo}</option>
                        <option value="" disabled>----------</option>  

                        <option value="No tiene">No tiene </option>
                        <option value="Arbórea">Arbórea </option>
                        <option value="Arbustiva">Arbustiva </option>
                        <option value="Herbácea">Herbácea </option>
                        <option value="Otro">Otro </option>
                        
                    </select> </td>
                    </tr>
                </p>
                
                <p>
                <tr>    
                    <br/>
                    &nbsp;&nbsp;&nbsp;<td>Ecosistema relevante (Rural):</td>
                        <td>
                        <select 
                            className='custom-select'
                            id="ecosistema_relevante" 
                            name="ecosistema_relevante" 
                            value= {ecosistema_relevante}
                            onChange = {(e) => {
                                const ecosistemaSeleccionado = e.target.value;
                                cambiarEcosistemaRelevante({campo: ecosistemaSeleccionado});
                        }}  
                    
                    >
                        <option value={ecosistema_relevante.campo} checked>{ecosistema_relevante.campo}</option>
                        <option value="" disabled>----------</option>                          
                        
                        <option value="No tiene">No tiene </option>
                        <option value="Páramo">Páramo </option>
                        <option value="Humedal">Humedal </option>
                        <option value="Manglar">Manglar </option>
                        <option value="Bosque primario">Bosque primario </option>
                        <option value="Bosque secundario">Bosque secundario </option>
                                
                    </select> </td>
                    </tr>
                </p>

            </div>
        
        </center>
        
        <center>
            <div id="contenedor">
                <p>
                    <tr>        
                    <td>Afectaciones:</td> &nbsp;&nbsp;&nbsp;
                    <td>
                    <select 
                        className='custom-select'
                        id="afectaciones" 
                        name="afectaciones" 
                        value= {afectaciones}
                            onChange = {(e) => {
                                const afectacionesSeleccionado = e.target.value;
                                cambiarAfectaciones({campo: afectacionesSeleccionado});
                        }}  
                    
                    >
                    <option value={afectaciones.campo} checked>{afectaciones.campo}</option>
                    <option value="" disabled>----------</option>                          
                    
                    <option value="No tiene">No tiene </option>
                    <option value="Río">Río </option>
                    <option value="Estero">Estero </option>
                    <option value="Quebrada">Quebrada </option>
                    <option value="Oleoducto">Oleoducto </option>
                    <option value="Red alta o media tensión">Red alta o media tensión </option>
                    <option value="Proyectos urbanísticos">Proyectos urbanísticos </option>
                    <option value="Protección patrimonial">Protección patrimonial </option>
                    
                            
                    </select> </td>
                    </tr>
                </p>
                
                <p>
                <tr>      
                        <td>Riesgos:</td> &nbsp;&nbsp;&nbsp;
                        <td>
                        <select 
                            className='custom-select'
                            id="riesgos" 
                            name="riesgos" 
                            value= {riesgos}
                            onChange = {(e) => {
                                const riesgosSeleccionado = e.target.value;
                                cambiarRiesgos({campo: riesgosSeleccionado});
                        }}  
                    
                    >
                        <option value={riesgos.campo} checked>{riesgos.campo}</option>
                        <option value="" disabled>----------</option>                          
                        
                        <option value="No tiene">No tiene </option>
                        <option value="Inundable">Inundable </option>
                        <option value="Deleznable">Deleznable </option>
                        <option value="Volcánico">Volcánico </option>
                        <option value="Al borde del barranco">Al borde del barranco </option>
                        <option value="Al borde de la quebrada">Al borde de la quebrada </option>
                                
                    </select> </td>
                    </tr>
                </p>
                
                <p>
                <tr>          
                        <td>Calidad de suelo:</td> &nbsp;&nbsp;&nbsp;
                        <td>
                        <select 
                            className='custom-select'
                            id="calidad_suelo" 
                            name="calidad_suelo" 
                            value= {calidad_suelo}
                            onChange = {(e) => {
                                const calidadSeleccionado = e.target.value;
                                cambiarCalidadSuelo({campo: calidadSeleccionado});
                        }}  
                    
                    >
                        <option value={calidad_suelo.campo} checked>{calidad_suelo.campo}</option>
                        <option value="" disabled>----------</option>                                                  
                        
                        <option value="Seco">Seco </option>
                        <option value="Húmedo">Húmedo </option>
                        <option value="Cenagoso">Cenagoso </option>
                        <option value="Inundable">Inundable </option>
                                    
                    </select> </td>
                    </tr>
                </p>
            </div>  
        </center>      
        <br/>
        <br/>          
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

export default CaracteristicasLote;
