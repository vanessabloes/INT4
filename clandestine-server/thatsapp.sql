-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Mar 21, 2020 at 01:21 PM
-- Server version: 5.7.29
-- PHP Version: 7.4.3

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `thatsapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pic` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `pic`) VALUES
('48af215b-5ae4-3f37-a690-5399e56b1cfb', 'De moatjes', '/assets/img/avt1.jpeg'),
('b16ba9bd-6377-3f58-a6ba-d6e16467e415', 'Kot', '/assets/img/avt2.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unread` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `date`, `content`, `groupId`, `userId`, `unread`) VALUES
('3c99f06c-619b-4505-bc92-6bb7aba982dd', '2020-03-19 12:04:00', 'Wie heeft er zijn afwas laten staan?', 'b16ba9bd-6377-3f58-a6ba-d6e16467e415', '9fb1ceb4-d152-3a3d-9fee-5ea26029fb48', 0),
('469759bf-d9a8-40f6-af3d-42cecea63396', '2020-03-19 12:06:00', 'Ewel, we gingen toch op weekend gaan?', '48af215b-5ae4-3f37-a690-5399e56b1cfb', 'eb19c00b-837e-37d3-8ea8-9cac99736e42', 1),
('5d3692ee-a21b-450c-ba64-f4f516f25e79', '2020-03-19 12:04:10', 'Al de 3de keer deze week, pfff', 'b16ba9bd-6377-3f58-a6ba-d6e16467e415', '9fb1ceb4-d152-3a3d-9fee-5ea26029fb48', 0),
('67f14613-698c-41a0-a579-97c560000842', '2020-03-19 12:04:00', 'Hoe zit dat met dat weekend?', '48af215b-5ae4-3f37-a690-5399e56b1cfb', 'eb19c00b-837e-37d3-8ea8-9cac99736e42', 0),
('9a4e77a8-90a5-492c-a1e2-352d4b73c35e', '2020-03-19 12:09:30', 'Ben het echt beu', 'b16ba9bd-6377-3f58-a6ba-d6e16467e415', '9fb1ceb4-d152-3a3d-9fee-5ea26029fb48', 1),
('a618adb9-2563-4d57-b3da-2adf4366eafc', '2020-03-19 12:05:00', 'weekend?', '48af215b-5ae4-3f37-a690-5399e56b1cfb', '9fb1ceb4-d152-3a3d-9fee-5ea26029fb48', 0),
('b4c424c8-9c98-4117-97ed-b000c1db18ea', '2020-03-19 12:09:00', 'Moar allé', 'b16ba9bd-6377-3f58-a6ba-d6e16467e415', '9969c1fc-0f51-3d3f-b687-d0835a081078', 0),
('bed5a7bb-1759-4fc9-a75a-62ddaad4398e', '2020-03-19 12:07:00', 'Ah ja, helemaal vergeten.', '48af215b-5ae4-3f37-a690-5399e56b1cfb', '9fb1ceb4-d152-3a3d-9fee-5ea26029fb48', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `avatar`) VALUES
('4e8baf11-bb77-3f6b-97d1-69b8e51c2ebe', 'Ilias Claes', 'https://randomuser.me/api/portraits/men/23.jpg'),
('9969c1fc-0f51-3d3f-b687-d0835a081078', '[Jouw naam hier]', 'https://randomuser.me/api/portraits/women/22.jpg'),
('9fb1ceb4-d152-3a3d-9fee-5ea26029fb48', 'Mathias Vandenberghe', 'https://randomuser.me/api/portraits/men/22.jpg'),
('eb19c00b-837e-37d3-8ea8-9cac99736e42', 'Eloïse Pirotte', 'https://randomuser.me/api/portraits/women/10.jpg'),
('ef197725-d76a-3704-80b8-f0a50967742b', 'Lina Van Hoof', 'https://randomuser.me/api/portraits/women/24.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users_groups`
--

DROP TABLE IF EXISTS `users_groups`;
CREATE TABLE `users_groups` (
  `userId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupId` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users_groups`
--

INSERT INTO `users_groups` (`userId`, `groupId`) VALUES
('9969c1fc-0f51-3d3f-b687-d0835a081078', '48af215b-5ae4-3f37-a690-5399e56b1cfb'),
('9fb1ceb4-d152-3a3d-9fee-5ea26029fb48', '48af215b-5ae4-3f37-a690-5399e56b1cfb'),
('eb19c00b-837e-37d3-8ea8-9cac99736e42', '48af215b-5ae4-3f37-a690-5399e56b1cfb'),
('9969c1fc-0f51-3d3f-b687-d0835a081078', 'b16ba9bd-6377-3f58-a6ba-d6e16467e415'),
('9fb1ceb4-d152-3a3d-9fee-5ea26029fb48', 'b16ba9bd-6377-3f58-a6ba-d6e16467e415');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupId` (`groupId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_groups`
--
ALTER TABLE `users_groups`
  ADD PRIMARY KEY (`userId`,`groupId`),
  ADD KEY `groupId` (`groupId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_groups`
--
ALTER TABLE `users_groups`
  ADD CONSTRAINT `users_groups_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_groups_ibfk_2` FOREIGN KEY (`groupId`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
