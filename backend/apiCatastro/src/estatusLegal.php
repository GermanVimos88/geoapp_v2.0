<?php

include_once ("../src/db.php");

class EstatusLegal{

        private $clave_predio;
        private $titulo;
        private $escritura;
        private $celebrado_ante;
        private $nombre_notaria;
        private $provincia_titulacion;
        private $canton_inscripcion;
        private $dia_protocolo;
        private $mes_protocolo;
        private $anio_protocolo;
        private $registro_propiedad;
        private $tomo;
        private $partida;
        private $dia_inscripcion;
        private $mes_inscripcion;
        private $anio_inscripcion;
        private $area_titulo;
        private $unidad;
        private $tenencia;
        private $adquisicion;
        private $perfeccionamiento;
        private $sin_perfeccionamiento;
        private $anios_posesion;
        private $pueblo_etnia;
        private $sin_titulo;
        private $documento;
        private $posesionario_apellidouno;
        private $posesionario_apellidodos;
        private $posesionario_nombreuno;
        private $posesionario_nombredos;
        private $posesionario_documento;
        private $posesionario_id;
        private $posesionario_email;
        private $posesionario_telefono;

            function __construct($elg_clave_predio,$elg_titulo,$elg_escritura,$elg_celebrado_ante,$elg_nombre_numero_notaria,$elg_provincia_titulacion,$elg_canton_inscripcion,$elg_dia_protocolizacion,$elg_mes_protocolizacion,$elg_anio_protocolizacion,$elg_registro_propiedad,$elg_tomo,$elg_partida,$elg_dia_inscripcion_registro_propiedad,$elg_mes_inscripcion_registro_propiedad,$elg_anio_inscripcion_registro_propiedad,$elg_area_segun_titulo,$elg_unidad_medida,$elg_forma_tenencia,$elg_forma_adquisicion,$elg_requiere_perfeccionamiento,$elg_anios_sin_perfeccionamiento,$elg_anios_posesion,$elg_pueblo_etnia,$elg_adquisicion_sin_titulo,$elg_documento_presentado,$elg_primer_apellido_posesionario,$elg_segundo_apellido_posesionario,$elg_primer_nombre_posesionario,$elg_segundo_nombre_posesionario,$elg_tipo_documento_posesionario,$elg_identificacion_posesionario,$elg_email_posesionario,$elg_telefono_posesionario)
            {   
                    $this->clave_predio = $elg_clave_predio;
                    $this->titulo = $elg_titulo;
                    $this->escritura = $elg_escritura;
                    $this->celebrado_ante = $elg_celebrado_ante;
                    $this->nombre_notaria = $elg_nombre_numero_notaria;
                    $this->provincia_titulacion = $elg_provincia_titulacion;
                    $this->canton_inscripcion = $elg_canton_inscripcion;
                    $this->dia_protocolo = $elg_dia_protocolizacion;
                    $this->mes_protocolo = $elg_mes_protocolizacion;
                    $this->anio_protocolo = $elg_anio_protocolizacion;
                    $this->registro_propiedad = $elg_registro_propiedad;
                    $this->tomo = $elg_tomo;
                    $this->partida = $elg_partida;
                    $this->dia_inscripcion = $elg_dia_inscripcion_registro_propiedad;
                    $this->mes_inscripcion = $elg_mes_inscripcion_registro_propiedad;
                    $this->anio_inscripcion = $elg_anio_inscripcion_registro_propiedad;
                    $this->area_titulo = $elg_area_segun_titulo;
                    $this->unidad = $elg_unidad_medida;
                    $this->tenencia = $elg_forma_tenencia;
                    $this->adquisicion = $elg_forma_adquisicion;
                    $this->perfeccionamiento = $elg_requiere_perfeccionamiento;
                    $this->sin_perfeccionamiento = $elg_anios_sin_perfeccionamiento;
                    $this->anios_posesion = $elg_anios_posesion;
                    $this->pueblo_etnia = $elg_pueblo_etnia;
                    $this->sin_titulo = $elg_adquisicion_sin_titulo;
                    $this->documento = $elg_documento_presentado;
                    $this->posesionario_apellidouno = $elg_primer_apellido_posesionario;
                    $this->posesionario_apellidodos = $elg_segundo_apellido_posesionario;
                    $this->posesionario_nombreuno = $elg_primer_nombre_posesionario;
                    $this->posesionario_nombredos = $elg_segundo_nombre_posesionario;
                    $this->posesionario_documento = $elg_tipo_documento_posesionario;
                    $this->posesionario_id = $elg_identificacion_posesionario;
                    $this->posesionario_email = $elg_email_posesionario;
                    $this->posesionario_telefono = $elg_telefono_posesionario;
            }


