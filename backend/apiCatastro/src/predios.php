<?php 

include_once ("../src/db.php");

class Predio{

    //private $idpredio;
      private $idpropietario ;    
      private $identificacion ;  
      private $tipo ;                                
      private $clavecatastral ;                                
      //private $claveanterior ;                          
      private $regimen ;  
      private $bloque ;
      private $piso ;
      private $unidad ;
      //private $numero ;


        function __construct($idpropietario,$cedula,$tipo,$clave_catastral,$regimen,$bloque,$piso,$unidad){
            $this->idpropietario = $idpropietario;
            $this->identificacion = $cedula;
            $this->tipo = $tipo;
            $this->clavecatastral = $clave_catastral;
            //$this->claveanterior = $claveanterior;
            $this->regimen = $regimen;
            $this->bloque = $bloque;
            $this->piso = $piso;
            $this->unidad = $unidad;
            //$this->numero = $numero;

        }
        /*
        public function getIdpropietario(){
            return $this->idpropietario;
        }        
        //@return self
        public function setIdpropietario($idpropietario){
            $this->idpropietario = $idpropietario;
            return $this;
        }
        public function getIdentificacion(){
            return $this->identificacion;
        }
        public function setIdentificacion($identificacion){
            $this->identificacion = $identificacion;
            return $this;
        }
        public function getTipo(){
            return $this->tipo;
        }
        public function setTipo($tipo){
            $this->tipo = $tipo;
            return $this;
        }
        public function getClavecatastral(){
            return $this->clavecatastral;
        }
        public function setClavecatastral($clavecatastral){
            $this->clavecatastral = $clavecatastral;
            return $this;
        }
        public function getClaveanterior(){
            return $this->claveanterior;
        }
        public function setClaveanterior($claveanterior){
            $this->claveanterior = $claveanterior;
            return $this;
        }

        public function getRegimen(){
            return $this->regimen;
        }
        public function setRegimen($regimen){
            $this->regimen = $regimen;
            return $this;
        }

        public function getBoque(){
            return $this->bloque;
        }
        public function setBloque($bloque){
            $this->bloque = $bloque;
            return $this;
        }

        public function getPiso(){
            return $this->piso;
        }
        public function setPiso($piso){
            $this->piso = $piso;
            return $this;
        }

        public function getUnidad(){
            return $this->unidad;
        }
        public function setUnidad($unidad){
            $this->unidad = $unidad;
            return $this;
        }
        public function getNumero(){
            return $this->numero;
        }
        public function setNumero($numero){
            $this->numero = $numero;
            return $this;
        }
        */

        public function __toString()
        {
            return $this->idpropietario." ".$this->clavecatastral;
        }

        //CRUD


        //GET Todos los predios
        public static function verPredios(){            

        $sql = "SELECT * FROM predio";
        
        try {
        $db = new db();
        $db = $db->conexionDB();
        $resultado = $db->query($sql);
        $json = [];

        if ($resultado->rowCount() > 0){
            $predios = $resultado->fetchAll(PDO::FETCH_OBJ);                        
            
            //echo $predios[0]->prd_identificacion;

            for($i=0;$i<$resultado->rowCount();$i++) {
                $ejemplo = array("idpredio"=>intval($predios[$i]->prd_idpredio),                                
                                "idpropietario"=>intval($predios[$i]->prd_idpropietario),
                                "identificacion"=>$predios[$i]->prd_identificacion,
                                "tipo"=>$predios[$i]->prd_tipo,
                                "clavecatastral"=>$predios[$i]->prd_clave_catastral,
                                "claveanterior"=>$predios[$i]->prd_clave_anterior,
                                "regimen"=>$predios[$i]->prd_regimen_tenencia,
                                "bloque"=>$predios[$i]->prd_bloque,
                                "piso"=>$predios[$i]->prd_piso,
                                "unidad"=>$predios[$i]->prd_unidad,
                                "numero"=>$predios[$i]->prd_numero_predio                                     
                                );  

                $json[] = $ejemplo;        
            }
            echo json_encode($json, JSON_UNESCAPED_UNICODE); 
            //header("HTTP/1.1 200 OK");            
            //echo json_encode($ejemplo, JSON_UNESCAPED_UNICODE);
            //echo json_encode($predios, JSON_UNESCAPED_UNICODE);
        }else {
            echo json_encode("No existen predios en la BD");
        }
        $resultado = null;
        $db = null;

    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}';
    }
}


