import React, {useState, useEffect, Component} from 'react';
import { BrowserRouter as UseParams } from 'react-router-dom';
import '../css/App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faEdit, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


function searchingTerm(term) {
    return function(x) {
        return x.clavecatastral.includes(term) || !term;
    }
}


function App() {
        
    const baseUrl='http://apicatastro/predios'; 
    const urlInsertar = 'http://apicatastro/datos/predios/nuevo?id=';
    //var { id, clave } = UseParams();
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [predioSeleccionado, setPredioSeleccionado]=useState({
        id: '',
        idpropietario: '',          //variables con nombre iguales a los inputs de los modal
        cedula: '',
        tipo: '',
        clave_catastral: '',
        regimen: '',
        bloque: '',
        unidad: '',
        piso: ''
    })
    const [busqueda, setBusqueda] = useState({campo: ''});


    const handleChange=e=>{
        const {name, value}=e.target;
        setPredioSeleccionado((prevState)=>({
            ...prevState,
            [name]: value
        }))
        //console.log(predioSeleccionado);
    }   

    const abrirCerrarModalInsertar=()=>{
        setModalInsertar(!modalInsertar);
    }
    
    const abrirCerrarModalEditar=()=>{
        setModalEditar(!modalEditar);
    }
    
    const abrirCerrarModalEliminar=()=>{
       setModalEliminar(!modalEliminar);
    }

    const soporte=(id,clave)=>{
        
        
        window.location.href='./categorias/:'+id+':'+clave;
        
    }

    const menu=()=>{
        
        //Retorno al menú principal        
        window.location.href='./menu';
    }    

    const peticionGet=async()=>{        
            const response = await axios.get(baseUrl) 
            setData(response.data);
            //console.log(data)
    }
    

    const postPredio=async()=>{
        
        
        
        
        await axios.post(baseUrl,predioSeleccionado)
        .then(response=>{
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
            peticionGet();
        }).catch(error=>{
            console.error(error);
        });
    }


    const putPredio=async()=>{
        
        
        
        
        await axios.put('http://apicatastro/predios/actualizar?id='+predioSeleccionado.idpredio, predioSeleccionado)    //f, {params:{id: predioSeleccionado.id}})
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
        await axios.delete('http://apicatastro/predios/eliminar?id='+predioSeleccionado.idpredio)
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
            peticionGet();
            
        }            
    },[setData])


    return (
                
             <div style={{textAlign: 'center'}}>              
                
                <center>
                <button className="btn btn-outline-secondary btn-lg" style={{borderRadius:'22px', marginLeft: '5rem'  }} onClick={()=>menu()}>Menú Principal</button>
                <button className="btn btn-success" style={{borderRadius:'22px', marginLeft: '5rem'}} onClick={()=>abrirCerrarModalInsertar()} >Nuevo Predio</button>                 
                
                </center>               
                <br/>

                <div className='barraBusqueda'>                    
                    <input 
                    type="text"
                    placeholder='Buscar predio'
                    className='textField'
                    name="busqueda"
                    value={busqueda.campo}
                    onChange={(e)=>setBusqueda({campo: e.target.value})} //{onChange}
                    />

                    <button type='button' className='btnBuscar' /* onClick={onClear} */ >
                        {"  "}
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                
                </div>

                <table className="table table-striped table-hover">
                    <thead style={{ position: 'sticky', top: 0 }}>
                        <tr>
                            <th><b>ID</b></th>
                            <th><b>ID Propietario</b></th>
                            <th>Cédula</th>
                            <th>Tipo</th>
                            <th>Clave catastral</th>
                            <th>Régimen</th>
                            <th>Bloque</th>
                            <th>Unidad</th>
                            <th>Piso</th>                            
                            <th>ACCIONES</th>                                                   

                        </tr>
                    </thead>
                    <tbody>
                        {data.filter(searchingTerm(busqueda.campo)).map(predio=>(
                            
                                <tr key={predio.idpredio}>
                                    <td>{predio.idpredio} </td>
                                    <td>{predio.idpropietario} </td>                                    
                                    <td>{predio.identificacion}</td>
                                    <td>{predio.tipo}</td>
                                    <td>{predio.clavecatastral}</td>
                                    <td>{predio.regimen}</td>
                                    <td>{predio.bloque}</td>
                                    <td>{predio.unidad}</td>
                                    <td>{predio.piso}</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm" onClick={()=>seleccionarPredio(predio,"Editar")} >Editar <FontAwesomeIcon icon={faEdit}/></button>{"   "}                                        
                                        <button className="btn btn-danger btn-sm" onClick={()=>seleccionarPredio(predio,"Eliminar")}>Eliminar <FontAwesomeIcon icon={faTrashAlt}/></button>{"   "}                                        
                                        <button className="btn btn-info btn-sm" onClick={()=>seleccionarPredio(predio,"Configuracion")}>Configurar  <FontAwesomeIcon icon={faClipboardList}/></button>
                                    </td>
                                </tr>                            
                        ))}
                        
                    </tbody>                    
                </table>  


                <Modal isOpen={modalInsertar}>
                        <ModalHeader>Insertar nuevo predio</ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="id">ID predio: </label>
                                    <br/>
                                    <input type="text" className="form-control" name="id" id="id" readOnly /> 
                                    <label>ID propietario</label>
                                    <br/>   
                                    <input type="text" className="form-control" name="idpropietario" id="idpropietario" onChange={handleChange}/>
                                    <br/> 
                                    <label>Cédula</label>
                                    <br/>
                                    <input type="text" className="form-control" name="cedula" id="cedula" onChange={handleChange}/>
                                    <br/>
                                    <label>Tipo</label>
                                    <br/>
                                    <input type="text" className="form-control" name="tipo" id="tipo" onChange={handleChange}/>
                                    <br/> 
                                    <label>Clave catastral</label>
                                    <br/>
                                    <input type="text" className="form-control" name="clave_catastral" id="clave_catastral" onChange={handleChange}/>
                                    <br/> 
                                    <label>Régimen</label>
                                    <br/>
                                    <input type="text" className="form-control" name="regimen" id="regimen" onChange={handleChange}/>
                                    <br/> 
                                    <label>Bloque</label>
                                    <br/>
                                    <input type="text" className="form-control" name="bloque" id="bloque" onChange={handleChange}/>
                                    <br/>  
                                    <label>Unidad</label>
                                    <br/>
                                    <input type="text" className="form-control" name="unidad" id="unidad" onChange={handleChange}/>
                                    <br/>  
                                    <label>Piso</label>
                                    <br/>
                                    <input type="text" className="form-control" name="piso" id="piso" onChange={handleChange}/>
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
                                    <label htmlFor="id">ID predio: </label>
                                    <br/>
                                    <input type="text" className="form-control" name="id" id="id" value={predioSeleccionado && predioSeleccionado.idpredio} readOnly /> 
                                    <label>ID propietario</label>
                                    <br/>   
                                    <input type="text" className="form-control" name="idpropietario" id="idpropietario" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.idpropietario}/>
                                    <br/> 
                                    <label>Cédula</label>
                                    <br/>
                                    <input type="text" className="form-control" name="cedula" id="cedula" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.identificacion}/>
                                    <br/>
                                    <label>Tipo</label>
                                    <br/>
                                    <input type="text" className="form-control" name="tipo" id="tipo" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.tipo}/>
                                    <br/> 
                                    <label>Clave catastral</label>
                                    <br/>
                                    <input type="text" className="form-control" name="clave_catastral" id="clave_catastral" onChange={handleChange} value={predioSeleccionado && predioSeleccionado.clavecatastral}/>
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
        
        
           
        </div>


    );

}

export default App;