/**
 * Created by user on 11/9/2014.
 */

var irc = require('twitch-irc');
// most basic dependencies
var express = require('express')
    , http = require('http')
    , os = require('os')
    , path = require('path');

// create the app
var app = express();
//---------------------------------------
// mini app
//---------------------------------------
var openConnections = [];

// simple route to register the clients
app.get('/message', function(req, res) {

    // set timeout as high as possible
    req.socket.setTimeout(Infinity);

    // send headers for event-stream connection
    // see spec for more information
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });
    res.write('\n');

    // push this res object to our global variable
    openConnections.push(res);

    // When the request is closed, e.g. the browser window
    // is closed. We search through the open connections
    // array and remove this connection.
    req.on("close", function() {
        var toRemove;
        for (var j =0 ; j < openConnections.length ; j++) {
            if (openConnections[j] == res) {
                toRemove =j;
                break;
            }
        }
        openConnections.splice(j,1);
        console.log(openConnections.length);
    });
});

app.post('/say', function(request, response){

    var message = request.query.message;

    client.say('B00Keeper', message);
    console.log(message);

});



// Calling a new client..
var client = new irc.client({
    options: {
        debug: true,
        debugIgnore: ['ping', 'chat', 'action'],
        logging: false,
        tc: 3
    },
    identity: {
        username: 'B00Keeper',
        password: 'oauth:a0zypesx0oar50fdttlrhrz0mmoula9'
    },
    channels: ['trumpsc']
});

// Connect the client to server..
client.connect();
var messageT,userName;

client.addListener('chat', function (channel, user, message) {
    // If the message starts with !hello..
    console.log(message);
    console.log(user);

    openConnections.forEach(function(resp) {

        // Your events..
        var msg = JSON.stringify('name::::'+user.username+'----'+ 'message::::'+message+'----'+'color::::'+user.color);
        console.log(msg);
        resp.write('data:' + msg +'\n\n');
    });


});

//setInterval(function() {
//    // we walk through each connection
//    openConnections.forEach(function(resp) {
//
//        // Your events..
//        var msg = JSON.stringify(userName+':'+ messageT);
//        resp.write('data:' + msg +'\n\n');
//    });
//
//}, 1000);

//app.listen(3000);
//startup everything
http.createServer(app).listen(3000, function(){
    console.log("Express server listening on port " + 3000);
});






