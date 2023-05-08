import React, {useState, useEffect, Component} from 'react';
import { useLocation } from 'react-router-dom';
import '../css/App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faEdit, faTrashAlt, faSearch, faLaptopHouse, faReply, faPlus, faIdCard, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../img/logocuyuja.png';
//import Chart from "chart.js/auto";
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import Cookies from 'universal-cookie';

//ChartJS.register(ArcElement, Tooltip, Legend);

const cookies = new Cookies();

function searchingTerm(term) {
    return function(x) {
        return x.identificacion?.includes(term) || !term;
    }
}

const Propietario = () =>{

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

    const baseUrl='http://localhost/apicatastro/index.php/propietarios/';//?id='+id; //'http://f0783168.xsph.ru/index.php/propietarios/?id='+id;       
    const urlInsertar = 'http://localhost/apicatastro/index.php/propietarios/nuevo';
    const [predio, cambiarPredio] = useState({campo: '', valido: null});
    
    const [data, setData]=useState([]);
    
    const [cedula, cambiarCedula] = useState({campo: '', valido: null}); // Input
    const [tipo, cambiarTipo] = useState({campo: '', valido: null}); // Select
    const [primer_apellido, cambiarPrimerApellido] = useState({campo: '', valido: null}); //Input
    const [segundo_apellido, cambiarSegundoApellido] = useState({campo: '', valido: null});// Input
    const [primer_nombre, cambiarPrimerNombre] = useState({campo: '', valido: null});// Input
    const [segundo_nombre, cambiarSegundoNombre] = useState({campo: '', valido: null});// Input
    const [tipo_documento, cambiarTipoDocumento] = useState({campo: '', valido: null}); //Select
    const [estado_civil, cambiarEstadoCivil] = useState({campo: '', valido: null}); // Select
    const [porcentaje_prt, cambiarPorcentajePrt] = useState({campo: '', valido: null}); // Input number entero 0-100
    const [representante, cambiarRepresentante] = useState({campo: '', valido: null}); //Select
    const [anio_nacimiento, cambiarAnioNacimiento] = useState({campo: '', valido: null});// Select
    const [mes_nacimiento, cambiarMesNacimiento] = useState({campo: '', valido: null});// Select
    const [dia_nacimiento, cambiarDiaNacimiento] = useState({campo: '', valido: null});//Select
    const [nacionalidad, cambiarNacionalidad] = useState({campo: '', valido: null});// Input
    const [email, cambiarEmail] = useState({campo: '', valido: null});// Input email validacion
    const [telefono, cambiarTelefono] = useState({campo: '', valido: null});// Input solo numerico enteros positivos
    const [ciudad_domicilio, cambiarCiudadDomicilio] = useState({campo: '', valido: null}); // // Input
    const [dir_domicilio, cambiarDirDomicilio] = useState({campo: '', valido: null}); // Input
    const [jefe_hogar, cambiarJefeHogar] = useState({campo: '', valido: null}); //Select Si/NO 
    const [personeria, cambiarPersoneria] = useState({campo: '', valido: null}); // Select 
    const [ruc, cambiarRuc] = useState({campo: '', valido: null}); // Input numerico solo enteros positivos 10 digitos
    const [razon_social, cambiarRazonSocial] = useState({campo: '', valido: null});//Input
    
    const [inscrito, cambiarInscrito] = useState({campo: '', valido: null}); //Select (ministerio, superintendencia)
    const [lugarInscripcion, cambiarLugarInscripcion] = useState({campo: '', valido: null}); //Input
    const [representante_legal, cambiarRepLegal] = useState({campo: '', valido: null}); //Input nombres
    const [docRepresentante, cambiarDocRepresentante] = useState({campo: '', valido: null});
    const [idRepresentante, cambiarIDRepresentante] = useState({campo: '', valido: null});
    const [emailRepresentante, cambiarEmailRepresentante] = useState({campo: '', valido: null});
    const [telefonoRepresentante, cambiarTelefonoRepresentante] = useState({campo: '', valido: null});

    const [acuerdo, cambiarAcuerdo] = useState({campo: '', valido: null});  // Input
    
    const [conyugue, cambiarConyugue] = useState({campo: '', valido: null}); // Select Si-No (habilita text datos conyugue)
    const [apellidos_conyugue, cambiarApellidosConyugue] = useState({campo: '', valido: null}); // Input
    const [nombres_conyugue, cambiarNombresConyugue] = useState({campo: '', valido: null}); //Input
    const [doc_conyugue, cambiarDocConyugue] = useState({campo: '', valido: null}); //Select
    const [id_conyugue, cambiarIdConyugue] = useState({campo: '', valido: null}); // Input
    const [telefono_conyugue, cambiarTelefonoConyugue] = useState({campo: '', valido: null}); //Input
    const [porcentaje_conyugue, cambiarPorcentajeConyugue] = useState({campo: '', valido: null}); //Input number entero positivo 0-100
    const [email_conyugue, cambiarEmailConyugue] = useState({campo: '', valido: null}); // Input email validacion
    
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    const [busqueda, setBusqueda] = useState({campo: ''});
    const [propietarioSeleccionado, setPropietarioSeleccionado]=useState({
        id: '',
        idpropietario: '',          //variables con nombre iguales a los inputs de los modal
        identificacion: '',
        tipo: '',
        primer_apellido: '',
        segundo_apellido: '',
        primer_nombre: '',
        segundo_nombre: '',
        documento_tipo: '',
        estado_civil:'',
        porcentaje_participacion:'',
        representante:'',
        anio_nacimiento:'',
        mes_nacimiento:'',
        dia_nacimiento:'',
        nacionalidad:'',
        email:'',
        telefono:'',
        ciudad_domicilio:'',
        direccion_domicilio:'',
        jefe_hogar:'',
        p_juridica:'',
        ruc:'',
        razon_social:'',
        inscrito:'',
        lugar_inscripcion:'',
        acuerdo_reg:'',
        representante_legal:'',
        doc_representante:'',
        idrepresentante:'',
        email_representante:'',
        telf_representante:'',
        conyugue:'',
        conyugue_apellidos:'',
        conyugue_nombres:'',
        conyugue_doc:'',
        conyugueid:'',
        conyugue_telf:'',
        conyugue_participacion:'',
        conyugue_email:''        
    })


    const expresiones = {
		usuario: /^[a-zA-Z0-9_-]{1,40}$/, // Letras, numeros, guion y guion_bajo
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		password: /^.{4,12}$/, // 4 a 12 digitos.
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    cedula: /^\d{10}$/, // 10 numeros.
    ruc: /^\d{10,13}$/ // 10 a 13 numeros.
	}

    const handleChange=e=>{
        const {name, value}=e.target;
        setPropietarioSeleccionado((prevState)=>({
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


    const menu=()=>{
        
        //Retorno al listado de predios registrados        
        window.location.href='./app';
    }
    
    const nuevoFormulario=()=>{
        setPropietarioSeleccionado({
            //id: '',
            
            idpropietario: '',          
            identificacion: '',
            tipo: '',
            primer_apellido: '',
            segundo_apellido: '',
            primer_nombre: '',
            segundo_nombre: '',
            documento_tipo: '',
            estado_civil:'',
            porcentaje_participacion:'',
            representante:'',
            anio_nacimiento:'',
            mes_nacimiento:'',
            dia_nacimiento:'',
            nacionalidad:'',
            email:'',
            telefono:'',
            ciudad_domicilio:'',
            direccion_domicilio:'',
            jefe_hogar:'',
            p_juridica:'',
            ruc:'',
            razon_social:'',
            inscrito:'',
            lugar_inscripcion:'',
            acuerdo_reg:'',
            representante_legal:'',
            doc_representante:'',
            idrepresentante:'',
            email_representante:'',
            telf_representante:'',
            conyugue:'',
            conyugue_apellidos:'',
            conyugue_nombres:'',
            conyugue_doc:'',
            conyugueid:'',
            conyugue_telf:'',
            conyugue_participacion:'',
            conyugue_email:''        
            })        
        }

    const peticionGet=async()=>{        
            const response = await axios.get(baseUrl) 
            setData(response.data);
            //console.log(data)
    }




const postPropietario=async()=>{
    await axios.post(urlInsertar,propietarioSeleccionado)
    .then(response=>{
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        peticionGet();
    }).catch(error=>{
        console.error(error);
    });
}

const putPropietario=async()=>{        
    await axios.put('http://localhost/apicatastro/index.php/propietarios/actualizar/?id='+propietarioSeleccionado.idpropietario, propietarioSeleccionado)    /*'http://f0783168.xsph.ru/index.php/predios/actualizar?id='*/
    .then(response=>{
        var dataNueva=data;
        dataNueva.map(prop=>{
            if(prop.idpropietario===propietarioSeleccionado.idpropietario){
                //prop.idpropietario=propietarioSeleccionado.idpropietario;
                prop.identificacion=propietarioSeleccionado.identificacion;
                prop.tipo=propietarioSeleccionado.tipo;
                prop.primer_apellido=propietarioSeleccionado.primer_apellido;
                prop.segundo_apellido=propietarioSeleccionado.segundo_apellido;
                prop.primer_nombre=propietarioSeleccionado.primer_nombre;
                prop.segundo_nombre=propietarioSeleccionado.segundo_nombre;
                prop.razon_social=propietarioSeleccionado.razon_social;
                prop.representante_legal=propietarioSeleccionado.representante_legal;
                prop.idrepresentante=propietarioSeleccionado.idrepresentante;
                //predio.clavecatastral=predioSeleccionado.clavecatastral;
                //predio.regimen=predioSeleccionado.regimen;
                //predio.bloque=predioSeleccionado.bloque;
                //predio.unidad=predioSeleccionado.unidad;
                //predio.piso=predioSeleccionado.piso;       

            }

        })
        setData(dataNueva);
        abrirCerrarModalEditar();
        peticionGet();
    }).catch(error=>{
        console.error(error);
    });
}


const deletePropietario=async()=>{
    await axios.delete('http://localhost/apicatastro/index.php/propietarios/eliminar/?id='+propietarioSeleccionado.idpropietario) /*'http://f0783168.xsph.ru/index.php/predios/eliminar?id='*/
    .then(response=>{
        setData(data.filter(prop=>prop.idpropietario!==propietarioSeleccionado.idpropietario))
        abrirCerrarModalEliminar();
        peticionGet();
    })

}


const seleccionarPropietario=(propietario, caso)=>{
    setPropietarioSeleccionado(propietario);                
    
    switch(caso){

        case "Editar":  abrirCerrarModalEditar();
                        break;  
        case "Eliminar":  abrirCerrarModalEliminar();
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
        //getPropietarios();
        peticionGet();
    }            
},[setData])


    return(
        <div style={{textAlign: 'center'}}> 
                
                <img src={logo} alt="" style={{marginLeft:'4rem', marginTop:'-1rem', width:'70px', height:'90px', float: 'left'}} />
                <h6 style={{ float: 'right', marginRight:'3rem', marginTop:'1rem'}}><ul><a onClick={()=>cerrarSesion()} title='Cerrar sesión'> <FontAwesomeIcon icon={faUserCircle} size={'lg'} /> {cookies.get('username')} </a></ul>  </h6>                     
                <h3 style={{color:'#20d757', marginLeft: '3rem', marginTop:'2rem' }} >Propietarios registrados <FontAwesomeIcon icon={faIdCard}/></h3>                 
                <br/>                                
                <hr/>
                <button className="btn btn-success btn-sm" style={{ float: 'right', borderRadius:'22px', marginRight: '3rem'}} onClick={()=>abrirCerrarModalInsertar()} >Nuevo propietario <FontAwesomeIcon icon={faPlus}/></button>                                
                <button className="btn btn-outline-secondary btn-sm" style={{ float: 'right', borderRadius:'22px', marginRight: '3rem' }} onClick={()=>menu()}>Predios registrados <FontAwesomeIcon icon={faReply}/> </button>
                <div className='barraBusqueda' style={{ float:'left', marginLeft:'7rem' }}>
                    <label for="busqueda">
                    <input
                        type='text'
                        placeholder='Buscar por cédula'
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
                <div class="center-block fix-width scroll-inner" style={{float: 'right', scale: "100%", marginRight: '3rem'}}>
                <table className="table table-striped table-hover">
                    <thead style={{ position: 'sticky', top: 0 }}>
                        <tr>                            
                            <th><strong>ID Propietario</strong></th>                            
                            <th>Cédula</th>
                            <th>Tipo de propietario</th>
                            <th>Nombres y apellidos</th>                            
                            <th>Razón social</th>
                            <th>Representante legal</th>                                                    
                            <th>RUC representante</th> 
                            <th>ACCIONES</th>                                                   

                        </tr>
                    </thead>
                    <tbody>
                        {data.filter(searchingTerm(busqueda.campo)).map(propietario=>( //data?.map(propietario=>(
                            
                            <tr key={propietario.idpropietario}>
                            <td>{propietario.idpropietario} </td>
                            <td>{propietario.identificacion} </td>                                    
                            <td>{propietario.tipo}</td>                            
                            <td>{propietario.primer_apellido+' '+propietario.segundo_apellido+' '+propietario.primer_nombre+' '+propietario.segundo_nombre}</td>
                            <td>{propietario.razon_social}</td>
                            <td>{propietario.representante_legal}</td>
                            <td>{propietario.idrepresentante}</td>
                            <td>
                                        <button className="btn btn-primary btn-sm" style={{borderRadius:'22px'}} onClick={()=>seleccionarPropietario(propietario,"Editar")} >Editar <FontAwesomeIcon icon={faEdit}/></button>{"   "}                                        
                                        <button className="btn btn-danger btn-sm" style={{borderRadius:'22px'}} onClick={()=>seleccionarPropietario(propietario,"Eliminar")}>Eliminar <FontAwesomeIcon icon={faTrashAlt}/></button>{"   "}                                        
                                    </td>
                                </tr>                            
                        ))}
                        
                    </tbody>                    
                </table>  
                </div>
                <Modal isOpen={modalInsertar}>
                        <ModalHeader>Insertar nuevo propietario</ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                        <label for="tipo">Tipo de propietario:                               
                                        <select 
                                                class="form-select form-select-lg mb-3" 
                                                className="custom-select" 
                                                id="tipo" 
                                                name="tipo"
                                                
                                                onChange = {handleChange}
                                            >
                                              <option value="Natural">Natural</option>
                                              <option value="Jurídico">Jurídico</option>
                                              <option value="Posesionario">Posesionario</option>
                                            </select>
                                        </label>                                                        
                                    <br/> 
                                    <label for="primer_nombre" >Primer nombre
                                    <br/>
                                    <input type="text" className="form-control" name="primer_nombre" id="primer_nombre" onChange={handleChange} />
                                    </label>
                                    <label for="segundo_nombre" style={{float: 'right'}}>Segundo nombre
                                    <br/>
                                    <input type="text" className="form-control" name="segundo_nombre" id="segundo_nombre" onChange={handleChange} />
                                    </label>
                                    <br/>
                                    <label for="primer_apellido" >Primer apellido
                                    <br/>
                                    <input type="text" className="form-control" name="primer_apellido" id="primer_apellido" onChange={handleChange} />
                                    </label>
                                    
                                    <label for="segundo_apellido" style={{float: 'right'}}>Segundo apellido
                                    <br/>
                                    <input type="text" className="form-control" name="segundo_apellido" id="segundo_apellido" onChange={handleChange} />
                                    </label>
                                    <br/> 
                                    <label for="identificacion" >Cédula (*)
                                    <br/>
                                    <input type="text" className="form-control" name="identificacion" id="identificacion" onChange={handleChange} />
                                    </label>
                                                                        
                                    <label for="razon_social" style={{float: 'right'}}>Razón social
                                    <br/>
                                    <input type="text" className="form-control" name="razon_social" id="razon_social" onChange={handleChange} />
                                    </label>                                    
                                    <br/>  
                                    
                                    <label for="representante_legal" >Representante legal
                                    <br/>
                                    <input type="text" className="form-control" name="representante_legal" id="representante_legal" onChange={handleChange} />
                                    </label>
                                    
                                    <label for="idrepresentante" style={{float: 'right'}}>RUC representante
                                    <br/>
                                    <input type="text" className="form-control" name="idrepresentante" id="idrepresentante" onChange={handleChange} />
                                    </label>                                
                                </div>
                    </ModalBody>
                    <ModalFooter>
                        
                        <button className="btn btn-primary" onClick={()=>postPropietario()} >Insertar</button>{"  "}                         
                        <button className="btn btn-danger" onClick={()=>abrirCerrarModalInsertar()}>Cancelar</button>                   
                        
                    </ModalFooter>
                </Modal>


                <Modal isOpen={modalEditar}>
                        <ModalHeader>Editar propietario</ModalHeader>
                            <ModalBody>
                                <div className="form-group"> 
                                        <label for="tipo">Tipo de propietario:                               
                                        <select 
                                                class="form-select form-select-lg mb-3" 
                                                className="custom-select" 
                                                id="tipo" 
                                                name="tipo"
                                                value={propietarioSeleccionado && propietarioSeleccionado.tipo}
                                                onChange = {handleChange}
                                            >
                                              <option value="Natural">Natural</option>
                                              <option value="Jurídico">Jurídico</option>
                                              <option value="Posesionario">Posesionario</option>
                                            </select>
                                        </label>           
                                    <br/> 
                                    <label for="primer_nombre" >Primer nombre
                                    <br/>
                                    <input type="text" className="form-control" name="primer_nombre" id="primer_nombre" onChange={handleChange} value={propietarioSeleccionado && propietarioSeleccionado.primer_nombre}/>
                                    </label>
                                    
                                    <label for="segundo_nombre" style={{float: 'right'}}>Segundo nombre
                                    <br/>
                                    <input type="text" className="form-control" name="segundo_nombre" id="segundo_nombre" onChange={handleChange} value={propietarioSeleccionado && propietarioSeleccionado.segundo_nombre} />
                                    </label>
                                    <br/>  
                                    <label for="primer_apellido" >Primer apellido
                                    <br/>
                                    <input type="text" className="form-control" name="primer_apellido" id="primer_apellido" onChange={handleChange} value={propietarioSeleccionado && propietarioSeleccionado.primer_apellido} />
                                    </label>
                                    
                                    <label for="segundo_apellido" style={{float: 'right'}}>Segundo apellido
                                    <br/>
                                    <input type="text" className="form-control" name="segundo_apellido" id="segundo_apellido" onChange={handleChange} value={propietarioSeleccionado && propietarioSeleccionado.segundo_apellido}/>
                                    </label>
                                    <br/>  
                                    <label for="identificacion" >Cédula (*)
                                    <br/>
                                    <input type="text" className="form-control" name="identificacion" id="identificacion" onChange={handleChange} value={propietarioSeleccionado && propietarioSeleccionado.identificacion} />
                                    </label>
                                    
                                    <label for="razon_social" style={{float: 'right'}}>Razón social
                                    <br/>
                                    <input type="text" className="form-control" name="razon_social" id="razon_social" onChange={handleChange} value={propietarioSeleccionado && propietarioSeleccionado.razon_social}/>
                                    </label>
                                    <br/>  
                                    <label for="representante_legal" >Representante legal
                                    <br/>
                                    <input type="text" className="form-control" name="representante_legal" id="representante_legal" onChange={handleChange} value={propietarioSeleccionado && propietarioSeleccionado.representante_legal} />
                                    </label>
                                    
                                    <label for="idrepresentante" style={{float: 'right'}}>RUC representante
                                    <br/>
                                    <input type="text" className="form-control" name="idrepresentante" id="idrepresentante" onChange={handleChange} value={propietarioSeleccionado && propietarioSeleccionado.idrepresentante}/>
                                    </label>
                                                                    
                                </div>
                    </ModalBody>
                    <ModalFooter>
                        
                        <button className="btn btn-primary" onClick={()=>putPropietario()} >Editar</button>{"  "}                  
                        
                        <button className="btn btn-danger" onClick={()=>abrirCerrarModalEditar()}>Cancelar</button>                   
                        
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro de eliminar este propietario {propietarioSeleccionado && propietarioSeleccionado.idpropietario}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>deletePropietario()}>
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

export default Propietario;