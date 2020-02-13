//Load HTTP module

var express = require('express');

//var indexRouter = require('./routes/index');
var app = express();


//Create HTTP server and listen on port 3000 for requests

app.get('/', function (req, res) {

  res.sendFile(__dirname + '/views/index.html');
  
  
});

app.listen(3000, function () {
    console.log('its workin');
});

//listen for request on port 3000, and as a callback function have the port listened on logged
/*server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

//main.get('/', function (req, res) {
  //  res.render('index', { title: 'Hey', message: 'Hello there!' })
 // })