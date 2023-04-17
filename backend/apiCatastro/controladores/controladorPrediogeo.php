<?php 

include_once ("./src/prediogeo.php");

class controladorPrediogeo{

    
        //GET prediogeojson
        public static function getPrediogeo(){ 
        
        						  //Obtener prediogeo
                                                        //echo($url);
                                                        if (isset($_GET['clave'])){                        
                                                        
                                                            Prediogeo::verPrediosgeo($_GET['clave']);                         
                                                        
                                                        }else{
                                                            Prediogeo::todosPrediosgeo();                        
                                                        } 
                            
	}

	// POST prediosgeojson
	public function postPrediogeo(){    
 							//Guardar prediogeo                                                        
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $prediogeo= json_decode($json);   
                                                                                                             

                                                        $objeto = new Prediogeo(  
                                                            $prediogeo->clavecatastral,
                                                            $prediogeo->shape                                                            
                                                            );                    
                                                        
                                                        $objeto->guardarPrediogeo();
                                                        $objeto = null;                                                   
   
	}


	// PUT prediogeo por clave                                     
    
    	public function putPrediogeo(){
    						 	//Actualizar prediogeo
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $prediogeo = json_decode($json);                                                           

                                                        $objeto = new Prediogeo(  
                                                            //$prediogeo->clavecatastral,
                                                            $prediogeo->shape                                                                                                                                                               
                                                            );             
                                                        $objeto->actualizarPrediogeo($_GET['clave']);
                                                        $objeto = null; 
	}


	// DELETE prediogeo por clave
	public static function deletePrediogeo() {
			                                  //Eliminar prediogeojson                      
                                              Prediogeo::eliminarPrediogeo($_GET['id']);
	}

}

?>








