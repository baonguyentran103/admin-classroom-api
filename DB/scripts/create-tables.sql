-- class table
CREATE TABLE `heroku_504b086ac68d780`.`class` (
	`ClassID` VARCHAR(50) PRIMARY KEY,
	`Name` NVARCHAR(50) NOT NULL,
    `Part` NVARCHAR(50) NULL,
    `Title` NVARCHAR(50) NULL,
    `Room` NVARCHAR(50) NULL,
    `LinkToJoinClass` VARCHAR(2048) NOT NULL,
    `Code` VARCHAR(64) NOT NULL
);


-- DROP TABLE `heroku_504b086ac68d780`.`student`;

-- user table
CREATE TABLE `heroku_504b086ac68d780`.`user` (
	`UserID` VARCHAR(50) PRIMARY KEY,
	`FullName` NVARCHAR(50) NOT NULL,
	`AvartarURL` VARCHAR(2048) NULL,
    `Email` VARCHAR(50) NULL,
    `DateOfBirth` DATE NULL,
    `Password` VARCHAR(256) NOT NULL
);

-- class_teacher table
CREATE TABLE `heroku_504b086ac68d780`.`class_teacher` (
	`ClassID` VARCHAR(50),
	`UserID` VARCHAR(50) 
);

alter table `heroku_504b086ac68d780`.`class_teacher`
	add CONSTRAINT `PK_class_teacher` PRIMARY KEY (`ClassID`,  `UserID`),
	add CONSTRAINT `FK_class_teacher_to_class` foreign key (`ClassID`) references class(`classID`),
	add CONSTRAINT `FK_class_teacher_to_teacher` foreign key (`UserID`) references user(`UserID`);
    
-- ALTER TABLE `heroku_504b086ac68d780`.`class_teacher`
--	DROP FOREIGN KEY `FK_class_teacher_to_class`,
-- 	DROP FOREIGN KEY `FK_class_teacher_to_teacher`;

-- class_student table
CREATE TABLE `heroku_504b086ac68d780`.`class_student` (
	`classID` CHAR(50),
	`UserID` CHAR(50)
);


alter table `heroku_504b086ac68d780`.`class_student`
	add CONSTRAINT `PK_class_student` PRIMARY KEY (`ClassID`,  `UserID`),
	add CONSTRAINT `FK_class_student_to_class` foreign key (`classID`) references class(`classID`),
	add CONSTRAINT `FK_class_student_to_student` foreign key (`UserID`) references user(`UserID`);