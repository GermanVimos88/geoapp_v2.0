<?php 

include_once ("../src/grafico.php");

class controladorGrafico{

    
        //GET grafico del predio
        public static function getGrafico(){ 
        
        						  //Obtener grafico predial
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            Grafico::verGrafico($_GET['id']);                         
                                                        
                                                        }else{
                                                            Grafico::todosGraficos();                        
                                                        }    
                            
	}

	// POST grafico del predio
	public function postGrafico(){    
 							//Guardar gráfico nuevo
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $grafico= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Grafico(
                                                            $grafico->clave_predio,
                                                            $grafico->link_grafico,
                                                            $grafico->link_foto_fachada,
                                                            $grafico->descripcion,
                                                            $grafico->calle_norte,
                                                            $grafico->calle_sur,
                                                            $grafico->calle_este,
                                                            $grafico->calle_oeste,
                                                            $grafico->area_grafica_lote,
                                                            $grafico->dimension_frente,
                                                            $grafico->fondo_relativo,
                                                            $grafico->coordenada_x,
                                                            $grafico->coordenada_y,
                                                            $grafico->avaluo_tierras,
                                                            $grafico->avaluo_construcciones,
                                                            $grafico->avaluo_total,
                                                            $grafico->observaciones                                                                                                 
                                                            );                    
                                                        
                                                        $objeto->guardarGrafico();
                                                        $objeto = null;                                                        
                                                        //echo($raiz);
                                                        //echo($api);
                                                        //echo($directorio);                                                        
   
	}


	// PUT grafico del predio por ID                                     
    
    	public function putGrafico(){
    						 	//Actualizar gráfico del predio
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $grafico= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Grafico(
                                                            $grafico->clave_predio,
                                                            $grafico->link_grafico,
                                                            $grafico->link_foto_fachada,
                                                            $grafico->descripcion,
                                                            $grafico->calle_norte,
                                                            $grafico->calle_sur,
                                                            $grafico->calle_este,
                                                            $grafico->calle_oeste,
                                                            $grafico->area_grafica_lote,
                                                            $grafico->dimension_frente,
                                                            $grafico->fondo_relativo,
                                                            $grafico->coordenada_x,
                                                            $grafico->coordenada_y,
                                                            $grafico->avaluo_tierras,
                                                            $grafico->avaluo_construcciones,
                                                            $grafico->avaluo_total,
                                                            $grafico->observaciones                                                                                                 
                                                            );                
                                                        $objeto->actualizarGrafico($_GET['id']);
                                                        $objeto = null;
	}


	// DELETE grafico del predio por ID
	public static function deleteGrafico() {
                                                        //Eliminar gráfico del predio
                                                        Grafico::eliminarGrafico($_GET['id']);
	}

}










