var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var path = require('path')
var methodOverride = require('method-override')

var app = express()
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var Users = require("./routes/Users")

app.use("/users", Users)                    

app.listen(port, () => {
    console.log("Server is running on port: " + port)
})


// override with different headers; last one takes precedence
// app.use(methodOverride('X-HTTP-Method')) //          Microsoft
// app.use(methodOverride('X-HTTP-Method-Override')) // Google/GData
// app.use(methodOverride('X-Method-Override')) //      IBM