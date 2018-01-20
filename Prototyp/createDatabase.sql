
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema timetable
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `timetable` DEFAULT CHARACTER SET utf8 ;
USE `timetable` ;


-- -----------------------------------------------------
-- Table `timetable`.`Employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timetable`.`Employee` (
  `idEmployee` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `qualifications` VARCHAR(80) NULL,
  `username` VARCHAR(45) NOT NULL UNIQUE,
  `email` VARCHAR(45) NOT NULL,
  `password` CHAR(60) NOT NULL,
  `driverLicense` TINYINT(1) NOT NULL,
  `isAdmin` TINYINT(1) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `number` VARCHAR(6) NOT NULL,
  `postcode` CHAR(5) NOT NULL,
  PRIMARY KEY (`idEmployee`)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `timetable`.`Event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timetable`.`Event` (
  `idEvent` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `begin` DATETIME NOT NULL,
  `end` DATETIME NOT NULL,
  `repetition` ENUM('daily', 'weedays', 'weekly', 'once') NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`idEvent`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `timetable`.`Employees_assigned_to_Event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `timetable`.`Employees_assigned_to_Event` (
  `Event_idEvent` INT UNSIGNED NOT NULL,
  `Employee_idEmployee` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`Event_idEvent`, `Employee_idEmployee`),
  INDEX `fk_Event_has_Employee_Employee1_idx` (`Employee_idEmployee` ASC),
  INDEX `fk_Event_has_Employee_Event_idx` (`Event_idEvent` ASC),
  CONSTRAINT `fk_Event_has_Employee_Event`
    FOREIGN KEY (`Event_idEvent`)
    REFERENCES `timetable`.`Event` (`idEvent`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Event_has_Employee_Employee1`
    FOREIGN KEY (`Employee_idEmployee`)
    REFERENCES `timetable`.`Employee` (`idEmployee`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
