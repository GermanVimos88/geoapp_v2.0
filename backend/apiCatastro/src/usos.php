<?php

include_once ("./src/db.php");

class Usos {

    //private $iduso;
    private $clave_predio;
    private $uso_principal;
    private $uso_secundario;
    private $descripcion;

            function __construct($upd_clave_predio,$upd_uso_principal,$upd_uso_secundario,$upd_descripcion)
            {
                    
                $this->clave_predio = $upd_clave_predio;
                $this->uso_principal =$upd_uso_principal; 
                $this->uso_secundario = $upd_uso_secundario;  
                $this->descripcion =  $upd_descripcion; 
            }


        // GET Todos los usos de cada predio
        public static function todosUsos(){
            //echo "TODOS LOS USOS DE PREDIOS";
            $sql = "SELECT * FROM uso_predio";
            //$rs = "SELECT MAX(upd_iduso_predio) AS maxid from uso_predio"; // UltimoRegistro
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                //$last_id = $db->query($rs);  // UltimoRegistro
                $json = [];
        

                if ($resultado->rowCount() > 0){
                    $uso = $resultado->fetchAll(PDO::FETCH_OBJ);
            
                    //Obtiene el último registro en base al mayor id de la tabla
                    //$maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                    //$ultimo = intval($maxid[0]->maxid)+1;
                    //echo $ultimo;
                    ////////////////////////////////////////////////////////////////

                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("iduso_predio"=>intval($uso[$i]->upd_iduso_predio),
                            "clave_predio"=>$uso[$i]->upd_clave_predio,
                            "uso_principal"=>$uso[$i]->upd_uso_principal,
                            "uso_secundario"=>$uso[$i]->upd_uso_secundario,
                            "descripcion"=>$uso[$i]->upd_descripcion                    
                            );
                
                        $json[] = $ejemplo;
                    }
        
        
                        echo json_encode($json, JSON_UNESCAPED_UNICODE);

                        //echo json_encode($uso, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existen usos de predio registradas en la BD");
                }
                    $resultado = null;
                    $db = null;

            }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';
            }

        }

        // GET Recuperar uso de predio por ID
        public static function verUso($id){
            $id_uso = intval($id);
            $sql = "SELECT * FROM uso_predio WHERE upd_iduso_predio = $id_uso";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                $json = [];

                if ($resultado->rowCount() > 0){
                    $uso = $resultado->fetchAll(PDO::FETCH_OBJ);
                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("iduso_predio"=>intval($uso[$i]->upd_iduso_predio),
                                "clave_predio"=>$uso[$i]->upd_clave_predio,
                                "uso_principal"=>$uso[$i]->upd_uso_principal,
                                "uso_secundario"=>$uso[$i]->upd_uso_secundario,
                                "descripcion"=>$uso[$i]->upd_descripcion
                                );
                
                        $json[] = $ejemplo;
                    }        
        
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);
                    //echo json_encode($uso, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existen usos de predios en la BD con este ID");
                }
                    $resultado = null;
                    $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // POST Crear nuevo uso de predio  
        public function guardarUso(){
    
            $rs = "SELECT MAX(upd_iduso_predio) AS maxid from uso_predio"; // UltimoRegistro    
               
        
            $sql = "INSERT INTO uso_predio (upd_iduso_predio,upd_clave_predio,upd_uso_principal,upd_uso_secundario,upd_descripcion) VALUES
                    (:iduso_predio, :clave_predio, :uso_principal, :uso_secundario, :descripcion)";
            try {
                $db = new db();
                $db = $db->conexionDB();        
                $last_id = $db->query($rs); // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
        
                $resultado = $db->prepare($sql);
                $resultado->bindParam(':iduso_predio', intval($ultimo));
                $resultado->bindParam(':clave_predio',$this->clave_predio);
                $resultado->bindParam(':uso_principal',$this->uso_principal);
                $resultado->bindParam(':uso_secundario',$this->uso_secundario);
                $resultado->bindParam(':descripcion',$this->descripcion);
        
                $resultado->execute();
                echo json_encode("Nueva uso de predio guardado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }
        }


        // PUT Actualizar uso de predio por ID
        public function actualizarUso($id){
                
            $id_uso = intval($id);        
            $sql = "UPDATE uso_predio SET            
                    
                    upd_uso_principal=:uso_principal,
                    upd_uso_secundario=:uso_secundario,
                    upd_descripcion=:descripcion                        
                    WHERE upd_iduso_predio=:iduso_predio";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);
                                
                $resultado->bindParam(':iduso_predio', intval($id_uso));
                //$resultado->bindParam(':clave_predio',$this->clave_predio);
                $resultado->bindParam(':uso_principal',$this->uso_principal);
                $resultado->bindParam(':uso_secundario',$this->uso_secundario);
                $resultado->bindParam(':descripcion',$this->descripcion); 
        
                $resultado->execute();
                echo json_encode("Uso de predio actualizado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // DELETE Borrar ubicacion por ID
        public static function eliminarUso($id){
        
            $id_uso = intval($id);        
            $sql = "DELETE FROM uso_predio WHERE upd_iduso_predio=:iduso_predio";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);        
        
                $resultado->bindParam(':iduso_predio', $id_uso);
                $resultado->execute();

                if ($resultado->rowCount() > 0){
                    echo json_encode("Uso de predio eliminado exitosamente", JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe uso de predio con este ID", JSON_UNESCAPED_UNICODE);
                }                     
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }
        }
}
?>