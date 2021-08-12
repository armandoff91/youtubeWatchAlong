// grab socket .io from server
// test events
const request = require("supertest")
const app = require("./app")
const Client = require("socket.io-client")
console.log("test running")

beforeAll(() => {
    console.log("beforeAll")
})

afterAll(() => {
    console.log("afterAll")
})

it("get socket.io script", (done) => {
    request(app.app)
        .get("/socket.io.js")
        .expect(200)
        .expect("Content-Type", /javascript/)
        .end((err, res) => {
            if (err) return done(err);
            return done();
        })
})

it("get '/session'", (done) => {
    request(app.app)
        .get("/session?vId=XXXXX&roomId=YYYYY")
        .expect(200)
        .expect("Content-Type", /html/)
        .end((err, res) => {
            console.log(typeof res.text)
            if (err) return done(err);
            return done();
        })
})