// require express and path
var express = require("express");
var path = require("path");
// create the express app
var app = express();
// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
});

// require body-parser
var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({
  extended: true
}));

// tell the express app to listen on port 8000
var server = app.listen(9000, function() {
 console.log("listening on port 9000");
});

// this gets the socket.io module *new code!* 
var io =  require('socket.io').listen(server);
// Whenever a connection event happens (the connection event is built in) run the following code
io.sockets.on('connection', function (socket) {
	  console.log('a user connected: '+ socket.id);
	  socket.on('disconnect', function(){
	    console.log('user disconnected: '+ socket.id);
	  });
	// var data = {socket.id};
	// console.log('haha: '+ socketID);
		// console.log("This is your socket id: ", socketID);
		//all the socket code goes in here!
		socket.on("posting_user", function (data){
		  console.log('Someone submit the form,  User: ' + data.user );
		  // console.log("Just double check...This is your socket id: ", socketID);
		  io.emit('updated_user', 
		  		{
		  			// id: data.socket.id,
		  			user: data.user
					}
		  );
		});
		socket.on("posting_form", function (data){
		  console.log('Someone submit the form,  Message: ' + data.message );
		  // console.log("Just triple check..This is your socket id: ", socket.id);
		  io.emit('updated_message', 
		  		{
		  			// id: data.id,
		  			name: data.name,
		  			message: data.message
					}
		  );
		});

    // //  EMIT:
    // socket.emit('my_emit_event');
    // //  BROADCAST:
    // socket.broadcast.emit("my_broadcast_event");
    // //  FULL BROADCAST:
    // io.emit("my_full_broadcast_even");
})

