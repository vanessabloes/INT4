<?php
require_once __DIR__ . '/DAO.php';
class TopMaskDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `topmasks`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `topmasks` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectUsersForTopMask($id) {
    $sql = "SELECT `users`.* FROM `users` INNER JOIN `users_topmasks`ON `users_topmasks`.`userId` = `users`.`id` WHERE `users_topmasks`.`groupId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  } 
}
