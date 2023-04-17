<?php 

include_once ("./src/usos.php");

class controladorUsoPredio{

    
        //GET uso predio
        public static function getUsoPredio(){ 
        
        						  //Obtener uso del predio
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            Usos::verUso($_GET['id']);                         
                                                        
                                                        }else{
                                                            Usos::todosUsos();                        
                                                        } 
                            
	}

	// POST uso predio
	public function postUsoPredio(){    
 							//Guardar uso predial nuevo
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $uso= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Usos(  
                                                            $uso->clave_predio,
                                                            $uso->uso_principal,
                                                            $uso->uso_secundario,
                                                            $uso->descripcion                                                                                                
                                                            );                    
                                                        
                                                        $objeto->guardarUso();
                                                        $objeto = null;                                                   
   
	}


	// PUT uso predio por ID                                     
    
    	public function putUsoPredio(){
    						 	//Actualizar uso del predio
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $uso = json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Usos(  
                                                            $uso->clave_predio,
                                                            $uso->uso_principal,
                                                            $uso->uso_secundario,
                                                            $uso->descripcion                                                                                                
                                                            );             
                                                        $objeto->actualizarUso($_GET['id']);
                                                        $objeto = null; 
	}


	// DELETE uso predio por ID
	public static function deleteUsoPredio() {
			                                  //Eliminar uso del predio                       
                                                        Usos::eliminarUso($_GET['id']);
	}

}










