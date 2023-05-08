import React, {useState, useEffect} from 'react';
import '../css/App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faEdit, faTrashAlt, faSearch, faLaptopHouse, faReply, faPlus, faUserCircle, faChartPie } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/logocuyuja.png';
//import Chart from "chart.js/auto";
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
import 'chart.piecelabel.js';
import Cookies from 'universal-cookie';

//ChartJS.register(ArcElement, Tooltip, Legend);

const cookies = new Cookies();

const Reportes = () =>{

    const [reporteEstadistico, setReporteEstadistico]=useState([]);
    const [reporteDescriptivo, setReporteDescriptivo]=useState([]);
    const [coloresGrafica, setColoresGrafica]=useState([]);
    const [dataGrafica, setDataGrafica]=useState([]);
    const [opcionesGrafica, setOpcionesGrafica]=useState([]);
    const [coloresAdquisicion, setColoresAdquisicion]=useState([]);
    const [dataAdquisicion, setDataAdquisicion]=useState([]);
    const [opcionesAdquisicion, setOpcionesAdquisicion]=useState([]);
    const [coloresSuelo, setColoresSuelo]=useState([]);
    const [dataSuelo, setDataSuelo]=useState([]);
    const [opcionesSuelo, setOpcionesSuelo]=useState([]);
    const [cargando, setCargando] = useState(true);

    var valores = [];
    var valoresAdquisicion = [];
    var valoresSuelo = [];

    function generarCaracter (){
        var caracter = ["a","b","c","d","e","f","0","1","2","3","4","5","6","7","8","9"];
        var numero = (Math.random()*15).toFixed(0);
        return caracter[numero];
    }

    function colorHex (){
        var color = "";
        for (var i=0;i<6;i++){
            color = color + generarCaracter();
        }
        return "#" + color;
    }

    const getReporteEstadistico=async()=>{         
        
        try {
            const response = await axios.get('http://localhost/apiCatastro/index.php/reportes/?id=1') 
            setReporteEstadistico(response.data);
            //console.log(data)
            reporteEstadistico?.map(predio=>(
                valores.push(predio.propietarios_juridicos), 
                valores.push(predio.propietarios_natural),
                valores.push(predio.propietarios_posesionario),
                valores.push(predio.propietarios_gad),
                valores.push(predio.propietario_josefina),
                valoresAdquisicion.push(predio.compra_venta),
                valoresAdquisicion.push(predio.adjudicacion),
                valoresAdquisicion.push(predio.donacion),
                valoresAdquisicion.push(predio.s_n),
                valoresSuelo.push(predio.lastre),
                valoresSuelo.push(predio.asfalto),
                valoresSuelo.push(predio.tierra),
                valoresSuelo.push(predio.adoquin)            
            ))

            
            console.log(valores);
            
            var coloresPropietarios=[];
            for (var i=0;i<valores.length;i++){
                coloresPropietarios.push(colorHex());
            }
            setColoresGrafica(coloresPropietarios);
            //console.log(coloresGrafica);

            var coloresAdq=[];
            for (var i=0;i<valoresAdquisicion.length;i++){
                coloresAdq.push(colorHex());
            }
            setColoresAdquisicion(coloresAdq);
            //console.log(coloresAdquisicion);

            var coloresS=[];
            for (var i=0;i<valoresSuelo.length;i++){
                coloresS.push(colorHex());
            }
            setColoresSuelo(coloresS);
            //console.log(coloresSuelo);

            //coloresAdq=[];
            //coloresPropietarios=[];
            //coloresS=[];
            
            configurarGrafica(); 
            graficaAdquisicion();
            graficaSuelo();
            //setCargando(false);

            
        } catch (error) {
            console.log(error)
            
        }        
    }    

    
    const configurarGrafica = () => {
        
        //generarColores();
        const dt = {
            labels: ["Jurídico","Natural","Posesionario","GAD Quijos","Fundación Josefina"],
            datasets: [{
                data: valores,
                backgroundColor: coloresGrafica
            }]
        };
        const opciones = {
            responsive: true,
            maintainAspectRatio: false,
            pieceLabel:{
                render: function(args){
                    return args.label+': '+(args.value*100/12).toFixed(2)+'%';
                },
                fontSize: 10,
                fontColor: '#fff',
                fontFamily: 'Arial'
            }
        }
        setDataGrafica(dt);
        setOpcionesGrafica(opciones);
        //console.log(dataGrafica);
        //console.log(opcionesGrafica);
        console.log(coloresGrafica);
        //valores=[];
    }

    const graficaAdquisicion = () => {
        const dt = {
            labels: ["Compra/Venta","Adjudicación","Donación","S/N"],
            datasets: [{
                data: valoresAdquisicion,
                backgroundColor: coloresAdquisicion
            }]
        };
        const opciones = {
            responsive: true,
            maintainAspectRatio: false,
            pieceLabel:{
                render: function(args){
                    return args.label+': '+(args.value*100/10).toFixed(2)+'%';
                },
                fontSize: 10,
                fontColor: '#fff',
                fontFamily: 'Arial'
            }
        }
        setDataAdquisicion(dt);
        setOpcionesAdquisicion(opciones);
        //console.log(dataAdquisicion);
        //console.log(opcionesAdquisicion);
        console.log(coloresAdquisicion);

    }

    const graficaSuelo = () => {
        const dt =  {
            labels: ["Lastrado","Asfalto","Tierra","Adoquín"],
            datasets: [{
                data: valoresSuelo,
                backgroundColor: coloresSuelo
            }]
        };
        const opciones =  {
            responsive: true,
            maintainAspectRatio: false,
            pieceLabel:{
                render: function(args){
                    return args.label+': '+(args.value*100/11).toFixed(2) +'%';
                },
                fontSize: 10,
                fontColor: '#fff',
                fontFamily: 'Arial'
            }
        }
        setDataSuelo(dt);
        setOpcionesSuelo(opciones);
        //console.log(dataSuelo);
        //console.log(opcionesSuelo);
        console.log(coloresSuelo);
    }

    const menu=()=>{        
        //Retorno al menú principal        
        window.location.href='./app';
    }

    const cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('primer_apellido', {path: "/"});
        cookies.remove('segundo_apellido', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }

    useEffect(()=>{

        if(!cookies.get('username')){
            window.location.href="./";
        }
        else{            
            //getPropietarios();
            //peticionGet();
            getReporteEstadistico();             
            
            //getReporteDescriptivo();  
            //generarColores();
            /* configurarGrafica(); 
            graficaAdquisicion();
            graficaSuelo();   */
            setCargando(false);
            
        }            
    },[setDataAdquisicion]);    

    return (
        <div style={{textAlign: 'center'}}>
                <img src={logo} alt="" style={{marginLeft:'4rem', marginTop:'0.5rem', width:'70px', height:'90px', float: 'left'}} />
                <label style={{ float: 'right', marginRight:'3rem', marginTop:'2rem'}}><ul><a onClick={()=>cerrarSesion()} title='Cerrar sesión'> <FontAwesomeIcon icon={faUserCircle} size={'lg'} /> {cookies.get('username')} </a></ul>  </label>
                <label style={{fontSize:'28px' , color:'#20d757', marginLeft: '0.5rem', marginTop:'2rem' }} > <strong>Reporte Estadístico <FontAwesomeIcon icon={faChartPie}/></strong> </label>
                <br/>
                <hr/>
                <button className="btn btn-outline-secondary btn-sm" style={{ float: 'right', borderRadius:'22px', marginLeft: '1rem', marginRight: '3rem' }} onClick={()=>menu()}>Regresar <FontAwesomeIcon icon={faReply}/> </button>
                
                    {cargando ? (<p>Cargando...</p>):(
                    <>
                        <div className="form-group">
                        
                            <center>
                            <div className="chart-container" style={{width:'50%', height:'400px'}}>
                            <h5>Tipo de propietarios</h5>
                                <Pie 
                                    data={dataGrafica}                        
                                    options={opcionesGrafica}  
                                    />                         
                            <br/>
                            <br/>
                            </div>
                            </center>
                            <br/>
                            <br/>
                        
                            <center>
                            <div className="chart-container" style={{width:'50%', height:'400px'}}>
                            <h5>Forma de adquisición predial</h5>
                            
                                <Pie 
                                    data={dataAdquisicion}                        
                                    options={opcionesAdquisicion}  
                                    />                            
                            <br/>
                            <br/>
                            </div>
                            <br/>
                            <br/>
                            </center>                        
                       
                            <center>
                            <div className="chart-container" style={{width:'50%', height:'400px'}}>
                            <h5>Tipo de suelo</h5>
                            
                                <Pie 
                                    data={dataSuelo}                        
                                    options={opcionesSuelo}  
                                    />
                            <br/>
                            <br/>
                            </div>
                            </center>
                        </div>                        
                    </>
                    )}                        
        </div>
      );
    }
    export default Reportes;


