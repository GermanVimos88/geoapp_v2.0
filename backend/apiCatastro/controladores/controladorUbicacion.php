<?php 

include_once ("./src/ubicacion.php");

class controladorUbicacion{

    
        //GET ubicacion
        public static function getUbicacion(){ 
        
        						  //Obtener ubicacion
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            Ubicacion::verUbicacion($_GET['id']);                         
                                                        
                                                        }else{
                                                            Ubicacion::verUbicaciones();                        
                                                        } 
                            
	}

	// POST ubicacion
	public function postUbicacion(){    
 							//Guardar ubicacion nueva
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $ubicacion= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Ubicacion(
                                                            $ubicacion->clave_predio,
                                                            $ubicacion->eje_principal,
                                                            $ubicacion->codigo_placa,
                                                            $ubicacion->eje_secundario,
                                                            $ubicacion->nombre_predio,
                                                            $ubicacion->sector
                                                            );                    
                                                        
                                                        $objeto->guardarUbicacion();
                                                        $objeto = null;                                                        
   
	}


	// PUT ubicacion por ID                                     
    
    	public function putUbicacion(){
    						 	//Actualizar ubicación
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $ubicacion= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Ubicacion(                        
                                                            $ubicacion->clave_predio,
                                                            $ubicacion->eje_principal,
                                                            $ubicacion->codigo_placa,
                                                            $ubicacion->eje_secundario,
                                                            $ubicacion->nombre_predio,
                                                            $ubicacion->sector                                     
                                                            );
                                                        $objeto->actualizarUbicacion($_GET['id']);
                                                        $objeto = null; 
	}


	// DELETE ubicacion por ID
	public static function deleteUbicacion() {
                                                        //Eliminar ubicación
                                                        Ubicacion::eliminarUbicacion($_GET['id']);         
	}

}










