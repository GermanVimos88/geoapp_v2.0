<?php 

include_once ("./src/obras.php");

class controladorObras{

    
        //GET obras complementarias
        public static function getObras(){ 
        
        						  //Obtener obras complementarias
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            Obras::verObra($_GET['id']);                         
                                                        
                                                        }else{
                                                            Obras::todasObras();                        
                                                        }    
                            
	}

	// POST obras complementarias
	public function postObras(){    
 							//Guardar obra complementaria nueva
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $obras= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Obras(  
                                                            $obras->clave_predio,
                                                            $obras->idubicacion,
                                                            $obras->idinfraestructura,
                                                            $obras->tipo_obra,
                                                            $obras->dimension_a,
                                                            $obras->dimension_b,
                                                            $obras->dimension_c,
                                                            $obras->cantidad_metros,
                                                            $obras->material,
                                                            $obras->edad,
                                                            $obras->estado                      
                                                            );                    
                                                        
                                                        $objeto->guardarObra();
                                                        $objeto = null;                                                        
                                                        //echo($raiz);
                                                        //echo($api);
                                                        //echo($directorio);                                                        
   
	}


	// PUT obras complementarias por ID                                     
    
    	public function putObras(){
    						 	//Actualizar obras complementarias del predio
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $obras= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Obras(  
                                                            $obras->clave_predio,
                                                            $obras->idubicacion,
                                                            $obras->idinfraestructura,
                                                            $obras->tipo_obra,
                                                            $obras->dimension_a,
                                                            $obras->dimension_b,
                                                            $obras->dimension_c,
                                                            $obras->cantidad_metros,
                                                            $obras->material,
                                                            $obras->edad,
                                                            $obras->estado                      
                                                            );                
                                                        $objeto->actualizarObra($_GET['id']);
                                                        $objeto = null;
	}


	// DELETE obras complementarias por ID
	public static function deleteObras() {
                                                        //Eliminar obras complementarias
                                                        Obras::eliminarObra($_GET['id']);
                            
	}

}










