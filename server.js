const express = require("express")
const app = express()
const http = require("http")
    //this is combination of express + http
const server = http.createServer(app);
const { Server } = require("socket.io");
//this is how you are actually creating IO
const io = new Server(server);

io.on('connection', (socket) => {
    console.log("hello")
    console.log(socket.id);
    socket.on('secret message', (data) => {
        io.emit('secret message', data);
    })
});
const PORT = 7776

//app.use is used to run middleware and see notion for express.static
app.use(express.static('public'))

//http + express should listen instead of app
server.listen(PORT)