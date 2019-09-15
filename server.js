var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var path = require('path')
var methodOverride = require('method-override')
var port = process.env.PORT || 5000
var Users = require("./routes/Users")
var app = express()

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/users", Users)                    

server = app.listen(port, () => {
    console.log("Server is running on port: " + port)
})
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})

// override with different headers; last one takes precedence
// app.use(methodOverride('X-HTTP-Method')) //          Microsoft
// app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
// app.use(methodOverride('X-Method-Override')) //      IBM