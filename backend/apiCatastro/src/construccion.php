<?php

include_once ("./src/db.php");

class Construcccion {

    //private $idconstruccion;
    private $clave_predio;
    private $idubicacion;
    private $numero_bloque;
    private $numero_piso;
    private $numero_unidad;
    private $nivel_piso;
    private $condicion_fisica;
    private $uso_constructivo;
    private $valor_cultural;
    private $area_construccion;
    private $anio_construccion;
    private $anio_restauracion;
    private $estado_conservacion;
    private $mamposteria_soportante;
    private $columnas;
    private $vigas;
    private $entrepiso;
    private $cubierta_entrepiso;
    private $gradas;
    private $contrapiso;
    private $paredes;
    private $enlucido_paredes;
    private $enlucido_tumbados;
    private $revestimiento_pared_interior;
    private $revestimiento_pared_exterior;
    private $revestimiento_cubierta;
    private $tumbados;
    private $ventanas;
    private $vidrios;
    private $puertas;
    private $closets;
    private $pisos;
    private $proteccion_ventanas;
    private $gradas_acabados;
    private $clasificacion_vivienda;
    private $tipo_vivienda;
    private $condicion_ocupacion;
    private $acabado_piso;
    private $estado_piso;
    private $numero_hogares;
    private $numero_habitantes;
    private $numero_habitaciones;
    private $numero_dormitorios;
    private $espacios_aseo_duchas;
    private $tenencia_vivienda;
    private $telefono_convencional;
    private $cantidad_celulares;
    private $servicio_internet;
    private $total_propiedad_exclusiva;
    private $total_propiedad_comunal;
    private $alicuota_porcentaje;

            function __construct($cdc_clave_predio,$cdc_idubicacion,$cdc_numero_bloque,$cdc_numero_piso,$cdc_numero_unidad,$cdc_nivel_piso,$cdc_condicion_fisica,$cdc_uso_constructivo,$cdc_valor_cultural,$cdc_area_construccion,$cdc_anio_construccion,$cdc_anio_restauracion,$cdc_estado_conservacion,$cdc_mamposteria_soportante,$cdc_columnas,$cdc_vigas,$cdc_entrepiso,$cdc_cubierta_entrepiso,$cdc_gradas,$cdc_contrapiso,$cdc_paredes,$cdc_elucido_paredes,$cdc_enlucido_tumbados,$cdc_revestimiento_pared_interior,$cdc_revestimiento_pared_exterior,$cdc_revestimiento_cubierta,$cdc_tumbados,$cdc_ventanas,$cdc_vidrios,$cdc_puertas,$cdc_closets,$cdc_pisos,$cdc_proteccion_ventanas,$cdc_gradas_acabados,$cdc_clasificacion_vivienda,$cdc_tipo_vivienda,$cdc_condicion_ocupacion,$cdc_acabado_piso,$cdc_estado_piso,$cdc_numero_hogares,$cdc_numero_habitantes,$cdc_numero_habitaciones,$cdc_numero_dormitorios,$cdc_espacios_aseo_duchas,$cdc_tenencia_vivienda,$cdc_telefono_convencional,$cdc_cantidad_celulares,$cdc_servicio_internet,$cdc_total_propiedad_exclusiva,$cdc_total_propiedad_comunal,$cdc_alicuota_porcentaje)
            {               
                $this->clave_predio = $cdc_clave_predio;
                $this->idubicacion = $cdc_idubicacion;
                $this->numero_bloque = $cdc_numero_bloque;
                $this->numero_piso = $cdc_numero_piso;
                $this->numero_unidad = $cdc_numero_unidad;
                $this->nivel_piso = $cdc_nivel_piso;
                $this->condicion_fisica = $cdc_condicion_fisica;
                $this->uso_constructivo = $cdc_uso_constructivo;
                $this->valor_cultural = $cdc_valor_cultural;
                $this->area_construccion = $cdc_area_construccion;
                $this->anio_construccion = $cdc_anio_construccion;
                $this->anio_restauracion = $cdc_anio_restauracion;
                $this->estado_conservacion = $cdc_estado_conservacion;
                $this->mamposteria_soportante = $cdc_mamposteria_soportante;
                $this->columnas = $cdc_columnas;
                $this->vigas = $cdc_vigas;
                $this->entrepiso = $cdc_entrepiso;
                $this->cubierta_entrepiso = $cdc_cubierta_entrepiso;
                $this->gradas = $cdc_gradas;
                $this->contrapiso = $cdc_contrapiso;
                $this->paredes = $cdc_paredes;
                $this->enlucido_paredes = $cdc_enlucido_paredes;
                $this->enlucido_tumbados = $cdc_elucido_tumbados;
                $this->revestimiento_pared_interior = $cdc_revestimiento_pared_interior;
                $this->revestimiento_pared_exterior = $cdc_revestimiento_pared_exterior;
                $this->revestimiento_cubierta = $cdc_revestimiento_cubierta;
                $this->tumbados = $cdc_tumbados;
                $this->ventanas = $cdc_ventanas;
                $this->vidrios = $cdc_vidrios;
                $this->puertas = $cdc_puertas;
                $this->closets = $cdc_closets;
                $this->pisos = $cdc_pisos;
                $this->proteccion_ventanas = $cdc_proteccion_ventanas;
                $this->gradas_acabados = $cdc_gradas_acabados;
                $this->clasificacion_vivienda = $cdc_clasificacion_vivienda;
                $this->tipo_vivienda = $cdc_tipo_vivienda;
                $this->condicion_ocupacion = $cdc_condicion_ocupacion;
                $this->acabado_piso = $cdc_acabado_piso;
                $this->estado_piso = $cdc_estado_piso;
                $this->numero_hogares = $cdc_numero_hogares;
                $this->numero_habitantes = $cdc_numero_habitantes;
                $this->numero_habitaciones = $cdc_numero_habitaciones;
                $this->numero_dormitorios = $cdc_numero_dormitorios;
                $this->espacios_aseo_duchas = $cdc_espacios_aseo_duchas;
                $this->tenencia_vivienda = $cdc_tenencia_vivienda;
                $this->telefono_convencional = $cdc_telefono_convencional;
                $this->cantidad_celulares = $cdc_cantidad_celulares;
                $this->servicio_internet = $cdc_servicio_internet;
                $this->total_propiedad_exclusiva = $cdc_total_propiedad_exclusiva;
                $this->total_propiedad_comunal = $cdc_total_propiedad_comunal;
                $this->alicuota_porcentaje = $cdc_alicuota_porcentaje;     
                        
            
            } 

