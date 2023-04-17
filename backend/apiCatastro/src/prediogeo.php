<?php

include_once ("./src/db.php");

class Prediogeo {

    //private $id;
    //private $clave_catastral;
    private $shape;
    
            function __construct($shape)
            {                    
                //$this->id = $usr_id;
                //$this->clave_catastral =$clavecatastral; 
                $this->shape = $shape;
            }


        // GET Todos los prediosgeo
        public static function todosPrediosgeo(){
            //echo "TODOS LOS PREDIOSGEO";
            $sql = "SELECT * FROM prediogeo";
            //$rs = "SELECT MAX(id) AS maxid from prediogeo"; // UltimoRegistro
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                //$last_id = $db->query($rs);  // UltimoRegistro
                $json = [];
        

                if ($resultado->rowCount() > 0){
                    $prediojson = $resultado->fetchAll(PDO::FETCH_OBJ);            
                    
                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("id"=>intval($prediojson[$i]->id),
                            "clavecatastral"=>$prediojson[$i]->clavecatastral,
                            "shape"=>json_decode($prediojson[$i]->shape, true)
                            );
                
                        $json[] = $ejemplo;
                    }        
        
                        echo json_encode($json, JSON_PRETTY_PRINT);
                        
                }else {
                    echo json_encode("No existen prediosgeo registrados en la BD");
                }
                    $resultado = null;
                    $db = null;

            }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';
            }

        }

        // GET Recuperar prediogeo por clave
        public static function verPrediosgeo($clave){
            //$usr = "'".$username."'";            
            $sql = "SELECT * FROM prediogeo WHERE clavecatastral = $clave";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                $json = [];

                if ($resultado->rowCount() > 0){
                    $prediojson = $resultado->fetchAll(PDO::FETCH_OBJ);
                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("id"=>intval($prediojson[$i]->id),
                                "clavecatastral"=>$prediojson[$i]->clavecatastral,
                                "shape"=>json_decode($prediojson[$i]->shape, true)
                                );
                
                        $json[] = $ejemplo;
                    }        
        
                    echo json_encode($json, JSON_PRETTY_PRINT);
                    //echo json_encode($uso, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("");
                }
                    $resultado = null;
                    $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // POST Crear nuevo prediogeo  
        public function guardarPrediogeo(){
    
            $rs = "SELECT MAX(id) AS maxid from prediogeo"; // UltimoRegistro 
        
            $sql = "INSERT INTO prediogeo (id,clavecatastral,shape) VALUES
                    (:id, :clavecatastral, :shape)";
            try {
                $db = new db();
                $db = $db->conexionDB();        
                $last_id = $db->query($rs); // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
                $usr = "'".$username."'";
        
                $resultado = $db->prepare($sql);
                $resultado->bindParam(':id', intval($ultimo));
                $resultado->bindParam(':clavecatastral',$this->clave_catastral);
                $resultado->bindParam(':shape',json_decode($this->shape, true));        
                $resultado->execute();
                echo json_encode("Nuevo prediogeo guardado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }
        }


        // PUT Actualizar prediogeo por clave catastral
        public function actualizarPrediogeo($clave){
                               
            $sql = "UPDATE prediogeo SET                    
                    shape=:shape                        
                    WHERE clavecatastral=:clavecatastral";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);
                                           
                $resultado->bindParam(':clavecatastral',$clave);
                $resultado->bindParam(':shape',json_encode($this->shape, true));//json_decode
                $resultado->execute();
                echo json_encode("Prediogeo actualizado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // DELETE Borrar prediogeo por clavecatastral
        public static function eliminarPrediogeo($clave){
                    
            $sql = "DELETE FROM prediogeo WHERE clavecatastral=:clavecatastral";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);        
        
                $resultado->bindParam(':clavecatastral', $clave);
                $resultado->execute();

                if ($resultado->rowCount() > 0){
                    echo json_encode("Prediogeo eliminado exitosamente", JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe prediogeo con este ID", JSON_UNESCAPED_UNICODE);
                }                     
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }
        }
}
?>