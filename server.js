
const express = require("express");
const bodyParser = require("body-parser");
var http = require('http');
const cors = require("cors");
const path = require("path");
const dbConfig = require("./config/db.config");

const mongoose = require("mongoose");
const app = express();



app.use(cors());


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));



app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true, parameterLimit:100000}));


mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((connection) => {
    console.log("Successfully connected to MongoDB. "); 
  })
  .catch(err => {
    console.log('Could not connect to MongoDB.',err);
    process.exit();
  });



app.get("/", (req, res) => {
  res.json({ message: "Welcome to Nodejs Application." });
});


var enthusiastRouter = require("./routes/enthusiast.routes");
var expertRouter = require("./routes/expert.routes");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
 


app.use('/api/v1', enthusiastRouter);
app.use('/api/v1', expertRouter);





const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



var server = http.createServer(app)

module.exports = app;