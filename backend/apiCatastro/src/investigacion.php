<?php

include_once ("../src/db.php");

class Investigacion {

    //private $idinvestigacion;
    private $clave_predio;
    private $tipo_informante;
    private $apellidos_informante;
    private $nombre_informante;
    private $telefono_informante;
    private $email_informante;
    private $propietario_desconocido;
    private $otra_fuente_informacion;
    private $dimensiones_terreno_irregular;
    private $linderos_definidos;
    private $nuevo_bloque_numero;
    private $ampliacion_bloque_numero;
    private $nombre_actualizador;
    private $apellido_actualizador;
    private $anio_actualizacion;
    private $mes_actualizacion;
    private $dia_actualizacion;
    private $cedula_actualizador;
    private $firma_actualizador;
    private $nombre_supervisor;
    private $apellido_supervisor;
    private $cedula_supervisor;
    private $anio_supervision;
    private $mes_supervision;
    private $dia_supervision;
    private $firma_supervisor;

            function __construct($inv_clave_predio,$inv_tipo_informante,$inv_apellidos_informante,$inv_nombre_informante,$inv_telefono_informante,$inv_email_informante,$inv_propietario_desconocido,$inv_otra_fuente_informacion,$inv_dimensiones_terreno_irregular,$inv_linderos_definidos,$inv_nuevo_bloque_numero,$inv_ampliacion_bloque_numero,$inv_nombre_actualizador,$inv_apellido_actualizador,$inv_anio_actualizacion,$inv_mes_actualizacion,$inv_dia_actualizacion,$inv_cedula_actualizador,$inv_firma_actualizador,$inv_nombre_supervisor,$inv_apellido_supervisor,$inv_cedula_supervisor,$inv_anio_supervision,$inv_mes_supervision,$inv_dia_supervision,$inv_firma_supervisor)
            {
                        $this->clave_predio = $inv_clave_predio; 
                        $this->tipo_informante = $inv_tipo_informante; 
                        $this->apellidos_informante = $inv_apellidos_informante; 
                        $this->nombre_informante = $inv_nombre_informante; 
                        $this->telefono_informante = $inv_telefono_informante; 
                        $this->email_informante = $inv_email_informante; 
                        $this->propietario_desconocido = $inv_propietario_desconocido; 
                        $this->otra_fuente_informacion = $inv_otra_fuente_informacion; 
                        $this->dimensiones_terreno_irregular = $inv_dimensiones_terreno_irregular; 
                        $this->linderos_definidos = $inv_linderos_definidos; 
                        $this->nuevo_bloque_numero = $inv_nuevo_bloque_numero; 
                        $this->ampliacion_bloque_numero = $inv_ampliacion_bloque_numero; 
                        $this->nombre_actualizador = $inv_nombre_actualizador; 
                        $this->apellido_actualizador = $inv_apellido_actualizador; 
                        $this->anio_actualizacion = $inv_anio_actualizacion; 
                        $this->mes_actualizacion = $inv_mes_actualizacion; 
                        $this->dia_actualizacion = $inv_dia_actualizacion; 
                        $this->cedula_actualizador = $inv_cedula_actualizador; 
                        $this->firma_actualizador = $inv_firma_actualizador; 
                        $this->nombre_supervisor = $inv_nombre_supervisor; 
                        $this->apellido_supervisor = $inv_apellido_supervisor; 
                        $this->cedula_supervisor = $inv_cedula_supervisor; 
                        $this->anio_supervision = $inv_anio_supervision; 
                        $this->mes_supervision = $inv_mes_supervision; 
                        $this->dia_supervision = $inv_dia_supervision; 
                        $this->firma_supervisor = $inv_firma_supervisor;                
            }

