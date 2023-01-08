import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();



class Menu extends Component {
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('primer_apellido', {path: "/"});
        cookies.remove('segundo_apellido', {path: "/"});
        cookies.remove('nombre', {path: "/"});
        cookies.remove('username', {path: "/"});
        window.location.href='./';
    }

    componentDidMount(){
        if(!cookies.get('username')){
            window.location.href="./";
        }
    }
    
    /* soporte=()=>{
        
        window.location.href='./soporte';
    } */

    mapas=()=>{
        window.location.href='./mapas'
    }

    predios=()=>{
        
        window.location.href='./app';
    }
    
    render() {
        
                
        return (
            
            <div className="menu">
                
                <center>
                <br/>
                <br/>                
                
                <div class="card border-info mb-1 " style={{maxWidth: '30rem', maxHeight: '28rem', borderWidth:5, borderRadius:'30px', padding:'23px', paddingBottom: '32rem', backgroundColor: '#dcf2ff' }}>                
                                    
                    <div class="card-header">Menú Principal</div>
                    
                    <div class="d-grid gap-2">                    
                    <br/>
                    <button className="btn btn-primary btn-lg" onClick={()=>this.predios()}>Predios</button>
                    <br/>                        
                    <button className="btn btn-success btn-lg" onClick={()=>this.mapas()}>Visor GIS</button>                    
                    </div>                    
                    <p>
                    <br/>
                    <h6>Usuario: {cookies.get('username')} </h6>                     
                    <button className='btn btn-outline-danger' style={{borderRadius:'22px'}} onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>                    
                    </p>                                                           
                
                </div>                
                </center>

            </div>
        );
    }
}

export default Menu;