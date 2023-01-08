import React, {useState, useEffect, Component} from 'react';
//import { MDBDataTable } from 'mdbreact';
import { useLocation } from 'react-router-dom';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
//import { render } from '@testing-library/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const InvestigacionPredial = () => {

    
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

        
    const baseUrl='http://apicatastro/investigacion/?id='+id;
    //const urlInsertar = 'http://apicatastro/investigacion/nuevo?id=';
    const [data, setData]=useState([]);       

    const [idinvestigacion_predial, cambiarIdInvestigacionPredial] = useState({campo: '', valido: null}); 
    const [clave_predio, cambiarClavePredio] = useState({campo: '', valido: null}); 
    const [tipo_informante, cambiarTipoInformante] = useState({campo: '', valido: null}); 
    const [apellidos_informante, cambiarApellidosInformante] = useState({campo: '', valido: null}); 
    const [nombre_informante, cambiarNombreInformante] = useState({campo: '', valido: null}); 
    const [telefono_informante, cambiarTelefonoInformante] = useState({campo: '', valido: null}); 
    const [email_informante, cambiarEmailInformante] = useState({campo: '', valido: null}); 
    const [propietario_desconocido, cambiarPropietarioDesconocido] = useState({campo: '', valido: null}); 
    const [otra_fuente_informacion, cambiarOtraFuenteInformacion] = useState({campo: '', valido: null}); 
    const [dimensiones_terreno_irregular, cambiarDimensionesTerrenoIrregular] = useState({campo: '', valido: null}); 
    const [linderos_definidos, cambiarLinderosDefinidos] = useState({campo: '', valido: null}); 
    const [nuevo_bloque_numero, cambiarNuevoBloqueNumero] = useState({campo: '', valido: null}); 
    const [ampliacion_bloque_numero, cambiarAmpliacionBloqueNumero] = useState({campo: '', valido: null}); 
    const [nombre_actualizador, cambiarNombreActualizador] = useState({campo: '', valido: null}); 
    const [apellido_actualizador, cambiarApellidoActualizador] = useState({campo: '', valido: null}); 
    const [anio_actualizacion, cambiarAnioActualizacion] = useState({campo: '', valido: null}); 
    const [mes_actualizacion, cambiarMesActualizacion] = useState({campo: '', valido: null}); 
    const [dia_actualizacion, cambiarDiaActualizacion] = useState({campo: '', valido: null}); 
    const [cedula_actualizador, cambiarCedulaActualizador] = useState({campo: '', valido: null}); 
    const [firma_actualizador, cambiarFirmaActualizador] = useState({campo: '', valido: null}); 
    const [nombre_supervisor, cambiarNombreSupervisor] = useState({campo: '', valido: null}); 
    const [apellido_supervisor, cambiarApellidoSupervisor] = useState({campo: '', valido: null}); 
    const [cedula_supervisor, cambiarCedulaSupervisor] = useState({campo: '', valido: null}); 
    const [anio_supervision, cambiarAnioSupervision] = useState({campo: '', valido: null}); 
    const [mes_supervision, cambiarMesSupervision] = useState({campo: '', valido: null}); 
    const [dia_supervision, cambiarDiaSupervision] = useState({campo: '', valido: null}); 
    const [firma_supervisor, cambiarFirmaSupervisor] = useState({campo: '', valido: null}); 

    const [investigacionSeleccionada, setInvestigacionSeleccionada] = useState(null);
    
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    
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
    const response = await axios.get(baseUrl) 

    setData(response.data);
    cambiarClavePredio({campo: response.data[0].clave_predio});
    
    
}


const postInvestigacion=async()=>{
       
    await axios.post(baseUrl,investigacionSeleccionada)
    .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        peticionGet();
    }).catch(error=>{
        console.error(error);
    });
}

