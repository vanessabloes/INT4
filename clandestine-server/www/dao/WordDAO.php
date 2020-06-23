<?php
require_once __DIR__ . '/DAO.php';
class WordDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `words`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectWordsForStory($id) {
    $sql = "SELECT `words`.* FROM `words` INNER JOIN `stories`ON `words`.`storyId` = `stories`.`id` WHERE `words`.`storyId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `words` (`id`, `content`, `storyId`) VALUES (:id, :content, :storyId)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':content', $data['content']);
      $stmt->bindValue(':storyId', $data['storyId']);
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
    if(!isset($data['storyId'])) {
      $errors['storyId'] = "Please fill in a storyId";
    
    }
    
    return $errors;
  }
}
