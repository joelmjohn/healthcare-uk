<template>
    <div>
        <b-alert show variant="primary">
            Welcome to sample admin page for Test API
        </b-alert>
        <b-container>
            <b-card>
                <b-container>
                    <h1><b>ADMIN LOGIN </b></h1>
                    <div class="form-floating mb-3">
                        <input v-model="username" type="email" class="form-control" id="floatingInput"
                            placeholder="name@example.com">
                        <label for="floatingInput">Username/ Email</label>
                    </div>
                    <div class="form-floating mb-4">
                        <input v-model="password" type="password" class="form-control" id="floatingPassword"
                            placeholder="Password">
                        <label for="floatingPassword">Password</label>
                    </div>
                    <b-button variant="outline-primary" size="lg" @click="login">Login</b-button>
                </b-container>
            </b-card>
        </b-container>
    </div>
</template>

<script>
export default {
    name: 'admin',
    data() {
        return {
            root: process.env.VUE_APP_ROOT_API,
            username: '',
            password: ''
        }
    },
    methods: {
        login() {
            if (!this.username || !this.password) {
                alert(false);
            }
            const data = {};
            data.username = this.username;
            data.password = this.password;
        }
    }

}


</script>

<style scoped></style>