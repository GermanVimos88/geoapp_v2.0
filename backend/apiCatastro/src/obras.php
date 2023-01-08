<?php

include_once ("../src/db.php");

class Obras {

    //private $idobras;
    private $clave_predio;
    private $idubicacion;
    private $idinfraestructura;
    private $tipo_obra;
    private $dimension_a;
    private $dimension_b;
    private $dimension_c;
    private $cantidad_metros;
    private $material;
    private $edad;
    private $estado;

        function __construct($obc_clave_predio,$obc_idubicacion,$obc_idinfraestructura,$obc_tipo_obra,$obc_dimension_a,$obc_dimension_b,$obc_dimension_c,$obc_cantidad_metros,$obc_material,$obc_edad,$obc_estado)
        {
            $this->clave_predio = $obc_clave_predio;
            $this->idubicacion = $obc_idubicacion;
            $this->idinfraestructura = $obc_idinfraestructura;
            $this->tipo_obra = $obc_tipo_obra;
            $this->dimension_a = $obc_dimension_a;
            $this->dimension_b = $obc_dimension_b;
            $this->dimension_c = $obc_dimension_c;
            $this->cantidad_metros = $obc_cantidad_metros;
            $this->material = $obc_material;
            $this->edad = $obc_edad;
            $this->estado = $obc_estado;
            
        }

    // CRUD

