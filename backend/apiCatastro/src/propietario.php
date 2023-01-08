<?php

include_once ("../src/db.php");

class Propietario {
    
            //private $idpropietario;            
            private $identificacion;
            private $tipo;
            private $primer_apellido;
            private $segundo_apellido;
            private $primer_nombre;
            private $segundo_nombre;
            private $documento_tipo;
            private $estado_civil;
            private $porcentaje_participacion;
            private $representante;
            private $anio_nacimiento;
            private $mes_nacimiento;
            private $dia_nacimiento;
            private $nacionalidad;
            private $email;
            private $telefono;
            private $ciudad_domicilio;
            private $direccion_domicilio;
            private $jefe_hogar;
            private $p_juridica;
            private $ruc;
            private $razon_social;
            private $inscrito;
            private $lugar_inscripcion;
            private $acuerdo_reg;
            private $representante_legal;
            private $doc_representante;
            private $idrepresentante;
            private $email_representante;
            private $telf_representante;
            private $conyugue;
            private $conyugue_apellidos;
            private $conyugue_nombres;
            private $conyugue_doc;
            private $conyugueid;
            private $conyugue_telf;
            private $conyugue_participacion;
            private $conyugue_email;



            function __construct($identificacion,$tipo,$primer_apellido,$segundo_apellido,$primer_nombre,$segundo_nombre,$documento_tipo,$estado_civil,$porcentaje_participacion,$representante,$anio_nacimiento,$mes_nacimiento,$dia_nacimiento,$nacionalidad,$email,$telefono,$ciudad_domicilio,$direccion_domicilio,$jefe_hogar,$p_juridica,$ruc,$razon_social,$inscrito,$lugar_inscripcion,$acuerdo_reg,$representante_legal,$doc_representante,$idrepresentante,$email_representante,$telf_representante,$conyugue,$conyugue_apellidos,$conyugue_nombres,$conyugue_doc,$conyugueid,$conyugue_telf,$conyugue_participacion,$conyugue_email){

                //$this->idpropietario =$idpropietario;
                $this->identificacion=$identificacion;
                $this->tipo=$tipo;
                $this->primer_apellido=$primer_apellido;
                $this->segundo_apellido=$segundo_apellido;
                $this->primer_nombre=$primer_nombre;
                $this->segundo_nombre=$segundo_nombre;
                $this->documento_tipo=$documento_tipo;
                $this->estado_civil=$estado_civil;
                $this->porcentaje_participacion=$porcentaje_participacion;
                $this->representante=$representante;
                $this->anio_nacimiento=$anio_nacimiento;
                $this->mes_nacimiento=$mes_nacimiento;
                $this->dia_nacimiento=$dia_nacimiento;
                $this->nacionalidad=$nacionalidad;
                $this->email=$email;
                $this->telefono=$telefono;
                $this->ciudad_domicilio=$ciudad_domicilio;
                $this->direccion_domicilio=$direccion_domicilio;
                $this->jefe_hogar=$jefe_hogar;
                $this->p_juridica=$p_juridica;
                $this->ruc=$ruc;
                $this->razon_social=$razon_social;
                $this->inscrito=$inscrito;
                $this->lugar_inscripcion=$lugar_inscripcion;
                $this->acuerdo_reg=$acuerdo_reg;
                $this->representante_legal=$representante_legal;
                $this->doc_representante=$doc_representante;
                $this->idrepresentante=$idrepresentante;
                $this->email_representante=$email_representante;
                $this->telf_representante=$telf_representante;
                $this->conyugue=$conyugue;
                $this->conyugue_apellidos=$conyugue_apellidos;
                $this->conyugue_nombres=$conyugue_nombres;
                $this->conyugue_doc=$conyugue_doc;
                $this->conyugueid=$conyugueid;
                $this->conyugue_telf=$conyugue_telf;
                $this->conyugue_participacion=$conyugue_participacion;
                $this->conyugue_email=$conyugue_email;
            }
            
            // CRUD

            // GET TODOS LOS PROPIETARIOS


