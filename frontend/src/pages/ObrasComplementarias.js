import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { faClipboardList, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

//import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const ObrasComplementarias = () => {

   
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

    

    //const urlInsertar = 'http://apicatastro/obras/nuevo?id=';
    const baseUrl='http://apicatastro/obras/?id='+id;
    const [data, setData]=useState([]);
        
    //const [id_caracteristicas, cambiarIdCaracteristicas] = useState({campo: '', valido: null});
	//const [clave_catastral, cambiarClaveCatastral] = useState({campo: '', valido: null}); 

    const [id_obra, cambiarIdObra] = useState({campo: '', valido: null});   
    const [clave_predio, cambiarClavePredio] = useState ({campo: '', valido: null}); 
    const [idubicacion, cambiarIdUbicacion] = useState ({campo: '', valido: null}); 
    const [idinfraestructura, cambiarIdInfraestructura] = useState ({campo: '', valido: null}); 
    const [tipo_obra, cambiarTipoObra] = useState ({campo: '', valido: null}); 
    const [dimension_a, cambiarDimension_a] = useState ({campo: '', valido: null}); 
    const [dimension_b, cambiarDimension_b] = useState ({campo: '', valido: null}); 
    const [dimension_c, cambiarDimension_c] = useState ({campo: '', valido: null}); 
    const [cantidad_metros, cambiarCantidadMetros] = useState ({campo: '', valido: null}); 
    const [material, cambiarMaterial] = useState ({campo: '', valido: null}); 
    const [edad, cambiarEdad] = useState ({campo: '', valido: null}); 
    const [estado, cambiarEstado] = useState ({campo: '', valido: null}); 

    const [obraSeleccionada, setObraSeleccionada] = useState(null);         
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
           
    const [terminos, cambiarTerminos] = useState(false);
    const [formularioValido, cambiarFormularioValido] = useState(null);

    const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{1,40}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        edad: /^\d{1,5}$/, // 1 a 5 numeros.
        dimension: /^\d*(\.\d{1})?\d{0,2}$/ // 1 a 10 numeros.
	}
    

const onChangeTerminos = (e) => {
    cambiarTerminos(e.target.checked); 
}

const abrirCerrarModalInsertar=()=>{
    nuevoFormulario();
    setModalInsertar(!modalInsertar);
}

const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
}

const abrirCerrarModalEliminar=()=>{
   setModalEliminar(!modalEliminar);
}

const soporte=(id)=>{
    
    window.location.href='./soporte/:'+id;//+predioSeleccionado.idpredio;
}

const peticionGet=async()=>{
    const response = await axios.get(baseUrl); 
    setData(response.data);
    cambiarClavePredio({campo: response.data[0].clave_predio});
}

const postObra=async()=>{
    
    await axios.post(baseUrl,obraSeleccionada)
    .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        peticionGet();
    }).catch(error=>{
        console.error(error);
    });
}

const putObra=async()=>{
            
    await axios.put('http://apicatastro/investigacion/actualizar?id='+obraSeleccionada.id, obraSeleccionada)    //f, {params:{id: predioSeleccionado.id}})
    .then(response=>{
        var dataNueva=data;
        dataNueva.map(predio=>{
        
        })
        setData(dataNueva); 

        abrirCerrarModalEditar();
        peticionGet();
    }).catch(error=>{
        console.error(error);
    });
}

const deleteObra=async()=>{
    await axios.delete('http://apicatastro/investigacion/eliminar?id='+obraSeleccionada.id)
    .then(response=>{
        setData(data.filter(predio=>predio.idpredio!==obraSeleccionada.id))
        abrirCerrarModalEliminar();
        peticionGet();
    })

}



