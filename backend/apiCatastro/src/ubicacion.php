<?php

include_once ("../src/db.php");

class Ubicacion {

    //private $idubicacion;
    private $clave_predio;
    private $eje_principal;
    private $placa_predial;
    private $eje_secundario;
    private $nombre;
    private $sector;


            function __construct($clave,$ejeprincipal,$placa,$ejesecundario,$nombre,$sector)
            {   
                $this->clave_predio = $clave;
                $this->eje_principal = $ejeprincipal;
                $this->placa_predial = $placa;
                $this->eje_secundario = $ejesecundario;
                $this->nombre = $nombre;
                $this->sector = $sector;
                
            }

    // CRUD

    // GET Todos las ubicaciones

    public static function verUbicaciones(){


        $sql = "SELECT * FROM ubicacion";
        //$rs = "SELECT MAX(ubc_idubicacion) AS maxid from ubicacion"; // UltimoRegistro
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->query($sql);
            //$last_id = $db->query($rs);  // UltimoRegistro
            $json = [];
        

            if ($resultado->rowCount() > 0){
                $ubicacion = $resultado->fetchAll(PDO::FETCH_OBJ);
            
                //Obtiene el último registro en base al mayor id de la tabla
                //$maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                //$ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
                ////////////////////////////////////////////////////////////////

                for($i=0;$i<$resultado->rowCount();$i++) {
                    $ejemplo = array("idubicacion"=>intval($ubicacion[$i]->ubc_idubicacion),
                    "clave_predio"=>$ubicacion[$i]->ubc_clave_predio,
                    "eje_principal"=>$ubicacion[$i]->ubc_eje_principal,
                    "codigo_placa"=>$ubicacion[$i]->ubc_codigo_placa_predial,
                    "eje_secundario"=>$ubicacion[$i]->ubc_eje_secundario,
                    "nombre_predio"=>$ubicacion[$i]->ubc_nombre_predio,
                    "sector"=>$ubicacion[$i]->ubc_sector);
                
                    $json[] = $ejemplo;
                }
        
        
                echo json_encode($json, JSON_UNESCAPED_UNICODE);

                //echo json_encode($ubicacion, JSON_UNESCAPED_UNICODE);
            }else {
                echo json_encode("No existen ubicaciones registradas en la BD");
            }
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }


    // GET Recuperar ubicacion por ID

    public static function verUbicacion($id){
        $id_ubicacion = $id;
        $sql = "SELECT * FROM ubicacion WHERE ubc_idubicacion = $id_ubicacion";
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->query($sql);
            $json = [];

            if ($resultado->rowCount() > 0){
                $ubicacion = $resultado->fetchAll(PDO::FETCH_OBJ);
                for($i=0;$i<$resultado->rowCount();$i++) {
                    $ejemplo = array("idubicacion"=>intval($ubicacion[$i]->ubc_idubicacion),
                        "clave_predio"=>$ubicacion[$i]->ubc_clave_predio,
                        "eje_principal"=>$ubicacion[$i]->ubc_eje_principal,
                        "codigo_placa"=>$ubicacion[$i]->ubc_codigo_placa_predial,
                        "eje_secundario"=>$ubicacion[$i]->ubc_eje_secundario,
                        "nombre_predio"=>$ubicacion[$i]->ubc_nombre_predio,
                        "sector"=>$ubicacion[$i]->ubc_sector);
                
                    $json[] = $ejemplo;
                }        
        
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                //echo json_encode($ubicacion, JSON_UNESCAPED_UNICODE);
            }else {
                echo json_encode("No existen ubicaciones de predios en la BD con este ID");
            }
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';

        }

    }


    // POST Crear nueva ubicacion 
    public function guardarUbicacion(){
    
        $rs = "SELECT MAX(ubc_idubicacion) AS maxid from ubicacion"; // UltimoRegistro        
                
        $sql = "INSERT INTO ubicacion (ubc_idubicacion,ubc_clave_predio,ubc_eje_principal,ubc_codigo_placa_predial,ubc_eje_secundario,ubc_nombre_predio,ubc_sector) VALUES
            (:idubicacion, :clave_predio, :eje_principal, :codigo_placa, :eje_secundario, :nombre_predio, :sector)";
        try {
            $db = new db();
            $db = $db->conexionDB();        
            $last_id = $db->query($rs); // UltimoRegistro
            //Obtiene el último registro en base al mayor id de la tabla
            $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
            $ultimo = intval($maxid[0]->maxid)+1;
            //echo $ultimo;
    
            $resultado = $db->prepare($sql);
            $resultado->bindParam(':idubicacion', intval($ultimo));
            $resultado->bindParam(':clave_predio', $this->clave_predio);
            $resultado->bindParam(':eje_principal', $this->eje_principal);
            $resultado->bindParam(':codigo_placa', $this->placa_predial);
            $resultado->bindParam(':eje_secundario', $this->eje_secundario);
            $resultado->bindParam(':nombre_predio', $this->nombre);
            $resultado->bindParam(':sector', $this->sector);  

            $resultado->execute();
            echo json_encode("Nueva ubicación guardada exitosamente", JSON_UNESCAPED_UNICODE);
        
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }


    // PUT Actualizar ubicacion por ID
    public function actualizarUbicacion($id){    
    
        $id_ubicacion = $id;
        $sql = "UPDATE ubicacion SET            
                ubc_clave_predio=:clave_predio,
                ubc_eje_principal=:eje_principal,
                ubc_codigo_placa_predial=:codigo_placa,
                ubc_eje_secundario=:eje_secundario,
                ubc_nombre_predio=:nombre_predio,
                ubc_sector=:sector         
                WHERE ubc_idubicacion=:idubicacion";
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->prepare($sql);
                
            $resultado->bindParam(':clave_predio',$this->clave_predio);           
            $resultado->bindParam(':eje_principal',$this->eje_principal);
            $resultado->bindParam(':codigo_placa',$this->placa_predial);  
            $resultado->bindParam(':eje_secundario',$this->eje_secundario);
            $resultado->bindParam(':nombre_predio',$this->nombre);
            $resultado->bindParam(':sector',$this->sector); 
            $resultado->bindParam(':idubicacion',$id_ubicacion);
            $resultado->execute();
            echo json_encode("Ubicación actualizada exitosamente", JSON_UNESCAPED_UNICODE);
        
            $resultado = null;
            $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }

    }

    // DELETE Borrar ubicacion por ID
    
    public static function eliminarUbicacion($id){
    
        $id_ubicacion = $id;
        $sql = "DELETE FROM ubicacion WHERE ubc_idubicacion=:idubicacion";
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->prepare($sql);        
        
            $resultado->bindParam(':idubicacion', $id_ubicacion);
            $resultado->execute();

            if ($resultado->rowCount() > 0){
                echo json_encode("Ubicación eliminada exitosamente", JSON_UNESCAPED_UNICODE);
            }else {
                echo json_encode("No existe ubicación con este ID", JSON_UNESCAPED_UNICODE);
            }                     
        
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }

}

?>