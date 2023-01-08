<?php 

include_once ("../src/estatusLegal.php");

class controladorEstatusLegal{

    
        //GET estatus legal
        public static function getEstatusLegal(){ 
        
        						  //Obtener estatus legal
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            EstatusLegal::verEstatusLegal($_GET['id']);                         
                                                        
                                                        }else{
                                                            EstatusLegal::todosEstatusLegal();                        
                                                        } 
                            
	}

	// POST estatus legal
	public function postEstatusLegal(){    
 							//Guardar estatus legal nuevo
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $estatus= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new EstatusLegal(                                                             
                                                            $estatus->clave_predio,
                                                            $estatus->titulo,
                                                            $estatus->escritura,
                                                            $estatus->celebrado_ante,
                                                            $estatus->nombre_notaria,
                                                            $estatus->provincia_titulacion,
                                                            $estatus->canton_inscripcion,
                                                            $estatus->dia_protocolo,
                                                            $estatus->mes_protocolo,
                                                            $estatus->anio_protocolo,
                                                            $estatus->registro_propiedad,
                                                            $estatus->tomo,
                                                            $estatus->partida,
                                                            $estatus->dia_inscripcion,
                                                            $estatus->mes_inscripcion,
                                                            $estatus->anio_inscripcion,
                                                            $estatus->area_titulo,
                                                            $estatus->unidad,
                                                            $estatus->tenencia,
                                                            $estatus->adquisicion,
                                                            $estatus->perfeccionamiento,
                                                            $estatus->sin_perfeccionamiento,
                                                            $estatus->anios_posesion,
                                                            $estatus->pueblo_etnia,
                                                            $estatus->sin_titulo,
                                                            $estatus->documento,
                                                            $estatus->posesionario_apellidouno,
                                                            $estatus->posesionario_apellidodos,
                                                            $estatus->posesionario_nombreuno,
                                                            $estatus->posesionario_nombredos,
                                                            $estatus->posesionario_documento,
                                                            $estatus->posesionario_id,
                                                            $estatus->posesionario_email,
                                                            $estatus->posesionario_telefono        
                                                            );                    
                                                        
                                                        $objeto->guardarEstatus();
                                                        $objeto = null;                                              
   
	}


	// PUT estatus legal por ID                                     
    
    	public function putEstatusLegal(){
    						 	//Actualizar estatus legal
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $estatus= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new EstatusLegal(                                                             
                                                            $estatus->clave_predio,
                                                            $estatus->titulo,
                                                            $estatus->escritura,
                                                            $estatus->celebrado_ante,
                                                            $estatus->nombre_notaria,
                                                            $estatus->provincia_titulacion,
                                                            $estatus->canton_inscripcion,
                                                            $estatus->dia_protocolo,
                                                            $estatus->mes_protocolo,
                                                            $estatus->anio_protocolo,
                                                            $estatus->registro_propiedad,
                                                            $estatus->tomo,
                                                            $estatus->partida,
                                                            $estatus->dia_inscripcion,
                                                            $estatus->mes_inscripcion,
                                                            $estatus->anio_inscripcion,
                                                            $estatus->area_titulo,
                                                            $estatus->unidad,
                                                            $estatus->tenencia,
                                                            $estatus->adquisicion,
                                                            $estatus->perfeccionamiento,
                                                            $estatus->sin_perfeccionamiento,
                                                            $estatus->anios_posesion,
                                                            $estatus->pueblo_etnia,
                                                            $estatus->sin_titulo,
                                                            $estatus->documento,
                                                            $estatus->posesionario_apellidouno,
                                                            $estatus->posesionario_apellidodos,
                                                            $estatus->posesionario_nombreuno,
                                                            $estatus->posesionario_nombredos,
                                                            $estatus->posesionario_documento,
                                                            $estatus->posesionario_id,
                                                            $estatus->posesionario_email,
                                                            $estatus->posesionario_telefono        
                                                            );                    
                                                        $objeto->actualizarEstatus($_GET['id']);
                                                        $objeto = null;       
	}


	// DELETE estatus legal por ID
	public static function deleteEstatusLegal() {
                                                        //Eliminar estatus legal
                                                        EstatusLegal::eliminarEstatus($_GET['id']); 
	}

}










