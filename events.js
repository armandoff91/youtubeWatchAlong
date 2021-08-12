const { Server } = require("socket.io")

function events(server) {    
    const io = new Server(server)

    io.on("connection", async (socket) => {
        const message = "Welcome, please join a session"
        io.emit("message", message)
    
        socket.on("signin", async (session) => {
            socket.join(session)
            console.log("signin req received")
            socket.emit("message", `you have joined ${session}`)
            io.to(session).emit('message', "someone have joined")
        })
    
        socket.on("message", async (message) => {
            socket.emit("message", message)
            io.emit("message", message)
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
}

module.exports = events