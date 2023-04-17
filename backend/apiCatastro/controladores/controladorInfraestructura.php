<?php 

include_once ("./src/infraestructura.php");

class controladorInfraestructura{

    
        //GET infraestructura del predio
        public static function getInfraestructura(){ 
        
        						  //Obtener infrestructura de predio
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            Infraestructura::verInfraestructura($_GET['id']);                         
                                                        
                                                        }else{
                                                            Infraestructura::todasInfraestructuras();                        
                                                        } 
                            
                            
	}

	// POST infraestructura del predio
	public function postInfraestructura(){    
 							//Guardar infraestructura nueva
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $infraestructura = json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Infraestructura(
                                                            $infraestructura->clave_predio,
                                                            $infraestructura->idubicacion,
                                                            $infraestructura->via_acceso,
                                                            $infraestructura->rodadura,
                                                            $infraestructura->vias_adicionales,
                                                            $infraestructura->agua_procedencia,
                                                            $infraestructura->medidor_agua,
                                                            $infraestructura->agua_recepcion,
                                                            $infraestructura->eliminacion_excretas,
                                                            $infraestructura->energia_electrica_procedencia,
                                                            $infraestructura->medidor,
                                                            $infraestructura->energia_electrica_recepcion,
                                                            $infraestructura->eliminacion_basura,
                                                            $infraestructura->telefono_convencional,
                                                            $infraestructura->celular,
                                                            $infraestructura->tv_cable,
                                                            $infraestructura->internet,
                                                            $infraestructura->metodo_riego,
                                                            $infraestructura->disponibilidad_riego,
                                                            $infraestructura->instalaciones_especiales,
                                                            $infraestructura->ascensor,
                                                            $infraestructura->circuito_cerrado_tv,
                                                            $infraestructura->montacarga,
                                                            $infraestructura->sistema_alterno_electricidad,
                                                            $infraestructura->aire_acondicionado,
                                                            $infraestructura->sistema_contra_incendios,
                                                            $infraestructura->gas_centralizado,
                                                            $infraestructura->ventilacion,
                                                            $infraestructura->sistema_voz_datos,
                                                            $infraestructura->alumbrado_publico,
                                                            $infraestructura->recoleccion_basura,
                                                            $infraestructura->transporte_urbano,
                                                            $infraestructura->aseo_calles,
                                                            $infraestructura->alcantarillado,
                                                            $infraestructura->aceras,
                                                            $infraestructura->bordillos
                                                            );                    
                                                        
                                                        $objeto->guardarInfraestructura();
                                                        $objeto = null;
   
	}


	// PUT infraestructura del predio por ID                                     
    
    	public function putInfraestructura(){
    						 	//Actualizar infraestructura del predio
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $infraestructura= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Infraestructura(
                                                            $infraestructura->clave_predio,
                                                            $infraestructura->idubicacion,
                                                            $infraestructura->via_acceso,
                                                            $infraestructura->rodadura,
                                                            $infraestructura->vias_adicionales,
                                                            $infraestructura->agua_procedencia,
                                                            $infraestructura->medidor_agua,
                                                            $infraestructura->agua_recepcion,
                                                            $infraestructura->eliminacion_excretas,
                                                            $infraestructura->energia_electrica_procedencia,
                                                            $infraestructura->medidor,
                                                            $infraestructura->energia_electrica_recepcion,
                                                            $infraestructura->eliminacion_basura,
                                                            $infraestructura->telefono_convencional,
                                                            $infraestructura->celular,
                                                            $infraestructura->tv_cable,
                                                            $infraestructura->internet,
                                                            $infraestructura->metodo_riego,
                                                            $infraestructura->disponibilidad_riego,
                                                            $infraestructura->instalaciones_especiales,
                                                            $infraestructura->ascensor,
                                                            $infraestructura->circuito_cerrado_tv,
                                                            $infraestructura->montacarga,
                                                            $infraestructura->sistema_alterno_electricidad,
                                                            $infraestructura->aire_acondicionado,
                                                            $infraestructura->sistema_contra_incendios,
                                                            $infraestructura->gas_centralizado,
                                                            $infraestructura->ventilacion,
                                                            $infraestructura->sistema_voz_datos,
                                                            $infraestructura->alumbrado_publico,
                                                            $infraestructura->recoleccion_basura,
                                                            $infraestructura->transporte_urbano,
                                                            $infraestructura->aseo_calles,
                                                            $infraestructura->alcantarillado,
                                                            $infraestructura->aceras,
                                                            $infraestructura->bordillos
                                                            );                    
                                                        $objeto->actualizarInfraestructura($_GET['id']);
                                                        $objeto = null; 
	}


	// DELETE infraestructura del predio por ID
	public static function deleteInfraestructura() {
                                                        //Eliminar infraestructura del predio
                                                        Infraestructura::eliminarInfraestructura($_GET['id']); 
	}

}










