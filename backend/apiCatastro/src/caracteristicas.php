<?php

include_once ("../src/db.php");

class Caracteristicas {


    //private $idcaracteristicas;
    private $clave_predio; //No incluir
    private $idubicacion;
    private $ocupacion;
    private $manzana_locacion;
    private $forma;
    private $topografia;
    private $cobertura_nativa;
    private $ecosistema;
    private $afectaciones;
    private $riesgos;
    private $calidad_suelo;

            function __construct($clt_clave_predio,$clt_idubicacion,$clt_ocupacion,$clt_localizacion_manzana,$clt_forma,$clt_topografia,$clt_cobertura_nativa_predominante,$clt_ecosistema_relevante,$clt_afectaciones,$clt_riesgos,$clt_calidad_suelo)
            {
                    //$this->idcaracteristicas = $clt_idcaracteristicas_lote;
                    $this->clave_predio = $clt_clave_predio;
                    $this->idubicacion = $clt_idubicacion;
                    $this->ocupacion = $clt_ocupacion;
                    $this->manzana_locacion = $clt_localizacion_manzana;
                    $this->forma = $clt_forma;
                    $this->topografia = $clt_topografia;
                    $this->cobertura_nativa = $clt_cobertura_nativa_predominante;
                    $this->ecosistema = $clt_ecosistema_relevante;
                    $this->afectaciones = $clt_afectaciones;
                    $this->riesgos = $clt_riesgos;
                    $this->calidad_suelo = $clt_calidad_suelo;
            }


            // CRUD

            // GET Todas las caracteristicas por lote
            public static function todasCaracteristicas(){
            
                $sql = "SELECT * FROM caracteristicas_lote";
                //$rs = "SELECT MAX(clt_idcaracteristicas_lote) AS maxid from caracteristicas_lote"; // UltimoRegistro
                try {
                    $db = new db();
                    $db = $db->conexionDB();
                    $resultado = $db->query($sql);
                    //$last_id = $db->query($rs);  // UltimoRegistro
                    $json = [];
                

                    if ($resultado->rowCount() > 0){
                        $caracteristicas = $resultado->fetchAll(PDO::FETCH_OBJ);
            
                        //Obtiene el último registro en base al mayor id de la tabla
                        //$maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                        //$ultimo = intval($maxid[0]->maxid)+1;
                        //echo $ultimo;
                        ////////////////////////////////////////////////////////////////

                        for($i=0;$i<$resultado->rowCount();$i++) {
                            $ejemplo = array("idcaracteristicas"=>intval($caracteristicas[$i]->clt_idcaracteristicas_lote),
                            "clave_predio"=>$caracteristicas[$i]->clt_clave_predio,
                            "idubicacion"=>intval($caracteristicas[$i]->clt_idubicacion),
                            "ocupacion"=>$caracteristicas[$i]->clt_ocupacion,
                            "manzana_locacion"=>$caracteristicas[$i]->clt_localizacion_manzana,
                            "forma"=>$caracteristicas[$i]->clt_forma,
                            "topografia"=>$caracteristicas[$i]->clt_topografia,
                            "cobertura_nativa"=>$caracteristicas[$i]->clt_cobertura_nativa_predominante,
                            "ecosistema"=>$caracteristicas[$i]->clt_ecosistema_relevante,
                            "afectaciones"=>$caracteristicas[$i]->clt_afectaciones,
                            "riesgos"=>$caracteristicas[$i]->clt_riesgos,
                            "calidad_suelo"=>$caracteristicas[$i]->clt_calidad_suelo,
                            );
                
                            $json[] = $ejemplo;
                        }
        
        
                        echo json_encode($json, JSON_UNESCAPED_UNICODE);

                        //echo json_encode($caracteristicas, JSON_UNESCAPED_UNICODE);
                    }else {
                        echo json_encode("No existen ubicaciones registradas en la BD");
                    }
                        $resultado = null;
                        $db = null;

                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';

                }

            }

            // GET Recuperar caracteristicas de lote por ID
            public static function verCaracteristicas($id){
                $id_caracteristicas = intval($id);
                $sql = "SELECT * FROM caracteristicas_lote WHERE clt_idcaracteristicas_lote = $id_caracteristicas";
                try {
                    $db = new db();
                    $db = $db->conexionDB();
                    $resultado = $db->query($sql);
                    $json = [];

                    if ($resultado->rowCount() > 0){
                        $caracteristicas = $resultado->fetchAll(PDO::FETCH_OBJ);
                        for($i=0;$i<$resultado->rowCount();$i++) {
                            $ejemplo = array(
                                        "idcaracteristicas"=>intval($caracteristicas[$i]->clt_idcaracteristicas_lote),
                                        "clave_predio"=>$caracteristicas[$i]->clt_clave_predio,
                                        "idubicacion"=>intval($caracteristicas[$i]->clt_idubicacion),
                                        "ocupacion"=>$caracteristicas[$i]->clt_ocupacion,
                                        "manzana_locacion"=>$caracteristicas[$i]->clt_localizacion_manzana,
                                        "forma"=>$caracteristicas[$i]->clt_forma,
                                        "topografia"=>$caracteristicas[$i]->clt_topografia,
                                        "cobertura_nativa"=>$caracteristicas[$i]->clt_cobertura_nativa_predominante,
                                        "ecosistema"=>$caracteristicas[$i]->clt_ecosistema_relevante,
                                        "afectaciones"=>$caracteristicas[$i]->clt_afectaciones,
                                        "riesgos"=>$caracteristicas[$i]->clt_riesgos,
                                        "calidad_suelo"=>$caracteristicas[$i]->clt_calidad_suelo                    
                                        );
                
                            $json[] = $ejemplo;
                        }        
        
                        echo json_encode($json, JSON_UNESCAPED_UNICODE);
                        //echo json_encode($ubicacion, JSON_UNESCAPED_UNICODE);
                    }else {
                        echo json_encode("No existen características de lote de predios en la BD con este ID");
                    }
                        $resultado = null;
                        $db = null;

                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';
                }
            }


