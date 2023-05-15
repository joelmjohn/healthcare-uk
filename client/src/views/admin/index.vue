<template>
  <div>
    <b-alert show variant="primary">
      Welcome to sample admin page for testing Vue API
    </b-alert>
    <b-container>
      <b-card>
        <b-container>
          <h1>
            <b>ADMIN LOGIN </b>
          </h1>
          <div class="form mb-3">
            <b-form-input
              v-model="username"
              :state="userState"
              placeholder="username/ email"
            ></b-form-input>
          </div>
          <div class="form mb-4">
            <b-form-input
              v-model="password"
              :state="passwordState"
              type="password"
              placeholder="Password"
            ></b-form-input>
          </div>
          <b-button variant="outline-primary" size="lg" @click="login"
            >Login</b-button
          >
        </b-container>
      </b-card>
    </b-container>
    <router-link to="/admin/userList">User</router-link>
    <br/>
    <router-link to="/admin/adminList">List Admins</router-link>
    <br/>
    <router-link to="/admin/registerUser">Register Admin</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "admin",
  watch: {
    username() {
      if (this.username.length > 2) {
        return (this.userState = true);
      }
      this.userState = false;
    },
    password() {
      if (this.password.length > 2) {
        return (this.passwordState = true);
      }
      this.passwordState = false;
    },
  },
  created() {
    //methods/fetch API request before DOM mounted goes here
  },
  mounted() {
    //methods/fetch API request after DOM mounted goes here
  },
  data() {
    return {
      username: "",
      userState: false,
      password: "",
      passwordState: false,
      root: process.env.VUE_APP_ROOT_API,
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        this.$bvToast.toast("All fields are required", {
          title: `Invalid Input`,
          variant: "warning",
          solid: true,
        });
        return false;
      }
      const data = {};
      data.userName = this.username;
      data.password = this.password;
      this.$axios
        .post(`${this.root}/admin/login`, data)
        .then((response) => {
          if (response.data.status) {
            this.$bvToast.toast("Welcome Admin", {
              title: "Success",
              variant: "success",
              solid: true,
            });
          } else {
            this.$bvToast.toast("Invalid User", {
              title: "Invalid",
              variant: "danger",
              solid: true,
            });
            this.userState = false;
            this.passwordState = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.$bvToast.toast("Error Occured!", {
            title: "Error",
            variant: "danger",
            solid: true,
          });
        });
    },
  },
};
</script>

<style >
.toast:not(.show) {
  display: block;
}
</style>