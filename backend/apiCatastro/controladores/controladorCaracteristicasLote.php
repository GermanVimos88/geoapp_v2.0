<?php 

include_once ("../src/caracteristicas.php");

class controladorCaracteristicasLote{

    
        //GET caracteristicas lote
        public static function getCaracteristicasLote(){ 
        
        						  //Obtener caracteristicas del lote
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            Caracteristicas::verCaracteristicas($_GET['id']);                         
                                                        
                                                        }else{
                                                            Caracteristicas::todasCaracteristicas();                        
                                                        }       
	}

	// POST caracteristicas del lote
	public function postCaracteristicasLote(){    
 							//Guardar caracteristicas lote nuevo
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $caracteristicas= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     
                                                    
                                                        $objeto = new Caracteristicas(
                                                            $caracteristicas->clave_predio,
                                                            $caracteristicas->idubicacion,
                                                            $caracteristicas->ocupacion,
                                                            $caracteristicas->manzana_locacion,
                                                            $caracteristicas->forma,
                                                            $caracteristicas->topografia,
                                                            $caracteristicas->cobertura_nativa,
                                                            $caracteristicas->ecosistema,
                                                            $caracteristicas->afectaciones,
                                                            $caracteristicas->riesgos,
                                                            $caracteristicas->calidad_suelo                                                                                                   
                                                            );                    
                                                        
                                                        $objeto->guardarCaracteristicas();
                                                        $objeto = null;
                                                           
	}


	// PUT caracteristicas del lote por ID                                     
    
    	public function putCaracteristicasLote(){
    						 	//Actualizar caracteristicas del Lote
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $caracteristicas= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Caracteristicas(
                                                            $caracteristicas->clave_predio,
                                                            $caracteristicas->idubicacion,
                                                            $caracteristicas->ocupacion,
                                                            $caracteristicas->manzana_locacion,
                                                            $caracteristicas->forma,
                                                            $caracteristicas->topografia,
                                                            $caracteristicas->cobertura_nativa,
                                                            $caracteristicas->ecosistema,
                                                            $caracteristicas->afectaciones,
                                                            $caracteristicas->riesgos,
                                                            $caracteristicas->calidad_suelo                                                                                                   
                                                            );                    
                                                        $objeto->actualizarCaracteristicas($_GET['id']);
                                                        $objeto = null;     
	}


	// DELETE caracteristicas del lote por ID
	public static function deleteCaracteristicasLote() {
                                                        //Eliminar características del lote
                                                        Caracteristicas::eliminarCaracteristicas($_GET['id']);
	}

}










