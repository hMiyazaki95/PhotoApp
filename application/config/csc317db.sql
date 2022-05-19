-- MySQL dump 10.13  Distrib 8.0.27, for macos11 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.13

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` longtext NOT NULL,
  `fk_authorid` int(11) NOT NULL,
  `fk_postid` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `key_tousertable_idx` (`fk_authorid`),
  KEY `key_toposttable_idx` (`fk_postid`),
  CONSTRAINT `key_toposttable` FOREIGN KEY (`fk_postid`) REFERENCES `posts` (`id`),
  CONSTRAINT `key_tousertable` FOREIGN KEY (`fk_authorid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `photopath` varchar(2048) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `fk_userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post_author_idx` (`fk_userId`),
  CONSTRAINT `post_author` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (13,'Sky','Thunder Lightning                                \r\n                            ','public/images/uploads/bb276e3b085140aeb0d4dda3934abe5da357545f781d.jpeg','public/images/uploads/thumbnail-bb276e3b085140aeb0d4dda3934abe5da357545f781d.jpeg',1,'2022-05-18 13:21:01',18),(14,'Sky','Thunder Lightning                                \r\n                            ','public/images/uploads/de0d6e78d04d6b16490c66d8cb83cf2fee31b9d1cf05.jpeg','public/images/uploads/thumbnail-de0d6e78d04d6b16490c66d8cb83cf2fee31b9d1cf05.jpeg',1,'2022-05-18 13:22:44',18),(15,'test10','The image for test 10                                \r\n                            ','public/images/uploads/f158994205df45580305c97f04cef8cbee1d9d95e5f1.jpeg','public/images/uploads/thumbnail-f158994205df45580305c97f04cef8cbee1d9d95e5f1.jpeg',1,'2022-05-18 23:24:11',18),(16,'test10','The image for test 10                                \r\n                            ','public/images/uploads/2718a936b278c1d475b91ca23816a95eaad4fb5e9a24.jpeg','public/images/uploads/thumbnail-2718a936b278c1d475b91ca23816a95eaad4fb5e9a24.jpeg',1,'2022-05-18 23:24:33',18);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (15,'Hajime','hMiyazaki@sfsu.edu','$2a$15$rqPVV0YF7zLog5PUvbpGiuUqtfPakGzXYy06iegdhGWfWUC7Q2A7O',1,'2022-05-17 16:17:50'),(16,'test01','test!@test.com','$2a$15$p6aA2/T7/bIHgReyhARhEeY1Cexi9JgWy7g3F9WIiRkVarElhvKF.',1,'2022-05-17 18:17:21'),(18,'Hajime2','haji@testing.com','$2a$15$agz5IyjyfcxxSJ.hc8a60OyCeDxEbWetfoMUvAWG7w66Niqcd6Vj2',1,'2022-05-18 13:16:34'),(19,'Hajime3','test13@test.com','$2a$15$dyKo0ZfNdpMGBR8FWe5/0OcpXKcugu2zUZzCTgfg7fqLQqsmIqx7q',1,'2022-05-18 23:48:49'),(20,'test2022','test2022@test.com','$2a$15$u2n8Jlfof/wovlAZxDTG8uoVT0Yowj33YlbxxRhPbop8RqTgGgKW.',1,'2022-05-18 23:50:04'),(22,'Hajime7','H2022@t.com','$2a$15$3/DtKX9tbwskP1jxLestOeJ5.IChGU9EV.a78yqk70wW89AiBxJkS',1,'2022-05-18 23:52:01');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-19  0:22:00
