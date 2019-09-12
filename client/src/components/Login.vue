<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent = "login">
                    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="name" v-model = "name" class="form-control" name="name" placeholder="Enter Name">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" v-model = "password" class="form-control" name="password" placeholder="Enter Password">
                    </div>

                    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
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
            name: '',
            password: ''
        }
    },

    methods: {
        login () {
            axios.post('./users/login',
            {
                name: this.name,
                password: this.password
            }).then(res => {
                localStorage.setItem('usertoken', res.data)
                this.name = ''
                this.password = ''
                router.push({ name: 'Profile' })
                this.emitMethod()
            }).catch(err => {
                alert(err.response.data.error)
            })
        },
        emitMethod () {
            EventBus.$emit('logged-in', 'loggedin')
        }
    }
}
</script>
