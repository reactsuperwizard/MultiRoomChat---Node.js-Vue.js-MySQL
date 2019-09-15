<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent = "register">
                    <div class="jumbotron">
                        <p v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                            </ul>
                        </p>
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
                this.errors.push('Name required.')
            }
            if (!this.email) {
                this.errors.push('Email required.')
            }
            if (!this.password) {
                this.errors.push('Password required.')
            }

            if (!this.errors.length) {
                axios.post('./users/register',
                {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(res => {
                    this.name = ''
                    this.email = ''
                    this.password = ''
                    router.push({name: 'Login'})
                }).catch(err => {
                    alert(err.response.data.error)
                })
            }
        }
    }
}
</script>
