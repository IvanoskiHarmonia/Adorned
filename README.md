# Adorned

- Bored of looking through your clothes to find what to wear tonight? look no more, install this app, upload your clothes and make combinations as easy as a simple tab on the pictures.

## How to Install

---

- the current version is beta and if you want to use it, you will need ```Node.js``` installed, The app will be ready to run in few weeks to be installed on app store.

### With git (Node.js and PostgreSQL needed)

1. Go you the desired directory and in the console write: ```git clone https://github.com/IvanoskiHarmonia/Adorned.git``` 

2. ```npm install``` in the console

3. Open PostgreSQL and in any PostgreSQL connection, look up your port (Usually ```5432```) - go into the settings of the installed server of PostgreSQL version, then create a database (any name will do), and run the queries in the sql directory of this project.

4. create an ```.env``` file by writting ```touch .env``` in the console. inside of that file you need this 4 statements lines:

    - DATABASE_URL=<```username```>://<```username```>:<```password```>@<```host```>:<```port_number```>/<```database```>
    ---
        Explanations:
            * username - PostgreSQL username (usually postgres)
            * password - server password
            * host - Name of host (usually localhost)
            * port_number - the port number of your PostgreSQL server
            * database - name of the newly created database.

    ---
    - PORT=3000
    - JWT_SECRET = <your secret sentence> (Longer the better)
    - JWT_EXPIRES_IN = 90d
    
5. run in console ```npm run startDevChrome``` and chrome browser will start and open the app for you.