/* 
PLANTILLA REPORTE DESCRIPTIVO

<h3>Reporte Descriptivo</h3>                    
                    <hr></hr>
                    <div className="form-group">
                    {reporteDescriptivo?.map(predio=>(
                        <tr key={predio.d_asfalto}>

                            <label><b>Predios sobre asfalto:</b> {predio.d_asfalto.map((p, i)=> (  <li>{p.inf_clave_predio}</li>  )   )} </label>   
                            <hr></hr>
                            <br/>                            
                            <label>Predios sobre lastrado: {predio.d_lastre.map((p, i)=> ( <li>{p.inf_clave_predio}</li>  )   )}  </label> 
                            <hr></hr>
                            <br/>
                            <label>Predios sobre adoquín: {predio.d_adoquin.map((p, i)=> ( <li>{p.inf_clave_predio}</li>  )   )}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios con medidor de agua: {predio.medidor_agua_si.map((p, i)=> ( <li>{p.inf_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios sin medidor de agua: {predio.medidor_agua_no.map((p, i)=> ( <li>{p.inf_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios con servicio de alcantarillado: {predio.excretas.map((p, i)=> ( <li>{p.inf_clave_predio}</li>  ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios sin medidor de luz eléctrica: {predio.medidor_luz_no.map((p, i)=> ( <li>{p.inf_clave_predio}</li>))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios sin alumbrado público: {predio.alumbrado_publico_no.map((p, i)=> ( <li>{p.inf_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios con cerramiento: {predio.cerramiento.map((p, i)=> ( <li>{p.obc_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios desocupados: {predio.desocupada.map((p, i)=> ( <li>{p.cdc_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios ocupados: {predio.ocupada.map((p, i)=> ( <li>{p.cdc_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios esquineros: {predio.esquinero.map((p, i)=> ( <li>{p.clt_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios con edificaciones: {predio.edificado.map((p, i)=> ( <li>{p.clt_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios sin edificaciones: {predio.no_edificado.map((p, i)=> ( <li>{p.clt_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios sobre Vía Interoceánica: {predio.via_interoceanica.map((p, i)=> ( <li>{p.ubc_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios sin linderos: {predio.linderos_no.map((p, i)=> ( <li>{p.inv_clave_predio}</li> ))}</label>
                            <hr></hr>
                            <br/>
                            <label>Predios con linderos: {predio.linderos_si.map((p, i)=> ( <li>{p.inv_clave_predio}</li> ))}</label>
                                                        
                            </tr>
                            ))}
                    </div>

*/


