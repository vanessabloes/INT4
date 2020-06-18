<?php
require_once __DIR__ . '/DAO.php';
class RoleDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `roles`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `roles` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectUsersForRole($id) {
    $sql = "SELECT `users`.* FROM `users` INNER JOIN `users_roles`ON `users_roles`.`userId` = `users`.`id` WHERE `users_roles`.`groupId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  } 
}
