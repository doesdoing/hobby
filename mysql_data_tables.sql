/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50633
Source Host           : localhost:3306
Source Database       : mysqldb1

Target Server Type    : MYSQL
Target Server Version : 50633
File Encoding         : 65001

Date: 2019-02-01 23:27:32
*/

SET FOREIGN_KEY_CHECKS=0;



-- ----------------------------
-- Table structure for cookies
-- ----------------------------
DROP TABLE IF EXISTS `cookies`;
CREATE TABLE `cookies` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `val` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8;



-- ----------------------------
-- Table structure for network_info
-- ----------------------------
DROP TABLE IF EXISTS `network_info`;
CREATE TABLE `network_info` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(50) DEFAULT NULL,
  `hosts_ip` varchar(50) DEFAULT NULL,
  `admin_name` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;




-- ----------------------------
-- Table structure for sql_info
-- ----------------------------
DROP TABLE IF EXISTS `sql_info`;
CREATE TABLE `sql_info` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(20) DEFAULT NULL,
  `system_name` varchar(40) DEFAULT NULL,
  `hosts_ip` varchar(20) DEFAULT NULL,
  `admin_name` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `address` varchar(20) DEFAULT NULL,
  `instance` varchar(20) DEFAULT NULL,
  `state` varchar(10) DEFAULT NULL,
  `port` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=1525 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for system_web
-- ----------------------------
DROP TABLE IF EXISTS `system_web`;
CREATE TABLE `system_web` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `system_name` varchar(100) DEFAULT NULL,
  `web1` varchar(255) DEFAULT NULL,
  `web2` varchar(255) DEFAULT NULL,
  `admin_name` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users_info
-- ----------------------------
DROP TABLE IF EXISTS `users_info`;
CREATE TABLE `users_info` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `level` varchar(20) NOT NULL,
  `who` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=100000005 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vandor
-- ----------------------------
DROP TABLE IF EXISTS `vandor`;
CREATE TABLE `vandor` (
  `ID` int(5) NOT NULL AUTO_INCREMENT,
  `vandor` varchar(40) DEFAULT NULL,
  `qq` varchar(10) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `system` varchar(60) DEFAULT NULL,
  `duty` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;
