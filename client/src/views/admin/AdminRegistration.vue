<template>
    <div>
      <b-container>
        <b-card>
          <b-container>
            <h1>
              <b>ADMIN REGISTRATION </b>
            </h1>
            <div class="form mb-3">
              <b-form-input
                v-model="name"
                :state="userState"
                placeholder="name"
              ></b-form-input>
            </div>
            <div class="form mb-3">
                <b-form-input
                  v-model="username"
                  :state="userState"
                  placeholder="username"
                ></b-form-input>
            </div>
            <div class="form mb-3">
                <b-form-input
                  v-model="email"
                  :state="userState"
                  placeholder="email"
                ></b-form-input>
            </div>
            <div class="form mb-3">
              <b-form-input
                v-model="password"
                :state="passwordState"
                type="password"
                placeholder="Password"
              ></b-form-input>
            </div>
            <b-button variant="outline-primary" size="lg" @click="registerAdmin"
              >Register</b-button
            >
          </b-container>
        </b-card>
      </b-container>
    </div>
  </template>
  
  <script>
  export default {
    name: "AdminRegistration",
    watch: {
      name() {
        if (this.name.length > 2) {
          return (this.userState = true);
        }
        this.userState = false;
      },
      username() {
        if (this.username.length > 2) {
          return (this.userState = true);
        }
        this.userState = false;
      },
      email() {
        if (this.email.length > 2) {
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
        name: "",
        email: "",
        userState: false,
        password: "",
        passwordState: false,
        root: process.env.VUE_APP_ROOT_API,
      };
    },
    methods: {
      registerAdmin() {
        if (!this.username || !this.password || !this.email || !this.name) {
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
        data.role = "ADMIN";
        data.email = this.email;
        data.name = this.name;
        this.$axios
          .post(`${this.root}/admin/create`, data)
          .then((response) => {
            if (response.data.status) {
              this.$bvToast.toast("Registration Successful", {
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