const request = require("supertest")
const app = require("./app")

it("GET landing page", (done) => {
    request(app)
        .get("/")
        .expect(200)
        .expect("Content-Type", /html/)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        })
})



it("get socket.io script", (done) => {
    request(app)
        .get("/socket.io.js")
        .expect(200)
        .expect("Content-Type", /javascript/)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        })
})

it("get '/session'", (done) => {
    request(app)
        .get("/session?vId=XXXXX&roomId=YYYYY")
        .expect(200)
        .expect("Content-Type", /html/)
        .end((err, res) => {
            console.log(typeof res.text)
            if (err) return done(err);
            return done();
        })
})

it("Post '/', valid input", (done) => {

})

it("Get '/session', get into session", (done) => {

})

// how to test if request can crash my server?