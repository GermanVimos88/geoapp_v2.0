import React from 'react';
import Navbar from '../components/Navbar';
import {BrowserRouter as Router, Switch, Route, Redirect, useParams, useLocation} from 'react-router-dom';
import Infraestructura from '../pages/Infraestructura';
import Propietario from '../pages/Propietarios';
import Ubicacion from '../pages/Ubicacion';
import ObrasComplementarias from '../pages/ObrasComplementarias';
import CaracteristicasLote from '../pages/CaracteristicasLote';
import Construccion from '../pages/Construccion';
import EstatusLegal from '../pages/EstatusLegal';
import Grafico from '../pages/Grafico';
import InvestigacionPredial from '../pages/Investigacion';
import OpcionesUso from '../pages/OpcionesUso';
import UsoPredio from '../pages/UsoPredio';
import HomeCategorias from '../pages/HomeCategorias';


export default function RoutesCategorias() {
 
  // Receptar desde Router padre y enviar parámetros a los Routes Categories
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

  //console.log(idPredio)
  //console.log(idClave)

  const infraestructura = '/categorias/infraestructura/:'+idPredio+':'+idClave
  const propietario = '/categorias/propietario/:'+idPredio+':'+idClave
  const ubicacion = '/categorias/ubicacion/:'+idPredio+':'+idClave
  const obras = '/categorias/obras/:'+idPredio+':'+idClave
  const caracteristicas = '/categorias/caracteristicas/:'+idPredio+':'+idClave
  const construccion = '/categorias/construccion/:'+idPredio+':'+idClave
  const estatus = '/categorias/estatus/:'+idPredio+':'+idClave
  const grafico = '/categorias/grafico/:'+idPredio+':'+idClave
  const investigacion = '/categorias/investigacion/:'+idPredio+':'+idClave
  const opciones = '/categorias/opciones/:'+idPredio+':'+idClave
  const uso = '/categorias/uso/:'+idPredio+':'+idClave
  const home='/categorias/homecategorias/:'+idPredio+':'+idClave

    
    return(
  
    <div> 
      
    <Navbar/>
  
    <Switch>
  
      <Route path={home} component={HomeCategorias}  />

      <Route path={infraestructura} component={Infraestructura} />
          
  
      <Route exact path={propietario} component={Propietario} />
        
      
      <Route path={ubicacion} component={Ubicacion} />
        
      
      <Route exact path={obras} component={ObrasComplementarias} />
        
      
      <Route exact path={caracteristicas} component={CaracteristicasLote} />
        
      
      <Route exact path={construccion} component={Construccion} />
        
      
      <Route exact path={estatus} component={EstatusLegal} />
        
      
      <Route exact path={grafico} component={Grafico} />
        
      
      <Route exact path={investigacion} component={InvestigacionPredial} />
        
      
      <Route exact path={opciones} component={OpcionesUso} />
        
            
      <Route exact path={uso} component={UsoPredio} />
      
      
      <Route path="/categorias" > 
        <Redirect to={home} />
      </Route>
      
  
      <Route path="*">
        <Redirect to="/404" />
      </Route>
  
    </Switch>
  
    </div>
    
    );
  }