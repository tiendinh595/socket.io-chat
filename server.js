/**
 * Created by Dinh. Vu Tien on 9/8/2016.
 */
const express = require('express');
const path = require('path');
var io = require('socket.io');

const app = express();
const server = app.listen(3000)
io = io.listen(server)

var list_users = []
var list_socket = {}

app.use('/publics/', express.static(__dirname + '/publics/'));

app.get('/', function(req, res) {
    res.sendFile(__dirname+ '/views/index.html')
})

io.on('connection', function(socket) {

    //add user
    socket.on('add_user', function(user) {
        user.id = socket.id
        list_users.push(user)
        app.set(user.id, socket)
        socket.broadcast.emit('update_user', list_users)
        socket.emit('update_user', list_users)
    })

    //send_msg
    socket.on('send_msg', function(data) {
        socket.emit('update_msg', data)
        app.get(data.to).emit('update_msg', data)
    })

})

