const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
require('dotenv').config()

// mongoose.connect(process.env.MONGODB_URI || config.database);
// let db = mongoose.connection;
// //check connection
// db.once('open',function(){
//   console.log('Connected to MongoDB');
// });

// //check for db errors
// db.on('error', function(err){
//   console.log(err);
// });

// var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://as3eem:qwertyatlas@imaginehuge-db-shard-00-00-mb6x7.gcp.mongodb.net:27017,imaginehuge-db-shard-00-01-mb6x7.gcp.mongodb.net:27017,imaginehuge-db-shard-00-02-mb6x7.gcp.mongodb.net:27017/test?ssl=true&replicaSet=imaginehuge-db-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri, function(err, client) {
  // const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('Connecting...');
  if(err){
    console.log('Mongo Error');
  }
  console.log('Mongo Connected Succesfully');
});


const app = express();

//bring in models
let Article = require('./models/article');

app.set("views", __dirname + "/views"); 
app.set('view engine', 'ejs');


//Use body-parser
app.use(bodyParser.urlencoded({ extended: false })); 

// parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//home 
app.get('/', function(req, res){
  Article
   .find({}, function(err, articles){
    if(err){
      console.log(err);
    }else {
     res.render('index', {
       title:'Articles',
       articles: articles
     });
   }
  }).limit(6);
  
});

// Route Files
let articles = require('./routes/articles');
app.use('/articles', articles);

let contact = require('./routes/contact');
app.use('/send', contact);


//Tell Express where we keep our index.ejs
//app.set("views", __dirname + "/views"); 

app.listen(process.env.PORT || 8080, () => console.log('Server started...'));