        // CRUD

        // GET Todos los estatus legal de predios registrados
        public static function todosEstatusLegal(){
        //echo "TODOS LOS ESTAUS LEGAL DE PREDIOS";
            $sql = "SELECT * FROM estatus_legal";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                $json = [];

                if ($resultado->rowCount() > 0){
                    $estatus = $resultado->fetchAll(PDO::FETCH_OBJ);

                    for($i=0;$i<$resultado->rowCount();$i++) {
                            $ejemplo = array("idestatus"=>intval($estatus[$i]->elg_idestatus_legal),
                            "clave_predio"=>$estatus[$i]->elg_clave_predio,
                            "titulo"=>$estatus[$i]->elg_titulo,
                            "escritura"=>$estatus[$i]->elg_escritura,
                            "celebrado_ante"=>$estatus[$i]->elg_celebrado_ante,
                            "nombre_notaria"=>$estatus[$i]->elg_nombre_numero_notaria,
                            "provincia_titulacion"=>$estatus[$i]->elg_provincia_titulacion,
                            "canton_inscripcion"=>$estatus[$i]->elg_canton_inscripcion,
                            "dia_protocolo"=>$estatus[$i]->elg_dia_protocolizacion,
                            "mes_protocolo"=>$estatus[$i]->elg_mes_protocolizacion,
                            "anio_protocolo"=>$estatus[$i]->elg_anio_protocolizacion,
                            "registro_propiedad"=>$estatus[$i]->elg_registro_propiedad,
                            "tomo"=>$estatus[$i]->elg_tomo,
                            "partida"=>$estatus[$i]->elg_partida,
                            "dia_inscripcion"=>$estatus[$i]->elg_dia_inscripcion_registro_propiedad,
                            "mes_inscripcion"=>$estatus[$i]->elg_mes_inscripcion_registro_propiedad,
                            "anio_inscripcion"=>$estatus[$i]->elg_anio_inscripcion_registro_propiedad,
                            "area_titulo"=>$estatus[$i]->elg_area_segun_titulo,
                            "unidad"=>$estatus[$i]->elg_unidad_medida,
                            "tenencia"=>$estatus[$i]->elg_forma_tenencia,
                            "adquisicion"=>$estatus[$i]->elg_forma_adquisicion,
                            "perfeccionamiento"=>$estatus[$i]->elg_requiere_perfeccionamiento,
                            "sin_perfeccionamiento"=>$estatus[$i]->elg_anios_sin_perfeccionamiento,
                            "anios_posesion"=>$estatus[$i]->elg_anios_posesion,
                            "pueblo_etnia"=>$estatus[$i]->elg_pueblo_etnia,
                            "sin_titulo"=>$estatus[$i]->elg_adquisicion_sin_titulo,
                            "documento"=>$estatus[$i]->elg_documento_presentado,
                            "posesionario_apellidouno"=>$estatus[$i]->elg_primer_apellido_posesionario,
                            "posesionario_apellidodos"=>$estatus[$i]->elg_segundo_apellido_posesionario,
                            "posesionario_nombreuno"=>$estatus[$i]->elg_primer_nombre_posesionario,
                            "posesionario_nombredos"=>$estatus[$i]->elg_segundo_nombre_posesionario,
                            "posesionario_documento"=>$estatus[$i]->elg_tipo_documento_posesionario,
                            "posesionario_id"=>$estatus[$i]->elg_identificacion_posesionario,
                            "posesionario_email"=>$estatus[$i]->elg_email_posesionario,
                            "posesionario_telefono"=>$estatus[$i]->elg_telefono_posesionario                    
                        );
                
                        $json[] = $ejemplo;
                    }        
        
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);

                    //echo json_encode($estatus, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existen ubicaciones registradas en la BD");
                }
                    $resultado = null;
                    $db = null;

                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';

                }

        }
        
        
        // GET Recuperar estatus legal de un predio por ID
        public static function verEstatusLegal($id){
            $id_estatus = $id;
            $sql = "SELECT * FROM estatus_legal WHERE elg_idestatus_legal = $id_estatus";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                $json = [];

                if ($resultado->rowCount() > 0){
                    $estatus = $resultado->fetchAll(PDO::FETCH_OBJ);
                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("idestatus"=>intval($estatus[$i]->elg_idestatus_legal),
                                    "clave_predio"=>$estatus[$i]->elg_clave_predio,
                                    "titulo"=>$estatus[$i]->elg_titulo,
                                    "escritura"=>$estatus[$i]->elg_escritura,
                                    "celebrado_ante"=>$estatus[$i]->elg_celebrado_ante,
                                    "nombre_notaria"=>$estatus[$i]->elg_nombre_numero_notaria,
                                    "provincia_titulacion"=>$estatus[$i]->elg_provincia_titulacion,
                                    "canton_inscripcion"=>$estatus[$i]->elg_canton_inscripcion,
                                    "dia_protocolo"=>$estatus[$i]->elg_dia_protocolizacion,
                                    "mes_protocolo"=>$estatus[$i]->elg_mes_protocolizacion,
                                    "anio_protocolo"=>$estatus[$i]->elg_anio_protocolizacion,
                                    "registro_propiedad"=>$estatus[$i]->elg_registro_propiedad,
                                    "tomo"=>$estatus[$i]->elg_tomo,
                                    "partida"=>$estatus[$i]->elg_partida,
                                    "dia_inscripcion"=>$estatus[$i]->elg_dia_inscripcion_registro_propiedad,
                                    "mes_inscripcion"=>$estatus[$i]->elg_mes_inscripcion_registro_propiedad,
                                    "anio_inscripcion"=>$estatus[$i]->elg_anio_inscripcion_registro_propiedad,
                                    "area_titulo"=>$estatus[$i]->elg_area_segun_titulo,
                                    "unidad"=>$estatus[$i]->elg_unidad_medida,
                                    "tenencia"=>$estatus[$i]->elg_forma_tenencia,
                                    "adquisicion"=>$estatus[$i]->elg_forma_adquisicion,
                                    "perfeccionamiento"=>$estatus[$i]->elg_requiere_perfeccionamiento,
                                    "sin_perfeccionamiento"=>$estatus[$i]->elg_anios_sin_perfeccionamiento,
                                    "anios_posesion"=>$estatus[$i]->elg_anios_posesion,
                                    "pueblo_etnia"=>$estatus[$i]->elg_pueblo_etnia,
                                    "sin_titulo"=>$estatus[$i]->elg_adquisicion_sin_titulo,
                                    "documento"=>$estatus[$i]->elg_documento_presentado,
                                    "posesionario_apellidouno"=>$estatus[$i]->elg_primer_apellido_posesionario,
                                    "posesionario_apellidodos"=>$estatus[$i]->elg_segundo_apellido_posesionario,
                                    "posesionario_nombreuno"=>$estatus[$i]->elg_primer_nombre_posesionario,
                                    "posesionario_nombredos"=>$estatus[$i]->elg_segundo_nombre_posesionario,
                                    "posesionario_documento"=>$estatus[$i]->elg_tipo_documento_posesionario,
                                    "posesionario_id"=>$estatus[$i]->elg_identificacion_posesionario,
                                    "posesionario_email"=>$estatus[$i]->elg_email_posesionario,
                                    "posesionario_telefono"=>$estatus[$i]->elg_telefono_posesionario                    
                                    );
                
                        $json[] = $ejemplo;
                    }        
        
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);
                    //echo json_encode($estatus, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existen ubicaciones de predios en la BD con este ID");
                }
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }

        }


        // POST Crear nuevo estatus legal de predios
        public function guardarEstatus(){     
        
            $rs = "SELECT MAX(elg_idestatus_legal) AS maxid from estatus_legal"; // UltimoRegistro    
            //$estatus = json_decode($request->getBody());
        
            $sql = "INSERT INTO estatus_legal (elg_idestatus_legal,elg_clave_predio,elg_titulo,elg_escritura,elg_celebrado_ante,elg_nombre_numero_notaria,elg_provincia_titulacion,elg_canton_inscripcion,elg_dia_protocolizacion,elg_mes_protocolizacion,elg_anio_protocolizacion,elg_registro_propiedad,elg_tomo,elg_partida,elg_dia_inscripcion_registro_propiedad,elg_mes_inscripcion_registro_propiedad,elg_anio_inscripcion_registro_propiedad,elg_area_segun_titulo,elg_unidad_medida,elg_forma_tenencia,elg_forma_adquisicion,elg_requiere_perfeccionamiento,elg_anios_sin_perfeccionamiento,elg_anios_posesion,elg_pueblo_etnia,elg_adquisicion_sin_titulo,elg_documento_presentado,elg_primer_apellido_posesionario,elg_segundo_apellido_posesionario,elg_primer_nombre_posesionario,elg_segundo_nombre_posesionario,elg_tipo_documento_posesionario,elg_identificacion_posesionario,elg_email_posesionario,elg_telefono_posesionario) VALUES
                    (:idestatus,:clave_predio,:titulo,:escritura,:celebrado_ante,:nombre_notaria,:provincia_titulacion,:canton_inscripcion,:dia_protocolo,:mes_protocolo,:anio_protocolo,:registro_propiedad,:tomo,:partida,:dia_inscripcion,:mes_inscripcion,:anio_inscripcion,:area_titulo,:unidad,:tenencia,:adquisicion,:perfeccionamiento,:sin_perfeccionamiento,:anios_posesion,:pueblo_etnia,:sin_titulo,documento,:posesionario_apellidouno,:posesionario_apellidodos,:posesionario_nombreuno,:posesionario_nombredos,:posesionario_documento,:posesionario_id,:posesionario_email,:posesionario_telefono)";
            try {
                $db = new db();
                $db = $db->conexionDB();

                $last_id = $db->query($rs);  // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
                ////////////////////////////////////////////////////////////////

                $resultado = $db->prepare($sql);        
        
                $resultado->bindParam(':idestatus', intval($ultimo));
                $resultado->bindParam(':clave_predio',$this->clave_predio);   
                $resultado->bindParam(':eje_principal',$this->titulo);
                $resultado->bindParam(':titulo',$this->escritura);   
                $resultado->bindParam(':escritura',$this->celebrado_ante);   
                $resultado->bindParam(':celebrado_ante',$this->nombre_notaria);   
                $resultado->bindParam(':nombre_notaria',$this->provincia_titulacion);   
                $resultado->bindParam(':provincia_titulacion',$this->canton_inscripcion);   
                $resultado->bindParam(':canton_inscripcion',$this->dia_protocolo);   
                $resultado->bindParam(':dia_protocolo',$this->mes_protocolo);   
                $resultado->bindParam(':mes_protocolo',$this->anio_protocolo);  
                $resultado->bindParam(':anio_protocolo',$this->registro_propiedad);
                $resultado->bindParam(':registro_propiedad',$this->tomo);
                $resultado->bindParam(':tomo',$this->partida);
                $resultado->bindParam(':partida',$this->dia_inscripcion);
                $resultado->bindParam(':dia_inscripcion',$this->mes_inscripcion);
                $resultado->bindParam(':mes_inscripcion',$this->anio_inscripcion);
                $resultado->bindParam(':anio_inscripcion',$this->area_titulo);   
                $resultado->bindParam(':area_titulo',$this->unidad);   
                $resultado->bindParam(':unidad',$this->tenencia);   
                $resultado->bindParam(':tenencia',$this->adquisicion);   
                $resultado->bindParam(':adquisicion',$this->perfeccionamiento);   
                $resultado->bindParam(':perfeccionamiento',$this->sin_perfeccionamiento);   
                $resultado->bindParam(':sin_perfeccionamiento',$this->anios_posesion);   
                $resultado->bindParam(':anios_posesion',$this->pueblo_etnia);       
                $resultado->bindParam(':pueblo_etnia',$this->sin_titulo);       
                $resultado->bindParam(':sin_titulo',$this->documento);   
                $resultado->bindParam(':documento',$this->posesionario_apellidouno);       
                $resultado->bindParam(':posesionario_apellidouno',$this->posesionario_apellidodos);       
                $resultado->bindParam(':posesionario_apellidodos',$this->posesionario_nombreuno);       
                $resultado->bindParam(':posesionario_nombreuno',$this->posesionario_nombredos);       
                $resultado->bindParam(':posesionario_nombredos',$this->posesionario_documento);       
                $resultado->bindParam(':posesionario_id',$this->posesionario_id);       
                $resultado->bindParam(':posesionario_email',$this->posesionario_email);       
                $resultado->bindParam(':posesionario_telefono',$this->posesionario_telefono);               
            
                $resultado->execute();
                echo json_encode("Nueva estatus legal guardado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }

        }


        // PUT Actualizar ubicacion por ID
        public function actualizarEstatus($id){
               
           $id_estatus = intval($id);        
           $sql = "UPDATE estatus_legal SET            
                    elg_clave_predio=:clave_predio,
                    elg_titulo=:titulo,
                    elg_escritura=:escritura,
                    elg_celebrado_ante=:celebrado_ante,
                    elg_nombre_numero_notaria=:nombre_notaria,
                    elg_provincia_titulacion=:provincia_titulacion,
                    elg_canton_inscripcion=:canton_inscripcion,
                    elg_dia_protocolizacion=:dia_protocolo,
                    elg_mes_protocolizacion=:mes_protocolo,
                    elg_anio_protocolizacion=:anio_protocolo,
                    elg_registro_propiedad=:registro_propiedad,
                    elg_tomo=:tomo,
                    elg_partida=:partida,
                    elg_dia_inscripcion_registro_propiedad=:dia_inscripcion,
                    elg_mes_inscripcion_registro_propiedad=:mes_inscripcion,
                    elg_anio_inscripcion_registro_propiedad=:anio_inscripcion,
                    elg_area_segun_titulo=:area_titulo,
                    elg_unidad_medida=:unidad,
                    elg_forma_tenencia=:tenencia,
                    elg_forma_adquisicion=:adquisicion,
                    elg_requiere_perfeccionamiento=:perfeccionamiento,
                    elg_anios_sin_perfeccionamiento=:sin_perfeccionamiento,
                    elg_anios_posesion=:anios_posesion,
                    elg_pueblo_etnia=:pueblo_etnia,
                    elg_adquisicion_sin_titulo=:sin_titulo,
                    elg_documento_presentado=:documento,
                    elg_primer_apellido_posesionario=:posesionario_apellidouno,
                    elg_segundo_apellido_posesionario=:posesionario_apellidodos,
                    elg_primer_nombre_posesionario=:posesionario_nombreuno,
                    elg_segundo_nombre_posesionario=:posesionario_nombredos,
                    elg_tipo_documento_posesionario=:posesionario_documento,
                    elg_identificacion_posesionario=:posesionario_id,
                    elg_email_posesionario=:posesionario_email,
                    elg_telefono_posesionario=:posesionario_telefono         
                    WHERE elg_idestatus_legal=:idestatus";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);
                
                //$resultado->bindParam(':clave_predio', $ubicacion->clave_predio);
        

                $resultado->bindParam(':idestatus', $id_estatus);                
                $resultado->bindParam(':clave_predio',$this->clave_predio);   
                $resultado->bindParam(':eje_principal',$this->titulo);
                $resultado->bindParam(':titulo',$this->escritura);   
                $resultado->bindParam(':escritura',$this->celebrado_ante);   
                $resultado->bindParam(':celebrado_ante',$this->nombre_notaria);   
                $resultado->bindParam(':nombre_notaria',$this->provincia_titulacion);   
                $resultado->bindParam(':provincia_titulacion',$this->canton_inscripcion);   
                $resultado->bindParam(':canton_inscripcion',$this->dia_protocolo);   
                $resultado->bindParam(':dia_protocolo',$this->mes_protocolo);   
                $resultado->bindParam(':mes_protocolo',$this->anio_protocolo);  
                $resultado->bindParam(':anio_protocolo',$this->registro_propiedad);
                $resultado->bindParam(':registro_propiedad',$this->tomo);
                $resultado->bindParam(':tomo',$this->partida);
                $resultado->bindParam(':partida',$this->dia_inscripcion);
                $resultado->bindParam(':dia_inscripcion',$this->mes_inscripcion);
                $resultado->bindParam(':mes_inscripcion',$this->anio_inscripcion);
                $resultado->bindParam(':anio_inscripcion',$this->area_titulo);   
                $resultado->bindParam(':area_titulo',$this->unidad);   
                $resultado->bindParam(':unidad',$this->tenencia);   
                $resultado->bindParam(':tenencia',$this->adquisicion);   
                $resultado->bindParam(':adquisicion',$this->perfeccionamiento);   
                $resultado->bindParam(':perfeccionamiento',$this->sin_perfeccionamiento);   
                $resultado->bindParam(':sin_perfeccionamiento',$this->anios_posesion);   
                $resultado->bindParam(':anios_posesion',$this->pueblo_etnia);       
                $resultado->bindParam(':pueblo_etnia',$this->sin_titulo);       
                $resultado->bindParam(':sin_titulo',$this->documento);   
                $resultado->bindParam(':documento',$this->posesionario_apellidouno);       
                $resultado->bindParam(':posesionario_apellidouno',$this->posesionario_apellidodos);       
                $resultado->bindParam(':posesionario_apellidodos',$this->posesionario_nombreuno);       
                $resultado->bindParam(':posesionario_nombreuno',$this->posesionario_nombredos);       
                $resultado->bindParam(':posesionario_nombredos',$this->posesionario_documento);       
                $resultado->bindParam(':posesionario_id',$this->posesionario_id);       
                $resultado->bindParam(':posesionario_email',$this->posesionario_email);       
                $resultado->bindParam(':posesionario_telefono',$this->posesionario_telefono);  
                        
                $resultado->execute();
                echo json_encode("Estatus legal actualizado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // DELETE Borrar estatus legal de un predio por ID

        public static function eliminarEstatus($id){    
    
            $id_estatus = intval($id);        
            $sql = "DELETE FROM estatus_legal WHERE elg_idestatus_legal=:idestatus";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);        
        
                $resultado->bindParam(':idestatus', $id_estatus);
                $resultado->execute();

                if ($resultado->rowCount() > 0){
                    echo json_encode("Estatus legal eliminada exitosamente", JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe estatus legal con este ID", JSON_UNESCAPED_UNICODE);
                }                     
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }
        }

}

?>