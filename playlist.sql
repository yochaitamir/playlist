-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 12, 2018 at 09:53 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `image` varchar(1000) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `songs` text CHARACTER SET hp8 COLLATE hp8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `image`, `songs`) VALUES
(2, 'power', 'https://e-cdns-images.dzcdn.net/images/artist/9d06227be4e96628047430bfe05d12e4/200x200-000000-80-0-0.jpg', '[{\"name\":\"Break every chain\",\"url\":\"http:\\/\\/trem.org\\/home\\/wp-content\\/uploads\\/2013\\/09\\/Break-Every-Chain-Jesus-Culture.mp3\"},{\"name\":\"liizzy\",\"url\":\"http:\\/\\/mp3-128.cdn107.com\\/music\\/07\\/82\\/21\\/0782214156.mp3\"}]'),
(24, 'Beatles album list', 'http://ultimateclassicrock.com/files/2017/12/The-Beatles.jpg', '[{\"name\":\"yesterday\",\"url\":\"http:\\/\\/www.xzedu.net.cn\\/ktoblog\\/files\\/UploadFiles\\/2010-11\\/01145630014.mp3\"},{\"name\":\"rach\",\"url\":\"http:\\/\\/hcmaslov.d-real.sci-nnov.ru\\/public\\/mp3\\/Pink%20Floyd\\/Pink%20Floyd%20\'Breathe%20In%20The%20Air\'.mp3\"}]'),
(41, 'Beatles ', 'http://www.morningsideip.com/wp-content/uploads/2017/10/beatles.jpg', '[{\"name\":\"imagine\",\"url\":\"http:\\/\\/www.eurobaluchi.com\\/music\\/world\\/uk\\/audio\\/lennon_magine.mp3\"}]'),
(127, 'marley', 'http://thetropixs.com/wp-content/uploads/2017/12/BobMarley.jpg', '[{\"name\":\"Everything gonna be alright\",\"url\":\"https:\\/\\/a.tumblr.com\\/tumblr_m5mhri6sZr1qe8bpho1.mp3\"},{\"name\":\"put it on\",\"url\":\"http:\\/\\/www.aidia-e.com\\/mydj\\/musica\\/bob%20marley%20-%20put%20in%20on.mp3\"}]'),
(128, 'nirvana', 'http://thefederalist.com/wp-content/uploads/2016/11/kurt-cobain-998x664.jpeg', '[{\"name\":\"my girl\",\"url\":\"https:\\/\\/u168.ru\\/Shares\\/%D0%9C%D1%83%D0%B7%D1%8B%D0%BA%D0%B0\\/%D0%9C%D1%83%D0%B7%D1%8B%D0%BA%D0%B0\\/Nirvana\\/2002%20-%20You%20Know%20You\'re%20Right\\/Nirvana%20-%20Where%20Did%20You%20Sleep%20Last%20Night.mp3\"},{\"name\":\"something in the way\",\"url\":\"http:\\/\\/losted-shadow.allmyblog.com\\/images\\/losted-shadow\\/losted-shadow_20060805_084929.mp3\"}]'),
(129, 'Gary Moore ', 'https://i.pinimg.com/736x/22/23/57/22235756ebd4ccb67bd86d3e74745d44.jpg', '[{\"name\":\"cold\",\"url\":\"https:\\/\\/u168.ru\\/shares\\/%D0%9C%D1%83%D0%B7%D1%8B%D0%BA%D0%B0\\/%D0%9C%D1%83%D0%B7%D1%8B%D0%BA%D0%B0\\/Gary%20Moore\\/2001%20-%20Back%20To%20The%20Blues\\/Gary%20Moore%20-%20Cold%20Black%20Night.mp3\"}]'),
(130, 'jesus culture', 'https://upload.wikimedia.org/wikipedia/commons/6/60/Rooster_portrait2.jpg', '[{\"name\":\"everything\",\"url\":\"https:\\/\\/a.tumblr.com\\/tumblr_l2oqtncjDq1qbye2ho1.mp3\"},{\"name\":\"perfect love\",\"url\":\"https:\\/\\/a.tumblr.com\\/tumblr_lvnh7uPM8f1qalu4ao1.mp3\"},{\"name\":\"Break every chain\",\"url\":\"http:\\/\\/trem.org\\/home\\/wp-content\\/uploads\\/2013\\/09\\/Break-Every-Chain-Jesus-Culture.mp3\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
