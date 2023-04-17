<?php 

include_once ("./src/db.php");

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

        //$sql = "SELECT * FROM predio";
        $sql = "SELECT prd_idpredio,prd_idpropietario,prd_clave_catastral,pro_identificacion,pro_primer_apellido
        ,pro_segundo_apellido,pro_primer_nombre,pro_tipo_propietario,pro_razon_social, prd_piso, prd_unidad
         FROM `predio`,`propietario` WHERE prd_idpropietario=pro_idpropietario";
        
        try {
        $db = new db();
        $db = $db->conexionDB();
        $resultado = $db->query($sql);
        $json = [];

        if ($resultado->rowCount() > 0){
            $predios = $resultado->fetchAll(PDO::FETCH_OBJ);                        
            
            //echo $predios[0]->prd_identificacion;

            for($i=0;$i<$resultado->rowCount();$i++) {
                $ejemplo = array( 
                                "idpredio"=>$predios[$i]->prd_idpredio,
                                "idpropietario"=>$predios[$i]->prd_idpropietario,
                                "clavecatastral"=>$predios[$i]->prd_clave_catastral,
                                "identificacion"=>$predios[$i]->pro_identificacion,
                                "primer_apellido"=>$predios[$i]->pro_primer_apellido,
                                "segundo_apellido"=>$predios[$i]->pro_segundo_apellido,
                                "primer_nombre"=>$predios[$i]->pro_primer_nombre,
                                "tipo_propietario"=>$predios[$i]->pro_tipo_propietario,
                                "razon_social"=>$predios[$i]->pro_razon_social,                                  
                                "piso"=>$predios[$i]->prd_piso,
                                "unidad"=>$predios[$i]->prd_unidad
                                );  
                                
                                /* 
                                
                                
                                "idpredio"=>intval($predios[$i]->prd_idpredio),                                
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
                                
                                
                                */


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
    
    $rs_legal = "SELECT MAX(elg_idestatus_legal) AS maxid from estatus_legal"; // UltimoRegistro       
    //$rs_inv = "SELECT MAX(inv_idinvestigacion_predial) AS maxid from investigacion_predial"; // UltimoRegistro       
    $rs_ubicacion = "SELECT MAX(ubc_idubicacion) AS maxid from ubicacion"; // UltimoRegistro       
    $rs_caracteristicas_lote = "SELECT MAX(clt_idcaracteristicas_lote) AS maxid from caracteristicas_lote"; // UltimoRegistro       
    //$rs_construccion = "SELECT MAX(cdc_idconstruccion_caracteristicas) AS maxid from construccion_caracteristicas"; // UltimoRegistro       
    $rs_uso = "SELECT MAX(upd_iduso_predio) AS maxid from uso_predio"; // UltimoRegistro       
    $rs_inf = "SELECT MAX(inf_idinfraestructura) AS maxid from infraestructura"; // UltimoRegistro       
    //$rs_obras = "SELECT MAX(obc_idobras_complementarias) AS maxid from obras_complementarias"; // UltimoRegistro       
    $rs_grafico = "SELECT MAX(grp_idgrafico_predio) AS maxid from grafico_predio"; // UltimoRegistro       
    $rs_prediogeo = "SELECT MAX(id) AS maxid from prediogeo"; // UltimoRegistro       
            
    $sql = "INSERT INTO predio (prd_idpredio,prd_idpropietario,prd_identificacion,prd_tipo,prd_clave_catastral,prd_regimen_tenencia,prd_bloque,prd_piso,prd_unidad) VALUES
            (:idpredio, :idpropietario, :identificacion, :tipo, :clavecatastral,:regimen, :bloque, :piso, :unidad)";

    $sql_legal = "INSERT INTO f0783168_mydb1.estatus_legal (elg_idestatus_legal,elg_clave_predio) VALUES (:idlegal, :clave_legal)";
    //$sql_investigacion="INSERT INTO f0783168_mydb1.investigacion_predial (inv_idinvestigacion_predial,inv_clave_predio) VALUES (:idinv, :clave_inv)";
    $sql_ubicacion = "INSERT INTO f0783168_mydb1.ubicacion (ubc_idubicacion,ubc_clave_predio) VALUES (:idubc, :clave_ubc)";
    $sql_caracteristicas_lote = "INSERT INTO f0783168_mydb1.caracteristicas_lote (clt_idcaracteristicas_lote,clt_clave_predio) VALUES (:idlote, :clave_lote)";
    //$sql_construccion = "INSERT INTO f0783168_mydb1.construccion_caracteristicas (cdc_idconstruccion_caracteristicas,cdc_clave_predio,cdc_idubicacion) VALUES (:idconstruccion, :clave_construccion, :idubc_construccion)";
    $sql_uso_predio = "INSERT INTO f0783168_mydb1.uso_predio (upd_iduso_predio,upd_clave_predio) VALUES (:iduso, :clave_uso)";
    $sql_infraestructura = "INSERT INTO f0783168_mydb1.infraestructura (inf_idinfraestructura,inf_clave_predio,inf_idubicacion) VALUES (:idinf, :clave_inf, :ubc_inf)";
    //$sql_obras = "INSERT INTO f0783168_mydb1.obras_complementarias (obc_idobras_complementarias,obc_clave_predio) VALUES (:idobra, :clave_obra)";
    $sql_grafico = "INSERT INTO f0783168_mydb1.grafico_predio (grp_idgrafico_predio,grp_clave_predio) VALUES (:idgrafico, :clave_grafico)";
    $sql_prediogeo = "INSERT INTO f0783168_mydb1.prediogeo (id,clavecatastral) VALUES (:idprediogeo, :clave_prediogeo)";
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

        
        $db2 = new db();
        $db2 = $db2->conexionDB();
        $last_id = $db2->query($rs_legal);  // UltimoRegistro
        //Obtiene el último registro en base al mayor id de la tabla
        $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
        $ultimo = intval($maxid[0]->maxid)+1;
        $registro_legal = $db2->prepare($sql_legal);
                $registro_legal->bindParam(':idlegal', intval($ultimo));
                $registro_legal->bindParam(':clave_legal',$this->clavecatastral);                               
                $registro_legal->execute();
                 
                //Investigación        
                /* $db3 = new db();
                $db3 = $db3->conexionDB();
                $last_id = $db3->query($rs_inv);  // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                $inv = $db3->prepare($sql_investigacion);
                        $inv->bindParam(':idinv', intval($ultimo));
                        $inv->bindParam(':clave_inv',$this->clavecatastral);                                        
                        $inv->execute(); */

                //Ubicación
                $db4 = new db();
                $db4 = $db4->conexionDB();
                $last_id = $db4->query($rs_ubicacion);  // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                $ubc = $db4->prepare($sql_ubicacion);
                        $ubc->bindParam(':idubc', intval($ultimo));
                        $ubc->bindParam(':clave_ubc',$this->clavecatastral);                                        
                        $ubc->execute();

                //Características del lote
                $db5 = new db();
                $db5 = $db5->conexionDB();
                $last_id = $db5->query($rs_caracteristicas_lote);  // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                $lote = $db5->prepare($sql_caracteristicas_lote);
                        $lote->bindParam(':idlote', intval($ultimo));
                        $lote->bindParam(':clave_lote',$this->clavecatastral);                         
                        $lote->execute();


                // Construcción características
                /* $db6 = new db();
                $db6 = $db6->conexionDB();
                $last_id = $db6->query($rs_construccion);  // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                $construccion = $db6->prepare($sql_construccion);
                        $construccion->bindParam(':idconstruccion', intval($ultimo));
                        $construccion->bindParam(':clave_construccion',$this->clavecatastral); 
                        $construccion->bindParam(':idubc_construccion',intval($ultimo));                
                        $construccion->execute(); */

                //Uso del predio
                $db7 = new db();
                $db7 = $db7->conexionDB();
                $last_id = $db7->query($rs_uso);  // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                $uso = $db7->prepare($sql_uso_predio);
                        $uso->bindParam(':iduso', intval($ultimo));
                        $uso->bindParam(':clave_uso',$this->clavecatastral);                                        
                        $uso->execute();


                //Infraestructura                
                $db8 = new db();
                $db8 = $db8->conexionDB();
                $last_id = $db8->query($rs_inf);  // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                $inf = $db8->prepare($sql_infraestructura);
                        $inf->bindParam(':idinf', intval($ultimo));
                        $inf->bindParam(':clave_inf',$this->clavecatastral);
                        $inf->bindParam(':ubc_inf',intval($ultimo));                                       
                        $inf->execute();

                        
                //Obras complementarias
                /* $db9 = new db();
                $db9 = $db9->conexionDB();
                $last_id = $db9->query($rs_obras);  // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                $obra = $db9->prepare($sql_obras);
                        $obra->bindParam(':idobra', intval($ultimo));
                        $obra->bindParam(':clave_obra',$this->clavecatastral);                                        
                        $obra->execute();
 */
                     
                //Gráfico
                $db10 = new db();
                $db10 = $db10->conexionDB();
                $last_id = $db10->query($rs_grafico);  // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                $grafico = $db10->prepare($sql_grafico);
                        $grafico->bindParam(':idgrafico', intval($ultimo));
                        $grafico->bindParam(':clave_grafico',$this->clavecatastral);                                      
                        $grafico->execute();

                
                //Prediogeo
                $db11 = new db();
                $db11 = $db11->conexionDB();
                $last_id = $db11->query($rs_prediogeo);  // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                $prediogeo = $db11->prepare($sql_prediogeo);
                        $prediogeo->bindParam(':idprediogeo', intval($ultimo));
                        $prediogeo->bindParam(':clave_prediogeo',$this->clavecatastral);                                      
                        $prediogeo->execute();
                        

        echo json_encode("Nuevo predio guardado exitosamente");
        
        $resultado = null;
        $db = null;
        $db2 = null;
        $registro_legal = null;
        $db4 = null;
        $ubc = null;
        $db5 = null;
        $lote = null;
        $db7 = null;
        $uso = null;
        $db8 = null;
        $inf = null;
        $db10 = null;
        $grafico = null;
        $db11 = null;
        $prediogeo = null;

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
