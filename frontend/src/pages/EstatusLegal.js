import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import NumericInput from 'react-numeric-input';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import axios from 'axios';
import '../css/estilos.css';
//import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faFileSignature, faReply, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const EstatusLegal = () => {

    
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
        
    const baseUrl= 'http://localhost/apicatastro/index.php/legal/?id='+id; //'https://cheerful-marzipan-12e313.netlify.app/legal/?id='+id; //'http://f0783168.xsph.ru/index.php/legal/?id='+id;
    const [data, setData]=useState();
       
        
    const [id_estatus, cambiarIdEstatus] = useState({campo: '', valido: null});
	//const [clave_catastral, cambiarClaveCatastral] = useState({campo: '', valido: null});     
    const [clave_predio, cambiarClavePredio] = useState({campo:'', valido: null}); 
    const [titulo, cambiarTitulo] = useState({campo:'', valido: null}); 
    const [escritura, cambiarEscritura] = useState({campo:'', valido: null}); 
    const [celebrado_ante, cambiarCelebradoAnte] = useState({campo:'', valido: null}); 
    const [nombre_numero_notaria, cambiarNombreNumeroNotaria] = useState({campo:'', valido: null}); 
    const [provincia_titulacion, cambiarProvinciaTitulacion] = useState({campo:'', valido: null}); 
    const [canton_inscripcion, cambiarCantonInscripcion] = useState({campo:'', valido: null}); 
    const [dia_protocolizacion, cambiarDiaProtocolizacion] = useState({campo:'', valido: null}); 
    const [mes_protocolizacion, cambiarMesProtocolizacion] = useState({campo:'', valido: null}); 
    const [anio_protocolizacion, cambiarAnioProtocolizacion] = useState({campo:'', valido: null}); 
    const [registro_propiedad, cambiarRegistroPropiedad] = useState({campo:'', valido: null}); 
    const [tomo, cambiarTomo] = useState({campo:'', valido: null}); 
    const [partida, cambiarPartida] = useState({campo:'', valido: null}); 
    const [dia_inscripcion_registro_propiedad, cambiarDiaInscripcionRegistroPropiedad] = useState({campo:'', valido: null}); 
    const [mes_inscripcion_registro_propiedad, cambiarmesInscripcionRegistroPropiedad] = useState({campo:'', valido: null}); 
    const [anio_inscripcion_registro_propiedad, cambiarAnioInscripcionRegistroPropiedad] = useState({campo:'', valido: null}); 
    const [area_segun_titulo, cambiarAreaSegunTitulo] = useState({campo:'', valido: null}); 
    const [unidad_medida, cambiarUnidadMedida] = useState({campo:'', valido: null}); 
    const [forma_tenencia, cambiarFormaTenencia] = useState({campo:'', valido: null}); 
    const [forma_adquisicion, cambiarFormaAdquisicion] = useState({campo:'', valido: null}); 
    const [requiere_perfeccionamiento, cambiarRequierePerfeccionamiento] = useState({campo:'', valido: null}); 
    const [anios_sin_perfeccionamiento, cambiarAniosSinPerfeccionamiento] = useState({campo:'', valido: null}); 
    const [anios_posesion, cambiarAniosPosesion] = useState({campo:'', valido: null}); 
    const [pueblo_etnia, cambiarPuebloEtnia] = useState({campo:'', valido: null}); 
    const [adquisicion_sin_titulo, cambiarAdquisicionSinTitulo] = useState({campo:'', valido: null}); 
    const [documento_presentado, cambiarDocumentoPresentado] = useState({campo:'', valido: null}); 
    const [primer_apellido_posesionario, cambiarPrimerApellidoPosesionario] = useState({campo:'', valido: null}); 
    const [segundo_apellido_posesionario, cambiarSegundoApellidoPosesionario] = useState({campo:'', valido: null}); 
    const [primer_nombre_posesionario, cambiarPrimerNombrePosesionario] = useState({campo:'', valido: null}); 
    const [segundo_nombre_posesionario, cambiarSegundoNombrePosesionario] = useState({campo:'', valido: null}); 
    const [tipo_documento_posesionario, cambiarTipoDocumentoPosesionario] = useState({campo:'', valido: null}); 
    const [identificacion_posesionario, cambiarIdentificacionPosesionario] = useState({campo:'', valido: null}); 
    const [email_posesionario, cambiarEmailPosesionario] = useState({campo:'', valido: null}); 
    const [telefono_posesionario, cambiarTelefonoPosesionario] = useState({campo:'', valido: null}); 


    //const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
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

const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked); 
}


const onSubmit = (e) => {
    e.preventDefault();
         
        // CONEXION CRUD (PETICIONES AJAX/HTTP)
        putEstatusLegal();
        peticionGet();
        //cambiarFormularioValido(true);
        alert('Datos actualizados correctamente');

}

