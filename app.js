var express = require('express');
var app = express();

var db = require('./db');
var passwordHash = require('password-hash');


// Questions
// 1- how to get data when it's sent -- create a class to take data in like in 216?
// 2- how to return data -- should I return a "success" or something when there's no actual data to return? SimpleRequest
//                       -- create a class for it StructuredResponse type of dealio?
// 3- how to take in data from the methods in index.js

// POST route for a new user
app.post('/new_user', function (req, res) {
    var hashed_pwd = passwordHash.generate(req.password);
    db.addUser(req.name, hashed_pwd, req.counter); // see 1 ??
})

// POST route for logging in
app.post('/login', function(req, res) {
    var hashed_pwd = passwordHash.generate(req.password);
    // login
})

// POST to add a new counter for existing user
app.post('/new_counter', function(req, res) {
    db.addCounter(req.u_id, req.value);
})

// GET to get the counter(s) of existing users
app.get('/get_counters', function(req, res) {

    res.json(getCounter(req.id)); // 3 ??
})

// PUT route to increment a counter
app.put('/increment_counter', function(req, res) {
    // increment the counter
    // probably take in the user_id & counter_id and just increment in method
})

// PUT route to decrement a counter
app.put('/increment_counter', function(req, res) {
    // decrement the counter
    // probably take in the user_id & counter_id and just decrement in method
})

app.delete('/delete_counter', function(req, res) {
    // delete an existing users counter
})

// route to share the counter -- no clue