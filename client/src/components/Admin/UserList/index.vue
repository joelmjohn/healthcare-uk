<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Firstname</th>
        <th scope="col">Lastname</th>
        <th scope="col">Gender</th>
        <th scope="col">Country</th>
        <th scope="col">DOB</th>
        <th scope="col">Email</th>
        <th scope="col">Designation</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(userDetails, index) in users" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ userDetails.firstName }}</td>
        <td>{{ userDetails.lastName }}</td>
        <td>{{ userDetails.gender }}</td>
        <td>{{ userDetails.country }}</td>
        <td>{{ user_dob(userDetails.dob) }}</td>
        <td>{{ userDetails.email }}</td>
        <td>{{ userDetails.designation }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return { users: "", root: process.env.VUE_APP_ROOT_API };
  },
  name: "UserList",
  mounted() {
    this.usersList();
  },
  methods: {
    user_dob(userDOB) {
      return new Date(userDOB).toLocaleDateString();
    },
    usersList() {
      this.$axios
        .get(`${this.root}/user`)
        .then((response) => {
          if (response.data.status) {
            this.users = response.data.data;
          } else {
            this.$bvToast.toast("Users Not Found", {
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