const peticionGet=async()=>{
    const response = await axios.get(baseUrl) 

    cambiarIdEstatus({campo: response.data[0].idestatus})  //id_estatus
    cambiarClavePredio({campo: response.data[0].clave_predio});
    cambiarTitulo({campo: response.data[0].titulo});
    cambiarEscritura({campo: response.data[0].escritura});
    cambiarCelebradoAnte({campo: response.data[0].celebrado_ante});
    cambiarNombreNumeroNotaria({campo: response.data[0].nombre_notaria});
    cambiarProvinciaTitulacion({campo: response.data[0].provincia_titulacion});
    cambiarCantonInscripcion({campo: response.data[0].canton_inscripcion});
    cambiarDiaProtocolizacion({campo: response.data[0].dia_protocolo});
    cambiarMesProtocolizacion({campo: response.data[0].mes_protocolo});
    cambiarAnioProtocolizacion({campo: response.data[0].anio_protocolo});
    cambiarRegistroPropiedad({campo: response.data[0].registro_propiedad});
    cambiarTomo({campo: response.data[0].tomo});
    cambiarPartida({campo: response.data[0].partida});
    cambiarDiaInscripcionRegistroPropiedad({campo: response.data[0].dia_inscripcion});
    cambiarmesInscripcionRegistroPropiedad({campo: response.data[0].mes_inscripcion});
    cambiarAnioInscripcionRegistroPropiedad({campo: response.data[0].anio_inscripcion});
    cambiarAreaSegunTitulo({campo: response.data[0].area_titulo});
    cambiarUnidadMedida({campo: response.data[0].unidad});
    cambiarFormaTenencia({campo: response.data[0].tenencia});
    cambiarFormaAdquisicion({campo: response.data[0].adquisicion});
    cambiarRequierePerfeccionamiento({campo: response.data[0].perfeccionamiento});
    cambiarAniosSinPerfeccionamiento({campo: response.data[0].sin_perfeccionamiento});
    cambiarAniosPosesion({campo: response.data[0].anios_posesion});
    cambiarPuebloEtnia({campo: response.data[0].pueblo_etnia});
    cambiarAdquisicionSinTitulo({campo: response.data[0].sin_titulo});
    cambiarDocumentoPresentado({campo: response.data[0].documento});
    cambiarPrimerApellidoPosesionario({campo: response.data[0].posesionario_apellidouno});
    cambiarSegundoApellidoPosesionario({campo: response.data[0].posesionario_apellidodos});
    cambiarPrimerNombrePosesionario({campo: response.data[0].posesionario_nombreuno});
    cambiarSegundoNombrePosesionario({campo: response.data[0].posesionario_nombredos});
    cambiarTipoDocumentoPosesionario({campo: response.data[0].posesionario_documento});
    cambiarIdentificacionPosesionario({campo: response.data[0].posesionario_id});
    cambiarEmailPosesionario({campo: response.data[0].posesionario_email});
    cambiarTelefonoPosesionario({campo: response.data[0].posesionario_telefono}); 
    
}

