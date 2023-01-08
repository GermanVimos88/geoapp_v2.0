<?php 

include_once ("../src/propietario.php");

class controladorPropietario{

    
        //GET propietarios
        public static function getPropietarios(){ 
        
				 	       	  //Obtener propietarios
                                                        //echo($url);
                                                        if (isset($_GET['id'])){                        
                                                        
                                                            Propietario::verPropietario($_GET['id']);                         
                                                        
                                                        }else{
                                                            Propietario::verPropietarios();                        
                                                        }   
	}

	// POST propietarios 
	public function postPropietario(){    
 							//Guardar propietario nuevo
                                                        //include_once ("../src/predios.php");                     
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $propietario= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Propietario(                                                                                    
                                                            //$propietario->idpropietario,
                                                            $propietario->identificacion,
                                                            $propietario->tipo,
                                                            $propietario->primer_apellido,
                                                            $propietario->segundo_apellido,
                                                            $propietario->primer_nombre,
                                                            $propietario->segundo_nombre,
                                                            $propietario->documento_tipo,
                                                            $propietario->estado_civil,
                                                            $propietario->porcentaje_participacion,
                                                            $propietario->representante,
                                                            $propietario->anio_nacimiento,
                                                            $propietario->mes_nacimiento,
                                                            $propietario->dia_nacimiento,
                                                            $propietario->nacionalidad,
                                                            $propietario->email,
                                                            $propietario->telefono,
                                                            $propietario->ciudad_domicilio,
                                                            $propietario->direccion_domicilio,
                                                            $propietario->jefe_hogar,
                                                            $propietario->p_juridica,
                                                            $propietario->ruc,
                                                            $propietario->razon_social,
                                                            $propietario->inscrito,
                                                            $propietario->lugar_inscripcion,
                                                            $propietario->acuerdo_reg,
                                                            $propietario->representante_legal,
                                                            $propietario->doc_representante,
                                                            $propietario->idrepresentante,
                                                            $propietario->email_representante,
                                                            $propietario->telf_representante,
                                                            $propietario->conyugue,
                                                            $propietario->conyugue_apellidos,
                                                            $propietario->conyugue_nombres,
                                                            $propietario->conyugue_doc,
                                                            $propietario->conyugueid,
                                                            $propietario->conyugue_telf,
                                                            $propietario->conyugue_participacion,
                                                            $propietario->conyugue_email                                                            
                                                            );                    
                                                        
                                                        $objeto->guardarPropietario();
                                                        $objeto = null;
                                                        
                                                        
	}


	// PUT propietario por ID                                         
    
    
    	public function putPropietario(){
    							//Actualizar propietario
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $propietario= json_decode($json);   
                                                        //echo $predio->identificacion;                                                     

                                                        $objeto = new Propietario(                        
                                                            //$propietario->idpropietario,
                                                            $propietario->identificacion,
                                                            $propietario->tipo,
                                                            $propietario->primer_apellido,
                                                            $propietario->segundo_apellido,
                                                            $propietario->primer_nombre,
                                                            $propietario->segundo_nombre,
                                                            $propietario->documento_tipo,
                                                            $propietario->estado_civil,
                                                            $propietario->porcentaje_participacion,
                                                            $propietario->representante,
                                                            $propietario->anio_nacimiento,
                                                            $propietario->mes_nacimiento,
                                                            $propietario->dia_nacimiento,
                                                            $propietario->nacionalidad,
                                                            $propietario->email,
                                                            $propietario->telefono,
                                                            $propietario->ciudad_domicilio,
                                                            $propietario->direccion_domicilio,
                                                            $propietario->jefe_hogar,
                                                            $propietario->p_juridica,
                                                            $propietario->ruc,
                                                            $propietario->razon_social,
                                                            $propietario->inscrito,
                                                            $propietario->lugar_inscripcion,
                                                            $propietario->acuerdo_reg,
                                                            $propietario->representante_legal,
                                                            $propietario->doc_representante,
                                                            $propietario->idrepresentante,
                                                            $propietario->email_representante,
                                                            $propietario->telf_representante,
                                                            $propietario->conyugue,
                                                            $propietario->conyugue_apellidos,
                                                            $propietario->conyugue_nombres,
                                                            $propietario->conyugue_doc,
                                                            $propietario->conyugueid,
                                                            $propietario->conyugue_telf,
                                                            $propietario->conyugue_participacion,
                                                            $propietario->conyugue_email                                       
                                                            );
                                                        $objeto->actualizarPropietario($_GET['id']);
                                                        $objeto = null;      						 	
	
	}


	// DELETE Propietario por ID
	public static function deletePropietario() {
                                                        Propietario::eliminarPropietario($_GET['id']);         
	}

}










