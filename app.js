require("dotenv").config()
const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)

const events = require("./events")
events(server)

var multer = require("multer")
var formDataParser = multer().none()

app.use(formDataParser)

app.use(express.static('public'))

const exphbs = require("express-handlebars")
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('landing');
});

app.post("/newSession", function (req, res) {
    const query = `?vId=${req.body.vId}&sId=${req.body.roomId}`
    res.redirect("/session" + query)
    // take vId and roomId
    // then redirect to /createRoom
})

app.get("/session", function (req, res) {
    const sessionInfo = {
        vId: req.query.vId,
        sId: req.query.sId
    }
    res.render("home", {vId: sessionInfo.vId, sId: sessionInfo.sId})
})





// server.listen(3000, () => {
//     console.log("server on.")
// }) 

module.exports = app