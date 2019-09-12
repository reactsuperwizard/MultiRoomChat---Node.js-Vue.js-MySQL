<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6 mt-5 mx-auto">
                <form v-on:submit.prevent = "register" method="post"  enctype="multipart/form-data">
                    <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                    <div class="form-group">
                        <label for="profile">Profile Image</label>
                        <input type="file" id="profile" ref="profile" class="form-control" v-on:change="handleFileUpload()"/>
                    </div>
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" v-model = "name" class="form-control" name="name" placeholder="Enter Name">
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input type="email" v-model = "email" class="form-control" name="email" placeholder="enter email">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" v-model = "password" class="form-control" name="password" placeholder="enter password">
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

export default {
    data () {
        return {
            name: '',
            email: '',
            password: '',
            profile: ''
        }
    },

    methods: {
        handleFileUpload () {
            this.profile = this.$refs.profile.files[0]
        },
        register () {
            let formData = new FormData()
            formData.append('name', this.name)
            formData.append('email', this.email)
            formData.append('password', this.password)
            formData.append('profile', this.profile)

            axios.post('./users/register',
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(res => {
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
</script>
