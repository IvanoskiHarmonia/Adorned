## Database

    the database should have 2 tables: 
        - users - UserID(auto integer) *PRIMARY KEY*, username(text), password (encrypted with simple algorithm and decrypted to check if true);
        - pictures - UserID(auto integer) REFERENCES (UserID) from users table, picture(text)