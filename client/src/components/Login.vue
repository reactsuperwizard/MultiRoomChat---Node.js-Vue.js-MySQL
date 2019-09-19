<template>
    <div class="container">
        <FlashMessage></FlashMessage>
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent = "login">
                    <div class="jumbotron">
                        <h1 class="h3 mb-3 font-weight-normal">L o g i n</h1>
                        <div class="form-group mt-5">
                            <input type="name" v-model = "name" class="form-control" name="name" placeholder="Enter Name">
                        </div>
                        <div class="form-group mt-5">
                            <input type="password" v-model = "password" class="form-control" name="password" placeholder="Enter Password">
                        </div>
                        <div class="form-group">
                            <router-link class="nav-link text-left" to="/forgot_password">forgotten password?</router-link>
                            <router-link class="nav-link text-left" to="/register">not registered yet?</router-link>
                        </div>
                        <button class="btn btn-lg btn-success btn-block mt-5" type="submit">Log me in!</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import router from '../router'
import EventBus from './EventBus'

export default {
    data () {
        return {
            routeName: this.$route.params.name,
            name: '',
            password: ''
        }
    },
        mounted () {
            this.name = this.routeName
        },

    methods: {
        login () {
            axios.post('./users/login',
            {
                name: this.name,
                password: this.password
            }).then(res => {
                localStorage.setItem('usertoken', res.data)
                localStorage.setItem('auth', 'loggedin')
                this.flashMessage.success({
                    title: 'Successfully Login',
                    message: 'Please wait while redirecting to Profile page',
                    time: 2000,
                    blockClass: 'custom-block-class'
                })
                setTimeout(() => router.push({name: 'Profile'}), 2000)
                this.emitMethod()
            }).catch(err => {
                var response = err.response
                var statusText = response.statusText
                var errorMsg = response.data ? response.data : ''
                var msg = statusText + ((errorMsg !== '') ? (' / ' + errorMsg) : (''))
                this.flashMessage.error({
                    title: 'Login Failed',
                    message: msg,
                    time: 4000,
                    blockClass: 'custom-block-class'
                })
            })
        },
        emitMethod () {
            EventBus.$emit('logged-in', 'loggedin')
        }
    }
}
</script>
