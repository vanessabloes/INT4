<?php
require_once __DIR__ . '/DAO.php';
class StoryDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `stories`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `stories` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectWordsForStory($id) {
    $sql = "SELECT `words`.* FROM `words` INNER JOIN `stories`ON `stories`.`id` = `words`.`storyId` WHERE `words`.`storyId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectContextForStory($id, $contextId) {
    $sql = "SELECT `contexts`.* FROM `contexts` INNER JOIN `stories`ON `stories`.`contextId` = `contexts`.`id` WHERE `stories`.`id` = :id AND `contexts`.`id` = :contextId";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->bindValue(':contextId', $contextId);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `stories` (`id`, `name`, `image`) VALUES (:id, :name, :image)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':image', $data['image']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function update($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "UPDATE `stories` SET `name` = :name, `avatar` = :avatar WHERE `id` = :id";
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
    $sql = "DELETE FROM `stories` WHERE `id` = :id";
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
    if(!isset($data['image'])) {
      $errors['image'] = "Please fill in a image";
    }
    return $errors;
  }
}
