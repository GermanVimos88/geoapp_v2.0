import React from 'react';
import '../css/App.css';
import Login from '../pages/Login';
import Menu from '../pages/Menu';
//import Navbar from '../components/Navbar';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import App from '../pages/App';
import RoutesCategorias from './CategoriasRoutes';
import Cookies from 'universal-cookie';
import Registro from '../pages/Registro';


const cookies = new Cookies();

export default function Routes() {   
        
  return (    
       
       <Router>    
         
         <Switch>

           <Route exact path="/mapas" render={()=>{window.location.href="http://127.0.0.1:5500/index.html"}} /*"https://glowing-nasturtium-172aa3.netlify.app/"/*"http://f0783168.xsph.ru/visor/index.html"*/ />   

           <Route path="/categorias" component={RoutesCategorias} >                          
           </Route>           
           
           <Route exact path="/menu" component={Menu} />
           <Route exact path="/registro" component={Registro} />
           <Route exact path="/app" component={App} />        
           <Route exact path="/" component={Login} />
           
           <Route exact path="/404">
           <h1>
                404 Página no encontrada
              </h1>
           </Route>  
           <Route path="*">
              <Redirect to="/404" />
           </Route>           

         </Switch>           

       </Router>    
  
  );

}


 
 