<?php
    class db{
        private $dbHost = 'localhost';
        private $dbUser = 'root';
        private $dbPass = 'root';
        private $dbName = 'f0783168_mydb1';

        //Conexión a la BD

        public function conexionDB(){
            $mysqlConnect = "mysql:host=$this->dbHost;dbname=$this->dbName";
            $dbConection = new PDO($mysqlConnect, $this->dbUser, $this->dbPass);
            $dbConection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $dbConection;

        }

    }

?>