        // GET Todos las investigaciones prediales
        public static function todasInvestigaciones(){
        
            $sql = "SELECT * FROM investigacion_predial";
            //$rs = "SELECT MAX(inv_idinvestigacion_predial) AS maxid from investigacion_predial"; // UltimoRegistro
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                //$last_id = $db->query($rs);  // UltimoRegistro
                $json = [];
        

                if ($resultado->rowCount() > 0){
                    $inv = $resultado->fetchAll(PDO::FETCH_OBJ);
            
                    //Obtiene el último registro en base al mayor id de la tabla
                    //$maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                    //$ultimo = intval($maxid[0]->maxid)+1;
                    //echo $ultimo;
                    ////////////////////////////////////////////////////////////////

                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("idinvestigacion"=>intval($inv[$i]->inv_idinvestigacion_predial),
                                        "clave_predio"=>$inv[$i]->inv_clave_predio,
                                        "tipo_informante"=>$inv[$i]->inv_tipo_informante,                    
                                        "apellidos_informante"=>$inv[$i]->inv_apellidos_informante,
                                        "nombre_informante"=>$inv[$i]->inv_nombre_informante,
                                        "telefono_informante"=>$inv[$i]->inv_telefono_informante,
                                        "email_informante"=>$inv[$i]->inv_email_informante,
                                        "propietario_desconocido"=>$inv[$i]->inv_propietario_desconocido,
                                        "otra_fuente_informacion"=>$inv[$i]->inv_otra_fuente_informacion,
                                        "dimensiones_terreno_irregular"=>$inv[$i]->inv_dimensiones_terreno_irregular,
                                        "linderos_definidos"=>$inv[$i]->inv_linderos_definidos,
                                        "nuevo_bloque_numero"=>$inv[$i]->inv_nuevo_bloque_numero,
                                        "ampliacion_bloque_numero"=>$inv[$i]->inv_ampliacion_bloque_numero,
                                        "nombre_actualizador"=>$inv[$i]->inv_nombre_actualizador,
                                        "apellido_actualizador"=>$inv[$i]->inv_apellido_actualizador,
                                        "anio_actualizacion"=>$inv[$i]->inv_anio_actualizacion,
                                        "mes_actualizacion"=>$inv[$i]->inv_mes_actualizacion,
                                        "dia_actualizacion"=>$inv[$i]->inv_dia_actualizacion,
                                        "cedula_actualizador"=>$inv[$i]->inv_cedula_actualizador,
                                        "firma_actualizador"=>$inv[$i]->inv_firma_actualizador,
                                        "nombre_supervisor"=>$inv[$i]->inv_nombre_supervisor,
                                        "apellido_supervisor"=>$inv[$i]->inv_apellido_supervisor,
                                        "cedula_supervisor"=>$inv[$i]->inv_cedula_supervisor,
                                        "anio_supervision"=>$inv[$i]->inv_anio_supervision,
                                        "mes_supervision"=>$inv[$i]->inv_mes_supervision,
                                        "dia_supervision"=>$inv[$i]->inv_dia_supervision,
                                        "firma_supervisor"=>$inv[$i]->inv_firma_supervisor         
                                        );

                        $json[] = $ejemplo;
                    }        
        
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);

