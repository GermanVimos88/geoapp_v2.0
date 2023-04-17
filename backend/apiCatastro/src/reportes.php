<?php 

include_once ("./src/db.php");

class Reportes{

    

    public static function verReporte($id){

        $id_reporte = $id;  //$request->getAttribute('id');    
        //Consultas estadísticas
        $sql1 = "SELECT COUNT(*) AS numero FROM `propietario` WHERE pro_tipo_propietario='Juridico'";
        $sql2 = "SELECT COUNT(*) AS numero FROM `propietario` WHERE pro_tipo_propietario='Natural'" ;
        $sql3 = "SELECT COUNT(*) AS numero FROM `propietario` WHERE pro_tipo_propietario='Posesionario'" ;
        $sql4 = "SELECT COUNT(*) AS numero FROM `propietario` WHERE pro_razon_social='GAD Municipal Quijos'" ;
        $sql5 = "SELECT COUNT(*) AS numero FROM `propietario` WHERE pro_razon_social='Misión Josefina de Napo'" ;
        $sql6 = "SELECT COUNT(*) AS numero FROM `estatus_legal` WHERE elg_forma_adquisicion='Compra/Venta'" ;
        $sql7 = "SELECT COUNT(*) AS numero FROM `estatus_legal` WHERE elg_forma_adquisicion='Adjudicación'" ;
        $sql8 = "SELECT COUNT(*) AS numero FROM `estatus_legal` WHERE elg_forma_adquisicion='Donación'" ;
        $sql9 = "SELECT COUNT(*) AS numero FROM `estatus_legal` WHERE elg_forma_adquisicion='s/n'" ;
        $sql10 = "SELECT COUNT(*) AS numero FROM `infraestructura` WHERE inf_rodadura='Lastre'" ;
        $sql11 = "SELECT COUNT(*) AS numero FROM `infraestructura` WHERE inf_rodadura='Asfalto'" ;
        $sql12 = "SELECT COUNT(*) AS numero FROM `infraestructura` WHERE inf_rodadura='Tierra'" ;
        $sql13 = "SELECT COUNT(*) AS numero FROM `infraestructura` WHERE inf_rodadura='Adoquín de cemento'" ;
        
        //Consultas predios identificados
        $sql14 = "SELECT inf_clave_predio FROM `infraestructura` WHERE inf_rodadura='Asfalto'" ;
        $sql15 = "SELECT inf_clave_predio FROM `infraestructura` WHERE inf_rodadura='Lastre'" ;
        $sql16 = "SELECT inf_clave_predio FROM `infraestructura` WHERE inf_rodadura='Adoquín de cemento'" ;
        $sql17 = "SELECT inf_clave_predio FROM `infraestructura` WHERE inf_medidor_agua=1" ;
        $sql18 = "SELECT inf_clave_predio FROM `infraestructura` WHERE inf_medidor_agua=0" ;
        $sql19 = "SELECT inf_clave_predio FROM `infraestructura` WHERE inf_eliminacion_excretas='No tiene'" ;
        $sql20 = "SELECT inf_clave_predio FROM `infraestructura` WHERE inf_medidor=0" ;
        $sql21 = "SELECT inf_clave_predio FROM `infraestructura` WHERE inf_alumbrado_publico=0" ;
        $sql22 = "SELECT obc_clave_predio FROM `obras_complementarias` WHERE obc_tipo_obra='Cerramiento'" ;
        $sql23 = "SELECT cdc_clave_predio FROM `construccion_caracteristicas` WHERE cdc_condicion_ocupacion='Desocupada'" ;
        $sql24 = "SELECT cdc_clave_predio FROM `construccion_caracteristicas` WHERE cdc_condicion_ocupacion='Ocupada'" ;
        $sql25 ="SELECT clt_clave_predio FROM `caracteristicas_lote` WHERE clt_localizacion_manzana='Esquinero'";
        $sql26 ="SELECT clt_clave_predio FROM `caracteristicas_lote` WHERE clt_ocupacion='Edificado'";
        $sql27 ="SELECT clt_clave_predio FROM `caracteristicas_lote` WHERE clt_ocupacion='No Edificado'";
        $sql28 ="SELECT ubc_clave_predio FROM `ubicacion` WHERE ubc_eje_principal='Vía Interoceánica'";
        $sql29 ="SELECT inv_clave_predio FROM `investigacion_predial` WHERE inv_linderos_definidos=0";
        $sql30 ="SELECT inv_clave_predio FROM `investigacion_predial` WHERE inv_linderos_definidos=1";


        try {
            $db = new db();
            $db = $db->conexionDB();
            //$resultado = $db->query($sql);
            $json = [];
            
            $p_juridico = $db->query($sql1);
            $p_natural = $db->query($sql2);
            $p_posesionario = $db->query($sql3);
            $r_gad = $db->query($sql4);
            $r_josefina = $db->query($sql5);
            $compra_venta = $db->query($sql6);
            $adjudicacion = $db->query($sql7);
            $donacion = $db->query($sql8);
            $sn = $db->query($sql9);
            $lastre = $db->query($sql10);
            $asfalto = $db->query($sql11);
            $tierra = $db->query($sql12);
            $adoquin = $db->query($sql13);
            //Consultas descriptivas
            $d_asfalto = $db->query($sql14);
            $d_lastre = $db->query($sql15);
            $d_adoquin = $db->query($sql16);
            $m_agua_si = $db->query($sql17);
            $m_agua_no = $db->query($sql18);
            $excretas = $db->query($sql19);
            $medidor_luz_no = $db->query($sql20);
            $alumbrado_no = $db->query($sql21);
            $cerramiento = $db->query($sql22);
            $desocupada = $db->query($sql23);
            $ocupada = $db->query($sql24);
            $esquinero = $db->query($sql25);
            $edificado = $db->query($sql26);
            $no_edificado = $db->query($sql27);
            $v_interoceanica = $db->query($sql28);
            $linderos_no = $db->query($sql29);
            $linderos_si = $db->query($sql30);

            switch($id_reporte){
                case 1:         $ejemplo = array( "propietarios_juridicos"=>$p_juridico->fetchAll(PDO::FETCH_OBJ)[0]->numero,            
                                "propietarios_natural"=>$p_natural->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "propietarios_posesionario"=>$p_posesionario->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "propietarios_gad"=>$r_gad->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "propietario_josefina"=>$r_josefina->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "compra_venta"=>$compra_venta->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "adjudicacion"=>$adjudicacion->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "donacion"=>$donacion->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "s_n"=>$sn->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "lastre"=>$lastre->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "asfalto"=>$asfalto->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "tierra"=>$tierra->fetchAll(PDO::FETCH_OBJ)[0]->numero,
                                "adoquin"=>$adoquin->fetchAll(PDO::FETCH_OBJ)[0]->numero       
                                ); 
                                $json[] = $ejemplo;
                                echo json_encode($json, JSON_PRETTY_PRINT);
                                
                                
                                break;

                
                case 2:       $ejemplo = array( "d_asfalto"=>$d_asfalto->fetchAll(PDO::FETCH_OBJ),            
                                "d_lastre"=>$d_lastre->fetchAll(PDO::FETCH_OBJ),
                                "d_adoquin"=>$d_adoquin->fetchAll(PDO::FETCH_OBJ),
                                "medidor_agua_si"=>$m_agua_si->fetchAll(PDO::FETCH_OBJ),
                                "medidor_agua_no"=>$m_agua_no->fetchAll(PDO::FETCH_OBJ),
                                "excretas"=>$excretas->fetchAll(PDO::FETCH_OBJ),
                                "medidor_luz_no"=>$medidor_luz_no->fetchAll(PDO::FETCH_OBJ),
                                "alumbrado_publico_no"=>$alumbrado_no->fetchAll(PDO::FETCH_OBJ),
                                "cerramiento"=>$cerramiento->fetchAll(PDO::FETCH_OBJ),
                                "desocupada"=>$desocupada->fetchAll(PDO::FETCH_OBJ),
                                "ocupada"=>$ocupada->fetchAll(PDO::FETCH_OBJ),
                                "esquinero"=>$esquinero->fetchAll(PDO::FETCH_OBJ),
                                "edificado"=>$edificado->fetchAll(PDO::FETCH_OBJ),
                                "no_edificado"=>$no_edificado->fetchAll(PDO::FETCH_OBJ),
                                "via_interoceanica"=>$v_interoceanica->fetchAll(PDO::FETCH_OBJ),
                                "linderos_no"=>$linderos_no->fetchAll(PDO::FETCH_OBJ),
                                "linderos_si"=>$linderos_si->fetchAll(PDO::FETCH_OBJ)                                
                                ); 
                                $json[] = $ejemplo; 
                                echo json_encode($json, JSON_PRETTY_PRINT);             
                
                                break;  


                default:    echo json_encode("No existen reportes");
                            break;

                
            }

            
            //$resultado = null;
            $db = null;
    
        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
    
        }
    }






}