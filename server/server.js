const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Mine } = require('./models/Mine');
require('dotenv').config();


//Import Routes
const minesRoute = require('./routes/mines');
app.use(express.json()); //Converts res to JSON
//route middleware
app.use('/mines', minesRoute);
app.use(express.urlencoded({ extended: true }))

//bring in private db path
const dbPath = process.env.DB_CONNECT

//Connect to Database
mongoose.connect(dbPath, {
  dbName:'saturday',
  useNewUrlParser : true,
    useCreateIndex: true,
   useUnifiedTopology: true },
).then( () => console.log('Connected to Database! ;)'))
.catch(err => console.log(err));

app.listen(3000);