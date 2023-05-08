import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../css/App.css';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../img/logocuyuja.png';
import { faCogs, faMouse, faReply, faUserCircle } from '@fortawesome/free-solid-svg-icons';


const cookies = new Cookies();


function HomeCategorias() {
       
    const location = useLocation();  
    const path = location.pathname
    const host = window.location.origin;
    
    var id = ''
    var clave = ''
    var idPropietario = ''

    /* for (var i=0 ; i < path.length ; i++) {
        if(path.substring(i, i+1)==':' )
        {
        for (var j=i+2; j < path.length ; j++) {
            if(path.substring(j, j+1)==':' ) {
            id= path.substring(i+1, j)
            clave=path.substring(j+1, path.length)
            }
        }
        }
    } */
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

    //console.log(id)
    //console.log(clave)
    //console.log(idPropietario)
    //console.log(path)

    const menu=()=>{
        
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
    }
    
    useEffect(()=>{
    
        if(!cookies.get('username')){
            window.location.href=host;//"http://localhost:3000/";
        }
        if(cookies.get('username') && id==='' && clave===''){
            window.location.href='./menu'//'https://cheerful-marzipan-12e313.netlify.app/menu';
        }   
    },[])

    
    return (
        <div >
            {/* <h6 style={{ float: 'right', marginRight:'3rem', marginTop:'2rem'}}><ul><a onClick={()=>cerrarSesion()} title='Cerrar sesión'> <FontAwesomeIcon icon={faUserCircle} size={'lg'} /> {cookies.get('username')} </a></ul>  </h6>
            <h6 style={{ float: 'right', marginRight: '-4.5rem', marginTop:'5rem'}}><ul><a onClick={()=>menu()} title='Regresar a menú principal'> <FontAwesomeIcon icon={faReply} size={'lg'} /> Menú <br/> Principal </a></ul>  </h6> */}
            {/* <img src={logo} alt="" style={{ marginRight:'1.5rem', marginTop:'1rem', width:'70px', height:'85px', float: 'right'}} /> */}
            
            <div className='homecategorias'>
                <div class="card border-success mb-3" >
                <center>
                    
                    <div class="card-header">Categorías <FontAwesomeIcon icon={faCogs}/></div>
                    <div class="card-body text-success">
                        <h5 class="card-title">Acceso a todas las categorías de ficha catastral</h5>
                        <p class="card-text"> <FontAwesomeIcon icon={faMouse}/> Click en el boton de la parte superior izquierda para iniciar</p>                        
                    </div>

                </center>                
                </div>                
            </div>
        </div>
    );
}

export default HomeCategorias