//Función PUT
const putEstatusLegal=async()=>{
    const estatus = {        
        clave_predio:clave_predio.campo,
        titulo: titulo.campo,
        escritura: escritura.campo,
        celebrado_ante: celebrado_ante.campo,
        nombre_notaria: nombre_numero_notaria.campo,
        provincia_titulacion: provincia_titulacion.campo,
        canton_inscripcion: canton_inscripcion.campo,
        dia_protocolo: dia_protocolizacion.campo,
        mes_protocolo: mes_protocolizacion.campo,
        anio_protocolo:anio_protocolizacion.campo,
        registro_propiedad:registro_propiedad.campo,
        tomo:tomo.campo,
        partida:partida.campo,
        dia_inscripcion:dia_inscripcion_registro_propiedad.campo,
        mes_inscripcion: mes_inscripcion_registro_propiedad.campo,
        anio_inscripcion:anio_inscripcion_registro_propiedad.campo,
        area_titulo:area_segun_titulo.campo,
        unidad:unidad_medida.campo,
        tenencia:forma_tenencia.campo,
        adquisicion:forma_adquisicion.campo,
        perfeccionamiento:requiere_perfeccionamiento.campo,
        sin_perfeccionamiento:anios_sin_perfeccionamiento.campo,
        anios_posesion:anios_posesion.campo,
        pueblo_etnia:pueblo_etnia.campo,
        sin_titulo:adquisicion_sin_titulo.campo,
        documento:documento_presentado.campo,
        posesionario_apellidouno:primer_apellido_posesionario.campo,
        posesionario_apellidodos:segundo_apellido_posesionario.campo,
        posesionario_nombreuno:primer_nombre_posesionario.campo,
        posesionario_nombredos:segundo_nombre_posesionario.campo,
        posesionario_documento:tipo_documento_posesionario.campo,
        posesionario_id:identificacion_posesionario.campo,
        posesionario_email:email_posesionario.campo,
        posesionario_telefono:telefono_posesionario.campo                  
    } 

    await axios.put('http://localhost/apicatastro/index.php/legal/actualizar?id='+id, estatus)
    .then(response=>{
        cambiarClavePredio({campo: estatus.clave_predio});
        cambiarTitulo({campo: estatus.titulo});
        cambiarEscritura({campo: estatus.escritura});
        cambiarCelebradoAnte({campo: estatus.celebrado_ante});
        cambiarNombreNumeroNotaria({campo: estatus.nombre_notaria});
        cambiarProvinciaTitulacion({campo: estatus.provincia_titulacion});
        cambiarCantonInscripcion({campo: estatus.canton_inscripcion});
        cambiarDiaProtocolizacion({campo: estatus.dia_protocolo});
        cambiarMesProtocolizacion({campo: estatus.mes_protocolo});
        cambiarAnioProtocolizacion({campo: estatus.anio_protocolo});
        cambiarRegistroPropiedad({campo: estatus.registro_propiedad});
        cambiarTomo({campo: estatus.tomo});
        cambiarPartida({campo: estatus.partida});
        cambiarDiaInscripcionRegistroPropiedad({campo: estatus.dia_inscripcion});
        cambiarmesInscripcionRegistroPropiedad({campo: estatus.mes_inscripcion});
        cambiarAnioInscripcionRegistroPropiedad({campo: estatus.anio_inscripcion});
        cambiarAreaSegunTitulo({campo: estatus.area_titulo});
        cambiarUnidadMedida({campo: estatus.unidad});
        cambiarFormaTenencia({campo: estatus.tenencia});
        cambiarFormaAdquisicion({campo: estatus.adquisicion});
        cambiarRequierePerfeccionamiento({campo: estatus.perfeccionamiento});
        cambiarAniosSinPerfeccionamiento({campo: estatus.sin_perfeccionamiento});
        cambiarAniosPosesion({campo: estatus.anios_posesion});
        cambiarPuebloEtnia({campo: estatus.pueblo_etnia});
        cambiarAdquisicionSinTitulo({campo: estatus.sin_titulo});
        cambiarDocumentoPresentado({campo: estatus.documento});
        cambiarPrimerApellidoPosesionario({campo: estatus.posesionario_apellidouno});
        cambiarSegundoApellidoPosesionario({campo: estatus.posesionario_apellidodos});
        cambiarPrimerNombrePosesionario({campo: estatus.posesionario_nombreuno});
        cambiarSegundoNombrePosesionario({campo: estatus.posesionario_nombredos});
        cambiarTipoDocumentoPosesionario({campo: estatus.posesionario_documento});
        cambiarIdentificacionPosesionario({campo: estatus.posesionario_id});
        cambiarEmailPosesionario({campo: estatus.posesionario_email});
        cambiarTelefonoPosesionario({campo: estatus.posesionario_telefono}); 
        
    }).catch(error=>{
        console.error(error);
    });
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
              <label style={{ fontWeight:'900', fontSize:'32px' }}>Estatus Legal <FontAwesomeIcon icon={faFileSignature}/></label> 
              <br/>
                <label>Clave Catastral: {clave_predio.campo}</label> <td> </td>
                
              <br/>

            <Formulario action="" onSubmit={onSubmit}> 

            <ContenedorBotonCentrado>
                <h3>Datos de Predio con Título</h3>                
            </ContenedorBotonCentrado>     


            <center>
            <div style={{marginLeft: '-6rem' }} >                
                
                <br/>
                <p>
                <tr>    
                    
                    <label for="titulo" style={{ fontWeight:'900' }}>Predio con título:</label>
                        <td>
                        <select 
                            className="custom-select"
                            id="titulo" 
                            name="titulo"
                            value= {titulo}
                            onChange = {(e) => {
                                const tituloSeleccionado = e.target.value;
                                cambiarTitulo({campo: tituloSeleccionado});
                        }} 
                    >
                        
                        <option value={titulo.campo} checked>{titulo.campo}</option>
                        <option value="" disabled>----------</option>
                                        
                        <option value="Si">Si </option>
                        <option value="No">No </option>
                                
                    </select> </td>
                    </tr>
                </p>
                <br/>                
                <p>

                <tr>            
                    <label for="escritura" style={{ fontWeight:'900' }}>Escritura:</label>
                    <td>
                    <select 
                        className="custom-select"
                        id="escritura" 
                        name="escritura" 
                        value= {escritura}
                            onChange = {(e) => {
                                const escrituraSeleccionado = e.target.value;
                                cambiarEscritura({campo: escrituraSeleccionado});
                        }} 
                    >
                        
                    <option value={escritura.campo} checked>{escritura.campo}</option>
                    <option value="" disabled>----------</option>
                                    
                    <option value="Si">Si </option>
                    <option value="No">No </option>
                                
                    </select> </td>
                </tr>
                </p>  
                <br/>
                <p>
                <tr>    
        
                    <label for="celebrado_ante" style={{ fontWeight:'900' }}>Celebrado ante:</label>
                    <td>
                    <select 
                        className="custom-select"
                        id="celebrado_ante" 
                        name="celebrado_ante"
                        value= {celebrado_ante}
                            onChange = {(e) => {
                                const celebradoSeleccionado = e.target.value;
                                cambiarCelebradoAnte({campo: celebradoSeleccionado});
                        }} 
                    >
                        
                    <option value={celebrado_ante.campo} checked>{celebrado_ante.campo}</option>
                    <option value="" disabled>----------</option>
                                    
                    <option value="Notario">Notario </option>
                    <option value="Juez">Juez </option>
                                
                    </select> </td>
                </tr>
                </p> 
                
                <p>
                    <ComponenteInput
                        estado={nombre_numero_notaria}
                        cambiarEstado={cambiarNombreNumeroNotaria}
                        tipo= "text"
                        label="Nombre Notaría"
                        placeholder= "Nombre y/o Número de Notaría"
                        name = "nombre_notaria"
                        leyendaError = "Letras y números. Puede llevar acentos"
                        expresionRegular = {expresiones.usuario}                
                    /> 
                    <ComponenteInput
                        estado={provincia_titulacion}
                        cambiarEstado={cambiarProvinciaTitulacion}
                        tipo= "text"
                        label="Provincia titulación"
                        placeholder= "Provincia donde se registró la titulación"
                        name = "provincia_titulacion"
                        leyendaError = "Solo letras. Puede llevar acentos"
                        expresionRegular = {expresiones.nombre}                
                    /> 
                    <ComponenteInput
                        estado={canton_inscripcion}
                        cambiarEstado={cambiarCantonInscripcion}
                        tipo= "text"
                        label="Cantón de inscripción"
                        placeholder= "Cantón de inscripción..."
                        name = "canton_inscripción"
                        leyendaError = "Solo letras. Puede llevar acentos"
                        expresionRegular = {expresiones.nombre}                
                    />

                </p>
       
        </div>
            
    </center>

    <center>
        <div style={{marginLeft: '-5rem' }}>
            <br/>
                <label style={{ fontWeight:'900' }}><td>Fecha de Protocolización:</td></label>
                    <tr>                                    
                    
                    <label for="dia_protocolizacion" >Dia:</label>                    
                    <td>
                        <select 
                            className="custom-select"
                            id="dia_protocolizacion" 
                            name="dia_protocolizacion" 
                            value= {dia_protocolizacion}
                            onChange = {(e) => {
                                const diaSeleccionado = e.target.value;
                                cambiarDiaProtocolizacion({campo: diaSeleccionado});
                        }} 
                        >
                        
                        <option value={dia_protocolizacion.campo} checked>{dia_protocolizacion.campo}</option>
                        <option value="" disabled>----------</option>
                                                 
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                        <option value="19">19</option>
                        <option value="20">20</option>
                        <option value="21">21</option>
                        <option value="22">22</option>
                        <option value="23">23</option>
                        <option value="24">24</option>
                        <option value="25">25</option>
                        <option value="26">26</option>
                        <option value="27">27</option>
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                                
                    </select> </td>
                    
                    </tr>
                                            
                    <tr>
                    
                    <label for="mes_protocolizacion" >Mes:</label>
                    <td>
                            <select 
                            className="custom-select"
                            name="mes_protocolizacion"
                            id="mes_protocolizacion"
                            value= {mes_protocolizacion}
                            onChange = {(e) => {
                                const mesSeleccionado = e.target.value;
                                cambiarMesProtocolizacion({campo: mesSeleccionado});
                        }} 
                        >
                        
                        <option value={mes_protocolizacion.campo} checked>{mes_protocolizacion.campo}</option>
                        <option value="" disabled>----------</option>
                                                
                        <option value="Enero">Enero</option>
                        <option value="Febrero">Febrero</option>
                        <option value="Marzo">Marzo</option>
                        <option value="Abril">Abril</option>
                        <option value="Mayo">Mayo</option>
                        <option value="Junio">Junio</option>
                        <option value="Julio">Julio</option>
                        <option value="Agosto">Agosto</option>
                        <option value="Septiembre">Septiembre</option>
                        <option value="Octubre">Octubre</option>
                        <option value="Noviembre">Noviembre</option>
                        <option value="Diciembre">Diciembre</option>
                        </select> </td>
                          
                        </tr>
                        
                        <tr>
                        
                        <label for="anio_protocolizacion" >Año:</label>
                        <td>
                        
                        <select 
                            className="custom-select"
                            name="anio_protocolizacion"
                            id="anio_protocolizacion"
                            value= {anio_protocolizacion}
                            onChange = {(e) => {
                                const anioSeleccionado = e.target.value;
                                cambiarAnioProtocolizacion({campo: anioSeleccionado});
                        }} 
                        >                        
                        <option value={anio_protocolizacion.campo} checked>{anio_protocolizacion.campo}</option>
                        <option value="" disabled>----------</option>
                        
                        <option value="1930">1930</option>
                        <option value="1931">1931</option>
                        <option value="1932">1932</option>
                        <option value="1933">1933</option>
                        <option value="1934">1934</option>
                        <option value="1935">1935</option>
                        <option value="1936">1936</option>
                        <option value="1937">1937</option>
                        <option value="1938">1938</option>
                        <option value="1939">1939</option>
                        <option value="1940">1940</option>
                        <option value="1941">1941</option>
                        <option value="1942">1942</option>
                        <option value="1943">1943</option>
                        <option value="1944">1944</option>
                        <option value="1945">1945</option>
                        <option value="1946">1946</option>
                        <option value="1947">1947</option>
                        <option value="1948">1948</option>
                        <option value="1949">1949</option>
                        <option value="1950">1950</option>
                        <option value="1951">1951</option>
                        <option value="1952">1952</option>
                        <option value="1953">1953</option>
                        <option value="1954">1954</option>
                        <option value="1955">1955</option>
                        <option value="1956">1956</option>
                        <option value="1957">1957</option>
                        <option value="1958">1958</option>
                        <option value="1959">1959</option>
                        <option value="1960">1960</option>
                        <option value="1961">1961</option>
                        <option value="1962">1962</option>
                        <option value="1963">1963</option>
                        <option value="1964">1964</option>
                        <option value="1965">1965</option>
                        <option value="1966">1966</option>
                        <option value="1967">1967</option>
                        <option value="1968">1968</option>
                        <option value="1969">1969</option>
                        <option value="1970">1970</option>
                        <option value="1971">1971</option>
                        <option value="1972">1972</option>
                        <option value="1973">1973</option>
                        <option value="1974">1974</option>
                        <option value="1975">1975</option>
                        <option value="1976">1976</option>
                        <option value="1977">1977</option>
                        <option value="1978">1978</option>
                        <option value="1979">1979</option>
                        <option value="1980">1980</option>
                        <option value="1981">1981</option>
                        <option value="1982">1982</option>
                        <option value="1983">1983</option>
                        <option value="1984">1984</option>
                        <option value="1985">1985</option>
                        <option value="1986">1986</option>
                        <option value="1987">1987</option>
                        <option value="1988">1988</option>
                        <option value="1989">1989</option>
                        <option value="1990">1990</option>
                        <option value="1991">1991</option>
                        <option value="1992">1992</option>
                        <option value="1993">1993</option>
                        <option value="1994">1994</option>
                        <option value="1995">1995</option>
                        <option value="1996">1996</option>
                        <option value="1997">1997</option>
                        <option value="1998">1998</option>
                        <option value="1999">1999</option>
                        <option value="2000">2000</option>
                        <option value="2001">2001</option>
                        <option value="2002">2002</option>
                        <option value="2003">2003</option>
                        <option value="2004">2004</option>
                        <option value="2005">2005</option>
                        <option value="2006">2006</option>
                        <option value="2007">2007</option>
                        <option value="2008">2008</option>
                        <option value="2009">2009</option>
                        <option value="2010">2010</option>
                        <option value="2011">2011</option>
                        <option value="2012">2012</option>
                        <option value="2013">2013</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        </select> </td>
                        
                        </tr>
                
                <br/>
                <p>
                    <ComponenteInput
                        estado={registro_propiedad}
                        cambiarEstado={cambiarRegistroPropiedad}
                        tipo= "text"
                        label="Registro de la Propiedad"
                        placeholder= "Ingrese el código de registro de propiedad"
                        name = "registro_propiedad"
                        leyendaError = "Letras y números. Puede llevar acentos"
                        expresionRegular = {expresiones.usuario}                
                    />
                    <ComponenteInput
                        estado={tomo}
                        cambiarEstado={cambiarTomo}
                        tipo= "text"
                        label="Tomo"
                        placeholder= "Código del tomo"
                        name = "tomo"
                        leyendaError = "Letras y números. Puede llevar acentos"
                        expresionRegular = {expresiones.usuario}                
                    />
                    <ComponenteInput
                        estado={partida}
                        cambiarEstado={cambiarPartida}
                        tipo= "text"
                        label="Partida"
                        placeholder= "Código de partida"
                        name = "partida"
                        leyendaError = "Letras y números. Puede llevar acentos"
                        expresionRegular = {expresiones.usuario}                
                    />
                    
                </p> 

        </div>

    </center>

    <center>
        <div style={{marginLeft: '-6rem' }}>
                        
                    <label style={{ fontWeight:'900' }}>Fecha Inscripción Registro propiedad:</label>
                        <tr>                    
                        
                        <label for="dia_inscripcion_registro_propiedad" >Dia:</label>
                        <td>
                            <select 
                                className="custom-select"
                                id="dia_inscripcion_registro_propiedad" 
                                name="dia_inscripcion_registro_propiedad" 
                                value= {dia_inscripcion_registro_propiedad}
                                onChange = {(e) => {
                                const inscripcionSeleccionado = e.target.value;
                                cambiarDiaInscripcionRegistroPropiedad({campo: inscripcionSeleccionado});
                            }} 
                            >                        
                            <option value={dia_inscripcion_registro_propiedad.campo} checked>{dia_inscripcion_registro_propiedad.campo}</option>
                            <option value="" disabled>----------</option>
                            
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                                    
                        </select> </td>
                        
                        </tr>
                            
                            <tr>
                            
                            <label for="mes_inscripcion_registro_propiedad" >Mes:</label>
                            <td>
                            <select 
                                className="custom-select"
                                name="mes_inscripcion_registro_propiedad"
                                id="mes_inscripcion_registro_propiedad"
                                value= {mes_inscripcion_registro_propiedad}
                                onChange = {(e) => {
                                const mesinscripcionSeleccionado = e.target.value;
                                cambiarmesInscripcionRegistroPropiedad({campo: mesinscripcionSeleccionado});
                                }} 
                            >                        
                            <option value={mes_inscripcion_registro_propiedad.campo} checked>{mes_inscripcion_registro_propiedad.campo}</option>
                            <option value="" disabled>----------</option>
                            
                            <option value="Enero">Enero</option>
                            <option value="Febrero">Febrero</option>
                            <option value="Marzo">Marzo</option>
                            <option value="Abril">Abril</option>
                            <option value="Mayo">Mayo</option>
                            <option value="Junio">Junio</option>
                            <option value="Julio">Julio</option>
                            <option value="Agosto">Agosto</option>
                            <option value="Septiembre">Septiembre</option>
                            <option value="Octubre">Octubre</option>
                            <option value="Noviembre">Noviembre</option>
                            <option value="Diciembre">Diciembre</option>
                            </select> </td>
                            
                            </tr>
                            
                            <tr>
                            
                            <label for="anio_inscripcion_registro_propiedad" >Año:</label>
                            <td>
                            <select 
                                className="custom-select"
                                name="anio_inscripcion_registro_propiedad"
                                id="anio_inscripcion_registro_propiedad"
                                value= {anio_inscripcion_registro_propiedad}
                                onChange = {(e) => {
                                const anioinscripcionSeleccionado = e.target.value;
                                cambiarAnioInscripcionRegistroPropiedad({campo: anioinscripcionSeleccionado});
                                }} 
                            >                        
                            <option value={anio_inscripcion_registro_propiedad.campo} checked>{anio_inscripcion_registro_propiedad.campo}</option>
                            <option value="" disabled>----------</option>
                            
                            <option value="1930">1930</option>
                            <option value="1931">1931</option>
                            <option value="1932">1932</option>
                            <option value="1933">1933</option>
                            <option value="1934">1934</option>
                            <option value="1935">1935</option>
                            <option value="1936">1936</option>
                            <option value="1937">1937</option>
                            <option value="1938">1938</option>
                            <option value="1939">1939</option>
                            <option value="1940">1940</option>
                            <option value="1941">1941</option>
                            <option value="1942">1942</option>
                            <option value="1943">1943</option>
                            <option value="1944">1944</option>
                            <option value="1945">1945</option>
                            <option value="1946">1946</option>
                            <option value="1947">1947</option>
                            <option value="1948">1948</option>
                            <option value="1949">1949</option>
                            <option value="1950">1950</option>
                            <option value="1951">1951</option>
                            <option value="1952">1952</option>
                            <option value="1953">1953</option>
                            <option value="1954">1954</option>
                            <option value="1955">1955</option>
                            <option value="1956">1956</option>
                            <option value="1957">1957</option>
                            <option value="1958">1958</option>
                            <option value="1959">1959</option>
                            <option value="1960">1960</option>
                            <option value="1961">1961</option>
                            <option value="1962">1962</option>
                            <option value="1963">1963</option>
                            <option value="1964">1964</option>
                            <option value="1965">1965</option>
                            <option value="1966">1966</option>
                            <option value="1967">1967</option>
                            <option value="1968">1968</option>
                            <option value="1969">1969</option>
                            <option value="1970">1970</option>
                            <option value="1971">1971</option>
                            <option value="1972">1972</option>
                            <option value="1973">1973</option>
                            <option value="1974">1974</option>
                            <option value="1975">1975</option>
                            <option value="1976">1976</option>
                            <option value="1977">1977</option>
                            <option value="1978">1978</option>
                            <option value="1979">1979</option>
                            <option value="1980">1980</option>
                            <option value="1981">1981</option>
                            <option value="1982">1982</option>
                            <option value="1983">1983</option>
                            <option value="1984">1984</option>
                            <option value="1985">1985</option>
                            <option value="1986">1986</option>
                            <option value="1987">1987</option>
                            <option value="1988">1988</option>
                            <option value="1989">1989</option>
                            <option value="1990">1990</option>
                            <option value="1991">1991</option>
                            <option value="1992">1992</option>
                            <option value="1993">1993</option>
                            <option value="1994">1994</option>
                            <option value="1995">1995</option>
                            <option value="1996">1996</option>
                            <option value="1997">1997</option>
                            <option value="1998">1998</option>
                            <option value="1999">1999</option>
                            <option value="2000">2000</option>
                            <option value="2001">2001</option>
                            <option value="2002">2002</option>
                            <option value="2003">2003</option>
                            <option value="2004">2004</option>
                            <option value="2005">2005</option>
                            <option value="2006">2006</option>
                            <option value="2007">2007</option>
                            <option value="2008">2008</option>
                            <option value="2009">2009</option>
                            <option value="2010">2010</option>
                            <option value="2011">2011</option>
                            <option value="2012">2012</option>
                            <option value="2013">2013</option>
                            <option value="2014">2014</option>
                            <option value="2015">2015</option>
                            <option value="2016">2016</option>
                            <option value="2017">2017</option>
                            <option value="2018">2018</option>
                            </select> </td>
                            
                            </tr>
        </div>
    </center>

    <center>
        <div style={{marginLeft: '-5rem' }}>
                        <p>
                            <ComponenteInput
                            estado={area_segun_titulo}
                            cambiarEstado={cambiarAreaSegunTitulo}
                            tipo= "text"
                            label="Área según el título"
                            placeholder= ""
                            name = "area"
                            leyendaError = "Solo números"
                            expresionRegular = {expresiones.area}                
                        />
                        <br/>                        
                        <tr> 
                        <label for="unidad_medida" style={{ fontWeight:'900' }}>Unidad de medida:</label>                                            
                            <td>
                            <select 
                                className="custom-select"
                                id="unidad_medida" 
                                name="unidad_medida"
                                value= {unidad_medida}
                                onChange = {(e) => {
                                const unidadSeleccionado = e.target.value;
                                cambiarUnidadMedida({campo: unidadSeleccionado});
                                }} 
                            >
                        
                            <option value={unidad_medida.campo} checked>{unidad_medida.campo}</option>
                            <option value="" disabled>----------</option>
                                                        
                            <option value="No tiene">No tiene </option>
                            <option value="m²">m² </option>
                            <option value="Hectáreas">Hectáreas </option>
                            <option value="Cuadra">Cuadra </option>
                            <option value="Solar">Solar </option>
                            <option value="Leguas">Leguas </option>
                            <option value="Acre">Acre </option>
                            <option value="Otro">Otro </option>
                                    
                        </select> </td>
                        </tr>
                        
                        <tr>        
                        <label for="forma_tenencia" style={{ fontWeight:'900' }}>Forma de tenencia:</label>
                            <td>
                            <select 
                                className="custom-select"
                                id="forma_tenencia" 
                                name="forma_tenencia" 
                                value= {forma_tenencia}
                                onChange = {(e) => {
                                const formaSeleccionado = e.target.value;
                                cambiarFormaTenencia({campo: formaSeleccionado});
                                }} 
                            >
                        
                            <option value={forma_tenencia.campo} checked>{forma_tenencia.campo}</option>
                            <option value="" disabled>----------</option>
                                            
                            <option value="Propietario">Propietario</option>
                            <option value="Arrendatario">Arrendatario</option>
                            <option value="Posesionario">Posesionario</option>
                            <option value="Usufructuario">Usufructuario </option>
                            <option value="Posesión efectiva">Posesión efectiva </option>
                                                
                        </select> </td>
                        </tr>                        
                                                            
                        <tr>    
                        <label for="forma_adquisicion" style={{ fontWeight:'900' }}>Forma de Adquisición:</label>
                            <td>
                            <select 
                                className="custom-select"
                                id="forma_adquisicion" 
                                name="forma_adquisicion" 
                                value= {forma_adquisicion}
                                onChange = {(e) => {
                                const adquisicionSeleccionado = e.target.value;
                                cambiarFormaAdquisicion({campo: adquisicionSeleccionado});
                                }} 
                            >
                        
                            <option value={forma_adquisicion.campo} checked>{forma_adquisicion.campo}</option>
                            <option value="" disabled>----------</option>
                                                
                            <option value="Adjudicación">Adjudicación </option>
                            <option value="Compra/Venta">Compra/Venta </option>
                            <option value="Donación">Donación </option>
                            <option value="Herencia">Herencia </option>
                            <option value="Partición">Partición </option>
                            <option value="Permuta">Permuta </option>
                            <option value="Posesión">Posesión </option>
                            <option value="Remate">Remate </option>
                            <option value="Prescripción">Prescripción </option>
                            <option value="Expropiación">Expropiación </option>
                            <option value="Otros">Otros </option>
                                    
                        </select> </td>
                        </tr>

                    </p>
                    <br/>
        </div>
    </center>

    <ContenedorBotonCentrado>
        <h3>Datos de Predio sin Título</h3>
        <br/>
            <label for="adquisicion_sin_titulo" style={{ fontWeight:'900' }}>Forma de Adquisición:</label>                            
                            <tr>                            
                            <select 
                                className="custom-select"
                                id="adquisicion_sin_titulo" 
                                name="adquisicion_sin_titulo"
                                value= {adquisicion_sin_titulo}
                                onChange = {(e) => {
                                const adquisicionSeleccionado = e.target.value;
                                cambiarAdquisicionSinTitulo({campo: adquisicionSeleccionado});
                                }} 
                            >
                        
                            <option value={adquisicion_sin_titulo.campo} checked>{adquisicion_sin_titulo.campo}</option>
                            <option value="" disabled>----------</option>
                            
                            <option value="Sucesión de posesión">Sucesión de posesión </option>
                            <option value="Cesión de posesión">Cesión de posesión </option>
                            <option value="Posesión individual">Posesión individual </option>
                            <option value="Otros">Otros </option>
                                    
                        </select> </tr>
                        
    </ContenedorBotonCentrado>

    <center>
        <div style={{marginLeft: '-6rem' }}>
            <br/>                        
                        <tr>
                        <label for="requiere_perfeccionamiento" style={{ fontWeight:'900' }}>Requiere perfeccionamiento:</label>               
                            <td>
                            <select 
                                className="custom-select"
                                id="requiere_perfeccionamiento" 
                                name="requiere_perfeccionamiento" 
                                value= {requiere_perfeccionamiento}
                                onChange = {(e) => {
                                const perfeccionamientoSeleccionado = e.target.value;
                                cambiarRequierePerfeccionamiento({campo: perfeccionamientoSeleccionado});
                                }} 
                            >
                        
                            <option value={requiere_perfeccionamiento.campo} checked>{requiere_perfeccionamiento.campo}</option>
                            <option value="" disabled>----------</option>
                            
                            <option value="Si">Si </option>
                            <option value="No">No </option>
                                    
                        </select> </td>
                        </tr>

                        <tr>                
                        <td> 
                        <label style={{ fontWeight:'900' }}>Años sin perfeccionamiento:</label>
                        <NumericInput 
                            className="form-control" 
                            value={ anios_sin_perfeccionamiento.campo } 
                            min={ 0 } 
                            max={ 5000 } 
                            step={ 1 } 
                            precision={ 0 } 
                            size={ 4 }                         
                            strict
                            style={{
                                wrap: {
                                    background: '#E2E2E2',
                                    boxShadow: '0 0 1px 1px #fff inset, 1px 1px 5px -1px #000',
                                    
                                    borderRadius: '6px 3px 3px 6px',
                                    fontSize: 18
                                },
                                input: {
                                    borderRadius: '4px 2px 2px 4px',
                                    color: 'black',
                                    padding: '0.1ex 1ex',
                                    border: '1px solid #ccc',
                                    marginRight: 4,
                                    display: 'block',
                                    fontWeight: 80,
                                    
                                },
                                'input:focus' : {
                                    border: '1px inset #69C',
                                    outline: 'none'
                                },
                                arrowUp: {
                                    borderBottomColor: 'black'
                                },
                                arrowDown: {
                                    borderTopColor: 'black'
                                }
                            }}
                        />

                        </td>
                                           
                        <td> 
                        <label style={{ fontWeight:'900' }}>Años en posesión:</label>
                        <NumericInput 
                            className="form-control" 
                            value={ anios_posesion.campo } 
                            min={ 0 } 
                            max={ 5000 } 
                            step={ 1 } 
                            precision={ 0 } 
                            size={ 4 }                         
                            strict
                            style={{
                                wrap: {
                                    background: '#E2E2E2',
                                    boxShadow: '0 0 1px 1px #fff inset, 1px 1px 5px -1px #000',
                                    
                                    borderRadius: '6px 3px 3px 6px',
                                    fontSize: 18
                                },
                                input: {
                                    borderRadius: '4px 2px 2px 4px',
                                    color: 'black',
                                    padding: '0.1ex 1ex',
                                    border: '1px solid #ccc',
                                    marginRight: 4,
                                    display: 'block',
                                    fontWeight: 80,
                                    
                                },
                                'input:focus' : {
                                    border: '1px inset #69C',
                                    outline: 'none'
                                },
                                arrowUp: {
                                    borderBottomColor: 'black'
                                },
                                arrowDown: {
                                    borderTopColor: 'black'
                                }
                            }}
                        />
                        </td> 
                        </tr>                       
                        <br/>
                    
        </div>
    </center>

    <center>
        <div style={{marginLeft: '-5rem' }}>
                                                             
                <p>                    
                    <ComponenteInput
                        estado={pueblo_etnia}
                        cambiarEstado={cambiarPuebloEtnia}
                        tipo= "text"
                        label="Pueblo o Etnia"
                        placeholder= ""
                        name = "pueblo_etnia"
                        leyendaError = "Solo letras. Puede llevar acentos"
                        expresionRegular = {expresiones.nombre}                
                    /> 
                                                                                                                
                    <ComponenteInput
                        estado={documento_presentado}
                        cambiarEstado={cambiarDocumentoPresentado}
                        tipo= "text"
                        label="Documento presentado"
                        placeholder= "Documento de adquisición presentado"
                        name = "doc_presentado"
                        leyendaError = "Letras y números"
                        expresionRegular = {expresiones.usuario}                
                    />
                    
                </p>
        </div>
    </center>

    <ContenedorBotonCentrado>
        <h3>Identificación del Posesionario</h3>
    </ContenedorBotonCentrado>

    <center>
        <div style={{marginLeft: '-6rem' }}>
                <p>                    
                    <br/>  
                    <ComponenteInput
                        estado={primer_apellido_posesionario}
                        cambiarEstado={cambiarPrimerApellidoPosesionario}
                        tipo= "text"
                        label="Primer Apellido"
                        placeholder= "Primer apellido del posesionario"
                        name = "apellido1"
                        leyendaError = "Solo letras. Puede llevar acentos"
                        expresionRegular = {expresiones.nombre}                
                    /> 
                    <ComponenteInput
                        estado={segundo_apellido_posesionario}
                        cambiarEstado={cambiarSegundoApellidoPosesionario}
                        tipo= "text"
                        label="Segundo Apellido"
                        placeholder= "Segundo apellido del posesionario"
                        name = "apellido2"
                        leyendaError = "Solo letras. Puede llevar acentos"
                        expresionRegular = {expresiones.nombre}                
                    /> 
                    <ComponenteInput
                        estado={primer_nombre_posesionario}
                        cambiarEstado={cambiarPrimerNombrePosesionario}
                        tipo= "text"
                        label="Primer Nombre"
                        placeholder= "Primer nombre del posesionario"
                        name = "nombre1"
                        leyendaError = "Solo nombres. Puede llevar acentos"
                        expresionRegular = {expresiones.nombre}                
                    /> 
                    <ComponenteInput
                        estado={segundo_nombre_posesionario}
                        cambiarEstado={cambiarSegundoNombrePosesionario}
                        tipo= "text"
                        label="Segundo nombre"
                        placeholder= "Segundo nombre del posesionario"
                        name = "nombre2"
                        leyendaError = "Solo letras. Puede llevar acentos"
                        expresionRegular = {expresiones.nombre}                
                    /> 
                </p>
                <br/>                
        </div>
    </center>

    <center>
        <div style={{marginLeft: '-5rem' }}>
                <br/>  
                <br/>                     
                <p>
                    <tr>    
                    <label for="tipo_documento_posesionario" style={{ fontWeight:'900' }}>Tipo de documento:</label>
                        <td>
                        <select 
                            className="custom-select"
                            id="tipo_documento_posesionario" 
                            name="tipo_documento_posesionario" 
                            value= {tipo_documento_posesionario}
                            onChange = {(e) => {
                            const docSeleccionado = e.target.value;
                            cambiarTipoDocumentoPosesionario({campo: docSeleccionado});
                            }} 
                        >
                    
                        <option value={tipo_documento_posesionario.campo} checked>{tipo_documento_posesionario.campo}</option>
                        <option value="" disabled>----------</option>
                                                    
                        <option value="Cédula">Cédula </option>
                        <option value="Pasaporte">Pasaporte </option>
                                
                    </select> </td>
                    </tr>
                    
                    <ComponenteInput
                        estado={identificacion_posesionario}
                        cambiarEstado={cambiarIdentificacionPosesionario}
                        tipo= "text"
                        label="Cédula"
                        placeholder= "Número de C.I. del posesionario"
                        name = "id_posesionario"
                        leyendaError = "Solo números"
                        expresionRegular = {expresiones.cedula}                
                    /> 
                    <ComponenteInput
                        estado={email_posesionario}
                        cambiarEstado={cambiarEmailPosesionario}
                        tipo= "email"
                        label="Placa predial"
                        placeholder= "Ej: correo@correo.com"
                        name = "email_posesionario"
                        leyendaError = "El correo solo puede contener letras y números (4-16 dígitos)"
                        expresionRegular = {expresiones.correo}                
                    /> 
                    <ComponenteInput
                        estado={telefono_posesionario}
                        cambiarEstado={cambiarTelefonoPosesionario}
                        tipo= "text"
                        label="Teléfono"
                        placeholder= "Número de teléfono posesionario"
                        name = "telefono_posesionario"
                        leyendaError = "Solo número de 7-14 dígitos"
                        expresionRegular = {expresiones.telefono}                
                    />

                </p>
        </div>
    </center>
        <br/>
                <ContenedorBotonCentrado>                
                    <Boton type="submit">Enviar</Boton>
                </ContenedorBotonCentrado>
            </Formulario>
        </main>
        </div>
    )

}


export default EstatusLegal;
