import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './elementos/Formularios';
import '../css/estilos.css';
import axios from 'axios';
//import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
//import ComponenteInput from './componentes/input.js'
//import styled from 'styled-components';


const Infraestructura = () => {

       
   
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

           
    const baseUrl='http://apicatastro/infraestructura/?id='+id; 
    const [data, setData]=useState([]);    
    //const [id_caracteristicas, cambiarIdCaracteristicas] = useState({campo: '', valido: null});
	//const [clave_catastral, cambiarClaveCatastral] = useState({campo: '', valido: null}); 
    const [idcaracteristicas_lote, cambiarIdCaracteristicas] = useState ({campo: '', valido: null});
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
        

        const onChangeAlcantarillado = (e) =>{
            cambiarAlcantarillado(e.target.checked);
        }
        
        
        const onChangeAceras = (e) =>{
            cambiarAceras(e.target.checked);
        }
        
        
        const onChangeBordillos = (e) =>{
            cambiarBordillos(e.target.checked);
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

     const peticionGet=async()=>{
        const response = await axios.get(baseUrl)
        //.then(response=>{
        //    setData(response);

            //setData(response)
            //console.log(response.data[0].via_acceso)
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
        <main>
            <h1><b>Infraestructura 🚰</b></h1> 
            <br/>                
            <div class="form-group col-md-6"> 
                     
                <label>Clave Catastral: <b>{clave_predio.campo}</b></label> <td> </td>
            </div>              

            <Formulario action="" onSubmit={onSubmit}>
            
            <div>               
                <br/>
                <h5><b>Vías de acceso:</b></h5> 
                
                                
                <center>
                
                <div id="contenedor">
                    <br/>
                    <p>
                        <tr> 
                        <br/>
                        <td id="etiqueta"><b>Tipo Vía de acceso:</b></td>&nbsp;&nbsp;
                        
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="tipo_via" 
                                name="tipo_via" 
                                value = {tipo_via_acceso}
                                onChange = {(e) => {
                                    const tipoViasSeleccionado = e.target.value;
                                    cambiarTipoViaAcceso(tipoViasSeleccionado);
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
                        
                        <td id="etiqueta"><b>Rodadura:</b></td>&nbsp;&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="rodadura" 
                                name="rodadura" 
                                value = {rodadura}
                                onChange = {(e) => {
                                    const rodaduraSeleccionada = e.target.value;
                                    cambiarRodadura(rodaduraSeleccionada);
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
                        
                        <td id="etiqueta"><b>Otras vías de acceso:</b></td>&nbsp;&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="vias_adicionales"
                                name="vias_adicionales" 
                                value = {vias_acceso_adicionales}
                                onChange = {(e) => {
                                    const viasAdicionalesSeleccionadas = e.target.value;
                                    cambiarViasAccesoAdicionales(viasAdicionalesSeleccionadas);
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

            <h5><b>Agua potable:</b></h5> 
            <center>
                    <div id="contenedor">
                    <br/>
                    <p>

                        <tr>    
                        
                        <td id="etiqueta"><b>Fuente de agua:</b></td>&nbsp;&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="agua_procedencia" 
                                name="agua_procedencia" 
                                value = {agua_procedencia}
                                onChange = {(e) => {
                                    const aguaProcedenciaSeleccionada = e.target.value;
                                    cambiarAguaProcedencia(aguaProcedenciaSeleccionada);
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
                        <td id="etiqueta"><b>Captación:</b></td>&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="agua_recepcion" 
                                name="agua_recepcion" 
                                value = {agua_recepcion}
                                onChange = {(e) => {
                                    const aguaRecepcionSeleccionada = e.target.value;
                                    cambiarAguaRecepcion(aguaRecepcionSeleccionada);
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
                        <td id="etiqueta"><b>Alcantarillado:</b></td>&nbsp;&nbsp;
                            <td>
                            <select 
                                className="custom-select"
                                id="alcantarillado" 
                                name="alcantarillado" 
                                value = {alcantarillado}
                                onChange = {(e) => {
                                    const alcantarilladoSeleccionado = e.target.value;
                                    cambiarAlcantarillado(alcantarilladoSeleccionado);
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
                        <td id="etiqueta"><b>Método de riego:</b></td>&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="metodo_riego" 
                                name="metodo_riego" 
                                value = {metodo_riego}
                                onChange = {(e) => {
                                    const metodoRiegoSeleccionado = e.target.value;
                                    cambiarMetodoRiego(metodoRiegoSeleccionado);
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
                        <td id="etiqueta"><b>Disponibilidad de riego:</b></td>&nbsp;
                            <td>
                            
                            <select 
                                className="custom-select"
                                id="disponibilidad_riego" 
                                name="disponibilidad_riego" 
                                value = {disponibilidad_riego}
                                onChange = {(e) => {
                                    const disponibleRiegoSeleccionado = e.target.value;
                                    cambiarDisponibilidadRiego(disponibleRiegoSeleccionado);
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

            <h5><b>Energía eléctrica:</b></h5> 
            <center>
                <div id="contenedor">
                    <br/>
                    <p>
                        <tr>    
                        <td id="etiqueta"><b>Fuente de energía eléctrica:</b></td>&nbsp;
                        <td>
                            
                        <select 
                            id="energia_procedencia" 
                            name="energia_procedencia" 

                            className="custom-select"
                            value = {energia_electrica_procedencia}
                            onChange = {(e) => {
                                    const energiaProcedeSeleccionado = e.target.value;
                                    cambiarEnergiaElectricaProcedencia(energiaProcedeSeleccionado);
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
                       
                        <td id="etiqueta">Medidor:</td> &nbsp;&nbsp;&nbsp;&nbsp;
                        <td>
                        <select 
                            className="custom-select"
                            id="medidor"
                            name="medidor" 
                            value = {medidor}
                            onChange = {(e) => {
                                    const medidorSeleccionado = e.target.value;
                                    cambiarMedidor(medidorSeleccionado);
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
                <br/>
                <br/>
                            <p>
                                
                                <fieldset id="checkboxes">  
                                <legend id="leyenda"><b>Comunicaciones:</b></legend>                            
                                
                                <label>
                                    <input class="form-check-input" type="checkbox" name="convencional" id="convencional" checked={telefono_convencional.campo=="1"} onChange={onChangeTelefono}/> Teléfono convencional
                                </label>
                                <br/>
                                <label>
                                    <input class="form-check-input" type="checkbox" name="celular" id="celular" defaultChecked={()=>{if (celular.campo=="1") {return true} }} onChange={onChangeCelular}/> Celular
                                </label>
                                <br/>
                                <label>
                                    <input class="form-check-input" type="checkbox" name="tv_cable" id="tv_cable" defaultChecked={()=>{if (tv_cable.campo=="0") {return true} }} onChange={onChangeTvCable}/> Tv por cable
                                </label>
                                <br/>
                                <label>
                                    <input class="form-check-input" type="checkbox" name="internet" id="internet" checked={internet.campo=="1"} onChange={onChangeInternet}/> Internet
                                </label>                                
                                <br/>
                                </fieldset>
                            
                            </p>                            
                            <br/>                                 
                            <p>

                                <tr>
                                <fieldset id="checkboxes">     
                                <center> <legend id="leyenda"><b>Instalaciones especiales:</b></legend></center>

                                
                                <label>
                                <input class="form-check-input" type="checkbox" name="instalaciones_especiales" id="instalaciones_especiales" checked={instalaciones_especiales.campo!="No tiene"} onChange={onChangeInstalaciones} /> Instalaciones especiales
                                </label>
                                <br/> 
                                <label>
                                        <input class="form-check-input" type="checkbox" name="ascensor" id="ascensor" value={ascensor.campo} onChange={onChangeAscensor}/> Ascensor
                                </label>
                                <br/> 
                                <label>
                                        <input class="form-check-input" type="checkbox" name="circuito_cerrado_tv" id="circuito_cerrado_tv" checked={circuito_cerrado_tv.campo=="1"} onChange={onChangeCCTV}/> Circuito Cerrado de TV 
                                </label>
                                <br/> 
                                <label>
                                        <input class="form-check-input" type="checkbox" name="montacarga" id="montacarga" checked={montacarga.campo=="1"} onChange={onChangeMontacarga}/> Montacarga
                                </label>
                                <br/> 
                                
                                <label>
                                        <input class="form-check-input" type="checkbox" name="sistema_alterno_electricidad" id="sistema_alterno_electricidad" checked={sistema_alterno_electricidad.campo=="1"} onChange={onChangeSistemaAlterno}/> Sistema alterno de electricidad
                                </label>
                                
                                <br/> 
                                <label>
                                        <input class="form-check-input" type="checkbox" name="aire_acondicionado" id="aire_acondicionado" checked={aire_acondicionado.campo=="1"} onChange={onChangeAireAcondicionado}/> Aire acondicionado
                                </label>
                                <br/> 
                                <label>
                                        <input class="form-check-input" type="checkbox" name="sistema_contra_incendios" id="sistema_contra_incendios" checked={sistema_contra_incendios.campo=="1"} onChange={onChangeSistemaIncendios}/> Sistema contra incendios
                                </label>
                                <br/> 
                                <label>
                                        <input class="form-check-input" type="checkbox" name="gas_centralizado" id="gas_centralizado" checked={gas_centralizado.campo=="1"} onChange={onChangeGasCentralizado}/> Gas centralizado
                                </label>
                                <br/> 
                                <label>
                                        <input class="form-check-input" type="checkbox" name="ventilacion" id="ventilacion" checked={ventilacion.campo=="1"} onChange={onChangeVentilacion}/> Ventilación
                                </label>
                                <br/> 
                                <label>
                                        <input class="form-check-input" type="checkbox" name="sistema_voz_datos" id="sistema_voz_datos" checked={sistema_voz_datos.campo=="1"} onChange={onChangeSistemaVozDatos}/> Sistema de voz y datos
                                </label>
                                <br/>
                                </fieldset>
                                </tr>
                                
                            </p>
                                <br/>
                            <p>
                                <tr>
                                <fieldset id="checkboxes">
                                    
                                <legend id="leyenda"><b>Otros servicios:</b></legend>                        

                                <label>
                                    <input class="form-check-input" type="checkbox" name="alumbrado_publico" id="alumbrado_publico" checked={alumbrado_publico.campo==="1"} onChange={onChangeAlumbradoPublico}/> Alumbrado público
                                </label>
                                <br/> 
                                <label>
                                    <input class="form-check-input" type="checkbox" name="recoleccion_basura" id="recoleccion_basura" checked={recoleccion_basura.campo=="1"} onChange={onChangeRecoleccionBasura}/> Recoleccion de basura
                                </label>
                                <br/> 
                                <label>
                                    <input class="form-check-input" type="checkbox" name="transporte_urbano" id="transporte_urbano" checked={transporte_urbano.campo=="1"} onChange={onChangeTransporteUrbano}/> Transporte urbano
                                </label>
                                <br/> 
                                <label>
                                    <input class="form-check-input" type="checkbox" name="aseo_calles" id="aseo_calles" checked={aseo_calles.campo=="1"} onChange={onChangeAseocalles}/> Aseo de calles
                                </label>
                                <br/> 
                                <br/>                                
                                </fieldset>
                                </tr>
                            </p> 
                                
                            <p>
                                <tr>
                                <fieldset id="checkboxes">                                
                                <legend id="leyenda"><b>Aceras y Bordillos:</b></legend>
                                          
                                <label>
                                    <input class="form-check-input" type="checkbox" name="aceras" id="aceras" checked={aceras.campo=="1"} onChange={onChangeAceras}/> Aceras
                                </label>
                                <br/> 
                                <label>
                                    <input class="form-check-input" type="checkbox" name="bordillos" id="bordillos" checked={bordillos.campo=="1"} onChange={onChangeBordillos}/> Bordillos
                                </label>
                                <br/> 
                                <br/>
                                </fieldset>
                                </tr>
                            </p>
                            <br/>
                            <p>                                        
                                <tr>    
                                <td><b>Eliminación de basura:</b></td> &nbsp;&nbsp;
                                <td>
                                <select 
                                    className="custom-select"
                                    id="basura" 
                                    name="basura" 
                                    value = {eliminacion_basura}
                                    onChange = {(e) => {
                                            const eliminarBasuraSeleccionado = e.target.value;
                                            cambiarEliminacionBasura(eliminarBasuraSeleccionado);
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

                                </select> </td>
                                </tr>
                            </p>

                            <p>                                                        
                                <tr>    
            
                                <td><b>Eliminación excretas:</b></td>
                                <td>
                                    
                                <select 
                                    className="custom-select"
                                    id="eliminacion_excretas" 
                                    name="eliminacion_excretas" 
                                    value = {eliminacion_excretas}
                                    onChange = {(e) => {
                                            const eliminarExcretasSeleccionado = e.target.value;
                                            cambiarEliminacionExcretas(eliminarExcretasSeleccionado);
                                        }} 
                                >

                                <option value={eliminacion_excretas.campo} checked>{eliminacion_excretas.campo}</option>
                                <option value="" disabled>----------</option>
                                <option value="No tiene">No tiene </option>
                                <option value="Red pública de alcantarillado">Red pública de alcantarillado </option>
                                <option value="Pozo séptico">Pozo séptico </option>
                                <option value="Pozo ciego">Pozo ciego </option>
                                <option value="Descarga directa al mar, río o lago">Descarga directa al mar,río o lago </option>
                                <option value="Letrina">Letrina </option>
                                        
                                </select> </td>
                                </tr>
                            </p>
            </div>       

        <br/>

                <ContenedorTerminos>
                    <Label>
                        <input 
                            type="checkbox" 
                            name="terminos" 
                            id="terminos" 
                            checked={terminos}
                            onChange={onChangeTerminos}
                            class="form-check-input"
                            
                            />&nbsp;
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
    </div>
         
    )

}


export default Infraestructura;
