<?php 

include_once ("./src/predios.php");

class controladorPredio{

    
        //GET predios
        public static function getPredios(){ 
        
        		if (isset($_GET['id'])){
                              Predio::verPredio($_GET['id']);                         
                                                
                              }else{
                              	Predio::verPredios();                        
                              }
	}

	// POST predio 
	public function postPredio(){    
 							//Guardar predio nuevo
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $predio= json_decode($json);   
                                                        //echo $predio->identificacion; 



							$objeto = new Predio(                        
                                                            //$predio->idpredio
                                                            $predio->idpropietario,
                                                            $predio->identificacion,
                                                            $predio->tipo,
                                                            $predio->clavecatastral,
                                                            //$predio->claveanterior,
                                                            $predio->regimen,
                                                            $predio->bloque,
                                                            $predio->piso,
                                                            $predio->unidad
                                                            //$predio->numero                                       
                                                            );                    
                                                        
                                                        $objeto->guardarPredio();
                                                        $objeto = null;
	}


	// PUT predio por ID                                 //prd_clave_anterior=:claveanterior,
                                                     	//prd_numero_predio=:numero           
    
    
    	public function putPredio(){
    						 	//Actualizar predio
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $predio= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Predio(                        
                                                            //$predio->idpredio
                                                            $predio->idpropietario,
                                                            $predio->identificacion,
                                                            $predio->tipo,
                                                            $predio->clavecatastral,
                                                            //$predio->claveanterior,
                                                            $predio->regimen,
                                                            $predio->bloque,
                                                            $predio->piso,
                                                            $predio->unidad
                                                            //$predio->numero                                       
                                                            );
                                                        $objeto->actualizarPredio($_GET['id']);
                                                        $objeto = null;
	}


	// DELETE predio por ID
	public static function deletePredio() {
                                                        Predio::eliminarPredio($_GET['id']);  
        
	}

}










