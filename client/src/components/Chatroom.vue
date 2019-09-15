<template>
    <div class="container">
        <div class="jumbotron mt-5">
            <div class="col-sm-8 mx-auto">
                <h1 class="text-center">Welcome to Chatroom</h1>
                <div id="change_username">
                    <input id="username" type="text" />
                    <button id="send_username" type="button">Change username</button>
                </div>
                <section id="chatroom">
                    <section id="feedback"></section>
                </section>
                <section id="input_zone">
                    <input id="message" class="vertical-align" type="text" />
                    <button id="send_message" class="vertical-align" type="button">Send</button>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
// import axios from 'axios'
// import router from '../router'

export default {
    data () {
        const token = localStorage.usertoken
        const decoded = jwtDecode(token)
        const avatarFol = 'public\\avatar\\'
        return {
            name: decoded.name,
            age: decoded.age,
            sex: decoded.sex,
            location: decoded.location,
            bio: decoded.bio,
            avatarFol: avatarFol,
            avatar: avatarFol + decoded.avatar,
            password: '',
            url: null,
            email: decoded.email
        }
    },
    methods: {
    //     var socket = io.connect('http://localhost:3000')

    //     //buttons and inputs
    //     var message = $("#message")
    //     var username = $("#username")
    //     var send_message = $("#send_message")
    //     var send_username = $("#send_username")
    //     var chatroom = $("#chatroom")
    //     var feedback = $("#feedback")

    //     //Emit message
    //     send_message.click(function(){
    //         socket.emit('new_message', {message : message.val()})
    //     })

    //     //Listen on new_message
    //     socket.on("new_message", (data) => {
    //         feedback.html('');
    //         message.val('');
    //         chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    //     })

    //     //Emit a username
    //     send_username.click(function(){
    //         socket.emit('change_username', {username : username.val()})
    //     })

    //     //Emit typing
    //     message.bind("keypress", () => {
    //         socket.emit('typing')
    //     })

    //     //Listen on typing
    //     socket.on('typing', (data) => {
    //         feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    //     })
    }
}
</script>
