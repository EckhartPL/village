-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.11-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Zrzucanie danych dla tabeli village.player: ~4 rows (około)
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` (`id`, `name`, `password`, `resourceid`) VALUES
	('06902968-5752-42ee-9e39-abe2b1be8b47', 'William', '123', '06902968-5752-42ee-9e39-abe2b1be8b47'),
	('339e5bd3-2816-427b-8fea-d32a2b979a6c', 'Ergo', 'Proxy', '339e5bd3-2816-427b-8fea-d32a2b979a6c'),
	('6fb6dfc2-3dc7-40b4-9011-f3318de9c7fb', 'Krzysztof', '1', '6fb6dfc2-3dc7-40b4-9011-f3318de9c7fb'),
	('ee33084e-03d5-43e4-9019-0e58cf75138b', 'test', 'testowy', 'ee33084e-03d5-43e4-9019-0e58cf75138b');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;

-- Zrzucanie danych dla tabeli village.resource: ~7 rows (około)
/*!40000 ALTER TABLE `resource` DISABLE KEYS */;
INSERT INTO `resource` (`id`, `gold`, `wood`, `stone`, `villager`, `villagerlimit`) VALUES
	('06902968-5752-42ee-9e39-abe2b1be8b47', 130, 0, 0, 1, 3),
	('2cdb4d14-541c-4b33-a91a-3fd6d059d64a', 0, 0, 0, 1, 3),
	('339e5bd3-2816-427b-8fea-d32a2b979a6c', 300, 0, 0, 1, 3),
	('6fb6dfc2-3dc7-40b4-9011-f3318de9c7fb', 60, 0, 0, 1, 3),
	('8a8256b9-744f-4c67-bc5a-642f29d0d2d7', 90, 0, 0, 1, 3),
	('8fc35e45-c63a-40b0-88da-80e8eb182319', 0, 0, 0, 1, 3),
	('ee33084e-03d5-43e4-9019-0e58cf75138b', 30, 0, 0, 1, 3);
/*!40000 ALTER TABLE `resource` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
