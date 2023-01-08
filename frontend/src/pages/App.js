import React, {useState, useEffect, Component} from 'react';
import { BrowserRouter as UseParams } from 'react-router-dom';
//import logo from './logo.svg';
import '../css/App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faEdit, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
//import RoutesCategorias from '../routes/CategoriasRoutes';
//import Navbar from '../components/Navbar';
//import { render } from '@testing-library/react';

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
        
        //RoutesCategorias(clave);        
        //window.location.href='./categorias?id='+id+'&clave='+clave;//+predioSeleccionado.idpredio;
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
        
        //const axios = require('axios');
        //var f = new FormData();

        //f.append("idpredio",predioSeleccionado.idpredio);
        //f.append("idpropietario",predioSeleccionado.idpropietario);
        //f.append("identificacion",predioSeleccionado.identificacion);
        //f.append("tipo",predioSeleccionado.tipo);
        //f.append("clavecatastral",predioSeleccionado.clave_catastral);        
        //f.append("regimen",predioSeleccionado.regimen);
        //f.append("bloque",predioSeleccionado.bloque);
        //f.append("piso",predioSeleccionado.piso);
        //f.append("unidad",predioSeleccionado.unidad);
        //f.append("numero",predioSeleccionado.numero);
        
        
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
        
        //const axios = require('axios');
        //var f = new FormData();

        //f.append("idpredio",predioSeleccionado.idpredio);
        //f.append("idpropietario",predioSeleccionado.idpropietario);
        //f.append("identificacion",predioSeleccionado.identificacion);
        //f.append("tipo",predioSeleccionado.tipo);
        //f.append("clavecatastral",predioSeleccionado.clave_catastral);        
        //f.append("regimen",predioSeleccionado.regimen);
        //f.append("bloque",predioSeleccionado.bloque);
        //f.append("piso",predioSeleccionado.piso);
        //f.append("unidad",predioSeleccionado.unidad);
        //f.append("numero",predioSeleccionado.numero);
        
        
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










