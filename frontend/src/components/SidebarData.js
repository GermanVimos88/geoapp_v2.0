import React from 'react'
import './Navbar.css';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";


export const SidebarData = [
    {
        title: 'Inicio',
        path: '/menu',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Propietario',
        path:  '/categorias/propietario',
        icon: <FaIcons.FaUserCheck/>,
        cName: 'nav-text'
    },
    {
        title: 'Ubicacion',
        path:  '/categorias/ubicacion',
        icon: <AiIcons.AiOutlineEnvironment />,
        cName: 'nav-text'
    },
    {
        title: 'Infraestructura',
        path:  '/categorias/infraestructura',
        icon: <IoIcons.IoIosConstruct />,
        cName: 'nav-text'
    },
    {
        title: 'Características del Lote',
        path:  '/categorias/caracteristicas',
        icon: <FaIcons.FaRulerCombined />,
        cName: 'nav-text'
    },
    {
        title: 'Obras Complementarias',
        path:  '/categorias/obras',
        icon: <FaIcons.FaSnowplow />,
        cName: 'nav-text'
    },
    
    {
        title: 'Construcción',
        path:  '/categorias/construccion',
        icon: <FaIcons.FaRegBuilding />,
        cName: 'nav-text'
    },
    {
        title: 'Estatus Legal',
        path:  '/categorias/estatus',
        icon: <FaIcons.FaBalanceScale />,
        cName: 'nav-text'
    },
    {
        title: 'Gráfico',
        path:  '/categorias/grafico',
        icon: <FaIcons.FaRegImage />,
        cName: 'nav-text'
    },
    {
        title: 'Investigación',
        path:  '/categorias/investigacion',
        icon: <FaIcons.FaSearch />,
        cName: 'nav-text'
    },
    /* {
        title: 'Opciones de Uso',
        path:  '/categorias/opciones',
        icon: <IoIcons.IoIosSwitch />,
        cName: 'nav-text'
    }, */
    {
        title: 'Uso del Predio',
        path:  '/categorias/uso',
        icon: <FaIcons.FaTasks />,
        cName: 'nav-text'
    },
    {
        title: 'Menu',
        path: '/app',
        icon: <IoIcons.IoMdReturnLeft />,
        cName: 'nav-text'
    },
       
]


      
      
      
      
      
      
      
     