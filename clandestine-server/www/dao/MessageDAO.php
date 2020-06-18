<?php
require_once __DIR__ . '/DAO.php';
class MessageDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT *, DATE_FORMAT(`date`, '%Y-%m-%dT%H:%i:%s.000Z') AS `date` FROM `messages`"; // time omzetten terug van sql datetime naar UTC (toISOstring) van JS
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT *, DATE_FORMAT(`date`, '%Y-%m-%dT%H:%i:%s.000Z') AS `date` FROM `messages` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `messages` (`id`, `date`, `content`, `groupId`, `userId`, unread) VALUES (:id, :date, :content, :groupId, :userId, :unread)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']); // vroeger deden we dit niet, nu gebruiken we u4, kans op collision is toch heel klein
      $stmt->bindValue(':date', $data['date']);
      $stmt->bindValue(':content', $data['content']);
      $stmt->bindValue(':groupId', $data['groupId']);
      $stmt->bindValue(':userId', $data['userId']);
      $stmt->bindValue(':unread', $data['unread']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function update($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "UPDATE `messages` SET `date` = :date, `content` = :content, `groupId` = :groupId, `userId` = :userId, `unread` = :unread WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']); // vroeger deden we dit niet, nu gebruiken we u4, kans op collision is toch heel klein
      $stmt->bindValue(':date', $data['date']);
      $stmt->bindValue(':content', $data['content']);
      $stmt->bindValue(':groupId', $data['groupId']);
      $stmt->bindValue(':userId', $data['userId']);
      $stmt->bindValue(':unread', $data['unread']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function delete($id) {
    $sql = "DELETE FROM `messages` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    return $stmt->execute();
  }

  public function getValidationErrors($data) {
    $errors = array();
    if(!isset($data['id'])) {
      $errors['id'] = "Please fill in id";
    }
    if(!isset($data['date'])) {
      $errors['date'] = "Please fill in a date";
    }
    if(!isset($data['content'])) {
      $errors['content'] = "Please fill in a content";
    }
    if(!isset($data['groupId'])) {
      $errors['groupId'] = "Please fill in a groupId";
    }
    if(!isset($data['userId'])) {
      $errors['userId'] = "Please fill in a userId";
    }
    if(!isset($data['unread'])) {
      $errors['unread'] = "Please fill in a unread";
    }
    return $errors;
  }
}
