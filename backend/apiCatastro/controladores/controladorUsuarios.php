<?php 

include_once ("./src/usuarios.php");

class controladorUsuarios{

    
        //GET usuario
        public static function getUsuario(){ 
        
        						  //Obtener usuario
                                                        //echo($url);
                                                        if (isset($_GET['username'])){                        
                                                        
                                                            Usuarios::verUsuarios($_GET['username'],$_GET['password']);                         
                                                        
                                                        }else{
                                                            Usuarios::todosUsuarios();                        
                                                        } 
                            
	}

	// POST usuario
	public function postUsuario(){    
 							//Guardar usuario                                                        
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $usuario= json_decode($json);   
                                                                                                             

                                                        $objeto = new Usuarios(  
                                                            $usuario->primer_apellido,
                                                            $usuario->segundo_apellido,
                                                            $usuario->nombre,
                                                            $usuario->username,
                                                            $usuario->password                                                                                                
                                                            );                    
                                                        
                                                        $objeto->guardarUsuario();
                                                        $objeto = null;                                                   
   
	}


	// PUT usuario por ID                                     
    
    	public function putUsuario(){
    						 	//Actualizar usuario
                                                        //echo("PUT");
                                                        $data= json_decode(file_get_contents('php://input'),TRUE);
                                                        // print_r(json_encode($data,JSON_UNESCAPED_UNICODE));
                                                        $json = json_encode($data,JSON_UNESCAPED_UNICODE); 
                                                        //echo ($json);
                                                        $usuarios = json_decode($json);                                                           

                                                        $objeto = new Usuarios(  
                                                            $usuarios->primer_apellido,
                                                            $usuarios->segundo_apellido,
                                                            $usuarios->nombre,
                                                            $usuarios->username,
                                                            $usuarios->password                                                                                                    
                                                            );             
                                                        $objeto->actualizarUsuario($_GET['id']);
                                                        $objeto = null; 
	}


	// DELETE usuario por ID
	public static function deleteUsuario() {
			                                  //Eliminar usuario                      
                                              Usuarios::eliminarUsuario($_GET['id']);
	}

}

?>








