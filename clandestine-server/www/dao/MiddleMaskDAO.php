<?php
require_once __DIR__ . '/DAO.php';
class MiddleMaskDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `middlemasks`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `middlemasks` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectUsersForMiddleMask($id) {
    $sql = "SELECT `users`.* FROM `users` INNER JOIN `users_middlemasks`ON `users_middlemasks`.`userId` = `users`.`id` WHERE `users_middlemasks`.`groupId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  } 
}
