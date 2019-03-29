-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 29, 2019 at 02:39 PM
-- Server version: 5.7.19
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cliffordart_se`
--

-- --------------------------------------------------------

--
-- Table structure for table `go_bilder`
--

DROP TABLE IF EXISTS `go_bilder`;
CREATE TABLE IF NOT EXISTS `go_bilder` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rubrik` varchar(255) NOT NULL,
  `biskrivning` longtext NOT NULL,
  `bild` varchar(255) NOT NULL,
  `agare` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `agare` (`agare`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `go_path`
--

DROP TABLE IF EXISTS `go_path`;
CREATE TABLE IF NOT EXISTS `go_path` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `user` int(11) NOT NULL,
  `visited` int(11) NOT NULL DEFAULT '0',
  `distance` float DEFAULT NULL,
  `time` time(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `go_user`
--

DROP TABLE IF EXISTS `go_user`;
CREATE TABLE IF NOT EXISTS `go_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_lvl` int(11) NOT NULL DEFAULT '0',
  `max_public_path` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `points_in_path`
--

DROP TABLE IF EXISTS `points_in_path`;
CREATE TABLE IF NOT EXISTS `points_in_path` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `path` int(11) NOT NULL,
  `point` int(11) NOT NULL,
  `ordning` int(11) NOT NULL,
  `lng` float NOT NULL,
  `lat` float NOT NULL,
  `visited` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `path` (`path`,`ordning`) USING BTREE,
  UNIQUE KEY `bild` (`point`,`path`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `go_bilder`
--
ALTER TABLE `go_bilder`
  ADD CONSTRAINT `owner` FOREIGN KEY (`agare`) REFERENCES `go_user` (`id`);

--
-- Constraints for table `go_path`
--
ALTER TABLE `go_path`
  ADD CONSTRAINT `user` FOREIGN KEY (`user`) REFERENCES `go_user` (`id`);

--
-- Constraints for table `points_in_path`
--
ALTER TABLE `points_in_path`
  ADD CONSTRAINT `bana` FOREIGN KEY (`path`) REFERENCES `go_path` (`id`),
  ADD CONSTRAINT `bild` FOREIGN KEY (`point`) REFERENCES `go_bilder` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
