<?php

include_once ("../src/db.php");

class Infraestructura {

    //private $idinfraestructura;
    private $clave_predio;
    private $idubicacion;
    private $via_acceso;
    private $rodadura;
    private $vias_adicionales;
    private $agua_procedencia;
    private $medidor_agua;
    private $agua_recepcion;
    private $eliminacion_excretas;
    private $energia_electrica_procedencia;
    private $medidor;
    private $energia_electrica_recepcion;
    private $eliminacion_basura;
    private $telefono_convencional;
    private $celular;
    private $tv_cable;
    private $internet;
    private $metodo_riego;
    private $disponibilidad_riego;
    private $instalaciones_especiales;
    private $ascensor;
    private $circuito_cerrado_tv;
    private $montacarga;
    private $sistema_alterno_electricidad;
    private $aire_acondicionado;
    private $sistema_contra_incendios;
    private $gas_centralizado;
    private $ventilacion;
    private $sistema_voz_datos;
    private $alumbrado_publico;
    private $recoleccion_basura;
    private $transporte_urbano;
    private $aseo_calles;
    private $alcantarillado;
    private $aceras;
    private $bordillos;

            function __construct($inf_clave_predio,$inf_idubicacion,$inf_tipo_via_acceso,$inf_rodadura,$inf_vias_acceso_adicionales,$inf_agua_procedencia,$inf_medidor_agua,$inf_agua_recepcion,$inf_eliminacion_excretas,$inf_energia_electrica_procedencia,$inf_medidor,$inf_energia_electrica_recepcion,$inf_eliminacion_basura,$inf_telefono_convencional,$inf_celular,$inf_tv_cable,$inf_internet,$inf_metodo_riego,$inf_disponibilidad_riego,$inf_instalaciones_especiales,$inf_ascensor,$inf_circuito_cerrado_tv,$inf_montacarga,$inf_sistema_alterno_electricidad,$inf_aire_acondicionado,$inf_sistema_contra_incendios,$inf_gas_centralizado,$inf_ventilacion,$inf_sistema_voz_datos,$inf_alumbrado_publico,$inf_recoleccion_basura,$inf_transporte_urbano,$inf_aseo_calles,$inf_alcantarillado,$inf_aceras,$inf_bordillos)
            {
                //$this->idinfraestructura= $inf_idinfraestructura;
                $this->clave_predio= $inf_clave_predio;
                $this->idubicacion= $inf_idubicacion;
                $this->via_acceso= $inf_tipo_via_acceso;
                $this->rodadura= $inf_rodadura;
                $this->vias_adicionales= $inf_vias_acceso_adicionales;
                $this->agua_procedencia= $inf_agua_procedencia;
                $this->medidor_agua= $inf_medidor_agua;
                $this->agua_recepcion= $inf_agua_recepcion;
                $this->eliminacion_excretas= $inf_eliminacion_excretas;
                $this->energia_electrica_procedencia= $inf_energia_electrica_procedencia;
                $this->medidor= $inf_medidor;
                $this->energia_electrica_recepcion= $inf_energia_electrica_recepcion;
                $this->eliminacion_basura= $inf_eliminacion_basura;
                $this->telefono_convencional= $inf_telefono_convencional;
                $this->celular= $inf_celular;
                $this->tv_cable= $inf_tv_cable;
                $this->internet= $inf_internet;
                $this->metodo_riego= $inf_metodo_riego;
                $this->disponibilidad_riego= $inf_disponibilidad_riego;
                $this->instalaciones_especiales= $inf_instalaciones_especiales;
                $this->ascensor= $inf_ascensor;
                $this->circuito_cerrado_tv= $inf_circuito_cerrado_tv;
                $this->montacarga= $inf_montacarga;
                $this->sistema_alterno_electricidad= $inf_sistema_alterno_electricidad;
                $this->aire_acondicionado= $inf_aire_acondicionado;
                $this->sistema_contra_incendios= $inf_sistema_contra_incendios;
                $this->gas_centralizado= $inf_gas_centralizado;
                $this->ventilacion= $inf_ventilacion;
                $this->sistema_voz_datos= $inf_sistema_voz_datos;
                $this->alumbrado_publico= $inf_alumbrado_publico;
                $this->recoleccion_basura= $inf_recoleccion_basura;
                $this->transporte_urbano= $inf_transporte_urbano;
                $this->aseo_calles= $inf_aseo_calles;
                $this->alcantarillado= $inf_alcantarillado;
                $this->aceras= $inf_aceras;
                $this->bordillos= $inf_bordillos;
                
            }
        
        
        // GET Todos los datos de infraestructura por cada predio
        public static function todasInfraestructuras(){
            //echo "TODA LA INFRAESTRUCTURA DE PREDIOS";
            $sql = "SELECT * FROM infraestructura";
            //$rs = "SELECT MAX(inf_idinfraestructura) AS maxid from infraestructura"; // UltimoRegistro
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                //$last_id = $db->query($rs);  // UltimoRegistro
                $json = [];
        

                if ($resultado->rowCount() > 0){
                    $infraestructura = $resultado->fetchAll(PDO::FETCH_OBJ);
            
                    //Obtiene el último registro en base al mayor id de la tabla
                    //$maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                    //$ultimo = intval($maxid[0]->maxid)+1;
                    //echo $ultimo;
                    ////////////////////////////////////////////////////////////////

                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("idinfraestructura"=>intval($infraestructura[$i]->inf_idinfraestructura),
                                "clave_predio"=>$infraestructura[$i]->inf_clave_predio,
                                "idubicacion"=>intval($infraestructura[$i]->inf_idubicacion),                    
                                "via_acceso"=>$infraestructura[$i]->inf_tipo_via_acceso,
                                "rodadura"=>$infraestructura[$i]->inf_rodadura,
                                "vias_adicionales"=>$infraestructura[$i]->inf_vias_acceso_adicionales,
                                "agua_procedencia"=>$infraestructura[$i]->inf_agua_procedencia,
                                "medidor_agua"=>$infraestructura[$i]->inf_medidor_agua,
                                "agua_recepcion"=>$infraestructura[$i]->inf_agua_recepcion,
                                "eliminacion_excretas"=>$infraestructura[$i]->inf_eliminacion_excretas,
                                "energia_electrica_procedencia"=>$infraestructura[$i]->inf_energia_electrica_procedencia,
                                "medidor"=>$infraestructura[$i]->inf_medidor,
                                "energia_electrica_recepcion"=>$infraestructura[$i]->inf_energia_electrica_recepcion,
                                "eliminacion_basura"=>$infraestructura[$i]->inf_eliminacion_basura,
                                "telefono_convencional"=>$infraestructura[$i]->inf_telefono_convencional,
                                "celular"=>$infraestructura[$i]->inf_celular,
                                "tv_cable"=>$infraestructura[$i]->inf_tv_cable,
                                "internet"=>$infraestructura[$i]->inf_internet,
                                "metodo_riego"=>$infraestructura[$i]->inf_metodo_riego,
                                "disponibilidad_riego"=>$infraestructura[$i]->inf_disponibilidad_riego,
                                "instalaciones_especiales"=>$infraestructura[$i]->inf_instalaciones_especiales,
                                "ascensor"=>$infraestructura[$i]->inf_ascensor,
                                "circuito_cerrado_tv"=>$infraestructura[$i]->inf_circuito_cerrado_tv,
                                "montacarga"=>$infraestructura[$i]->inf_montacarga,
                                "sistema_alterno_electricidad"=>$infraestructura[$i]->inf_sistema_alterno_electricidad,
                                "aire_acondicionado"=>$infraestructura[$i]->inf_aire_acondicionado,
                                "sistema_contra_incendios"=>$infraestructura[$i]->inf_sistema_contra_incendios,
                                "gas_centralizado"=>$infraestructura[$i]->inf_gas_centralizado,
                                "ventilacion"=>$infraestructura[$i]->inf_ventilacion,
                                "sistema_voz_datos"=>$infraestructura[$i]->inf_sistema_voz_datos,
                                "alumbrado_publico"=>$infraestructura[$i]->inf_alumbrado_publico,
                                "recoleccion_basura"=>$infraestructura[$i]->inf_recoleccion_basura,
                                "transporte_urbano"=>$infraestructura[$i]->inf_transporte_urbano,
                                "aseo_calles"=>$infraestructura[$i]->inf_aseo_calles,
                                "alcantarillado"=>$infraestructura[$i]->inf_alcantarillado,
                                "aceras"=>$infraestructura[$i]->inf_aceras,
                                "bordillos"=>$infraestructura[$i]->inf_bordillos 
                                );

                        $json[] = $ejemplo;
                    }        
        
                        echo json_encode($json, JSON_UNESCAPED_UNICODE);

                        //echo json_encode($infraestructura, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe infraestructura de predios registradas en la BD");
                }
                    $resultado = null;
                    $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }

        // GET Recuperar infraestructura de predio por ID
        public static function verInfraestructura($id){
            $id_infraestructura = intval($id);    
            $sql = "SELECT * FROM infraestructura WHERE inf_idinfraestructura = $id_infraestructura";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                $json = [];

                if ($resultado->rowCount() > 0){
                    $infraestructura = $resultado->fetchAll(PDO::FETCH_OBJ);
                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("idinfraestructura"=>intval($infraestructura[$i]->inf_idinfraestructura),
                                    "clave_predio"=>$infraestructura[$i]->inf_clave_predio,
                                    "idubicacion"=>intval($infraestructura[$i]->inf_idubicacion),                    
                                    "via_acceso"=>$infraestructura[$i]->inf_tipo_via_acceso,
                                    "rodadura"=>$infraestructura[$i]->inf_rodadura,
                                    "vias_adicionales"=>$infraestructura[$i]->inf_vias_acceso_adicionales,
                                    "agua_procedencia"=>$infraestructura[$i]->inf_agua_procedencia,
                                    "medidor_agua"=>$infraestructura[$i]->inf_medidor_agua,
                                    "agua_recepcion"=>$infraestructura[$i]->inf_agua_recepcion,
                                    "eliminacion_excretas"=>$infraestructura[$i]->inf_eliminacion_excretas,
                                    "energia_electrica_procedencia"=>$infraestructura[$i]->inf_energia_electrica_procedencia,
                                    "medidor"=>$infraestructura[$i]->inf_medidor,
                                    "energia_electrica_recepcion"=>$infraestructura[$i]->inf_energia_electrica_recepcion,
                                    "eliminacion_basura"=>$infraestructura[$i]->inf_eliminacion_basura,
                                    "telefono_convencional"=>$infraestructura[$i]->inf_telefono_convencional,
                                    "celular"=>$infraestructura[$i]->inf_celular,
                                    "tv_cable"=>$infraestructura[$i]->inf_tv_cable,
                                    "internet"=>$infraestructura[$i]->inf_internet,
                                    "metodo_riego"=>$infraestructura[$i]->inf_metodo_riego,
                                    "disponibilidad_riego"=>$infraestructura[$i]->inf_disponibilidad_riego,
                                    "instalaciones_especiales"=>$infraestructura[$i]->inf_instalaciones_especiales,
                                    "ascensor"=>$infraestructura[$i]->inf_ascensor,
                                    "circuito_cerrado_tv"=>$infraestructura[$i]->inf_circuito_cerrado_tv,
                                    "montacarga"=>$infraestructura[$i]->inf_montacarga,
                                    "sistema_alterno_electricidad"=>$infraestructura[$i]->inf_sistema_alterno_electricidad,
                                    "aire_acondicionado"=>$infraestructura[$i]->inf_aire_acondicionado,
                                    "sistema_contra_incendios"=>$infraestructura[$i]->inf_sistema_contra_incendios,
                                    "gas_centralizado"=>$infraestructura[$i]->inf_gas_centralizado,
                                    "ventilacion"=>$infraestructura[$i]->inf_ventilacion,
                                    "sistema_voz_datos"=>$infraestructura[$i]->inf_sistema_voz_datos,
                                    "alumbrado_publico"=>$infraestructura[$i]->inf_alumbrado_publico,
                                    "recoleccion_basura"=>$infraestructura[$i]->inf_recoleccion_basura,
                                    "transporte_urbano"=>$infraestructura[$i]->inf_transporte_urbano,
                                    "aseo_calles"=>$infraestructura[$i]->inf_aseo_calles,
                                    "alcantarillado"=>$infraestructura[$i]->inf_alcantarillado,
                                    "aceras"=>$infraestructura[$i]->inf_aceras,
                                    "bordillos"=>$infraestructura[$i]->inf_bordillos                    
                                    );
                
                        $json[] = $ejemplo;
                    }        
        
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);
                    //echo json_encode($infraestructura, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe infraestructura de predios en la BD con este ID");
                }
                    $resultado = null;
                    $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }

        // POST Crear nuevo uso de predio  
        public function guardarInfraestructura(){
    
            $rs = "SELECT MAX(inf_idinfraestructura) AS maxid from infraestructura"; // UltimoRegistro    
                        
            $sql = "INSERT INTO infraestructura (inf_idinfraestructura,inf_clave_predio,inf_idubicacion,inf_tipo_via_acceso,inf_rodadura,inf_vias_acceso_adicionales,inf_agua_procedencia,inf_medidor_agua,inf_agua_recepcion,inf_eliminacion_excretas,inf_energia_electrica_procedencia,inf_medidor,inf_energia_electrica_recepcion,inf_eliminacion_basura,inf_telefono_convencional,inf_celular,inf_tv_cable,inf_internet,inf_metodo_riego,inf_disponibilidad_riego,inf_instalaciones_especiales,inf_ascensor,inf_circuito_cerrado_tv,inf_montacarga,inf_sistema_alterno_electricidad,inf_aire_acondicionado,inf_sistema_contra_incendios,inf_gas_centralizado,inf_ventilacion,inf_sistema_voz_datos,inf_alumbrado_publico,inf_recoleccion_basura,inf_transporte_urbano,inf_aseo_calles,inf_alcantarillado,inf_aceras,inf_bordillos) VALUES
                    (:idinfraestructura,:clave_predio,:idubicacion,:via_acceso,:rodadura,:vias_adicionales,:agua_procedencia,:medidor_agua,:agua_recepcion,:eliminacion_excretas,:energia_electrica_procedencia,:medidor,:energia_electrica_recepcion,:eliminacion_basura,:telefono_convencional,:celular,:tv_cable,:internet,:metodo_riego,:disponibilidad_riego,:instalaciones_especiales,:ascensor,:circuito_cerrado_tv,:montacarga,:sistema_alterno_electricidad,:aire_acondicionado,:sistema_contra_incendios,:gas_centralizado,:ventilacion,:sistema_voz_datos,:alumbrado_publico,:recoleccion_basura,:transporte_urbano,:aseo_calles,:alcantarillado,:aceras,:bordillos)";

            try {
                $db = new db();
                $db = $db->conexionDB();        
                $last_id = $db->query($rs); // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
       
                $resultado = $db->prepare($sql);
                $resultado->bindParam(':idinfraestructura', intval($ultimo));
                $resultado->bindParam(':clave_predio',$this->clave_predio);
                $resultado->bindParam(':idubicacion', intval($this->idubicacion));
                $resultado->bindParam(':via_acceso',$this->via_acceso);
                $resultado->bindParam(':rodadura',$this->rodadura);
                $resultado->bindParam(':vias_adicionales',$this->vias_adicionales);
                $resultado->bindParam(':agua_procedencia',$this->agua_procedencia);
                $resultado->bindParam(':medidor_agua',$this->medidor_agua);
                $resultado->bindParam(':agua_recepcion',$this->agua_recepcion);
                $resultado->bindParam(':eliminacion_excretas',$this->eliminacion_excretas);
                $resultado->bindParam(':energia_electrica_procedencia',$this->energia_electrica_procedencia);
                $resultado->bindParam(':medidor',$this->medidor);
                $resultado->bindParam(':energia_electrica_recepcion',$this->energia_electrica_recepcion);
                $resultado->bindParam(':eliminacion_basura',$this->eliminacion_basura);
                $resultado->bindParam(':telefono_convencional',$this->telefono_convencional);
                $resultado->bindParam(':celular',$this->celular);
                $resultado->bindParam(':tv_cable',$this->tv_cable);
                $resultado->bindParam(':internet',$this->internet);
                $resultado->bindParam(':metodo_riego',$this->metodo_riego);
                $resultado->bindParam(':disponibilidad_riego',$this->disponibilidad_riego);
                $resultado->bindParam(':instalaciones_especiales',$this->instalaciones_especiales);
                $resultado->bindParam(':ascensor',$this->ascensor);
                $resultado->bindParam(':circuito_cerrado_tv',$this->circuito_cerrado_tv);
                $resultado->bindParam(':montacarga',$this->montacarga);
                $resultado->bindParam(':sistema_alterno_electricidad',$this->sistema_alterno_electricidad);
                $resultado->bindParam(':aire_acondicionado',$this->aire_acondicionado);
                $resultado->bindParam(':sistema_contra_incendios',$this->sistema_contra_incendios);
                $resultado->bindParam(':gas_centralizado',$this->gas_centralizado);
                $resultado->bindParam(':ventilacion',$this->ventilacion);
                $resultado->bindParam(':sistema_voz_datos',$this->sistema_voz_datos);
                $resultado->bindParam(':alumbrado_publico',$this->alumbrado_publico);
                $resultado->bindParam(':recoleccion_basura',$this->recoleccion_basura);
                $resultado->bindParam(':transporte_urbano',$this->transporte_urbano);
                $resultado->bindParam(':aseo_calles',$this->aseo_calles);
                $resultado->bindParam(':alcantarillado',$this->alcantarillado);
                $resultado->bindParam(':aceras',$this->aceras);
                $resultado->bindParam(':bordillos',$this->bordillos);  

                $resultado->execute();
                echo json_encode("Nueva infraestructura de predio guardado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }

        // PUT Actualizar infraestructura de un predio por ID
        public function actualizarInfraestructura($id){
                
            $id_infraestructura = intval($id);        
            $sql = "UPDATE infraestructura SET                                   
                    inf_clave_predio=:clave_predio,
                    inf_idubicacion=:idubicacion,
                    inf_tipo_via_acceso=:via_acceso,
                    inf_rodadura=:rodadura,
                    inf_vias_acceso_adicionales=:vias_adicionales,
                    inf_agua_procedencia=:agua_procedencia,
                    inf_medidor_agua=:medidor_agua,
                    inf_agua_recepcion=:agua_recepcion,
                    inf_eliminacion_excretas=:eliminacion_excretas,
                    inf_energia_electrica_procedencia=:energia_electrica_procedencia,
                    inf_medidor=:medidor,
                    inf_energia_electrica_recepcion=:energia_electrica_recepcion,
                    inf_eliminacion_basura=:eliminacion_basura,
                    inf_telefono_convencional=:telefono_convencional,
                    inf_celular=:celular,
                    inf_tv_cable=:tv_cable,
                    inf_internet=:internet,
                    inf_metodo_riego=:metodo_riego,
                    inf_disponibilidad_riego=:disponibilidad_riego,
                    inf_instalaciones_especiales=:instalaciones_especiales,
                    inf_ascensor=:ascensor,
                    inf_circuito_cerrado_tv=:circuito_cerrado_tv,
                    inf_montacarga=:montacarga,
                    inf_sistema_alterno_electricidad=:sistema_alterno_electricidad,
                    inf_aire_acondicionado=:aire_acondicionado,
                    inf_sistema_contra_incendios=:sistema_contra_incendios,
                    inf_gas_centralizado=:gas_centralizado,
                    inf_ventilacion=:ventilacion,
                    inf_sistema_voz_datos=:sistema_voz_datos,
                    inf_alumbrado_publico=:alumbrado_publico,
                    inf_recoleccion_basura=:recoleccion_basura,
                    inf_transporte_urbano=:transporte_urbano,
                    inf_aseo_calles=:aseo_calles,
                    inf_alcantarillado=:alcantarillado,
                    inf_aceras=:aceras,
                    inf_bordillos=:bordillos
                    WHERE inf_idinfraestructura=:idinfraestructura";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);           
                
                $resultado->bindParam(':idinfraestructura', intval($id_infraestructura)); 
                $resultado->bindParam(':clave_predio',$this->clave_predio);
                $resultado->bindParam(':idubicacion', intval($this->idubicacion));
                $resultado->bindParam(':via_acceso',$this->via_acceso);
                $resultado->bindParam(':rodadura',$this->rodadura);
                $resultado->bindParam(':vias_adicionales',$this->vias_adicionales);
                $resultado->bindParam(':agua_procedencia',$this->agua_procedencia);
                $resultado->bindParam(':medidor_agua',$this->medidor_agua);
                $resultado->bindParam(':agua_recepcion',$this->agua_recepcion);
                $resultado->bindParam(':eliminacion_excretas',$this->eliminacion_excretas);
                $resultado->bindParam(':energia_electrica_procedencia',$this->energia_electrica_procedencia);
                $resultado->bindParam(':medidor',$this->medidor);
                $resultado->bindParam(':energia_electrica_recepcion',$this->energia_electrica_recepcion);
                $resultado->bindParam(':eliminacion_basura',$this->eliminacion_basura);
                $resultado->bindParam(':telefono_convencional',$this->telefono_convencional);
                $resultado->bindParam(':celular',$this->celular);
                $resultado->bindParam(':tv_cable',$this->tv_cable);
                $resultado->bindParam(':internet',$this->internet);
                $resultado->bindParam(':metodo_riego',$this->metodo_riego);
                $resultado->bindParam(':disponibilidad_riego',$this->disponibilidad_riego);
                $resultado->bindParam(':instalaciones_especiales',$this->instalaciones_especiales);
                $resultado->bindParam(':ascensor',$this->ascensor);
                $resultado->bindParam(':circuito_cerrado_tv',$this->circuito_cerrado_tv);
                $resultado->bindParam(':montacarga',$this->montacarga);
                $resultado->bindParam(':sistema_alterno_electricidad',$this->sistema_alterno_electricidad);
                $resultado->bindParam(':aire_acondicionado',$this->aire_acondicionado);
                $resultado->bindParam(':sistema_contra_incendios',$this->sistema_contra_incendios);
                $resultado->bindParam(':gas_centralizado',$this->gas_centralizado);
                $resultado->bindParam(':ventilacion',$this->ventilacion);
                $resultado->bindParam(':sistema_voz_datos',$this->sistema_voz_datos);
                $resultado->bindParam(':alumbrado_publico',$this->alumbrado_publico);
                $resultado->bindParam(':recoleccion_basura',$this->recoleccion_basura);
                $resultado->bindParam(':transporte_urbano',$this->transporte_urbano);
                $resultado->bindParam(':aseo_calles',$this->aseo_calles);
                $resultado->bindParam(':alcantarillado',$this->alcantarillado);
                $resultado->bindParam(':aceras',$this->aceras);
                $resultado->bindParam(':bordillos',$this->bordillos);  
                        
                $resultado->execute();
                echo json_encode("Infraestructura de predio actualizada exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }

        // DELETE Borrar infraestructura de predio por ID
        public static function eliminarInfraestructura($id){
        
            $id_infraestructura = intval($id);        
            $sql = "DELETE FROM infraestructura WHERE inf_idinfraestructura=:idinfraestructura";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);        
        
                $resultado->bindParam(':idinfraestructura', $id_infraestructura);
                $resultado->execute();

                if ($resultado->rowCount() > 0){
                    echo json_encode("Infraestructura de predio eliminado exitosamente", JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe infraestructura de predio con este ID", JSON_UNESCAPED_UNICODE);
                }                     
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }
} 

?>
