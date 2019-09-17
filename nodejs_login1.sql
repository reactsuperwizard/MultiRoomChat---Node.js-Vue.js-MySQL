-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2019 at 02:45 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_login1`
--
CREATE DATABASE IF NOT EXISTS `nodejs_login1` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `nodejs_login1`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` text,
  `email` text,
  `password` text,
  `created` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created`) VALUES
(1, 'test', 'test', 'test@test.com', '$2b$10$BEfzczbrqAyhuiKUgAmg7exQwnL.TyMmYsUZKOYpkUUadCHC3r5GK', '2019-09-11 08:12:26'),
(2, 'test', 'test', 'test1@test.com', '$2b$10$VsGiK0Od5cwwuAuuBdmBnezn5YKqlBBYIGCygQhcwInPGfWlSMFIK', '2019-09-11 14:34:15'),
(3, 'test2', 'test2', 'test2@test.com', '$2b$10$Zpxw/E/CjqqKSD/oC8AYsO7fbjKWslNrwFFF8FL./sOB9MS2TfAN6', '2019-09-11 16:21:05'),
(4, 'test23', 'test2', 'test23@test.com', '$2b$10$/S3VKbXge0HE2P1TBbZPq.fRq0Zmq3KQ7IcUI0Fpd3nOl6uNv5eva', '2019-09-11 16:22:01');

-- --------------------------------------------------------

--
-- Table structure for table `user_infos`
--

DROP TABLE IF EXISTS `user_infos`;
CREATE TABLE `user_infos` (
  `id` int(11) NOT NULL,
  `socketid` char(255) DEFAULT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` text,
  `delete_time` text,
  `avatar` varchar(250) DEFAULT 'default.jpg',
  `age` int(2) DEFAULT NULL,
  `sex` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT '',
  `bio` varchar(240) DEFAULT '',
  `status_active` int(11) NOT NULL DEFAULT '0',
  `status_participate` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_infos`
--

INSERT INTO `user_infos` (`id`, `socketid`, `name`, `email`, `password`, `create_time`, `delete_time`, `avatar`, `age`, `sex`, `location`, `bio`, `status_active`, `status_participate`) VALUES
(29, NULL, 'a', 'a@a.com', '$2b$10$db7BIvtorOxN6QTxPI4gUOgit4UImsiBFlEoV/vLbKU4PeNGSpuDK', '2019-09-15 05:53:32', NULL, 'images (1).jpg', 18, 'female', 'a', 'a', 0, 0),
(37, NULL, 'Rui', 'Rui@email.com', '$2b$10$mQf6OLNkyL.ac8WqYOScGeQBhGNYYt7OOk.nJNw9y/s92IMqN8haO', '2019-09-13 17:34:29', NULL, 'images (1).jpg', 18, 'female', 'Jilin', 'It\'s Rui.', 0, 0),
(38, NULL, 'test3', 'test3@test3.com', '$2b$10$tFVr71tG5vU4SsD2CI8B3uIwtGL.QGCGZRH99JcfGEga9sTtokChu', '2019-09-14 17:34:50', NULL, 'default.jpg', NULL, NULL, '', '', 0, 0),
(39, NULL, 'aa', 'aa@aa.com', '$2b$10$ELdmCLCg5WiVK/Gzk5wpWuL5HR1KFWWB.WELDNmpnEEW5UHfkKkFS', '2019-09-15 07:50:24', NULL, 'images (1).jpg', 15, 'male', 'aa', 'aa', 0, 0),
(40, NULL, '', '', '$2b$10$paxmnsbMfI7hzj/BeqsituKcrv6b1k..napRfbFXjPpSQyE3w5dDu', '2019-09-15 08:34:33', NULL, 'default.jpg', NULL, NULL, '', '', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_infos`
--
ALTER TABLE `user_infos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_infos`
--
ALTER TABLE `user_infos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
