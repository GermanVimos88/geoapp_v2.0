import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
//import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';


import Cookies from 'universal-cookie';
import MapView from './MapView';

const cookies = new Cookies();


const Grafico = () => {
   
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
    
    const baseUrl= 'http://localhost/apicatastro/index.php/grafico/?id='+id; //'https://cheerful-marzipan-12e313.netlify.app/grafico/?id='+id; //'http://f0783168.xsph.ru/index.php/grafico/?id='+id;
    const [data, setData]=useState();        
    
    //const [idubicacion, cambiarIdUbicacion] = useState({campo:'', valido: null});    
    const [idgrafico_predio, cambiarIdGraficoPredio] = useState ({campo: '', valido: ''}); 
    const [clave_predio, cambiarClavePredio] = useState ({campo: '', valido: ''}); 
    const [link_grafico, cambiarLinkGrafico] = useState ({campo: '', valido: ''}); 
    const [link_foto_fachada, cambiarLinkFotoFachada] = useState ({campo: '', valido: ''}); 
    const [descripcion_grafico, cambiarDescripcionGrafico] = useState ({campo: '', valido: ''}); 
    const [calle_norte, cambiarCalleNorte] = useState ({campo: '', valido: ''}); 
    const [calle_sur, cambiarCalleSur] = useState ({campo: '', valido: ''}); 
    const [calle_este, cambiarCalleEste] = useState ({campo: '', valido: ''}); 
    const [calle_oeste, cambiarCalleOeste] = useState ({campo: '', valido: ''}); 
    const [area_grafica_lote, cambiarAreaGraficaLote] = useState ({campo: '', valido: ''}); 
    const [dimension_frente, cambiarDimensionFrente] = useState ({campo: '', valido: ''}); 
    const [fondo_relativo, cambiarFondoRelativo] = useState ({campo: '', valido: ''}); 
    const [coordenada_x, cambiarCoordenada_x] = useState ({campo: '', valido: ''}); 
    const [coordenada_y, cambiarCoordenada_y] = useState ({campo: '', valido: ''}); 
    const [avaluo_tierras, cambiarAvaluoTierras] = useState ({campo: '', valido: ''}); 
    const [avaluo_construcciones, cambiarAvaluoConstrucciones] = useState ({campo: '', valido: ''}); 
    const [avaluo_total, cambiarAvaluoTotal] = useState ({campo: '', valido: ''}); 
    const [observaciones, cambiarObservaciones] = useState ({campo: '', valido: ''}); 
    
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{1,40}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        coordenada: /^\d*(\.\d{1})?\d{0,5}$/, // 1 a 5 numeros. con 6 digitos de precisión
        dimension: /^\d*(\.\d{1})?\d{0,2}$/ // 1 a 10 numeros. 
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
        putGrafico();
        peticionGet();
        cambiarFormularioValido(true);
        //alert('Datos actualizados correctamente');
         
     } else {
        cambiarFormularioValido(false);         
     }

}


const peticionGet=async()=>{
    const response = await axios.get(baseUrl) 
    
    cambiarIdGraficoPredio({campo: response.data[0].idgrafico});
    cambiarClavePredio({campo: response.data[0].clave_predio});
    cambiarLinkGrafico({campo: response.data[0].link_grafico});
    cambiarLinkFotoFachada({campo: response.data[0].link_foto_fachada});
    cambiarDescripcionGrafico({campo: response.data[0].descripcion});    
    cambiarClavePredio({campo: response.data[0].clave_predio});
    cambiarCalleNorte({campo: response.data[0].calle_norte});
    cambiarCalleSur({campo: response.data[0].calle_sur});
    cambiarCalleEste({campo: response.data[0].calle_este});
    cambiarCalleOeste({campo: response.data[0].calle_oeste});
    cambiarAreaGraficaLote({campo: response.data[0].area_grafica_lote});
    cambiarDimensionFrente({campo: response.data[0].dimension_frente});
    cambiarFondoRelativo({campo: response.data[0].fondo_relativo});
    cambiarCoordenada_x({campo: response.data[0].coordenada_x});
    cambiarCoordenada_y({campo: response.data[0].coordenada_y});
    cambiarAvaluoTierras({campo: response.data[0].avaluo_tierras});
    cambiarAvaluoConstrucciones({campo: response.data[0].avaluo_construcciones});
    cambiarAvaluoTotal({campo: response.data[0].avaluo_total});
    cambiarObservaciones({campo: response.data[0].observaciones});
    
}

