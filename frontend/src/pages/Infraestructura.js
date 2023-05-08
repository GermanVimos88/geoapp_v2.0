import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
//import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faFaucet, faReply, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
//import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';


const Infraestructura = () => {

       
   
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
           
    const baseUrl= 'http://localhost/apicatastro/index.php/infraestructura/?id='+id; //'https://cheerful-marzipan-12e313.netlify.app/infraestructura/?id='+id; //'http://f0783168.xsph.ru/index.php/infraestructura/?id='+id;
    const [data, setData]=useState([]);    
    //const [id_caracteristicas, cambiarIdCaracteristicas] = useState({campo: '', valido: null});
	//const [clave_catastral, cambiarClaveCatastral] = useState({campo: '', valido: null}); 
    const [idinfraestructura, cambiarIdInfraestructura] = useState ({campo: '', valido: null});
    const [clave_predio, cambiarClavePredio] = useState ({campo: '', valido: null});    
    const [idubicacion, cambiarIdUbicacion] = useState ({campo: '', valido: null}); 
    const [tipo_via_acceso, cambiarTipoViaAcceso] = useState ({campo: '', valido: null}); 
    const [rodadura, cambiarRodadura] = useState ({campo: '', valido: null}); 
    const [vias_acceso_adicionales, cambiarViasAccesoAdicionales] = useState ({campo: '', valido: null}); 
    const [agua_procedencia, cambiarAguaProcedencia] = useState ({campo: '', valido: null}); 
    const [medidor_agua, cambiarMedidorAgua] = useState ({campo: '', valido: null}); 
    const [agua_recepcion, cambiarAguaRecepcion] = useState ({campo: '', valido: null}); 
    const [eliminacion_excretas, cambiarEliminacionExcretas] = useState ({campo: '', valido: null}); 
    const [energia_electrica_procedencia, cambiarEnergiaElectricaProcedencia] = useState ({campo: '', valido: null}); 
    const [medidor, cambiarMedidor] = useState ({campo: '', valido: null}); 
    const [energia_electrica_recepcion, cambiarEnergiaElectricaRecepcion] = useState ({campo: '', valido: null}); 
    const [eliminacion_basura, cambiarEliminacionBasura] = useState ({campo: '', valido: null}); 
    const [telefono_convencional, cambiarTelefonoConvencional] = useState (false); 
    const [celular, cambiarCelular] = useState (false); 
    const [tv_cable, cambiarTvCable] = useState (false); 
    const [internet, cambiarInternet] = useState (false); 
    const [metodo_riego, cambiarMetodoRiego] = useState (false); 
    const [disponibilidad_riego, cambiarDisponibilidadRiego] = useState (false); 
    const [instalaciones_especiales, cambiarInstalacionesEspeciales] = useState (false); 
    const [ascensor, cambiarAscensor] = useState (false); 
    const [circuito_cerrado_tv, cambiarCircuitoCerradoTv] = useState (false); 
    const [montacarga, cambiarMontacarga] = useState (false); 
    const [sistema_alterno_electricidad, cambiarSistemaAlternoElectricidad] = useState (false); 
    const [aire_acondicionado, cambiarAireAcondicionado] = useState (false); 
    const [sistema_contra_incendios, cambiarSistemaContraIncendios] = useState (false); 
    const [gas_centralizado, cambiarGasCentralizado] = useState (false); 
    const [ventilacion, cambiarVentilacion] = useState (false); 
    const [sistema_voz_datos, cambiarSistemaVozDatos] = useState (false); 
    const [alumbrado_publico, cambiarAlumbradoPublico] = useState (false); 
    const [recoleccion_basura, cambiarRecoleccionBasura] = useState (false); 
    const [transporte_urbano, cambiarTransporteUrbano] = useState (false); 
    const [aseo_calles, cambiarAseoCalles] = useState (false); 
    const [alcantarillado, cambiarAlcantarillado] = useState (false); 
    const [aceras, cambiarAceras] = useState (false); 
    const [bordillos, cambiarBordillos] = useState (false); 
    
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

        const onChangeTelefono = (e) =>{
        cambiarTelefonoConvencional(e.target.checked);
        }
        
        const onChangeCelular = (e) =>{
        cambiarCelular(e.target.checked);
        }
        

        const onChangeTvCable = (e) =>{
        cambiarTvCable(e.target.checked);
        }
        

        const onChangeInternet = (e) =>{
        cambiarInternet(e.target.checked);
        }
        

        const onChangeInstalaciones = (e) =>{
        cambiarInstalacionesEspeciales(e.target.checked);
        }
        

        const onChangeAscensor = (e) =>{
        cambiarAscensor(e.target.checked);
        }
        

        const onChangeCCTV = (e) =>{
        cambiarCircuitoCerradoTv(e.target.checked);
        }
        

        const onChangeMontacarga = (e) =>{
        cambiarMontacarga(e.target.checked);
        }
        

        const onChangeSistemaAlterno = (e) =>{
        cambiarSistemaAlternoElectricidad(e.target.checked);
        }
        

        const onChangeAireAcondicionado = (e) =>{
        cambiarAireAcondicionado(e.target.checked);
        }
        

        const onChangeSistemaIncendios = (e) =>{
        cambiarSistemaContraIncendios(e.target.checked);
        }
        

        const onChangeGasCentralizado = (e) =>{
        cambiarGasCentralizado(e.target.checked);
        }
        

        const onChangeVentilacion = (e) =>{
        cambiarVentilacion(e.target.checked);
        }
        

        const onChangeSistemaVozDatos = (e) =>{
        cambiarSistemaVozDatos(e.target.checked);
        }
        

        const onChangeAlumbradoPublico = (e) =>{
        cambiarAlumbradoPublico(e.target.checked);
        }
        

        const onChangeRecoleccionBasura = (e) =>{
        cambiarRecoleccionBasura(e.target.checked);
        }
        

        const onChangeTransporteUrbano = (e) =>{
        cambiarTransporteUrbano(e.target.checked);
        }
        

        const onChangeAseocalles = (e) =>{
        cambiarAseoCalles(e.target.checked);
        }
              
        
        const onChangeAceras = (e) =>{
            cambiarAceras(e.target.checked);
        }
        
        
        const onChangeBordillos = (e) =>{
            cambiarBordillos(e.target.checked);
        }
        

    const onSubmit = (e) => {
        e.preventDefault();
                   
            // CONEXION CRUD (PETICIONES AJAX/HTTP)
            putInfraestructura();
            peticionGet();
            //cambiarFormularioValido(true);
            alert('Datos actualizados correctamente');       

    }

     const peticionGet=async()=>{
        const response = await axios.get(baseUrl)
        
                cambiarClavePredio ({campo: response.data[0].clave_predio});
                cambiarIdUbicacion ({campo: response.data[0].idubicacion});
                cambiarTipoViaAcceso ({campo: response.data[0].via_acceso});
                cambiarRodadura ({campo: response.data[0].rodadura});
                cambiarViasAccesoAdicionales ({campo: response.data[0].vias_adicionales});
                cambiarAguaProcedencia ({campo: response.data[0].agua_procedencia});
                cambiarMedidorAgua ({campo: response.data[0].medidor_agua});
                cambiarAguaRecepcion ({campo: response.data[0].agua_recepcion});
                cambiarEliminacionExcretas ({campo: response.data[0].eliminacion_excretas});
                cambiarEnergiaElectricaProcedencia ({campo: response.data[0].energia_electrica_procedencia});
                cambiarMedidor ({campo: response.data[0].medidor});
                cambiarEnergiaElectricaRecepcion ({campo: response.data[0].energia_electrica_recepcion});
                cambiarEliminacionBasura ({campo: response.data[0].eliminacion_basura});
                cambiarTelefonoConvencional ({campo: response.data[0].telefono_convencional});
                cambiarCelular ({campo: response.data[0].celular});
                cambiarTvCable ({campo: response.data[0].tv_cable});
                cambiarInternet ({campo: response.data[0].internet});
                cambiarMetodoRiego ({campo: response.data[0].metodo_riego});
                cambiarDisponibilidadRiego ({campo: response.data[0].disponibilidad_riego});
                cambiarInstalacionesEspeciales ({campo: response.data[0].instalaciones_especiales});
                cambiarAscensor ({campo: response.data[0].ascensor});
                cambiarCircuitoCerradoTv ({campo: response.data[0].circuito_cerrado_tv});
                cambiarMontacarga ({campo: response.data[0].montacarga});
                cambiarSistemaAlternoElectricidad ({campo: response.data[0].sistema_alterno_electricidad});
                cambiarAireAcondicionado ({campo: response.data[0].aire_acondicionado});
                cambiarSistemaContraIncendios ({campo: response.data[0].sistema_contra_incendios});
                cambiarGasCentralizado ({campo: response.data[0].gas_centralizado});
                cambiarVentilacion ({campo: response.data[0].ventilacion});
                cambiarSistemaVozDatos ({campo: response.data[0].sistema_voz_datos});
                cambiarAlumbradoPublico ({campo: response.data[0].alumbrado_publico});
                cambiarRecoleccionBasura ({campo: response.data[0].recoleccion_basura});
                cambiarTransporteUrbano ({campo: response.data[0].transporte_urbano});
                cambiarAseoCalles ({campo: response.data[0].aseo_calles});
                cambiarAlcantarillado ({campo: response.data[0].alcantarillado});
                cambiarAceras ({campo: response.data[0].aceras});
                cambiarBordillos ({campo: response.data[0].bordillos});                
    }

    //Función PUT
    const putInfraestructura=async()=>{
        const inf = {
            clave_predio: clave,
            //idubicacion:idubicacion.campo,
            via_acceso:tipo_via_acceso.campo,
            rodadura:rodadura.campo,
            vias_adicionales:vias_acceso_adicionales.campo,
            agua_procedencia:agua_procedencia.campo,
            medidor_agua:medidor_agua.campo,
            agua_recepcion:agua_recepcion.campo,
            eliminacion_excretas:eliminacion_excretas.campo,
            energia_electrica_procedencia:energia_electrica_procedencia.campo,
            medidor:medidor.campo,
            energia_electrica_recepcion:energia_electrica_recepcion.campo,
            eliminacion_basura:eliminacion_basura.campo,
            telefono_convencional:telefono_convencional.campo,
            celular:celular.campo,
            tv_cable:tv_cable.campo,
            internet:internet.campo,
            metodo_riego:metodo_riego.campo,
            disponibilidad_riego:disponibilidad_riego.campo,
            instalaciones_especiales:instalaciones_especiales.campo,
            ascensor:ascensor.campo,
            circuito_cerrado_tv:circuito_cerrado_tv.campo,
            montacarga:montacarga.campo,
            sistema_alterno_electricidad:sistema_alterno_electricidad.campo,
            aire_acondicionado:aire_acondicionado.campo,
            sistema_contra_incendios:sistema_contra_incendios.campo,
            gas_centralizado:gas_centralizado.campo,
            ventilacion:ventilacion.campo,
            sistema_voz_datos:sistema_voz_datos.campo,
            alumbrado_publico:alumbrado_publico.campo,
            recoleccion_basura:recoleccion_basura.campo,
            transporte_urbano:transporte_urbano.campo,
            aseo_calles:aseo_calles.campo,
            alcantarillado: alcantarillado.campo,
            aceras:aceras.campo,
            bordillos:bordillos.campo
        } 
    
        await axios.put('http://localhost/apicatastro/index.php/infraestructura/actualizar?id='+id, inf)
        .then(response=>{
            cambiarClavePredio ({campo: inf.clave_predio});
                cambiarIdUbicacion ({campo: inf.idubicacion});
                cambiarTipoViaAcceso ({campo: inf.via_acceso});
                cambiarRodadura ({campo: inf.rodadura});
                cambiarViasAccesoAdicionales ({campo: inf.vias_adicionales});
                cambiarAguaProcedencia ({campo: inf.agua_procedencia});
                cambiarMedidorAgua ({campo: inf.medidor_agua});
                cambiarAguaRecepcion ({campo: inf.agua_recepcion});
                cambiarEliminacionExcretas ({campo: inf.eliminacion_excretas});
                cambiarEnergiaElectricaProcedencia ({campo: inf.energia_electrica_procedencia});
                cambiarMedidor ({campo: inf.medidor});
                cambiarEnergiaElectricaRecepcion ({campo: inf.energia_electrica_recepcion});
                cambiarEliminacionBasura ({campo: inf.eliminacion_basura});
                cambiarTelefonoConvencional ({campo: inf.telefono_convencional});
                cambiarCelular ({campo: inf.celular});
                cambiarTvCable ({campo: inf.tv_cable});
                cambiarInternet ({campo: inf.internet});
                cambiarMetodoRiego ({campo: inf.metodo_riego});
                cambiarDisponibilidadRiego ({campo: inf.disponibilidad_riego});
                cambiarInstalacionesEspeciales ({campo: inf.instalaciones_especiales});
                cambiarAscensor ({campo: inf.ascensor});
                cambiarCircuitoCerradoTv ({campo: inf.circuito_cerrado_tv});
                cambiarMontacarga ({campo: inf.montacarga});
                cambiarSistemaAlternoElectricidad ({campo: inf.sistema_alterno_electricidad});
                cambiarAireAcondicionado ({campo: inf.aire_acondicionado});
                cambiarSistemaContraIncendios ({campo: inf.sistema_contra_incendios});
                cambiarGasCentralizado ({campo: inf.gas_centralizado});
                cambiarVentilacion ({campo: inf.ventilacion});
                cambiarSistemaVozDatos ({campo: inf.sistema_voz_datos});
                cambiarAlumbradoPublico ({campo: inf.alumbrado_publico});
                cambiarRecoleccionBasura ({campo: inf.recoleccion_basura});
                cambiarTransporteUrbano ({campo: inf.transporte_urbano});
                cambiarAseoCalles ({campo: inf.aseo_calles});
                cambiarAlcantarillado ({campo: inf.alcantarillado});
                cambiarAceras ({campo: inf.aceras});
                cambiarBordillos ({campo: inf.bordillos});     
            
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
    },[])


    return (        
        <div>
            {/* <h6 style={{ float: 'right', marginRight:'3rem', marginTop:'2rem'}}><ul><a onClick={()=>cerrarSesion()} title='Cerrar sesión'> <FontAwesomeIcon icon={faUserCircle} size={'lg'} /> {cookies.get('username')} </a></ul>  </h6>
            <h6 style={{ float: 'right', marginRight: '-4.5rem', marginTop:'5rem'}}><ul><a onClick={()=>menu()} title='Regresar a menú principal'> <FontAwesomeIcon icon={faReply} size={'lg'} /> Menú <br/> Principal </a></ul>  </h6> */}
        <main>
            <label style={{ fontWeight:'900', fontSize:'32px' }}>Infraestructura <FontAwesomeIcon icon={faFaucet}/></label> 
            <br/>                
            <div class="form-group col-md-6"> 
                     
                <label>Clave Catastral: {clave}</label> <td> </td>
            </div>              

            <Formulario action="" onSubmit={onSubmit}>            
            <div>                
                <legend id="leyenda2">Vías de acceso:</legend>  
                <center>                
                <div id="contenedor">
                    <br/>
                    <p>
                        <tr>                         
                        <label for="tipo_via" id="etiqueta" style={{ fontWeight:'900' }}>Tipo Vía de acceso:</label>&nbsp;&nbsp;
                        
                            <td>                            
                            <select 
                                className="custom-select"
                                id="tipo_via" 
                                name="tipo_via" 
                                value = {tipo_via_acceso}
                                onChange = {(e) => {
                                    const tipoViasSeleccionado = e.target.value;
                                    cambiarTipoViaAcceso({campo: tipoViasSeleccionado});
                                }}        
                            >
                            
                            <option value={tipo_via_acceso.campo} checked>{tipo_via_acceso.campo}</option>
                            <option value="" disabled>----------</option>
                            <option value="No tiene">No tiene </option>
                            <option value="Autopista">Autopista </option>
                            <option value="Avenida">Avenida </option>
                            <option value="Calle">Calle </option>
                            <option value="Callejón">Callejón </option>
                            <option value="Cam. de herradura">Cam. de herradura </option>
                            <option value="Escalinata">Escalinata </option>
                            <option value="Pasaje vehicular">Pasaje vehicular </option>
                            <option value="Peatonal">Peatonal </option>
                            <option value="Sendero">Sendero </option>
                            <option value="Pasaje sin retorno">Pasaje sin retorno </option>
                                    
                        </select> </td> 
                        </tr>
                    </p>
                
                    <p>
                        <tr>
                        <label id="etiqueta" for="rodadura" style={{ fontWeight:'900' }}>Rodadura:</label>&nbsp;&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="rodadura" 
                                name="rodadura" 
                                value = {rodadura}
                                onChange = {(e) => {
                                    const rodaduraSeleccionada = e.target.value;
                                    cambiarRodadura({campo: rodaduraSeleccionada});
                                }} 
                            >
                        
                            <option value={rodadura.campo} checked>{rodadura.campo}</option>
                            <option value="" disabled>----------</option>
                            <option value="No tiene">No tiene </option>
                            <option value="Adoquín de cemento">Adoquín de cemento </option>
                            <option value="Adoquín de piedra">Adoquín de piedra </option>
                            <option value="Empedrado">Empedrado </option>
                            <option value="Lastre">Lastre </option>
                            <option value="Hormigón">Hormigón </option>
                            <option value="Asfalto">Asfalto </option>
                            <option value="Tierra">Tierra </option>
                            <option value="Tratamiento bituminoso">Tratamiento bituminoso </option>
                                    
                        </select> </td>
                        </tr>
                    </p>  
                    
                    <p>
                        <tr>    
                        
                        <label id="etiqueta" for="vias_adicionales" style={{ fontWeight:'900' }}>Otras vías de acceso:</label>&nbsp;&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="vias_adicionales"
                                name="vias_adicionales" 
                                value = {vias_acceso_adicionales}
                                onChange = {(e) => {
                                    const viasAdicionalesSeleccionadas = e.target.value;
                                    cambiarViasAccesoAdicionales({campo: viasAdicionalesSeleccionadas});
                                }} 
                            >

                            <option value={vias_acceso_adicionales.campo} checked>{vias_acceso_adicionales.campo}</option>
                            <option value="" disabled>----------</option>
                            <option value="No tiene">No tiene </option>
                            <option value="Aérea">Aérea </option>
                            <option value="Férrea">Férrea </option>
                            <option value="Fluvial">Fluvial </option>
                            <option value="Marítima">Marítima </option>
                                    
                        </select> </td>
                        </tr>
                    </p>
                </div>                           
            
            </center>
            <br/>
            <br/>

            <legend id="leyenda2">Agua potable:</legend> 
            <center>
                    <div id="contenedor">
                    <br/>
                    <p>

                        <tr>    
                        
                        <label id="etiqueta" for="agua_procedencia" style={{ fontWeight:'900' }}>Fuente de agua:</label>&nbsp;&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="agua_procedencia" 
                                name="agua_procedencia" 
                                value = {agua_procedencia}
                                onChange = {(e) => {
                                    const aguaProcedenciaSeleccionada = e.target.value;
                                    cambiarAguaProcedencia({campo: aguaProcedenciaSeleccionada});
                                }} 
                            >
                            
                            <option value={agua_procedencia.campo} checked>{agua_procedencia.campo}</option>
                            <option value="" disabled>----------</option>
                            <option value="No tiene">No tiene </option>
                            <option value="Red pública">Red pública </option>
                            <option value="Pozo">Pozo </option>
                            <option value="Río-Vertiente-Acequia">Río-Vertiente-Acequia </option>
                            <option value="Carro repartidor">Carro repartidor </option>
                            <option value="Agua lluvia">Agua lluvia </option>
                                    
                        </select> </td>
                        </tr>
                    </p>
                                        
                    <p>
                        <tr>    
                        <label id="etiqueta" for="agua_recepcion" style={{ fontWeight:'900' }}>Captación:</label>&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="agua_recepcion" 
                                name="agua_recepcion" 
                                value = {agua_recepcion}
                                onChange = {(e) => {
                                    const aguaRecepcionSeleccionada = e.target.value;
                                    cambiarAguaRecepcion({campo: aguaRecepcionSeleccionada});
                                }} 
                            >

                            
                            <option value={agua_recepcion.campo} checked>{agua_recepcion.campo}</option>
                            <option value="" disabled>----------</option>
                            <option value="No tiene">No tiene </option>
                            <option value="Tubería dentro de la vivienda">Tubería dentro de la vivienda </option>
                            <option value="Tubería fuera de la vivienda">Tubería fuera de la vivienda </option>
                            <option value="Tubería dentro del edificio">Tubería dentro del edificio </option>
                            <option value="Recibe por otros medios">Recibe por otros medios </option>
                                    
                        </select> </td>
                        </tr>
                    </p> 

                    <center>

                    <p>
                        <tr>    
                        <label id="etiqueta" for="alcantarillado" style={{ fontWeight:'900' }}>Alcantarillado:</label>&nbsp;&nbsp;
                            <td>
                            <select 
                                className="custom-select"
                                id="alcantarillado" 
                                name="alcantarillado" 
                                value = {alcantarillado}
                                onChange = {(e) => {
                                    const alcantarilladoSeleccionado = e.target.value;
                                    cambiarAlcantarillado({campo: alcantarilladoSeleccionado});
                                }} 
                            >

                            <option value={alcantarillado.campo} checked>{alcantarillado.campo}</option>
                            <option value="" disabled>----------</option>
                            <option value="No tiene">No tiene </option>
                            <option value="Red combinado">Red combinado </option>
                            <option value="Sanitario">Sanitario </option>
                            <option value="Pluvial">Pluvial </option>                                       
                        </select> </td>
                        </tr>
                    </p>

                    
                    <p>
                        <tr> 
                        <label id="etiqueta" for="metodo_riego" style={{ fontWeight:'900' }}>Método de riego:</label>&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="metodo_riego" 
                                name="metodo_riego" 
                                value = {metodo_riego}
                                onChange = {(e) => {
                                    const metodoRiegoSeleccionado = e.target.value;
                                    cambiarMetodoRiego({campo: metodoRiegoSeleccionado});
                                }} 
                            >
                        
                            <option value={metodo_riego.campo} checked>{metodo_riego.campo}</option>
                            <option value="" disabled>----------</option>
                            <option value="Seco">Seco </option>
                            <option value="No tiene">No tiene </option>
                            <option value="Gravedad">Gravedad </option>
                            <option value="Aspersión">Aspersión </option>
                            <option value="Goteo">Goteo </option>
                            <option value="Bombeo">Bombeo </option>
                            <option value="Otro">Otro </option>
                                        
                        </select> </td>
                        </tr>
                    </p> 
                    
                    <p>
                        <tr>    
                        <label id="etiqueta" for="disponibilidad_riego" style={{ fontWeight:'900' }}>Disponibilidad de riego:</label>&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="disponibilidad_riego" 
                                name="disponibilidad_riego" 
                                value = {disponibilidad_riego}
                                onChange = {(e) => {
                                    const disponibleRiegoSeleccionado = e.target.value;
                                    cambiarDisponibilidadRiego({campo: disponibleRiegoSeleccionado});
                                }} 
                            >
                        
                            <option value={disponibilidad_riego.campo} checked>{disponibilidad_riego.campo}</option>
                            <option value="" disabled>----------</option>
                            <option value="No tiene">No tiene </option>
                            <option value="Ocasional">Ocasional </option>
                            <option value="Permanente">Permanente </option>
                                                    
                        </select> </td>
                        </tr>
                    </p>
                </center> 

                </div>
            </center>

                    <br/>
                    <br/>

            <legend id="leyenda2">Energía eléctrica:</legend> 
            <center>
                <div id="contenedor">
                    <br/>
                    <p>
                        <tr>    
                        <label id="etiqueta" for="energia_procedencia" style={{ fontWeight:'900' }}>Fuente de energía eléctrica:</label>&nbsp;
                        <td>
                            
                        <select 
                            id="energia_procedencia" 
                            name="energia_procedencia" 

                            className="custom-select"
                            value = {energia_electrica_procedencia}
                            onChange = {(e) => {
                                    const energiaProcedeSeleccionado = e.target.value;
                                    cambiarEnergiaElectricaProcedencia({campo: energiaProcedeSeleccionado});
                                }} 
                        >
                        
                        <option value={energia_electrica_procedencia.campo} checked>{energia_electrica_procedencia.campo}</option>
                        <option value="" disabled>----------</option>
                        <option value="No tiene">No tiene </option>
                        <option value="Red pública">Red pública </option>
                        <option value="Panel solar">Panel solar </option>
                        <option value="Planta eléctrica">Planta eléctrica </option>
                        <option value="Otro">Otro </option>
                       
                        </select> </td>
                        </tr>
                    </p>
                    <p>
                        <tr>
                       
                        <label id="etiqueta" for="medidor" style={{ fontWeight:'900' }}>Medidor:</label> &nbsp;&nbsp;&nbsp;&nbsp;
                        <td>
                        <select 
                            className="custom-select"
                            id="medidor"
                            name="medidor" 
                            value = {medidor}
                            onChange = {(e) => {
                                    const medidorSeleccionado = e.target.value;
                                    cambiarMedidor({campo: medidorSeleccionado});
                                }} 
                        >                        
                        <option value={medidor.campo} checked>{medidor.campo}</option>
                        <option value="" disabled>----------</option>
                        <option value="1">Si </option>
                        <option value="0">No </option>
                            
                        </select> </td>
                        </tr>
                    </p>
                </div>
                </center>   

                </div>        
                <div>                                      
                            <p> 
                                <fieldset id="checkboxes">  
                                <legend id="leyenda">Comunicaciones:</legend>                            
                                
                                <label for="convencional">
                                    <input class="form-check-input" type="checkbox" name="convencional" id="convencional" value={telefono_convencional.campo} onChange={onChangeTelefono}/> Teléfono convencional
                                </label>
                                <br/>
                                <label for="celular">
                                    <input class="form-check-input" type="checkbox" name="celular" id="celular" value={celular.campo} onChange={onChangeCelular}/> Celular
                                </label>
                                <br/>
                                <label for="tv_cable">
                                    <input class="form-check-input" type="checkbox" name="tv_cable" id="tv_cable" value={tv_cable.campo} onChange={onChangeTvCable}/> Tv por cable
                                </label>
                                <br/>
                                <label for="internet">
                                    <input class="form-check-input" type="checkbox" name="internet" id="internet" value={internet.campo} onChange={onChangeInternet}/> Internet
                                </label>                                
                                <br/>
                                </fieldset>
                            
                            </p>                            
                            <br/>                                 
                            <p>

                                <tr>
                                <fieldset id="checkboxes">     
                                <legend id="leyenda">Instalaciones especiales:</legend>
                                <label for="instalaciones_especiales">
                                <input class="form-check-input" type="checkbox" name="instalaciones_especiales" id="instalaciones_especiales" value={instalaciones_especiales.campo} onChange={onChangeInstalaciones} /> Instalaciones especiales
                                </label>
                                <br/> 
                                <label for="ascensor">
                                        <input class="form-check-input" type="checkbox" name="ascensor" id="ascensor" value={ascensor.campo} onChange={onChangeAscensor}/> Ascensor
                                </label>
                                <br/> 
                                <label for="circuito_cerrado_tv">
                                        <input class="form-check-input" type="checkbox" name="circuito_cerrado_tv" id="circuito_cerrado_tv" value={circuito_cerrado_tv.campo} onChange={onChangeCCTV}/> Circuito Cerrado de TV 
                                </label>
                                <br/> 
                                <label for="montacarga">
                                        <input class="form-check-input" type="checkbox" name="montacarga" id="montacarga" value={montacarga.campo} onChange={onChangeMontacarga}/> Montacarga
                                </label>
                                <br/> 
                                
                                <label for="sistema_alterno_electricidad">
                                        <input class="form-check-input" type="checkbox" name="sistema_alterno_electricidad" id="sistema_alterno_electricidad" value={sistema_alterno_electricidad.campo} onChange={onChangeSistemaAlterno}/> Sistema alterno de electricidad
                                </label>
                                
                                <br/> 
                                <label for="aire_acondicionado">
                                        <input class="form-check-input" type="checkbox" name="aire_acondicionado" id="aire_acondicionado" value={aire_acondicionado.campo} onChange={onChangeAireAcondicionado}/> Aire acondicionado
                                </label>
                                <br/> 
                                <label for="sistema_contra_incendios">
                                        <input class="form-check-input" type="checkbox" name="sistema_contra_incendios" id="sistema_contra_incendios" value={sistema_contra_incendios.campo} onChange={onChangeSistemaIncendios}/> Sistema contra incendios
                                </label>
                                <br/> 
                                <label for="gas_centralizado">
                                        <input class="form-check-input" type="checkbox" name="gas_centralizado" id="gas_centralizado" value={gas_centralizado.campo} onChange={onChangeGasCentralizado}/> Gas centralizado
                                </label>
                                <br/> 
                                <label for="ventilacion">
                                        <input class="form-check-input" type="checkbox" name="ventilacion" id="ventilacion" value={ventilacion.campo} onChange={onChangeVentilacion}/> Ventilación
                                </label>
                                <br/> 
                                <label for="sistema_voz_datos">
                                        <input class="form-check-input" type="checkbox" name="sistema_voz_datos" id="sistema_voz_datos" value={sistema_voz_datos.campo} onChange={onChangeSistemaVozDatos}/> Sistema de voz y datos
                                </label>
                                <br/>
                                </fieldset>
                                </tr>
                                
                            </p>
                                <br/>
                            <p>
                                <tr>
                                <fieldset id="checkboxes">
                                    
                                <legend id="leyenda">Otros servicios:</legend>                        

                                <label for="alumbrado_publico">
                                    <input class="form-check-input" type="checkbox" name="alumbrado_publico" id="alumbrado_publico" value={alumbrado_publico.campo} onChange={onChangeAlumbradoPublico}/> Alumbrado público
                                </label>
                                <br/> 
                                <label for="recoleccion_basura">
                                    <input class="form-check-input" type="checkbox" name="recoleccion_basura" id="recoleccion_basura" value={recoleccion_basura.campo} onChange={onChangeRecoleccionBasura}/> Recoleccion de basura
                                </label>
                                <br/> 
                                <label for="transporte_urbano">
                                    <input class="form-check-input" type="checkbox" name="transporte_urbano" id="transporte_urbano" value={transporte_urbano.campo} onChange={onChangeTransporteUrbano}/> Transporte urbano
                                </label>
                                <br/> 
                                <label for="aseo_calles">
                                    <input class="form-check-input" type="checkbox" name="aseo_calles" id="aseo_calles" value={aseo_calles.campo} onChange={onChangeAseocalles}/> Aseo de calles
                                </label>
                                <br/> 
                                <br/>                                
                                </fieldset>
                                </tr>
                            </p> 
                                
                            <p>
                                <tr>
                                <fieldset id="checkboxes">                                
                                <legend id="leyenda">Aceras y Bordillos:</legend>
                                          
                                <label for="aceras">
                                    <input class="form-check-input" type="checkbox" name="aceras" id="aceras" value={aceras.campo} onChange={onChangeAceras}/> Aceras
                                </label>
                                <br/> 
                                <label for="bordillos">
                                    <input class="form-check-input" type="checkbox" name="bordillos" id="bordillos" value={bordillos.campo} onChange={onChangeBordillos}/> Bordillos
                                </label>
                                <br/> 
                                <br/>
                                </fieldset>
                                </tr>
                            </p>
                            <br/>
                            <p style={{ marginLeft:'3rem' }}>                                        
                                   
                                <label for="basura" style={{ fontWeight:'900' }}>Eliminación de basura:</label> 
                                <br/>
                                <select 
                                    className="custom-select"
                                    id="basura" 
                                    name="basura" 
                                    value = {eliminacion_basura}
                                    onChange = {(e) => {
                                            const eliminarBasuraSeleccionado = e.target.value;
                                            cambiarEliminacionBasura({campo: eliminarBasuraSeleccionado});
                                        }} 
                                >
                            
                                <option value={eliminacion_basura.campo} checked>{eliminacion_basura.campo}</option>
                                <option value="" disabled>----------</option>
                                <option value="No tiene">No tiene </option>
                                <option value="Carro recolector">Carro recolector </option>
                                <option value="Arrojan en terreno baldío/quebrada">Arrojan en terreno baldío/quebrada </option>
                                <option value="La queman">La queman </option>
                                <option value="La entierran">La entierran </option>
                                <option value="Arrojan al río">Arrojan al río </option>
                                <option value="Otra forma">Otra forma </option>

                                </select> 
                                
                                <label for="eliminacion_excretas" style={{ fontWeight:'900' }}>Eliminación excretas:</label>
                                <br/>
                                <select 
                                    className="custom-select"
                                    id="eliminacion_excretas" 
                                    name="eliminacion_excretas" 
                                    value = {eliminacion_excretas}
                                    onChange = {(e) => {
                                            const eliminarExcretasSeleccionado = e.target.value;
                                            cambiarEliminacionExcretas({campo: eliminarExcretasSeleccionado});
                                        }} 
                                >

                                <option value={eliminacion_excretas.campo} checked>{eliminacion_excretas.campo}</option>
                                <option value="" disabled>----------</option>
                                <option value="No tiene">No tiene </option>
                                <option value="Red pública de alcantarillado">Red pública de alcantarillado </option>
                                <option value="Pozo séptico">Pozo séptico </option>
                                <option value="Pozo ciego">Pozo ciego </option>
                                <option value="Descarga directa al mar, río o lago">Descarga directa al mar, río o lago </option>
                                <option value="Letrina">Letrina </option>
                                        
                                </select> 
                            </p>
            </div>
        <br/>              
                <ContenedorBotonCentrado>
                    <Boton type="submit">Enviar</Boton>                    
                </ContenedorBotonCentrado>
            </Formulario>
        </main>
    </div>         
    )
}

export default Infraestructura;
