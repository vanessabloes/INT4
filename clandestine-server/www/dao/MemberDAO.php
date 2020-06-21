<?php
require_once __DIR__ . '/DAO.php';
class MemberDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `members`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `members` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectGroupsForMember($id) {
    $sql = "SELECT `groups`.* FROM `groups` INNER JOIN `members_groups`ON `members_groups`.`groupId` = `groups`.`id` WHERE `members_groups`.`userId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `members` (`id`, `name`, `age`, `clanId`, `topMaskId`, `middleMaskId`, `bottomMaskId`) VALUES (:id, :name, :age, :clanId, :topMaskId, :middleMaskId, :bottomMaskId)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':age', $data['age']);
      $stmt->bindValue(':clanId', $data['clanId']);
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
      $sql = "UPDATE `members` SET `name` = :name, `age` = :age, `topMaskId` = :topMaskId, `middleMaskId` = :middleMaskId, `bottomMaskId` = :bottomMaskId WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':age', $data['age']);
      $stmt->bindValue(':topMaskId', $data['topMaskId']);
      $stmt->bindValue(':middleMaskId', $data['middleMaskId']);
      $stmt->bindValue(':bottomMaskId', $data['bottomMaskId']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function delete($id) {
    $sql = "DELETE FROM `members` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    return $stmt->execute();
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(!isset($data['id'])) {
      $errors['id'] = "Please fill in id";
    }
    if(!isset($data['name'])) {
      $errors['name'] = "Please fill in a name";
    }
    if(!isset($data['age'])) {
      $errors['age'] = "Please fill in a age";
    }
    if(!isset($data['clanId'])) {
      $errors['clanId'] = "Please fill in a clanId";
    }
    if(!isset($data['topMaskId'])) {
      $errors['topMaskId'] = "Please fill in topMaskId";
    }
    if(!isset($data['middleMaskId'])) {
      $errors['middleMaskId'] = "Please fill in a middleMaskId";
    }
    if(!isset($data['bottomMaskId'])) {
      $errors['bottomMaskId'] = "Please fill in a bottomMaskId";
    }
    
    return $errors;
  }
}
