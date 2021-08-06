const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');
//var specs = require('./public/js/script.js');

var files = fs.readdirSync('./public/uploads/');
console.log(files);


// var filesz = files.slice(1);
// console.log(filesz);

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
  console.log('Clothes');
  response.json([
    files
    // 'cimyImage-1620418295776.jpg',
    // 'wimyImage-1620406169938.jpg',
    // 'wimyImage-1620408199885.jpg',
    // 'wimyImage-1620418275111.jpg',
    // 'wimyImage-1620432749865.jpg',
    // 'wimyImage-1620432891702.jpg' 
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




// //https://stackoverflow.com/questions/66924665/node-js-localhost-server-is-not-showing-the-image
// //https://expressjs.com/en/starter/static-files.html
// //https://www.youtube.com/watch?v=7UErZ43jzrU 
// //https://stackabuse.com/handling-file-uploads-in-node-js-with-expres-and-multer/
// //https://en.cppreference.com/w/cpp/language/range-for
// //https://expressjs.com/en/guide/routing.html
// //https://www.npmjs.com/package/multer