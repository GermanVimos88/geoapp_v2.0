<?php

include_once ("./src/db.php");

class UsoOpciones {

    //private $iduso_opcion;
    private $clave_predio;
    private $iduso;
    private $descripcion;

            function __construct($clave,$iduso,$descripcion)
            {
                $this->clave_predio = $clave;
                $this->iduso = $iduso;
                $this->descripcion = $descripcion;                
            }

    

        // GET Todos las opciones de uso de cada predio
        public static function todasOpcionesUso(){
            //echo "TODOS LAS OPCIONES DE USO DE PREDIOS";
            $sql = "SELECT * FROM uso_predio_opciones";
            //$rs = "SELECT MAX(upo_iduso_predio_opciones) AS maxid from uso_predio_opciones"; // UltimoRegistro
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
                        $ejemplo = array("iduso_opciones"=>intval($uso[$i]->upo_iduso_predio_opciones),
                                "clave_predio"=>$uso[$i]->upo_clave_predio,
                                "iduso_predio"=>intval($uso[$i]->upo_iduso_predio),                    
                                "descripcion"=>$uso[$i]->upo_descripcion                    
                                );

                        $json[] = $ejemplo;
                    }       
                        echo json_encode($json, JSON_UNESCAPED_UNICODE);
                        //echo json_encode($uso, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existen opciones de usos por predio registradas en la BD");
                }
                    $resultado = null;
                    $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }
        }

        // GET Recuperar opciones de uso predio por ID
        public static function verOpcionesUso($id){
            $id_uso = intval($id);    
            $sql = "SELECT * FROM uso_predio_opciones WHERE upo_iduso_predio_opciones = $id_uso";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                $json = [];

                if ($resultado->rowCount() > 0){
                    $uso = $resultado->fetchAll(PDO::FETCH_OBJ);
                    for($i=0;$i<$resultado->rowCount();$i++) {
                            $ejemplo = array("iduso_opciones"=>intval($uso[$i]->upo_iduso_predio_opciones),
                                    "clave_predio"=>$uso[$i]->upo_clave_predio,
                                    "iduso_predio"=>intval($uso[$i]->upo_iduso_predio),                    
                                    "descripcion"=>$uso[$i]->upo_descripcion                    
                                    );
                
                            $json[] = $ejemplo;
                            }        
        
                        echo json_encode($json, JSON_UNESCAPED_UNICODE);
                        //echo json_encode($uso, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existen opciones de usos de predios en la BD con este ID");
                }
                    $resultado = null;
                    $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }

        // POST Crear nuevo uso de predio  
        public function guardarOpcionUso(){
    
            $rs = "SELECT MAX(upo_iduso_predio_opciones) AS maxid from uso_predio_opciones"; // UltimoRegistro    
                        
            $sql = "INSERT INTO uso_predio_opciones (upo_iduso_predio_opciones,upo_clave_predio,upo_iduso_predio,upo_descripcion) VALUES
                    (:iduso_opciones, :clave_predio, :iduso_predio, :descripcion)";
            try {
                $db = new db();
                $db = $db->conexionDB();        
                $last_id = $db->query($rs); // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
        
                $resultado = $db->prepare($sql);
                $resultado->bindParam(':iduso_opciones', intval($ultimo));
                $resultado->bindParam(':clave_predio', $this->clave_predio);
                $resultado->bindParam(':iduso_predio', intval($this->iduso));
                $resultado->bindParam(':descripcion', $this->descripcion);       
        
                $resultado->execute();
                echo json_encode("Nueva opción de uso de predio guardado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }

        // PUT Actualizar uso de predio por ID
        public function actualizarOpcionUso($id){
                
            $id_uso = intval($id);        
            $sql = "UPDATE uso_predio_opciones SET            
                    upo_clave_predio=:clave_predio,
                    upo_iduso_predio=:iduso_predio,
                    upo_descripcion=:descripcion            
                    WHERE upo_iduso_predio_opciones=:iduso_opciones";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);
                
                //$resultado->bindParam(':iduso_opciones', intval($ultimo));
                $resultado->bindParam(':iduso_opciones', intval($id_uso));
                $resultado->bindParam(':clave_predio', $this->clave_predio);
                $resultado->bindParam(':iduso_predio', intval($this->iduso));
                $resultado->bindParam(':descripcion', $this->descripcion); 
        
                $resultado->execute();
                echo json_encode("Opción de uso de predio actualizado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }
        }


        // DELETE Borrar ubicacion por ID
        public static function eliminarOpcionUso($id){
        
            $id_uso = intval($id);        
            $sql = "DELETE FROM uso_predio_opciones WHERE upo_iduso_predio_opciones=:iduso_opciones";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);        
        
                $resultado->bindParam(':iduso_opciones', $id_uso);
                $resultado->execute();

                if ($resultado->rowCount() > 0){
                    echo json_encode("Opción de uso de predio eliminado exitosamente", JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe opción de uso predio con este ID", JSON_UNESCAPED_UNICODE);
                }                     
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }
}

?>