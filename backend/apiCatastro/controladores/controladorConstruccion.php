<?php 

include_once ("./src/construccion.php");

class controladorConstruccion{

    
        //GET construccion
        public static function getConstruccion(){ 
        
        						  //Obtener características de construcción en predio
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            Construcccion::verConstruccion($_GET['id']);                         
                                                        
                                                        }else{
                                                            Construcccion::todasConstrucciones();                        
                                                        }     
                            
	}

	// POST Construccion
	public function postConstruccion(){    
 							//Guardar construcción nueva
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $construccion= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Construcccion(
                                                            $construccion->clave_predio,
                                                            $construccion->idubicacion,
                                                            $construccion->numero_bloque,
                                                            $construccion->numero_piso,
                                                            $construccion->numero_unidad,
                                                            $construccion->nivel_piso,
                                                            $construccion->condicion_fisica,
                                                            $construccion->uso_constructivo,
                                                            $construccion->valor_cultural,
                                                            $construccion->area_construccion,
                                                            $construccion->anio_construccion,
                                                            $construccion->anio_restauracion,
                                                            $construccion->estado_conservacion,
                                                            $construccion->mamposteria_soportante,
                                                            $construccion->columnas,
                                                            $construccion->vigas,
                                                            $construccion->entrepiso,
                                                            $construccion->cubierta_entrepiso,
                                                            $construccion->gradas,
                                                            $construccion->contrapiso,
                                                            $construccion->paredes,
                                                            $construccion->enlucido_paredes,
                                                            $construccion->enlucido_tumbados,
                                                            $construccion->revestimiento_pared_interior,
                                                            $construccion->revestimiento_pared_exterior,
                                                            $construccion->revestimiento_cubierta,
                                                            $construccion->tumbados,
                                                            $construccion->ventanas,
                                                            $construccion->vidrios,
                                                            $construccion->puertas,
                                                            $construccion->closets,
                                                            $construccion->pisos,
                                                            $construccion->proteccion_ventanas,
                                                            $construccion->gradas_acabados,
                                                            $construccion->clasificacion_vivienda,
                                                            $construccion->tipo_vivienda,
                                                            $construccion->condicion_ocupacion,
                                                            $construccion->acabado_piso,
                                                            $construccion->estado_piso,
                                                            $construccion->numero_hogares,
                                                            $construccion->numero_habitantes,
                                                            $construccion->numero_habitaciones,
                                                            $construccion->numero_dormitorios,
                                                            $construccion->espacios_aseo_duchas,
                                                            $construccion->tenencia_vivienda,
                                                            $construccion->telefono_convencional,
                                                            $construccion->cantidad_celulares,
                                                            $construccion->servicio_internet,
                                                            $construccion->total_propiedad_exclusiva,
                                                            $construccion->total_propiedad_comunal,
                                                            $construccion->alicuota_porcentaje                                                                                                 
                                                            );                    
                                                        
                                                        $objeto->guardarConstruccion();
                                                        $objeto = null;                                                        
                                                        //echo($raiz);
                                                        //echo($api);
                                                        //echo($directorio);                                                         
   
	}


	// PUT Construccion por ID                                     
    
    	public function putConstruccion(){
    						 	//Actualizar características de construcción
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $construccion= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Construcccion(
                                                            $construccion->clave_predio,
                                                            $construccion->idubicacion,
                                                            $construccion->numero_bloque,
                                                            $construccion->numero_piso,
                                                            $construccion->numero_unidad,
                                                            $construccion->nivel_piso,
                                                            $construccion->condicion_fisica,
                                                            $construccion->uso_constructivo,
                                                            $construccion->valor_cultural,
                                                            $construccion->area_construccion,
                                                            $construccion->anio_construccion,
                                                            $construccion->anio_restauracion,
                                                            $construccion->estado_conservacion,
                                                            $construccion->mamposteria_soportante,
                                                            $construccion->columnas,
                                                            $construccion->vigas,
                                                            $construccion->entrepiso,
                                                            $construccion->cubierta_entrepiso,
                                                            $construccion->gradas,
                                                            $construccion->contrapiso,
                                                            $construccion->paredes,
                                                            $construccion->enlucido_paredes,
                                                            $construccion->enlucido_tumbados,
                                                            $construccion->revestimiento_pared_interior,
                                                            $construccion->revestimiento_pared_exterior,
                                                            $construccion->revestimiento_cubierta,
                                                            $construccion->tumbados,
                                                            $construccion->ventanas,
                                                            $construccion->vidrios,
                                                            $construccion->puertas,
                                                            $construccion->closets,
                                                            $construccion->pisos,
                                                            $construccion->proteccion_ventanas,
                                                            $construccion->gradas_acabados,
                                                            $construccion->clasificacion_vivienda,
                                                            $construccion->tipo_vivienda,
                                                            $construccion->condicion_ocupacion,
                                                            $construccion->acabado_piso,
                                                            $construccion->estado_piso,
                                                            $construccion->numero_hogares,
                                                            $construccion->numero_habitantes,
                                                            $construccion->numero_habitaciones,
                                                            $construccion->numero_dormitorios,
                                                            $construccion->espacios_aseo_duchas,
                                                            $construccion->tenencia_vivienda,
                                                            $construccion->telefono_convencional,
                                                            $construccion->cantidad_celulares,
                                                            $construccion->servicio_internet,
                                                            $construccion->total_propiedad_exclusiva,
                                                            $construccion->total_propiedad_comunal,
                                                            $construccion->alicuota_porcentaje                                                                                                 
                                                            );                    
                                                        $objeto->actualizarConstruccion($_GET['id']);
                                                        $objeto = null;
    						 	
    						 	
	}


	// DELETE Construccion por ID
	public static function deleteConstruccion() {
                                                        //Eliminar características de construcción
                                                        Construcccion::eliminarConstruccion($_GET['id']);
                                                        
	}

}










