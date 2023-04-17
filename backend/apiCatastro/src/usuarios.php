<?php

include_once ("./src/db.php");

class Usuarios {

    //private $id;
    private $primer_apellido;
    private $segundo_apellido;
    private $nombre;
    private $username;
    private $password;

            function __construct($usr_primer_apellido,$usr_segundo_apellido,$usr_nombre,$usr_username,$usr_password)
            {                    
                //$this->id = $usr_id;
                $this->primer_apellido =$usr_primer_apellido; 
                $this->segundo_apellido = $usr_segundo_apellido;  
                $this->nombre =  $usr_nombre;
                $this->username =  $usr_username; 
                $this->password =  $usr_password; 

            }


        // GET Todos los usuarios
        public static function todosUsuarios(){
            //echo "TODOS LOS USUARIOS";
            $sql = "SELECT * FROM usuarios";
            //$rs = "SELECT MAX(usr_id) AS maxid from usuarios"; // UltimoRegistro
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                //$last_id = $db->query($rs);  // UltimoRegistro
                $json = [];
        

                if ($resultado->rowCount() > 0){
                    $usuario = $resultado->fetchAll(PDO::FETCH_OBJ);            
                    
                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("id"=>intval($usuario[$i]->usr_id),
                            "primer_apellido"=>$usuario[$i]->usr_primer_apellido,
                            "segundo_apellido"=>$usuario[$i]->usr_segundo_apellido,
                            "nombre"=>$usuario[$i]->usr_nombre,
                            "username"=>$usuario[$i]->usr_username,
                            "password"=>$usuario[$i]->usr_password                    
                            );
                
                        $json[] = $ejemplo;
                    }
        
        
                        echo json_encode($json, JSON_UNESCAPED_UNICODE);

                        //echo json_encode($uso, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existen usuarios registrados en la BD");
                }
                    $resultado = null;
                    $db = null;

            }catch(PDOException $e){
                    echo '{"error" : {"text":'.$e->getMessage().'}';
            }

        }

        // GET Recuperar usuario por username y password
        public static function verUsuarios($username,$password){
            $usr = "'".$username."'";
            $psw = "'".$password."'";
            $sql = "SELECT * FROM usuarios WHERE usr_username = $usr AND usr_password = $psw";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->query($sql);
                $json = [];

                if ($resultado->rowCount() > 0){
                    $usuario = $resultado->fetchAll(PDO::FETCH_OBJ);
                    for($i=0;$i<$resultado->rowCount();$i++) {
                        $ejemplo = array("id"=>intval($usuario[$i]->usr_id),
                                "primer_apellido"=>$usuario[$i]->usr_primer_apellido,
                                "segundo_apellido"=>$usuario[$i]->usr_segundo_apellido,
                                "nombre"=>$usuario[$i]->usr_nombre,
                                "username"=>$usuario[$i]->usr_username,
                                "password"=>$usuario[$i]->usr_password
                                );
                
                        $json[] = $ejemplo;
                    }        
        
                    echo json_encode($json, JSON_UNESCAPED_UNICODE);
                    //echo json_encode($uso, JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("");
                }
                    $resultado = null;
                    $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // POST Crear nuevo usuario  
        public function guardarUsuario(){
    
            $rs = "SELECT MAX(usr_id) AS maxid from usuarios"; // UltimoRegistro    
               
        
            $sql = "INSERT INTO usuarios (usr_id,usr_primer_apellido,usr_segundo_apellido,usr_nombre,usr_username,usr_password) VALUES
                    (:id, :primer_apellido, :segundo_apellido, :nombre, :username, :password)";
            try {
                $db = new db();
                $db = $db->conexionDB();        
                $last_id = $db->query($rs); // UltimoRegistro
                //Obtiene el último registro en base al mayor id de la tabla
                $maxid = $last_id->fetchAll(PDO::FETCH_OBJ);
                $ultimo = intval($maxid[0]->maxid)+1;
                //echo $ultimo;
        
                $resultado = $db->prepare($sql);
                $resultado->bindParam(':id', intval($ultimo));
                $resultado->bindParam(':primer_apellido',$this->primer_apellido);
                $resultado->bindParam(':segundo_apellido',$this->segundo_apellido);
                $resultado->bindParam(':nombre',$this->nombre);
                $resultado->bindParam(':username',$this->username);
                $resultado->bindParam(':password',$this->password);
        
                $resultado->execute();
                echo json_encode("Nuevo usuario guardado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }
        }


        // PUT Actualizar usuario por ID
        public function actualizarUsuario($id){
                
            $id_usuario = intval($id);        
            $sql = "UPDATE usuarios SET                                
                    usr_primer_apellido=:primer_apellido,
                    usr_segundo_apellido=:segundo_apellido,
                    usr_nombre=:nombre,
                    usr_username=:username,
                    usr_password=:password                        
                    WHERE usr_id=:id";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);
                                
                $resultado->bindParam(':id', intval($id_usuario));
                $resultado->bindParam(':primer_apellido',$this->primer_apellido);
                $resultado->bindParam(':segundo_apellido',$this->segundo_apellido);
                $resultado->bindParam(':nombre',$this->nombre);
                $resultado->bindParam(':username',$this->username);
                $resultado->bindParam(':password',$this->password); 
        
                $resultado->execute();
                echo json_encode("Usuario actualizado exitosamente", JSON_UNESCAPED_UNICODE);
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';
            }
        }


        // DELETE Borrar usuario por ID
        public static function eliminarUsuario($id){
        
            $id_usuario = intval($id);        
            $sql = "DELETE FROM usuarios WHERE usr_id=:id";
            try {
                $db = new db();
                $db = $db->conexionDB();
                $resultado = $db->prepare($sql);        
        
                $resultado->bindParam(':id', $id_usuario);
                $resultado->execute();

                if ($resultado->rowCount() > 0){
                    echo json_encode("Usuario eliminado exitosamente", JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode("No existe usuario con este ID", JSON_UNESCAPED_UNICODE);
                }                     
        
                $resultado = null;
                $db = null;

            }catch(PDOException $e){
                echo '{"error" : {"text":'.$e->getMessage().'}';

            }
        }
}
?>