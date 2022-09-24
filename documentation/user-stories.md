# User stories

## Uploading photos

    - When uploading photos they will not only be uploaded to the uploads folder but they also need to be uploaded to a database that will save the names of the pictures to specific user

## Login

    - There should be a login page that allows you to login with your credentials

## Database

    the database should have 2 tables: 
        - users - UserID(auto integer), username(text), password (encrypted with simple algorithm and decrypted to check if true);
        - pictures - UserID(auto integer), picture(text)

## Landing page