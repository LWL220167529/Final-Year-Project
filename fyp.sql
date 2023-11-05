-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: fyp
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attraction`
--

DROP TABLE IF EXISTS `attraction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `attraction` (
  `attractionID` varchar(255) NOT NULL,
  `attractionName` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `country` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `editTime` date DEFAULT NULL,
  PRIMARY KEY (`attactionID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attraction`
--

LOCK TABLES `attraction` WRITE;
/*!40000 ALTER TABLE `attraction` DISABLE KEYS */;
INSERT INTO `attraction` VALUES ('0','a','abc',NULL,NULL,'abc',NULL,'2023-10-14 06:57:43',NULL),('1','b','bbb',NULL,NULL,'I love b',NULL,'2023-10-14 06:57:43',NULL),('2','c','c',NULL,NULL,'OMG is c',NULL,'2023-10-14 06:57:43',NULL);
/*!40000 ALTER TABLE `attraction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schedule_directory`
--

DROP TABLE IF EXISTS `schedule_directory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `schedule_directory` (
  `scheduleDirectoryID` int NOT NULL AUTO_INCREMENT,
  `userID` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `editTime` date DEFAULT NULL,
  PRIMARY KEY (`scheduleDirectoryID`),
  KEY `userIDHolder_FK_idx` (`userID`),
  CONSTRAINT `Holder_FK` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schedule_directory`
--

LOCK TABLES `schedule_directory` WRITE;
/*!40000 ALTER TABLE `schedule_directory` DISABLE KEYS */;
/*!40000 ALTER TABLE `schedule_directory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userID` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(252) NOT NULL,
  `phoneNumber` int DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('0','root','123456789@stu.vtc.edu.hk','root',12345678,'2023-10-12 12:43:49'),('1','user1','987654321@stu.vtc.edu.hk','123',NULL,'2023-10-12 13:51:45'),('2','user2','123459876@stu.vtc.edu.hk','456',NULL,'2023-10-12 13:51:45'),('abc','a','abc@email.com','abc',12345679,'2023-10-13 12:48:38');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_favorites`
--

DROP TABLE IF EXISTS `user_favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user_favorites` (
  `userFavoritesID` int NOT NULL AUTO_INCREMENT,
  `userID` varchar(255) NOT NULL,
  `attactionID` varchar(255) NOT NULL,
  PRIMARY KEY (`userFavoritesID`),
  KEY `userID_FK_idx` (`userID`),
  KEY `attactionID_FK_idx` (`attactionID`),
  CONSTRAINT `attactionFavorites_FK` FOREIGN KEY (`attactionID`) REFERENCES `attraction` (`attactionID`),
  CONSTRAINT `userFavorites_FK` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_favorites`
--

LOCK TABLES `user_favorites` WRITE;
/*!40000 ALTER TABLE `user_favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_schedule`
--

DROP TABLE IF EXISTS `user_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `user_schedule` (
  `userScheduleID` int NOT NULL AUTO_INCREMENT,
  `scheduleDirectoryID` int NOT NULL,
  `attactionID` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `editTime` date DEFAULT NULL,
  PRIMARY KEY (`userScheduleID`),
  KEY `attactionID_FK_idx` (`attactionID`),
  KEY `scheduleDirectoryID_FK_idx` (`scheduleDirectoryID`),
  CONSTRAINT `attactionSchedule_FK` FOREIGN KEY (`attactionID`) REFERENCES `attraction` (`attactionID`),
  CONSTRAINT `scheduleDirectory_FK` FOREIGN KEY (`scheduleDirectoryID`) REFERENCES `schedule_directory` (`scheduleDirectoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_schedule`
--

LOCK TABLES `user_schedule` WRITE;
/*!40000 ALTER TABLE `user_schedule` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_schedule` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-17 22:51:03
