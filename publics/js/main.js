/**
 * Created by Dinh. Vu Tien on 9/8/2016.
 */
var socket = io.connect();

$(document).ready(function() {
    var btn_send = $('#send_msg')
    var msg = $('#msg')
    var list_onlines = $('#list_users')
    var list_chat = $('#list_chat')

    //send to
    var to = null;
    var from = null;


    //select user
    $(document).on('click', '.list-group-item' , function() {
        to = $(this).attr('id')
        return false;
    });

    //send msg
    btn_send.click(function() {
        data = {
            from: from,
            to: to,
            msg: msg.val()
        }
        if(to==null)
            alert('chưa chọn người nhận')
        else
            socket.emit('send_msg', data)
        return false;
    })

    //connect
    socket.on('connect', function() {
        from = prompt("username ?")
        data = {'id':Math.random(), username: from}
        socket.emit('add_user', data)
    })

    //update user
    socket.on('update_user', function(list_users) {
        console.log(list_users)
        list_onlines.html("");
        list_users.forEach(function(user) {
            list_onlines.append('<a href="" id="'+user.id+'" class="list-group-item">'+user.username+'</a>')
        })
    })

    //update msg
    socket.on('update_msg', function(data) {
        if(data.from == from)
            list_chat.append('<li>'+data.msg+' <span class="pull-right">'+data.from+'</span></li>')
        else
            list_chat.append('<li>'+data.from+': '+data.msg+'</li>')
    })

    btn_send.click(function() {

    })
})