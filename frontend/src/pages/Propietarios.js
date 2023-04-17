import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NumericInput from 'react-numeric-input';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
//import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faIdCard } from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const Propietarios = () => {
    
    
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

    //console.log(id)
    //console.log(clave)
    
    const baseUrl='http://localhost/apicatastro/index.php/propietarios/?id='+id; //'http://f0783168.xsph.ru/index.php/propietarios/?id='+id;
       
    const [predio, cambiarPredio] = useState({campo: '', valido: null});
    const [catastro, cambiarCatastro] = useState({campo: '', valido: null});
    
    const [password, cambiarPassword] = useState({campo: '', valido: null});
    const [password2, cambiarPassword2] = useState({campo: '', valido: null});
    const [correo, cambiarCorreo] = useState({campo: '', valido: null});

    
    const [cedula, cambiarCedula] = useState({campo: '', valido: null}); // Input
    const [tipo, cambiarTipo] = useState({campo: '', valido: null}); // Select
    const [primer_apellido, cambiarPrimerApellido] = useState({campo: '', valido: null}); //Input
    const [segundo_apellido, cambiarSegundoApellido] = useState({campo: '', valido: null});// Input
    const [primer_nombre, cambiarPrimerNombre] = useState({campo: '', valido: null});// Input
    const [segundo_nombre, cambiarSegundoNombre] = useState({campo: '', valido: null});// Input
    const [tipo_documento, cambiarTipoDocumento] = useState({campo: '', valido: null}); //Select
    const [estado_civil, cambiarEstadoCivil] = useState({campo: '', valido: null}); // Select
    const [porcentaje_prt, cambiarPorcentajePrt] = useState({campo: '', valido: null}); // Input number entero 0-100
    const [representante, cambiarRepresentante] = useState({campo: '', valido: null}); //Select
    const [anio_nacimiento, cambiarAnioNacimiento] = useState({campo: '', valido: null});// Select
    const [mes_nacimiento, cambiarMesNacimiento] = useState({campo: '', valido: null});// Select
    const [dia_nacimiento, cambiarDiaNacimiento] = useState({campo: '', valido: null});//Select
    const [nacionalidad, cambiarNacionalidad] = useState({campo: '', valido: null});// Input
    const [email, cambiarEmail] = useState({campo: '', valido: null});// Input email validacion
    const [telefono, cambiarTelefono] = useState({campo: '', valido: null});// Input solo numerico enteros positivos
    const [ciudad_domicilio, cambiarCiudadDomicilio] = useState({campo: '', valido: null}); // // Input
    const [dir_domicilio, cambiarDirDomicilio] = useState({campo: '', valido: null}); // Input
    const [jefe_hogar, cambiarJefeHogar] = useState({campo: '', valido: null}); //Select Si/NO 
    const [personeria, cambiarPersoneria] = useState({campo: '', valido: null}); // Select 
    const [ruc, cambiarRuc] = useState({campo: '', valido: null}); // Input numerico solo enteros positivos 10 digitos
    const [razon_social, cambiarRazonSocial] = useState({campo: '', valido: null});//Input
    
    const [inscrito, cambiarInscrito] = useState({campo: '', valido: null}); //Select (ministerio, superintendencia)
    const [lugarInscripcion, cambiarLugarInscripcion] = useState({campo: '', valido: null}); //Input
    const [representante_legal, cambiarRepLegal] = useState({campo: '', valido: null}); //Input nombres
    const [docRepresentante, cambiarDocRepresentante] = useState({campo: '', valido: null});
    const [idRepresentante, cambiarIDRepresentante] = useState({campo: '', valido: null});
    const [emailRepresentante, cambiarEmailRepresentante] = useState({campo: '', valido: null});
    const [telefonoRepresentante, cambiarTelefonoRepresentante] = useState({campo: '', valido: null});

    const [acuerdo, cambiarAcuerdo] = useState({campo: '', valido: null});  // Input
    
    const [conyugue, cambiarConyugue] = useState({campo: '', valido: null}); // Select Si-No (habilita text datos conyugue)
    const [apellidos_conyugue, cambiarApellidosConyugue] = useState({campo: '', valido: null}); // Input
    const [nombres_conyugue, cambiarNombresConyugue] = useState({campo: '', valido: null}); //Input
    const [doc_conyugue, cambiarDocConyugue] = useState({campo: '', valido: null}); //Select
    const [id_conyugue, cambiarIdConyugue] = useState({campo: '', valido: null}); // Input
    const [telefono_conyugue, cambiarTelefonoConyugue] = useState({campo: '', valido: null}); //Input
    const [porcentaje_conyugue, cambiarPorcentajeConyugue] = useState({campo: '', valido: null}); //Input number entero positivo 0-100
    const [email_conyugue, cambiarEmailConyugue] = useState({campo: '', valido: null}); // Input email validacion

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
    ruc: /^\d{10,13}$/ // 10 a 13 numeros.
	}


    const peticionGet=async()=>{
        const response = await axios.get(baseUrl) 

            cambiarCedula({campo: response.data[0].identificacion});
            cambiarTipo({campo: response.data[0].tipo});
            cambiarPrimerApellido({campo: response.data[0].primer_apellido});
            cambiarSegundoApellido({campo: response.data[0].segundo_apellido});
            cambiarPrimerNombre({campo: response.data[0].primer_nombre});
            cambiarSegundoNombre({campo: response.data[0].segundo_nombre});
            cambiarTipoDocumento({campo: response.data[0].documento_tipo});
            cambiarEstadoCivil({campo: response.data[0].estado_civil});
            cambiarPorcentajePrt({campo: response.data[0].porcentaje_participacion});
            cambiarRepresentante({campo: response.data[0].representante});
            cambiarAnioNacimiento({campo: response.data[0].anio_nacimiento});
            cambiarMesNacimiento({campo: response.data[0].mes_nacimiento});
            cambiarDiaNacimiento({campo: response.data[0].dia_nacimiento});
            cambiarNacionalidad({campo: response.data[0].nacionalidad});
            cambiarEmail({campo: response.data[0].email});
            cambiarTelefono({campo: response.data[0].telefono});
            cambiarCiudadDomicilio({campo: response.data[0].ciudad_domicilio});
            cambiarDirDomicilio({campo: response.data[0].direccion_domicilio});
            cambiarJefeHogar({campo: response.data[0].jefe_hogar});
            cambiarPersoneria({campo: response.data[0].p_juridica});
            cambiarRuc({campo: response.data[0].ruc});
            cambiarRazonSocial({campo: response.data[0].razon_social});
            cambiarAcuerdo({campo: response.data[0].acuerdo_reg});
            cambiarRepLegal({campo: response.data[0].representante_legal});
            cambiarConyugue({campo: response.data[0].conyugue});
            cambiarApellidosConyugue({campo: response.data[0].conyugue_apellidos});
            cambiarNombresConyugue({campo: response.data[0].conyugue_nombres});
            cambiarDocConyugue({campo: response.data[0].conyugue_doc});
            cambiarIdConyugue({campo: response.data[0].conyugueid});
            cambiarTelefonoConyugue({campo: response.data[0].conyugue_telf});
            cambiarPorcentajeConyugue({campo: response.data[0].conyugue_participacion});
            cambiarEmailConyugue({campo: response.data[0].conyugue_email});

            cambiarInscrito({campo: response.data[0].inscrito});   //inscrito
            cambiarLugarInscripcion({campo: response.data[0].lugar_inscripcion});   //lugarInscripcion            
            cambiarDocRepresentante({campo: response.data[0].doc_representante});  //docRepresentante
            cambiarIDRepresentante({campo: response.data[0].idrepresentante});  //idRepresentante
            cambiarEmailRepresentante({campo: response.data[0].email_representante});  //emailRepresentante
            cambiarTelefonoRepresentante({campo: response.data[0].telf_representante});  //telefonoRepresentante
            
    }

    //Función PUT
 const putUsoPropietarios=async()=>{
    const propietario = {
        identificacion: cedula.campo,
        tipo: tipo.campo,
        primer_apellido: primer_apellido.campo,
        segundo_apellido: segundo_apellido.campo,
        primer_nombre: primer_nombre.campo,
        segundo_nombre: segundo_nombre.campo,
        documento_tipo: tipo_documento.campo,
        estado_civil: estado_civil.campo,
        porcentaje_participacion: porcentaje_prt.campo,
        representante: representante.campo,
        anio_nacimiento: anio_nacimiento.campo,
        mes_nacimiento: mes_nacimiento.campo,
        dia_nacimiento: dia_nacimiento.campo,
        nacionalidad: nacionalidad.campo,
        email: email.campo,
        telefono: telefono.campo,
        ciudad_domicilio: ciudad_domicilio.campo,
        direccion_domicilio: dir_domicilio.campo,
        jefe_hogar: jefe_hogar.campo,
        p_juridica: personeria.campo,
        ruc: ruc.campo,
        razon_social: razon_social.campo,
        inscrito: inscrito.campo,
        lugar_inscripcion: lugarInscripcion.campo,
        acuerdo_reg: acuerdo.campo,
        representante_legal: representante_legal.campo,
        doc_representante: docRepresentante.campo,
        idrepresentante: idRepresentante.campo,
        email_representante: emailRepresentante.campo,
        telf_representante: telefonoRepresentante.campo,
        conyugue: conyugue.campo,
        conyugue_apellidos: apellidos_conyugue.campo,
        conyugue_nombres: nombres_conyugue.campo,
        conyugue_doc: doc_conyugue.campo,
        conyugueid: id_conyugue.campo,
        conyugue_telf: telefono_conyugue.campo,
        conyugue_participacion: porcentaje_conyugue.campo,
        conyugue_email: email_conyugue.campo

    } 
    
    await axios.put('http://localhost/apicatastro/index.php/propietarios/actualizar?id='+id, propietario)
    .then(response=>{
        
            cambiarCedula({campo: propietario.identificacion});
            cambiarTipo({campo: propietario.tipo});
            cambiarPrimerApellido({campo: propietario.primer_apellido});
            cambiarSegundoApellido({campo: propietario.segundo_apellido});
            cambiarPrimerNombre({campo: propietario.primer_nombre});
            cambiarSegundoNombre({campo: propietario.segundo_nombre});
            cambiarTipoDocumento({campo: propietario.documento_tipo});
            cambiarEstadoCivil({campo: propietario.estado_civil});
            cambiarPorcentajePrt({campo: propietario.porcentaje_participacion});
            cambiarRepresentante({campo: propietario.representante});
            cambiarAnioNacimiento({campo: propietario.anio_nacimiento});
            cambiarMesNacimiento({campo: propietario.mes_nacimiento});
            cambiarDiaNacimiento({campo: propietario.dia_nacimiento});
            cambiarNacionalidad({campo: propietario.nacionalidad});
            cambiarEmail({campo: propietario.email});
            cambiarTelefono({campo: propietario.telefono});
            cambiarCiudadDomicilio({campo: propietario.ciudad_domicilio});
            cambiarDirDomicilio({campo: propietario.direccion_domicilio});
            cambiarJefeHogar({campo: propietario.jefe_hogar});
            cambiarPersoneria({campo: propietario.p_juridica});
            cambiarRuc({campo: propietario.ruc});
            cambiarRazonSocial({campo: propietario.razon_social});
            cambiarAcuerdo({campo: propietario.acuerdo_reg});
            cambiarRepLegal({campo: propietario.representante_legal});
            cambiarConyugue({campo: propietario.conyugue});
            cambiarApellidosConyugue({campo: propietario.conyugue_apellidos});
            cambiarNombresConyugue({campo: propietario.conyugue_nombres});
            cambiarDocConyugue({campo: propietario.conyugue_doc});
            cambiarIdConyugue({campo: propietario.conyugueid});
            cambiarTelefonoConyugue({campo: propietario.conyugue_telf});
            cambiarPorcentajeConyugue({campo: propietario.conyugue_participacion});
            cambiarEmailConyugue({campo: propietario.conyugue_email});
            cambiarInscrito({campo: propietario.inscrito});   
            cambiarLugarInscripcion({campo: propietario.lugar_inscripcion});   
            cambiarDocRepresentante({campo: propietario.doc_representante});  
            cambiarIDRepresentante({campo: propietario.idrepresentante});  
            cambiarEmailRepresentante({campo: propietario.email_representante}); 
            cambiarTelefonoRepresentante({campo: propietario.telf_representante});
        
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
        //password.valido === 'true' &&
        //password2.valido === 'true' &&
        //correo.valido === 'true' &&
        terminos
     ){         
        // CONEXION CRUD (PETICIONES AJAX/HTTP)
        putUsoPropietarios();
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


    return (
        <main>              
            <h1><b>Propietario <FontAwesomeIcon icon={faIdCard}/></b></h1> 
            <br/>
            
            <Formulario action="" onSubmit={onSubmit}> 

            <ContenedorBotonCentrado>
            <p>
                <hr/>
                <tr>                    
                <td><b>Personería:</b></td>
                    <td>
                    <select 
                        className="custom-select"
                        id="tipo" 
                        name="tipo"
                        value= {tipo}
                        onChange = {(e) => {
                            const tipoSeleccionado = e.target.value;
                            cambiarTipo({campo: tipoSeleccionado});
                            }} 
                        >
                                
                    <option value={tipo.campo} checked>{tipo.campo}</option>
                    <option value="" disabled>----------</option>                
                                    
                    <option value="Natural">Natural </option>
                    <option value="Jurídica">Jurídica </option>
                    <option value="Posesionario">Posesionario </option>
                            
                </select> </td>
                </tr>
                <hr/>
            </p>
            </ContenedorBotonCentrado> 

        <center>            
        <div> 
              <p>
                <ComponenteInput
                    estado={cedula}
                    cambiarEstado={cambiarCedula}
                    tipo= "text"
                    label="Cedula"
                    placeholder= "Ingrese el número de cedula"
                    name = "cedula"
                    leyendaError = "La cédula debe poseer solo números (10 dígitos)"
                    expresionRegular = {expresiones.cedula}                
                />
      <br/>
      
                
                  <ComponenteInput
                    estado={primer_apellido}
                    cambiarEstado={cambiarPrimerApellido}
                    tipo= "text"
                    label="Primer apellido"
                    placeholder= "Ingrese el primer apellido"
                    name = "apellido1"
                    leyendaError = "Letras y espacios. Puede llevar acentos"
                    expresionRegular = {expresiones.nombre}
                                   
                />

                <ComponenteInput
                    estado={segundo_apellido}
                    cambiarEstado={cambiarSegundoApellido}
                    tipo= "text"
                    label="Segundo apellido"
                    placeholder= "Ingrese el segundo apellido"
                    name = "apellido2"
                    leyendaError = "Letras y espacios. Puede llevar acentos"
                    expresionRegular = {expresiones.nombre}
                    
                />    
          

                <ComponenteInput
                    estado={primer_nombre}
                    cambiarEstado={cambiarPrimerNombre}
                    tipo= "text"
                    label="Primer nombre"
                    placeholder= "Ingrese el primer nombre"
                    name = "nombre1"
                    leyendaError = "Letras y espacios. Puede llevar acentos"
                    expresionRegular = {expresiones.nombre}               
                />                 

                <ComponenteInput
                    estado={segundo_nombre}
                    cambiarEstado={cambiarSegundoNombre}
                    tipo= "text"
                    label="Segundo nombre"
                    placeholder= "Ingrese el segundo nombre"
                    name = "nombre2"
                    leyendaError = "Letras y espacios. Puede llevar acentos"
                    expresionRegular = {expresiones.nombre}                
                />
                <br/>
                </p>
                </div>
            
                
                <div>  
                    <br/>          
                
              
                    <td><b>Fecha de Nacimiento:</b></td>

                    <p >
                    
                    <td>Dia:</td>
                    <td>
                    <select 
                        className="custom-select"
                        id="dia_nacimiento" 
                        name="dia_nacimiento" 
                        value= {dia_nacimiento}
                        onChange = {(e) => {
                            const diaSeleccionado = e.target.value;
                            cambiarDiaNacimiento({campo: diaSeleccionado});
                            }} 
                        >
                                
                        <option value={dia_nacimiento.campo} checked>{dia_nacimiento.campo}</option>
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
                
                        <center>                
                        
                        <tr>
                        <td>Mes:</td>
                        <td>
                        <select 
                            className="custom-select"
                            id="mes_nacimiento"
                            name="mes_nacimiento"
                            value= {mes_nacimiento}
                            onChange = {(e) => {
                                const mesSeleccionado = e.target.value;
                                cambiarMesNacimiento({campo: mesSeleccionado});
                            }} 
                        >                        
                        <option value={mes_nacimiento.campo} checked>{mes_nacimiento.campo}</option>
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

                        </center>

                        
                        <tr>
                        <td>Año:</td>
                        <td>
                        <select 
                            className="custom-select"
                            id="anio_nacimiento"
                            name="anio_nacimiento"
                            value= {anio_nacimiento}
                            onChange = {(e) => {
                                const anioSeleccionado = e.target.value;
                                cambiarAnioNacimiento({campo: anioSeleccionado});
                            }} 
                        >                        
                        <option value={anio_nacimiento.campo} checked>{anio_nacimiento.campo}</option>
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
                        <option value="2019">2018</option>
                        <option value="2020">2018</option>
                        <option value="2021">2018</option>
                        <option value="2022">2018</option>
                        </select> </td>
                        </tr>

                    </p>  
                    <br/>                    
                    <br/> 
                    </div>
                    
                    <div>              
                    <p>

                    <label><b>Porcentaje de participación (%)</b></label> <td> 

                    <NumericInput 
                        className="form-control" 
                        value={ porcentaje_prt } 
                        min={ 0 } 
                        max={ 100 } 
                        step={ 1 } 
                        precision={ 0 } 
                        size={ 6 }                         
                        strict
                        style={{
                            wrap: {
                                background: '#E2E2E2',
                                boxShadow: '0 0 1px 1px #fff inset, 1px 1px 5px -1px #000',
                                
                                borderRadius: '6px 3px 3px 6px',
                                fontSize: 30
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
                    </p>
                    <br/>
		    </div> 
        </center>      

      <center>
        <div>
            <br/>             
            <p>          
                <tr>                          
                <td>Representante:</td>
                    <td>
                    <select 
                        className="custom-select"
                        id="representante" 
                        name="representante" 
                        value= {representante}
                        onChange = {(e) => {
                            const representanteSeleccionado = e.target.value;
                            cambiarRepresentante({campo: representanteSeleccionado});
                            }} 
                        >
                                
                    <option value={representante.campo} checked>{representante.campo}</option>
                    <option value="" disabled>----------</option>                                
                                    
                    <option value="Si">Si </option>
                    <option value="No">No </option>
                            
                </select> </td>
                </tr>
            </p>                  

            <tr>    
          
            <td>Tipo de documento:</td>
            <td>
              <select 
                className="custom-select"
                id="tipo_documento" 
                name="tipo_documento"
                value= {tipo_documento}
                onChange = {(e) => {
                    const docSeleccionado = e.target.value;
                    cambiarTipoDocumento({campo: docSeleccionado});
                    }} 
                >
                        
            <option value={tipo_documento.campo} checked>{tipo_documento.campo}</option>
            <option value="" disabled>----------</option>                                             
                              
            <option value="Cédula">Cédula </option>
            <option value="Pasaporte">Pasaporte </option>
                       
           </select> </td>
          </tr>
                
          <tr>    
          
           <td>Estado civil:</td>
            <td>
              <select 
                className="custom-select"
                id="estado_civil" 
                name="estado_civil" 
                value= {estado_civil}
                onChange = {(e) => {
                    const estadoSeleccionado = e.target.value;
                    cambiarEstadoCivil({campo: estadoSeleccionado});
                    }} 
                >
                        
            <option value={estado_civil.campo} checked>{estado_civil.campo}</option>
            <option value="" disabled>----------</option>
                              
            <option value="Soltero">Soltero </option>
            <option value="Casado">Casado </option>
            <option value="Divorciado">Divorciado </option>
            <option value="Viudo">Viudo </option>
            <option value="Unión de hecho">Unión de hecho </option>
                       
           </select> </td>
           </tr> 
           <br/>
             
             <p>
               <ComponenteInput
                   estado={nacionalidad}
                   cambiarEstado={cambiarNacionalidad}
                   tipo= "text"
                   label="Nacionalidad"
                   placeholder= "Ingrese la nacionalidad del propietario"
                   name = "nacionalidad"
                   leyendaError = "Letras y espacios. Puede llevar acentos"
                   expresionRegular = {expresiones.nombre}                
               /> 
               <ComponenteInput
                   estado={email}
                   cambiarEstado={cambiarEmail}
                   tipo= "email"
                   label="Email"
                   placeholder= "correo@ejemplo.com"
                   name = "email"
                   leyendaError = "El correo solo puede contener letras y números (4-16 dígitos)"
                   expresionRegular = {expresiones.correo}                
               /> 
               <ComponenteInput
                   estado={telefono}
                   cambiarEstado={cambiarTelefono}
                   tipo= "text"
                   label="Telefono"
                   placeholder= "Ej: 0992992094"
                   name = "telefono"
                   leyendaError = "Solo de 7-14 digitos numéricos "
                   expresionRegular = {expresiones.telefono}                
               /> 
               
               </p>   
                 <br/>
               <p>
               
               <ComponenteInput
                   estado={ciudad_domicilio}
                   cambiarEstado={cambiarCiudadDomicilio}
                   tipo= "text"
                   label="Ciudad"
                   placeholder= "Ingrese ciudad de residencia"
                   name = "ciudad"
                   leyendaError = "Letras y números. Puede llevar acentos"
                   expresionRegular = {expresiones.usuario}                
               /> 
               <ComponenteInput
                   estado={dir_domicilio}
                   cambiarEstado={cambiarDirDomicilio}
                   tipo= "text"
                   label="Domicilio"
                   placeholder= "Ingrese la dirección del domicilio"
                   name = "domicilio"
                   leyendaError = "Letras y espacios. Puede llevar acentos"
                   expresionRegular = {expresiones.usuario}                
               /> 
               
               </p>   

                   <br/>
                             
                   <p> 
                   <tr> 
                   <br/>
                     <td>¿Es jefe de hogar?:</td>
                       <td>
                         <select 
                           className="custom-select"
                           id="jefe_hogar" 
                           name="jefe_hogar"
                           value= {jefe_hogar}
                           onChange = {(e) => {
                               const jefeSeleccionado = e.target.value;
                               cambiarJefeHogar({campo: jefeSeleccionado});
                           }} 
                       >                        
                       <option value={jefe_hogar.campo} checked>{jefe_hogar.campo}</option>
                       <option value="" disabled>----------</option>      
                                         
                       <option value="Si">Si </option>
                       <option value="No">No </option>
                                 
                     </select> </td>
                     </tr>
                   </p> 
        </div>

      </center>

      <ContenedorBotonCentrado>
            <p>
                <br/>
                <hr/>
                <tr>    
                <br/>
                <td><b>Personería jurídica:</b></td>
                    <td>
                    <select 
                        className="custom-select"
                        id="personeria" 
                        name="personeria"
                        value= {personeria}
                        onChange = {(e) => {
                            const personeriaSeleccionada = e.target.value;
                            cambiarPersoneria({campo: personeriaSeleccionada});
                            }} 
                        >
                                
                    <option value={personeria.campo} checked>{personeria.campo}</option>
                    <option value="" disabled>----------</option>                
                                    
                    <option value="Privada">Privada </option>
                    <option value="Pública">Pública </option>
                </select> </td>
                </tr>
                <hr/>
            </p>
      </ContenedorBotonCentrado>

      <center>
        <div>
            <br/>            
            
                <ComponenteInput
                    estado={ruc}
                    cambiarEstado={cambiarRuc}
                    tipo= "number"
                    label="R.U.C."
                    placeholder= "Ej: 17653673001"
                    name = "ruc"
                    leyendaError = "El RUC solo puede contener números (13 dígitos)"
                    expresionRegular = {expresiones.ruc}  // Solo enteros positivos              
                /> 
                <ComponenteInput
                    estado={razon_social}
                    cambiarEstado={cambiarRazonSocial}
                    tipo= "text"
                    label="Razón social"
                    placeholder= "Ingrese la razón social"
                    name = "razon_social"
                    leyendaError = "Letras y espacios."
                    expresionRegular = {expresiones.nombre}                
                />

                <p>
                    <br/>                    
                    <tr>    
                    <br/>
                    <td>Inscrito en :</td>
                        <td>
                        <select 
                            className="custom-select"
                            id="inscrito" 
                            name="inscrito"
                            value= {inscrito}
                            onChange = {(e) => {
                                const inscritoSeleccionado = e.target.value;
                                cambiarInscrito({campo: inscritoSeleccionado});
                                }} 
                            >
                                    
                        <option value={inscrito.campo} checked>{inscrito.campo}</option>
                        <option value="" disabled>----------</option>                
                                        
                        <option value="Ministerio">Ministerio </option>
                        <option value="Superintendencia">Superintendencia </option>
                    </select> </td>
                    </tr>
                </p>
        </div>
    </center>

    <center>
        <div>
            <br/>                           
                <ComponenteInput
                    estado={lugarInscripcion}
                    cambiarEstado={cambiarLugarInscripcion}
                    tipo= "text"
                    label="Lugar Inscripción"
                    placeholder= "Lugar de inscripción"
                    name = "lugar_inscripcion"
                    leyendaError = "Letras y espacios."
                    expresionRegular = {expresiones.nombre}                
                />

                <ComponenteInput
                    estado={acuerdo}
                    cambiarEstado={cambiarAcuerdo}
                    tipo= "text"
                    label="Número de Acuerdo o Registro"
                    placeholder= "Ingrese el número de registro"
                    name = "acuerdo"
                    leyendaError = ""
                    expresionRegular =""  //{expresiones.correo}                
                />

                <ComponenteInput
                    estado={representante_legal}
                    cambiarEstado={cambiarRepLegal}
                    tipo= "text"
                    label="Representante legal"
                    placeholder= "Ingrese los nombres del representante legal"
                    name = "rep_legal"
                    leyendaError = "Letras y espacios"
                    expresionRegular = {expresiones.nombre}                
                /> 
                <br/>
                <br/>
</div>
</center>
<ContenedorBotonCentrado>
    <h3>Datos del cónyugue</h3>
</ContenedorBotonCentrado>

<center>
    <div>
                <ComponenteInput
                    estado={apellidos_conyugue}
                    cambiarEstado={cambiarApellidosConyugue}
                    tipo= "text"
                    label="Apellidos cónyugue"
                    placeholder= "Ingrese los apellidos del cónyugue"
                    name = "apellidos_conyugue"
                    leyendaError = "Letras y espacios"
                    expresionRegular = {expresiones.nombre}                
                /> 
                <ComponenteInput
                    estado={nombres_conyugue}
                    cambiarEstado={cambiarNombresConyugue}
                    tipo= "text"
                    label="Nombres cónyugue"
                    placeholder= "Ingrese los nombres del cónyugue"
                    name = "nombres_conyugue"
                    leyendaError = "Letras y espacios"
                    expresionRegular = {expresiones.nombre}                
                /> 
                <ComponenteInput
                    estado={id_conyugue}
                    cambiarEstado={cambiarIdConyugue}
                    tipo= "text"
                    label="Cédula cónyugue"
                    placeholder= "Ingrese el número de C.I. del cónyugue"
                    name = "cedula_conyugue"
                    leyendaError = "Solo números (10 digitos)"
                    expresionRegular = {expresiones.cedula}                
                /> 
                
                <br/>

        </div>
      </center>

      <center>
          <div>
                <ComponenteInput
                    estado={telefono_conyugue}
                    cambiarEstado={cambiarTelefonoConyugue}
                    tipo= "text"
                    label="Teléfono cónyugue"
                    placeholder= "Ingrese el número telefónico del cónyugue"
                    name = "telefono_conyugue"
                    leyendaError = "Solo debe contener números (7-14 dígitos)"
                    expresionRegular = {expresiones.telefono}                
                /> 

                <ComponenteInput
                    estado={email_conyugue}
                    cambiarEstado={cambiarEmailConyugue}
                    tipo= "email"
                    label="Émail cónyugue"
                    placeholder= "correo@ejemplo.com"
                    name = "email_conyugue"
                    leyendaError = "El correo solo puede contener letras y números (4-16 dígitos)"
                    expresionRegular = {expresiones.correo}                
                />

                <br/>
                <label><b>Porcentaje de participación (%)</b></label> <td> 

                <NumericInput 
                    className="form-control" 
                    value={ porcentaje_conyugue } 
                    min={ 0 } 
                    max={ 100 } 
                    step={ 1 } 
                    precision={ 0 } 
                    size={ 6 }                    
                    strict
                    style={{
                        wrap: {
                            background: '#E2E2E2',
                            boxShadow: '0 0 1px 1px #fff inset, 1px 1px 5px -1px #000',
                            
                            borderRadius: '6px 3px 3px 6px',
                            fontSize: 30
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
          </div>
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


export default Propietarios;
