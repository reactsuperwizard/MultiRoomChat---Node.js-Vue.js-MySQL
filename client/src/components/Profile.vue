<template>
    <div class="container">
        <div class="jumbotron mt-5">
            <div class="col-sm-8 mx-auto">
                <h1 class="text-center">PROFILE</h1>
            </div>
            <table class="table col-md-6 mx-auto">
                <tbody>
                    <tr>
                        <td>Profile Image</td>
                        <td><img :src=avatar alt=""></td>
                    </tr>
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
        </div>
    </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
    data () {
        const token = localStorage.usertoken
        const decoded = jwtDecode(token)
        return {
            name: decoded.name,
            avatar: decoded.avatar,
            email: decoded.email
        }
    }
}
</script>
