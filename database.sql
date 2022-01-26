-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.14-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for node
CREATE DATABASE IF NOT EXISTS `node` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `node`;

-- Dumping structure for table node.shopping
CREATE TABLE IF NOT EXISTS `shopping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createddate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table node.shopping: ~0 rows (approximately)
/*!40000 ALTER TABLE `shopping` DISABLE KEYS */;
INSERT INTO `shopping` (`id`, `name`, `createddate`) VALUES
	(1, 'Kembang', '2022-01-26');
/*!40000 ALTER TABLE `shopping` ENABLE KEYS */;

-- Dumping structure for table node.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `postcode` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table node.user: ~1 rows (approximately)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `username`, `password`, `email`, `phone`, `country`, `city`, `postcode`, `name`, `address`) VALUES
	(34, 'test coding', '$2b$10$9c2ss8mrOmHyyMB06gyi7ueWcOEdvI6ru1Fn1U/SXr0', 'rikiahmad2@gmail.com', '087812312', 'indonesia', 'Bandung', '12324', 'postman', 'Bandung Barat'),
	(35, 'test coding', '$2b$10$s90rl17czUtIupmYWm5lEOcAFFjJWBBqHMuJIc7dAcl', 'rikiahmad2@gmail.com', '087812312', 'indonesia', 'Bandung', '12324', 'postman', 'Bandung Barat');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
