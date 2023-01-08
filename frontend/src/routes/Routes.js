import React from 'react';
import '../css/App.css';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
//import Navbar from '../components/Navbar';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Reportes from '../pages/Reportes';
import Soporte from '../pages/Soporte';
import Mensajes from '../pages/Mensajes';
import App from '../pages/App';
import Home from '../pages/Home';
//import Infraestructura from '../pages/Infraestructura';
import RoutesCategorias from './CategoriasRoutes';
//import index from '../pages/mapas/index.html'


export default function Routes() {
   
        
  return (
    
        
    //<BrowserRouter>
    
       <Router>    

         
         <Switch>

                
           <Route exact path="/home" component={Home} />
           <Route path="/mensajes/" component={Mensajes} />
           <Route exact path="/reportes" component={Reportes} />
           <Route exact path="/soporte/:id" component={Soporte} />

           <Route exact path="/mapas" render={()=>{window.location.href="http://localhost:5500/"}} />
           

           <Route path="/categorias" component={RoutesCategorias} >
                          
           </Route>
           
           
           <Route exact path="/menu" component={Menu} />
           <Route exact path="/app" component={App} />        
           <Route exact path="/" component={Login} />
           
           <Route path="/404">
           <h1>
                404 Página no encontrada
              </h1>
           </Route>  
           <Route path="*">
              <Redirect to="/404" />
           </Route>           

         </Switch>           

       </Router>    
  
    //  </BrowserRouter>
  
  );

}


 
 