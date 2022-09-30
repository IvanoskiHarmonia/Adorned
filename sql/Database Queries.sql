-- CREATE TABLE Users (
-- 	UserID SERIAL NOT NULL PRIMARY KEY,
-- 	Username VARCHAR(20) NOT NULL,
-- 	UPassword TEXT NOT NULL CONSTRAINT lengthOfPassword CHECK (char_length(UPassword) >= 8),
-- 	UToken TEXT 
-- );

-- CREATE TABLE Pictures (
-- 	UserID int NOT NULL,
-- 	PicName text NOT NULL,
-- 	FOREIGN KEY (UserID) REFERENCES Users(UserID)
-- )

-- INSERT INTO USERS (USERNAME, UPassword)
-- 	VALUES ('martini', '1234567890');

SELECT * FROM USERS;

-- INSERT INTO PICTURES (USERID, PICNAME)
-- VALUES 
-- 	(4, 'PIC1'),
-- 	(4, 'PIC2'),
-- 	(4, 'PIC3'),
-- 	(4, 'PIC4'),
-- 	(4, 'PIC5'),
-- 	(4, 'PIC6');

-- SELECT PICNAME 
-- FROM PICTURES
-- WHERE USERID IN (
-- 	SELECT USERID
-- 	FROM USERS
-- 	WHERE USERNAME = 'martini3'
-- );


	


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	