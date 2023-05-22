<template>
  <b-container>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col">Email</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(adminDetails, index) in admins" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ adminDetails.name }}</td>
          <td>{{ adminDetails.role }}</td>
          <td>{{ adminDetails.email }}</td>
          <td>
            <button @click="openConfirmDialog(adminDetails.id)">Remove</button>
            <button @click="disableAdmin(adminDetails.id)">Disable</button>
            <button @click="verifyAdmin(adminDetails.id)">Verify</button>
          </td>
        </tr>
      </tbody>
    </table>

    <b-modal
      v-model="showConfirmDialog"
      @ok="confirmRemoveAdmin"
      @cancel="cancelRemoveAdmin"
      title="Confirm"
    >
      Are you sure you want to remove this admin?
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: "AdminList",
  data() {
    return {
      admins: [],
      root: process.env.VUE_APP_ROOT_API,
      showConfirmDialog: false,
      adminIdToRemove: null,
    };
  },
  mounted() {
    this.fetchAdminsList();
  },
  methods: {
    fetchAdminsList() {
      this.$axios
        .get(`${this.root}/admin`)
        .then((response) => {
          if (response.data.status) {
            this.admins = response.data.data.admins;
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
    removeAdmin(id) {
      this.$axios
        .delete(`${this.root}/admin/${id}`)
        .then((response) => {
          if (response.data.status) {
            this.$bvToast.toast("removed admin successfully", {
              title: "Success",
              variant: "success",
              solid: true,
            });
            this.fetchAdminsList();
          } else {
            this.$bvToast.toast("Failed Removing Admin", {
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
    disableAdmin(id) {
      // disable admin api here
    },
    verifyAdmin(id) {
      // verify admin  api here
    },
    openConfirmDialog(id) {
      this.adminIdToRemove = id;
      this.showConfirmDialog = true;
    },
    confirmRemoveAdmin() {
      if (this.adminIdToRemove) {
        this.removeAdmin(this.adminIdToRemove);
        this.adminIdToRemove = null;
      }
      this.showConfirmDialog = false;
    },
    cancelRemoveAdmin() {
      this.adminIdToRemove = null;
      this.showConfirmDialog = false;
    },
  },
};
</script>

<style></style>
