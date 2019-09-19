<template>
    <div class="container">
        <FlashMessage></FlashMessage>
        <div class="jumbotron mt-5">
            <div class="col-sm-8 mx-auto">
                <form v-on:submit.prevent = "sendemail">
                    <h1 class="text-center">Forgot password? <br></h1>
                    <h3 class="text-center">Input your email to set password <br></h3>
                    <div class="form-group mt-5">
                        <input type="email" v-model = "email" class="form-control" name="email" placeholder="Enter email">
                    </div>
                    <button class="btn btn-lg btn-success btn-block mt-5" type="submit">Send Email</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// import jwtDecode from 'jwt-decode'
import axios from 'axios'
// import router from '../router'

export default {
    data () {
        // const token = localStorage.usertoken
        // const decoded = jwtDecode(token)
        return {
            email: ''
        }
    },
    methods: {
        sendemail () {
            this.flashMessage.info({
                title: 'Email sending',
                message: this.email,
                time: 4000,
                blockClass: 'custom-block-class'
            })
            axios.post('./users/forgotpassword',
            {
                email: this.email
            }).then(res => {
                this.flashMessage.success({
                    title: 'Congratulations',
                    message: res.data,
                    time: 2000,
                    blockClass: 'custom-block-class'
                })
            }).catch(err => {
                var response = err.response
                var statusText = response.statusText
                var errorMsg = response.data ? response.data : ''
                // errorMsg = errorMsg.join()
                // var str = JSON.stringify(errorMsg, null, 2)
                console.log(errorMsg)
                // console.log(str)
                if (Array.isArray(errorMsg)) {
                    errorMsg = errorMsg.join()
                    // console.log(errorMsg)
                }

                var msg = statusText + ((errorMsg !== '') ? (' / ' + errorMsg) : (''))
                this.flashMessage.error({
                    title: 'Email sending Failed',
                    message: msg,
                    time: 4000,
                    blockClass: 'custom-block-class'
                })
            })
        }
    }
}
</script>
