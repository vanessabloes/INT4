<?php
require_once __DIR__ . '/DAO.php';
class BottomMaskDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `bottommasks`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `bottommasks` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectUsersForBottomMask($id) {
    $sql = "SELECT `users`.* FROM `users` INNER JOIN `users_bottommasks`ON `users_bottommasks`.`userId` = `users`.`id` WHERE `users_bottommasks`.`groupId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  } 
}
