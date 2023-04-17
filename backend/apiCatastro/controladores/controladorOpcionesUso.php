<?php 

include_once ("./src/opcionUso.php");

class controladorOpcionesUso{

    
        //GET opciones uso predio
        public static function getOpcionesUso(){ 
        
        						  //Obtener opción de uso predial
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            UsoOpciones::verOpcionesUso($_GET['id']);                         
                                                        
                                                        }else{
                                                            UsoOpciones::todasOpcionesUso();                        
                                                        }  
                            
	}

	// POST opciones uso predio
	public function postOpcionesUso(){    
 							//Guardar opción de uso nueva
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $opcion= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new UsoOpciones(
                                                            $opcion->clave_predio,
                                                            $opcion->uso_principal,
                                                            $opcion->uso_secundario,
                                                            $opcion->descripcion
                                                            );                    
                                                        
                                                        $objeto->guardarOpcionUso();
                                                        $objeto = null;                                                                                                               
   
	}


	// PUT opciones uso predio por ID                                     
    
    	public function putOpcionesUso(){
    						 	//Actualizar opcion de uso predial
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $opcion= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new UsoOpciones(
                                                            $opcion->clave_predio,
                                                            $opcion->uso_principal,
                                                            $opcion->uso_secundario,
                                                            $opcion->descripcion
                                                            );                    
                                                        $objeto->actualizarOpcionUso($_GET['id']);
                                                        $objeto = null;
	}


	// DELETE opciones uso predio por ID
	public static function deleteOpcionesUso() {
			                                 //Eliminar opción de uso del predio
                                                        UsoOpciones::eliminarOpcionUso($_GET['id']);
	}

}










