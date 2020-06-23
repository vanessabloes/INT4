<?php
require_once __DIR__ . '/DAO.php';
class DefinedStoryWordDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `definedstorywords`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `definedstorywords` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectUsersForDefinedStoryWord($id) {
    $sql = "SELECT `users`.* FROM `users` INNER JOIN `users_definedstorywords`ON `users_definedstorywords`.`userId` = `users`.`id` WHERE `users_definedstorywords`.`groupId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  } 

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `definedstorywords` (`id`, `content`, `isReached`, `storyId`, `definedWordId`) VALUES (:id, :content, :isReached, :storyId, :definedWordId)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':content', $data['content']);
      $stmt->bindValue(':isReached', $data['isReached']);
      $stmt->bindValue(':storyId', $data['storyId']);
      $stmt->bindValue(':definedWordId', $data['definedWordId']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function update($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "UPDATE `definedstorywords` SET `content` = :content, `isReached` = :isReached, `storyId` = :storyId, `definedWordId` = :definedWordId WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':content', $data['content']);
      $stmt->bindValue(':isReached', $data['isReached']);
      $stmt->bindValue(':storyId', $data['storyId']);
      $stmt->bindValue(':definedWordId', $data['definedWordId']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(!isset($data['id'])) {
      $errors['id'] = "Please fill in id";
    }
    if(!isset($data['content'])) {
      $errors['content'] = "Please fill in a content";
    }
    if(!isset($data['isReached'])) {
      $errors['isReached'] = "Please fill in a isReached";
    }
      if(!isset($data['storyId'])) {
        $errors['storyId'] = "Please fill in a storyId";
      }
      if(!isset($data['definedWordId'])) {
        $errors['definedWordId'] = "Please fill in a definedWordId";
      }
    return $errors;
  }
}
