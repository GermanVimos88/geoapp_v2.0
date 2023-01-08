<?php

include_once ("../src/db.php");

class Grafico {

    //private $idgrafico;
    private $clave_predio;
    private $link_grafico;
    private $link_foto_fachada;
    private $descripcion;
    private $calle_norte;
    private $calle_sur;
    private $calle_este;
    private $calle_oeste;
    private $area_grafica_lote;
    private $dimension_frente;
    private $fondo_relativo;
    private $coordenada_x;
    private $coordenada_y;
    private $avaluo_tierras;
    private $avaluo_construcciones;
    private $avaluo_total;
    private $observaciones;

        function __construct($grp_clave_predio,$grp_link_grafico,$grp_link_foto_fachada,$grp_descripcion_grafico,$grp_calle_norte,$grp_calle_sur,$grp_calle_este,$grp_calle_oeste,$grp_area_grafica_lote,$grp_dimension_frente,$grp_fondo_relativo,$grp_coordenada_x,$grp_coordenada_y,$grp_avaluo_tierras,$grp_avaluo_construcciones,$grp_avaluo_total,$grp_observaciones)
        {
                $this->clave_predio = $grp_clave_predio;
                $this->link_grafico = $grp_link_grafico;
                $this->link_foto_fachada = $grp_link_foto_fachada;
                $this->descripcion = $grp_descripcion_grafico;
                $this->calle_norte = $grp_calle_norte;
                $this->calle_sur = $grp_calle_sur;
                $this->calle_este = $grp_calle_este;
                $this->calle_oeste = $grp_calle_oeste;
                $this->area_grafica_lote = $grp_area_grafica_lote;
                $this->dimension_frente = $grp_dimension_frente;
                $this->fondo_relativo = $grp_fondo_relativo;
                $this->coordenada_x = $grp_coordenada_x;
                $this->coordenada_y = $grp_coordenada_y;
                $this->avaluo_tierras = $grp_avaluo_tierras;
                $this->avaluo_construcciones = $grp_avaluo_construcciones;
                $this->avaluo_total = $grp_avaluo_total;
                $this->observaciones = $grp_observaciones;

        }
    
    // GET Todos los gráficos de cada predio
    public static function todosGraficos(){
    
        $sql = "SELECT * FROM grafico_predio";
        //$rs = "SELECT MAX(grp_idgrafico_predio) AS maxid from grafico_predio"; // UltimoRegistro
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->query($sql);
            //$last_id = $db->query($rs);  // UltimoRegistro
            $json = [];
        

            if ($resultado->rowCount() > 0){
                $grafico = $resultado->fetchAll(PDO::FETCH_OBJ);
            
                //Obtiene el último registro en base al mayor id de la tabla
                //$maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                //$ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
                ////////////////////////////////////////////////////////////////

                for($i=0;$i<$resultado->rowCount();$i++) {
                    $ejemplo = array("idgrafico"=>intval($grafico[$i]->grp_idgrafico_predio),
                                    "clave_predio"=>$grafico[$i]->grp_clave_predio,
                                    "link_grafico"=>$grafico[$i]->grp_link_grafico,                    
                                    "link_foto_fachada"=>$grafico[$i]->grp_link_foto_fachada,
                                    "descripcion"=>$grafico[$i]->grp_descripcion_grafico,
                                    "calle_norte"=>$grafico[$i]->grp_calle_norte,
                                    "calle_sur"=>$grafico[$i]->grp_calle_sur,
                                    "calle_este"=>$grafico[$i]->grp_calle_este,
                                    "calle_oeste"=>$grafico[$i]->grp_calle_oeste,
                                    "area_grafica_lote"=>$grafico[$i]->grp_area_grafica_lote,
                                    "dimension_frente"=>$grafico[$i]->grp_dimension_frente,
                                    "fondo_relativo"=>$grafico[$i]->grp_fondo_relativo,
                                    "coordenada_x"=>$grafico[$i]->grp_coordenada_x,
                                    "coordenada_y"=>$grafico[$i]->grp_coordenada_y,
                                    "avaluo_tierras"=>$grafico[$i]->grp_avaluo_tierras,
                                    "avaluo_construcciones"=>$grafico[$i]->grp_avaluo_construcciones,
                                    "avaluo_total"=>$grafico[$i]->grp_avaluo_total,
                                    "observaciones"=>$grafico[$i]->grp_observaciones         
                                    );

                    $json[] = $ejemplo;
                }
        
        
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                //echo json_encode($grafico, JSON_UNESCAPED_UNICODE);
            }else {
                echo json_encode("No existen gráficos de predios registradas en la BD");
            }
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }

