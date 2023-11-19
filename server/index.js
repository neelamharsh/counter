

const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});

const express = require('express');
const app = express();

require('./db/conn');

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false })) // parse application/json
app.use(bodyParser.json()) 

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(require('./router/controller.js'));

if (process.env.NODE_ENV == "production") {
    app.use(express.static("../client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
} 
else {
    app.use((req, res, next) => {
        const error = new Error("Page Not Found");
        error.status = 404;
        next(error);
    });
}


var PORT = process.env.PORT || 8000;
app.listen(PORT,() => {
    console.log(`server is running at port number ${PORT}`);
})