<?php
require_once __DIR__ . '/DAO.php';
class ClanDAO extends DAO {

  public function selectAll() {
    $sql = "SELECT * FROM `clans`";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id) {
    $sql = "SELECT * FROM `clans` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectMembersForClan($id) {
    $sql = "SELECT `members`.* FROM `members` INNER JOIN `clans`ON `members`.`clanId` = `clans`.`id` WHERE `members`.`clanId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectJourneysForClan($id) {
    $sql = "SELECT `journeys`.* FROM `journeys` INNER JOIN `clans`ON `journeys`.`clanId` = `clans`.`id` WHERE `journeys`.`clanId` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function linkClans($data) {
    $errors = $this->getValidationErrorsLinkClans($data);
    if(empty($errors)) {
      //delete old users
      $sql = "DELETE FROM `users_clans` WHERE `groupId` = :groupId";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':groupId', $data['id']);
      $stmt->execute();

      // link new users 
      $sql = "INSERT INTO `users_clans` (`groupId`, `userId`) VALUES (:groupId, :userId)";
      $stmt = $this->pdo->prepare($sql);
      foreach($data['users'] as $user){
        $stmt->bindValue(':groupId', $data['id']);
        $stmt->bindValue(':userId', $user['id']);
        $stmt->execute();
      }
      return $this->selectUsersForClan($data['id']);
    }
    return false;
  }

  public function insert($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "INSERT INTO `clans` (`id`, `name`, `password`) VALUES (:id, :name, :password)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':password', $data['password']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function update($data) {
    $errors = $this->getValidationErrors($data);
    if(empty($errors)) {
      $sql = "UPDATE `clans` SET `name` = :name, `avatar` = :pic WHERE `id` = :id";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':id', $data['id']);
      $stmt->bindValue(':name', $data['name']);
      $stmt->bindValue(':pic', $data['pic']);
      if($stmt->execute()) {
        return $this->selectById($data['id']);
      }
    }
    return false;
  }

  public function delete($id) {
    $sql = "DELETE FROM `clans` WHERE `id` = :id";
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
    if(!isset($data['password'])) {
      $errors['password'] = "Please fill in a password";
    }
    return $errors;
  }

  public function getValidationErrorsLinkClans($data) {
    $errors = array();
    if(!isset($data['id'])) {
      $errors['id'] = "Please fill in id";
    }
    if(!isset($data['users'])) {
      $errors['name'] = "Please fill in a users";
    }else{
      foreach($data['users'] as $user){
        if(!isset($user['id'])){
          $errors['userid'] = 'Please fill in user id';
        }
      }
    }
    
    return $errors;
  }
}
