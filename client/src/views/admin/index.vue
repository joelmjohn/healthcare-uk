<template>
  <div>
    <b-alert show variant="primary" class="text-center">
      Welcome to sample admin page for testing Vue API
    </b-alert>
    <b-container>
      <b-card>
        <b-container class="text-center">
          <h1>
            <b>ADMIN LOGIN </b>
          </h1>
          <div class="form mb-3">
            <b-form-input
              v-model="email"
              :state="userState"
              placeholder="email"
              type="email"
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
          <b-button
            variant="outline-primary"
            size="lg"
            @click="login"
            :disabled="loading"
          >
            <b-spinner v-if="loading" small></b-spinner>
            login </b-button
          >&nbsp;
          <b-button
            variant="outline-secondary"
            size="lg"
            @click="logout"
            :disabled="loading"
          >
            logout (test)
          </b-button>
        </b-container>
      </b-card>
    </b-container>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "admin",
  watch: {
    email() {
      if (
        this.email.length > 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
      ) {
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
  data() {
    return {
      loading: false,
      email: "",
      userState: false,
      password: "",
      passwordState: false,
      root: process.env.VUE_APP_ROOT_API,
    };
  },
  methods: {
    login() {
      if (!this.email || !this.password) {
        this.$bvToast.toast("All fields are required", {
          title: `Invalid Input`,
          variant: "warning",
          solid: true,
        });
        return false;
      }
      this.loading = true;
      const data = {};
      data.email = this.email;
      data.password = this.password;
      this.$axios
        .post(`${this.root}/admin/login`, data)
        .then((response) => {
          const responseData = response.data;
          if (responseData.status) {
            localStorage.setItem("adminId", responseData.data.id);
            localStorage.setItem("adminRole", responseData.data.role);
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
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.$bvToast.toast("Error Occured!", {
            title: "Error",
            variant: "danger",
            solid: true,
          });
          this.loading = false;
        });
    },
    logout() {
      localStorage.removeItem("adminId");
      this.$bvToast.toast("Logged Out", {
        title: "Success",
        variant: "success",
        solid: true,
      });
    },
  },
};
</script>

<style ></style>