    // GET Recuperar gráfico de predio por ID
    public static function verGrafico($id){
        $id_grafico = intval($id);    
        $sql = "SELECT * FROM grafico_predio WHERE grp_idgrafico_predio = $id_grafico";
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->query($sql);
            $json = [];

            if ($resultado->rowCount() > 0){
                $grafico = $resultado->fetchAll(PDO::FETCH_OBJ);
                for($i=0;$i<$resultado->rowCount();$i++) {
                    $ejemplo = array("idgrafico"=>intval($grafico[$i]->grp_idgrafico_predio),
                                    "clave_predio"=>$grafico[$i]->grp_clave_predio,
                                    "link_grafico"=>$grafico[$i]->grp_link_grafico,                    
                                    "link_foto_fachada"=>$grafico[$i]->grp_link_foto_fachada,
                                    "descripcion"=>$grafico[$i]->grp_descripcion_grafico,
                                    "calle_norte"=>$grafico[$i]->grp_calle_norte,
                                    "calle_sur"=>$grafico[$i]->grp_calle_sur,
                                    "calle_este"=>$grafico[$i]->grp_calle_este,
                                    "calle_oeste"=>$grafico[$i]->grp_calle_oeste,
                                    "area_grafica_lote"=>$grafico[$i]->grp_area_grafica_lote,
                                    "dimension_frente"=>$grafico[$i]->grp_dimension_frente,
                                    "fondo_relativo"=>$grafico[$i]->grp_fondo_relativo,
                                    "coordenada_x"=>$grafico[$i]->grp_coordenada_x,
                                    "coordenada_y"=>$grafico[$i]->grp_coordenada_y,
                                    "avaluo_tierras"=>$grafico[$i]->grp_avaluo_tierras,
                                    "avaluo_construcciones"=>$grafico[$i]->grp_avaluo_construcciones,
                                    "avaluo_total"=>$grafico[$i]->grp_avaluo_total,
                                    "observaciones"=>$grafico[$i]->grp_observaciones
                                    );
                
                    $json[] = $ejemplo;
                }        
        
                echo json_encode($json, JSON_UNESCAPED_UNICODE);
                //echo json_encode($grafico, JSON_UNESCAPED_UNICODE);
            }else {
                echo json_encode("No existe gráfico de predios en la BD con este ID");
            }
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';            
        }
    }

    // POST Crear nuevo gráfico de predio  
    public function guardarGrafico(){
    
        $rs = "SELECT MAX(grp_idgrafico_predio) AS maxid from grafico_predio"; // UltimoRegistro    
                    
        $sql = "INSERT INTO grafico_predio (grp_idgrafico_predio,grp_clave_predio,grp_link_grafico,grp_link_foto_fachada,grp_descripcion_grafico,grp_calle_norte,grp_calle_sur,grp_calle_este,grp_calle_oeste,grp_area_grafica_lote,grp_dimension_frente,grp_fondo_relativo,grp_coordenada_x,grp_coordenada_y,grp_avaluo_tierras,grp_avaluo_construcciones,grp_avaluo_total,grp_observaciones) VALUES
            (:idgrafico,:clave_predio,:link_grafico,:link_foto_fachada,:descripcion,:calle_norte,:calle_sur,:calle_este,:calle_oeste,:area_grafica_lote,:dimension_frente,:fondo_relativo,:coordenada_x,:coordenada_y,:avaluo_tierras,:avaluo_construcciones,:avaluo_total,:observaciones)";

        try {
            $db = new db();
            $db = $db->conexionDB();        
            $last_id = $db->query($rs); // UltimoRegistro
            //Obtiene el último registro en base al mayor id de la tabla
            $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
            $ultimo = intval($maxid[0]->maxid)+1;
            //echo $ultimo;
       
            $resultado = $db->prepare($sql);
            $resultado->bindParam(':idgrafico', intval($ultimo));
            $resultado->bindParam(':clave_predio', $this->clave_predio); 
            $resultado->bindParam(':link_grafico', $this->link_grafico); 
            $resultado->bindParam(':link_foto_fachada', $this->link_foto_fachada);
            $resultado->bindParam(':descripcion', $this->descripcion); 
            $resultado->bindParam(':calle_norte', $this->calle_norte);         
            $resultado->bindParam(':calle_sur', $this->calle_sur); 
            $resultado->bindParam(':calle_este', $this->calle_este); 
            $resultado->bindParam(':calle_oeste', $this->calle_oeste); 
            $resultado->bindParam(':area_grafica_lote', $this->area_grafica_lote); 
            $resultado->bindParam(':dimension_frente', $this->dimension_frente); 
            $resultado->bindParam(':fondo_relativo', $this->fondo_relativo); 
            $resultado->bindParam(':coordenada_x', $this->coordenada_x);   
            $resultado->bindParam(':coordenada_y', $this->coordenada_y);   
            $resultado->bindParam(':avaluo_tierras', $this->avaluo_tierras);   
            $resultado->bindParam(':avaluo_construcciones', $this->avaluo_construcciones);   
            $resultado->bindParam(':avaluo_total', $this->avaluo_total); 
            $resultado->bindParam(':observaciones', $this->observaciones);         

            $resultado->execute();
            echo json_encode("Nuevo gráfico de predio guardada exitosamente", JSON_UNESCAPED_UNICODE);
            
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }


    // PUT Actualizar gráfico de un predio por ID
    public function actualizarGrafico($id){
        
        $id_grafico = intval($id);        
        $sql = "UPDATE construccion_caracteristicas SET                         
                grp_clave_predio=:clave_predio,
                grp_link_grafico=:link_grafico,
                grp_link_foto_fachada=:link_foto_fachada,
                grp_descripcion_grafico=:descripcion,
                grp_calle_norte=:calle_norte,
                grp_calle_sur=:calle_sur,
                grp_calle_este=:calle_este,
                grp_calle_oeste=:calle_oeste,
                grp_area_grafica_lote=:area_grafica_lote,
                grp_dimension_frente=:dimension_frente,
                grp_fondo_relativo=:fondo_relativo,
                grp_coordenada_x=:coordenada_x,
                grp_coordenada_y=:coordenada_y,
                grp_avaluo_tierras=:avaluo_tierras,
                grp_avaluo_construcciones=:avaluo_construcciones,
                grp_avaluo_total=:avaluo_total,
                grp_observaciones=:observaciones
                WHERE grp_idgrafico_predio=:idgrafico";
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->prepare($sql);             
        
            $resultado->bindParam(':idgrafico', intval($id_grafico));        
            $resultado->bindParam(':clave_predio', $this->clave_predio); 
            $resultado->bindParam(':link_grafico', $this->link_grafico); 
            $resultado->bindParam(':link_foto_fachada', $this->link_foto_fachada);
            $resultado->bindParam(':descripcion', $this->descripcion); 
            $resultado->bindParam(':calle_norte', $this->calle_norte);         
            $resultado->bindParam(':calle_sur', $this->calle_sur); 
            $resultado->bindParam(':calle_este', $this->calle_este); 
            $resultado->bindParam(':calle_oeste', $this->calle_oeste); 
            $resultado->bindParam(':area_grafica_lote', $this->area_grafica_lote); 
            $resultado->bindParam(':dimension_frente', $this->dimension_frente); 
            $resultado->bindParam(':fondo_relativo', $this->fondo_relativo); 
            $resultado->bindParam(':coordenada_x', $this->coordenada_x);   
            $resultado->bindParam(':coordenada_y', $this->coordenada_y);   
            $resultado->bindParam(':avaluo_tierras', $this->avaluo_tierras);   
            $resultado->bindParam(':avaluo_construcciones', $this->avaluo_construcciones);   
            $resultado->bindParam(':avaluo_total', $this->avaluo_total); 
            $resultado->bindParam(':observaciones', $this->observaciones);       

            $resultado->execute();
            echo json_encode("Gráfico del predio actualizado exitosamente", JSON_UNESCAPED_UNICODE);
        
            $resultado = null;
            $db = null;

            }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';

        }
    }


    // DELETE Borrar gráfico de predio por ID
    public static function eliminarGrafico($id){    
    
        $id_grafico = intval($id);        
        $sql = "DELETE FROM grafico_predio WHERE grp_idgrafico_predio=:idgrafico";
        try {
            $db = new db();
            $db = $db->conexionDB();
            $resultado = $db->prepare($sql);        
        
            $resultado->bindParam(':idgrafico', $id_grafico);
            $resultado->execute();

            if ($resultado->rowCount() > 0){
                echo json_encode("Gráfico de predio eliminado exitosamente", JSON_UNESCAPED_UNICODE);
            }else {
                echo json_encode("No existe gráfico de predio con este ID", JSON_UNESCAPED_UNICODE);
            }                     
        
            $resultado = null;
            $db = null;

        }catch(PDOException $e){
            echo '{"error" : {"text":'.$e->getMessage().'}';
        }
    }
}

?>