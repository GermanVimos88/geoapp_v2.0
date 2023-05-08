import React, {useState, useEffect, Component} from 'react';
import '../css/App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faEdit, faTrashAlt, faSearch, faLaptopHouse, faReply, faPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/logocuyuja.png';
//import Chart from "chart.js/auto";
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
import 'chart.piecelabel.js';
import Cookies from 'universal-cookie';

//ChartJS.register(ArcElement, Tooltip, Legend);

const cookies = new Cookies();

function searchingTerm(term) {
    return function(x) {
        return x.clavecatastral?.includes(term) || !term;
    }
}

function App() {
        
    const baseUrl='http://localhost/apicatastro/index.php/predios/' //'https://cheerful-marzipan-12e313.netlify.app/predios' //'http://f0783168.xsph.ru/index.php/predios';  'http://localhost/apicatastro/index.php/predios/'
    const urlInsertar = 'http://localhost/apicatastro/index.php/predios/nuevo' //'https://cheerful-marzipan-12e313.netlify.app/predios/nuevo'; //'http://f0783168.xsph.ru/index.php/predios/nuevo'; 
    //var { id, clave } = UseParams();
    const [data, setData]=useState([]);
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
    const [propietarios, setPropietarios]=useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalReporteEstadistico, setModalReporteEstadistico] = useState(false);
    const [modalReporteDescriptivo, setModalReporteDescriptivo] = useState(false);
    const [predioSeleccionado, setPredioSeleccionado]=useState({
        id: '',
        idpropietario: '',          //variables con nombre iguales a los inputs de los modal
        identificacion: '',
        tipo: '',
        clavecatastral: '',
        regimen: '',
        bloque: '',
        unidad: '',
        piso: '',
        primer_nombre:'',
        primer_apellido:'',
        segundo_apellido:'',
        tipo_propietario:''
    })
    const [busqueda, setBusqueda] = useState({campo: ''});
    var props = [];
    var valores = [];
    var valoresAdquisicion = [];
    var valoresSuelo = [];

    const handleChange=e=>{
        const {name, value}=e.target;
        setPredioSeleccionado((prevState)=>({
            ...prevState,
            [name]: value
        }))
        //console.log(predioSeleccionado);
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

    const abrirCerrarModalReporteEstadistico=()=>{
        setModalReporteEstadistico(!modalReporteEstadistico);
     }
    
    const abrirCerrarModalReporteDescriptivo=()=>{
        setModalReporteDescriptivo(!modalReporteDescriptivo);
     }

    const soporte=(id,clave,clave_propietario)=>{
        window.location.href='./categorias/:'+id+':'+clave+':'+clave_propietario;        
    }

    const menu=()=>{
        
        //Retorno al menú principal        
        window.location.href='./menu';
    }

    const nuevo_propietario=()=>{
        
        //Retorno al menú principal        
        window.location.href='./propietario';
    }
    
    const nuevoFormulario=()=>{
        setPredioSeleccionado({
            //id: '',
            idpropietario: '',
            identificacion: '',
            tipo: '',
            clavecatastral: '',
            regimen: '',
            bloque: '',
            unidad: '',
            piso: ''
        })        
    }

    const peticionGet=async()=>{        
            const response = await axios.get(baseUrl) 
            setData(response.data);
            //console.log(data)
    }

    const getReporteEstadistico=async()=>{        
        
        try {

            const response = await axios.get('http://localhost/apicatastro/index.php/reportes/?id=1') 
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

            console.log(valores);
            var coloresPropietarios=[];
            for (var i=0;i<valores.length;i++){
                coloresPropietarios.push(colorHex());
            }
            setColoresGrafica(coloresPropietarios);
            console.log(coloresGrafica);

            var coloresAdq=[];
            for (var i=0;i<valoresAdquisicion.length;i++){
                coloresAdq.push(colorHex());
            }
            setColoresAdquisicion(coloresAdq);
            console.log(coloresAdquisicion);

            var coloresS=[];
            for (var i=0;i<valoresSuelo.length;i++){
                coloresS.push(colorHex());
            }
            setColoresSuelo(coloresS);
            console.log(coloresSuelo);

            //coloresAdq=[];
            //coloresPropietarios=[];
            //coloresS=[];

            
        } catch (error) {
            console.log(error)
            
        }
        
    }

    const getReporteDescriptivo=async()=>{        
        const response = await axios.get('http://localhost/apicatastro/index.php/reportes/?id=2') 
        setReporteDescriptivo(response.data);
        //console.log(data)
    }

    

    /* const generarColores = ()=>{
        var colores=[];
        for (var i=0;i<valores.length;i++){
            colores.push(colorHex());
        }
        setColoresGrafica(colores);
        console.log(colores);
    } */

    const configurarGrafica = async() => {
        
        //generarColores();
        const dt = await {
            labels: ["Jurídico","Natural","Posesionario","GAD Quijos","Fundación Josefina"],
            datasets: [{
                data: valores,
                backgroundColor: coloresGrafica
            }]
        };
        const opciones = await {
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
        console.log(dataGrafica);
        console.log(opcionesGrafica);
        console.log(coloresGrafica);
        //valores=[];
    }

    const graficaAdquisicion = async() => {
        const dt = await {
            labels: ["Compra/Venta","Adjudicación","Donación","S/N"],
            datasets: [{
                data: valoresAdquisicion,
                backgroundColor: coloresAdquisicion
            }]
        };
        const opciones = await {
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
        console.log(dataAdquisicion);
        console.log(opcionesAdquisicion);
        console.log(coloresAdquisicion);

    }

    const graficaSuelo = async() => {
        const dt = await{
            labels: ["Lastrado","Asfalto","Tierra","Adoquín"],
            datasets: [{
                data: valoresSuelo,
                backgroundColor: coloresSuelo
            }]
        };
        const opciones = await{
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
        console.log(dataSuelo);
        console.log(opcionesSuelo);
        console.log(coloresSuelo);
    }


    const getPropietarios = async() =>{
        const response = await axios.get('http://localhost/apicatastro/index.php/propietarios/') 
        
        response.data.map(element => {
            if(element.primer_apellido!=='s/n'&& element.primer_nombre!=='s/n'){
                
                props.push({
                    idpropietario: element.idpropietario,
                            nombre: element.primer_nombre+' '+element.segundo_nombre+' '+element.primer_apellido+' '+element.segundo_apellido,
                            identificacion: element.identificacion,
                            idpropietario: element.idpropietario
                } )                                     
            }else{
                props.push({
                    idpropietario: element.idpropietario,
                            nombre: element.razon_social,
                            identificacion: element.identificacion,
                            idpropietario: element.idpropietario
                } )      

            }

        })
        setPropietarios(props);
        console.log(props);
        console.log(propietarios);

    } 
    

    const postPredio=async()=>{
        await axios.post(urlInsertar,predioSeleccionado)
        .then(response=>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
            peticionGet();
        }).catch(error=>{
            console.error(error);
        });
    }

    const putPredio=async()=>{        
        await axios.put('http://localhost/apicatastro/index.php/predios/actualizar/?id='+predioSeleccionado.idpredio, predioSeleccionado)    /*'http://f0783168.xsph.ru/index.php/predios/actualizar?id='*/
        .then(response=>{
            var dataNueva=data;
            dataNueva.map(predio=>{
                if(predio.idpredio===predioSeleccionado.id){
                    predio.idpropietario=predioSeleccionado.idpropietario;
                    predio.identificacion=predioSeleccionado.identificacion;
                    predio.tipo=predioSeleccionado.tipo;
                    predio.clavecatastral=predioSeleccionado.clavecatastral;
                    predio.regimen=predioSeleccionado.regimen;
                    predio.bloque=predioSeleccionado.bloque;
                    predio.unidad=predioSeleccionado.unidad;
                    predio.piso=predioSeleccionado.piso;       

                }

            })
            setData(dataNueva);
            abrirCerrarModalEditar();
            peticionGet();
        }).catch(error=>{
            console.error(error);
        });
    }


    const deletePredio=async()=>{
        await axios.delete('http://localhost/apicatastro/index.php/predios/eliminar/?id='+predioSeleccionado.idpredio) /*'http://f0783168.xsph.ru/index.php/predios/eliminar?id='*/
        .then(response=>{
            setData(data.filter(predio=>predio.idpredio!==predioSeleccionado.idpredio))
            abrirCerrarModalEliminar();
            peticionGet();
        })

    }

    const reporte = () => {
        window.location.href='./reportes';
    }

    const seleccionarPredio=(predio, caso)=>{
        setPredioSeleccionado(predio);                
        
        switch(caso){

            case "Editar":  abrirCerrarModalEditar();
                            break;  
            case "Eliminar":  abrirCerrarModalEliminar();
                            break; 
            case "Configuracion": soporte(predio.idpredio,predio.clavecatastral,predio.idpropietario);            
                            break; 
        }            
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
            getPropietarios();
            peticionGet();
            getReporteEstadistico(); 
            getReporteDescriptivo();  
            //generarColores();
            configurarGrafica(); 
            graficaAdquisicion();
            graficaSuelo();      
            
        }            
    },[setData])


    return (
                
             <div style={{textAlign: 'center'}}> 
                
                <img src={logo} alt="" style={{marginLeft:'4rem', marginTop:'-1rem', width:'70px', height:'90px', float: 'left'}} />
                <h6 style={{ float: 'right', marginRight:'3rem', marginTop:'1rem'}}><ul><a onClick={()=>cerrarSesion()} title='Cerrar sesión'> <FontAwesomeIcon icon={faUserCircle} size={'lg'} /> {cookies.get('username')} </a></ul>  </h6>                     
                <h3 style={{color:'#20d757', marginLeft: '3rem', marginTop:'2rem' }} >Predios registrados <FontAwesomeIcon icon={faLaptopHouse}/></h3> 
                <br/>                              
                <hr/>                
                <button className="btn btn-success btn-sm" style={{ float: 'right', borderRadius:'22px', marginRight: '2rem'}} onClick={()=>abrirCerrarModalInsertar()} >Nuevo Predio <FontAwesomeIcon icon={faPlus}/></button>                
                {/* <button className="btn btn-primary btn-sm" style={{ float: 'right', borderRadius:'22px', marginLeft: '5rem'}} onClick={()=>abrirCerrarModalReporteDescriptivo()} >Reporte Descriptivo <FontAwesomeIcon icon={faClipboardList}/></button>  */}
                <button className="btn btn-success btn-sm" style={{ float: 'right', borderRadius:'22px', marginRight: '2rem'}} onClick={()=> reporte()/* abrirCerrarModalReporteEstadistico() */} >Reportes <FontAwesomeIcon icon={faClipboardList}/></button>                
                <button className="btn btn-success btn-sm" style={{ float: 'right', borderRadius:'22px', marginRight: '2rem'}} onClick={()=>nuevo_propietario()} >Propietarios <FontAwesomeIcon icon={faPlus}/></button>                
                <button className="btn btn-outline-secondary btn-sm" style={{ float: 'right', borderRadius:'22px', marginLeft: '1rem', marginRight: '3rem'}} onClick={()=>menu()}>Menú Principal <FontAwesomeIcon icon={faReply}/> </button>
                <div className='barraBusqueda' style={{ float:'left', marginLeft:'2rem' }}>
                    <label for="busqueda">
                    <input
                        type='text'
                        title="Ingrese clave catastral"
                        placeholder='Buscar predio'
                        className='textField'
                        id='busqueda'
                        name='busqueda'
                        value={busqueda.campo}
                        onChange={(e)=>setBusqueda({campo: e.target.value})}
                    />
                    <button type='button' className='btnBuscar'>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    </label>
                </div>
                <br/>
                <br/>                
                <div class="center-block fix-width scroll-inner" style={{ scale: "100%", marginLeft:'1rem', marginRight:'1rem', width:'97%', backgroundColor:'#d1e8e7'}}>
                <table className="table table-striped table-hover">
                    <thead style={{ position: 'sticky', top: 0 }}>
                        <tr>
                            <th><strong>ID</strong></th>
                            <th><strong>ID Propietario</strong></th>
                            <th>Clave catastral</th>
                            <th>Cédula</th>
                            <th>Nombre y apellidos</th>                            
                            <th>Tipo propietario</th>
                            <th>Razon social</th>                                                    
                            <th>Piso</th>  
                            <th>Unidad</th>  
                            
                            <th>ACCIONES</th>                                                   

                        </tr>
                    </thead>
                    <tbody>
                        {data.filter(searchingTerm(busqueda.campo)).map(predio=>( 
                            
                            <tr key={predio.idpredio}>
                            <td>{predio.idpredio} </td>
                            <td>{predio.idpropietario} </td>                                    
                            <td>{predio.clavecatastral}</td>
                            <td>{predio.identificacion}</td>
                            <td>{predio.primer_apellido+' '+predio.segundo_apellido+' '+predio.primer_nombre}</td>
                            <td>{predio.tipo_propietario}</td>
                            <td>{predio.razon_social}</td>
                            <td>{predio.piso}</td>
                            <td>{predio.unidad}</td>
                            <td>
                                        <button className="btn btn-primary btn-sm" style={{borderRadius:'22px'}} onClick={()=>seleccionarPredio(predio,"Editar")} >Editar <FontAwesomeIcon icon={faEdit}/></button>{"   "}                                        
                                        <button className="btn btn-danger btn-sm" style={{borderRadius:'22px'}} onClick={()=>seleccionarPredio(predio,"Eliminar")}>Eliminar <FontAwesomeIcon icon={faTrashAlt}/></button>{"   "}                                        
                                        <button className="btn btn-info btn-sm" style={{borderRadius:'22px'}} onClick={()=>seleccionarPredio(predio,"Configuracion")}>Categorías  <FontAwesomeIcon icon={faClipboardList}/></button>
                                    </td>
                                </tr>                            
                        ))}
                        
                    </tbody>                    
                </table>  
                </div>
                
                <Modal isOpen={modalInsertar}>
                        <ModalHeader>Insertar nuevo predio</ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                
                                        <label for="idpropietario" >Propietario 
                                            <select 
                                                class="form-select form-select-lg mb-3" 
                                                className="custom-select" 
                                                id="idpropietario" 
                                                name="idpropietario"
                                                
                                                onChange = {(e) => {
                                                    const idSeleccionado = e.target.value;
                                                    setPredioSeleccionado((prevState)=>(
                                                        {...prevState,
                                                            idpropietario: idSeleccionado})
                                                        );
                                                    /* propietarios?.map(elemento =>{
                                                        if(elemento.idpropietario===idSeleccionado){
                                                            setPredioSeleccionado((prevState)=>(
                                                                {...prevState,
                                                                    identificacion: elemento.identificacion})
                                                                );
                                                        }
                                                    })     */                                                
                                                }}
                                            >
                                            {propietarios?.map(element => <option key={element.idpropietario} value={element.idpropietario}>{element.idpropietario+'-'+element.nombre}</option>)}
                                            
                                            </select>
                                    </label>
                                                                                                               
                                    <br/>
                                    <label for="tipo">Tipo
                                    
                                            <select 
                                                class="form-select form-select-sm mb-1" 
                                                className="custom-select" 
                                                id="tipo" 
                                                name="tipo"
                                                
                                                onChange = {handleChange}
                                            >
                                              <option value="Urbano">Urbano</option>
                                              <option value="Rural">Rural</option>                                          
                                            </select>
                                    </label>
                                    
                                    <label for="clavecatastral" style={{float: 'right'}}>Clave catastral (*) 
                                    <input type="text" className="form-control" name="clavecatastral" id="clavecatastral" onChange={handleChange} />
                                    </label>
                                                                        
                                    <br/>                                    
                                    <label for="regimen" >Régimen                                    
                                    <input type="text" className="form-control" name="regimen" id="regimen" onChange={handleChange} />
                                    </label>
                                    
                                    <label for="bloque" style={{float: 'right'}}>Bloque
                                    <input type="text" className="form-control" name="bloque" id="bloque" onChange={handleChange} />
                                    </label>
                                                                        
                                    <br/>  
                                    <label for="unidad" >Unidad
                                    <input type="text" className="form-control" name="unidad" id="unidad" onChange={handleChange} />
                                    </label>
                                    
                                    <label for="piso" style={{float: 'right'}}>Piso
                                    <input type="text" className="form-control" name="piso" id="piso" onChange={handleChange} />
                                    </label>
                                    
                                </div>
                </ModalBody>
                <ModalFooter>
                    
                    <button className="btn btn-primary" onClick={()=>postPredio()} >Insertar</button>{"  "}                  
                    
                    <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>                   
                    
                </ModalFooter>
            </Modal>


    
            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Predio</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                                    <center>
                                    <label htmlFor="id">ID predio: {predioSeleccionado && predioSeleccionado.idpredio} </label>                                    
                                    </center>                                                                        
                                        <label for="idpropietario" >Propietario
                                            <select 
                                                class="form-select form-select-lg mb-3" 
                                                className="custom-select" 
                                                id="idpropietario" 
                                                name="idpropietario"
                                                
                                                onChange = {(e) => {
                                                    const idSeleccionado = e.target.value;
                                                    setPredioSeleccionado((prevState)=>(
                                                        {...prevState,
                                                            idpropietario: idSeleccionado}
                                                            ));

                                                        /* propietarios?.map(elemento =>{
                                                            if(elemento.idpropietario===idSeleccionado){
                                                                setPredioSeleccionado((prevState)=>(
                                                                    {...prevState,
                                                                        identificacion: elemento.identificacion})
                                                                    );
                                                            }
                                                        })      */                                                   
                                                }}
                                            >
                                            <option value={predioSeleccionado.idpropietario}>{predioSeleccionado.primer_nombre+' '+predioSeleccionado.primer_apellido+' '+predioSeleccionado.segundo_apellido}</option>
                                            <option value="" disabled>----------</option>
                                            {propietarios?.map(element => <option key={element.idpropietario} value={element.idpropietario}>{element.idpropietario+'-'+element.nombre}</option>)}
                                            
                                            </select>
                                        </label>

                                    <br/> 
                                    <label for="tipo">Tipo de predio
                                    <br/>
                                            <select 
                                                class="form-select form-select-lg mb-3" 
                                                className="custom-select" 
                                                id="tipo" 
                                                name="tipo"
                                                value={predioSeleccionado && predioSeleccionado.tipo}
                                                onChange = {handleChange}
                                            >
                                                <option value="Urbano">Urbano</option>
                                                <option value="Rural">Rural</option>                                          
                                            </select>
                                    </label>
                                    
                                    <label for="identificacion" style={{float: 'right'}}>Identificación
                                    <br/>
                                    <input type="text" className="form-control" name="identificacion" id="identificacion" readOnly 
                                                        onChange={()=>{
                                                            propietarios?.map(elemento =>{
                                                                if(elemento.idpropietario===predioSeleccionado.idpropietario){
                                                                    setPredioSeleccionado((prevState)=>(
                                                                        {...prevState,
                                                                            identificacion: elemento.identificacion})
                                                                        );
                                                                }
                                                            })     
                                                            } 
                                                        }
                                                            
                                                        value={predioSeleccionado && predioSeleccionado.identificacion}/>
                                    </label>
                                    
                                    <br/>  
                                    <label for="tipo_propietario" >Tipo de propietario
                                    <br/>
                                    <input type="text" className="form-control" name="tipo_propietario" id="tipo_propietario" readOnly onChange={handleChange} value={predioSeleccionado && predioSeleccionado.tipo_propietario}/>
                                    </label>
                                    
                                    <label for="clave_catastral"  style={{float: 'right'}}>Clave catastral
                                    <br/>
                                    <input type="text" className="form-control" name="clave_catastral" id="clave_catastral" readOnly onChange={handleChange} value={predioSeleccionado && predioSeleccionado.clavecatastral}/>
                                    </label>
                                    <br/>                                    
                                                                        
                                    <label for="regimen" >Régimen
                                    <br/>
                                    <input type="text" className="form-control" name="regimen" id="regimen" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.regimen}/>
                                    </label>
                                    
                                    <label for="bloque" style={{float: 'right'}}>Bloque
                                    <br/>
                                    <input type="text" className="form-control" name="bloque" id="bloque" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.bloque}/>
                                    </label>
                                    <br/>  
                                    <label for="unidad" >Unidad
                                    <br/>
                                    <input type="text" className="form-control" name="unidad" id="unidad" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.unidad}/>
                                    </label>
                                     
                                    <label for="piso" style={{float: 'right'}}>Piso
                                    <br/>
                                    <input type="text" className="form-control" name="piso" id="piso" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.piso}/>
                                    </label>
                                    
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>putPredio()}>Editar</button>{"  "}
                    <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro de eliminar este registro {predioSeleccionado && predioSeleccionado.clavecatastral}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>deletePredio()}>
                        Si
                    </button>
                    <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>
                        No
                    </button>
                </ModalFooter>            
            </Modal>                       
        </div>
    );

}

export default App;