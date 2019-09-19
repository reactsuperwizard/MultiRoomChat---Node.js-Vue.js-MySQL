<template>
    <div class="container">
        <FlashMessage></FlashMessage>
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent = "passwordreset" method="post" enctype="multipart/form-data">
                    <div class="jumbotron">
                        <h1 class="h3 mb-3 font-weight-normal">Password reset</h1>
                        <h6 class="">Please register in order to use the chatroom<br>Make sure that you use a valid email address.</h6>
                        <div class="form-group mt-5">
                            <input type="email" v-model = "email" class="form-control" name="email" placeholder="enter email">
                        </div>
                        <div class="form-group mt-5">
                            <input type="password" v-model = "password" class="form-control" name="password" placeholder="enter password">
                        </div>

                        <button class="btn btn-lg btn-primary btn-block mt-5" type="submit">Reset password</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import router from '../router'
// import jwtDecode from 'jwt-decode'

export default {
    data () {
        return {
            name: '',
            email: '',
            password: ''
        }
    },

    methods: {
        passwordreset () {
            let formData = new FormData()
            formData.append('email', this.email)
            formData.append('password', this.password)
            console.log(formData)
            const token = this.$route.query.token
            axios.post('./users/resetpassword',
                {
                    email: this.email,
                    password: this.password
                }
                , {
                    headers: {
                        'auth-token': token,
                        'Content-Type': 'application/json'
                    }
                }
            ).then(res => {
                this.name = ''
                this.email = ''
                this.password = ''
                router.push({name: 'Login'})
            }).catch(err => {
                var response = err.response
                var statusText = response.statusText
                var errorMsg = response.data ? response.data : ''
                var msg = statusText + ((errorMsg !== '') ? (' / ' + errorMsg) : (''))
                this.flashMessage.error({
                    title: 'Password reset failed',
                    message: msg,
                    time: 4000,
                    blockClass: 'custom-block-class'
                })
            })
        }
    }
}
</script>