            // POST Crear nueva característica de lote 
            public function guardarCaracteristicas(){ 
    
                $rs = "SELECT MAX(clt_idcaracteristicas_lote) AS maxid from caracteristicas_lote"; // UltimoRegistro    
           
                $sql = "INSERT INTO caracteristicas_lote (clt_idcaracteristicas_lote,clt_clave_predio,clt_idubicacion,clt_ocupacion,clt_localizacion_manzana,clt_forma,clt_topografia,clt_cobertura_nativa_predominante,clt_ecosistema_relevante,clt_afectaciones,clt_riesgos,clt_calidad_suelo) VALUES
                        (:idcaracteristicas,:clave_predio,:idubicacion,:ocupacion,:manzana_locacion,:forma,:topografia,:cobertura_nativa,:ecosistema,:afectaciones,:riesgos,:calidad_suelo)";
                try {
                    $db = new db();
                    $db = $db->conexionDB();        
                    $last_id = $db->query($rs); // UltimoRegistro
                    //Obtiene el último registro en base al mayor id de la tabla
                    $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                    $ultimo = intval($maxid[0]->maxid)+1;
                    //echo $ultimo;
        
                    $resultado = $db->prepare($sql);
        
                    $resultado->bindParam(':idcaracteristicas', intval($ultimo));
                    $resultado->bindParam(':clave_predio',$this->clave_predio);
                    $resultado->bindParam(':idubicacion',intval($this->idubicacion));
                    $resultado->bindParam(':ocupacion',$this->ocupacion);
                    $resultado->bindParam(':manzana_locacion',$this->manzana_locacion);
                    $resultado->bindParam(':forma',$this->forma);
                    $resultado->bindParam(':topografia',$this->topografia);
                    $resultado->bindParam(':cobertura_nativa',$this->cobertura_nativa);
                    $resultado->bindParam(':ecosistema',$this->ecosistema);
                    $resultado->bindParam(':afectaciones',$this->afectaciones);
                    $resultado->bindParam(':riesgos',$this->riesgos);
                    $resultado->bindParam(':calidad_suelo',$this->calidad_suelo);
        
                    $resultado->execute();
                    echo json_encode("Nueva característica de lote guardada exitosamente", JSON_UNESCAPED_UNICODE);
        
                    $resultado = null;
                    $db = null;

                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';

                }
            }


            // PUT Actualizar características del lote por ID
            public function actualizarCaracteristicas($id){
    
                
                $id_caracteristicas = intval($id);        
                $sql = "UPDATE caracteristicas_lote SET            
                        
                        clt_clave_predio=:clave_predio,
                        clt_idubicacion=:idubicacion,
                        clt_ocupacion=:ocupacion,
                        clt_localizacion_manzana=:manzana_locacion,
                        clt_forma=:forma,
                        clt_topografia=:topografia,
                        clt_cobertura_nativa_predominante=:cobertura_nativa,
                        clt_ecosistema_relevante=:ecosistema,
                        clt_afectaciones=:afectaciones,
                        clt_riesgos=:riesgos,
                        clt_calidad_suelo=:calidad_suelo                        
                        WHERE clt_idcaracteristicas_lote=:idcaracteristicas";
                try {
                    $db = new db();
                    $db = $db->conexionDB();
                    $resultado = $db->prepare($sql);
        
                    $resultado->bindParam(':idcaracteristicas', intval($id_caracteristicas));                    
                    $resultado->bindParam(':clave_predio',$this->clave_predio);
                    $resultado->bindParam(':idubicacion',intval($this->idubicacion));
                    $resultado->bindParam(':ocupacion',$this->ocupacion);
                    $resultado->bindParam(':manzana_locacion',$this->manzana_locacion);
                    $resultado->bindParam(':forma',$this->forma);
                    $resultado->bindParam(':topografia',$this->topografia);
                    $resultado->bindParam(':cobertura_nativa',$this->cobertura_nativa);
                    $resultado->bindParam(':ecosistema',$this->ecosistema);
                    $resultado->bindParam(':afectaciones',$this->afectaciones);
                    $resultado->bindParam(':riesgos',$this->riesgos);
                    $resultado->bindParam(':calidad_suelo',$this->calidad_suelo);;
        
                    $resultado->execute();
                    echo json_encode("Características del lote actualizadas exitosamente", JSON_UNESCAPED_UNICODE);
        
                    $resultado = null;
                    $db = null;

                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';

                }
            }


            // DELETE Borrar caracteristicas de lote por ID
            public static function eliminarCaracteristicas($id){
    
    
                $id_caracteristicas = intval($id);        
                $sql = "DELETE FROM caracteristicas_lote WHERE clt_idcaracteristicas_lote=:idcaracteristicas";
                try {
                    $db = new db();
                    $db = $db->conexionDB();
                    $resultado = $db->prepare($sql);        
        
                    $resultado->bindParam(':idcaracteristicas', intval($id_caracteristicas));
                    $resultado->execute();

                    if ($resultado->rowCount() > 0){
                        echo json_encode("Características del lote eliminada exitosamente", JSON_UNESCAPED_UNICODE);
                    }else {
                        echo json_encode("No existen características de lote con este ID", JSON_UNESCAPED_UNICODE);
                    }                     
        
                    $resultado = null;
                    $db = null;

                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';
                }
            }

























}



?>