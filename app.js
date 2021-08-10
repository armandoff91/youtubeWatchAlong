require("dotenv").config()
const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const exphbs = require("express-handlebars")

var multer = require("multer")
var formDataParser = multer().none()

app.use(formDataParser)

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('landing');
});

app.post("/", function (req, res) {
    const query = `?vId=${req.body.vId}&roomId=${req.body.roomId}`
    res.redirect("/session" + query)
    // take vId and roomId
    // then redirect to /createRoom
})

app.get("/session", function (req, res) {
    const sessionInfo = {
        vId: req.query.vId,
        roomId: req.query.roomId
    }
    res.render("home", {vId: sessionInfo.vId, roomId: sessionInfo.roomId})
})


io.on("connection", async (socket) => {
    const message = "Welcome, please join a room"
    io.emit("message", message)

    socket.on("signin", async (room) => {
        socket.join(room)
        console.log("signin req received")
        socket.emit("message", `you have joined ${room}`)
        io.to(room).emit('message', "someone have joined")
    })

    socket.on("message", async (message) => {
        socket.emit("message", "right back at you")
        io.emit("message", "spread the love")
    })

    socket.on("stopVideo", async ()=> {
        console.log("stopVideo received")
        var i = 0
        socket.rooms.forEach((v) => {
            if (i === 1) {
                io.to(v).emit("stopVideo")
            }
            i ++
        })
    })
})



// server.listen(3000, () => {
//     console.log("server on.")
// }) 

module.exports = app