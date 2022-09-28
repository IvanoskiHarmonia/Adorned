const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
const pg = require('pg');

// connecting the env file.
const dotenv = require('dotenv');
dotenv.config();

// Invoking the express function, 
// express has a single function so this way when we give the function to the constant app we are allowed to invoke express functions on demand.
const app = express();

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


// checking if my postgress connection is working properly or not
client.query('SELECT * FROM USERS', (err, res) => {
  console.log(err, res.rows[0]);
});





//reads the files names from the folder and puts them in the files variable
var files = fs.readdirSync('./public/uploads/');


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



// view ejs file this can be fixed later because I don't like ejs html.
app.set('view engine', 'ejs');

// serve static folder Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('landing'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.get('/home', (req, res) => res.render('index'));

// sleep function
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }


app.get('/clothes', function(request, response){
  console.log('Files Sent!!!', request.body.username); // this can be done only by post requests
  response.json([
    files
  ]);
});



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
      } // no undefined else
    } // no error else
  }); // end of upload

}); // end of app.post













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
      client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.username, req.body.password]);
      res.render('register', {
        msg: 'User created'
      });
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
  // console.log(req.body);
  // so first I need to check if the user already exists in the database
  // if it does then I need to check if the password matches
  // if it does then I need to send the user to the home page
  // if it does not then I need to send a message saying that the password is incorrect
  // when redirecting to the home page I need to send the user's username to the home page
  // not the best way to do it but it works for now.
  const checkUsernameExistance = await client.query('SELECT EXISTS(SELECT username FROM users WHERE username = $1)', [req.body.username]);
  // console.log(checkUsernameExistance);
  if(checkUsernameExistance.rows[0].exists){ // if the user exists
    //check if password matches
    const checkPassword = await client.query('SELECT upassword FROM users WHERE username = $1', [req.body.username]);
    if(checkPassword.rows[0].upassword === req.body.password){ // if the password matches
      res.render('index', { data : { username : req.body.username } });
    } else { // if the password does not match
      res.render('login', {
        msg: 'Password is incorrect'
      });
    }

  } else { // if the user does not exist
    res.render('login', {
      msg: 'Username does not exist'
    });
  }
});




// app listens to the port 3000
app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}\nTo stop the process press ctrl + c`));


