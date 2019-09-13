<style>
.avatar {
  vertical-align: middle;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}
</style>
<template>
    <div class="container">
        <div class="jumbotron mt-5">
            <div class="col-sm-8 mx-auto">
                <h1 class="text-center">PROFILE</h1>
            </div>
            <table class="table col-md-6 mx-auto">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{{name}}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{{email}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="row">
                <div class="col-md-6 mt-5 mx-auto">
                    <form v-on:submit.prevent = "Update" method="post"  enctype="multipart/form-data">
                        <div class="form-group">
                            <img class="avatar" src="http://www.gravatar.com/avatar/?d=mm" />
                            <img class="avatar" src="static\public\uploads\images (1).jpg" />
                            <input type="file" id="avatar" ref="avatar" class="form-control" v-on:change="handleFileUpload()"/>
                        </div>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" v-model = "name" class="form-control" name="name" placeholder="Enter Name">
                        </div>

                        <button class="btn btn-lg btn-primary btn-block" type="submit">Update</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import router from '../router'

export default {
    data () {
        const token = localStorage.usertoken
        const decoded = jwtDecode(token)
        return {
            name: decoded.name,
            avatar: decoded.avatar,
            password: '',
            email: decoded.email
        }
    },
    methods: {
        handleFileUpload () {
            this.avatar = this.$refs.avatar.files[0]
        },
        Update () {
            let formData = new FormData()
            formData.append('name', this.name)
            formData.append('email', this.email)
            formData.append('password', this.password)
            formData.append('avatar', this.avatar)

            axios.put('./users/register',
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(res => {
                localStorage.removeItem('usertoken')
                localStorage.setItem('usertoken', res.data)
                router.push({ name: 'Login' })
            }).catch(err => {
                alert(err.response.data.error)
            })
        }
    }
}
</script>
