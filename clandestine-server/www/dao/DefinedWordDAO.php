<?php
require_once __DIR__ . '/DAO.php';
class DefinedWordDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `definedwords`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `definedwords` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectUsersForDefinedWord($id) {
    $sql = "SELECT `users`.* FROM `users` INNER JOIN `users_definedwords`ON `users_definedwords`.`userId` = `users`.`id` WHERE `users_definedwords`.`groupId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  } 
}
