var express = require('express');
var app = express();

var db = require('./db');
var passwordHash = require('password-hash');


//Create HTTP server and listen on port 3000 for requests
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/signup', function(req, res) {
    res.sendFile(__dirname + '/views/signup.html');
});

app.get('/index', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// POST route for a new user
app.post('/new_user', function(req, res) {
    var obj = JSON.parse(req);
    var passhash = passwordHash.generate(obj.password);
    db.addUser(obj.name, passhash, obj.counterval);
    res.status(200);
    res.send("Ok");
})

// POST route for logging in
app.post('/login', function(req, res) {
    var obj = JSON.parse(req);
    var hashed_pwd = passwordHash.generate(obj.password);
    var checkPass = db.getPass(obj.u_name) // CHECK THIS !!!
    if (checkPass == hashed_pwd) {
        res.status(200);
        res.send("Ok");
    } else {
        res.send("Invalid Login");
    }
    // how to login ???
    res.status(200);
    res.send("Ok");
})

// POST to add a new counter for existing user
app.post('/new_counter', function(req, res) {
    var obj = JSON.parse(req);
    db.addCounter(obj.u_id, obj.value);
    res.status(200);
    res.send("Ok");
})

// GET to get the counter(s) of existing users
app.get('/get_counters', function(req, res) {
    var obj = JSON.parse(req);
    var toReturn = db.getUserCounters(obj.u_id);
    res.status(200);
    res.json(toReturn);
})

// PUT route to increment a counter
app.put('/increment_counter', function(req, res) {
    var obj = JSON.parse(req);
    db.updateCounter(obj.c_id, 1);
    res.status(200);
    res.send("Ok");
})

// PUT route to decrement a counter
app.put('/decrement_counter', function(req, res) {
    var obj = JSON.parse(req);
    db.updateCounter(obj.c_id, -1);
    res.status(200);
    res.send("Ok");
})

// route to delete a users counter
app.delete('/delete_counter', function(req, res) {
    var obj = JSON.parse(req);
    deleteCounter(obj.c_id);
    res.status(200);
    res.send("Ok");
})

var port = (process.env.PORT || 3000);

app.listen(port, function() {
    console.log('its workin');
});