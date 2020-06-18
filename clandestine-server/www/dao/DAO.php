<?php

class DAO {

  // Properties
  private static $dbHost = "clandestine-mysql";
  private static $dbName = "clandestine";
  private static $dbUser = "root";
  private static $dbPass = "devine4life";
  private static $sharedPDO;
  protected $pdo;

  // Constructor
  function __construct() {

    if(empty(self::$sharedPDO)) {
      self::$sharedPDO = new PDO("mysql:host=" . self::$dbHost . ";dbname=" . self::$dbName, self::$dbUser, self::$dbPass);
      self::$sharedPDO->exec("SET CHARACTER SET utf8");
      self::$sharedPDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      self::$sharedPDO->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    }

    $this->pdo =& self::$sharedPDO;

  }

  // Methods

}