const seleccionarObra=(obra, caso)=>{
    //setInvestigacionSeleccionada(investigacion);
    
    cambiarIdObra({campo:obra.idobras, valido: true}); 
    //cambiarClavePredio({campo:obra.tipo_informante, valido: true}); 
    //cambiarIdUbicacion({campo:obra.apellidos_informante, valido: true});
    //cambiarIdInfraestructura({campo:obra.nombre_informante, valido: true});
    cambiarTipoObra({campo:obra.tipo_obra, valido: true});
    cambiarDimension_a({campo:obra.dimension_a, valido: true});
    cambiarDimension_b({campo:obra.dimension_b, valido: true});
    cambiarDimension_c({campo:obra.dimension_c, valido: true});
    cambiarCantidadMetros({campo:obra.cantidad_metros, valido: true});
    cambiarMaterial({campo:obra.material, valido: true});
    cambiarEdad({campo:obra.edad, valido: true});
    cambiarEstado({campo:obra.estado, valido: true});
        
    switch(caso){

        case "Editar":  abrirCerrarModalEditar();
                        break;  
        case "Eliminar":  abrirCerrarModalEliminar();
                        break; 
    }            

}

const nuevoFormulario=()=>{
    cambiarIdObra({campo:'', valido: null}); 
    //cambiarClavePredio({campo:obra.tipo_informante, valido: true}); 
    //cambiarIdUbicacion({campo:obra.apellidos_informante, valido: true});
    //cambiarIdInfraestructura({campo:obra.nombre_informante, valido: true});
    cambiarTipoObra({campo:'', valido: null});
    cambiarDimension_a({campo:'', valido: null});
    cambiarDimension_b({campo:'', valido: null});
    cambiarDimension_c({campo:'', valido: null});
    cambiarCantidadMetros({campo:'', valido: null});
    cambiarMaterial({campo:'', valido: null});
    cambiarEdad({campo:'', valido: null});
    cambiarEstado({campo:'', valido: null});
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
        }

    },[])


    return (
        <main>
            <h1><b>Obras complementarias 🚏</b></h1> 
            <br/>
            <label>Clave Catastral: <b>{clave_predio.campo}</b></label> <td> </td>                                          
            <center>
                <button className="btn btn-success btn-lg" onClick={()=>abrirCerrarModalInsertar()} >Nueva obra 📤</button> 
            </center>    
            <br/>
            
            <Formulario action="" onSubmit={onSubmit}>

            <div class="center-block fix-width scroll-inner" style={{textAlign: 'center'}}>                                              
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th style={{position: 'sticky', left: 0, top: 0, padding: '40px'}}><b>ID Obra</b></th>                            
                            <th>Tipo de obra</th>
                            <th colspan="3"><h6><b>Dimensiones (m)</b></h6>
                            <center>
                            <tr>                                 
                            <th style={{paddingLeft: '25px', width: '130px'}}>a</th>
                            <th style={{paddingLeft: '30px', width: '130px'}}>b</th>
                            <th style={{paddingLeft: '25px', width: '130px'}}>c</th>                                           
                            </tr>
                            </center>
                            </th>

                            <th>Cantidad (m/m²/m³)</th>                            
                            
                            <th>Material</th>
                            <th>Edad</th>
                            <th>Estado</th>

                            <th>ACCIONES</th>                                                   

                        </tr>
                    </thead>
                    <tbody>
                        {data.map(obra=>(
                            
                                
                                    <tr key={obra.idobras}>
                                        <td style={{position: 'sticky', top: 130, left: 0, padding: '45px', verticalAlign:'middle', background: '#eee'}}    >{obra.idobras}</td>                                        
                                        <td style={{padding: '45px',verticalAlign:'middle'}}>{obra.tipo_obra}</td>
                                        <td style={{padding: '40px',verticalAlign:'middle'}}>{obra.dimension_a}</td>
                                        <td style={{padding: '20px',verticalAlign:'middle'}}>{obra.dimension_b}</td>
                                        <td style={{padding: '30px',verticalAlign:'middle'}}>{obra.dimension_c}</td>
                                        <td style={{padding: '45px',verticalAlign:'middle'}}>{obra.cantidad_metros}</td>
                                        <td style={{padding: '45px',verticalAlign:'middle'}}>{obra.material}</td>
                                        <td style={{padding: '45px',verticalAlign:'middle'}}>{obra.edad}</td>
                                        <td style={{padding: '45px',verticalAlign:'middle'}}>{obra.estado}</td>
                                        

                                    <td>
                                        <button className="btn btn-primary btn-md" onClick={()=>seleccionarObra(obra,"Editar")}><b>Editar</b><FontAwesomeIcon icon={faEdit}/></button>
                                        <button className="btn btn-danger btn-md" onClick={()=>seleccionarObra(obra,"Eliminar")}><b>Eliminar</b><FontAwesomeIcon icon={faTrashAlt}/></button>  
                                                                                
                                    </td>
                                </tr>
                            
                        ))}
                        
                    </tbody>                    
                </table>
            </div>
            </Formulario>

            <Modal isOpen={modalInsertar}>
                            
                        <ModalHeader><b>Insertar nueva obra</b></ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="id">ID Obra: </label>
                                    <br/>
                                    <input type="text" className="form-control" name="id" id="id" readOnly /> 
                                    <br/>

                                    <center>
                
                                    <div id="contenedor">
                                        <br/>
                                    <p>
                                        <tr>    
                                        
                                        <br/>
                                        <br/>
                                            <td><b>Tipo de Obra:</b></td>&nbsp;&nbsp;
                                            <td>
                                            <select 
                                                className="custom-select" 
                                                id="tipo" 
                                                name="tipo" 
                                                value = {tipo_obra}
                                                onChange = {(e) => {
                                                    const tipoSeleccionado = e.target.value;
                                                    cambiarTipoObra(tipoSeleccionado);
                                                }} 
                                            >
                                    
                                            <option value="" selected >----------</option>
                                            <option value="No tiene">No tiene</option>
                                            <option value="Aceras y cercas">Aceras y cercas</option>
                                            <option value="Canal de riego ocasional">Canal de riego ocasional</option>
                                            <option value="Canal de riego permanente">Canal de riego permanente</option>
                                            <option value="Cerramiento">Cerramiento</option>
                                            <option value="Desecación de pantanos">Desecación de pantanos</option>
                                            <option value="Establo">Establo</option>
                                            <option value="Estanque/Reservorio">Estanque/Reservorio</option>
                                            <option value="Funiculares">Funiculares</option>
                                            <option value="Galpón avícola">Galpón avícola</option>
                                            <option value="Invernaderos">Invernaderos</option>
                                            <option value="Muro de contención">Muro de contención</option>
                                            <option value="Parques-jardines">Parques-jardines</option>
                                            <option value="Piscina camaronera">Piscina camaronera</option>
                                            <option value="Piscina piscícola">Piscina piscícola</option>
                                            <option value="Piscinas de natación">Piscinas de natación</option>
                                            <option value="Pista de aterrizaje">Pista de aterrizaje</option>
                                            <option value="Planta de pos cosecha">Planta de pos cosecha</option>
                                            <option value="Pozo de riego">Pozo de riego</option>
                                            <option value="Rellenos de quebradas">Rellenos de quebradas</option>
                                            <option value="Repavimentación urbana">Repavimentación urbana</option>
                                            <option value="Sala de ordeño">Sala de ordeño</option>
                                            <option value="Sitio/Almacenamientos">Sitio/Almacenamientos</option>
                                            <option value="Tendales">Tendales</option>
                                            <option value="Vías internas">Vías internas</option>
                                            <option value="Viveros">Viveros</option>
                                            <option value="Otros">Otros</option>
                                            <option value="Cancha">Cancha</option>
                                            <option value="Parqueaderos">Parqueaderos</option>
                                            <option value="Cubiertas-entechados">Cubiertas-entechados</option>
                                            
                                            </select> </td>
                                        </tr>
                                    </p>

                                    <br/>

                                    <p>
                                    
                                    <ComponenteInput
                                        estado={dimension_a}
                                        cambiarEstado={cambiarDimension_a}
                                        tipo= "text"
                                        label="Dimensión a"
                                        placeholder= "Valor de 'a'"
                                        name = "dimension_a"
                                        leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                        expresionRegular = {expresiones.dimension}                
                                    /> 
                                    <ComponenteInput
                                        estado={dimension_b}
                                        cambiarEstado={cambiarDimension_b}
                                        tipo= "text"
                                        label="Dimensión b"
                                        placeholder= "Valor de 'b'"
                                        name = "dimension_b"
                                        leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                        expresionRegular = {expresiones.dimension}                
                                    /> 
                                    <ComponenteInput
                                        estado={dimension_c}
                                        cambiarEstado={cambiarDimension_c}
                                        tipo= "text"
                                        label="Dimensión c"
                                        placeholder= "Valor de 'c'"
                                        name = "dimension_c"
                                        leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                        expresionRegular = {expresiones.dimension}                
                                    /> 

                                    <ComponenteInput
                                        estado={cantidad_metros}
                                        cambiarEstado={cambiarCantidadMetros}
                                        tipo= "text"
                                        label="Cantidad m/m²/m³"
                                        placeholder= "Metros de construcción"
                                        name = "cantidad"
                                        leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                        expresionRegular = {expresiones.dimension}                
                                    /> 
                                    
                                    </p>
                                    
                                </div>

                                <br/>

                                <div id="contenedor2">
                                    <br/>

                                    <br/>  
                                    <h5>Material:</h5>
                                    <p>
                                        
                                    <tr>
                                            
                                            <td>
                                            <br/>    
                                            <select 
                                                class="form-select form-select-sm"                                                  
                                                id="material" 
                                                name="material"
                                                value = {material}
                                                onChange = {(e) => {
                                                    const materialSeleccionado = e.target.value;
                                                    cambiarMaterial(materialSeleccionado);
                                                }}
                                            >

                                            <option value="" >----------</option>
                                            <option value="Bloque">Bloque</option>
                                            <option value="Ladrillo">Ladrillo</option>
                                            <option value="Metal">Metal</option>
                                            <option value="Hormigón armado">Hormigón armado</option>
                                            <option value="Mixto">Mixto</option>
                                            <option value="Bloque/Ladrillo + Columna hormigón">Bloque/Ladrillo + Columna hormigón</option>
                                            <option value="Muro Bloque/Ladrillo + Columna hormigón + malla">Muro Bloque/Ladrillo + Columna hormigón + malla</option>
                                            <option value="Malla simple">Malla simple</option>
                                            <option value="Malla electrosoldada">Malla electrosoldada</option>
                                            <option value="Muro bloque/ladrillo + verjas de hierro">Muro bloque/ladrillo + verjas de hierro</option>
                                            <option value="Verjas de hierro">Verjas de hierro</option>            
                                            </select> </td>
                                        </tr>
                                    </p>
                                    <br/>
                                    <p>
                                        <ComponenteInput
                                            estado={edad}
                                            cambiarEstado={cambiarEdad}
                                            tipo= "text"
                                            label="Edad"
                                            placeholder= "Número de Años"
                                            name = "edad"
                                            leyendaError = "Valores enteros hasta 5 dígitos numéricos "
                                            expresionRegular = {expresiones.edad}                
                                        />                     
                                    
                                    </p>   
                                    <br/>  
                                    <p>
                                            
                                            <tr>
                                            <td><b>Estado:</b></td>&nbsp;&nbsp;&nbsp;
                                            <td>
                                            <select 
                                                class="form-select form-select-lg mb-3" 
                                                className="custom-select" 
                                                id="estado" 
                                                name="estado"
                                                value = {estado}
                                                onChange = {(e) => {
                                                    const estadoSeleccionado = e.target.value;
                                                    cambiarEstado(estadoSeleccionado);
                                                }}
                                            >

                                            <option value="" >----------</option>
                                            <option value="Muy bueno">Muy bueno</option>
                                            <option value="Bueno">Bueno</option>
                                            <option value="Regular">Regular</option>
                                            <option value="Malo">Malo</option>
                                                    
                                            </select> </td>
                                        </tr>
                                    </p>                    
                                        
                                </div>                
                              

                            </center>
                            <br/>


                                </div>

                            </ModalBody>
                        <ModalFooter>
                    
                                    <button className="btn btn-primary" onClick={()=>postObra()} >Insertar</button>{"  "}                  
                    
                                    <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>                   
                    
                        </ModalFooter>
            </Modal>

            <br/>


            <Modal isOpen={modalEditar}>
                <ModalHeader><b>Editar Obra</b></ModalHeader>
                <ModalBody>
                    {
                        //cambiarTipoInformante({campo: , valido: null}),         
                        //cambiarApellidosInformante({campo: '', valido: null})
                    }

                    <div className="form-group">
                                 
                                    <div className="form-group">
                                    <label htmlFor="id">ID Investigación: {id_obra.campo} </label>
                                    
                                    <input type="text" className="form-control" name="id" id="id" value={id_obra.campo} readOnly /> 
                                    
                                        <br/>
                                        <br/>
                                        
                                    <center>
                
                                    <div id="contenedor">
                                        <br/>
                                    <p>
                                        <tr>    
                                        
                                        <br/>
                                        <br/>
                                            <td><b>Tipo de Obra:</b></td>&nbsp;&nbsp;
                                            <td>
                                            <select 
                                                className="custom-select" 
                                                id="tipo"
                                                name="tipo" 
                                                value = {tipo_obra}
                                                onChange = {(e) => {
                                                    const tipoSeleccionado = e.target.value;
                                                    cambiarTipoObra(tipoSeleccionado);
                                                }} 
                                                
                                                
                                            >
                                            <option value={tipo_obra.campo}>{tipo_obra.campo}</option>
                                            <option value="" disabled>----------</option>
                                            <option value="No tiene">No tiene</option>
                                            <option value="Aceras y cercas">Aceras y cercas</option>
                                            <option value="Canal de riego ocasional">Canal de riego ocasional</option>
                                            <option value="Canal de riego permanente">Canal de riego permanente</option>
                                            <option value="Cerramiento">Cerramiento</option>
                                            <option value="Desecación de pantanos">Desecación de pantanos</option>
                                            <option value="Establo">Establo</option>
                                            <option value="Estanque/Reservorio">Estanque/Reservorio</option>
                                            <option value="Funiculares">Funiculares</option>
                                            <option value="Galpón avícola">Galpón avícola</option>
                                            <option value="Invernaderos">Invernaderos</option>
                                            <option value="Muro de contención">Muro de contención</option>
                                            <option value="Parques-jardines">Parques-jardines</option>
                                            <option value="Piscina camaronera">Piscina camaronera</option>
                                            <option value="Piscina piscícola">Piscina piscícola</option>
                                            <option value="Piscinas de natación">Piscinas de natación</option>
                                            <option value="Pista de aterrizaje">Pista de aterrizaje</option>
                                            <option value="Planta de pos cosecha">Planta de pos cosecha</option>
                                            <option value="Pozo de riego">Pozo de riego</option>
                                            <option value="Rellenos de quebradas">Rellenos de quebradas</option>
                                            <option value="Repavimentación urbana">Repavimentación urbana</option>
                                            <option value="Sala de ordeño">Sala de ordeño</option>
                                            <option value="Sitio/Almacenamientos">Sitio/Almacenamientos</option>
                                            <option value="Tendales">Tendales</option>
                                            <option value="Vías internas">Vías internas</option>
                                            <option value="Viveros">Viveros</option>
                                            <option value="Otros">Otros</option>
                                            <option value="Cancha">Cancha</option>
                                            <option value="Parqueaderos">Parqueaderos</option>
                                            <option value="Cubiertas-entechados">Cubiertas-entechados</option>
                                            
                                            </select> </td>
                                        </tr>
                                    </p>

                                    <br/>

                                    <p>
                                    
                                    <ComponenteInput
                                        estado={dimension_a}
                                        cambiarEstado={cambiarDimension_a}
                                        tipo= "text"
                                        label="Dimensión a"
                                        placeholder= "Valor de 'a'"
                                        name = "dimension_a"
                                        leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                        expresionRegular = {expresiones.dimension}                
                                    /> 
                                    <ComponenteInput
                                        estado={dimension_b}
                                        cambiarEstado={cambiarDimension_b}
                                        tipo= "text"
                                        label="Dimensión b"
                                        placeholder= "Valor de 'b'"
                                        name = "dimension_b"
                                        leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                        expresionRegular = {expresiones.dimension}                
                                    /> 
                                    <ComponenteInput
                                        estado={dimension_c}
                                        cambiarEstado={cambiarDimension_c}
                                        tipo= "text"
                                        label="Dimensión c"
                                        placeholder= "Valor de 'c'"
                                        name = "dimension_c"
                                        leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                        expresionRegular = {expresiones.dimension}                
                                    /> 

                                    <ComponenteInput
                                        estado={cantidad_metros}
                                        cambiarEstado={cambiarCantidadMetros}
                                        tipo= "text"
                                        label="Cantidad m/m²/m³"
                                        placeholder= "Metros de construcción"
                                        name = "cantidad"
                                        leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                        expresionRegular = {expresiones.dimension}                
                                    /> 
                                    
                                    </p>
                                    
                                </div>

                                <br/>

                                <div id="contenedor2">
                                    <br/>

                                    <br/>  
                                    <h5>Material:</h5>
                                    <p>
                                        
                                    <tr>
                                            
                                            <td>
                                            <br/>    
                                            <select 
                                                class="form-select form-select-sm" 
                                                id="material" 
                                                name="material"
                                                
                                                value = {material}
                                                onChange = {(e) => {
                                                    const materialSeleccionado = e.target.value;
                                                    cambiarMaterial(materialSeleccionado);
                                                }} 
                                            >

                                            <option value={material.campo} selected >{material.campo}</option>
                                            <option value="" disabled>------------------------------------</option>
                                            <option value="Bloque">Bloque</option>
                                            <option value="Ladrillo">Ladrillo</option>
                                            <option value="Metal">Metal</option>
                                            <option value="Hormigón armado">Hormigón armado</option>
                                            <option value="Mixto">Mixto</option>
                                            <option value="Bloque/Ladrillo + Columna hormigón">Bloque/Ladrillo + Columna hormigón</option>
                                            <option value="Muro Bloque/Ladrillo + Columna hormigón + malla">Muro Bloque/Ladrillo + Columna hormigón + malla</option>
                                            <option value="Malla simple">Malla simple</option>
                                            <option value="Malla electrosoldada">Malla electrosoldada</option>
                                            <option value="Muro bloque/ladrillo + verjas de hierro">Muro bloque/ladrillo + verjas de hierro</option>
                                            <option value="Verjas de hierro">Verjas de hierro</option>            
                                            </select> </td>
                                        </tr>
                                    </p>
                                    <br/>
                                    <p>
                                        <ComponenteInput
                                            estado={edad}
                                            cambiarEstado={cambiarEdad}
                                            tipo= "text"
                                            label="Edad"
                                            placeholder= "Número de Años"
                                            name = "edad"
                                            leyendaError = "Valores enteros hasta 5 dígitos numéricos "
                                            expresionRegular = {expresiones.edad}                
                                        />                     
                                    
                                    </p>   
                                    <br/>  
                                    <p>
                                            
                                            <tr>
                                            <td><b>Estado:</b></td>&nbsp;&nbsp;&nbsp;
                                            <td>
                                            <select 
                                                class="form-select form-select-lg mb-3" 
                                                id="estado" 
                                                name="estado"
                                                className="custom-select" 
                                                value = {estado}
                                                onChange = {(e) => {
                                                    const estadoSeleccionado = e.target.value;
                                                    cambiarEstado(estadoSeleccionado);
                                                }} 


                                            >

                                            <option value={estado.campo} >{estado.campo}</option>
                                            <option value="" disabled>-------------</option>
                                            <option value="Muy bueno">Muy bueno</option>
                                            <option value="Bueno">Bueno</option>
                                            <option value="Regular">Regular</option>
                                            <option value="Malo">Malo</option>
                                                    
                                            </select> </td>
                                        </tr>
                                    </p>                    
                                        
                                </div>                
                              

                            </center>
                            <br/>




                        </div>

                    </div>
                </ModalBody>
                <ModalFooter>
                    
                    {/* <button className="btn btn-primary" onClick={()=>putInvestigacion()}>Editar</button>{"  "} */}

                    {/*
                        formularioValido === false && <MensajeError>
                        <p>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <b>Error: </b> Por favor rellena correctamente el formulario. 
                        </p>                    
                        </MensajeError>
                    */}
                
                    <Boton type="submit" onClick={()=>putObra()}><b>Enviar</b></Boton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {formularioValido === true && <MensajeExito> Formulario enviado exitosamente! </MensajeExito>}
                

                    <button className="btn btn-danger btn-md" onClick={()=>abrirCerrarModalEditar()}><b>Cancelar</b></button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro de eliminar este registro {obraSeleccionada && obraSeleccionada.clavecatastral}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>deleteObra()}>
                        Si
                    </button>
                    <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>
                        No
                    </button>
                </ModalFooter>            
            </Modal>


        </main>
    )
}

export default ObrasComplementarias;
