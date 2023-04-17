<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

include_once ("./controladores/controladorPredios.php");
include_once ("./controladores/controladorPropietarios.php");
include_once ("./controladores/controladorConstruccion.php");
include_once ("./controladores/controladorCaracteristicasLote.php");
include_once ("./controladores/controladorEstatusLegal.php");
include_once ("./controladores/controladorGrafico.php");
include_once ("./controladores/controladorInfraestructura.php");
include_once ("./controladores/controladorInvestigacion.php");
include_once ("./controladores/controladorObras.php");
include_once ("./controladores/controladorOpcionesUso.php");
include_once ("./controladores/controladorUbicacion.php");
include_once ("./controladores/controladorUsoPredio.php");
include_once ("./controladores/controladorUsuarios.php");
include_once ("./controladores/controladorPrediogeo.php");
include_once ("./controladores/controladorReportes.php");

//$host = $_SERVER["HTTP_HOST"];
$url= $_SERVER["REQUEST_URI"];
//$baseurl= "http://" . $host . $url;



list($raiz, $api, $directorio, $tabla, $operacion, $id) = array_pad(explode("/", $url),6,null);

//echo($api); ruta controlador en linux
//echo($tabla); ruta controlador con xampp windows
switch($_SERVER['REQUEST_METHOD']){

    case 'POST':        // SWITCH PARA POST        // $url=/predios/nuevo   ---->>no escribir apicatastro/predios/nuevo     
                        switch($tabla){    

                            case 'predios' :     
	                                                controladorPredio::postPredio();
                                                        break;
                                                
                                                
                            case 'propietarios' :       controladorPropietario::postPropietario();
                                                        
                                                        break;
                            
                            case 'ubicacion' :          controladorUbicacion::postUbicacion();
                                                        break;
                            
                            
                            case 'legal' :              controladorEstatusLegal::postEstatusLegal();                            
                                                        break;
                            
                            
                            case 'caracteristicas':     controladorCaracteristicasLote::postCaracteristicasLote();
                                                        break;
                            
                            
                            case 'uso':                controladorUsoPredio::postUsoPredio();
                                                        break;
                            
                            case 'opcionesuso':         controladorOpcionesUso::postOpcionesUso();
                                                        break;
                            
                            
                            
                            case 'infraestructura':     controladorInfraestructura::postInfraestructura();                            
                                                        break;            
                            
                            
                            case 'obras' :              controladorObras::postObras();                            
                                                        break;
                            
                            
                            case 'construccion' :       controladorConstruccion::postConstruccion();                            
                                                        break;
                            
                            
                            case 'grafico' :            controladorGrafico::postGrafico();
                                                        break;
                            
                            
                            case 'investigacion' :      controladorInvestigacion::postInvestigacion();
                                                        break;                           
                            
                            case 'usuarios' :           controladorUsuarios::postUsuario();
                                                        //echo("POST usuarios");        
                                                        break;
                            
                            case 'prediogeo':           controladorPrediogeo::postPrediogeo();
                                                        break;
                            
                            default:            
                                                        echo("Ruta de inserción errónea");        
                                                        break;
                    
                        }                            
                            
                        break;
                            


    case 'GET':         // SWITCH PARA GET     // $url=/predios/?id=5 , url=/predios/ (todos los registros)  ---->> apicatastro/predios/?id=5     
                        
                        switch($tabla){    

                            case 'predios' :            controladorPredio::getPredios();
                                                        break;            

                            case 'propietarios' :       controladorPropietario::getPropietarios();
                                                        break;
                            
                            case 'ubicacion' :          controladorUbicacion::getUbicacion();
                            
                                                        break;
                            
                            
                            case 'legal' :              controladorEstatusLegal::getEstatusLegal();
                                                        break;
                            
                            
                            case 'caracteristicas':     controladorCaracteristicasLote::getCaracteristicasLote();
                                                        break;
                            
                            
                            case 'uso':                 controladorUsoPredio::getUsoPredio();                           
                                                        break;
                            
                            case 'opcionesuso':         controladorOpcionesUso::getOpcionesUso();                            
                                                        break;
                            
                            
                            
                            case 'infraestructura':     controladorInfraestructura::getInfraestructura();
                                                        break;            
                            
                            
                            case 'obras' :              controladorObras::getObras();
                                                        break;
                            
                            
                            case 'construccion' :       controladorConstruccion::getConstruccion();
                                                        break;
                            
                            
                            case 'grafico' :            controladorGrafico::getGrafico();
                                                        break;
                            
                            
                            case 'investigacion' :      controladorInvestigacion::getInvestigacion();
                                                        break; 
                            
                            case 'usuarios' :           controladorUsuarios::getUsuario();
                                                        break;
                            
                            case 'prediogeo':           controladorPrediogeo::getPrediogeo();
                                                        break;
                            
                            case 'reportes':            controladorReportes::getReportes();
                                                        break;
                            
                            
                            default:                    //echo($tabla);
                                                        echo("Ruta de lectura errónea");                                                        
                                                        break;    


                        }          
                                    
                         
                        break;
                             
                         
    case 'PUT':         // SWITCH PARA PUT        // $url=/predios/actualizar?id=5   ---->> apicatastro/predios/actualizar?id=5     
                        switch($tabla){    

                            case 'predios' :            controladorPredio::putPredio();                                                        
                                                        break;
            

                            case 'propietarios' :       controladorPropietario::putPropietario();
                                                        break;
                            
                            case 'ubicacion' :    controladorUbicacion::putUbicacion();
                                                        break;
                            
                            
                            case 'legal' :              controladorEstatusLegal::putEstatusLegal();
                                                        break;
                            
                            
                            case 'caracteristicas':     controladorCaracteristicasLote::putCaracteristicasLote();
                                                        break;
                            
                            
                            case 'uso':                 controladorUsoPredio::putUsoPredio();                            
                                                        break;
                            
                            case 'opcionesuso':         controladorOpcionesUso::putOpcionesUso();                            
                                                        break;
                            
                            
                            
                            case 'infraestructura':     controladorInfraestructura::putInfraestructura();                            
                                                        break;            
                            
                            
                            case 'obras' :              controladorObras::putObras();                            
                                                        break;
                            
                            
                            case 'construccion' :       controladorConstruccion::putConstruccion();                            
                                                        break;
                            
                            
                            case 'grafico' :            controladorGrafico::putGrafico();                            
                                                        break;
                            
                            
                            case 'investigacion' :      controladorInvestigacion::putInvestigacion();                            
                                                        break;
                            
                            
                            case 'prediogeo':           controladorPrediogeo::putPrediogeo();
                                                        break;
                            
                            
                            default:                  echo("Ruta de actualización errónea");
                                                      break;

                        }    
                             
                            
                        break;                            


                            
    case 'DELETE':      // SWITCH PARA DELETE        // $url=/predios/eliminar?id=5   ---->> apicatastro/predios/eliminar?id=5     
                        switch($tabla){    

                            case 'predios' :            controladorPredio::deletePredio();
                                                        break;
                            
                            
                            case 'propietarios' :       controladorPropietario::deletePropietario();                            
                                                        break;
                            
                            case 'ubicacion' :          controladorUbicacion::deleteUbicacion();                            
                                                        break;
                            
                            
                            case 'legal' :              controladorEstatusLegal::deleteEstatusLegal();                            
                                                        break;
                            
                            
                            case 'caracteristicas':     controladorCaracteristicasLote::deleteCaracteristicasLote();                            
                                                        break;
                            
                            
                            case 'uso':                 controladorUsoPredio::deleteUsoPredio();
                                                        break;
                            
                            case 'opcionesuso':         controladorOpcionesUso::deleteOpcionesUso();                            
                                                        break;
                            
                            
                            
                            case 'infraestructura':     controladorInfraestructura::deleteInfraestructura();                            
                                                        break;            
                            
                            
                            case 'obras' :              controladorObras::deleteObras();
                                                        break;
                            
                            
                            case 'construccion' :       controladorConstruccion::deleteConstruccion();
                                                        break;
                            
                            
                            case 'grafico' :            controladorGrafico::deleteGrafico();
                                                        break;
                            
                            
                            case 'investigacion' :      controladorInvestigacion::deleteInvestigacion();
                                                        break; 
                                                        
                            
                            case 'prediogeo':          controladorPrediogeo::deletePrediogeo();
                                                        break;                            
                                                        
                            default:                    echo("Ruta de eliminacion errónea");  
                                                        break;

                        }   
                                   

                        break;                            

}



?>







