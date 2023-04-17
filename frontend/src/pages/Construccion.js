import React, {useState , useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {Formulario} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { faCity, faClipboardList, faEdit, faTrashAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const Construccion = () => {

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
    
    const baseUrl= 'http://localhost/apicatastro/index.php/construccion/?id='+id; //'https://cheerful-marzipan-12e313.netlify.app/construccion/?id='+id;// http://f0783168.xsph.ru/index.php/construccion/?id='+id
    //const urlInsertar = 'http://apicatastro/obras/nuevo?id=';

    const [data, setData]=useState([]);    
    const [id_construccion, cambiarIdConstruccion] = useState({campo: '', valido: null});
	//const [clave_catastral, cambiarClaveCatastral] = useState({campo: '', valido: null});        
    const [clave_predio, cambiarClavePredio] = useState({campo:'', valido: null});
    const [idubicacion, cambiarIdUbicacion] = useState({campo:'', valido: null});
    const [numero_bloque, cambiarNumeroBloque] = useState({campo:'', valido: null});
    const [numero_piso, cambiarNumeroPiso] = useState({campo:'', valido: null});
    const [numero_unidad, cambiarNumeroUnidad] = useState({campo:'', valido: null});
    const [nivel_piso, cambiarNivelPiso] = useState({campo:'', valido: null});
    const [condicion_fisica, cambiarCondicionFisica] = useState({campo:'', valido: null});
    const [uso_constructivo, cambiarUsoConstructivo] = useState({campo:'', valido: null});
    const [valor_cultural, cambiarValorCultural] = useState({campo:'', valido: null});
    const [area_construccion, cambiarAreaConstruccion] = useState({campo:'', valido: null});
    const [anio_construccion, cambiarAnioConstruccion] = useState({campo:'', valido: null});
    const [anio_restauracion, cambiarAnioRestauracion] = useState({campo:'', valido: null});
    const [estado_conservacion, cambiarEstadoConservacion] = useState({campo:'', valido: null});
    const [mamposteria_soportante, cambiarMamposteriaSoportante] = useState({campo:'', valido: null});
    const [columnas, cambiarColumnas] = useState({campo:'', valido: null});
    const [vigas, cambiarVigas] = useState({campo:'', valido: null});
    const [entrepiso, cambiarEntrepiso] = useState({campo:'', valido: null});
    const [cubierta_entrepiso, cambiarCubiertaEntrepiso] = useState({campo:'', valido: null});
    const [gradas, cambiarGradas] = useState({campo:'', valido: null});
    const [contrapiso, cambiarContrapiso] = useState({campo:'', valido: null});
    const [paredes, cambiarParedes] = useState({campo:'', valido: null});
    const [enlucido_paredes, cambiarEnlucidoParedes] = useState({campo:'', valido: null});
    const [enlucido_tumbados, cambiarEnlucidoTumbados] = useState({campo:'', valido: null});
    const [revestimiento_pared_interior, cambiarRevestimientoParedInterior] = useState({campo:'', valido: null});
    const [revestimiento_pared_exterior, cambiarRevestimientoParedExterior] = useState({campo:'', valido: null});
    const [revestimiento_cubierta, cambiarRevestimientoCubierta] = useState({campo:'', valido: null});
    const [tumbados, cambiarTumbados] = useState({campo:'', valido: null});
    const [ventanas, cambiarVentanas] = useState({campo:'', valido: null});
    const [vidrios, cambiarVidrios] = useState({campo:'', valido: null});
    const [puertas, cambiarPuertas] = useState({campo:'', valido: null});
    const [closets, cambiarClosets] = useState({campo:'', valido: null});
    const [pisos, cambiarPisos] = useState({campo:'', valido: null});
    const [proteccion_ventanas, cambiarProteccion_ventanas] = useState({campo:'', valido: null});
    const [gradas_acabados, cambiarGradasAcabados] = useState({campo:'', valido: null});
    const [clasificacion_vivienda, cambiarClasificacionVivienda] = useState({campo:'', valido: null});
    const [tipo_vivienda, cambiarTipoVivienda] = useState({campo:'', valido: null});
    const [condicion_ocupacion, cambiarCondicionOcupacion] = useState({campo:'', valido: null});
    const [acabado_piso, cambiarAcabadoPiso] = useState({campo:'', valido: null});
    const [estado_piso, cambiarEstadoPiso] = useState({campo:'', valido: null});
    const [numero_hogares, cambiarNumeroHogares] = useState({campo:'', valido: null});
    const [numero_habitantes, cambiarNumeroHabitantes] = useState({campo:'', valido: null});
    const [numero_habitaciones, cambiarNumeroHabitaciones] = useState({campo:'', valido: null});
    const [numero_dormitorios, cambiarNumeroDormitorios] = useState({campo:'', valido: null});
    const [espacios_aseo_duchas, cambiarEspaciosAseoDuchas] = useState({campo:'', valido: null});
    const [tenencia_vivienda, cambiarTenenciaVivienda] = useState({campo:'', valido: null});
    const [telefono_convencional, cambiarTelefonoConvencional] = useState({campo:'', valido: null});
    const [cantidad_celulares, cambiarCantidadCelulares] = useState({campo:'', valido: null});
    const [servicio_internet, cambiarServicioInternet] = useState({campo:'', valido: null});
    const [total_propiedad_exclusiva, cambiarTotalPropiedadExclusiva] = useState({campo:'', valido: null});
    const [total_propiedad_comunal, cambiarTotalPropiedadComunal] = useState({campo:'', valido: null});
    const [alicuota_porcentaje, cambiarAlicuotaPorcentaje] = useState({campo:'', valido: null});
        
    const [construccionSeleccionada, setConstruccionSeleccionada] = useState(null);
    
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


const peticionGet=async()=>{
    const response = await axios.get(baseUrl); 
    setData(response.data);
    cambiarClavePredio({campo: response.data[0].clave_predio});
    
}

const postConstruccion=async()=>{ 
    const construccion_nuevo = {        
        clave_predio:clave,//clave_predio.campo,
        idubicacion: id,//idubicacion.campo,
        numero_bloque: numero_bloque.campo,
        numero_piso: numero_piso.campo,
        numero_unidad: numero_unidad.campo,
        nivel_piso: nivel_piso.campo,
        condicion_fisica: condicion_fisica.campo,
        uso_constructivo: uso_constructivo.campo,
        valor_cultural: valor_cultural.campo,
        area_construccion: area_construccion.campo,
        anio_construccion: anio_construccion.campo,
        anio_restauracion: anio_restauracion.campo,
        estado_conservacion: estado_conservacion.campo,
        mamposteria_soportante: mamposteria_soportante.campo,
        columnas: columnas.campo,
        vigas: vigas.campo,
        entrepiso: entrepiso.campo,
        cubierta_entrepiso: cubierta_entrepiso.campo,
        gradas: gradas.campo,
        contrapiso: contrapiso.campo,
        paredes: paredes.campo,
        enlucido_paredes: enlucido_paredes.campo,
        enlucido_tumbados: enlucido_tumbados.campo,
        revestimiento_pared_interior: revestimiento_pared_interior.campo,
        revestimiento_pared_exterior: revestimiento_pared_exterior.campo,
        revestimiento_cubierta: revestimiento_cubierta.campo,
        tumbados: tumbados.campo,
        ventanas: ventanas.campo,
        vidrios: vidrios.campo,
        puertas: puertas.campo,
        closets: closets.campo,
        pisos: pisos.campo,
        proteccion_ventanas: proteccion_ventanas.campo,
        gradas_acabados: gradas_acabados.campo,
        clasificacion_vivienda: clasificacion_vivienda.campo,
        tipo_vivienda: tipo_vivienda.campo,
        condicion_ocupacion: condicion_ocupacion.campo,
        acabado_piso: acabado_piso.campo,
        estado_piso: estado_piso.campo,
        numero_hogares: numero_hogares.campo,
        numero_habitantes: numero_habitantes.campo,
        numero_habitaciones: numero_habitaciones.campo,
        numero_dormitorios: numero_dormitorios.campo,
        espacios_aseo_duchas: espacios_aseo_duchas.campo,
        tenencia_vivienda: tenencia_vivienda.campo,
        telefono_convencional: telefono_convencional.campo,
        cantidad_celulares: cantidad_celulares.campo,
        servicio_internet: servicio_internet.campo,
        total_propiedad_exclusiva: total_propiedad_exclusiva.campo,
        total_propiedad_comunal: total_propiedad_comunal.campo,
        alicuota_porcentaje: alicuota_porcentaje.campo
    }   
    
    await axios.post('http://localhost/apicatastro/index.php/construccion/nuevo', construccion_nuevo)
    .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        peticionGet();
    }).catch(error=>{
        console.error(error);
    });
}

const putConstruccion=async()=>{
    const cons = {        
        clave_predio:clave_predio.campo,//
        idubicacion: idubicacion.campo,//
        numero_bloque: numero_bloque.campo,
        numero_piso: numero_piso.campo,
        numero_unidad: numero_unidad.campo,
        nivel_piso: nivel_piso.campo,
        condicion_fisica: condicion_fisica.campo,
        uso_constructivo: uso_constructivo.campo,
        valor_cultural: valor_cultural.campo,
        area_construccion: area_construccion.campo,
        anio_construccion: anio_construccion.campo,
        anio_restauracion: anio_restauracion.campo,
        estado_conservacion: estado_conservacion.campo,
        mamposteria_soportante: mamposteria_soportante.campo,
        columnas: columnas.campo,
        vigas: vigas.campo,
        entrepiso: entrepiso.campo,
        cubierta_entrepiso: cubierta_entrepiso.campo,
        gradas: gradas.campo,
        contrapiso: contrapiso.campo,
        paredes: paredes.campo,
        enlucido_paredes: enlucido_paredes.campo,
        enlucido_tumbados: enlucido_tumbados.campo,
        revestimiento_pared_interior: revestimiento_pared_interior.campo,
        revestimiento_pared_exterior: revestimiento_pared_exterior.campo,
        revestimiento_cubierta: revestimiento_cubierta.campo,
        tumbados: tumbados.campo,
        ventanas: ventanas.campo,
        vidrios: vidrios.campo,
        puertas: puertas.campo,
        closets: closets.campo,
        pisos: pisos.campo,
        proteccion_ventanas: proteccion_ventanas.campo,
        gradas_acabados: gradas_acabados.campo,
        clasificacion_vivienda: clasificacion_vivienda.campo,
        tipo_vivienda: tipo_vivienda.campo,
        condicion_ocupacion: condicion_ocupacion.campo,
        acabado_piso: acabado_piso.campo,
        estado_piso: estado_piso.campo,
        numero_hogares: numero_hogares.campo,
        numero_habitantes: numero_habitantes.campo,
        numero_habitaciones: numero_habitaciones.campo,
        numero_dormitorios: numero_dormitorios.campo,
        espacios_aseo_duchas: espacios_aseo_duchas.campo,
        tenencia_vivienda: tenencia_vivienda.campo,
        telefono_convencional: telefono_convencional.campo,
        cantidad_celulares: cantidad_celulares.campo,
        servicio_internet: servicio_internet.campo,
        total_propiedad_exclusiva: total_propiedad_exclusiva.campo,
        total_propiedad_comunal: total_propiedad_comunal.campo,
        alicuota_porcentaje: alicuota_porcentaje.campo
    }   
          
    
    await axios.put('https://cheerful-marzipan-12e313.netlify.app/construccion/actualizar?id='+id_construccion.campo, cons)    //f, {params:{id: predioSeleccionado.id}})
    .then(response=>{
        

        abrirCerrarModalEditar();
        peticionGet();
    }).catch(error=>{
        console.error(error);
    });
}

const deleteConstruccion=async()=>{
    await axios.delete('https://cheerful-marzipan-12e313.netlify.app/construccion/eliminar?id='+id_construccion.campo)
    .then(response=>{
        setData(data.filter(predio=>predio.idpredio!==id_construccion.campo))
        abrirCerrarModalEliminar();
        peticionGet();
    })

}




const seleccionarConstruccion=(construccion, caso)=>{
    //setInvestigacionSeleccionada(investigacion);
    cambiarIdConstruccion({campo:construccion.idconstruccion, valido: true});
    cambiarClavePredio({campo:construccion.clave_predio, valido: true});
    cambiarIdUbicacion({campo:construccion.idubicacion, valido: true});
    cambiarNumeroBloque({campo:construccion.numero_bloque, valido: true});
    cambiarNumeroPiso({campo:construccion.numero_piso, valido: true});
    cambiarNumeroUnidad({campo:construccion.numero_unidad, valido: true});
    cambiarNivelPiso({campo:construccion.nivel_piso, valido: true});
    cambiarCondicionFisica({campo:construccion.condicion_fisica, valido: true});
    cambiarUsoConstructivo({campo:construccion.uso_constructivo, valido: true});
    cambiarValorCultural({campo:construccion.valor_cultural, valido: true});
    cambiarAreaConstruccion({campo:construccion.area_construccion, valido: true});
    cambiarAnioConstruccion({campo:construccion.anio_construccion, valido: true});
    cambiarAnioRestauracion({campo:construccion.anio_restauracion, valido: true});
    cambiarEstadoConservacion({campo:construccion.estado_conservacion, valido: true});
    cambiarMamposteriaSoportante({campo:construccion.mamposteria_soportante, valido: true});
    cambiarColumnas({campo:construccion.columnas, valido: true});
    cambiarVigas({campo:construccion.vigas, valido: true});
    cambiarEntrepiso({campo:construccion.entrepiso, valido: true});
    cambiarCubiertaEntrepiso({campo:construccion.cubierta_entrepiso, valido: true});
    cambiarGradas({campo:construccion.gradas, valido: true});
    cambiarContrapiso({campo:construccion.contrapiso, valido: true});
    cambiarParedes({campo:construccion.paredes, valido: true});
    cambiarEnlucidoParedes({campo:construccion.enlucido_paredes, valido: true});
    cambiarEnlucidoTumbados({campo:construccion.enlucido_tumbados, valido: true});
    cambiarRevestimientoParedInterior({campo:construccion.revestimiento_pared_interior, valido: true});
    cambiarRevestimientoParedExterior({campo:construccion.revestimiento_pared_exterior, valido: true});
    cambiarRevestimientoCubierta({campo:construccion.revestimiento_cubierta, valido: true});
    cambiarTumbados({campo:construccion.tumbados, valido: true});
    cambiarVentanas({campo:construccion.ventanas, valido: true});
    cambiarVidrios({campo:construccion.vidrios, valido: true});
    cambiarPuertas({campo:construccion.puertas, valido: true});
    cambiarClosets({campo:construccion.closets, valido: true});
    cambiarPisos({campo:construccion.pisos, valido: true});
    cambiarProteccion_ventanas({campo:construccion.proteccion_ventanas, valido: true});
    cambiarGradasAcabados({campo:construccion.gradas_acabados, valido: true});
    cambiarClasificacionVivienda({campo:construccion.clasificacion_vivienda, valido: true});
    cambiarTipoVivienda({campo:construccion.tipo_vivienda, valido: true});
    cambiarCondicionOcupacion({campo:construccion.condicion_ocupacion, valido: true});
    cambiarAcabadoPiso({campo:construccion.acabado_piso, valido: true});
    cambiarEstadoPiso({campo:construccion.estado_piso, valido: true});
    cambiarNumeroHogares({campo:construccion.numero_hogares, valido: true});
    cambiarNumeroHabitantes({campo:construccion.numero_habitantes, valido: true});
    cambiarNumeroHabitaciones({campo:construccion.numero_habitaciones, valido: true});
    cambiarNumeroDormitorios({campo:construccion.numero_dormitorios, valido: true});
    cambiarEspaciosAseoDuchas({campo:construccion.espacios_aseo_duchas, valido: true});
    cambiarTenenciaVivienda({campo:construccion.tenencia_vivienda, valido: true});
    cambiarTelefonoConvencional({campo:construccion.telefono_convencional, valido: true});
    cambiarCantidadCelulares({campo:construccion.cantidad_celulares, valido: true});
    cambiarServicioInternet({campo:construccion.servicio_internet, valido: true});
    cambiarTotalPropiedadExclusiva({campo:construccion.total_propiedad_exclusiva, valido: true});
    cambiarTotalPropiedadComunal({campo:construccion.total_propiedad_comunal, valido: true});
    cambiarAlicuotaPorcentaje({campo:construccion.alicuota_porcentaje, valido: true});

        
    switch(caso){

        case "Editar":  abrirCerrarModalEditar();
                        break;  
        case "Eliminar":  abrirCerrarModalEliminar();
                        break; 
    }            

}

const nuevoFormulario=()=>{
       
    cambiarIdConstruccion({campo: '', valido: null});
    //cambiarClavePredio({campo:'', valido: null});
    //cambiarIdUbicacion({campo:'', valido: null});
    cambiarNumeroBloque({campo:'', valido: null});
    cambiarNumeroPiso({campo:'', valido: null});
    cambiarNumeroUnidad({campo:'', valido: null});
    cambiarNivelPiso({campo:'', valido: null});
    cambiarCondicionFisica({campo:'', valido: null});
    cambiarUsoConstructivo({campo:'', valido: null});
    cambiarValorCultural({campo:'', valido: null});
    cambiarAreaConstruccion({campo:'', valido: null});
    cambiarAnioConstruccion({campo:'', valido: null});
    cambiarAnioRestauracion({campo:'', valido: null});
    cambiarEstadoConservacion({campo:'', valido: null});
    cambiarMamposteriaSoportante({campo:'', valido: null});
    cambiarColumnas({campo:'', valido: null});
    cambiarVigas({campo:'', valido: null});
    cambiarEntrepiso({campo:'', valido: null});
    cambiarCubiertaEntrepiso({campo:'', valido: null});
    cambiarGradas({campo:'', valido: null});
    cambiarContrapiso({campo:'', valido: null});
    cambiarParedes({campo:'', valido: null});
    cambiarEnlucidoParedes({campo:'', valido: null});
    cambiarEnlucidoTumbados({campo:'', valido: null});
    cambiarRevestimientoParedInterior({campo:'', valido: null});
    cambiarRevestimientoParedExterior({campo:'', valido: null});
    cambiarRevestimientoCubierta({campo:'', valido: null});
    cambiarTumbados({campo:'', valido: null});
    cambiarVentanas({campo:'', valido: null});
    cambiarVidrios({campo:'', valido: null});
    cambiarPuertas({campo:'', valido: null});
    cambiarClosets({campo:'', valido: null});
    cambiarPisos({campo:'', valido: null});
    cambiarProteccion_ventanas({campo:'', valido: null});
    cambiarGradasAcabados({campo:'', valido: null});
    cambiarClasificacionVivienda({campo:'', valido: null});
    cambiarTipoVivienda({campo:'', valido: null});
    cambiarCondicionOcupacion({campo:'', valido: null});
    cambiarAcabadoPiso({campo:'', valido: null});
    cambiarEstadoPiso({campo:'', valido: null});
    cambiarNumeroHogares({campo:'', valido: null});
    cambiarNumeroHabitantes({campo:'', valido: null});
    cambiarNumeroHabitaciones({campo:'', valido: null});
    cambiarNumeroDormitorios({campo:'', valido: null});
    cambiarEspaciosAseoDuchas({campo:'', valido: null});
    cambiarTenenciaVivienda({campo:'', valido: null});
    cambiarTelefonoConvencional({campo:'', valido: null});
    cambiarCantidadCelulares({campo:'', valido: null});
    cambiarServicioInternet({campo:'', valido: null});
    cambiarTotalPropiedadExclusiva({campo:'', valido: null});
    cambiarTotalPropiedadComunal({campo:'', valido: null});
    cambiarAlicuotaPorcentaje({campo:'', valido: null});

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
            <h1><b>Características de Construcción <FontAwesomeIcon icon={faCity}/></b></h1> 
            <br/>
            <label>Clave Catastral: <b>{clave}</b></label> <td> </td>            
            <br/>            
            <center>
                <button class="left" className="btn btn-success btn-lg" onClick={()=>abrirCerrarModalInsertar()} >Nueva construcción <FontAwesomeIcon icon={faUpload}/></button> 
            </center>
            
            <Formulario action="" onSubmit={onSubmit}>
            
            <div class="center-block fix-width scroll-inner" style={{textAlign: 'center', scale: "88%", marginLeft: '-8rem'}}> 
                                            
                <table className="table table-striped table-hover">
	            
                    <thead id="cabecera">
                        <tr>
                            <th style={{position: 'sticky', left: 0, top: 0, padding: '40px'}}><b>ID Construcción</b></th>                            
                                                        
                
                            <th colspan="3"><h6><b>Clave Bloque</b></h6>
                                                         
                            <th>No.Bloque</th>
                        	<th>No.Piso</th>
                        	<th>No.Unidad</th>                                         
                            
                            </th>

                            
                            <th colspan="8"><h6><b>Datos Descriptivos del Bloque</b></h6>
                            


                            <th style={{paddingLeft: '0px', width: '200px'}}>Nivel del piso</th>
                            <th style={{paddingLeft: '0px', width: '100px'}}>Condición física</th>
						    <th style={{paddingLeft: '0px', width: '180px'}}>Uso constructivo</th>
                        	<th>Valor cultural</th>
                        	<th style={{paddingLeft: '30px', width: '130px'}}>Área de construcción(m²)</th>
                            <th style={{paddingLeft: '25px', width: '120px'}}>Año de construcción</th>
                            <th style={{paddingLeft: '25px', width: '120px'}}>Año de restauración</th>
                            <th style={{paddingLeft: '25px', width: '120px'}}>Estado de conservación</th>                                          


                            </th>

                            

                            <th colspan="6"><h6><b>Estructura</b></h6>
                                                        
                            <th style={{width: '200px'}}>Mampostería soportante</th>
                            <th style={{paddingLeft: '20px', width: '150px'}}>Columnas</th>                        			
                            <th style={{paddingLeft: '20px', width: '150px'}}>Vigas</th>
                            <th style={{paddingLeft: '20px', width: '150px'}}>Entrepiso</th>
                            <th style={{paddingLeft: '20px', width: '160px'}}>Cubierta-entrepiso</th>
                            <th style={{paddingLeft: '20px', width: '130px'}}>Gradas</th>                                           
                           
                            </th>

                            <th colspan="4"><h6><b>Rellenos</b></h6>
                                                        
                            <th style={{width: '200px'}}>Contrapiso</th>
                            <th style={{paddingLeft: '55px', width: '100px'}}>Paredes</th>
                            <th style={{paddingLeft: '85px', width: '130px'}}>Enlucido paredes</th>
                            <th style={{paddingLeft: '55px', width: '130px'}}>Enlucido tumbados</th>                                    
                           
                            </th>

                            <th colspan="11"><h6><b>Acabados</b></h6>
                                                        
                            <th style={{paddingLeft: '55px', width: '150px'}}>Revestimiento pared interior</th>
                            <th style={{paddingLeft: '80px', width: '150px'}}>Revestimiento pared exterior</th>
                            <th style={{paddingLeft: '80px', width: '130px'}}>Revestimiento cubierta</th>
                            <th style={{paddingLeft: '80px', width: '100px'}}>Tumbados</th>
                            <th style={{paddingLeft: '95px', width: '100px'}}>Ventanas</th>
                            <th style={{paddingLeft: '100px', width: '100px'}}>Vidrios</th>
                            <th style={{paddingLeft: '100px', width: '100px'}}>Puertas</th>
                            <th style={{paddingLeft: '90px', width: '100px'}}>Closets</th>
                            <th style={{paddingLeft: '90px', width: '100px'}}>Pisos</th>
                            <th style={{paddingLeft: '95px', width: '150px'}}>Protección ventanas</th>
                            <th style={{paddingLeft: '65px', width: '100px'}}>Gradas</th>                                          
                           
                            </th>

                            <th colspan="14"><h6><b>Unidad de Vivienda</b></h6>
                                                        
                            <th style={{paddingLeft: '40px', width: '200px'}}>Clasificación vivienda</th>
                            <th style={{paddingLeft: '75px', width: '150px'}}>Tipo de vivienda</th>
                            <th style={{paddingLeft: '115px', width: '150px'}}>Condición de ocupación</th>
                            <th style={{paddingLeft: '95px', width: '150px'}}>Acabado de piso</th>
                            <th style={{paddingLeft: '95px', width: '150px'}}>Estado de piso</th>
                            <th style={{paddingLeft: '115px', width: '150px'}}>No. hogares</th>
                            <th style={{paddingLeft: '35px', width: '100px'}}>No. de habitantes</th>
                            <th style={{paddingLeft: '35px', width: '100px'}}>No. de habitaciones</th>
                            <th style={{paddingLeft: '35px', width: '100px'}}>No. de dormitorios</th>
                            <th style={{paddingLeft: '40px', width: '100px'}}>Duchas</th>
                            <th style={{paddingLeft: '105px', width: '150px'}}>Tenencia de la vivienda</th>
                            <th style={{paddingLeft: '95px', width: '150px'}}>Telefono convencional</th>
                            <th style={{paddingLeft: '95px', width: '150px'}}>No. Celulares</th>
                            <th style={{paddingLeft: '95px', width: '150px'}}>Internet</th>                                          
                           
                            </th>

                            <th style={{paddingLeft: '95px', width: '150px'}}>Total Propiedad Exclusiva</th>
                            <th style={{paddingLeft: '95px', width: '150px'}}>Total Propiedad Comunal</th>
                            <th style={{paddingLeft: '95px', width: '150px'}}>Alicuota %</th>
                            

                            <th >ACCIONES</th>                                                   

                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data)
                            ?data.map(construccion=>(
                                
                                <tr key={construccion.idconstruccion}>
                                    
                                    
                                    <td style={{position: 'sticky', top: 130, left: 0, padding: '45px', verticalAlign:'middle', background: '#eee'}}>{construccion.idconstruccion}</td>
                                    
                                    <td style={{verticalAlign:'middle'}}>{construccion.numero_bloque}</td>
                                    <td style={{verticalAlign:'middle'}}>{construccion.numero_piso}</td>
                                    <td style={{verticalAlign:'middle'}}>{construccion.numero_unidad}</td>
                                    

                                    
                                    
                                    <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px'}}>{construccion.nivel_piso}</td>
                                    <td style={{padding: '55px',verticalAlign:'middle', paddingLeft:'25px'}}>{construccion.condicion_fisica}</td>
                                    <td style={{padding: '45px',verticalAlign:'middle', paddingLeft:'30px'}}>{construccion.uso_constructivo}</td>
                                    <td style={{padding: '70px',verticalAlign:'middle', paddingLeft:'30px' }}>{construccion.valor_cultural}</td>
                                    <td style={{padding: '40px',verticalAlign:'middle'}}>{construccion.area_construccion}</td>
                                    <td style={{padding: '40px',verticalAlign:'middle', paddingLeft:'75px'}}>{construccion.anio_construccion}</td>
                                    <td style={{padding: '45px',verticalAlign:'middle'}}>{construccion.anio_restauracion}</td>
                                    <td style={{padding: '45px',verticalAlign:'middle'}}>{construccion.estado_conservacion}</td>
                                    
                                    
                                    
                                    <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'85px' }}>{construccion.mamposteria_soportante}</td>
                                    <td style={{padding: '45px',verticalAlign:'middle', paddingLeft:'70px' }}>{construccion.columnas}</td>
                                    <td style={{padding: '45px',verticalAlign:'middle', paddingLeft:'40px'}}>{construccion.vigas}</td>
                                    <td style={{padding: '45px',verticalAlign:'middle'}}>{construccion.entrepiso}</td>
                                    <td style={{padding: '45px',verticalAlign:'middle'}}>{construccion.cubierta_entrepiso}</td>
                                    <td style={{padding: '45px',verticalAlign:'middle'}}>{construccion.gradas}</td>
                                    
                                    
                                    <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'75px' }}>{construccion.contrapiso}</td>
                                    <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'70px' }}>{construccion.paredes}</td>
                                    <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'55px'}}>{construccion.enlucido_paredes}</td>
                                    <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'55px'}}>{construccion.enlucido_tumbados}</td>
                                    
                                    
                                    
                                    <td style={{padding: '70px',verticalAlign:'middle', paddingLeft:'80px' }}>{construccion.revestimiento_pared_interior}</td>
                                    <td style={{padding: '70px',verticalAlign:'middle', paddingLeft:'80px' }}>{construccion.revestimiento_pared_exterior}</td>
                                    <td style={{padding: '70px',verticalAlign:'middle', paddingLeft:'80px' }}>{construccion.revestimiento_cubierta}</td>
                                    <td style={{padding: '65px',verticalAlign:'middle', paddingLeft:'65px'}}>{construccion.tumbados}</td>
                                    <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'55px'}}>{construccion.ventanas}</td>
                                    <td style={{padding: '55px',verticalAlign:'middle', paddingLeft:'65px'}}>{construccion.vidrios}</td>
                                    <td style={{padding: '55px',verticalAlign:'middle', paddingLeft:'55px'}}>{construccion.puertas}</td>
                                    <td style={{padding: '55px',verticalAlign:'middle'}}>{construccion.closets}</td>
                                    <td style={{padding: '55px',verticalAlign:'middle', paddingLeft:'50px'}}>{construccion.pisos}</td>
                                    <td style={{padding: '50px',verticalAlign:'middle'}}>{construccion.proteccion_ventanas}</td>
                                    <td style={{padding: '50px',verticalAlign:'middle'}}>{construccion.gradas_acabados}</td>
                                    
                                    
                                    
                                    <td style={{padding: '90px',verticalAlign:'middle', paddingLeft:'105px' }}>{construccion.clasificacion_vivienda}</td>
                                    <td style={{padding: '75px',verticalAlign:'middle', paddingLeft:'65px' }}>{construccion.tipo_vivienda}</td>
                                    <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'40px' }}>{construccion.condicion_ocupacion}</td>
                                    <td style={{padding: '35px',verticalAlign:'middle', paddingLeft:'35px' }}>{construccion.acabado_piso}</td>
                                    <td style={{padding: '85px',verticalAlign:'middle', paddingLeft:'35px' }}>{construccion.estado_piso}</td>
                                    <td style={{padding: '80px',verticalAlign:'middle', paddingLeft:'60px' }}>{construccion.numero_hogares}</td>
                                    <td style={{padding: '30px',verticalAlign:'middle', paddingLeft:'20px' }}>{construccion.numero_habitantes}</td>
                                    <td style={{padding: '90px',verticalAlign:'middle', paddingLeft:'25px' }}>{construccion.numero_habitaciones}</td>
                                    <td style={{padding: '80px',verticalAlign:'middle', paddingLeft:'25px' }}>{construccion.numero_dormitorios}</td>
                                    <td style={{padding: '25px',verticalAlign:'middle', paddingLeft:'25px' }}>{construccion.espacios_aseo_duchas}</td>
                                    <td style={{padding: '100px',verticalAlign:'middle', paddingLeft:'45px' }}>{construccion.tenencia_vivienda}</td>
                                    <td style={{padding: '80px',verticalAlign:'middle', paddingLeft:'55px'}}>{construccion.telefono_convencional}</td>
                                    <td style={{padding: '80px',verticalAlign:'middle', paddingLeft:'70px'}}>{construccion.cantidad_celulares}</td>
                                    <td style={{padding: '80px',verticalAlign:'middle', paddingLeft:'70px'}}>{construccion.servicio_internet}</td>
                                    
                                    
                                    
                                    <td style={{padding: '80px',verticalAlign:'middle', paddingLeft:'150px'}}>{construccion.total_propiedad_exclusiva}</td>
                                    <td style={{padding: '80px',verticalAlign:'middle', paddingLeft:'150px'}}>{construccion.total_propiedad_comunal}</td>
                                    <td style={{padding: '80px',verticalAlign:'middle', paddingLeft:'145px'}}>{construccion.alicuota_porcentaje}</td>
                                        

                                    <td style={{padding: '60px',verticalAlign:'middle', paddingLeft:'140px'}}>
                                        <button className="btn btn-primary btn-md" onClick={()=>seleccionarConstruccion(construccion,"Editar")}><b>Editar</b><FontAwesomeIcon icon={faEdit}/></button> 
                                        <button className="btn btn-danger btn-md" onClick={()=>seleccionarConstruccion(construccion,"Eliminar")}><b>Eliminar</b><FontAwesomeIcon icon={faTrashAlt}/></button>  
                                                                                
                                    </td>
                                </tr>
                            
                        )):null}
                        
                    </tbody>                    
                </table>
            </div>
            
            
            </Formulario>

            <Modal isOpen={modalInsertar}>
                            
                        <ModalHeader><b>Insertar nueva construcción y características</b></ModalHeader>
                            <ModalBody>

                            <div className="form-group">                                                                                 
                                <center>
                                <div id="contenedor">
                                <h4><b>Clave Bloque:</b></h4>
                                <hr/>                                    
                                        <p>
                                            <tr>                                                
                                                <td>No. Bloque:</td>
                                                <td>
                                                <select 
                                                    className="custom-select"
                                                    id="bloque" 
                                                    name="bloque" 
                                                    value = {numero_bloque.campo}
                                                    onChange = {(e) => {
                                                    const bloqueSeleccionada = e.target.value;
                                                    cambiarNumeroBloque({campo: bloqueSeleccionada});
                                                    }}
                                                >
                                                    
                                                <option value="">----------</option>                                                                
                                                <option value="0">0</option>
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
                                                
                                            </select> </td>
                                            </tr>
                                        
                                            <tr>    
                                                
                                                    <td>No. Piso:</td>
                                                    <td>
                                                    <select 
                                                        className="custom-select"
                                                        id="piso" 
                                                        name="piso" 
                                                        
                                                        value = {numero_piso.campo}
                                                        onChange = {(e) => {
                                                        const pisoSeleccionado = e.target.value;
                                                        cambiarNumeroPiso({campo: pisoSeleccionado});
                                                        }}
                                                    >
                                                        
                                                    <option value="" >----------</option>
                                                    <option value="0">0</option>
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
                                                    
                                                </select> </td>
                                                </tr>
                                        
                                                    <tr>    
                                                
                                                    <td>No. Unidad:</td>
                                                    <td>
                                                    <select 
                                                        className="custom-select"
                                                        id="unidad" 
                                                        name="unidad" 
                                                        value = {numero_unidad.campo}
                                                        onChange = {(e) => {
                                                        const unidadSeleccionada = e.target.value;
                                                        cambiarNumeroUnidad({campo: unidadSeleccionada});
                                                        }}
                                                    >
                                                    
                                                    <option value="" >----------</option>
                                                    <option value="0">0</option>
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
                                                    
                                                </select> </td>
                                                </tr>
                                            </p>    
                                                <hr/>   
                                                <br/>

                                                <h4><b>Datos descriptivos del bloque:</b> </h4>
                                                <br/>
                                                <hr/>
                                                <br/>
                                                <p>
                                                <tr>      
                                                    
                                                        <td>Nivel del piso:</td>
                                                        <td>
                                                        <select 
                                                            className="custom-select"
                                                            id="nivel_piso" 
                                                            name="nivel_piso" 
                                                            value = {nivel_piso.campo}
                                                            onChange = {(e) => {
                                                            const nivelPisoSeleccionado = e.target.value;
                                                            cambiarNivelPiso({campo: nivelPisoSeleccionado});
                                                            }}
                                                        >

                                                        <option value="" >----------</option>
                                                        <option value="Nivel calzada">Nivel calzada</option>
                                                        <option value="Subsuelo">Subsuelo</option>
                                                                
                                                        
                                                    </select> </td>
                                                    </tr>
                                                
                                                <tr>      
                                                    
                                                        <td>Condición física:</td>
                                                        <td>
                                                        <select 
                                                            class="form-select form-select-md" 
                                                            className="custom-select"
                                                            id="condicion_fisica" 
                                                            name="condicion_fisica" 
                                                            value = {condicion_fisica.campo}
                                                            onChange = {(e) => {
                                                            const condicionSeleccionada = e.target.value;
                                                            cambiarCondicionFisica({campo: condicionSeleccionada});
                                                            }}

                                                        >

                                                        <option value="" >----------</option>
                                                        <option value="No tiene">No tiene</option>
                                                        <option value="Abandonado">Abandonado</option>
                                                        <option value="En acabados">En acabados</option>
                                                        <option value="En estructura">En estructura</option>
                                                        <option value="Reconstruida">Reconstruida</option>
                                                        <option value="Sin modificación">Sin modificación</option>
                                                        <option value="Terminada">Terminada</option>
                                                        <option value="En obra gris">En obra gris</option>
                                                                    
                                                    </select> </td>
                                                    </tr>
                                                
                                                <tr>      
                                                    
                                                        <td>Uso constructivo:</td>
                                                        <td>
                                                        <select 
                                                            class="form-select form-select-md" 
                                                            className="custom-select"
                                                            id="uso" 
                                                            name="uso" 
                                                            value = {uso_constructivo.campo}
                                                            onChange = {(e) => {
                                                            const usoConstructivoSeleccionado = e.target.value;
                                                            cambiarUsoConstructivo({campo: usoConstructivoSeleccionado});
                                                            }}
                                                        >

                                                        <option value="" >-------------</option>
                                                        <option value="No tiene">No tiene</option>
                                                        <option value="Balcón">Balcón</option>
                                                        <option value="Banco">Banco</option>
                                                        <option value="Baño/Sauna/Turco">Baño/Sauna/Turco</option>
                                                        <option value="Bodega">Bodega</option>
                                                        <option value="Casa">Casa</option>
                                                        <option value="Casa comunal">Casa comunal</option>
                                                        <option value="Cuarto de máquinas/basura">Cuarto de máquinas/basura</option>
                                                        <option value="Departamento">Departamento</option>
                                                        <option value="Garita/Guardianía">Garita/Guardianía</option>
                                                        <option value="Gimnasio">Gimnasio</option> 
                                                        <option value="Guardería">Guardería</option> 
                                                        <option value="Hospital">Hospital</option> 
                                                        <option value="Hostal">Hostal</option> 
                                                        <option value="Hostería">Hostería</option> 
                                                        <option value="Hotel">Hotel</option> 
                                                        <option value="Iglesia">Iglesia</option> 
                                                        <option value="Lavandería">Lavandería</option> 
                                                        <option value="Local comercial">Local comercial</option> 
                                                        <option value="Malecón">Malecón</option> 
                                                        <option value="Maternidad">Maternidad</option> 
                                                        <option value="Mercado">Mercado</option> 
                                                        <option value="Mirador">Mirador</option> 
                                                        <option value="Motel">Motel</option> 
                                                        <option value="Museo">Museo</option> 
                                                        <option value="Nave industrial">Nave industrial</option> 
                                                        <option value="Oficina">Oficina</option> 
                                                        <option value="Orfanato">Orfanato</option> 
                                                        <option value="Organismos internacionales">Organismos internacionales</option> 
                                                        <option value="Otros">Otros</option> 
                                                        <option value="Parqueadero">Parqueadero</option> 
                                                        <option value="Patio/Jardín">Patio/Jardín</option> 
                                                        <option value="Pensión">Pensión</option> 
                                                        <option value="Plantel avícola">Plantel avícola</option> 
                                                        <option value="Plaza de toros">Plaza de toros</option> 
                                                        <option value="Porqueriza">Porqueriza</option> 
                                                        <option value="Recinto militar">Recinto militar</option> 
                                                        <option value="Recinto policial">Recinto policial</option> 
                                                        <option value="Reclusorio">Reclusorio</option> 
                                                        <option value="Representaciones diplomáticas">Representaciones diplomáticas</option> 
                                                        <option value="Restaurante">Restaurante</option>
                                                        <option value="Retén policial">Retén policial</option>
                                                        <option value="Sala comunal">Sala comunal</option>
                                                        <option value="Sala de cine">Sala de cine</option>
                                                        <option value="Sala de exposición">Sala de exposición</option>
                                                        <option value="Sala de juegos">Sala de juegos</option>
                                                        <option value="Sala de ordeño">Sala de ordeño</option>
                                                        <option value="Sala de culto/Templo">Sala de culto/Templo</option>
                                                        <option value="Sala de hospitalización">Sala de hospitalización</option>
                                                        <option value="Salón de eventos">Salón de eventos</option>
                                                        <option value="Teatro">Teatro</option>
                                                        <option value="Terminal de transferencia">Terminal de transferencia</option>
                                                        <option value="Terminal interprovincial">Terminal interprovincial</option>
                                                        <option value="Terraza">Terraza</option>
                                                        <option value="Unidad policía comunitaria">Unidad policía comunitaria</option>             
                                                        <option value="Centro de salúd">Centro de salúd</option>             
                                                        <option value="Galpón talleres menores">Galpón talleres menores</option>             
                                                        <option value="Galpón pequeña industria">Galpón pequeña industria</option>             
                                                        <option value="Galpón industrial">Galpón industrial</option>             
                                                        <option value="Establecimiento educativo">Establecimiento educativo</option>             
                                                        
                                                    </select> </td>
                                                    </tr>
                                                
                                                <tr>      
                                                    
                                                        <td>Valor cultural:</td>
                                                        <td>
                                                        <select 
                                                            class="form-select form-select-md" 
                                                            className="custom-select"
                                                            id="valor_cultural" 
                                                            name="valor_cultural" 
                                                            value = {valor_cultural.campo}
                                                            onChange = {(e) => {
                                                            const valorCulturalSeleccionado = e.target.value;
                                                            cambiarValorCultural({campo: valorCulturalSeleccionado});
                                                            }}
                                                        >

                                                        <option value="" >-------------</option>
                                                        <option value="No tiene">No tiene</option>
                                                        <option value="Ancestral">Ancestral</option>
                                                        <option value="Arquitectónico">Arquitectónico</option>
                                                        <option value="Histórico">Histórico</option>
                                                        <option value="Reconstruida">Reconstruida</option>
                                                                                
                                                    </select> </td>
                                                    </tr>
                                                </p> 
                                                <br/>
                                                <p>


                                                    <ComponenteInput
                                                        estado={area_construccion}
                                                        cambiarEstado={cambiarAreaConstruccion}
                                                        tipo= "text"
                                                        label="Área de construcción (m²)"
                                                        placeholder= "Metros de construcción"
                                                        name = "area_construccion"
                                                        leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                                        expresionRegular = {expresiones.dimension}                
                                                    /> 

                                                </p>
                                                <br/>
                                                <p>    
                                                    <tr>
                                                        <td>Año de construcción:</td>
                                                        <td>
                                                        <select 
                                                            className="custom-select"
                                                            id="anio_construccion" 
                                                            name="anio_construccion"
                                                            value = {anio_construccion.campo}
                                                            onChange = {(e) => {
                                                            const anioConstruccionSeleccionado = e.target.value;
                                                            cambiarAnioConstruccion({campo: anioConstruccionSeleccionado});
                                                            }}
                                                        >
                                                        
                                                        <option value="" >-------------</option>
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
                                                    
                                                    <tr>
                                                        <td>Año de restauración:</td>
                                                        <td>
                                                        <select 
                                                            className="custom-select"
                                                            id="anio_restauracion" 
                                                            name="anio_restauracion"
                                                            value = {anio_restauracion.campo}
                                                            onChange = {(e) => {
                                                            const anioRestauracionSeleccionado = e.target.value;
                                                            cambiarAnioRestauracion({campo: anioRestauracionSeleccionado});
                                                            }}
                                                        >
                                                        
                                                        <option value="" >-------------</option>
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
                                                    </p>
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Estado de conservación:</td>
                                                            <td style={{padding: '0px', paddingLeft:'25px'}}>
                                                            <select 
                                                                className="form-select form-select-md"
                                                                class="custom-select"
                                                                id="conservacion" 
                                                                name="conservacion" 
                                                                value = {estado_conservacion.campo}
                                                                onChange = {(e) => {
                                                                const estadoConservacionSeleccionado = e.target.value;
                                                                cambiarEstadoConservacion({campo: estadoConservacionSeleccionado});
                                                                }}
                                                            >
                                                                
                                                            <option value="" >-------------</option>
                                                            <option value="Muy bueno">Muy bueno</option>
                                                            <option value="Bueno">Bueno</option>
                                                            <option value="Regular">Regular</option>
                                                            <option value="Malo">Malo</option>
                                                            <option value="A reparar">A reparar</option>
                                                            <option value="Obsoleto(ruina)">Obsoleto(ruina)</option>
                                                            <option value="En construcción">En construcción</option>
                                                                                    
                                                        </select> </td>
                                                        </tr>
                                                    </p>         
                                                    <hr></hr>
                                            </div>
                                        </center>
                                        <br/>
                                        <center>
                                            <div id="contenedor">

                                                    <h4><b>Estructura: </b></h4>
                                                    <hr/>
                                                    <br/>
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Mampostería soportante:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="mamposteria" 
                                                                name="mamposteria" 
                                                                value = {mamposteria_soportante.campo}
                                                                onChange = {(e) => {
                                                                const mamposteriaSoportanteSeleccionado = e.target.value;
                                                                cambiarMamposteriaSoportante({campo: mamposteriaSoportanteSeleccionado});
                                                                }}
                                                            >
                                                                                        
                                                            <option value="" >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Adobe">Adobe</option>
                                                            <option value="Bloque">Bloque</option>
                                                            <option value="Ladrillo">Ladrillo</option>
                                                            <option value="Piedra">Piedra</option>
                                                            <option value="Taplal">Taplal</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>         
                                                
                                                        
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Columnas:</td>
                                                            <td>
                                                            <select 
                                                                class="form-select form-select-sm" 
                                                                className="custom-select"
                                                                id="columnas" 
                                                                name="columnas" 
                                                                value = {columnas.campo}
                                                                onChange = {(e) => {
                                                                const columnasSeleccionadas = e.target.value;
                                                                cambiarColumnas({campo: columnasSeleccionadas});
                                                                }}
                                                            >
                                                                                            
                                                            <option value="" >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Acero">Acero</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Hierro perfil">Hierro perfil</option>
                                                            <option value="Hormigón armado">Hormigón armado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Metal y hormigón">Metal y hormigón</option>
                                                            <option value="Pilotaje de hormigón armado">Pilotaje de hormigón armado</option>
                                                            <option value="Madera fina">Madera fina</option>
                                                            <option value="Hierro cercha">Hierro cercha</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p> 
                                                
                                                        
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Vigas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="vigas" 
                                                                name="vigas" 
                                                                value = {vigas.campo}
                                                                onChange = {(e) => {
                                                                const vigasSeleccionadas = e.target.value;
                                                                cambiarVigas({campo: vigasSeleccionadas});
                                                                }}
                                                            >
                                                
                                                            <option value="" >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Acero">Acero</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Hierro perfil">Hierro perfil</option>
                                                            <option value="Hormigón armado">Hormigón armado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera fina">Madera fina</option>
                                                            <option value="Hierro cercha">Hierro cercha</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>     
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Entrepiso:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="entrepiso" 
                                                                name="entrepiso" 
                                                                value = {entrepiso.campo}
                                                                onChange = {(e) => {
                                                                const entrepisoSeleccionadas = e.target.value;
                                                                cambiarEntrepiso({campo: entrepisoSeleccionadas});
                                                                }}
                                                            >
                                                
                                                            <option value="" >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Acero hormigón">Acero hormigón</option>
                                                            <option value="Hierro hormigón">Hierro hormigón</option>
                                                            <option value="Losa hormigón armado">Losa hormigón armado</option>
                                                            <option value="Madera-hormigón">Madera-hormigón </option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera procesada fina">Madera procesada fina</option>
                                                            <option value="Caña">Caña</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>  
                                                
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Cubierta - Entrepiso:</td>
                                                            <td style={{padding: '0px', paddingLeft:'0px',paddingRight:'25px'}}>
                                                            <select 
                                                                className="custom-select"
                                                                id="cubierta_piso" 
                                                                name="cubierta_piso" 
                                                                value = {cubierta_entrepiso.campo}
                                                                onChange = {(e) => {
                                                                const cubiertaEntrepisoSeleccionada = e.target.value;
                                                                cambiarCubiertaEntrepiso({campo: cubiertaEntrepisoSeleccionada});
                                                                }}
                                                            >
                                                
                                                            <option value="" >-------------</option>                                                                            
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Acero">Acero</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Hierro perfiles">Hierro perfiles</option>
                                                            <option value="Losa hormigón armado">Losa hormigón armado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera procesada fina">Madera procesada fina</option>
                                                            <option value="Estereoestructura">Estereoestructura</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Gradas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="gradas" 
                                                                name="gradas" 
                                                                value = {gradas.campo}
                                                                onChange = {(e) => {
                                                                const gradasSeleccionadas = e.target.value;
                                                                cambiarGradas({campo: gradasSeleccionadas});
                                                                }}
                                                            >
                                                
                                                            <option value="" >-------------</option>                                                                            
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Metálica">Metálica</option>
                                                            <option value="Hormigón armado">Hormigón armado</option>
                                                            <option value="Madera fina">Madera fina</option>
                                                            <option value="Mixta metálica">Mixta metálica</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                    <br/>
                                                
                                                
                                                    <hr/>
                                                    <h4><b>Rellenos: </b></h4>
                                                    <br/>
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Contrapiso:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="contrapiso" 
                                                                name="contrapiso" 
                                                                value = {contrapiso.campo}
                                                                onChange = {(e) => {
                                                                const contrapisoSeleccionado = e.target.value;
                                                                cambiarContrapiso({campo: contrapisoSeleccionado});
                                                                }}
                                                            >
                                                                                        
                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Hormigón simple">Hormigón simple</option>
                                                            <option value="Ladrillo visto">Ladrillo visto</option>
                                                            <option value="Tierra">Tierra</option>
                                                            <option value="Caña">Caña</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Paredes:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="paredes" 
                                                                name="paredes" 
                                                                value = {paredes.campo}
                                                                onChange = {(e) => {
                                                                const paredesSeleccionadas = e.target.value;
                                                                cambiarParedes({campo: paredesSeleccionadas});
                                                                }}
                                                            >
                                                                                        
                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Bahareque">Bahareque</option>
                                                            <option value="Bloque">Bloque</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Ladrillo">Ladrillo</option>
                                                            <option value="Ferro cemento">Ferro cemento</option>
                                                            <option value="Gypsum">Gypsum</option>
                                                            <option value="Prefabricado">Prefabricado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera procesada fina">Madera procesada fina</option>
                                                            <option value="Malla">Malla</option>
                                                            <option value="Zinc">Zinc</option>
                                                            <option value="Lona">Lona</option>                                                
                                                            <option value="Piedra">Piedra</option>                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Enlucido paredes:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="enlucido_paredes" 
                                                                name="enlucido_paredes" 
                                                                value = {enlucido_paredes.campo}
                                                                onChange = {(e) => {
                                                                const enlucidoParedesSeleccionadas = e.target.value;
                                                                cambiarEnlucidoParedes({campo: enlucidoParedesSeleccionadas});
                                                                }}
                                                            >
                                                
                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                                                                                    
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Enlucido tumbados:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="enlucido_tumbados" 
                                                                name="enlucido_tumbados" 
                                                                value = {enlucido_tumbados.campo}
                                                                onChange = {(e) => {
                                                                const enlucidoTumbadosSeleccionadas = e.target.value;
                                                                cambiarEnlucidoTumbados({campo: enlucidoTumbadosSeleccionadas});
                                                                }}
                                                            >
                                                
                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                                                                                    
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                            </div>
                                        </center>
                                        <br/>
                                        <center>

                                            <div id="contenedor">
                                            
                                                    <h4><b>Acabados: </b></h4>
                                                    <hr/>
                                                    <br/>
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td >Revestimiento pared interior:</td>
                                                            <td >
                                                            <select 
                                                                className="custom-select"
                                                                id="rev_interior" 
                                                                name="rev_interior" 
                                                                value = {revestimiento_pared_interior.campo}
                                                                onChange = {(e) => {
                                                                const paredInteriorSeleccionada = e.target.value;
                                                                cambiarRevestimientoParedInterior({campo: paredInteriorSeleccionada});
                                                                }}
                                                                >
                                                        
                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Calciminas">Calciminas</option>
                                                            <option value="Pintura caucho">Pintura caucho</option>
                                                            <option value="Pintura esmalte">Pintura esmalte</option>
                                                            <option value="Graniplast">Graniplast</option>
                                                            <option value="Alucobond aluminio">Alucobond aluminio</option>
                                                            <option value="Cerámica">Cerámica</option>
                                                            <option value="Fachaleta">Fachaleta</option>
                                                            <option value="Laca">Laca</option>
                                                            <option value="Madera">Madera</option>
                                                            <option value="Mortero arena-cemento">Mortero arena-cemento</option>
                                                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Revestimiento pared exterior:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="rev_exterior" 
                                                                name="rev_exterior" 
                                                                value = {revestimiento_pared_exterior.campo}
                                                                onChange = {(e) => {
                                                                const paredExteriorSeleccionada = e.target.value;
                                                                cambiarRevestimientoParedExterior({campo: paredExteriorSeleccionada});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Calciminas">Calciminas</option>
                                                            <option value="Pintura caucho">Pintura caucho</option>
                                                            <option value="Pintura esmalte">Pintura esmalte</option>
                                                            <option value="Graniplast">Graniplast</option>
                                                            <option value="Alucobond aluminio">Alucobond aluminio</option>
                                                            <option value="Cerámica">Cerámica</option>
                                                            <option value="Fachaleta">Fachaleta</option>
                                                            <option value="Laca">Laca</option>
                                                            <option value="Madera">Madera</option>
                                                            <option value="Mortero arena-cemento">Mortero arena-cemento</option>
                                                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Revestimiento cubierta:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="rev_cubierta" 
                                                                name="rev_cubierta" 
                                                                value = {revestimiento_cubierta.campo}
                                                                onChange = {(e) => {
                                                                const cubiertaSeleccionada = e.target.value;
                                                                cambiarRevestimientoCubierta({campo: cubiertaSeleccionada});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Arena cemento">Arena cemento</option>
                                                            <option value="Asbesto cemento">Asbesto cemento</option>
                                                            <option value="Cady paja">Cady paja</option>
                                                            <option value="Cerámica">Cerámica</option>
                                                            <option value="Chova">Chova</option>
                                                            <option value="Ferro cemento">Ferro cemento</option>
                                                            <option value="Madera ladrillo">Madera ladrillo</option>
                                                            <option value="Policarbonato">Policarbonato</option>
                                                            <option value="Teja ordinaria">Teja ordinaria</option>
                                                            <option value="Teja vidriada">Teja vidriada</option>
                                                            <option value="Tejuelo">Tejuelo</option>
                                                            <option value="Zinc">Zinc</option>
                                                            <option value="Steel panel">Steel panel</option>
                                                            <option value="Fibras naturales">Fibras naturales</option>
                                                            <option value="Polietileno">Polietileno</option>
                                                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Tumbados:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="tumbados" 
                                                                name="tumbados" 
                                                                value = {tumbados.campo}
                                                                onChange = {(e) => {
                                                                const tumbadosSeleccionados = e.target.value;
                                                                cambiarTumbados({campo: tumbadosSeleccionados});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Caña enlucida">Caña enlucida</option>
                                                            <option value="Fibra mineral">Fibra mineral</option>
                                                            <option value="Gypsum">Gypsum</option>
                                                            <option value="Madera procesada fina">Madera procesada fina</option>
                                                            <option value="Madera triplex">Madera triplex</option>
                                                            <option value="Malla enlucida">Malla enlucida</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Sintético">Sintético</option>
                                                            <option value="Yeso + perfíl metálico">Yeso + perfíl metálico</option>
                                                            <option value="Mortero arena-cemento">Mortero arena-cemento</option>
                                                                                                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Ventanas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="ventanas" 
                                                                name="ventanas" 
                                                                value = {ventanas.campo}
                                                                onChange = {(e) => {
                                                                const ventanasSeleccionadas = e.target.value;
                                                                cambiarVentanas({campo: ventanasSeleccionadas});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Aluminio">Aluminio</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Hierro">Hierro</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera procesada fina">Madera procesada fina</option>
                                                            <option value="Plástico preformado">Plástico preformado</option>
                                                            <option value="Enrollable">Enrollable</option>
                                                                                                                                                        
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Vidrios:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="vidrios" 
                                                                name="vidrios" 
                                                                value = {vidrios.campo}
                                                                onChange = {(e) => {
                                                                const vidrioSeleccionado = e.target.value;
                                                                cambiarVidrios({campo: vidrioSeleccionado});
                                                                }} 
                                                            >
                                                            
                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Malla">Malla</option>
                                                            <option value="Vidrio común">Vidrio común</option>
                                                            <option value="Vidrio templado">Vidrio templado</option>
                                                            <option value="Vidrio catedral">Vidrio catedral</option>
                                                                                                                                                        
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Puertas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="puertas" 
                                                                name="puertas" 
                                                                value = {puertas.campo}
                                                                onChange = {(e) => {
                                                                const puertasSeleccionadas = e.target.value;
                                                                cambiarPuertas({campo: puertasSeleccionadas});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Aluminio-vidrio">Aluminio-vidrio</option>
                                                            <option value="Hierro">Hierro</option>
                                                            <option value="Madera panelada">Madera panelada</option>
                                                            <option value="Madera tamborada">Madera tamborada</option>
                                                            <option value="Metálica enrollable">Metálica enrollable</option>
                                                            <option value="Plástico preformado">Plástico preformado</option>
                                                            <option value="Tol">Tol</option>
                                                            <option value="Vidrio templado">Vidrio templado</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Malla">Malla</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera fina">Madera fina</option>
                                                            <option value="Metálica reforzada">Metálica reforzada</option>
                                                            <option value="Hierro-madera">Hierro-madera</option>
                                                            <option value="Madera-malla">Madera-malla</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Closets:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="closets" 
                                                                name="closets" 
                                                                value = {closets.campo}
                                                                onChange = {(e) => {
                                                                const closetsSeleccionados = e.target.value;
                                                                cambiarClosets({campo: closetsSeleccionados});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                                    
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Pisos:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="pisos" 
                                                                name="pisos" 
                                                                value = {pisos.campo}
                                                                onChange = {(e) => {
                                                                const pisosSeleccionados = e.target.value;
                                                                cambiarPisos({campo: pisosSeleccionados});
                                                                }}
                                                            >
                                                            
                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Adoquín">Adoquín</option>
                                                            <option value="Alfombra">Alfombra</option>
                                                            <option value="Cerámica">Cerámica</option>
                                                            <option value="Césped sintético">Césped sintético</option>
                                                            <option value="Duela procesada">Duela procesada</option>
                                                            <option value="En cemento">En cemento</option>
                                                            <option value="Flotante">Flotante</option>
                                                            <option value="Gres">Gres</option>
                                                            <option value="Lámina de tol corrugado">Lámina de tol corrugado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Mármol">Mármol</option>
                                                            <option value="Marmolina">Marmolina</option>
                                                            <option value="Parquet">Parquet</option>
                                                            <option value="Pintura">Pintura</option>
                                                            <option value="Porcelanato">Porcelanato</option>
                                                            <option value="Tablón">Tablón</option>
                                                            <option value="Vinyl">Vinyl</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Gradas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="gradas_acabados" 
                                                                name="gradas_acabados" 
                                                                value = {gradas_acabados.campo}
                                                                onChange = {(e) => {
                                                                const gradasAcabadosSeleccionados = e.target.value;
                                                                cambiarGradasAcabados({campo: gradasAcabadosSeleccionados});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Adoquín">Adoquín</option>
                                                            <option value="Alfombra">Alfombra</option>
                                                            <option value="Cerámica">Cerámica</option>
                                                            <option value="Césped sintético">Césped sintético</option>
                                                            <option value="Duela procesada">Duela procesada</option>
                                                            <option value="En cemento">En cemento</option>
                                                            <option value="Flotante">Flotante</option>
                                                            <option value="Gres">Gres</option>
                                                            <option value="Lámina de tol corrugado">Lámina de tol corrugado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Mármol">Mármol</option>
                                                            <option value="Marmolina">Marmolina</option>
                                                            <option value="Parquet">Parquet</option>
                                                            <option value="Pintura">Pintura</option>
                                                            <option value="Porcelanato">Porcelanato</option>
                                                            <option value="Tablón">Tablón</option>
                                                            <option value="Vinyl">Vinyl</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Protección ventanas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="ventanas_proteccion" 
                                                                name="ventanas_proteccion" 
                                                                value = {proteccion_ventanas.campo}
                                                                onChange = {(e) => {
                                                                const proteccionVentanasSeleccionadas = e.target.value;
                                                                cambiarProteccion_ventanas({campo: proteccionVentanasSeleccionadas});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                                    
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                            </div>
                                        </center>
                                        <br/>
                                        <center>
                                            <div id="contenedor">

                                                    
                                                    <h4><b>Unidad de vivienda: </b></h4>
                                                    <hr/>
                                                    <br/>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Clasificación de vivienda:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="clasificacion" 
                                                                name="clasificacion" 
                                                                value = {clasificacion_vivienda.campo}
                                                                onChange = {(e) => {
                                                                const clasificacionViviendaSeleccionada = e.target.value;
                                                                cambiarClasificacionVivienda({campo: clasificacionViviendaSeleccionada});
                                                                }}
                                                            >
                                                        
                                                            <option value="">-------------</option>
                                                            <option value="No aplica">No aplica</option>
                                                            <option value="Bodega">Bodega</option>
                                                            <option value="Casa">Casa</option>
                                                            <option value="Choza">Choza</option>
                                                            <option value="Covacha">Covacha</option>
                                                            <option value="Cuarto en casa de inquilinato">Cuarto en casa de inquilinato</option>
                                                            <option value="Departamento en casa o edificio">Departamento en casa o edificio</option>
                                                            <option value="Local comercial">Local comercial</option>
                                                            <option value="Mediagua">Mediagua</option>
                                                            <option value="Oficina">Oficina</option>
                                                            <option value="Otra vivienda">Otra vivienda</option>
                                                            <option value="Parqueadero">Parqueadero</option>
                                                            <option value="Rancho">Rancho</option>
                                                            <option value="Villa">Villa</option>
                                                                        
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Tipo de vivienda:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="tipo_vivienda" 
                                                                name="tipo_vivienda" 
                                                                value = {tipo_vivienda.campo}
                                                                onChange = {(e) => {
                                                                const tipoViviendaSeleccionada = e.target.value;
                                                                cambiarTipoVivienda({campo: tipoViviendaSeleccionada});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="Particular">Particular</option>
                                                            <option value="Colectiva">Colectiva</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Condición de ocupación:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="ocupacion" 
                                                                name="ocupacion" 
                                                                value = {condicion_ocupacion.campo}
                                                                onChange = {(e) => {
                                                                const ocupacionSeleccionada = e.target.value;
                                                                cambiarCondicionOcupacion({campo: ocupacionSeleccionada});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="Ocupada">Ocupada</option>
                                                            <option value="Desocupada">Desocupada</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Acabado piso:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="piso_acabado" 
                                                                name="piso_acabado" 
                                                                value = {acabado_piso.campo}
                                                                onChange = {(e) => {
                                                                const acabadoPisoSeleccionado = e.target.value;
                                                                cambiarAcabadoPiso({campo: acabadoPisoSeleccionado});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Estado de piso:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="piso_estado" 
                                                                name="piso_estado" 
                                                                value = {estado_piso.campo}
                                                                onChange = {(e) => {
                                                                const estadoPisoSeleccionado = e.target.value;
                                                                cambiarEstadoPiso({campo: estadoPisoSeleccionado});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="Bueno">Bueno</option>
                                                            <option value="Malo">Malo</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Número de hogares:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="hogares" 
                                                                name="hogares" 
                                                                value = {numero_hogares.campo}
                                                                onChange = {(e) => {
                                                                const hogaresSeleccionados = e.target.value;
                                                                cambiarNumeroHogares({campo: hogaresSeleccionados});
                                                                }}
                                                            >
                                                  
                                                            
                                                            
                                                            <option value="">-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Número de habitantes:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="habitantes" 
                                                                name="habitantes" 
                                                                value = {numero_habitantes.campo}
                                                                onChange = {(e) => {
                                                                const habitantesSeleccionados = e.target.value;
                                                                cambiarNumeroHabitantes({campo: habitantesSeleccionados});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Número de habitaciones:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="habitaciones" 
                                                                name="habitaciones" 
                                                                value = {numero_habitaciones.campo}
                                                                onChange = {(e) => {
                                                                const habitacionesSeleccionadas = e.target.value;
                                                                cambiarNumeroHabitaciones({campo: habitacionesSeleccionadas});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Número de dormitorios:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="dormitorios" 
                                                                name="dormitorios" 
                                                                value = {numero_dormitorios.campo}
                                                                onChange = {(e) => {
                                                                const dormitoriosSeleccionados = e.target.value;
                                                                cambiarNumeroDormitorios({campo: dormitoriosSeleccionados});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Espacios para bañarse (duchas):</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="duchas" 
                                                                name="duchas" 
                                                                value = {espacios_aseo_duchas.campo}
                                                                onChange = {(e) => {
                                                                const duchasSeleccionadas = e.target.value;
                                                                cambiarEspaciosAseoDuchas({campo: duchasSeleccionadas});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Tenencia de la vivienda:</td>
                                                            <td>
                                                            <select 
                                                                class="form-select form-select-sm" 
                                                                className="custom-select"
                                                                id="tenencia_vivienda" 
                                                                name="tenencia_vivienda" 
                                                                value = {tenencia_vivienda.campo}
                                                                onChange = {(e) => {
                                                                const tenenciaViviendaSeleccionada = e.target.value;
                                                                cambiarTenenciaVivienda({campo: tenenciaViviendaSeleccionada});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="Anticresis">Anticresis</option>
                                                            <option value="Arrendada">Arrendada</option>
                                                            <option value="Por servicios">Por servicios</option>
                                                            <option value="Prestada o cedida (no paga)">Prestada o cedida (no paga)</option>
                                                            <option value="Propia (heredada,donada o posesión)">Propia (heredada,donada o posesión)</option>
                                                            <option value="Propia y la está pagando">Propia y la está pagando</option>
                                                            <option value="Propia y totalmente pagada">Propia y totalmente pagada</option>
                                                                        
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Posee teléfono convencional:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="telf_convencional" 
                                                                name="telf_convencional" 
                                                                value = {telefono_convencional.campo}
                                                                onChange = {(e) => {
                                                                const telefonoSeleccionado = e.target.value;
                                                                cambiarTelefonoConvencional({campo: telefonoSeleccionado});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>No. de teléfonos celulares:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="celulares" 
                                                                name="celulares" 
                                                                value = {cantidad_celulares.campo}
                                                                onChange = {(e) => {
                                                                const celularSeleccionado = e.target.value;
                                                                cambiarCantidadCelulares({campo: celularSeleccionado});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Servicio de internet:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="internet" 
                                                                name="internet" 
                                                                value = {servicio_internet.campo}
                                                                onChange = {(e) => {
                                                                const internetSeleccionado = e.target.value;
                                                                cambiarServicioInternet({campo: internetSeleccionado});
                                                                }}
                                                            >

                                                            <option value="">-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                    
                                                    <hr/>      
                                                    <br/>
                                            </div>
                                        </center>


                                </div>

                            </ModalBody>

                 
                        <ModalFooter>
                    
                                    <button className="btn btn-primary" onClick={()=>postConstruccion()} >Insertar</button>{"  "}                  
                    
                                    <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>                   
                    
                        </ModalFooter>
            </Modal>

            <br/>

            <Modal isOpen={modalEditar}>
                <ModalHeader><b>Editar Obra</b></ModalHeader>
                <ModalBody>
                            
                                <div className="form-group">
                                <label htmlFor="id">ID Construcción: {id_construccion.campo}</label>
                                <br/>
                                <br/>                                                
                                <center>
                                <div id="contenedor">
                                    <h4><b>Clave Bloque:</b></h4>
                                    <hr/>
                                    <br/>
                                        <p>
                                            <tr>   
                                            
                                                <td>No. Bloque:</td>
                                                <td>
                                                <select 
                                                    className="custom-select" 
                                                    id="bloque"
                                                    name="bloque" 
                                                    value = {numero_bloque.campo}
                                                    onChange = {(e) => {
                                                    const bloqueSeleccionado = e.target.value;
                                                    cambiarNumeroBloque({campo: bloqueSeleccionado});
                                                }} 
                                                >
                                                                
                                                <option value={numero_bloque.campo} selected>{numero_bloque.campo}</option>    
                                                <option value="" disabled>----------</option>
                                                <option value="0">0</option>
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
                                                
                                            </select> </td>
                                            </tr>
                                        </p>
                                        <br/>
                                        <p>
                                            <tr>    
                                                
                                                    <td>No. Piso:</td>
                                                    <td>
                                                    <select 
                                                        className="custom-select" 
                                                        id="piso"
                                                        name="piso" 
                                                        value = {numero_piso.campo}
                                                        onChange = {(e) => {
                                                        const pisoSeleccionado = e.target.value;
                                                        cambiarNumeroPiso({campo: pisoSeleccionado});
                                                        }}
                                                    >
                                                    <option value={numero_piso.campo} selected>{numero_piso.campo}</option>    
                                                    <option value="" disabled>----------</option>
                                                    <option value="0">0</option>
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
                                                    
                                                </select> </td>
                                                </tr>
                                            </p>
                                            <br/>
                                            <p>
                                                    <tr>    
                                                
                                                    <td>No. Unidad:</td>
                                                    <td>
                                                    <select 
                                                        className="custom-select" 
                                                        id="unidad" 
                                                        name="unidad" 
                                                        value = {numero_unidad.campo}
                                                        onChange = {(e) => {
                                                        const unidadSeleccionada = e.target.value;
                                                        cambiarNumeroUnidad({campo: unidadSeleccionada});
                                                        }}
                                                    >
                                                    
                                                    <option value={numero_unidad.campo} selected >{numero_unidad.campo}</option>
                                                    <option value="" disabled>----------</option>
                                                    <option value="0">0</option>
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
                                                    
                                                </select> </td>
                                                </tr>
                                            </p>    
                                                <hr/>   
                                                <br/>

                                                <h4><b>Datos descriptivos del bloque:</b> </h4>
                                                <br/>
                                                <hr/>
                                                <br/>
                                                <p>
                                                <tr>      
                                                    
                                                        <td>Nivel del piso:</td>
                                                        <td>
                                                        <select 
                                                            className="custom-select" 
                                                            id="nivel_piso" 
                                                            name="nivel_piso" 
                                                            value = {nivel_piso.campo}
                                                            onChange = {(e) => {
                                                            const nivelPisoSeleccionado = e.target.value;
                                                            cambiarNivelPiso({campo: nivelPisoSeleccionado});
                                                            }}
                                                        >

                                                        <option value={nivel_piso.campo} selected >{nivel_piso.campo}</option>
                                                        <option value="" disabled>----------</option>
                                                        <option value="Nivel calzada">Nivel calzada</option>
                                                        <option value="Subsuelo">Subsuelo</option>
                                                                
                                                        
                                                    </select> </td>
                                                    </tr>
                                                </p>
                                                <br/>    
                                                    
                                                <p>
                                                <tr>      
                                                    
                                                        <td>Condición física:</td>
                                                        <td>
                                                        <select 
                                                            class="form-select form-select-lg mb-3"
                                                            className="custom-select" 
                                                            id="condicion_fisica"
                                                            name="condicion_fisica" 
                                                            value = {condicion_fisica.campo}
                                                            onChange = {(e) => {
                                                            const condicionSeleccionada = e.target.value;
                                                            cambiarCondicionFisica({campo: condicionSeleccionada});
                                                            }}
                                                        >

                                                        <option value={condicion_fisica.campo} selected >{condicion_fisica.campo}</option>
                                                        <option value="" disabled>----------</option>
                                                        <option value="No tiene">No tiene</option>
                                                        <option value="Abandonado">Abandonado</option>
                                                        <option value="En acabados">En acabados</option>
                                                        <option value="En estructura">En estructura</option>
                                                        <option value="Reconstruida">Reconstruida</option>
                                                        <option value="Sin modificación">Sin modificación</option>
                                                        <option value="Terminada">Terminada</option>
                                                        <option value="En obra gris">En obra gris</option>
                                                                    
                                                    </select> </td>
                                                    </tr>
                                                </p>    

                                                    
                                                <p>
                                                <tr>      
                                                    
                                                        <td>Uso constructivo:</td>
                                                        <td>
                                                        <select 
                                                            class="form-select form-select-lg mb-3" 
                                                            className="custom-select" 
                                                            id="uso"
                                                            name="uso" 
                                                            value = {uso_constructivo.campo}
                                                            onChange = {(e) => {
                                                            const usoSeleccionado = e.target.value;
                                                            cambiarUsoConstructivo({campo: usoSeleccionado});
                                                            }}
                                                        >

                                                        <option value={uso_constructivo.campo} selected >{uso_constructivo.campo}</option>
                                                        <option value="" disabled >-------------</option>
                                                        <option value="No tiene">No tiene</option>
                                                        <option value="Balcón">Balcón</option>
                                                        <option value="Banco">Banco</option>
                                                        <option value="Baño/Sauna/Turco">Baño/Sauna/Turco</option>
                                                        <option value="Bodega">Bodega</option>
                                                        <option value="Casa">Casa</option>
                                                        <option value="Casa comunal">Casa comunal</option>
                                                        <option value="Cuarto de máquinas/basura">Cuarto de máquinas/basura</option>
                                                        <option value="Departamento">Departamento</option>
                                                        <option value="Garita/Guardianía">Garita/Guardianía</option>
                                                        <option value="Gimnasio">Gimnasio</option> 
                                                        <option value="Guardería">Guardería</option> 
                                                        <option value="Hospital">Hospital</option> 
                                                        <option value="Hostal">Hostal</option> 
                                                        <option value="Hostería">Hostería</option> 
                                                        <option value="Hotel">Hotel</option> 
                                                        <option value="Iglesia">Iglesia</option> 
                                                        <option value="Lavandería">Lavandería</option> 
                                                        <option value="Local comercial">Local comercial</option> 
                                                        <option value="Malecón">Malecón</option> 
                                                        <option value="Maternidad">Maternidad</option> 
                                                        <option value="Mercado">Mercado</option> 
                                                        <option value="Mirador">Mirador</option> 
                                                        <option value="Motel">Motel</option> 
                                                        <option value="Museo">Museo</option> 
                                                        <option value="Nave industrial">Nave industrial</option> 
                                                        <option value="Oficina">Oficina</option> 
                                                        <option value="Orfanato">Orfanato</option> 
                                                        <option value="Organismos internacionales">Organismos internacionales</option> 
                                                        <option value="Otros">Otros</option> 
                                                        <option value="Parqueadero">Parqueadero</option> 
                                                        <option value="Patio/Jardín">Patio/Jardín</option> 
                                                        <option value="Pensión">Pensión</option> 
                                                        <option value="Plantel avícola">Plantel avícola</option> 
                                                        <option value="Plaza de toros">Plaza de toros</option> 
                                                        <option value="Porqueriza">Porqueriza</option> 
                                                        <option value="Recinto militar">Recinto militar</option> 
                                                        <option value="Recinto policial">Recinto policial</option> 
                                                        <option value="Reclusorio">Reclusorio</option> 
                                                        <option value="Representaciones diplomáticas">Representaciones diplomáticas</option> 
                                                        <option value="Restaurante">Restaurante</option>
                                                        <option value="Retén policial">Retén policial</option>
                                                        <option value="Sala comunal">Sala comunal</option>
                                                        <option value="Sala de cine">Sala de cine</option>
                                                        <option value="Sala de exposición">Sala de exposición</option>
                                                        <option value="Sala de juegos">Sala de juegos</option>
                                                        <option value="Sala de ordeño">Sala de ordeño</option>
                                                        <option value="Sala de culto/Templo">Sala de culto/Templo</option>
                                                        <option value="Sala de hospitalización">Sala de hospitalización</option>
                                                        <option value="Salón de eventos">Salón de eventos</option>
                                                        <option value="Teatro">Teatro</option>
                                                        <option value="Terminal de transferencia">Terminal de transferencia</option>
                                                        <option value="Terminal interprovincial">Terminal interprovincial</option>
                                                        <option value="Terraza">Terraza</option>
                                                        <option value="Unidad policía comunitaria">Unidad policía comunitaria</option>             
                                                        <option value="Centro de salúd">Centro de salúd</option>             
                                                        <option value="Galpón talleres menores">Galpón talleres menores</option>             
                                                        <option value="Galpón pequeña industria">Galpón pequeña industria</option>             
                                                        <option value="Galpón industrial">Galpón industrial</option>             
                                                        <option value="Establecimiento educativo">Establecimiento educativo</option>             
                                                        
                                                    </select> </td>
                                                    </tr>
                                                </p>
                                                <br/>    
                                                    
                                                <p>
                                                <tr>      
                                                    
                                                        <td>Valor cultural:</td>
                                                        <td>
                                                        <select 
                                                            class="form-select form-select-lg mb-3" 
                                                            className="custom-select" 
                                                            id="valor_cultural" 
                                                            name="valor_cultural" 
                                                            value = {valor_cultural.campo}
                                                            onChange = {(e) => {
                                                            const valorCulturalSeleccionado = e.target.value;
                                                            cambiarValorCultural({campo: valorCulturalSeleccionado});
                                                            }}
                                                        >

                                                        <option value={valor_cultural.campo} selected >{valor_cultural.campo}</option>
                                                        <option value="" disabled >-------------</option>
                                                        <option value="No tiene">No tiene</option>
                                                        <option value="Ancestral">Ancestral</option>
                                                        <option value="Arquitectónico">Arquitectónico</option>
                                                        <option value="Histórico">Histórico</option>
                                                        <option value="Reconstruida">Reconstruida</option>
                                                                                
                                                    </select> </td>
                                                    </tr>
                                                </p> 
                                                <br/>
                                                <p>


                                                    <ComponenteInput
                                                        estado={area_construccion}
                                                        cambiarEstado={cambiarAreaConstruccion}
                                                        tipo= "text"
                                                        label="Área de construcción (m²)"
                                                        placeholder= "Metros de construcción"
                                                        name = "area_construccion"
                                                        leyendaError = "Valores enteros y decimales hasta 3 dígitos de precisión"
                                                        expresionRegular = {expresiones.dimension}                
                                                    /> 

                                                </p>
                                                <br/>

                                                <br/>

                                                <p>    
                                                    <tr>
                                                        <td>Año de construcción:</td>
                                                        <td>
                                                        <select 
                                                            className="custom-select" 
                                                            id="anio_construccion" 
                                                            name="anio_construccion"
                                                            value = {anio_construccion.campo}
                                                            onChange = {(e) => {
                                                            const anioConstruccionSeleccionado = e.target.value;
                                                            cambiarAnioConstruccion({campo: anioConstruccionSeleccionado});
                                                            }}
                                                        >
                                                        
                                                        <option value={anio_construccion.campo} selected >{anio_construccion.campo}</option>
                                                        <option value="" disabled >-------------</option>
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
                                                    </p>

                                                <p>    
                                                    <tr>
                                                        <td>Año de restauración:</td>
                                                        <td>
                                                        <select 
                                                            className="custom-select"
                                                            id="anio_restauracion"
                                                            name="anio_restauracion"
                                                            value = {anio_restauracion.campo}
                                                            onChange = {(e) => {
                                                            const anioRestauracionSeleccionado = e.target.value;
                                                            cambiarAnioRestauracion({campo: anioRestauracionSeleccionado});
                                                            }}
                                                        >
                                                        
                                                        <option value={anio_restauracion.campo} selected >{anio_restauracion.campo}</option>
                                                        <option value="" disabled >-------------</option>
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
                                                    </p>
                                                    <br/>
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Estado de conservación:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="conservacion"
                                                                name="conservacion" 
                                                                value = {estado_conservacion.campo}
                                                                onChange = {(e) => {
                                                                const estadoConservacionSeleccionado = e.target.value;
                                                                cambiarEstadoConservacion({campo: estadoConservacionSeleccionado});
                                                                }}
                                                            >
                                                                
                                                            <option value={estado_conservacion.campo} selected >{estado_conservacion.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="Muy bueno">Muy bueno</option>
                                                            <option value="Bueno">Bueno</option>
                                                            <option value="Regular">Regular</option>
                                                            <option value="Malo">Malo</option>
                                                            <option value="A reparar">A reparar</option>
                                                            <option value="Obsoleto(ruina)">Obsoleto(ruina)</option>
                                                            <option value="En construcción">En construcción</option>
                                                                                    
                                                        </select> </td>
                                                        </tr>
                                                    </p>         
                                                    <hr></hr>
                                            </div>
                                        </center>
                                        <br/>
                                        <center>
                                            <div id="contenedor">

                                                    <h4><b>Estructura: </b></h4>
                                                    <hr/>
                                                    <br/>
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Mampostería soportante:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="mamposteria"
                                                                name="mamposteria" 
                                                                value = {mamposteria_soportante.campo}
                                                                onChange = {(e) => {
                                                                const mamposteriaSeleccionada = e.target.value;
                                                                cambiarMamposteriaSoportante({campo: mamposteriaSeleccionada});
                                                                }}
                                                            >
                                                                                        
                                                            <option value={mamposteria_soportante.campo} selected >{mamposteria_soportante.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Adobe">Adobe</option>
                                                            <option value="Bloque">Bloque</option>
                                                            <option value="Ladrillo">Ladrillo</option>
                                                            <option value="Piedra">Piedra</option>
                                                            <option value="Taplal">Taplal</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>         
                                                
                                                        
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Columnas:</td>
                                                            <td>
                                                            <select 
                                                                class="form-select form-select-sm" 
                                                                className="custom-select"
                                                                id="columnas" 
                                                                name="columnas" 
                                                                value = {columnas.campo}
                                                                onChange = {(e) => {
                                                                const columnasSeleccionadas = e.target.value;
                                                                cambiarColumnas({campo: columnasSeleccionadas});
                                                                }}
                                                            >
                                                                                            
                                                            <option value={columnas.campo} selected >{columnas.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Acero">Acero</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Hierro perfil">Hierro perfil</option>
                                                            <option value="Hormigón armado">Hormigón armado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Metal y hormigón">Metal y hormigón</option>
                                                            <option value="Pilotaje de hormigón armado">Pilotaje de hormigón armado</option>
                                                            <option value="Madera fina">Madera fina</option>
                                                            <option value="Hierro cercha">Hierro cercha</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p> 
                                                
                                                        
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Vigas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="vigas" 
                                                                name="vigas" 
                                                                value = {vigas.campo}
                                                                onChange = {(e) => {
                                                                const vigasSeleccionadas = e.target.value;
                                                                cambiarVigas({campo: vigasSeleccionadas});
                                                                }}
                                                            >
                                                
                                                            <option value={vigas.campo} selected >{vigas.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Acero">Acero</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Hierro perfil">Hierro perfil</option>
                                                            <option value="Hormigón armado">Hormigón armado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera fina">Madera fina</option>
                                                            <option value="Hierro cercha">Hierro cercha</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>     
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Entrepiso:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="entrepiso" 
                                                                name="entrepiso"
                                                                value = {entrepiso.campo}
                                                                onChange = {(e) => {
                                                                const entrepisoSeleccionado = e.target.value;
                                                                cambiarEntrepiso({campo: entrepisoSeleccionado});
                                                                }} 
                                                            >
                                                
                                                            <option value={entrepiso.campo} selected >{entrepiso.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Acero hormigón">Acero hormigón</option>
                                                            <option value="Hierro hormigón">Hierro hormigón</option>
                                                            <option value="Losa hormigón armado">Losa hormigón armado</option>
                                                            <option value="Madera-hormigón">Madera-hormigón </option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera procesada fina">Madera procesada fina</option>
                                                            <option value="Caña">Caña</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>  
                                                
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Cubierta - Entrepiso:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="cubierta_piso" 
                                                                name="cubierta_piso" 
                                                                value = {cubierta_entrepiso.campo}
                                                                onChange = {(e) => {
                                                                const cubiertaEntrepisoSeleccionado = e.target.value;
                                                                cambiarCubiertaEntrepiso({campo: cubiertaEntrepisoSeleccionado});
                                                                }} 
                                                            >
                                                
                                                            <option value={cubierta_entrepiso.campo} selected >{cubierta_entrepiso.campo}</option>
                                                            <option value="" disabled >-------------</option>                                                                            
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Acero">Acero</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Hierro perfiles">Hierro perfiles</option>
                                                            <option value="Losa hormigón armado">Losa hormigón armado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera procesada fina">Madera procesada fina</option>
                                                            <option value="Estereoestructura">Estereoestructura</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Gradas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="gradas" 
                                                                name="gradas" 
                                                                value = {gradas.campo}
                                                                onChange = {(e) => {
                                                                const gradasSeleccionadas = e.target.value;
                                                                cambiarGradas({campo: gradasSeleccionadas});
                                                                }} 
                                                            >
                                                
                                                            <option value={gradas.campo} selected >{gradas.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Metálica">Metálica</option>
                                                            <option value="Hormigón armado">Hormigón armado</option>
                                                            <option value="Madera fina">Madera fina</option>
                                                            <option value="Mixta metálica">Mixta metálica</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                                
                                                    <br/>
                                                    <hr/>
                                                    <h4><b>Rellenos: </b></h4>
                                                    <br/>
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Contrapiso:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="contrapiso" 
                                                                name="contrapiso" 
                                                                value = {contrapiso.campo}
                                                                onChange = {(e) => {
                                                                const contrapisoSeleccionado = e.target.value;
                                                                cambiarContrapiso({campo: contrapisoSeleccionado});
                                                                }} 
                                                            >
                                                                                        
                                                            <option value={contrapiso.campo} selected >{contrapiso.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Hormigón simple">Hormigón simple</option>
                                                            <option value="Ladrillo visto">Ladrillo visto</option>
                                                            <option value="Tierra">Tierra</option>
                                                            <option value="Caña">Caña</option>
                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Paredes:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="paredes" 
                                                                name="paredes" 
                                                                value = {paredes.campo}
                                                                onChange = {(e) => {
                                                                const paredesSeleccionadas = e.target.value;
                                                                cambiarParedes({campo: paredesSeleccionadas});
                                                                }} 
                                                            >
                                                                                        
                                                            <option value={paredes.campo} selected >{paredes.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Bahareque">Bahareque</option>
                                                            <option value="Bloque">Bloque</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Ladrillo">Ladrillo</option>
                                                            <option value="Ferro cemento">Ferro cemento</option>
                                                            <option value="Gypsum">Gypsum</option>
                                                            <option value="Prefabricado">Prefabricado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera procesada fina">Madera procesada fina</option>
                                                            <option value="Malla">Malla</option>
                                                            <option value="Zinc">Zinc</option>
                                                            <option value="Lona">Lona</option>                                                
                                                            <option value="Piedra">Piedra</option>                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Enlucido paredes:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="enlucido_paredes" 
                                                                name="enlucido_paredes" 
                                                                value = {enlucido_paredes.campo}
                                                                onChange = {(e) => {
                                                                const enlucidoParedesSeleccionadas = e.target.value;
                                                                cambiarEnlucidoParedes({campo: enlucidoParedesSeleccionadas});
                                                                }} 
                                                            >
                                                
                                                            <option value={enlucido_paredes.campo} selected >{enlucido_paredes.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                                                                                    
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Enlucido tumbados:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="enlucido_tumbados" 
                                                                name="enlucido_tumbados" 
                                                                value = {enlucido_tumbados.campo}
                                                                onChange = {(e) => {
                                                                const enlucidoTumbadosSeleccionadas = e.target.value;
                                                                cambiarEnlucidoTumbados({campo: enlucidoTumbadosSeleccionadas});
                                                                }} 
                                                            >
                                                
                                                            <option value={enlucido_tumbados.campo} selected >{enlucido_tumbados.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                                                                                    
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                            </div>
                                        </center>
                                        <br/>
                                        <center>

                                            <div id="contenedor">
                                            
                                                    <h4><b>Acabados: </b></h4>
                                                    <hr/>
                                                    <br/>
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Revestimiento pared interior:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="rev_interior" 
                                                                name="rev_interior" 
                                                                value = {revestimiento_pared_interior.campo}
                                                                onChange = {(e) => {
                                                                const revestimientoInteriorSeleccionado = e.target.value;
                                                                cambiarRevestimientoParedInterior({campo: revestimientoInteriorSeleccionado});
                                                                }} 
                                                            >
                                                        
                                                            <option value={revestimiento_pared_interior.campo} selected >{revestimiento_pared_interior.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Calciminas">Calciminas</option>
                                                            <option value="Pintura caucho">Pintura caucho</option>
                                                            <option value="Pintura esmalte">Pintura esmalte</option>
                                                            <option value="Graniplast">Graniplast</option>
                                                            <option value="Alucobond aluminio">Alucobond aluminio</option>
                                                            <option value="Cerámica">Cerámica</option>
                                                            <option value="Fachaleta">Fachaleta</option>
                                                            <option value="Laca">Laca</option>
                                                            <option value="Madera">Madera</option>
                                                            <option value="Mortero arena-cemento">Mortero arena-cemento</option>
                                                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Revestimiento pared exterior:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="rev_exterior" 
                                                                name="rev_exterior" 
                                                                value = {revestimiento_pared_exterior.campo}
                                                                onChange = {(e) => {
                                                                const revestimientoExteriorSeleccionado = e.target.value;
                                                                cambiarRevestimientoParedExterior({campo: revestimientoExteriorSeleccionado});
                                                                }} 
                                                            >

                                                            <option value={revestimiento_pared_exterior.campo} selected >{revestimiento_pared_exterior.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Calciminas">Calciminas</option>
                                                            <option value="Pintura caucho">Pintura caucho</option>
                                                            <option value="Pintura esmalte">Pintura esmalte</option>
                                                            <option value="Graniplast">Graniplast</option>
                                                            <option value="Alucobond aluminio">Alucobond aluminio</option>
                                                            <option value="Cerámica">Cerámica</option>
                                                            <option value="Fachaleta">Fachaleta</option>
                                                            <option value="Laca">Laca</option>
                                                            <option value="Madera">Madera</option>
                                                            <option value="Mortero arena-cemento">Mortero arena-cemento</option>
                                                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Revestimiento cubierta:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="rev_cubierta" 
                                                                name="rev_cubierta" 
                                                                value = {revestimiento_cubierta.campo}
                                                                onChange = {(e) => {
                                                                const revestimientoCubiertaSeleccionado = e.target.value;
                                                                cambiarRevestimientoCubierta({campo: revestimientoCubiertaSeleccionado});
                                                                }} 
                                                            >

                                                            <option value={revestimiento_cubierta.campo} selected >{revestimiento_cubierta.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Arena cemento">Arena cemento</option>
                                                            <option value="Asbesto cemento">Asbesto cemento</option>
                                                            <option value="Cady paja">Cady paja</option>
                                                            <option value="Cerámica">Cerámica</option>
                                                            <option value="Chova">Chova</option>
                                                            <option value="Ferro cemento">Ferro cemento</option>
                                                            <option value="Madera ladrillo">Madera ladrillo</option>
                                                            <option value="Policarbonato">Policarbonato</option>
                                                            <option value="Teja ordinaria">Teja ordinaria</option>
                                                            <option value="Teja vidriada">Teja vidriada</option>
                                                            <option value="Tejuelo">Tejuelo</option>
                                                            <option value="Zinc">Zinc</option>
                                                            <option value="Steel panel">Steel panel</option>
                                                            <option value="Fibras naturales">Fibras naturales</option>
                                                            <option value="Polietileno">Polietileno</option>
                                                                                                                                
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Tumbados:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="tumbados" 
                                                                name="tumbados" 
                                                                value = {tumbados.campo}
                                                                onChange = {(e) => {
                                                                const tumbadosSeleccionados = e.target.value;
                                                                cambiarTumbados({campo: tumbadosSeleccionados});
                                                                }} 
                                                            >

                                                            <option value={tumbados.campo} selected >{tumbados.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Caña enlucida">Caña enlucida</option>
                                                            <option value="Fibra mineral">Fibra mineral</option>
                                                            <option value="Gypsum">Gypsum</option>
                                                            <option value="Madera procesada fina">Madera procesada fina</option>
                                                            <option value="Madera triplex">Madera triplex</option>
                                                            <option value="Malla enlucida">Malla enlucida</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Sintético">Sintético</option>
                                                            <option value="Yeso + perfíl metálico">Yeso + perfíl metálico</option>
                                                            <option value="Mortero arena-cemento">Mortero arena-cemento</option>
                                                                                                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Ventanas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="ventanas" 
                                                                name="ventanas" 
                                                                value = {ventanas.campo}
                                                                onChange = {(e) => {
                                                                const ventanasSeleccionadas = e.target.value;
                                                                cambiarVentanas({campo: ventanasSeleccionadas});
                                                                }} 
                                                            >

                                                            <option value={ventanas.campo} selected >{ventanas.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Aluminio">Aluminio</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Hierro">Hierro</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera procesada fina">Madera procesada fina</option>
                                                            <option value="Plástico preformado">Plástico preformado</option>
                                                            <option value="Enrollable">Enrollable</option>
                                                                                                                                                        
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Vidrios:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="vidrios" 
                                                                name="vidrios" 
                                                                value = {vidrios.campo}
                                                                onChange = {(e) => {
                                                                const vidrioSeleccionado = e.target.value;
                                                                cambiarVidrios({campo: vidrioSeleccionado});
                                                                }} 
                                                            >

                                                            <option value={vidrios.campo} selected >{vidrios.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Malla">Malla</option>
                                                            <option value="Vidrio común">Vidrio común</option>
                                                            <option value="Vidrio templado">Vidrio templado</option>
                                                            <option value="Vidrio catedral">Vidrio catedral</option>
                                                                                                                                                        
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Puertas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="puertas" 
                                                                name="puertas" 
                                                                value = {puertas.campo}
                                                                onChange = {(e) => {
                                                                const puertasSeleccionadas = e.target.value;
                                                                cambiarPuertas({campo: puertasSeleccionadas});
                                                                }}
                                                            >

                                                            <option value={puertas.campo} selected >{puertas.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Aluminio-vidrio">Aluminio-vidrio</option>
                                                            <option value="Hierro">Hierro</option>
                                                            <option value="Madera panelada">Madera panelada</option>
                                                            <option value="Madera tamborada">Madera tamborada</option>
                                                            <option value="Metálica enrollable">Metálica enrollable</option>
                                                            <option value="Plástico preformado">Plástico preformado</option>
                                                            <option value="Tol">Tol</option>
                                                            <option value="Vidrio templado">Vidrio templado</option>
                                                            <option value="Caña">Caña</option>
                                                            <option value="Malla">Malla</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Madera fina">Madera fina</option>
                                                            <option value="Metálica reforzada">Metálica reforzada</option>
                                                            <option value="Hierro-madera">Hierro-madera</option>
                                                            <option value="Madera-malla">Madera-malla</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Closets:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="closets" 
                                                                name="closets" 
                                                                value = {closets.campo}
                                                                onChange = {(e) => {
                                                                const closetsSeleccionados = e.target.value;
                                                                cambiarClosets({campo: closetsSeleccionados});
                                                                }}
                                                            >

                                                            <option value={closets.campo} selected >{closets.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                                    
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Pisos:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="pisos" 
                                                                name="pisos" 
                                                                value = {pisos.campo}
                                                                onChange = {(e) => {
                                                                const pisosSeleccionados = e.target.value;
                                                                cambiarPisos({campo: pisosSeleccionados});
                                                                }}
                                                            >
                                                            
                                                            <option value={pisos.campo} selected >{pisos.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Adoquín">Adoquín</option>
                                                            <option value="Alfombra">Alfombra</option>
                                                            <option value="Cerámica">Cerámica</option>
                                                            <option value="Césped sintético">Césped sintético</option>
                                                            <option value="Duela procesada">Duela procesada</option>
                                                            <option value="En cemento">En cemento</option>
                                                            <option value="Flotante">Flotante</option>
                                                            <option value="Gres">Gres</option>
                                                            <option value="Lámina de tol corrugado">Lámina de tol corrugado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Mármol">Mármol</option>
                                                            <option value="Marmolina">Marmolina</option>
                                                            <option value="Parquet">Parquet</option>
                                                            <option value="Pintura">Pintura</option>
                                                            <option value="Porcelanato">Porcelanato</option>
                                                            <option value="Tablón">Tablón</option>
                                                            <option value="Vinyl">Vinyl</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Gradas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="gradas_acabados" 
                                                                name="gradas_acabados" 
                                                                value = {gradas_acabados.campo}
                                                                onChange = {(e) => {
                                                                const gradasAcabadosSeleccionados = e.target.value;
                                                                cambiarGradasAcabados({campo: gradasAcabadosSeleccionados});
                                                                }}
                                                            >

                                                            <option value={gradas_acabados.campo} selected >{gradas_acabados.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Adoquín">Adoquín</option>
                                                            <option value="Alfombra">Alfombra</option>
                                                            <option value="Cerámica">Cerámica</option>
                                                            <option value="Césped sintético">Césped sintético</option>
                                                            <option value="Duela procesada">Duela procesada</option>
                                                            <option value="En cemento">En cemento</option>
                                                            <option value="Flotante">Flotante</option>
                                                            <option value="Gres">Gres</option>
                                                            <option value="Lámina de tol corrugado">Lámina de tol corrugado</option>
                                                            <option value="Madera común">Madera común</option>
                                                            <option value="Mármol">Mármol</option>
                                                            <option value="Marmolina">Marmolina</option>
                                                            <option value="Parquet">Parquet</option>
                                                            <option value="Pintura">Pintura</option>
                                                            <option value="Porcelanato">Porcelanato</option>
                                                            <option value="Tablón">Tablón</option>
                                                            <option value="Vinyl">Vinyl</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Protección ventanas:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="ventanas_proteccion" 
                                                                name="ventanas_proteccion" 
                                                                value = {proteccion_ventanas.campo}
                                                                onChange = {(e) => {
                                                                const proteccionVentanasSeleccionadas = e.target.value;
                                                                cambiarProteccion_ventanas({campo: proteccionVentanasSeleccionadas});
                                                                }}
                                                            >

                                                            <option value={proteccion_ventanas.campo} selected >{proteccion_ventanas.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                                    
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                            </div>
                                        </center>
                                        <br/>
                                        <center>
                                            <div id="contenedor">
                                                    
                                                    <h4><b>Unidad de vivienda: </b></h4>
                                                    <hr/>
                                                    <br/>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Clasificación de vivienda:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="clasificacion" 
                                                                name="clasificacion" 
                                                                value = {clasificacion_vivienda.campo}
                                                                onChange = {(e) => {
                                                                const clasificacionViviendaSeleccionada = e.target.value;
                                                                cambiarClasificacionVivienda({campo: clasificacionViviendaSeleccionada});
                                                                }}
                                                            >
                                                        
                                                            <option value={clasificacion_vivienda.campo} selected >{clasificacion_vivienda.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No aplica">No aplica</option>
                                                            <option value="Bodega">Bodega</option>
                                                            <option value="Casa">Casa</option>
                                                            <option value="Choza">Choza</option>
                                                            <option value="Covacha">Covacha</option>
                                                            <option value="Cuarto en casa de inquilinato">Cuarto en casa de inquilinato</option>
                                                            <option value="Departamento en casa o edificio">Departamento en casa o edificio</option>
                                                            <option value="Local comercial">Local comercial</option>
                                                            <option value="Mediagua">Mediagua</option>
                                                            <option value="Oficina">Oficina</option>
                                                            <option value="Otra vivienda">Otra vivienda</option>
                                                            <option value="Parqueadero">Parqueadero</option>
                                                            <option value="Rancho">Rancho</option>
                                                            <option value="Villa">Villa</option>
                                                                        
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Tipo de vivienda:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="tipo_vivienda" 
                                                                name="tipo_vivienda" 
                                                                value = {tipo_vivienda.campo}
                                                                onChange = {(e) => {
                                                                const tipoViviendaSeleccionada = e.target.value;
                                                                cambiarTipoVivienda({campo: tipoViviendaSeleccionada});
                                                                }}
                                                            >

                                                            <option value={tipo_vivienda.campo} selected >{tipo_vivienda.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="Particular">Particular</option>
                                                            <option value="Colectiva">Colectiva</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Condición de ocupación:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="ocupacion" 
                                                                name="ocupacion" 
                                                                value = {condicion_ocupacion.campo}
                                                                onChange = {(e) => {
                                                                const ocupacionSeleccionada = e.target.value;
                                                                cambiarCondicionOcupacion({campo: ocupacionSeleccionada});
                                                                }}
                                                            >

                                                            <option value={condicion_ocupacion.campo} selected >{condicion_ocupacion.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="Ocupada">Ocupada</option>
                                                            <option value="Desocupada">Desocupada</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Acabado piso:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="piso_acabado" 
                                                                name="piso_acabado" 
                                                                value = {acabado_piso.campo}
                                                                onChange = {(e) => {
                                                                const acabadoPisoSeleccionado = e.target.value;
                                                                cambiarAcabadoPiso({campo: acabadoPisoSeleccionado});
                                                                }}
                                                            >

                                                            <option value={acabado_piso.campo} selected >{acabado_piso.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Estado de piso:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="piso_estado" 
                                                                name="piso_estado" 
                                                                value = {estado_piso.campo}
                                                                onChange = {(e) => {
                                                                const estadoPisoSeleccionado = e.target.value;
                                                                cambiarEstadoPiso({campo: estadoPisoSeleccionado});
                                                                }}
                                                            >

                                                            <option value={estado_piso.campo} selected >{estado_piso.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="Bueno">Bueno</option>
                                                            <option value="Malo">Malo</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Número de hogares:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="hogares" 
                                                                name="hogares" 
                                                                value = {numero_hogares.campo}
                                                                onChange = {(e) => {
                                                                const hogaresSeleccionados = e.target.value;
                                                                cambiarNumeroHogares({campo: hogaresSeleccionados});
                                                                }}
                                                            >

                                                            
                                                            {   
                                                            
                                                                /*  EVALUAR FUNCIONAMIENTO
                                                            () => {for (let i = 0; i<20; i++){
                                                                echo `<option value={i}>{i}</option>`;

                                                                }}

                                                                */
                                                            }
                                                            
                                                            <option value={numero_hogares.campo} selected >{numero_hogares.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Número de habitantes:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="habitantes" 
                                                                name="habitantes" 
                                                                value = {numero_habitantes.campo}
                                                                onChange = {(e) => {
                                                                const habitantesSeleccionados = e.target.value;
                                                                cambiarNumeroHabitantes({campo: habitantesSeleccionados});
                                                                }}
                                                            >

                                                            <option value={numero_habitantes.campo} selected >{numero_habitantes.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Número de habitaciones:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="habitaciones" 
                                                                name="habitaciones"
                                                                value = {numero_habitaciones.campo}
                                                                onChange = {(e) => {
                                                                const habitacionesSeleccionados = e.target.value;
                                                                cambiarNumeroHabitaciones({campo: habitacionesSeleccionados});
                                                                }} 
                                                            >

                                                            <option value={numero_habitaciones.campo} selected >{numero_habitaciones.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Número de dormitorios:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="dormitorios" 
                                                                name="dormitorios" 
                                                                value = {numero_dormitorios.campo}
                                                                onChange = {(e) => {
                                                                const dormitoriosSeleccionados = e.target.value;
                                                                cambiarNumeroDormitorios({campo: dormitoriosSeleccionados});
                                                                }} 
                                                            >

                                                            <option value={numero_dormitorios.campo} selected >{numero_dormitorios.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Espacios para bañarse (duchas):</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="duchas" 
                                                                name="duchas" 
                                                                value = {espacios_aseo_duchas.campo}
                                                                onChange = {(e) => {
                                                                const duchasSeleccionados = e.target.value;
                                                                cambiarEspaciosAseoDuchas({campo: duchasSeleccionados});
                                                                }} 
                                                            >
                                                            
                                                            <option value={espacios_aseo_duchas.campo} selected >{espacios_aseo_duchas.campo}</option>    
                                                            <option value="" disabled >-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Tenencia de la vivienda:</td>
                                                            <td>
                                                            <select 
                                                                
                                                                class="form-select form-select-sm" 
                                                                className="custom-select"
                                                                id="tenencia_vivienda" 
                                                                name="tenencia_vivienda" 
                                                                value = {tenencia_vivienda.campo}
                                                                onChange = {(e) => {
                                                                const tenenciaViviendaSeleccionada = e.target.value;
                                                                cambiarTenenciaVivienda({campo: tenenciaViviendaSeleccionada});
                                                                }} 
                                                            >

                                                            <option value={tenencia_vivienda.campo} selected >{tenencia_vivienda.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="Anticresis">Anticresis</option>
                                                            <option value="Arrendada">Arrendada</option>
                                                            <option value="Por servicios">Por servicios</option>
                                                            <option value="Prestada o cedida (no paga)">Prestada o cedida (no paga)</option>
                                                            <option value="Propia (heredada,donada o posesión)">Propia (heredada,donada o posesión)</option>
                                                            <option value="Propia y la está pagando">Propia y la está pagando</option>
                                                            <option value="Propia y totalmente pagada">Propia y totalmente pagada</option>
                                                                        
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Posee teléfono convencional:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="telf_convencional" 
                                                                name="telf_convencional" 
                                                                value = {telefono_convencional.campo}
                                                                onChange = {(e) => {
                                                                const telefonoSeleccionado = e.target.value;
                                                                cambiarTelefonoConvencional({campo: telefonoSeleccionado});
                                                                }} 
                                                            >

                                                            <option value={telefono_convencional.campo} selected >{telefono_convencional.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>

                                                    
                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>No. de teléfonos celulares:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="celulares" 
                                                                name="celulares" 
                                                                value = {cantidad_celulares.campo}
                                                                onChange = {(e) => {
                                                                const celularSeleccionado = e.target.value;
                                                                cambiarCantidadCelulares({campo: celularSeleccionado});
                                                                }} 
                                                            >

                                                            <option value={cantidad_celulares.campo} selected >{cantidad_celulares.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="0">0</option>
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
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>


                                                    <p>
                                                    <tr>      
                                                        
                                                            <td>Servicio de internet:</td>
                                                            <td>
                                                            <select 
                                                                className="custom-select"
                                                                id="internet" 
                                                                name="internet" 
                                                                value = {servicio_internet.campo}
                                                                onChange = {(e) => {
                                                                const internetSeleccionado = e.target.value;
                                                                cambiarServicioInternet({campo: internetSeleccionado});
                                                                }} 
                                                            >

                                                            <option value={servicio_internet.campo} selected >{servicio_internet.campo}</option>
                                                            <option value="" disabled >-------------</option>
                                                            <option value="No tiene">No tiene</option>
                                                            <option value="Si tiene">Si tiene</option>
                                                            
                                                        </select> </td>
                                                        </tr>
                                                    </p>
                                                    <hr/>      
                                                    <br/>
                                            </div>
                                        </center>
                                </div>


                </ModalBody>
                <ModalFooter>
                    
                    <button className="btn btn-primary" onClick={()=>putConstruccion()}>Editar</button>

                    {/*
                        formularioValido === false && <MensajeError>
                        <p>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <b>Error: </b> Por favor rellena correctamente el formulario. 
                        </p>                    
                        </MensajeError>                  
                
                    <Boton type="submit" onClick={()=>putConstruccion()}><b>Enviar</b></Boton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {formularioValido === true && <MensajeExito> Formulario enviado exitosamente! </MensajeExito>}
                    */}

                    <button className="btn btn-danger btn-md" onClick={()=>abrirCerrarModalEditar()}><b>Cancelar</b></button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro de eliminar este registro {construccionSeleccionada && construccionSeleccionada.clavecatastral}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>deleteConstruccion()}>
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


export default Construccion;






