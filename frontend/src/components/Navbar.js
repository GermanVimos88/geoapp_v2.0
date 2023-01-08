import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
//import { IconText } from 'react-icons';
import { IconContext } from 'react-icons/lib';

var id_actual = 0;
var clave_actual = 0;

function Navbar() {

    
    const location = useLocation();
  
    const path = location.pathname

    var idPredio = ''
    var idClave = ''

    for (var i=0 ; i < path.length ; i++) {
    if(path.substring(i, i+1)==':' )
    {
        for (var j=i+2; j < path.length ; j++) {
        if(path.substring(j, j+1)==':' ) {
            idPredio= path.substring(i+1, j)
            idClave=path.substring(j+1, path.length)
        }
        }
    }
    }

        
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    

    return (
        <>
        <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar">
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar} />
                </Link>

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
                                    <NavLink to={item.path+'/:'+idPredio+':'+idClave}>
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