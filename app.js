// express server dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');


// reqire bcrypt
const bcrypt = require('bcrypt');

// require jwt
const jwt = require('jsonwebtoken');


// picture upload dependencies
const multer = require('multer');
const path = require('path');


// Database dependency
const pg = require('pg');

// connecting the env file. dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
dotenv.config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// for security reasons, I am using a .env file to store my database credentials
// the credendials are stored in the .env file as follows:
// DATABASE_URL=postgres://postgres:<password>@localhost:<port>/<database>
const connectionString = process.env.DATABASE_URL;
const client = new pg.Client(connectionString);
client.connect();

// check if pg is connected
// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
// })




/* ----------------------------------------- START: Upload picture function -------------------------------------------- */

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    var reqognizeName = (req.body.temperature.charAt(0) + req.body.item.charAt(2)); 
    cb(null,reqognizeName + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// upload function, 
const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

// what post does is basically CRUD principle update to the *database*,
// which here my database is uploads folder inside of the public directory
app.post('/upload', (req, res) => {

  upload(req, res, (err) => {
    console.log(req.body.temperature + req.body.item);
    if(err){ // if there is an error
      res.render('index', {
        input: `${files}`,
        msg: err
      });
    } else { // if there is no error
      if(req.file == undefined){ // if the file is undefined
        res.render('index', {
          input: `${files}`,
          msg: 'Error: No File Selected!'
        });
      } else { // if the file is selected then it will be uploaded to the uploads folder
        res.render('index', {
          input: `${files}`,
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        }); // end of res.render
        // client.query('INSERT INTO pictures (UserID, picname) VALUES ($1, $2)', [req.body.username, req.file.filename]);
      } // storing image else
    } // no error else
  }); // end of upload

}); // end of app.post




/* ----------------------------------------- END: Upload picture function -------------------------------------------- */



// view ejs file this can be fixed later because I don't like ejs html.
app.set('view engine', 'ejs');

// serve static folder Folder
app.use(express.static('./public'));

// request for the all of my pages.
app.get('/', (req, res) => res.render('landing'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/home', (req, res) => res.render('index'));

// sleep function
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }


app.get('/clothes', async function(request, response){
  try {
    const token = request.query.token;
    const verfiy = await client.query('SELECT * FROM users WHERE utoken = $1', [token]);
    if (verfiy.rows.length > 0) {
      
      const usersPics = await client.query('SELECT PICNAME FROM PICTURES WHERE USERID IN (SELECT USERID FROM USERS WHERE username = $1);', [request.query.username]);

      response.json( usersPics.rows );
    }
  }
  catch (err) {
    response.status(500).send(err.message);
  }  
});
















app.post('/register', async (req, res) => {
  // console.log(req.body);
  // so first I need to check if the user already exists in the database
  // if the user exists then I need to send a message saying that the user already exists
  // if the user does not exist then I need to create a new user in the database
  if(req.body.password === req.body.confirmPassword){ // if the passwords match
    //check if user exists
    const checkUsernameExistance = await client.query('SELECT EXISTS(SELECT username FROM users WHERE username = $1)', [req.body.username]);
    if(checkUsernameExistance.rows[0].exists){ // if the user exists
      res.render('register', {
        msg: 'Username already exists'
      });
    } else { // if the user does not exist
      //create user
      const hashPass = await bcrypt.hash(req.body.password, 10);
      client.query('INSERT INTO users (username, upassword) VALUES ($1, $2)', [req.body.username, hashPass]);
      await sleep(2000); // wait for 2 seconds
      res.render('login');
    }
  } else { // if the passwords do not match
    res.render('register', {
      msg: 'Passwords do not match'
    });
  }

}); // end of app.post /register







app.post('/login', async (req, res) => {
  // not the best way to do it but it works for now.
  if(!/^[A-Za-z0-9]+$/i.test(req.body.username)){ // if the username is not alphanumeric
    // res.status(400).send('Username must be alphanumeric');
    res.render('login', { msg: 'Username must be alphanumeric' });
  } 
  else if(!/^[A-Za-z0-9_@./#&+-/!]+$/i.test(req.body.password)){ // if password has anything else than alphanumeric and _@./#&+-/!
    // res.status(400).send('Password must be alphanumeric and _ , @ , . , # , & , + , - , !');
    
    res.render('login', { msg: 'Password must be alphanumeric and _ , @ , . , # , & , + , - , !' });
  }
  else { // if the username is alphanumeric
    const checkUsernameExistance = await client.query('SELECT EXISTS(SELECT username FROM users WHERE username = $1)', [req.body.username]);
    // console.log(checkUsernameExistance);
    if(checkUsernameExistance.rows[0].exists){ // if the user exists
      //check if password matches
      const checkPassword = await client.query('SELECT upassword FROM users WHERE username = $1', [req.body.username]);
      // console.log(checkPassword.rows[0].upassword + ' ' + req.body.password);
      if(bcrypt.compareSync(req.body.password, checkPassword.rows[0].upassword)){ 
        var rand = function() { return Math.random().toString(36).substr(2); };
        var token = function() { return rand() + new Date().toString().replaceAll(' ', '') + rand();};
  
        const token1 = token();

        client.query('UPDATE users SET UTOKEN = $1 WHERE username = $2', [token1, req.body.username]);
        // res.render('index', {, username: req.body.username});
        res.render('index', { data : { tokens: token1, username : req.body.username } });
  
  
  
      } else { // if the password does not match
        res.render('login', {
          msg: 'Password or Username is incorrect, please try again'
        });
      }
  
    } else { // if the user does not exist
      res.render('login', {
        msg: 'Username does not exist'
      });
    }
    
  } // end of else if username is alphanumeric and password is alphanumeric and _@./#&+-/!
}); // end of app.post /login



app.get('/token', async (req, res) => {
  const checkToken = await client.query('SELECT EXISTS(SELECT utoken FROM users WHERE username = $1)', [req.query.username]);
  // const sendToken = await client.query('SELECT utoken FROM users WHERE username = $1', [req.query.username]);
  console.log(sendToken.rows[0].utoken);
  if(checkToken.rows[0].exists){
    console.log('token exists ' + req.query.username);
    const sendToken = await client.query('SELECT utoken FROM users WHERE username = $1', [req.query.username]);
    console.log(sendToken.rows[0].utoken);
    res.json(sendToken.rows[0].utoken);
  } else {
    res.status(500).send('No token found for this user, please login again');
  }
});

app.post('/logout', async (req, res) => {
  await client.query('UPDATE users SET UTOKEN = $1 WHERE username = $2', [null, req.query.username]);
});



// had to test how jwt works it actually very easy to use.

const userToken = [];

// needs a post request to check how jwt works
app.post('/user/signup', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const email = req.body.email;
  const token = jwt.sign({ username: username }, 
                          process.env.JWT_SECRET, 
                          { expiresIn: process.env.JWT_EXPIRES_IN, });
  userToken.push(token);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: username
      }
    }); // end of res.status(200).json
}); // end of app.post /signup

// needs a post request to verify the token
app.post('/user/signup/auth', async (req, res) => {
  const token = userToken[0];

  if(token){

    const verfiyToken = jwt.verify(token, process.env.JWT_SECRET);

    res.status(201).json({
      status: 'success',
      data: verfiyToken
    });
  } else {
    res.status(401).json({
      status: 'fail',
      message: 'Token not found'
    });
  }
}); // end of app.post /user/login/auth

const PORT = process.env.PORT || 3000;

// app listens to the port 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}\nTo stop the process press ctrl + c`));