const putInvestigacion=async()=>{
    
    await axios.put('http://apicatastro/investigacion/actualizar?id='+investigacionSeleccionada.id, investigacionSeleccionada)    //f, {params:{id: predioSeleccionado.id}})
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

const deleteInvestigacion=async()=>{
    await axios.delete('http://apicatastro/investigacion/eliminar?id='+investigacionSeleccionada.id)
    .then(response=>{
        setData(data.filter(predio=>predio.idpredio!==investigacionSeleccionada.id))
        abrirCerrarModalEliminar();
        peticionGet();
    })

}




// **************************************************************************************

const seleccionarInvestigacion=(investigacion, caso)=>{
    //setInvestigacionSeleccionada(investigacion);
    cambiarIdInvestigacionPredial({campo:investigacion.idinvestigacion, valido: true}); 
    cambiarTipoInformante({campo:investigacion.tipo_informante, valido: true}); 
    cambiarApellidosInformante({campo:investigacion.apellidos_informante, valido: true});
    cambiarNombreInformante({campo:investigacion.nombre_informante, valido: true});
    cambiarTelefonoInformante({campo:investigacion.telefono_informante, valido: true});
    cambiarEmailInformante({campo:investigacion.email_informante, valido: true});
    cambiarPropietarioDesconocido({campo:investigacion.propietario_desconocido, valido: true});
    cambiarOtraFuenteInformacion({campo:investigacion.otra_fuente_informacion, valido: true});
    cambiarDimensionesTerrenoIrregular({campo:investigacion.dimensiones_terreno_irregular, valido: true});
    cambiarLinderosDefinidos({campo:investigacion.linderos_definidos, valido: true});
    cambiarNuevoBloqueNumero({campo:investigacion.nuevo_bloque_numero, valido: true});
    cambiarAmpliacionBloqueNumero({campo:investigacion.ampliacion_bloque_numero, valido: true});
    cambiarNombreActualizador({campo:investigacion.nombre_actualizador, valido: true});
    cambiarApellidoActualizador({campo:investigacion.apellido_actualizador, valido: true});
    cambiarAnioActualizacion({campo:investigacion.anio_actualizacion, valido: true});
    cambiarMesActualizacion({campo:investigacion.mes_actualizacion, valido: true});
    cambiarDiaActualizacion({campo:investigacion.dia_actualizacion, valido: true});
    cambiarCedulaActualizador({campo:investigacion.cedula_actualizador, valido: true});
    cambiarFirmaActualizador({campo:investigacion.firma_actualizador, valido: true});
    cambiarNombreSupervisor({campo:investigacion.nombre_supervisor, valido: true});
    cambiarApellidoSupervisor({campo:investigacion.apellido_supervisor, valido: true});
    cambiarCedulaSupervisor({campo:investigacion.cedula_supervisor, valido: true});
    cambiarAnioSupervision({campo:investigacion.anio_supervision, valido: true});
    cambiarMesSupervision({campo:investigacion.mes_supervision, valido: true});
    cambiarDiaSupervision({campo:investigacion.dia_supervision, valido: true});
    cambiarFirmaSupervisor({campo:investigacion.firma_supervisor, valido: true});

        
    switch(caso){

        case "Editar":  abrirCerrarModalEditar();
                        break;  
        case "Eliminar":  abrirCerrarModalEliminar();
                        break; 
    }            

}

const nuevoFormulario=()=>{
    cambiarIdInvestigacionPredial({campo:'', valido: null}); 
    cambiarTipoInformante({campo:'', valido: null}); 
    cambiarApellidosInformante({campo:'', valido: null});
    cambiarNombreInformante({campo:'', valido: null});
    cambiarTelefonoInformante({campo:'', valido: null});
    cambiarEmailInformante({campo:'', valido: null});
    cambiarPropietarioDesconocido({campo:'', valido: null});
    cambiarOtraFuenteInformacion({campo:'', valido: null});
    cambiarDimensionesTerrenoIrregular({campo:'', valido: null});
    cambiarLinderosDefinidos({campo:'', valido: null});
    cambiarNuevoBloqueNumero({campo:'', valido: null});
    cambiarAmpliacionBloqueNumero({campo:'', valido: null});
    cambiarNombreActualizador({campo:'', valido: null});
    cambiarApellidoActualizador({campo:'', valido: null});
    cambiarAnioActualizacion({campo:'', valido: null});
    cambiarMesActualizacion({campo:'', valido: null});
    cambiarDiaActualizacion({campo:'', valido: null});
    cambiarCedulaActualizador({campo:'', valido: null});
    cambiarFirmaActualizador({campo:'', valido: null});
    cambiarNombreSupervisor({campo:'', valido: null});
    cambiarApellidoSupervisor({campo:'', valido: null});
    cambiarCedulaSupervisor({campo:'', valido: null});
    cambiarAnioSupervision({campo:'', valido: null});
    cambiarMesSupervision({campo:'', valido: null});
    cambiarDiaSupervision({campo:'', valido: null});
    cambiarFirmaSupervisor({campo:'', valido: null});

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


    return (
        <main>
               <h1><b>Investigación predial 🕵</b></h1> 
              <br/>
              <label>Clave Catastral: <b>{clave_predio.campo}</b></label> <td> </td>                
              <br/>
              <center>
                <button className="btn btn-success btn-lg" onClick={()=>abrirCerrarModalInsertar()} >Nueva Investigación 📤</button> 
              </center>     
          
              <Formulario action="" onSubmit={onSubmit}>

              <div class="center-block fix-width scroll-inner" style={{textAlign: 'center'}}>                  
                <table className="table table-striped table-hover" >
                    <thead>
                        <tr>
                            <th style={{position: 'sticky', left: 0, top: 0, padding: '40px'}}><b>ID investigación</b></th>
                            
                            
                            <th colspan="5"><h5><b>Informante</b></h5>
                            <center>
                            <tr>     
                                
                            <th style={{paddingLeft: '90px', width: '200px'}}>Tipo</th>
                            <th style={{paddingLeft: '120px', width: '150px'}}>Apellidos</th>
                            <th style={{paddingLeft: '100px', width: '150px'}}>Nombres</th>
                            <th style={{paddingLeft: '90px', width: '150px'}}>Teléfono</th>
                            <th style={{paddingLeft: '70px', width: '180px'}}>Email</th>                            
                                
                            </tr>
                            </center>
                            </th>
                            
                            
                            <th>Propietario desconocido</th>
                            <th>Otra fuente de información</th>
                            <th>Dimensiones terreno irregular</th>
                            <th>Linderos definidos</th>
                            <th>Nuevo Bloque</th>
                            <th>Ampliación bloque</th>
                            
                            
                            <th colspan="4"><h5><b>Actualizador</b></h5>
                            
                            <tr>
                            <th style={{paddingLeft: '0px', width: '200px'}}>Nombre</th>
                            <th style={{paddingLeft: '20px', width: '100px'}}>Apellidos</th>                            
                            <th style={{paddingLeft: '130px', width: '200px'}}>Cédula</th>
                            <th style={{paddingLeft: '90px', width: '200px'}}>Firma</th>                            
                            </tr>
                            </th>
                            <th>Fecha de actualización</th>

                            <th colspan="4"><h5><b>Supervisor</b></h5>
                            <tr>
                            <th style={{paddingLeft: '0px', width: '200px'}}>Nombre</th>
                            <th style={{paddingLeft: '40px', width: '100px'}}>Apellidos</th>
                            <th style={{paddingLeft: '130px', width: '200px'}}>Cédula</th>                            
                            <th style={{paddingLeft: '90px', width: '200px'}}>Firma</th>
                            </tr>
                            
                            </th>

                            <th>Fecha de supervisión</th>
                            <th>ACCIONES</th>                                                   

                        </tr>
                    </thead>
                    <tbody>
                       {   
                            data.map(inv=>(
                                
                                        <tr key={inv.idinvestigacion}>
                                        <td style={{position: 'sticky', top: 130, left: 0, padding: '60px', paddingLeft:'70px', verticalAlign:'middle', background: '#eee'}} >{inv.idinvestigacion}</td>                                        
                                        
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'100px'}}>{inv.tipo_informante}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'60px'}}>{inv.apellidos_informante}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'60px'}}>{inv.nombre_informante}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.telefono_informante}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.email_informante}</td>
                                        
                                        
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.propietario_desconocido}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.otra_fuente_informacion}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.dimensiones_terreno_irregular}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.linderos_definidos}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.nuevo_bloque_numero}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.ampliacion_bloque_numero}</td>
                                        
                                        
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'80px'}}>{inv.nombre_actualizador}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'60px'}}>{inv.apellido_actualizador}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.cedula_actualizador}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.firma_actualizador}</td>

                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.dia_actualizacion + "/" + inv.mes_actualizacion + "/" + inv.anio_actualizacion}</td>
                                        
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'75px'}}>{inv.nombre_supervisor}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.apellido_supervisor}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.cedula_supervisor}</td>
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.firma_supervisor}</td>
                                        
                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{inv.dia_supervision + "/" + inv.mes_supervision + "/" + inv.anio_supervision}</td>

                                        <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>
                                        <button className="btn btn-primary btn-md" onClick={()=>seleccionarInvestigacion(inv,"Editar")}><b>Editar</b><FontAwesomeIcon icon={faEdit}/></button>
                                        <button className="btn btn-danger btn-md" onClick={()=>seleccionarInvestigacion(inv,"Eliminar")}><b>Eliminar</b><FontAwesomeIcon icon={faTrashAlt}/></button>  
                                                                                
                                    </td>
                                </tr>                            
                            ))
                        }
                        
                    </tbody>                    
                </table>

                </div>
                

                </Formulario>

                <Modal isOpen={modalInsertar}>
                        <ModalHeader>Insertar nueva investigación</ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="id">ID Investigación: </label>
                                    <br/>
                                    <input type="text" className="form-control" name="id" id="id" readOnly /> 
                                    
                                    <br/>
                                    <br/>
                                    <center>
                                        <h5><b>Informante</b></h5>
                                        <hr/>
                                        <br/>
                                        <td><b>Tipo :   </b>&nbsp;</td>
                                        <td>   
                                            <select 
                                                className="custom-select" 
                                                id="tipo_informante" 
                                                name="tipo_informante" 
                                                value = {tipo_informante}
                                                onChange = {(e) => {
                                                    const tipoSeleccionado = e.target.value;
                                                    cambiarTipoInformante(tipoSeleccionado);
                                                }}                                            
                                            >
                                                
                                                <option value="">----------</option>
                                                <option value="Arrendatario">Arrendatario</option>
                                                <option value="Ocupante familiar">Ocupante familiar</option>
                                                <option value="Vecino/Guía">Vecino/Guía</option>
                                                <option value="Sin informante">Sin informante</option>
                                                </select>   
                                                </td>
                                        </center>                         
                                    
                                    <br/>
                                        <ComponenteInput
                                        estado={apellidos_informante}
                                        cambiarEstado={cambiarApellidosInformante}
                                        tipo= "text"
                                        label="Apellidos "
                                        placeholder= ""
                                        name = "apellidos_informante"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                    
                                        <ComponenteInput
                                        estado={nombre_informante}
                                        cambiarEstado={cambiarNombreInformante}
                                        tipo= "text"
                                        label="Nombre "
                                        placeholder= ""
                                        name = "nombre_informante"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={telefono_informante}
                                        cambiarEstado={cambiarTelefonoInformante}
                                        tipo= "text"
                                        label="Teléfono "
                                        placeholder= ""
                                        name = "telefono_informante"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={email_informante}
                                        cambiarEstado={cambiarEmailInformante}
                                        tipo= "text"
                                        label="Email "
                                        placeholder= ""
                                        name = "email_informante"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                    <br/>
                                    <br/>
                                        <hr/>
                                    
                                            <center>
                                            <br/>                                                                                    
                                            <td><b>Propietario desconocido :   </b>&nbsp;</td>
                                            <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="propietario_desconocido" 
                                                    name="propietario_desconocido" 
                                                    value = {propietario_desconocido}
                                                    onChange = {(e) => {
                                                        const propietarioSeleccionado = e.target.value;
                                                        cambiarPropietarioDesconocido(propietarioSeleccionado);
                                                    }}                                            
                                                >
                                                    
                                                    
                                                    <option value="" >----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                                    </td>

                                            <br/>                                                                                    
                                            <td><b>Otra fuente de información :  </b>&nbsp;</td>
                                            <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="otra_fuente_informacion" 
                                                    name="otra_fuente_informacion" 
                                                    value = {otra_fuente_informacion}
                                                    onChange = {(e) => {
                                                        const fuenteSeleccionada = e.target.value;
                                                        cambiarOtraFuenteInformacion(fuenteSeleccionada);
                                                    }}                                            
                                                >
                                                    
                                                    <option value="">----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                                    </td>
                                            <br/>                                                                                    
                                            <td><b>Dimensiones de terreno irregular :  </b>&nbsp;</td>
                                            <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="dimensiones_terreno_irregular" 
                                                    name="dimensiones_terreno_irregular" 
                                                    value = {dimensiones_terreno_irregular}
                                                    onChange = {(e) => {
                                                        const dimensionesSeleccionada = e.target.value;
                                                        cambiarDimensionesTerrenoIrregular(dimensionesSeleccionada);
                                                    }}                                            
                                                >
                                                    
                                                    <option value="">----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                                    </td>
                                            <br/>                                                                                    
                                            <td><b>Linderos definidos :  </b>&nbsp;</td>
                                            <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="linderos_definidos" 
                                                    name="linderos_definidos" 
                                                    value = {linderos_definidos}
                                                    onChange = {(e) => {
                                                        const linderosSeleccionado = e.target.value;
                                                        cambiarLinderosDefinidos(linderosSeleccionado);
                                                    }}                                            
                                                >
                                                    
                                                    
                                                    <option value="" >----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                                    </td>
                                            <br/>   
                                            </center>        
                                    <br/>  
                                    <ComponenteInput
                                        estado={nuevo_bloque_numero}
                                        cambiarEstado={cambiarNuevoBloqueNumero}
                                        tipo= "text"
                                        label="Nuevo bloque número"
                                        placeholder= ""
                                        name = "nuevo_bloque_numero"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={ampliacion_bloque_numero}
                                        cambiarEstado={cambiarAmpliacionBloqueNumero}
                                        tipo= "text"
                                        label="Ampliación bloque número"
                                        placeholder= ""
                                        name = "ampliacion_bloque_numero"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                        <br/>
                                        <br/>
                                        <br/>
                                        <center>
                                        <h5><b>Actualizador</b></h5>                                        
                                        <hr/>
                                        </center>
                                    
                                        <ComponenteInput
                                        estado={nombre_actualizador}
                                        cambiarEstado={cambiarNombreActualizador}
                                        tipo= "text"
                                        label="Nombre :"
                                        placeholder= ""
                                        name = "nombre_actualizador"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={apellido_actualizador}
                                        cambiarEstado={cambiarApellidoActualizador}
                                        tipo= "text"
                                        label="Apellido :"
                                        placeholder= ""
                                        name = "apellido_actualizador"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                        <ComponenteInput
                                        estado={cedula_actualizador}
                                        cambiarEstado={cambiarCedulaActualizador}
                                        tipo= "text"
                                        label="Cédula :"
                                        placeholder= ""
                                        name = "cedula_actualizador"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                        
                                        <center>
                                        <br/>                                                                                    
                                        <td><b>Firma :  </b>&nbsp;</td>
                                        <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="firma_actualizador" 
                                                    name="firma_actualizador" 
                                                    value = {firma_actualizador}
                                                    onChange = {(e) => {
                                                        const firmaActualizadorSeleccionada = e.target.value;
                                                        cambiarFirmaActualizador(firmaActualizadorSeleccionada);
                                                    }}                                            
                                                >
                                                    
                                                    
                                                    <option value="" >----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                        </td>
                                        </center>
                                        <br/>
                                    
                                        <ComponenteInput
                                        estado={anio_actualizacion}
                                        cambiarEstado={cambiarAnioActualizacion}
                                        tipo= "text"
                                        label="Año de actualización"
                                        placeholder= ""
                                        name = "anio_actualizacion"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> &nbsp;&nbsp;&nbsp;
                                        <center>
                                          
                                        
                                            <tr>
                                            <td>Mes: &nbsp;</td>&nbsp;
                                            <td>
                                            <select className="custom-select" 
                                            id="mes_actualizacion" 
                                            name="mes_actualizacion" 
                                            value = {mes_actualizacion}
                                            onChange = {(e) => {
                                                const mesSeleccionado = e.target.value;
                                                cambiarMesActualizacion(mesSeleccionado);
                                            }}                                                             
                                            
                                            >                
                                            
                                            <option value="">----------</option>
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

                                            &nbsp;&nbsp;&nbsp;<td>Día: &nbsp;&nbsp;</td>
                                            <td>
                                            <select className="custom-select" 
                                            id="dia_actualizacion" 
                                            name="dia_actualizacion" 
                                            value = {dia_actualizacion}
                                            onChange = {(e) => {
                                                const diaSeleccionado = e.target.value;
                                                cambiarMesActualizacion(diaSeleccionado);
                                            }}                                                             
                                            
                                            >                
                                            
                                            <option value="" >----------</option>
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
                                        
                                    </center>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <center>
                                    <h5><b>Supervisor</b></h5>
                                    </center>
                                    <hr/>
                                    
                                        <ComponenteInput
                                        estado={nombre_supervisor}
                                        cambiarEstado={cambiarNombreSupervisor}
                                        tipo= "text"
                                        label="Nombre : "
                                        placeholder= ""
                                        name = "nombre_supervisor"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={apellido_supervisor}
                                        cambiarEstado={cambiarApellidoSupervisor}
                                        tipo= "text"
                                        label="Apellido :"
                                        placeholder= ""
                                        name = "apellido_supervisor"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={cedula_supervisor}
                                        cambiarEstado={cambiarCedulaSupervisor}
                                        tipo= "text"
                                        label="Cédula :"
                                        placeholder= ""
                                        name = "cedula_supervisor"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                        
                                        <center>
                                        <br/>                                                                                    
                                        <td><b>Firma :  </b>&nbsp;</td>
                                        <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="firma_supervisor" 
                                                    name="firma_supervisor" 
                                                    value = {firma_supervisor}
                                                    onChange = {(e) => {
                                                        const firmaSupervisorSeleccionada = e.target.value;
                                                        cambiarFirmaSupervisor(firmaSupervisorSeleccionada);
                                                    }}                                            
                                                >
                                                    
                                                    
                                                    <option value="" >----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                        </td>
                                        </center>
                                        <br/>
                                    
                                        <ComponenteInput
                                        estado={anio_supervision}
                                        cambiarEstado={cambiarAnioSupervision}
                                        tipo= "text"
                                        label="Año de supervisión"
                                        placeholder= ""
                                        name = "anio_supervision"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        />&nbsp;&nbsp;

                                        <center>
                                        
                                          <tr>
                                          <td>Mes: &nbsp;</td>&nbsp;
                                          <td>
                                          <select className="custom-select" 
                                          id="mes_supervision" 
                                          name="mes_supervision" 
                                          value = {mes_supervision}
                                          onChange = {(e) => {
                                              const mesSupervisionSeleccionado = e.target.value;
                                              cambiarMesSupervision(mesSupervisionSeleccionado);
                                          }}                                                             
                                          
                                          >                
                                          
                                          <option value="">----------</option>
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

                                          &nbsp;&nbsp;&nbsp;<td>Día: &nbsp;&nbsp;</td>
                                          <td>
                                          <select className="custom-select" 
                                          id="dia_supervision" 
                                          name="dia_supervision" 
                                          value = {dia_supervision}
                                          onChange = {(e) => {
                                              const diaSupervisionSeleccionado = e.target.value;
                                              cambiarDiaSupervision(diaSupervisionSeleccionado);
                                          }}                                                             
                                          
                                          >                
                                          
                                          <option value="">----------</option>
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
                                      
                                    </center>
                                    <br/>
                                     <label><b>Fecha de Supervisión:</b>&nbsp;&nbsp;</label>     
                                    <input type="date" name="fecha" min="1970-01-01" max="2018-05-25" step="1" value="2017-04-28"/>
                                    <br/>                                  

                                
                                </div>
                </ModalBody>
                <ModalFooter>
                    
                    <button className="btn btn-primary" onClick={()=>postInvestigacion()} >Insertar</button>{"  "}                  
                    
                    <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>                   
                    
                </ModalFooter>
            </Modal>


    
            <Modal isOpen={modalEditar}>
                <ModalHeader><b>Editar Investigación</b></ModalHeader>
                <ModalBody>
                    {
                        //cambiarTipoInformante({campo: , valido: null}),         
                        //cambiarApellidosInformante({campo: '', valido: null})
                    }

                    <div className="form-group">
                                 
                                    <div className="form-group">
                                    <label htmlFor="id">ID Investigación: {idinvestigacion_predial.campo} </label>
                                    
                                    <input type="text" className="form-control" name="id" id="id" value={idinvestigacion_predial.campo} readOnly /> 
                                    
                                        <br/>
                                        <br/>
                                        <center>
                                        <h5><b>Informante</b></h5>
                                        <hr/>
                                        <br/>
                                        <td><b>Tipo :   </b>&nbsp;</td>
                                        <td>   
                                            <select 
                                                className="custom-select" 
                                                id="tipo_informante" 
                                                name="tipo_informante" 
                                                value = {tipo_informante}
                                                onChange = {(e) => {
                                                    const tipoSeleccionado = e.target.value;
                                                    cambiarTipoInformante(tipoSeleccionado);
                                                }}                                            
                                            >
                                                <option value={tipo_informante.campo}>{tipo_informante.campo}</option>
                                                <option value="" disabled>----------</option>
                                                <option value="Arrendatario">Arrendatario</option>
                                                <option value="Ocupante familiar">Ocupante familiar</option>
                                                <option value="Vecino/Guía">Vecino/Guía</option>
                                                <option value="Sin informante">Sin informante</option>
                                                </select>   
                                                </td>
                                        </center>
                                        
                                        <ComponenteInput
                                        estado={apellidos_informante}
                                        cambiarEstado={cambiarApellidosInformante}
                                        tipo= "text"
                                        label="Apellidos: "
                                        placeholder= ""
                                        name = "apellidos_informante"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={nombre_informante}
                                        cambiarEstado={cambiarNombreInformante}
                                        tipo= "text"
                                        label="Nombre :"
                                        placeholder= ""
                                        name = "nombre_informante"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={telefono_informante}
                                        cambiarEstado={cambiarTelefonoInformante}
                                        tipo= "text"
                                        label="Teléfono :"
                                        placeholder= ""
                                        name = "telefono_informante"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={email_informante}
                                        cambiarEstado={cambiarEmailInformante}
                                        tipo= "text"
                                        label="Email :"
                                        placeholder= ""
                                        name = "email_informante"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                        <br/>
                                        <hr/>
                                    
                                            <center>
                                            <br/>                                                                                    
                                            <td><b>Propietario desconocido :   </b>&nbsp;</td>
                                            <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="propietario_desconocido" 
                                                    name="propietario_desconocido" 
                                                    value = {propietario_desconocido}
                                                    onChange = {(e) => {
                                                        const propietarioSeleccionado = e.target.value;
                                                        cambiarPropietarioDesconocido(propietarioSeleccionado);
                                                    }}                                            
                                                >
                                                    
                                                    <option value={propietario_desconocido.campo}>{propietario_desconocido.campo}</option>
                                                    <option value="" disabled>----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                                    </td>

                                            <br/>                                                                                    
                                            <td><b>Otra fuente de información :  </b>&nbsp;</td>
                                            <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="otra_fuente_informacion" 
                                                    name="otra_fuente_informacion" 
                                                    value = {otra_fuente_informacion}
                                                    onChange = {(e) => {
                                                        const fuenteSeleccionada = e.target.value;
                                                        cambiarOtraFuenteInformacion(fuenteSeleccionada);
                                                    }}                                            
                                                >
                                                    
                                                    <option value={otra_fuente_informacion.campo}>{otra_fuente_informacion.campo}</option>
                                                    <option value="" disabled>----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                                    </td>
                                            <br/>                                                                                    
                                            <td><b>Dimensiones de terreno irregular :  </b>&nbsp;</td>
                                            <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="dimensiones_terreno_irregular" 
                                                    name="dimensiones_terreno_irregular" 
                                                    value = {dimensiones_terreno_irregular}
                                                    onChange = {(e) => {
                                                        const dimensionesSeleccionada = e.target.value;
                                                        cambiarDimensionesTerrenoIrregular(dimensionesSeleccionada);
                                                    }}                                            
                                                >
                                                    
                                                    <option value={dimensiones_terreno_irregular.campo}>{dimensiones_terreno_irregular.campo}</option>
                                                    <option value="" disabled>----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                                    </td>
                                            <br/>                                                                                    
                                            <td><b>Linderos definidos :  </b>&nbsp;</td>
                                            <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="linderos_definidos" 
                                                    name="linderos_definidos" 
                                                    value = {linderos_definidos}
                                                    onChange = {(e) => {
                                                        const linderosSeleccionado = e.target.value;
                                                        cambiarLinderosDefinidos(linderosSeleccionado);
                                                    }}                                            
                                                >
                                                    
                                                    <option value={linderos_definidos.campo}>{linderos_definidos.campo}</option>
                                                    <option value="" disabled>----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                                    </td>
                                            <br/>   
                                            </center>        
                                            
                                    
                                        <ComponenteInput
                                        estado={nuevo_bloque_numero}
                                        cambiarEstado={cambiarNuevoBloqueNumero}
                                        tipo= "text"
                                        label="Nuevo bloque número"
                                        placeholder= ""
                                        name = "nuevo_bloque_numero"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={ampliacion_bloque_numero}
                                        cambiarEstado={cambiarAmpliacionBloqueNumero}
                                        tipo= "text"
                                        label="Ampliación bloque número"
                                        placeholder= ""
                                        name = "ampliacion_bloque_numero"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                        <br/>
                                        <br/>
                                        <center>
                                        <h5><b>Actualizador</b></h5>                                        
                                        <hr/>
                                        </center>
                                    
                                        <ComponenteInput
                                        estado={nombre_actualizador}
                                        cambiarEstado={cambiarNombreActualizador}
                                        tipo= "text"
                                        label="Nombre :"
                                        placeholder= ""
                                        name = "nombre_actualizador"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={apellido_actualizador}
                                        cambiarEstado={cambiarApellidoActualizador}
                                        tipo= "text"
                                        label="Apellido :"
                                        placeholder= ""
                                        name = "apellido_actualizador"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                        <ComponenteInput
                                        estado={cedula_actualizador}
                                        cambiarEstado={cambiarCedulaActualizador}
                                        tipo= "text"
                                        label="Cédula :"
                                        placeholder= ""
                                        name = "cedula_actualizador"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 

                                        <center>
                                        <br/>                                                                                    
                                        <td><b>Firma :  </b>&nbsp;</td>
                                        <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="firma_actualizador" 
                                                    name="firma_actualizador" 
                                                    value = {firma_actualizador}
                                                    onChange = {(e) => {
                                                        const firmaActualizadorSeleccionada = e.target.value;
                                                        cambiarFirmaActualizador(firmaActualizadorSeleccionada);
                                                    }}                                            
                                                >
                                                    
                                                    <option value={firma_actualizador.campo}>{firma_actualizador.campo}</option>
                                                    <option value="" disabled>----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                        </td>
                                        </center>
                                        <br/>
                                    
                                        <ComponenteInput
                                        estado={anio_actualizacion}
                                        cambiarEstado={cambiarAnioActualizacion}
                                        tipo= "text"
                                        label="Año de actualización"
                                        placeholder= ""
                                        name = "anio_actualizacion"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> &nbsp;&nbsp;&nbsp;
                                        <center>
                                          
                                        
                                            <tr>
                                            <td>Mes: &nbsp;</td>&nbsp;
                                            <td>
                                            <select className="custom-select" 
                                            id="mes_actualizacion" 
                                            name="mes_actualizacion" 
                                            value = {mes_actualizacion}
                                            onChange = {(e) => {
                                                const mesSeleccionado = e.target.value;
                                                cambiarMesActualizacion(mesSeleccionado);
                                            }}                                                             
                                            
                                            >                
                                            <option value={mes_actualizacion.campo}>{mes_actualizacion.campo}</option>
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

                                            &nbsp;&nbsp;&nbsp;<td>Día: &nbsp;&nbsp;</td>
                                            <td>
                                            <select className="custom-select" 
                                            id="dia_actualizacion" 
                                            name="dia_actualizacion" 
                                            value = {dia_actualizacion}
                                            onChange = {(e) => {
                                                const diaSeleccionado = e.target.value;
                                                cambiarMesActualizacion(diaSeleccionado);
                                            }}                                                             
                                            
                                            >                
                                            <option value={dia_actualizacion.campo}>{dia_actualizacion.campo}</option>
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
                                        
                                    </center>
                                    <br/>
                                    <br/>
                                    <center>
                                    <h5><b>Supervisor</b></h5>
                                    </center>
                                    <hr/>
                                    
                                        <ComponenteInput
                                        estado={nombre_supervisor}
                                        cambiarEstado={cambiarNombreSupervisor}
                                        tipo= "text"
                                        label="Nombre : "
                                        placeholder= ""
                                        name = "nombre_supervisor"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={apellido_supervisor}
                                        cambiarEstado={cambiarApellidoSupervisor}
                                        tipo= "text"
                                        label="Apellido :"
                                        placeholder= ""
                                        name = "apellido_supervisor"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 
                                    
                                        <ComponenteInput
                                        estado={cedula_supervisor}
                                        cambiarEstado={cambiarCedulaSupervisor}
                                        tipo= "text"
                                        label="Cédula :"
                                        placeholder= ""
                                        name = "cedula_supervisor"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        /> 

                                        <center>
                                        <br/>                                                                                    
                                        <td><b>Firma :  </b>&nbsp;</td>
                                        <td>   
                                                <select 
                                                    className="custom-select" 
                                                    id="firma_supervisor" 
                                                    name="firma_supervisor" 
                                                    value = {firma_supervisor}
                                                    onChange = {(e) => {
                                                        const firmaSupervisorSeleccionada = e.target.value;
                                                        cambiarFirmaSupervisor(firmaSupervisorSeleccionada);
                                                    }}                                            
                                                >
                                                    
                                                    <option value={firma_supervisor.campo}>{firma_supervisor.campo}</option>
                                                    <option value="" disabled>----------</option>
                                                    <option value="Si">Si</option>
                                                    <option value="No">No</option>                                                    
                                                    </select>                                                       
                                                                                                            
                                        </td>
                                        </center>
                                        <br/>
                                    
                                        <ComponenteInput
                                        estado={anio_supervision}
                                        cambiarEstado={cambiarAnioSupervision}
                                        tipo= "text"
                                        label="Año de supervisión"
                                        placeholder= ""
                                        name = "anio_supervision"
                                        leyendaError = "Letras y espacios. Puede llevar acentos"
                                        expresionRegular = {expresiones.nombre}                
                                        />&nbsp;&nbsp;

                                        <center>
                                        
                                          <tr>
                                          <td>Mes: &nbsp;</td>&nbsp;
                                          <td>
                                          <select className="custom-select" 
                                          id="mes_supervision" 
                                          name="mes_supervision" 
                                          value = {mes_supervision}
                                          onChange = {(e) => {
                                              const mesSupervisionSeleccionado = e.target.value;
                                              cambiarMesSupervision(mesSupervisionSeleccionado);
                                          }}                                                             
                                          
                                          >                
                                          <option value={mes_supervision.campo}>{mes_supervision.campo}</option>
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

                                          &nbsp;&nbsp;&nbsp;<td>Día: &nbsp;&nbsp;</td>
                                          <td>
                                          <select className="custom-select" 
                                          id="dia_supervision" 
                                          name="dia_supervision" 
                                          value = {dia_supervision}
                                          onChange = {(e) => {
                                              const diaSupervisionSeleccionado = e.target.value;
                                              cambiarDiaSupervision(diaSupervisionSeleccionado);
                                          }}                                                             
                                          
                                          >                
                                          <option value={dia_supervision.campo}>{dia_supervision.campo}</option>
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
                                      
                                    </center>
                                    <br/>
                                     <label><b>Fecha de Supervisión:</b>&nbsp;&nbsp;</label>     
                                    <input type="date" name="fecha" min="1970-01-01" max="2018-05-25" step="1" value="2017-04-28"/>
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
                
                    <Boton type="submit" onClick={()=>putInvestigacion()}><b>Enviar</b></Boton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {formularioValido === true && <MensajeExito> Formulario enviado exitosamente! </MensajeExito>}
                

                    <button className="btn btn-danger btn-md" onClick={()=>abrirCerrarModalEditar()}><b>Cancelar</b></button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro de eliminar este registro {investigacionSeleccionada && investigacionSeleccionada.clavecatastral}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>deleteInvestigacion()}>
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


export default InvestigacionPredial;