            public static function verPropietarios(){

                $sql = "SELECT * FROM propietario";
                try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                $json = [];

                if ($resultado->rowCount() > 0){
                    $propietario = $resultado->fetchAll(PDO::FETCH_OBJ);
            
                    for($i=0;$i<$resultado->rowCount();$i++) {
                            $ejemplo = array( 
                               "idpropietario"=> intval($propietario[$i]->pro_idpropietario),
                                "identificacion"=>$propietario[$i]->pro_identificacion,
                                "tipo"=>$propietario[$i]->pro_tipo_propietario,
                                "primer_apellido"=>$propietario[$i]->pro_primer_apellido,
                                "segundo_apellido"=>$propietario[$i]->pro_segundo_apellido,
                                "primer_nombre"=>$propietario[$i]->pro_primer_nombre,
                                "segundo_nombre"=>$propietario[$i]->pro_segundo_nombre,
                                "documento_tipo"=>$propietario[$i]->pro_tipo_documento,
                                "estado_civil"=>$propietario[$i]->pro_estado_civil,
                                "porcentaje_participacion"=>$propietario[$i]->pro_participacion_porcentaje,
                                "representante"=>$propietario[$i]->pro_representante,
                                "anio_nacimiento"=>$propietario[$i]->pro_anio_nacimiento,
                                "mes_nacimiento"=>$propietario[$i]->pro_mes_nacimiento,
                                "dia_nacimiento"=>$propietario[$i]->pro_dia_nacimiento,
                                "nacionalidad"=>$propietario[$i]->pro_nacionalidad,
                                "email"=>$propietario[$i]->pro_email,
                                "telefono"=>$propietario[$i]->pro_telefono,
                                "ciudad_domicilio"=>$propietario[$i]->pro_ciudad_domicilio,
                                "direccion_domicilio"=>$propietario[$i]->pro_direccion_domicilio,
                                "jefe_hogar"=>$propietario[$i]->pro_jefe_hogar,
                                "p_juridica"=>$propietario[$i]->pro_personeria_juridica,
                                "ruc"=>$propietario[$i]->pro_ruc,
                                "razon_social"=>$propietario[$i]->pro_razon_social,
                                "inscrito"=>$propietario[$i]->pro_inscrito,
                                "lugar_inscripcion"=>$propietario[$i]->pro_lugar_inscripcion,
                                "acuerdo_reg"=>$propietario[$i]->pro_acuerdo_registro,
                                "representante_legal"=>$propietario[$i]->pro_representante_legal,
                                "doc_representante"=>$propietario[$i]->pro_documento_representante,
                                "idrepresentante"=>$propietario[$i]->pro_idrepresentante,
                                "email_representante"=>$propietario[$i]->pro_email_representante,
                                "telf_representante"=>$propietario[$i]->pro_telefono_representante,
                                "conyugue"=>$propietario[$i]->pro_conyugue,
                                "conyugue_apellidos"=>$propietario[$i]->pro_apellidos_conyugue,
                                "conyugue_nombres"=>$propietario[$i]->pro_nombres_conyugue,
                                "conyugue_doc"=>$propietario[$i]->pro_tipo_documento_conyugue,
                                "conyugueid"=>$propietario[$i]->pro_identificacion_conyugue,
                                "conyugue_telf"=>$propietario[$i]->pro_telefono_conyugue,
                                "conyugue_participacion"=>$propietario[$i]->pro_participacion_porcentaje_conyugue,
                                "conyugue_email"=>$propietario[$i]->pro_email_conyugue
                            );  

                            $json[] = $ejemplo;        
                    }

                    echo json_encode($json, JSON_UNESCAPED_UNICODE);

                //echo json_encode($propietario, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existen propietarios en la BD");
                }
                
                $resultado = null;
                $db = null;
                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';

                }                
            }

            // GET Recuperar propietario por ID

            public static function verPropietario($id){
                $id_propietario = $id;
                $sql = "SELECT * FROM propietario WHERE pro_idpropietario = $id_propietario";
                try {
                    $db = new db();
                    $db = $db->conexionDB();
                    $resultado = $db->query($sql);
                    $json = [];

                    if ($resultado->rowCount() > 0){
                        $propietario = $resultado->fetchAll(PDO::FETCH_OBJ);


                        for($i=0;$i<$resultado->rowCount();$i++) {
                            $ejemplo = array( 
                               "idpropietario"=> intval($propietario[$i]->pro_idpropietario),
                                "identificacion"=>$propietario[$i]->pro_identificacion,
                                "tipo"=>$propietario[$i]->pro_tipo_propietario,
                                "primer_apellido"=>$propietario[$i]->pro_primer_apellido,
                                "segundo_apellido"=>$propietario[$i]->pro_segundo_apellido,
                                "primer_nombre"=>$propietario[$i]->pro_primer_nombre,
                                "segundo_nombre"=>$propietario[$i]->pro_segundo_nombre,
                                "documento_tipo"=>$propietario[$i]->pro_tipo_documento,
                                "estado_civil"=>$propietario[$i]->pro_estado_civil,
                                "porcentaje_participacion"=>$propietario[$i]->pro_participacion_porcentaje,
                                "representante"=>$propietario[$i]->pro_representante,
                                "anio_nacimiento"=>$propietario[$i]->pro_anio_nacimiento,
                                "mes_nacimiento"=>$propietario[$i]->pro_mes_nacimiento,
                                "dia_nacimiento"=>$propietario[$i]->pro_dia_nacimiento,
                                "nacionalidad"=>$propietario[$i]->pro_nacionalidad,
                                "email"=>$propietario[$i]->pro_email,
                                "telefono"=>$propietario[$i]->pro_telefono,
                                "ciudad_domicilio"=>$propietario[$i]->pro_ciudad_domicilio,
                                "direccion_domicilio"=>$propietario[$i]->pro_direccion_domicilio,
                                "jefe_hogar"=>$propietario[$i]->pro_jefe_hogar,
                                "p_juridica"=>$propietario[$i]->pro_personeria_juridica,
                                "ruc"=>$propietario[$i]->pro_ruc,
                                "razon_social"=>$propietario[$i]->pro_razon_social,
                                "inscrito"=>$propietario[$i]->pro_inscrito,
                                "lugar_inscripcion"=>$propietario[$i]->pro_lugar_inscripcion,
                                "acuerdo_reg"=>$propietario[$i]->pro_acuerdo_registro,
                                "representante_legal"=>$propietario[$i]->pro_representante_legal,
                                "doc_representante"=>$propietario[$i]->pro_documento_representante,
                                "idrepresentante"=>$propietario[$i]->pro_idrepresentante,
                                "email_representante"=>$propietario[$i]->pro_email_representante,
                                "telf_representante"=>$propietario[$i]->pro_telefono_representante,
                                "conyugue"=>$propietario[$i]->pro_conyugue,
                                "conyugue_apellidos"=>$propietario[$i]->pro_apellidos_conyugue,
                                "conyugue_nombres"=>$propietario[$i]->pro_nombres_conyugue,
                                "conyugue_doc"=>$propietario[$i]->pro_tipo_documento_conyugue,
                                "conyugueid"=>$propietario[$i]->pro_identificacion_conyugue,
                                "conyugue_telf"=>$propietario[$i]->pro_telefono_conyugue,
                                "conyugue_participacion"=>$propietario[$i]->pro_participacion_porcentaje_conyugue,
                                "conyugue_email"=>$propietario[$i]->pro_email_conyugue
                                );  

                            $json[] = $ejemplo;        
                        }

                        echo json_encode($json, JSON_UNESCAPED_UNICODE);

                        //echo json_encode($propietario, JSON_UNESCAPED_UNICODE);
                    }else {
                        echo json_encode("No existen propietarios con este ID");
                    }
                        $resultado = null;
                        $db = null;

                    }catch(PDOException $e){
                        echo '{"error" : {"text":'.$e->getMessage().'}';
                    }
            }

            // POST Crear nuevo propietario 
            public function guardarPropietario(){ 
        
                $rs = "SELECT MAX(pro_idpropietario) AS maxid from propietario"; // UltimoRegistro
                //$propietario = json_decode($request->getBody());
    
    
                $sql = "INSERT INTO propietario (pro_idpropietario,pro_identificacion,pro_tipo_propietario,pro_primer_apellido,pro_segundo_apellido,pro_primer_nombre,pro_segundo_nombre,pro_tipo_documento,pro_estado_civil,pro_participacion_porcentaje,pro_representante,pro_anio_nacimiento,pro_mes_nacimiento,pro_dia_nacimiento,pro_nacionalidad,pro_email,pro_telefono,pro_ciudad_domicilio,pro_direccion_domicilio,pro_jefe_hogar,pro_personeria_juridica,pro_ruc,pro_razon_social,pro_inscrito,pro_lugar_inscripcion,pro_acuerdo_registro,pro_representante_legal,pro_documento_representante,pro_idrepresentante,pro_email_representante,pro_telefono_representante,pro_conyugue,pro_apellidos_conyugue,pro_nombres_conyugue,pro_tipo_documento_conyugue,pro_identificacion_conyugue,pro_telefono_conyugue,pro_participacion_porcentaje_conyugue,pro_email_conyugue) VALUES
                        (:idpropietario, :identificacion, :tipo, :primer_apellido, :segundo_apellido, :primer_nombre, :segundo_nombre, :documento_tipo, :estado_civil, :porcentaje_participacion, :representante, :anio_nacimiento, :mes_nacimiento, :dia_nacimiento, :nacionalidad, :email, :telefono, :ciudad_domicilio, :direccion_domicilio, :jefe_hogar, :p_juridica, :ruc, :razon_social, :inscrito, :lugar_inscripcion, :acuerdo_reg, :representante_legal, :doc_representante, :idrepresentante, :email_representante, :telf_representante, :conyugue, :conyugue_apellidos, :conyugue_nombres, :conyugue_doc, :conyugueid, :conyugue_telf, :conyugue_participacion, :conyugue_email)";
                try {
                    $db = new db();
                    $db = $db->conexionDB();
                    $last_id = $db->query($rs);  // UltimoRegistro
                    //Obtiene el último registro en base al mayor id de la tabla
                    $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                    $ultimo = intval($maxid[0]->maxid)+1;
                    //echo $ultimo;
                    ////////////////////////////////////////////////////////////////

                    //$this->idpropietario 
                    $resultado = $db->prepare($sql);
                    $resultado->bindParam(':idpropietario', intval($ultimo));
                    $resultado->bindParam(':identificacion', $this->identificacion);
                    $resultado->bindParam(':tipo', $this->tipo);
                    $resultado->bindParam(':primer_apellido', $this->primer_apellido);
                    $resultado->bindParam(':segundo_apellido', $this->segundo_apellido);
                    $resultado->bindParam(':primer_nombre', $this->primer_nombre);
                    $resultado->bindParam(':segundo_nombre', $this->segundo_nombre);
                    $resultado->bindParam(':documento_tipo', $this->documento_tipo);
                    $resultado->bindParam(':estado_civil', $this->estado_civil);
                    $resultado->bindParam(':porcentaje_participacion', $this->porcentaje_participacion);
                    $resultado->bindParam(':representante', $this->representante);
                    $resultado->bindParam(':anio_nacimiento', $this->anio_nacimiento);
                    $resultado->bindParam(':mes_nacimiento', $this->mes_nacimiento);
                    $resultado->bindParam(':dia_nacimiento', $this->dia_nacimiento);
                    $resultado->bindParam(':nacionalidad', $this->nacionalidad);
                    $resultado->bindParam(':email', $this->email);
                    $resultado->bindParam(':telefono', $this->telefono);
                    $resultado->bindParam(':ciudad_domicilio', $this->ciudad_domicilio);
                    $resultado->bindParam(':direccion_domicilio', $this->direccion_domicilio);
                    $resultado->bindParam(':jefe_hogar', $this->jefe_hogar);
                    $resultado->bindParam(':p_juridica', $this->p_juridica);
                    $resultado->bindParam(':ruc', $this->ruc);
                    $resultado->bindParam(':razon_social', $this->razon_social);
                    $resultado->bindParam(':inscrito', $this->inscrito);
                    $resultado->bindParam(':lugar_inscripcion', $this->lugar_inscripcion);
                    $resultado->bindParam(':acuerdo_reg', $this->acuerdo_reg);
                    $resultado->bindParam(':representante_legal', $this->representante_legal);
                    $resultado->bindParam(':doc_representante', $this->doc_representante);
                    $resultado->bindParam(':idrepresentante', $this->idrepresentante);
                    $resultado->bindParam(':email_representante', $this->email_representante);
                    $resultado->bindParam(':telf_representante', $this->telf_representante);
                    $resultado->bindParam(':conyugue', $this->conyugue);
                    $resultado->bindParam(':conyugue_apellidos', $this->conyugue_apellidos);
                    $resultado->bindParam(':conyugue_nombres', $this->conyugue_nombres);
                    $resultado->bindParam(':conyugue_doc', $this->conyugue_doc);
                    $resultado->bindParam(':conyugueid', $this->conyugueid);
                    $resultado->bindParam(':conyugue_telf', $this->conyugue_telf);
                    $resultado->bindParam(':conyugue_participacion', $this->conyugue_participacion);
                    $resultado->bindParam(':conyugue_email', $this->conyugue_email);             

                    $resultado->execute();
                    echo json_encode("Nuevo propietario guardado exitosamente");
        
                    $resultado = null;
                    $db = null;

                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';
                }    
            }

            // PUT Actualizar propietario por ID
            public function actualizarPropietario($id){
    
                //$propietario = json_decode($request->getBody());
                $id_propietario = $id;
                $sql = "UPDATE propietario SET                        
                        pro_identificacion = :identificacion,
                        pro_tipo_propietario = :tipo,
                        pro_primer_apellido = :primer_apellido,
                        pro_segundo_apellido = :segundo_apellido,
                        pro_primer_nombre = :primer_nombre,
                        pro_segundo_nombre = :segundo_nombre,
                        pro_tipo_documento = :documento_tipo,
                        pro_estado_civil = :estado_civil,
                        pro_participacion_porcentaje = :porcentaje_participacion,
                        pro_representante = :representante,
                        pro_anio_nacimiento = :anio_nacimiento,
                        pro_mes_nacimiento = :mes_nacimiento,
                        pro_dia_nacimiento = :dia_nacimiento,
                        pro_nacionalidad = :nacionalidad,
                        pro_email = :email,
                        pro_telefono = :telefono,
                        pro_ciudad_domicilio = :ciudad_domicilio,
                        pro_direccion_domicilio = :direccion_domicilio,
                        pro_jefe_hogar = :jefe_hogar,
                        pro_personeria_juridica = :p_juridica,
                        pro_ruc = :ruc,
                        pro_razon_social = :razon_social,
                        pro_inscrito = :inscrito,
                        pro_lugar_inscripcion = :lugar_inscripcion,
                        pro_acuerdo_registro = :acuerdo_reg,
                        pro_representante_legal = :representante_legal,
                        pro_documento_representante = :doc_representante,
                        pro_idrepresentante = :idrepresentante,
                        pro_email_representante = :email_representante,
                        pro_telefono_representante = :telf_representante,
                        pro_conyugue = :conyugue,
                        pro_apellidos_conyugue = :conyugue_apellidos,
                        pro_nombres_conyugue = :conyugue_nombres,
                        pro_tipo_documento_conyugue = :conyugue_doc,
                        pro_identificacion_conyugue = :conyugueid,
                        pro_telefono_conyugue = :conyugue_telf,
                        pro_participacion_porcentaje_conyugue = :conyugue_participacion,
                        pro_email_conyugue = :conyugue_email         
                        WHERE pro_idpropietario=:idpropietario";
                try {
                    $db = new db();
                    $db = $db->conexionDB();
                    $resultado = $db->prepare($sql);
                                                     
                    $resultado->bindParam(':identificacion', $this->identificacion);
                    $resultado->bindParam(':tipo', $this->tipo);
                    $resultado->bindParam(':primer_apellido', $this->primer_apellido);
                    $resultado->bindParam(':segundo_apellido', $this->segundo_apellido);
                    $resultado->bindParam(':primer_nombre', $this->primer_nombre);
                    $resultado->bindParam(':segundo_nombre', $this->segundo_nombre);
                    $resultado->bindParam(':documento_tipo', $this->documento_tipo);
                    $resultado->bindParam(':estado_civil', $this->estado_civil);
                    $resultado->bindParam(':porcentaje_participacion', $this->porcentaje_participacion);
                    $resultado->bindParam(':representante', $this->representante);
                    $resultado->bindParam(':anio_nacimiento', $this->anio_nacimiento);
                    $resultado->bindParam(':mes_nacimiento', $this->mes_nacimiento);
                    $resultado->bindParam(':dia_nacimiento', $this->dia_nacimiento);
                    $resultado->bindParam(':nacionalidad', $this->nacionalidad);
                    $resultado->bindParam(':email', $this->email);
                    $resultado->bindParam(':telefono', $this->telefono);
                    $resultado->bindParam(':ciudad_domicilio', $this->ciudad_domicilio);
                    $resultado->bindParam(':direccion_domicilio', $this->direccion_domicilio);
                    $resultado->bindParam(':jefe_hogar', $this->jefe_hogar);
                    $resultado->bindParam(':p_juridica', $this->p_juridica);
                    $resultado->bindParam(':ruc', $this->ruc);
                    $resultado->bindParam(':razon_social', $this->razon_social);
                    $resultado->bindParam(':inscrito', $this->inscrito);
                    $resultado->bindParam(':lugar_inscripcion', $this->lugar_inscripcion);
                    $resultado->bindParam(':acuerdo_reg', $this->acuerdo_reg);
                    $resultado->bindParam(':representante_legal', $this->representante_legal);
                    $resultado->bindParam(':doc_representante', $this->doc_representante);
                    $resultado->bindParam(':idrepresentante', $this->idrepresentante);
                    $resultado->bindParam(':email_representante', $this->email_representante);
                    $resultado->bindParam(':telf_representante', $this->telf_representante);
                    $resultado->bindParam(':conyugue', $this->conyugue);
                    $resultado->bindParam(':conyugue_apellidos', $this->conyugue_apellidos);
                    $resultado->bindParam(':conyugue_nombres', $this->conyugue_nombres);
                    $resultado->bindParam(':conyugue_doc', $this->conyugue_doc);
                    $resultado->bindParam(':conyugueid', $this->conyugueid);
                    $resultado->bindParam(':conyugue_telf', $this->conyugue_telf);
                    $resultado->bindParam(':conyugue_participacion', $this->conyugue_participacion);
                    $resultado->bindParam(':conyugue_email', $this->conyugue_email);
                    $resultado->bindParam(':idpropietario', $id_propietario);

                    $resultado->execute();
                    echo json_encode("Propietario actualizado exitosamente");
        
                    $resultado = null;
                    $db = null;

                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';
                }
            }



            // DELETE Borrar propietario por ID
            public static function eliminarPropietario($id){
    
    
                $id_propietario = $id;
                $sql = "DELETE FROM propietario WHERE pro_idpropietario=:idpropietario";
                try {
                    $db = new db();
                    $db = $db->conexionDB();
                    $resultado = $db->prepare($sql);        
        
                    $resultado->bindParam(':idpropietario', $id_propietario);
                    $resultado->execute();

                    if ($resultado->rowCount() > 0){
                        echo json_encode("Propietario eliminado exitosamente");
                    }else {
                        echo json_encode("No existe propietario con este ID");
                    }                     
        
                    $resultado = null;
                    $db = null;

                }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';
                }
            }
}

?>