        // CRUD

        // GET Todos las caracteristicas de construcción por cada predio
        public static function todasConstrucciones(){
            
            $sql = "SELECT * FROM construccion_caracteristicas";
            //$rs = "SELECT MAX(cdc_idconstruccion_caracteristicas) AS maxid from construccion_caracteristicas"; // UltimoRegistro
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                //$last_id = $db->query($rs);  // UltimoRegistro
                $json = [];
        

                if ($resultado->rowCount() > 0){
                    $construccion = $resultado->fetchAll(PDO::FETCH_OBJ);
            
                    //Obtiene el último registro en base al mayor id de la tabla
                    //$maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                    //$ultimo = intval($maxid[0]->maxid)+1;
                    //echo $ultimo;
                    ////////////////////////////////////////////////////////////////
                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("idconstruccion"=>intval($construccion[$i]->cdc_idconstruccion_caracteristicas),
                                    "clave_predio"=>$construccion[$i]->cdc_clave_predio,
                                    "idubicacion"=>intval($construccion[$i]->cdc_idubicacion),                    
                                    "numero_bloque"=>$construccion[$i]->cdc_numero_bloque,
                                    "numero_piso"=>$construccion[$i]->cdc_numero_piso,
                                    "numero_unidad"=>$construccion[$i]->cdc_numero_unidad,
                                    "nivel_piso"=>$construccion[$i]->cdc_nivel_piso,
                                    "condicion_fisica"=>$construccion[$i]->cdc_condicion_fisica,
                                    "uso_constructivo"=>$construccion[$i]->cdc_uso_constructivo,
                                    "valor_cultural"=>$construccion[$i]->cdc_valor_cultural,
                                    "area_construccion"=>$construccion[$i]->cdc_area_construccion,
                                    "anio_construccion"=>$construccion[$i]->cdc_anio_construccion,
                                    "anio_restauracion"=>$construccion[$i]->cdc_anio_restauracion,
                                    "estado_conservacion"=>$construccion[$i]->cdc_estado_conservacion,
                                    "mamposteria_soportante"=>$construccion[$i]->cdc_mamposteria_soportante,
                                    "columnas"=>$construccion[$i]->cdc_columnas,
                                    "vigas"=>$construccion[$i]->cdc_vigas,
                                    "entrepiso"=>$construccion[$i]->cdc_entrepiso,
                                    "cubierta_entrepiso"=>$construccion[$i]->cdc_cubierta_entrepiso,
                                    "gradas"=>$construccion[$i]->cdc_gradas,
                                    "contrapiso"=>$construccion[$i]->cdc_contrapiso,
                                    "paredes"=>$construccion[$i]->cdc_paredes,
                                    "enlucido_paredes"=>$construccion[$i]->cdc_enlucido_paredes,
                                    "enlucido_tumbados"=>$construccion[$i]->cdc_elucido_tumbados,
                                    "revestimiento_pared_interior"=>$construccion[$i]->cdc_revestimiento_pared_interior,
                                    "revestimiento_pared_exterior"=>$construccion[$i]->cdc_revestimiento_pared_exterior,
                                    "revestimiento_cubierta"=>$construccion[$i]->cdc_revestimiento_cubierta,
                                    "tumbados"=>$construccion[$i]->cdc_tumbados,
                                    "ventanas"=>$construccion[$i]->cdc_ventanas,
                                    "vidrios"=>$construccion[$i]->cdc_vidrios,
                                    "puertas"=>$construccion[$i]->cdc_puertas,
                                    "closets"=>$construccion[$i]->cdc_closets,
                                    "pisos"=>$construccion[$i]->cdc_pisos,
                                    "proteccion_ventanas"=>$construccion[$i]->cdc_proteccion_ventanas,
                                    "gradas_acabados"=>$construccion[$i]->cdc_gradas_acabados,
                                    "clasificacion_vivienda"=>$construccion[$i]->cdc_clasificacion_vivienda,
                                    "tipo_vivienda"=>$construccion[$i]->cdc_tipo_vivienda,
                                    "condicion_ocupacion"=>$construccion[$i]->cdc_condicion_ocupacion,
                                    "acabado_piso"=>$construccion[$i]->cdc_acabado_piso,
                                    "estado_piso"=>$construccion[$i]->cdc_estado_piso,
                                    "numero_hogares"=>$construccion[$i]->cdc_numero_hogares,
                                    "numero_habitantes"=>$construccion[$i]->cdc_numero_habitantes,
                                    "numero_habitaciones"=>$construccion[$i]->cdc_numero_habitaciones,
                                    "numero_dormitorios"=>$construccion[$i]->cdc_numero_dormitorios,
                                    "espacios_aseo_duchas"=>$construccion[$i]->cdc_espacios_aseo_duchas,
                                    "tenencia_vivienda"=>$construccion[$i]->cdc_tenencia_vivienda,
                                    "telefono_convencional"=>$construccion[$i]->cdc_telefono_convencional,
                                    "cantidad_celulares"=>$construccion[$i]->cdc_cantidad_celulares,
                                    "servicio_internet"=>$construccion[$i]->cdc_servicio_internet,
                                    "total_propiedad_exclusiva"=>$construccion[$i]->cdc_total_propiedad_exclusiva,
                                    "total_propiedad_comunal"=>$construccion[$i]->cdc_total_propiedad_comunal,
                                    "alicuota_porcentaje"=>$construccion[$i]->cdc_alicuota_porcentaje
                                    );

                        $json[] = $ejemplo;
                    }        
                        echo json_encode($json, JSON_UNESCAPED_UNICODE);
                        //echo json_encode($construccion, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existen características de construcción de predios registradas en la BD");
                }
                $resultado = null;
                $db = null;
            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }

        // GET Recuperar características de construcción de predio por ID
        public static function verConstruccion($id){
            $id_construccion = intval($id);    
            //$sql = "SELECT * FROM construccion_caracteristicas WHERE cdc_idconstruccion_caracteristicas = $id_construccion"; ->ID Construccion
              $sql = "SELECT * FROM construccion_caracteristicas WHERE cdc_idubicacion = $id_construccion"; // -> ID Ubicacion/ID Predio
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                $json = [];

                if ($resultado->rowCount() > 0){
                    $construccion = $resultado->fetchAll(PDO::FETCH_OBJ);
                    for($i=0;$i<$resultado->rowCount();$i++) {
                            $ejemplo = array("idconstruccion"=>intval($construccion[$i]->cdc_idconstruccion_caracteristicas),
                                        "clave_predio"=>$construccion[$i]->cdc_clave_predio,
                                        "idubicacion"=>intval($construccion[$i]->cdc_idubicacion),                    
                                        "numero_bloque"=>$construccion[$i]->cdc_numero_bloque,
                                        "numero_piso"=>$construccion[$i]->cdc_numero_piso,
                                        "numero_unidad"=>$construccion[$i]->cdc_numero_unidad,
                                        "nivel_piso"=>$construccion[$i]->cdc_nivel_piso,
                                        "condicion_fisica"=>$construccion[$i]->cdc_condicion_fisica,
                                        "uso_constructivo"=>$construccion[$i]->cdc_uso_constructivo,
                                        "valor_cultural"=>$construccion[$i]->cdc_valor_cultural,
                                        "area_construccion"=>$construccion[$i]->cdc_area_construccion,
                                        "anio_construccion"=>$construccion[$i]->cdc_anio_construccion,
                                        "anio_restauracion"=>$construccion[$i]->cdc_anio_restauracion,
                                        "estado_conservacion"=>$construccion[$i]->cdc_estado_conservacion,
                                        "mamposteria_soportante"=>$construccion[$i]->cdc_mamposteria_soportante,
                                        "columnas"=>$construccion[$i]->cdc_columnas,
                                        "vigas"=>$construccion[$i]->cdc_vigas,
                                        "entrepiso"=>$construccion[$i]->cdc_entrepiso,
                                        "cubierta_entrepiso"=>$construccion[$i]->cdc_cubierta_entrepiso,
                                        "gradas"=>$construccion[$i]->cdc_gradas,
                                        "contrapiso"=>$construccion[$i]->cdc_contrapiso,
                                        "paredes"=>$construccion[$i]->cdc_paredes,
                                        "enlucido_paredes"=>$construccion[$i]->cdc_enlucido_paredes,
                                        "enlucido_tumbados"=>$construccion[$i]->cdc_elucido_tumbados,
                                        "revestimiento_pared_interior"=>$construccion[$i]->cdc_revestimiento_pared_interior,
                                        "revestimiento_pared_exterior"=>$construccion[$i]->cdc_revestimiento_pared_exterior,
                                        "revestimiento_cubierta"=>$construccion[$i]->cdc_revestimiento_cubierta,
                                        "tumbados"=>$construccion[$i]->cdc_tumbados,
                                        "ventanas"=>$construccion[$i]->cdc_ventanas,
                                        "vidrios"=>$construccion[$i]->cdc_vidrios,
                                        "puertas"=>$construccion[$i]->cdc_puertas,
                                        "closets"=>$construccion[$i]->cdc_closets,
                                        "pisos"=>$construccion[$i]->cdc_pisos,
                                        "proteccion_ventanas"=>$construccion[$i]->cdc_proteccion_ventanas,
                                        "gradas_acabados"=>$construccion[$i]->cdc_gradas_acabados,
                                        "clasificacion_vivienda"=>$construccion[$i]->cdc_clasificacion_vivienda,
                                        "tipo_vivienda"=>$construccion[$i]->cdc_tipo_vivienda,
                                        "condicion_ocupacion"=>$construccion[$i]->cdc_condicion_ocupacion,
                                        "acabado_piso"=>$construccion[$i]->cdc_acabado_piso,
                                        "estado_piso"=>$construccion[$i]->cdc_estado_piso,
                                        "numero_hogares"=>$construccion[$i]->cdc_numero_hogares,
                                        "numero_habitantes"=>$construccion[$i]->cdc_numero_habitantes,
                                        "numero_habitaciones"=>$construccion[$i]->cdc_numero_habitaciones,
                                        "numero_dormitorios"=>$construccion[$i]->cdc_numero_dormitorios,
                                        "espacios_aseo_duchas"=>$construccion[$i]->cdc_espacios_aseo_duchas,
                                        "tenencia_vivienda"=>$construccion[$i]->cdc_tenencia_vivienda,
                                        "telefono_convencional"=>$construccion[$i]->cdc_telefono_convencional,
                                        "cantidad_celulares"=>$construccion[$i]->cdc_cantidad_celulares,
                                        "servicio_internet"=>$construccion[$i]->cdc_servicio_internet,
                                        "total_propiedad_exclusiva"=>$construccion[$i]->cdc_total_propiedad_exclusiva,
                                        "total_propiedad_comunal"=>$construccion[$i]->cdc_total_propiedad_comunal,
                                        "alicuota_porcentaje"=>$construccion[$i]->cdc_alicuota_porcentaje
                                        );
                
                            $json[] = $ejemplo;
                    }        
        
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);
                    //echo json_encode($construccion, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe características de construcción de predios en la BD con este ID");
                }
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // POST Crear nueva característica de construcción de predio  
        public function guardarConstruccion(){
    
            $rs = "SELECT MAX(cdc_idconstruccion_caracteristicas) AS maxid from construccion_caracteristicas"; // UltimoRegistro    
                        
            $sql = "INSERT INTO construccion_caracteristicas (cdc_idconstruccion_caracteristicas,cdc_clave_predio,cdc_idubicacion,cdc_numero_bloque,cdc_numero_piso,cdc_numero_unidad,cdc_nivel_piso,cdc_condicion_fisica,cdc_uso_constructivo,cdc_valor_cultural,cdc_area_construccion,cdc_anio_construccion,cdc_anio_restauracion,cdc_estado_conservacion,cdc_mamposteria_soportante,cdc_columnas,cdc_vigas,cdc_entrepiso,cdc_cubierta_entrepiso,cdc_gradas,cdc_contrapiso,cdc_paredes,cdc_enlucido_paredes,cdc_elucido_tumbados,cdc_revestimiento_pared_interior,cdc_revestimiento_pared_exterior,cdc_revestimiento_cubierta,cdc_tumbados,cdc_ventanas,cdc_vidrios,cdc_puertas,cdc_closets,cdc_pisos,cdc_proteccion_ventanas,cdc_gradas_acabados,cdc_clasificacion_vivienda,cdc_tipo_vivienda,cdc_condicion_ocupacion,cdc_acabado_piso,cdc_estado_piso,cdc_numero_hogares,cdc_numero_habitantes,cdc_numero_habitaciones,cdc_numero_dormitorios,cdc_espacios_aseo_duchas,cdc_tenencia_vivienda,cdc_telefono_convencional,cdc_cantidad_celulares,cdc_servicio_internet,cdc_total_propiedad_exclusiva,cdc_total_propiedad_comunal,cdc_alicuota_porcentaje) VALUES
                    (:idconstruccion,:clave_predio,:idubicacion,:numero_bloque,:numero_piso,:numero_unidad,:nivel_piso,:condicion_fisica,:uso_constructivo,:valor_cultural,:area_construccion,:anio_construccion,:anio_restauracion,:estado_conservacion,:mamposteria_soportante,:columnas,:vigas,:entrepiso,:cubierta_entrepiso,:gradas,:contrapiso,:paredes,:enlucido_paredes,:enlucido_tumbados,:revestimiento_pared_interior,:revestimiento_pared_exterior,:revestimiento_cubierta,:tumbados,:ventanas,:vidrios,:puertas,:closets,:pisos,:proteccion_ventanas,:gradas_acabados,:clasificacion_vivienda,:tipo_vivienda,:condicion_ocupacion,:acabado_piso,:estado_piso,:numero_hogares,:numero_habitantes,:numero_habitaciones,:numero_dormitorios,:espacios_aseo_duchas,:tenencia_vivienda,:telefono_convencional,:cantidad_celulares,:servicio_internet,:total_propiedad_exclusiva,:total_propiedad_comunal,:alicuota_porcentaje)";

            try {
                $db = new db();
                $db = $db->conexionDB();        
                $last_id = $db->query($rs); // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
       
                $resultado = $db->prepare($sql);

                $resultado->bindParam(':idconstruccion', intval($ultimo));
                $resultado->bindParam(':clave_predio', $this->clave_predio);
                $resultado->bindParam(':idubicacion', intval($this->idubicacion));
                $resultado->bindParam(':numero_bloque',$this->numero_bloque);
                $resultado->bindParam(':numero_piso', $this->numero_piso);
                $resultado->bindParam(':numero_unidad', $this->numero_unidad);
                $resultado->bindParam(':nivel_piso', $this->nivel_piso);
                $resultado->bindParam(':condicion_fisica', $this->condicion_fisica);
                $resultado->bindParam(':uso_constructivo', $this->uso_constructivo);
                $resultado->bindParam(':valor_cultural', $this->valor_cultural);
                $resultado->bindParam(':area_construccion', $this->area_construccion);
                $resultado->bindParam(':anio_construccion', $this->anio_construccion);
                $resultado->bindParam(':anio_restauracion', $this->anio_restauracion);
                $resultado->bindParam(':estado_conservacion', $this->estado_conservacion);
                $resultado->bindParam(':mamposteria_soportante',  $this->mamposteria_soportante);
                $resultado->bindParam(':columnas', $this->columnas);
                $resultado->bindParam(':vigas', $this->vigas);
                $resultado->bindParam(':entrepiso', $this->entrepiso);
                $resultado->bindParam(':cubierta_entrepiso', $this->cubierta_entrepiso);
                $resultado->bindParam(':gradas', $this->gradas);
                $resultado->bindParam(':contrapiso', $this->contrapiso);
                $resultado->bindParam(':paredes', $this->paredes);
                $resultado->bindParam(':enlucido_paredes', $this->enlucido_paredes);
                $resultado->bindParam(':enlucido_tumbados', $this->enlucido_tumbados);
                $resultado->bindParam(':revestimiento_pared_interior',   $this->revestimiento_pared_interior);
                $resultado->bindParam(':revestimiento_pared_exterior',   $this->revestimiento_pared_exterior);
                $resultado->bindParam(':revestimiento_cubierta',   $this->revestimiento_cubierta);
                $resultado->bindParam(':tumbados', $this->tumbados);
                $resultado->bindParam(':ventanas', $this->ventanas);
                $resultado->bindParam(':vidrios', $this->vidrios);
                $resultado->bindParam(':puertas', $this->puertas);
                $resultado->bindParam(':closets', $this->closets);
                $resultado->bindParam(':pisos', $this->pisos);
                $resultado->bindParam(':proteccion_ventanas', $this->proteccion_ventanas);
                $resultado->bindParam(':gradas_acabados', $this->gradas_acabados);
                $resultado->bindParam(':clasificacion_vivienda',   $this->clasificacion_vivienda);
                $resultado->bindParam(':tipo_vivienda', $this->tipo_vivienda);
                $resultado->bindParam(':condicion_ocupacion', $this->condicion_ocupacion);
                $resultado->bindParam(':acabado_piso', $this->acabado_piso);
                $resultado->bindParam(':estado_piso', $this->estado_piso);
                $resultado->bindParam(':numero_hogares', $this->numero_hogares);
                $resultado->bindParam(':numero_habitantes', $this->numero_habitantes);
                $resultado->bindParam(':numero_habitaciones', $this->numero_habitaciones);
                $resultado->bindParam(':numero_dormitorios', $this->numero_dormitorios);
                $resultado->bindParam(':espacios_aseo_duchas', $this->espacios_aseo_duchas);
                $resultado->bindParam(':tenencia_vivienda', $this->tenencia_vivienda);
                $resultado->bindParam(':telefono_convencional',   $this->telefono_convencional);
                $resultado->bindParam(':cantidad_celulares', $this->cantidad_celulares);
                $resultado->bindParam(':servicio_internet', $this->servicio_internet);
                $resultado->bindParam(':total_propiedad_exclusiva',  $this->total_propiedad_exclusiva);
                $resultado->bindParam(':total_propiedad_comunal',  $this->total_propiedad_comunal);
                $resultado->bindParam(':alicuota_porcentaje',$this->alicuota_porcentaje);

                $resultado->execute();
                echo json_encode("Nueva característica de construcción en predio guardada exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';
                }
        }


        // PUT Actualizar característica de construcción de un predio por ID
        public function actualizarConstruccion($id){
                
            $id_construccion = intval($id);        
            $sql = "UPDATE construccion_caracteristicas SET 
                    cdc_clave_predio=:clave_predio,
                    cdc_idubicacion=:idubicacion,
                    cdc_numero_bloque=:numero_bloque,
                    cdc_numero_piso=:numero_piso,
                    cdc_numero_unidad=:numero_unidad,
                    cdc_nivel_piso=:nivel_piso,
                    cdc_condicion_fisica=:condicion_fisica,
                    cdc_uso_constructivo=:uso_constructivo,
                    cdc_valor_cultural=:valor_cultural,
                    cdc_area_construccion=:area_construccion,
                    cdc_anio_construccion=:anio_construccion,
                    cdc_anio_restauracion=:anio_restauracion,
                    cdc_estado_conservacion=:estado_conservacion,
                    cdc_mamposteria_soportante=:mamposteria_soportante,
                    cdc_columnas=:columnas,
                    cdc_vigas=:vigas,
                    cdc_entrepiso=:entrepiso,
                    cdc_cubierta_entrepiso=:cubierta_entrepiso,
                    cdc_gradas=:gradas,
                    cdc_contrapiso=:contrapiso,
                    cdc_paredes=:paredes,
                    cdc_enlucido_paredes=:enlucido_paredes,
                    cdc_elucido_tumbados=:enlucido_tumbados,
                    cdc_revestimiento_pared_interior=:revestimiento_pared_interior,
                    cdc_revestimiento_pared_exterior=:revestimiento_pared_exterior,
                    cdc_revestimiento_cubierta=:revestimiento_cubierta,
                    cdc_tumbados=:tumbados,
                    cdc_ventanas=:ventanas,
                    cdc_vidrios=:vidrios,
                    cdc_puertas=:puertas,
                    cdc_closets=:closets,
                    cdc_pisos=:pisos,
                    cdc_proteccion_ventanas=:proteccion_ventanas,
                    cdc_gradas_acabados=:gradas_acabados,
                    cdc_clasificacion_vivienda=:clasificacion_vivienda,
                    cdc_tipo_vivienda=:tipo_vivienda,
                    cdc_condicion_ocupacion=:condicion_ocupacion,
                    cdc_acabado_piso=:acabado_piso,
                    cdc_estado_piso=:estado_piso,
                    cdc_numero_hogares=:numero_hogares,
                    cdc_numero_habitantes=:numero_habitantes,
                    cdc_numero_habitaciones=:numero_habitaciones,
                    cdc_numero_dormitorios=:numero_dormitorios,
                    cdc_espacios_aseo_duchas=:espacios_aseo_duchas,
                    cdc_tenencia_vivienda=:tenencia_vivienda,
                    cdc_telefono_convencional=:telefono_convencional,
                    cdc_cantidad_celulares=:cantidad_celulares,
                    cdc_servicio_internet=:servicio_internet,
                    cdc_total_propiedad_exclusiva=:total_propiedad_exclusiva,
                    cdc_total_propiedad_comunal=:total_propiedad_comunal,
                    cdc_alicuota_porcentaje=:alicuota_porcentaje
                    WHERE cdc_idconstruccion_caracteristicas=:idconstruccion";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);      
       
                $resultado->bindParam(':idconstruccion', intval($id_construccion));                
                $resultado->bindParam(':clave_predio', $this->clave_predio);
                $resultado->bindParam(':idubicacion', intval($this->idubicacion));
                $resultado->bindParam(':numero_bloque',$this->numero_bloque);
                $resultado->bindParam(':numero_piso', $this->numero_piso);
                $resultado->bindParam(':numero_unidad', $this->numero_unidad);
                $resultado->bindParam(':nivel_piso', $this->nivel_piso);
                $resultado->bindParam(':condicion_fisica', $this->condicion_fisica);
                $resultado->bindParam(':uso_constructivo', $this->uso_constructivo);
                $resultado->bindParam(':valor_cultural', $this->valor_cultural);
                $resultado->bindParam(':area_construccion', $this->area_construccion);
                $resultado->bindParam(':anio_construccion', $this->anio_construccion);
                $resultado->bindParam(':anio_restauracion', $this->anio_restauracion);
                $resultado->bindParam(':estado_conservacion', $this->estado_conservacion);
                $resultado->bindParam(':mamposteria_soportante',  $this->mamposteria_soportante);
                $resultado->bindParam(':columnas', $this->columnas);
                $resultado->bindParam(':vigas', $this->vigas);
                $resultado->bindParam(':entrepiso', $this->entrepiso);
                $resultado->bindParam(':cubierta_entrepiso', $this->cubierta_entrepiso);
                $resultado->bindParam(':gradas', $this->gradas);
                $resultado->bindParam(':contrapiso', $this->contrapiso);
                $resultado->bindParam(':paredes', $this->paredes);
                $resultado->bindParam(':enlucido_paredes', $this->enlucido_paredes);
                $resultado->bindParam(':enlucido_tumbados', $this->enlucido_tumbados);
                $resultado->bindParam(':revestimiento_pared_interior',   $this->revestimiento_pared_interior);
                $resultado->bindParam(':revestimiento_pared_exterior',   $this->revestimiento_pared_exterior);
                $resultado->bindParam(':revestimiento_cubierta',   $this->revestimiento_cubierta);
                $resultado->bindParam(':tumbados', $this->tumbados);
                $resultado->bindParam(':ventanas', $this->ventanas);
                $resultado->bindParam(':vidrios', $this->vidrios);
                $resultado->bindParam(':puertas', $this->puertas);
                $resultado->bindParam(':closets', $this->closets);
                $resultado->bindParam(':pisos', $this->pisos);
                $resultado->bindParam(':proteccion_ventanas', $this->proteccion_ventanas);
                $resultado->bindParam(':gradas_acabados', $this->gradas_acabados);
                $resultado->bindParam(':clasificacion_vivienda',   $this->clasificacion_vivienda);
                $resultado->bindParam(':tipo_vivienda', $this->tipo_vivienda);
                $resultado->bindParam(':condicion_ocupacion', $this->condicion_ocupacion);
                $resultado->bindParam(':acabado_piso', $this->acabado_piso);
                $resultado->bindParam(':estado_piso', $this->estado_piso);
                $resultado->bindParam(':numero_hogares', $this->numero_hogares);
                $resultado->bindParam(':numero_habitantes', $this->numero_habitantes);
                $resultado->bindParam(':numero_habitaciones', $this->numero_habitaciones);
                $resultado->bindParam(':numero_dormitorios', $this->numero_dormitorios);
                $resultado->bindParam(':espacios_aseo_duchas', $this->espacios_aseo_duchas);
                $resultado->bindParam(':tenencia_vivienda', $this->tenencia_vivienda);
                $resultado->bindParam(':telefono_convencional',   $this->telefono_convencional);
                $resultado->bindParam(':cantidad_celulares', $this->cantidad_celulares);
                $resultado->bindParam(':servicio_internet', $this->servicio_internet);
                $resultado->bindParam(':total_propiedad_exclusiva',  $this->total_propiedad_exclusiva);
                $resultado->bindParam(':total_propiedad_comunal',  $this->total_propiedad_comunal);
                $resultado->bindParam(':alicuota_porcentaje',$this->alicuota_porcentaje);
                $resultado->execute();
                echo json_encode("Característica de construcción en predio actualizada exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }

    
        // DELETE Borrar característica de construcción en predio por ID
        public static function eliminarConstruccion($id){
        
            $id_construccion = intval($id);        
            $sql = "DELETE FROM construccion_caracteristicas WHERE cdc_idconstruccion_caracteristicas=:idconstruccion";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);        
        
                $resultado->bindParam(':idconstruccion', $id_construccion);
                $resultado->execute();

                if ($resultado->rowCount() > 0){
                    echo json_encode("Característica de construcción en predio eliminada exitosamente", JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe característica de construcción en predio con este ID", JSON_UNESCAPED_UNICODE);
                }                     
        
            $resultado = null;
            $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }
}

?>
