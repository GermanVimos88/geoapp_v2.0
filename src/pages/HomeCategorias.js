import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../css/App.css';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


function HomeCategorias() {
   
    const location = useLocation();   


   

    

    return (
        <div >
            
            <div className='homecategorias'>
                <div class="card border-success mb-3" >
                <center>
                    
                    <div class="card-header">Categorías 📋 </div>
                    <div class="card-body text-success">
                        <h5 class="card-title">Acceso a todas las categorías de ficha catastral</h5>
                        <p class="card-text"> 🖱 Click en el boton de la parte superior izquierda para iniciar</p>                        
                    </div>

                </center>                
                </div>                
            </div>
        </div>
    );
}

export default HomeCategorias