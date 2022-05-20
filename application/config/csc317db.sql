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
  `fk_authorid` int(11) unsigned NOT NULL,
  `fk_postid` int(11) unsigned NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `key_tousertable_idx` (`fk_authorid`),
  KEY `key_toposttable_idx` (`fk_postid`)
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (13,'Sky','Thunder Lightning                                \r\n                            ','public/images/uploads/bb276e3b085140aeb0d4dda3934abe5da357545f781d.jpeg','public/images/uploads/thumbnail-bb276e3b085140aeb0d4dda3934abe5da357545f781d.jpeg',1,'2022-05-18 13:21:01',18),(14,'Sky','Thunder Lightning                                \r\n                            ','public/images/uploads/de0d6e78d04d6b16490c66d8cb83cf2fee31b9d1cf05.jpeg','public/images/uploads/thumbnail-de0d6e78d04d6b16490c66d8cb83cf2fee31b9d1cf05.jpeg',1,'2022-05-18 13:22:44',18),(17,'image2','image test 2                                \r\n                            ','public/images/uploads/83cd37c15b068662043c78893d22158820a4b27277d0.jpeg','public/images/uploads/thumbnail-83cd37c15b068662043c78893d22158820a4b27277d0.jpeg',1,'2022-05-19 00:44:54',18),(18,'test image 1','test                                \r\n                            ','public/images/uploads/603f4d490460ffff9954ca4058b9618e59e78be7fb37.gif','public/images/uploads/thumbnail-603f4d490460ffff9954ca4058b9618e59e78be7fb37.gif',1,'2022-05-19 04:54:27',24),(19,'test image','test image 8                        ','public/images/uploads/5a3c3ecd35eb9a615e2ef973ac714565a3e9d4866bdd.jpeg','public/images/uploads/thumbnail-5a3c3ecd35eb9a615e2ef973ac714565a3e9d4866bdd.jpeg',1,'2022-05-19 05:50:10',28),(20,'Post image test','Post image test                                \r\n                            ','public/images/uploads/e8f8534d8b336e094816b451051e221ad058f77dfa00.jpeg','public/images/uploads/thumbnail-e8f8534d8b336e094816b451051e221ad058f77dfa00.jpeg',1,'2022-05-19 06:02:00',29);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('8V5Huq31pcERHD80tQhNKyvp6rbP0WvE',1653024922,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('MvtYQA5Jl29tHtsSeVRrKQg_KRXqslEk',1653027286,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{\"error\":[\"You must be logged in to crete a Post!\"]}}'),('ZQDFshpMIbQQiBAmE2p9UBeZglV_EsW5',1653027090,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('aFd6hGE8wXw8QHlXVKAFa9vpdA1JiKHc',1653050396,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('chpkKchkZ6zrMmlXgGXIjRlDmevdsQPb',1653066084,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"username\":\"Hajime2\",\"userId\":18}'),('kz7LJdMnnnwQDz1rM6NpCDM4lBEv1SZr',1653025219,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('qPBfgJIYYYu26SuZoGeIBu-VpSJ2kEjj',1653049525,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('rhP7bdL6_I1wmrbgS0OkhqFcsU8O15Q3',1653027108,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}'),('saBu_CJelfKTkIF3-zloSz9tfokogqsc',1653023863,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (15,'Hajime','hMiyazaki@sfsu.edu','$2a$15$rqPVV0YF7zLog5PUvbpGiuUqtfPakGzXYy06iegdhGWfWUC7Q2A7O',1,'2022-05-17 16:17:50'),(16,'test01','test!@test.com','$2a$15$p6aA2/T7/bIHgReyhARhEeY1Cexi9JgWy7g3F9WIiRkVarElhvKF.',1,'2022-05-17 18:17:21'),(18,'Hajime2','haji@testing.com','$2a$15$agz5IyjyfcxxSJ.hc8a60OyCeDxEbWetfoMUvAWG7w66Niqcd6Vj2',1,'2022-05-18 13:16:34'),(19,'Hajime3','test13@test.com','$2a$15$dyKo0ZfNdpMGBR8FWe5/0OcpXKcugu2zUZzCTgfg7fqLQqsmIqx7q',1,'2022-05-18 23:48:49'),(20,'test2022','test2022@test.com','$2a$15$u2n8Jlfof/wovlAZxDTG8uoVT0Yowj33YlbxxRhPbop8RqTgGgKW.',1,'2022-05-18 23:50:04'),(22,'Hajime7','H2022@t.com','$2a$15$3/DtKX9tbwskP1jxLestOeJ5.IChGU9EV.a78yqk70wW89AiBxJkS',1,'2022-05-18 23:52:01'),(23,'testuser','testuser@t.com','$2a$15$KanGPrP/sFLcgYpuxUSYlOXmIIKvO9imXxT/2Zq9GTPLA2SEjJxWS',1,'2022-05-19 04:50:14'),(24,'testuser1','testuser1@t.com','$2a$15$oQoFjb8oOtoChAaXSzMq0eOrKwAlgBjxURY4.yNThlk49gkSFGuQy',1,'2022-05-19 04:52:04'),(25,'testuser3','testuser3@t.com','$2a$15$hzM/gRwigqN5L9h3Rn.bxeciAbnUFbxmx8fMjv.NdKQCyhvhNgdSm',1,'2022-05-19 05:07:34'),(26,'testuser4','testuser4@t.com','$2a$15$ZU6S/26NUMzIZHnH1RWF2.oV.h6a4/iozKEm23mMyz41QivpugX02',1,'2022-05-19 05:12:15'),(27,'testuser5','testuser5@test.com','$2a$15$p2WLxfZ4muP7ke0CzRGXUewIbNT3suFl6ZlHbmjBv4hkObcxHJqTi',1,'2022-05-19 05:35:04'),(28,'testuser8','testuser8@t.com','$2a$15$lR6xOueGx3K3gBamsvz2KO1rlvJVyozuCDKTNxNB6T49lENCGK34u',1,'2022-05-19 05:47:37'),(29,'testuser9','testuser9@t.com','$2a$15$pSHyHySiooiBRAqu/k2CqO6FxWLoeR6anrAc6SPw.REZoFXnZSWsi',1,'2022-05-19 05:53:56'),(30,'testuser10','testuser10@m.com','$2a$15$98SiFDfw5ewIW4LP2UZUfuZvq//vQVwgwBjUcNGyhdM5HMMSMfnNq',1,'2022-05-19 06:00:00');
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

-- Dump completed on 2022-05-19 18:56:12
