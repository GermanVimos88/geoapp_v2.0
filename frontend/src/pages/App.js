import React, {useState, useEffect, Component} from 'react';
import '../css/App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faEdit, faTrashAlt, faSearch, faLaptopHouse, faReply, faPlus } from '@fortawesome/free-solid-svg-icons';
//import Chart from "chart.js/auto";
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";
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

    const soporte=(id,clave)=>{
        window.location.href='./categorias/:'+id+':'+clave;        
    }

    const menu=()=>{
        
        //Retorno al menú principal        
        window.location.href='./menu';
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
            maintainAspectRatio: false
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
            maintainAspectRatio: false
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
            maintainAspectRatio: false
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


    const seleccionarPredio=(predio, caso)=>{
        setPredioSeleccionado(predio);                
        
        switch(caso){

            case "Editar":  abrirCerrarModalEditar();
                            break;  
            case "Eliminar":  abrirCerrarModalEliminar();
                            break; 
            case "Configuracion": soporte(predio.idpredio,predio.clavecatastral);            
                            break; 
        }            
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
                
                <button className="btn btn-outline-secondary btn-lg" style={{ float: 'right', borderRadius:'22px', marginRight: '3rem' }} onClick={()=>menu()}>Menú Principal <FontAwesomeIcon icon={faReply}/> </button>                                
                <br/>
                <h6 style={{ float: 'left', marginLeft:'3rem'}}><b> Usuario:</b> {cookies.get('username')} </h6>                     
                <h4 style={{color:'darkorange', marginLeft: '5rem'}} >Lista de predios registrados <FontAwesomeIcon icon={faLaptopHouse}/></h4> 
                                
                <hr/>
                <button className="btn btn-success" style={{ float: 'left', borderRadius:'22px', marginLeft: '5rem'}} onClick={()=>abrirCerrarModalInsertar()} >Nuevo Predio <FontAwesomeIcon icon={faPlus}/></button>                
                {/* <button className="btn btn-primary btn-sm" style={{ float: 'right', borderRadius:'22px', marginLeft: '5rem'}} onClick={()=>abrirCerrarModalReporteDescriptivo()} >Reporte Descriptivo <FontAwesomeIcon icon={faClipboardList}/></button>  */}
                <button className="btn btn-primary btn-sm" style={{ float: 'right', borderRadius:'22px', marginLeft: '5rem'}} onClick={()=>abrirCerrarModalReporteEstadistico()} >Reporte Estadístico <FontAwesomeIcon icon={faClipboardList}/></button>                
                
                <br/>
                <br/>                                
                <div class="center-block fix-width scroll-inner" style={{float: 'right', scale: "100%", marginRight: '3rem'}}>
                <table className="table table-striped table-hover">
                    <thead style={{ position: 'sticky', top: 0 }}>
                        <tr>
                            <th><b>ID</b></th>
                            <th><b>ID Propietario</b></th>
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
                        {data?.map(predio=>(
                            
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
                                        <button className="btn btn-primary btn-sm" onClick={()=>seleccionarPredio(predio,"Editar")} >Editar <FontAwesomeIcon icon={faEdit}/></button>{"   "}                                        
                                        <button className="btn btn-danger btn-sm" onClick={()=>seleccionarPredio(predio,"Eliminar")}>Eliminar <FontAwesomeIcon icon={faTrashAlt}/></button>{"   "}                                        
                                        <button className="btn btn-info btn-sm" onClick={()=>seleccionarPredio(predio,"Configuracion")}>Categorías  <FontAwesomeIcon icon={faClipboardList}/></button>
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
                                    <tr>
                                            <td><b>Propietario:</b></td>&nbsp;&nbsp;&nbsp;
                                            <td>
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
                                            
                                            </select> </td>
                                        </tr>                                                                        
                                    <br/>                                    
                                    <label>Tipo</label>
                                    <br/>
                                    <select 
                                                class="form-select form-select-lg mb-3" 
                                                className="custom-select" 
                                                id="tipo" 
                                                name="tipo"
                                                
                                                onChange = {handleChange}
                                            >
                                              <option value="Urbano">Urbano</option>
                                              <option value="Rural">Rural</option>                                          
                                            </select>
                                    
                                    <br/> 
                                    <label>Clave catastral (*)</label>
                                    <br/>
                                    <input type="text" className="form-control" name="clavecatastral" id="clavecatastral" onChange={handleChange} />
                                    <br/> 
                                    <label>Régimen</label>
                                    <br/>
                                    <input type="text" className="form-control" name="regimen" id="regimen" onChange={handleChange} />
                                    <br/> 
                                    <label>Bloque</label>
                                    <br/>
                                    <input type="text" className="form-control" name="bloque" id="bloque" onChange={handleChange} />
                                    <br/>  
                                    <label>Unidad</label>
                                    <br/>
                                    <input type="text" className="form-control" name="unidad" id="unidad" onChange={handleChange} />
                                    <br/>  
                                    <label>Piso</label>
                                    <br/>
                                    <input type="text" className="form-control" name="piso" id="piso" onChange={handleChange} />
                                    <br/>  
                                
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
                                                                        
                                    <label><b>Propietario:</b></label>
                                            <td>
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
                                            
                                            </select> </td>

                                    <br/>  
                                    <label>Identificación</label>
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
                                    
                                    <br/>  
                                    <label>Tipo de propietario</label>
                                    <br/>
                                    <input type="text" className="form-control" name="tipo_propietario" id="tipo_propietario" readOnly onChange={handleChange} value={predioSeleccionado && predioSeleccionado.tipo_propietario}/>
                                    <br/> 
                                    <label>Clave catastral</label>
                                    <br/>
                                    <input type="text" className="form-control" name="clave_catastral" id="clave_catastral" readOnly onChange={handleChange} value={predioSeleccionado && predioSeleccionado.clavecatastral}/>
                                    <br/>                                    
                                    <label>Tipo de predio</label>
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
                                            <br/>
                                    <br/> 
                                    <label>Régimen</label>
                                    <br/>
                                    <input type="text" className="form-control" name="regimen" id="regimen" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.regimen}/>
                                    <br/> 
                                    <label>Bloque</label>
                                    <br/>
                                    <input type="text" className="form-control" name="bloque" id="bloque" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.bloque}/>
                                    <br/>  
                                    <label>Unidad</label>
                                    <br/>
                                    <input type="text" className="form-control" name="unidad" id="unidad" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.unidad}/>
                                    <br/>  
                                    <label>Piso</label>
                                    <br/>
                                    <input type="text" className="form-control" name="piso" id="piso" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.piso}/>
                                    <br/>  

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

            <Modal isOpen={modalReporteDescriptivo}>
                <ModalBody>                    
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

                </ModalBody>
                <ModalFooter>
                    
                    <button className="btn btn-secondary" onClick={()=>abrirCerrarModalReporteDescriptivo()}>
                        Salir
                    </button>
                </ModalFooter>            
            </Modal>

            <Modal isOpen={modalReporteEstadistico}>
                <ModalBody>
                <h3>Reporte Estadístico</h3>
                <hr></hr>

                    <div className="form-group">
                    <center>
                    <div className="chart-container" style={{width:'80%', height:'300px'}}>
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
                    <br/>
                    <center>
                    <div className="chart-container" style={{width:'80%', height:'300px'}}>
                    <h5>Forma de adquisición predial</h5>
                    
                        <Pie 
                            data={dataAdquisicion}                        
                            options={opcionesAdquisicion}  
                            /> 
                    
                    <br/>
                    <br/>
                    </div>
                    </center>
                    <br/>
                    <br/>
                    <br/>
                    
                    <center>
                    <div className="chart-container" style={{width:'80%', height:'300px'}}>
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


                </ModalBody>
                <ModalFooter>
                    
                    <button className="btn btn-secondary" onClick={()=>abrirCerrarModalReporteEstadistico()}>
                        Salir
                    </button>
                </ModalFooter>            
            </Modal>
        
        
           
        </div>


    );

}

export default App;