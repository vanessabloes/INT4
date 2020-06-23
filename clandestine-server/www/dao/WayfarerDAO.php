<?php
require_once __DIR__ . '/DAO.php';
class WayfarerDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `wayfarers`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `wayfarers` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectGroupsForWayfarer($id) {
    $sql = "SELECT `groups`.* FROM `groups` INNER JOIN `wayfarers_groups`ON `wayfarers_groups`.`groupId` = `groups`.`id` WHERE `wayfarers_groups`.`userId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `wayfarers` (`id`, `clanMemberId`, `journeyId`, `roleId`, `name`, `topMaskId`, `middleMaskId`, `bottomMaskId`) VALUES (:id, :clanMemberId, :journeyId, :roleId, :name, :topMaskId, :middleMaskId, :bottomMaskId)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':clanMemberId', $data['clanMemberId']);
      $stmt->bindValue(':journeyId', $data['journeyId']);
      $stmt->bindValue(':roleId', $data['roleId']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':topMaskId', $data['topMaskId']);
      $stmt->bindValue(':middleMaskId', $data['middleMaskId']);
      $stmt->bindValue(':bottomMaskId', $data['bottomMaskId']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function update($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "UPDATE `wayfarers` SET `name` = :name, `avatar` = :avatar WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':avatar', $data['avatar']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function delete($id) {
    $sql = "DELETE FROM `wayfarers` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    return $stmt->execute();
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(!isset($data['id'])) {
      $errors['id'] = "Please fill in id";
    }
    if(!isset($data['clanMemberId'])) {
      $errors['clanMemberId'] = "Please fill in a clanMemberId";
    }
    if(!isset($data['journeyId'])) {
        $errors['journeyId'] = "Please fill in a journeyId";
      }
      if(!isset($data['roleId'])) {
        $errors['roleId'] = "Please fill in a roleId";
      }
    return $errors;
  }
}
