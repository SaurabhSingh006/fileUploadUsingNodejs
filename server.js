const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongodb = require('mongodb');

const app = express();  
const path = require('path');
app.use(express.static(`${__dirname}/uploads`));

// Use the body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));

var storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
}); 

var upload = multer({
  storage: storage
})

//CONFIGURING MONGODB
// const MongoClient = mongodb.MongoClient;
// const url = ''

// MongoClient.connect()

//Configuring the  home routes
app.get('/', (req,res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/uploadFile', upload.single('myFile'),(req,res,next) => {
  const file = req.file;
  if(!file) {
    const error = new Error('Please upload a file');
    error.statusCode = 400;
    return next(error);
  }
  res.send(file);
});

app.post('/uploadImage',(req,res) => {
  res.end('ok');
});

app.listen(8000, () => {
  console.log('App is started');
});