import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import logo from '../img/logocuyuja.png';
//import { IconText } from 'react-icons';
import { IconContext } from 'react-icons/lib';
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const cookies = new Cookies();

var id_actual = 0;
var clave_actual = 0;

function Navbar() {

    
    const location = useLocation();
  
    const path = location.pathname

    var idPredio = ''
    var idClave = ''
    var idPropietario = ''

    /* for (var i=0 ; i < path.length ; i++) {
    if(path.substring(i, i+1)==':' )
    {
        for (var j=i+2; j < path.length ; j++) {
        if(path.substring(j, j+1)==':' ) {
            idPredio= path.substring(i+1, j)
            idClave=path.substring(j+1, path.length)
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
                    idPredio= path.substring(i+1, j)
                    idClave=path.substring(j+1, k)              
                    idPropietario=path.substring(k+1, path.length)                    
                }
              }          
            }
          }
        }
      }

        
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

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
    

    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar">            
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>
                
                <div style={{float: 'right'}} >
                    <img src={logo} alt=""  style={{marginLeft:'2rem', marginRight:'1rem', marginTop:'-0.5rem', width:'70px', height:'85px', float: 'right'}} />
                    <label style={{ float: 'right', marginLeft:'2rem', marginRight:'1rem', marginTop:'1rem', color:'#ffffff' }}><ul><a onClick={()=>cerrarSesion()} title='Cerrar sesión'> <FontAwesomeIcon icon={faUserCircle} size={'lg'} color={'#ffffff'} /> {cookies.get('username')} </a></ul>  </label>                
                    <label style={{ float: 'right', marginLeft:'1rem', marginRight:'1rem', marginTop:'0.4rem', marginBottom:'-0.5rem', color:'#ffffff' }}><ul><a onClick={()=>menu()} title='Regresar a menú principal'> <FontAwesomeIcon icon={faReply} size={'lg'} color={'#ffffff'} /> Menú <br/> Principal </a></ul>  </label>
                </div>
                
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>                
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {                       
                        if (item.path=="/menu"|| item.path=="/app" ){ //|| item.path=="/infraestructura" ){
                            return (
                                <li key={index} className={item.cName}>
                                    <NavLink to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </NavLink>
                                </li>
                            );
                        }
                        else{
                            
                        
                        return (
                                <li key={index} className={item.cName}>
                                    <NavLink to={item.path+'/:'+idPredio+':'+idClave+':'+idPropietario}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </NavLink>
                                </li>
                            );
                        }

                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        </>
    );
}

export default Navbar;