    // GET Todos los datos de obras complementarias por cada predio
    public static function todasObras(){
    
        $sql = "SELECT * FROM obras_complementarias";
        //$rs = "SELECT MAX(obc_idobras_complementarias) AS maxid from obras_complementarias"; // UltimoRegistro
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->query($sql);
            //$last_id = $db->query($rs);  // UltimoRegistro
            $json = [];
        

            if ($resultado->rowCount() > 0){
                $obras = $resultado->fetchAll(PDO::FETCH_OBJ);
            
                //Obtiene el último registro en base al mayor id de la tabla
                //$maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                //$ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
                ////////////////////////////////////////////////////////////////

                for($i=0;$i<$resultado->rowCount();$i++) {
                    $ejemplo = array("idobras"=>intval($obras[$i]->obc_idobras_complementarias),
                                "clave_predio"=>$obras[$i]->obc_clave_predio,
                                "idubicacion"=>intval($obras[$i]->obc_idubicacion),                    
                                "idinfraestructura"=>intval($obras[$i]->obc_idinfraestructura),
                                "tipo_obra"=>$obras[$i]->obc_tipo_obra,
                                "dimension_a"=>$obras[$i]->obc_dimension_a,
                                "dimension_b"=>$obras[$i]->obc_dimension_b,
                                "dimension_c"=>$obras[$i]->obc_dimension_c,
                                "cantidad_metros"=>$obras[$i]->obc_cantidad_metros,
                                "material"=>$obras[$i]->obc_material,
                                "edad"=>$obras[$i]->obc_edad,
                                "estado"=>$obras[$i]->obc_estado    
                                );

                    $json[] = $ejemplo;
                }        
        
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);

                    //echo json_encode($obras, JSON_UNESCAPED_UNICODE);
            }else {
                    echo json_encode("No existen obras complementarias de predios registradas en la BD");
            }
                $resultado = null;
                $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }


    // GET Recuperar obras complementarias de predio por ID
    public static function verObra($id){
        $id_obras = intval($id);    
        //$sql = "SELECT * FROM obras_complementarias WHERE obc_idobras_complementarias = $id_obras";  --> ID Obras Complementarias
          $sql = "SELECT * FROM obras_complementarias WHERE obc_idubicacion = $id_obras"; // --> ID Ubicacion/ID Predio
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->query($sql);
            $json = [];

            if ($resultado->rowCount() > 0){
                $obras = $resultado->fetchAll(PDO::FETCH_OBJ);
                for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("idobras"=>intval($obras[$i]->obc_idobras_complementarias),
                                    "clave_predio"=>$obras[$i]->obc_clave_predio,
                                    "idubicacion"=>intval($obras[$i]->obc_idubicacion),                    
                                    "idinfraestructura"=>intval($obras[$i]->obc_idinfraestructura),
                                    "tipo_obra"=>$obras[$i]->obc_tipo_obra,
                                    "dimension_a"=>$obras[$i]->obc_dimension_a,
                                    "dimension_b"=>$obras[$i]->obc_dimension_b,
                                    "dimension_c"=>$obras[$i]->obc_dimension_c,
                                    "cantidad_metros"=>$obras[$i]->obc_cantidad_metros,
                                    "material"=>$obras[$i]->obc_material,
                                    "edad"=>$obras[$i]->obc_edad,
                                    "estado"=>$obras[$i]->obc_estado                
                                    );
                
                        $json[] = $ejemplo;
                    }        
        
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                //echo json_encode($obras, JSON_UNESCAPED_UNICODE);
            }else {
                echo json_encode("No existe obras complementarias de predios en la BD con este ID");
            }
                $resultado = null;
                $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }



    // POST Crear nuevo obra complementaria de predio  
    public function guardarObra(){
    
        $rs = "SELECT MAX(obc_idobras_complementarias) AS maxid from obras_complementarias"; // UltimoRegistro    
    
                
        $sql = "INSERT INTO obras_complementarias (obc_idobras_complementarias,obc_clave_predio,obc_idubicacion,obc_idinfraestructura,obc_tipo_obra,obc_dimension_a,obc_dimension_b,obc_dimension_c,obc_cantidad_metros,obc_material,obc_edad,obc_estado) VALUES
            (:idobras,:clave_predio,:idubicacion,:idinfraestructura,:tipo_obra,:dimension_a,:dimension_b,:dimension_c,:cantidad_metros,:material,:edad,:estado)";
        try {
            $db = new db();
            $db = $db->conexionDB();        
            $last_id = $db->query($rs); // UltimoRegistro
            //Obtiene el último registro en base al mayor id de la tabla
            $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
            $ultimo = intval($maxid[0]->maxid)+1;
            //echo $ultimo;
       
            $resultado = $db->prepare($sql);
            $resultado->bindParam(':idobras', intval($ultimo));                                                              
            $resultado->bindParam(':clave_predio',$this->clave_predio);
            $resultado->bindParam(':idubicacion', intval($this->idubicacion));
            $resultado->bindParam(':idinfraestructura',intval($this->idinfraestructura));
            $resultado->bindParam(':tipo_obra',$this->tipo_obra);
            $resultado->bindParam(':dimension_a',$this->dimension_a);        
            $resultado->bindParam(':dimension_b',$this->dimension_b);
            $resultado->bindParam(':dimension_c',$this->dimension_c);
            $resultado->bindParam(':cantidad_metros',$this->cantidad_metros);
            $resultado->bindParam(':material',$this->material);
            $resultado->bindParam(':edad',$this->edad);
            $resultado->bindParam(':estado',$this->estado);      

            $resultado->execute();
            echo json_encode("Nueva obra complementaria de predio guardada exitosamente", JSON_UNESCAPED_UNICODE);
        
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }

    // PUT Actualizar obra complementaria de un predio por ID
    public function actualizarObra($id){
            
        $id_obras = intval($id);        
        $sql = "UPDATE obras_complementarias SET                                       
                obc_clave_predio=:clave_predio,
                obc_idubicacion=:idubicacion,
                obc_idinfraestructura=:idinfraestructura,
                obc_tipo_obra=:tipo_obra,
                obc_dimension_a=:dimension_a,
                obc_dimension_b=:dimension_b,
                obc_dimension_c=:dimension_c,
                obc_cantidad_metros=:cantidad_metros,
                obc_material=:material,
                obc_edad=:edad,
                obc_estado=:estado
                WHERE obc_idobras_complementarias=:idobras";
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->prepare($sql);           
        
            $resultado->bindParam(':idobras', intval($id_obras));                                                              
            $resultado->bindParam(':clave_predio',$this->clave_predio);
            $resultado->bindParam(':idubicacion', intval($this->idubicacion));
            $resultado->bindParam(':idinfraestructura',intval($this->idinfraestructura));
            $resultado->bindParam(':tipo_obra',$this->tipo_obra);
            $resultado->bindParam(':dimension_a',$this->dimension_a);        
            $resultado->bindParam(':dimension_b',$this->dimension_b);
            $resultado->bindParam(':dimension_c',$this->dimension_c);
            $resultado->bindParam(':cantidad_metros',$this->cantidad_metros);
            $resultado->bindParam(':material',$this->material);
            $resultado->bindParam(':edad',$this->edad);
            $resultado->bindParam(':estado',$this->estado);         
                        
            $resultado->execute();
            echo json_encode("Obra complementaria de predio actualizada exitosamente", JSON_UNESCAPED_UNICODE);
        
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }


    // DELETE Borrar obra complementaria de predio por ID
    public static function eliminarObra($id){
        
        $id_obras = intval($id);        
        $sql = "DELETE FROM obras_complementarias WHERE obc_idobras_complementarias=:idobras";
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->prepare($sql);        
        
            $resultado->bindParam(':idobras', $id_obras);
            $resultado->execute();

            if ($resultado->rowCount() > 0){
                echo json_encode("Obra complementaria de predio eliminada exitosamente", JSON_UNESCAPED_UNICODE);
            }else {
                echo json_encode("No existe obra complementaria de predio con este ID", JSON_UNESCAPED_UNICODE);
            }                     
        
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }

}

?>

