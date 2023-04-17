<?php 

include_once ("./src/reportes.php");

class controladorReportes{

    
        //GET reportes
        public static function getReportes(){ 
        
        		if (isset($_GET['id'])){
                              Reportes::verReporte($_GET['id']);                         
                                                
                              }
	}
}