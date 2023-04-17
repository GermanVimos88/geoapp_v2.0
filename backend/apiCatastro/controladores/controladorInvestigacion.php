<?php 

include_once ("./src/investigacion.php");

class controladorInvestigacion{

    
        //GET investigacion
        public static function getInvestigacion(){ 
        
        						  //Obtener investigación del predio
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            Investigacion::verInvestigacion($_GET['id']);                         
                                                        
                                                        }else{
                                                            Investigacion::todasInvestigaciones();                        
                                                        }   
                            
	}

	// POST investigacion
	public function postInvestigacion(){    
 							//Guardar investigacion predial nuevo
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $investigacion= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Investigacion(
                                                            $investigacion->clave_predio,
                                                            $investigacion->tipo_informante,
                                                            $investigacion->apellidos_informante,
                                                            $investigacion->nombre_informante,
                                                            $investigacion->telefono_informante,
                                                            $investigacion->email_informante,
                                                            $investigacion->propietario_desconocido,
                                                            $investigacion->otra_fuente_informacion,
                                                            $investigacion->dimensiones_terreno_irregular,
                                                            $investigacion->linderos_definidos,
                                                            $investigacion->nuevo_bloque_numero,
                                                            $investigacion->ampliacion_bloque_numero,
                                                            $investigacion->nombre_actualizador,
                                                            $investigacion->apellido_actualizador,
                                                            $investigacion->anio_actualizacion,
                                                            $investigacion->mes_actualizacion,
                                                            $investigacion->dia_actualizacion,
                                                            $investigacion->cedula_actualizador,
                                                            $investigacion->firma_actualizador,
                                                            $investigacion->nombre_supervisor,
                                                            $investigacion->apellido_supervisor,
                                                            $investigacion->cedula_supervisor,
                                                            $investigacion->anio_supervision,
                                                            $investigacion->mes_supervision,
                                                            $investigacion->dia_supervision,
                                                            $investigacion->firma_supervisor
                                                            );                    
                                                        
                                                        $objeto->guardarInvestigacion();
                                                        $objeto = null;                                                        
                                                        //echo($raiz);
                                                        //echo($api);
                                                        //echo($directorio);                            
                                                                                    
   
	}


	// PUT investigacion por ID                                     
    
    	public function putInvestigacion(){
    						 	//Actualizar investigación predial
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $investigacion= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Investigacion(
                                                            $investigacion->clave_predio,
                                                            $investigacion->tipo_informante,
                                                            $investigacion->apellidos_informante,
                                                            $investigacion->nombre_informante,
                                                            $investigacion->telefono_informante,
                                                            $investigacion->email_informante,
                                                            $investigacion->propietario_desconocido,
                                                            $investigacion->otra_fuente_informacion,
                                                            $investigacion->dimensiones_terreno_irregular,
                                                            $investigacion->linderos_definidos,
                                                            $investigacion->nuevo_bloque_numero,
                                                            $investigacion->ampliacion_bloque_numero,
                                                            $investigacion->nombre_actualizador,
                                                            $investigacion->apellido_actualizador,
                                                            $investigacion->anio_actualizacion,
                                                            $investigacion->mes_actualizacion,
                                                            $investigacion->dia_actualizacion,
                                                            $investigacion->cedula_actualizador,
                                                            $investigacion->firma_actualizador,
                                                            $investigacion->nombre_supervisor,
                                                            $investigacion->apellido_supervisor,
                                                            $investigacion->cedula_supervisor,
                                                            $investigacion->anio_supervision,
                                                            $investigacion->mes_supervision,
                                                            $investigacion->dia_supervision,
                                                            $investigacion->firma_supervisor
                                                            );                    
                                                        $objeto->actualizarInvestigacion($_GET['id']);
                                                        $objeto = null; 
	}


	// DELETE investigacion por ID
	public static function deleteInvestigacion() {
                                                        //Eliminar investigación predial
                                                        Investigacion::eliminarInvestigacion($_GET['id']);
	}

}










