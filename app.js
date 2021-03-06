const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

//reads the files names from the folder and puts them in the files variable
var files = fs.readdirSync('./public/uploads/');


const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    var reqognizeName = (req.body.temperature.charAt(0) + req.body.item.charAt(2)); 
    cb(null,reqognizeName + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
// 
// Init Upload
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

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.get('/clothes', function(request, response){
  console.log('Files Sent!!!');
  response.json([
    files
  ]);
});



app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    console.log(req.body.temperature + req.body.item);
    if(err){
      res.render('index', {
        input: `${files}`,
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          input: `${files}`,
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          input: `${files}`,
          msg: 'File Uploaded!',
          file: `uploads/${req.file.filename}`
        });
      }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));


