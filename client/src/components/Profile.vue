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
                <h1 class="text-center">Make your profile</h1>
                <h3 class="text-center">Let others know you better</h3>
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
                            <label class="text-center" for="avatar">Add your avatar</label>
                            <div class="text-center">
                                <img class="avatar" v-if="url" :src="url">
                                <img class="avatar" v-else-if="avatar==avatarFol" src="http://www.gravatar.com/avatar/?d=mm" />
                                <img class="avatar" v-else :src="avatar">
                                <input type="file" id="avatar" ref="avatar" name="avatar" class="form-control" @change="handleFileUpload" accept="image/*">
                            </div>

                        </div>
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input type="text" v-model = "name" class="form-control" name="name" placeholder="Enter Name">
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="text" v-model = "password" class="form-control" name="password" placeholder="Enter Password">
                        </div>
                        <div class="form-group">
                            <label for="age">How Old are you?</label>
                            <select class="form-control" v-model = "age" name="age" id="age">
                                <option v-for="ageOp in 20 " :value="ageOp" v-bind:key = "ageOp">{{ageOp}}</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="age">What is your gender?</label>
                            <select class="form-control" v-model="sex" name="sex" id="sex">
                                <option value="male">male</option>
                                <option value="female">famale</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="location">Where do you live?</label>
                            <input type="text" v-model = "location" class="form-control" name="location" placeholder="Your country, state or city">
                        </div>
                        <div class="form-group">
                            <label for="bio">Tell us more about yourself</label>
                            <textarea v-model = "bio" id="bio" class="form-control" name="bio" placeholder="Tell us more about yourself"></textarea>
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
        handleFileUpload (e) {
            this.avatar = this.$refs.avatar.files[0]
            const file = e.target.files[0]
            this.url = URL.createObjectURL(file)
        },
        Update () {
            let formData = new FormData()
            formData.append('name', this.name)
            formData.append('email', this.email)
            formData.append('age', this.age)
            formData.append('sex', this.sex)
            formData.append('location', this.location)
            formData.append('bio', this.bio)
            formData.append('avatar', this.avatar)
            formData.append('password', this.password)

            console.log(localStorage.usertoken)
            axios.put('./users/register',
                formData, {
                    headers: {
                        'auth-token': localStorage.usertoken,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            ).then(res => {
                localStorage.removeItem('usertoken')
                localStorage.setItem('usertoken', res.data)
                router.push({ name: 'Chatroom' })
            }).catch(err => {
                alert(err.response.data.error)
            })
        }
    }
}
</script>