// GET Recuperar predio por ID
public static function verPredio($id){
    $id_predio = $id;  //$request->getAttribute('id');    
    $sql = "SELECT * FROM predio WHERE prd_idpredio = $id_predio";
    try {
        $db = new db();
        $db = $db->conexionDB();
        $resultado = $db->query($sql);
        $json = [];

        if ($resultado->rowCount() > 0){
            $predios = $resultado->fetchAll(PDO::FETCH_OBJ);

            
            $ejemplo = array( "idpredio"=>intval($predios[0]->prd_idpredio),            
                                "idpropietario"=>intval($predios[0]->prd_idpropietario),
                                "identificacion"=>$predios[0]->prd_identificacion,
                                "tipo"=>$predios[0]->prd_tipo,
                                "clavecatastral"=>$predios[0]->prd_clave_catastral,
                                "claveanterior"=>$predios[0]->prd_clave_anterior,
                                "regimen"=>$predios[0]->prd_regimen_tenencia,
                                "bloque"=>$predios[0]->prd_bloque,
                                "piso"=>$predios[0]->prd_piso,
                                "unidad"=>$predios[0]->prd_unidad,
                                "numero"=>$predios[0]->prd_numero_predio       
                                );  

            $json[] = $ejemplo;        
                
            echo json_encode($json, JSON_UNESCAPED_UNICODE);                        
            
            //echo json_encode($predios, JSON_UNESCAPED_UNICODE);
        }else {
            echo json_encode("No existen predios en la BD con este ID");
        }
        $resultado = null;
        $db = null;

    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}';

    }


}



// POST Crear nuevo predio 
public function guardarPredio(){    
        
    $rs = "SELECT MAX(prd_idpredio) AS maxid from predio"; // UltimoRegistro    
            
    $sql = "INSERT INTO predio (prd_idpredio,prd_idpropietario,prd_identificacion,prd_tipo,prd_clave_catastral,prd_regimen_tenencia,prd_bloque,prd_piso,prd_unidad) VALUES
            (:idpredio, :idpropietario, :identificacion, :tipo, :clavecatastral,:regimen, :bloque, :piso, :unidad)";
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

        $resultado->bindParam(':idpredio', intval($ultimo));
        $resultado->bindParam(':idpropietario', intval($this->idpropietario));
        $resultado->bindParam(':identificacion', $this->identificacion);
        $resultado->bindParam(':tipo', $this->tipo);
        $resultado->bindParam(':clavecatastral', $this->clavecatastral);
       // $resultado->bindParam(':claveanterior', $this->claveanterior);
        $resultado->bindParam(':regimen', $this->regimen);
        $resultado->bindParam(':bloque', $this->bloque);
        $resultado->bindParam(':piso', $this->piso);
        $resultado->bindParam(':unidad', $this->unidad);
        //$resultado->bindParam(':numero', $this->numero);


        $resultado->execute();
        echo json_encode("Nuevo predio guardado exitosamente");
        
        $resultado = null;
        $db = null;

    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}';

    }

}

// PUT Actualizar predio por ID                                 //prd_clave_anterior=:claveanterior,
                                                                //prd_numero_predio=:numero           
    
    public function actualizarPredio($id){

    //$predio = json_decode($request->getBody());
    $id_predio = $id;
    $sql = "UPDATE predio SET            
            prd_idpropietario=:idpropietario,
            prd_identificacion=:identificacion,
            prd_tipo=:tipo,
            prd_clave_catastral=:clavecatastral,
            
            prd_regimen_tenencia=:regimen,
            prd_bloque=:bloque,
            prd_piso=:piso,
            prd_unidad=:unidad
            
            WHERE prd_idpredio=:idpredio";
    try {
        $db = new db();
        $db = $db->conexionDB();
        $resultado = $db->prepare($sql);
        
        $resultado->bindParam(':idpropietario', intval($this->idpropietario));
        $resultado->bindParam(':identificacion', $this->identificacion);
        $resultado->bindParam(':tipo', $this->tipo);
        $resultado->bindParam(':clavecatastral', $this->clavecatastral);
        //$resultado->bindParam(':claveanterior', $this->claveanterior);
        $resultado->bindParam(':regimen', $this->regimen);
        $resultado->bindParam(':bloque', $this->bloque);
        $resultado->bindParam(':piso', $this->piso);
        $resultado->bindParam(':unidad', $this->unidad);
        //$resultado->bindParam(':numero', $this->numero);
        $resultado->bindParam(':idpredio', $id_predio);
        
        $resultado->execute();
        echo json_encode("Predio actualizado exitosamente");
        
        $resultado = null;
        $db = null;

    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}';

    }

}


// DELETE Borrar predio por ID
public static function eliminarPredio($id) {
    
    
    $id_predio = $id;        
    $sql = "DELETE FROM predio WHERE prd_idpredio=:idpredio";
    try {
        $db = new db();
        $db = $db->conexionDB();
        $resultado = $db->prepare($sql);        
        
        $resultado->bindParam(':idpredio', $id_predio);
        $resultado->execute();

        if ($resultado->rowCount() > 0){
            echo json_encode("Predio eliminado exitosamente");
        }else {
            echo json_encode("No existe predio con este ID");
        }                     
        
        $resultado = null;
        $db = null;

    }catch(PDOException $e){
        echo '{"error" : {"text":'.$e->getMessage().'}';

    }

}




        









}









/*
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('content-type: application/json; charset=utf-8');

*/
