const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { Mine } = require('./models/Mine');
require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials:true,
}));

// app.use(function(req, res, next) {
//   req.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-requested-With , Content-Type, Accept");
// })

//Import Routes
const minesRoute = require('./routes/mines');
app.use(express.json()); //Converts res to JSON

//route middleware
app.use('/', minesRoute);
app.use(express.urlencoded({ extended: true }))
// app.use('/mines', require('./routes/mines'));

//bring in private db path
const dbPath = process.env.DB_CONNECT

//Connect to Database
mongoose.connect(dbPath, {
  dbName:'saturday',
  useNewUrlParser : true,
  // useFindAndModify: false,
    useCreateIndex: true,
   useUnifiedTopology: true },
).then( () => console.log('Connected to Database! ;)'))
.catch(err => console.log(err));

app.listen(5000, () => {
   console.log('listening on 5000')
  });
