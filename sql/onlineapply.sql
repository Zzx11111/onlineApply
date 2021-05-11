/*
 Navicat Premium Data Transfer

 Source Server         : 111
 Source Server Type    : MySQL
 Source Server Version : 80017
 Source Host           : localhost:3306
 Source Schema         : onlineapply

 Target Server Type    : MySQL
 Target Server Version : 80017
 File Encoding         : 65001

 Date: 05/05/2021 21:27:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activityName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` datetime(0) NOT NULL,
  `activityAddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `activityTime` datetime(0) NOT NULL,
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `latitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `longitude` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `activityContent` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `uid` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `uid`(`uid`) USING BTREE,
  CONSTRAINT `activity_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 46 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of activity
-- ----------------------------
INSERT INTO `activity` VALUES (49, '打球', '2021-05-05 20:15:34', '博罗县公安局交通警察大队', '2021-05-06 02:00:00', '5202155201534.jpg', '23.175229', '114.289406', '打球', '13018427121', 5);

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `roleID` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (8, 'admin', '123', 1);
INSERT INTO `admin` VALUES (9, 'a', '21', 1);
INSERT INTO `admin` VALUES (10, 'a2', '21', 1);
INSERT INTO `admin` VALUES (11, 'a23', '21', 2);
INSERT INTO `admin` VALUES (12, 'aa', '123', 1);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `createTime` datetime(0) NOT NULL,
  `commentContent` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '评论内容',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `uid`(`uid`) USING BTREE,
  INDEX `aid`(`aid`) USING BTREE,
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`aid`) REFERENCES `activity` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for enlist
-- ----------------------------
DROP TABLE IF EXISTS `enlist`;
CREATE TABLE `enlist`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `aid`(`uid`) USING BTREE,
  INDEX `aid_2`(`aid`) USING BTREE,
  CONSTRAINT `enlist_ibfk_1` FOREIGN KEY (`aid`) REFERENCES `activity` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `page_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '活动列表', '/activity', 'el-icon-female');
INSERT INTO `menu` VALUES (2, '用户列表', '/user', 'el-icon-s-custom');
INSERT INTO `menu` VALUES (3, '管理员列表', '/admin', 'el-icon-user-solid');
INSERT INTO `menu` VALUES (4, '角色管理', '/role', '1');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL COMMENT '角色ID',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '超级管理员');
INSERT INTO `role` VALUES (2, '管理员');

-- ----------------------------
-- Table structure for role_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menu`;
CREATE TABLE `role_menu`  (
  `roleID` int(11) NOT NULL,
  `menuID` int(11) NOT NULL,
  INDEX `roleID`(`roleID`) USING BTREE,
  INDEX `menuID`(`menuID`) USING BTREE,
  CONSTRAINT `role_menu_ibfk_1` FOREIGN KEY (`roleID`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_menu_ibfk_2` FOREIGN KEY (`menuID`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu
-- ----------------------------
INSERT INTO `role_menu` VALUES (1, 1);
INSERT INTO `role_menu` VALUES (1, 2);
INSERT INTO `role_menu` VALUES (1, 3);
INSERT INTO `role_menu` VALUES (2, 1);
INSERT INTO `role_menu` VALUES (2, 2);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openId` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `avatarUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------


SET FOREIGN_KEY_CHECKS = 1;