/*
const baseUrl='http://localhost:3001/usuarios'; //Modificar segun el path correspondiente
const [data, setData]=useState([]);
const [modalInsertar, setModalInsertar]= useState(false);
const [modalEditar, setModalEditar]= useState(false);
const [modalEliminar, setModalEliminar]= useState(false);
const [tablaSeleccionada, setTablaSeleccionada]= useState({
    id: '',
    nombre: '',
    username: '',
    password: ''

});

const handleChange=e=>{
    const{name, value}=e.target;
    settablaSeleccionada((prevState)=>({
        ...prevState,
        [name]: value
    }))
    console.log(tablaSeleccionada);
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

const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
        setData(response.data);
    }).catch(error=>{
        console.log(error.message);
    })
}

const peticionPost=async()=>{
    var f = new FormData();
    f.append("nombre", tablaSeleccionada.nombre);
    f.append("apellido", tablaSeleccionada.apellido);
    f.append("predio", tablaSeleccionada.predio);
    f.append("METHOD", "POST");
    await axios.post(baseUrl, f)
    .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
    }).catch(error=>{
        console.log(error);
    })
} 

const peticionPut=async()=>{
    var f = new FormData();
    f.append("nombre", tablaSeleccionada.nombre);
    f.append("apellido", tablaSeleccionada.apellido);
    f.append("predio", tablaSeleccionada.predio);
    await axios.post(baseUrl, f, {params: {id: tablaSeleccionada.id}})
    .then(response=>{
        var dataNueva = data;
        dataNueva.map(tabla=>{
            if(tabla.id===tablaSeleccionada.id){
                tabla.nombre=tablaSeleccionada.nombre;
                tabla.apellido=tablaSeleccionada.apellido;
                tabla.predio=tablaSeleccionada.predio;
            }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
    }).catch(error=>{
        console.log(error);
    }) 
}

    const peticionDelete=async()=>{
        var f = new FormData();
        f.append("METHOD", "DELETE");
        await axios.post(baseUrl, f, {params: {id: tablaSeleccionada.id}})
        .then(response=>{
            setData(data.filter(tabla=>tabla.id!==tablaSeleccionada.id));
            abrirCerrarModalEliminar();
        }).catch(error=>{
            console.log(error);
        })

    }

    const seleccionarTabla=(tabla, caso)=>{
        setTablaSeleccionada(tabla);

        (caso==='Editar')?
        abrirCerrarModalEditar():
        abrirCerrarModalEliminar()
    }

    useEffect(()=>{
        peticionGet();
    },[])

                   
   
        componentDidMount(){

            


        }

 */

        /*
        componentDidMount() {
            this.peticionGet();

        }
        
        */


        /*



        render(){
            const {form}=this.state;        
        return (
            <div className="App">
                <br/>
                <button className="btn btn-success" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}> Agregar Predio</button>
                <br/>
                <br/>
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID Propietario</th>
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
                        {this.state.data.map(predio=>{
                            return(
                                <tr>
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
                                        <button className="btn btn-primary" onClick={()=>{this.seleccionarPredio(predio); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                        {"  "}
                                        <button className="btn btn-danger" onClick={()=>{this.seleccionarPredio(predio); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                    </td>
                                </tr>
                            )
                        })}
                        
                    </tbody>                    
                </table>



                <Modal isOpen={this.state.modalInsertar} >
                        <ModalHeader style={{display: 'block'}}>
                                <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="id">ID predio: </label>
                                    <br/>
                                    <input type="text" className="form-control" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id: this.state.data.length+1}/>
                                    <br/>
                                    <label>ID propietario</label>
                                    <br/>   
                                    <input type="text" className="form-control" name="idpropietario" id="idpropietario" onChange={this.handleChange} value={form?form.idpropietario: ''}/>
                                    <br/> 
                                    <label>Cédula</label>
                                    <br/>
                                    <input type="text" className="form-control" name="cedula" id="cedula" onChange={this.handleChange} value={form?form.cedula: ''}/>
                                    <br/>
                                    <label>Tipo</label>
                                    <br/>
                                    <input type="text" className="form-control" name="tipo" id="tipo" onChange={this.handleChange} value={form?form.tipo: ''}/>
                                    <br/> 
                                    <label>Clave catastral</label>
                                    <br/>
                                    <input type="text" className="form-control" name="clavecatastral" id="clavecatastral" onChange={this.handleChange} value={form?form.clave_catastral: ''}/>
                                    <br/> 
                                    <label>Régimen</label>
                                    <br/>
                                    <input type="text" className="form-control" name="regimen" id="regimen" onChange={this.handleChange} value={form?form.regimen: ''}/>
                                    <br/> 
                                    <label>Bloque</label>
                                    <br/>
                                    <input type="text" className="form-control" name="bloque" id="bloque" onChange={this.handleChange} value={form?form.bloque: ''}/>
                                    <br/>  
                                    <label>Unidad</label>
                                    <br/>
                                    <input type="text" className="form-control" name="unidad" id="unidad" onChange={this.handleChange} value={form?form.unidad: ''}/>
                                    <br/>  
                                    <label>Piso</label>
                                    <br/>
                                    <input type="text" className="form-control" name="piso" id="piso" onChange={this.handleChange} value={form?form.piso: ''}/>
                                    <br/>  
                                    
                                </div>
                </ModalBody>
                <ModalFooter>
                    {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                        Insertar
                    </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                        Actualizar
                    </button>
                    }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>                   
                    
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalEliminar}>
                <ModalBody>
                    Estás seguro que deseas eliminar al predio {form && form.clave_catastral}
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
                    <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
                </ModalFooter>
            </Modal>

            </div>     
            
        
        );
    }    
}

export default App;


*/



    /*
            <div style={{textAlign: 'center'}}>            
            <br/>
            <button className="btn btn success" onClick={()=>abrirCerrarModalInsertar()}>Insertar</button>
            <br/> <br/>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Predio</th>   
                        <th>ACCIONES</th>   
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map(tabla=>(
                        <tr key={tabla.id}>
                            <td>{tabla.id}</td>
                            <td>{tabla.nombre} </td>
                            <td>{tabla.apellido} </td>
                            <td>{tabla.predio} </td>
                        <td>
                        <button className="btn btn-primary" onClick={()=>seleccionarTabla(tabla, "Editar")}>Editar</button> {" "}
                        <button className="btn btn-danger" onClick={()=>seleccionarTabla(tabla, "Eliminar")}>Eliminar</button>
                        </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <Modal isOpen={modalInsertar}>
                <ModalHeader>Insertar Tabla</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <br/>
                        <input type="text" className="form-control" name="nombre" onChange={handleChange}/>
                        <br/>
                        <label>Apellido</label>
                        <br/>
                        <input type="text" className="form-control" name="apellido" onChange={handleChange}/>
                        <br/> 
                        <label>Predio</label>
                        <br/>
                        <input type="text" className="form-control" name="predio" onChange={handleChange}/>
                        <br/> 

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>peticionPost()}>Insertar</button>{"  "}
                    <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Tabla</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nombre: </label>
                        <br/>
                        <input type="text" className="form-control" name="nombre" onChange={handleChange} value={tablaSeleccionada && tablaSeleccionada.nombre}/>
                        <br/>
                        <label>Apellido</label>
                        <br/>
                        <input type="text" className="form-control" name="apellido" onChange={handleChange} value={tablaSeleccionada && tablaSeleccionada.apellido}/>
                        <br/> 
                        <label>Predio</label>
                        <br/>
                        <input type="text" className="form-control" name="predio" onChange={handleChange} value={tablaSeleccionada && tablaSeleccionada.predio}/>
                        <br/> 

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={()=>peticionPut()}>Editar</button>{"  "}
                    <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro de eliminar este registro {tablaSeleccionada && tablaSeleccionada.nombre}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>peticionDelete()}>
                        Si
                    </button>
                    <button className="btn btn-secondary" onClick={()=>abrirCerrarModalEliminar()}>
                        No
                    </button>
                </ModalFooter>            
            </Modal>

            </div>
        */






            // App PROTOTIPO

            /*

//const url="http://127.0.0.1/apiCatastro/public/predios";

const url = "http://apicatastro/datos/predios";
const actualizar = "http://apicatastro/datos/predios/actualizar?";
class App extends Component {
    state={
        data:[],
        modalInsertar: false,
        modalEliminar: false,
        form:{
            id: '',
            idpropietario: '',
            cedula: '',
            tipo: '',
            clave_catastral: '',
            regimen: '',
            bloque: '',
            unidad: '',
            piso: '',
            tipoModal: ''
        }
    }

    peticionGet=()=>{
        axios.get(url).then(response=>{
            this.setState({data: response.data});
        }).catch(error=>{
            console.log(error.message);
        })
    }
    
    peticionPost=async()=>{
        delete this.state.form.id;        
        await axios.post(url, this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();
        }).catch(error=>{
            console.log(error.message);
        })
    } 
    
    peticionPut=()=>{        
        axios.put(actualizar+this.state.form.id, this.state.form).then(response=>{
            this.modalInsertar();
            this.peticionGet();           
                })        
    }
    
    peticionDelete=async()=>{
        axios.delete(url+this.state.form.id).then(response=>{
            this.setState({modalEliminar: false});
            this.peticionGet();
        })    
        }
    
    modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
    }

    seleccionarPredio=(predio)=>{
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: predio.idpredio,
                idpropietario: predio.idpropietario,
                cedula: predio.identificacion,
                tipo: predio.tipo,
                clave_catastral: predio.clavecatastral,
                regimen: predio.regimen,
                bloque: predio.bloque,
                unidad: predio.unidad,
                piso: predio.piso 
            }
        })
    }

    handleChange=async e=>{
        e.persist();
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value                
            }
        });
        console.log(this.state.form);
    }

    componentDidMount() {
        this.peticionGet();
    }


*/
