// http methods
// 1. Get request
// 2. Post Request
// 3. Put Request 
// 4. Delete Request 

// important points
var json_data;
var express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');

// mongo db

const { Objectid, ObjectId } = require('mongodb');
const { connectToDb, getDb } = require("./connection");

app.use(express.json());

// connection to database 
let db;
connectToDb(err => {
    if (!err) {
        app.listen(3000, () => {
            console.log("Bravo listening to port 3000......");
        })
        db = getDb();
    }
    else {
        console.log(err);
    }
})

// It is called as middleware
app.use('/styles', express.static('styles'));

// for body parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// request with parameters
// never forget to put colons

app.get('/', (req, res) => {
    // req.query is used to print the query in console
    res.render('contact', {qs : req.query});
});

app.post('/', urlencodedParser, (req, res) => {
    // req.query is used to print the query in console
    console.log(req.body);
    const body = req.body

    db.collection('modelxes')
        .insertOne(body)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ err: "could not fetch a document" })
        })
    res.render('success', {data : req.body});
})