                    //echo json_encode($inv, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existen investigaciones prediales registradas en la BD");
                }
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // GET Recuperar investigación predial por ID
        public static function verInvestigacion($id){
            $id_investigacion = intval($id);    
            $sql = "SELECT * FROM investigacion_predial WHERE inv_idinvestigacion_predial = $id_investigacion";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                $json = [];

                if ($resultado->rowCount() > 0){
                    $inv = $resultado->fetchAll(PDO::FETCH_OBJ);
                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("idinvestigacion"=>intval($inv[$i]->inv_idinvestigacion_predial),
                                        "clave_predio"=>$inv[$i]->inv_clave_predio,
                                        "tipo_informante"=>$inv[$i]->inv_tipo_informante,                    
                                        "apellidos_informante"=>$inv[$i]->inv_apellidos_informante,
                                        "nombre_informante"=>$inv[$i]->inv_nombre_informante,
                                        "telefono_informante"=>$inv[$i]->inv_telefono_informante,
                                        "email_informante"=>$inv[$i]->inv_email_informante,
                                        "propietario_desconocido"=>$inv[$i]->inv_propietario_desconocido,
                                        "otra_fuente_informacion"=>$inv[$i]->inv_otra_fuente_informacion,
                                        "dimensiones_terreno_irregular"=>$inv[$i]->inv_dimensiones_terreno_irregular,
                                        "linderos_definidos"=>$inv[$i]->inv_linderos_definidos,
                                        "nuevo_bloque_numero"=>$inv[$i]->inv_nuevo_bloque_numero,
                                        "ampliacion_bloque_numero"=>$inv[$i]->inv_ampliacion_bloque_numero,
                                        "nombre_actualizador"=>$inv[$i]->inv_nombre_actualizador,
                                        "apellido_actualizador"=>$inv[$i]->inv_apellido_actualizador,
                                        "anio_actualizacion"=>$inv[$i]->inv_anio_actualizacion,
                                        "mes_actualizacion"=>$inv[$i]->inv_mes_actualizacion,
                                        "dia_actualizacion"=>$inv[$i]->inv_dia_actualizacion,
                                        "cedula_actualizador"=>$inv[$i]->inv_cedula_actualizador,
                                        "firma_actualizador"=>$inv[$i]->inv_firma_actualizador,
                                        "nombre_supervisor"=>$inv[$i]->inv_nombre_supervisor,
                                        "apellido_supervisor"=>$inv[$i]->inv_apellido_supervisor,
                                        "cedula_supervisor"=>$inv[$i]->inv_cedula_supervisor,
                                        "anio_supervision"=>$inv[$i]->inv_anio_supervision,
                                        "mes_supervision"=>$inv[$i]->inv_mes_supervision,
                                        "dia_supervision"=>$inv[$i]->inv_dia_supervision,
                                        "firma_supervisor"=>$inv[$i]->inv_firma_supervisor
                                        );
                
                        $json[] = $ejemplo;
                    }        
        
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);
                    //echo json_encode($inv, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe investigación predial en la BD con este ID");
                }
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // POST Crear nueva investigación predial  
        public function guardarInvestigacion(){
    
            $rs = "SELECT MAX(inv_idinvestigacion_predial) AS maxid from investigacion_predial"; // UltimoRegistro    
           
            $sql = "INSERT INTO investigacion_predial (inv_idinvestigacion_predial,inv_clave_predio,inv_tipo_informante,inv_apellidos_informante,inv_nombre_informante,inv_telefono_informante,inv_email_informante,inv_propietario_desconocido,inv_otra_fuente_informacion,inv_dimensiones_terreno_irregular,inv_linderos_definidos,inv_nuevo_bloque_numero,inv_ampliacion_bloque_numero,inv_nombre_actualizador,inv_apellido_actualizador,inv_anio_actualizacion,inv_mes_actualizacion,inv_dia_actualizacion,inv_cedula_actualizador,inv_firma_actualizador,inv_nombre_supervisor,inv_apellido_supervisor,inv_cedula_supervisor,inv_anio_supervision,inv_mes_supervision,inv_dia_supervision,inv_firma_supervisor) VALUES
                    (:idinvestigacion,:clave_predio,:tipo_informante,:apellidos_informante,:nombre_informante,:telefono_informante,:email_informante,:propietario_desconocido,:otra_fuente_informacion,:dimensiones_terreno_irregular,:linderos_definidos,:nuevo_bloque_numero,:ampliacion_bloque_numero,:nombre_actualizador,:apellido_actualizador,:anio_actualizacion,:mes_actualizacion,:dia_actualizacion,:cedula_actualizador,:firma_actualizador,:nombre_supervisor,:apellido_supervisor,:cedula_supervisor,:anio_supervision,:mes_supervision,:dia_supervision,:firma_supervisor)";
            try {
                $db = new db();
                $db = $db->conexionDB();        
                $last_id = $db->query($rs); // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
       
                $resultado = $db->prepare($sql);
                $resultado->bindParam(':idinvestigacion', intval($ultimo));                
                $resultado->bindParam(':clave_predio',$this->clave_predio); 
                $resultado->bindParam(':tipo_informante',$this->tipo_informante); 
                $resultado->bindParam(':apellidos_informante',$this->apellidos_informante);
                $resultado->bindParam(':nombre_informante',$this->nombre_informante); 
                $resultado->bindParam(':telefono_informante',$this->telefono_informante);         
                $resultado->bindParam(':email_informante',$this->email_informante); 
                $resultado->bindParam(':propietario_desconocido',$this->propietario_desconocido); 
                $resultado->bindParam(':otra_fuente_informacion',$this->otra_fuente_informacion); 
                $resultado->bindParam(':dimensiones_terreno_irregular',$this->dimensiones_terreno_irregular); 
                $resultado->bindParam(':linderos_definidos',$this->linderos_definidos); 
                $resultado->bindParam(':nuevo_bloque_numero',$this->nuevo_bloque_numero); 
                $resultado->bindParam(':ampliacion_bloque_numero',$this->ampliacion_bloque_numero);   
                $resultado->bindParam(':nombre_actualizador',$this->nombre_actualizador);   
                $resultado->bindParam(':apellido_actualizador',$this->apellido_actualizador);   
                $resultado->bindParam(':anio_actualizacion',$this->anio_actualizacion);   
                $resultado->bindParam(':mes_actualizacion',$this->mes_actualizacion); 
                $resultado->bindParam(':dia_actualizacion',$this->dia_actualizacion); 
                $resultado->bindParam(':cedula_actualizador',$this->cedula_actualizador); 
                $resultado->bindParam(':firma_actualizador',$this->firma_actualizador); 
                $resultado->bindParam(':nombre_supervisor',$this->nombre_supervisor); 
                $resultado->bindParam(':apellido_supervisor',$this->apellido_supervisor); 
                $resultado->bindParam(':cedula_supervisor',$this->cedula_supervisor); 
                $resultado->bindParam(':anio_supervision',$this->anio_supervision); 
                $resultado->bindParam(':mes_supervision',$this->mes_supervision); 
                $resultado->bindParam(':dia_supervision',$this->dia_supervision); 
                $resultado->bindParam(':firma_supervisor',$this->firma_supervisor);          

                $resultado->execute();
                echo json_encode("Nueva investigación predial guardada exitosamente", JSON_UNESCAPED_UNICODE);

                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // PUT Actualizar investigación predial por ID
        public function actualizarInvestigacion($id){
                
            $id_investigacion = intval($id);        
            $sql = "UPDATE investigacion_predial SET            
                    inv_clave_predio=:clave_predio,
                    inv_tipo_informante=:tipo_informante,
                    inv_apellidos_informante=:apellidos_informante,
                    inv_nombre_informante=:nombre_informante,
                    inv_telefono_informante=:telefono_informante,
                    inv_email_informante=:email_informante,
                    inv_propietario_desconocido=:propietario_desconocido,
                    inv_otra_fuente_informacion=:otra_fuente_informacion,
                    inv_dimensiones_terreno_irregular=:dimensiones_terreno_irregular,
                    inv_linderos_definidos=:linderos_definidos,
                    inv_nuevo_bloque_numero=:nuevo_bloque_numero,
                    inv_ampliacion_bloque_numero=:ampliacion_bloque_numero,
                    inv_nombre_actualizador=:nombre_actualizador,
                    inv_apellido_actualizador=:apellido_actualizador,
                    inv_anio_actualizacion=:anio_actualizacion,
                    inv_mes_actualizacion=:mes_actualizacion,
                    inv_dia_actualizacion=:dia_actualizacion,
                    inv_cedula_actualizador=:cedula_actualizador,
                    inv_firma_actualizador=:firma_actualizador,
                    inv_nombre_supervisor=:nombre_supervisor,
                    inv_apellido_supervisor=:apellido_supervisor,
                    inv_cedula_supervisor=:cedula_supervisor,
                    inv_anio_supervision=:anio_supervision,
                    inv_mes_supervision=:mes_supervision,
                    inv_dia_supervision=:dia_supervision,
                    inv_firma_supervisor=:firma_supervisor
                    WHERE inv_idinvestigacion_predial=:idinvestigacion";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);                    
       
                $resultado->bindParam(':idinvestigacion', intval($id_investigacion));                
                $resultado->bindParam(':clave_predio',$this->clave_predio); 
                $resultado->bindParam(':tipo_informante',$this->tipo_informante); 
                $resultado->bindParam(':apellidos_informante',$this->apellidos_informante);
                $resultado->bindParam(':nombre_informante',$this->nombre_informante); 
                $resultado->bindParam(':telefono_informante',$this->telefono_informante);         
                $resultado->bindParam(':email_informante',$this->email_informante); 
                $resultado->bindParam(':propietario_desconocido',$this->propietario_desconocido); 
                $resultado->bindParam(':otra_fuente_informacion',$this->otra_fuente_informacion); 
                $resultado->bindParam(':dimensiones_terreno_irregular',$this->dimensiones_terreno_irregular); 
                $resultado->bindParam(':linderos_definidos',$this->linderos_definidos); 
                $resultado->bindParam(':nuevo_bloque_numero',$this->nuevo_bloque_numero); 
                $resultado->bindParam(':ampliacion_bloque_numero',$this->ampliacion_bloque_numero);   
                $resultado->bindParam(':nombre_actualizador',$this->nombre_actualizador);   
                $resultado->bindParam(':apellido_actualizador',$this->apellido_actualizador);   
                $resultado->bindParam(':anio_actualizacion',$this->anio_actualizacion);   
                $resultado->bindParam(':mes_actualizacion',$this->mes_actualizacion); 
                $resultado->bindParam(':dia_actualizacion',$this->dia_actualizacion); 
                $resultado->bindParam(':cedula_actualizador',$this->cedula_actualizador); 
                $resultado->bindParam(':firma_actualizador',$this->firma_actualizador); 
                $resultado->bindParam(':nombre_supervisor',$this->nombre_supervisor); 
                $resultado->bindParam(':apellido_supervisor',$this->apellido_supervisor); 
                $resultado->bindParam(':cedula_supervisor',$this->cedula_supervisor); 
                $resultado->bindParam(':anio_supervision',$this->anio_supervision); 
                $resultado->bindParam(':mes_supervision',$this->mes_supervision); 
                $resultado->bindParam(':dia_supervision',$this->dia_supervision); 
                $resultado->bindParam(':firma_supervisor',$this->firma_supervisor);          

                $resultado->execute();
                echo json_encode("Investigación predial actualizada exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // DELETE Borrar investigación predial por ID
        public static function eliminarInvestigacion($id){
        
            $id_investigacion = intval($id);        
            $sql = "DELETE FROM investigacion_predial WHERE inv_idinvestigacion_predial=:idinvestigacion";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);        
        
                $resultado->bindParam(':idinvestigacion', $id_investigacion);
                $resultado->execute();

                if ($resultado->rowCount() > 0){
                    echo json_encode("Investigación predial eliminada exitosamente", JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe investigación predial con este ID", JSON_UNESCAPED_UNICODE);
            }                     
        
            $resultado = null;
            $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }




        







        
                    
                    





}

?>