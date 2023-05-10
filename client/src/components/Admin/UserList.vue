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
        <td>{{ new Date(userDetails.dob).toLocaleDateString() }}</td>
        <td>{{ userDetails.email }}</td>
        <td>{{ userDetails.designation }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return { users: "" };
  },
  name: "UserList",
  mounted() {
    this.usersList();
  },
  methods: {
    usersList() {
      axios
        .get("http://localhost:3000/v1/user")
        .then((response) => {
          this.users = response.data.data;
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

<style>
</style>