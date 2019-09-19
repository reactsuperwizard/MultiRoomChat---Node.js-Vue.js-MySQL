<template>
    <div class="container">
        <FlashMessage></FlashMessage>
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent = "register">
                    <div class="jumbotron">
                        <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                        <h6 class="">Please register in order to use the chatroom<br>Make sure that you use a valid email address.</h6>
                        <div class="form-group mt-5">
                            <input type="text" v-model = "name" class="form-control" name="name" placeholder="Enter Name">
                        </div>
                        <div class="form-group mt-5">
                            <input type="email" v-model = "email" class="form-control" name="email" placeholder="enter email">
                        </div>
                        <div class="form-group mt-5">
                            <input type="password" v-model = "password" class="form-control" name="password" placeholder="enter password">
                        </div>

                        <button class="btn btn-lg btn-primary btn-block mt-5" type="submit">Sign me up!</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import router from '../router'
export default {
    data () {
        return {
            errors: [],
            name: '',
            email: '',
            password: ''
        }
    },

    methods: {
        register (e) {
            this.errors = []
            if (!this.name) {
                this.errors.push('Name required')
            }
            if (!this.email) {
                this.errors.push('Email required')
            }
            if (!this.password) {
                this.errors.push('Password required')
            }
            if (!this.errors.length) {
                axios.post('./users/register',
                {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(res => {
                    this.flashMessage.success({
                        title: 'Successfully Registered',
                        message: 'Please wait while redirecting to login page',
                        time: 2000,
                        blockClass: 'custom-block-class'
                    })
                    // console.log(res.data.name)
                    // setTimeout(() => router.push({name: 'Login', params: {name: res.data.name}}), 2000)
                    setTimeout(() => router.push({name: 'Login'}), 2000)
                }).catch(err => {
                    var response = err.response
                    var statusText = response.statusText
                    var errorMsg = response.data ? response.data : ''
                    var msg = statusText + ((errorMsg !== '') ? (' / ' + errorMsg) : (''))
                    this.flashMessage.error({
                        title: 'Register Failed',
                        message: msg,
                        time: 4000,
                        blockClass: 'custom-block-class'
                    })
                })
            } else {
                this.flashMessage.error({
                    title: 'Not valid data',
                    message: Array.join(this.errors),
                    time: 4000,
                    blockClass: 'custom-block-class'
                })
            }
        }
    }
}
</script>