//Función PUT
const putGrafico=async()=>{
    const grafico = {
        clave_predio: clave_predio.campo,
        link_grafico:link_grafico.campo,
        link_foto_fachada:link_foto_fachada.campo,
        descripcion:descripcion_grafico.campo,
        calle_norte:calle_norte.campo,
        calle_sur:calle_sur.campo,
        calle_este:calle_este.campo,
        calle_oeste:calle_oeste.campo,
        area_grafica_lote:area_grafica_lote.campo,
        dimension_frente:dimension_frente.campo,
        fondo_relativo:fondo_relativo.campo,
        coordenada_x:coordenada_x.campo,
        coordenada_y:coordenada_y.campo,
        avaluo_tierras:avaluo_tierras.campo,
        avaluo_construcciones:avaluo_construcciones.campo,
        avaluo_total:avaluo_total.campo,
        observaciones:observaciones.campo       
                  
    } 

    await axios.put('http://localhost/apicatastro/index.php/grafico/actualizar?id='+id, grafico)
    .then(response=>{
        cambiarClavePredio({campo: grafico.clave_predio});
        cambiarLinkGrafico({campo: grafico.link_grafico});
        cambiarLinkFotoFachada({campo: grafico.link_foto_fachada});
        cambiarDescripcionGrafico({campo: grafico.descripcion});    
        cambiarClavePredio({campo: grafico.clave_predio});
        cambiarCalleNorte({campo: grafico.calle_norte});
        cambiarCalleSur({campo: grafico.calle_sur});
        cambiarCalleEste({campo: grafico.calle_este});
        cambiarCalleOeste({campo: grafico.calle_oeste});
        cambiarAreaGraficaLote({campo: grafico.area_grafica_lote});
        cambiarDimensionFrente({campo: grafico.dimension_frente});
        cambiarFondoRelativo({campo: grafico.fondo_relativo});
        cambiarCoordenada_x({campo: grafico.coordenada_x});
        cambiarCoordenada_y({campo: grafico.coordenada_y});
        cambiarAvaluoTierras({campo: grafico.avaluo_tierras});
        cambiarAvaluoConstrucciones({campo: grafico.avaluo_construcciones});
        cambiarAvaluoTotal({campo: grafico.avaluo_total});
        cambiarObservaciones({campo: grafico.observaciones});
        
    }).catch(error=>{
        console.error(error);
    });
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
               <h1><b>Gráfico  <FontAwesomeIcon icon={faGlobeAmericas}/></b></h1> 
              <br/>
              <label>Clave Catastral: <b>{clave_predio.campo}</b></label> <td> </td>               
              
              
            <Formulario action="" onSubmit={onSubmit}>
            <ContenedorBotonCentrado>
                <div style={{ margin:'1.8rem', marginLeft :'1rem' , width:'58.5vw', height:'84.5vh', border: '2px solid black'}}>                                    
                    <MapView idClave={clave} />
                    <br/>                                    
                </div>
                </ContenedorBotonCentrado> 
            
            <div>    
                                               
                <center>
                <div id="contenedor2"> 

                <h3>Colindantes del predio</h3>
                <hr/>
                    <p>
                        
                                <ComponenteInput
                                estado={calle_norte}
                                cambiarEstado={cambiarCalleNorte}
                                tipo= "text"
                                label="Calle Norte: "
                                placeholder= "Nombre de la vía, calle o avenida"
                                name = "calle_norte"
                                leyendaError = "Letras y espacios. Puede llevar acentos"
                                expresionRegular = {expresiones.nombre}                
                                /> 

                        <br/>  
                        <br/>
                        
                                <ComponenteInput
                                estado={calle_sur}
                                cambiarEstado={cambiarCalleSur}
                                tipo= "text"
                                label="Calle Sur: "
                                placeholder= "Nombre de la vía, calle o avenida"
                                name = "calle_sur"
                                leyendaError = "Letras y espacios. Puede llevar acentos"
                                expresionRegular = {expresiones.nombre}                
                                /> 

                    </p>       
                    <br/>   
                                        
                        <p>
                        
                                <ComponenteInput
                                estado={calle_este}
                                cambiarEstado={cambiarCalleEste}
                                tipo= "text"
                                label="Calle Este: "
                                placeholder= "Nombre de la vía, calle o avenida"
                                name = "calle_este"
                                leyendaError = "Letras y espacios. Puede llevar acentos"
                                expresionRegular = {expresiones.nombre}                
                                /> 
                        <br/> 
                        <br/> 
                        
                                <ComponenteInput
                                estado={calle_oeste}
                                cambiarEstado={cambiarCalleOeste}
                                tipo= "text"
                                label="Calle Oeste"
                                placeholder= "Nombre de la vía, calle o avenida"
                                name = "calle_oeste"
                                leyendaError = "Letras y espacios. Puede llevar acentos"
                                expresionRegular = {expresiones.nombre}                
                                /> 

                    </p> 
                                
                            </div>
                        </center>
                        <br/>
                               
                </div>
                

                <div>
                    <center>
                                
                    <div id="contenedor2">
                    <h3>Dimensiones del gráfico</h3>
                    <hr/>
                    <p style={{ margin:'1rem', padding:'1rem', marginLeft :'2rem', marginBottom:'2rem' , width:'15rem', height:'21rem'}}>
                       
                        
                                   <ComponenteInput
                                    estado={area_grafica_lote}
                                    cambiarEstado={cambiarAreaGraficaLote}
                                    tipo= "text"
                                    label="Área gráfica del lote (m²): "
                                    placeholder= ""
                                    name = "area_grafica_lote"
                                    leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                    expresionRegular = {expresiones.dimension}                
                                /> 
                        
                        
                                    <ComponenteInput
                                    estado={dimension_frente}
                                    cambiarEstado={cambiarDimensionFrente}
                                    tipo= "text"
                                    label="Dimensión del frente (m):"
                                    placeholder= ""
                                    name = "dimension_frente"
                                    leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                    expresionRegular = {expresiones.dimension}                
                                /> 
                        
                        
                                    <ComponenteInput
                                    estado={fondo_relativo}
                                    cambiarEstado={cambiarFondoRelativo}
                                    tipo= "text"
                                    label="Fondo relativo (m)"
                                    placeholder= ""
                                    name = "fondo_relativo"
                                    leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                    expresionRegular = {expresiones.dimension}                
                                /> 
                                
                        </p>
                        <hr/> 
                                
                        <p style={{ margin:'0.8rem', padding:'1rem', paddingBottom:'3rem' ,marginLeft :'0.5rem', marginBottom:'2rem', width:'18rem', height:'15rem'}}>
                                                
                                    <ComponenteInput
                                    estado={coordenada_x}
                                    cambiarEstado={cambiarCoordenada_x}
                                    tipo= "text"
                                    label="Coordenada X (WGS 84 17S):"
                                    placeholder= "Ingrese el valor de 'X'"
                                    name = "coordenada_x"
                                    leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                    expresionRegular = {expresiones.dimension}                
                                /> 
                             
                        
                                    <ComponenteInput
                                    estado={coordenada_y}
                                    cambiarEstado={cambiarCoordenada_y}
                                    tipo= "text"
                                    label="Coordenada Y (WGS 84 17S):"
                                    placeholder= "Ingrese el valor de 'Y'"
                                    name = "coordenada_y"
                                    leyendaError = "Valores enteros y decimales hasta 5 dígitos de precisión"
                                    expresionRegular = {expresiones.dimension}                
                                /> 

                            </p>
                                       
                                    </div>                           
                                
                            </center>                            
                        </div>                                

                <ContenedorTerminos>
                    <br/>
                    <br/>                
                    <div id="contenedor3">
                    <center><h3>Avalúo Municipal</h3></center>
                    <hr/>
                            <p>
                                
                                <ComponenteInput
                                    estado={avaluo_tierras}
                                    cambiarEstado={cambiarAvaluoTierras}
                                    tipo= "text"
                                    label="Avalúo tierra: "
                                    placeholder= ""
                                    name = "avaluo_tierras"
                                    leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                    expresionRegular = {expresiones.dimension}                
                                /> 

                                <ComponenteInput
                                    estado={avaluo_construcciones}
                                    cambiarEstado={cambiarAvaluoConstrucciones}
                                    tipo= "text"
                                    label="Avalúo construcciones: "
                                    placeholder= ""
                                    name = "avaluo_construcciones"
                                    leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                    expresionRegular = {expresiones.dimension}                
                                /> 

                                <ComponenteInput
                                    estado={avaluo_total}
                                    cambiarEstado={cambiarAvaluoTotal}
                                    tipo= "text"
                                    label="Avalúo total: "
                                    placeholder= ""
                                    name = "avaluo_total"
                                    leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                    expresionRegular = {expresiones.dimension}                
                                /> 

                    
                            </p>
                    </div>
                    <br/>
                    <br/>
                    
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


export default Grafico;






