import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../css/App.css';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faMouse } from '@fortawesome/free-solid-svg-icons';


const cookies = new Cookies();


function HomeCategorias() {
       
    const location = useLocation();  
    const path = location.pathname
    const host = window.location.origin;
    
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
    
    useEffect(()=>{
    
        if(!cookies.get('username')){
            window.location.href=host;//"http://localhost:3000/";
        }
        if(cookies.get('username') && id==='' && clave===''){
            window.location.href='https://cheerful-marzipan-12e313.netlify.app/menu';
        }   
    },[])

    
    return (
        <div >
            
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