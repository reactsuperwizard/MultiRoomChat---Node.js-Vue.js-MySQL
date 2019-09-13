<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark round">

        <div class="justify-content-md-center" id="navbar1">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li v-if="auth=='' && (token==null || token==undefined)" class="nav-item">
                <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li v-if="auth=='' && (token==null || token==undefined)" class="nav-item">
                <router-link class="nav-link" to="/register">Register</router-link>
                </li>
                <li v-if="auth=='loggedin' || token!=null || token!=undefined" class="nav-item">
                <router-link class="nav-link" to="/profile">Profile</router-link>
                </li>
                <li v-if="auth=='loggedin' || token!=null || token!=undefined" class="nav-item">
                <router-link class="nav-link" to="/chatroom">Chatroom</router-link>
                </li>
                <li v-if="auth=='loggedin' || token!=null || token!=undefined" class="nav-item">
                <a class="nav-link" href="" v-on:click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import EventBus from './EventBus'

EventBus.$on('logged-in', test => {
    console.log(test)
})
export default {
    data () {
        return {
            auth: '',
            user: '',
            token: localStorage.usertoken
        }
    },

    methods: {
        logout () {
            localStorage.removeItem('usertoken')
        }
    },

    mounted () {
        EventBus.$on('logged-in', status => {
            this.auth = status
        })
    }
}
</script>
