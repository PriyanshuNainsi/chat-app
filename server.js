const express= require('express');
const http = require('http');
const {Server}= require('socket.io');
const path= require('path')
const app=express();
const server=http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

io.on('connection',(socket)=>{
    console.log(`new client connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`a client disconnected: ${socket.id}`);
      });
})


io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

const port=3000;
server.listen(port,(req,res)=>{
    console.log(`server is listning on the http://localhost:${port}`);
})