<template>
  <b-container>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(adminDetails, index) in admins" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ adminDetails.name }}</td>
          <td>{{ adminDetails.role }}</td>
          <td>{{ adminDetails.userName }}</td>
          <td>{{ adminDetails.email }}</td>
        </tr>
      </tbody>
    </table>
  </b-container>
  </template>
  
  <script>
  export default {
    data() {
      return { admins: "", root: process.env.VUE_APP_ROOT_API };
    },
    name: "AdminList",
    mounted() {
      this.fetchAdminsList();
    },
    methods: {
      fetchAdminsList() {
        this.$axios
          .get(`${this.root}/admin`)
          .then((response) => {
            if (response.data.status) {
              this.admins = response.data.data;
            } else {
              this.$bvToast.toast("No Admins Found", {
                title: "Error",
                variant: "danger",
                solid: true,
              });
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
  
  <style></style>