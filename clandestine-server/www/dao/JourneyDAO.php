<?php
require_once __DIR__ . '/DAO.php';
class JourneyDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `journeys`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `journeys` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectStoriesForJourney($id) {
    $sql = "SELECT `stories`.* FROM `stories` INNER JOIN `journeys`ON `stories`.`journeyId` = `journeys`.`id` WHERE `stories`.`journeyId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectWayfarersForJourney($id) {
    $sql = "SELECT `wayfarers`.* FROM `wayfarers` INNER JOIN `journeys`ON `wayfarers`.`journeyId` = `journeys`.`id` WHERE `wayfarers`.`journeyId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `journeys` (`id`, `name`, `image`, `clanId`) VALUES (:id, :name, :image, :clanId)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':image', $data['image']);
      $stmt->bindValue(':clanId', $data['clanId']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function update($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "UPDATE `journeys` SET `name` = :name, `image` = :image WHERE `id` = :id";
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

  public function delete($id) {
    $sql = "DELETE FROM `journeys` WHERE `id` = :id";
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
    if(!isset($data['clanId'])) {
      $errors['clanId'] = "Please fill in a clanId";
    }
    return $errors;
  }
}
