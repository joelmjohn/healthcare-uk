<template>
  <b-modal
    class="modal-header-waring"
    id="modal-center"
    v-model="show"
    centered
    hide-footer
  >
    <div class="d-block text-center">
      <h3>Are you sure want to Delete</h3>
    </div>
    <div class="form mb-3 text-center">
      <b-button type="button" class="btn btn-danger" @click="deleteCountry"
        >OK</b-button
      >
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return { root: process.env.VUE_APP_ROOT_API };
  },
  props: {
    show: { type: Boolean, required: true },
    id: { type: String, required: true },
    countryListing: { type: Function, required: true },
  },

  methods: {
    deleteCountry() {
      if (!this.id) {
        return false;
      } else {
        this.$axios

          .delete(`${this.root}/country/` + this.id)
          .then((response) => {
            if (response.data.status) {
              this.$emit("close");

              this.countryListing();
              this.$bvToast.toast("Country deleted successfully", {
                title: "Deleted",
                variant: "success",
                solid: true,
              });
            } else {
              this.$bvToast.toast("Couldn't delete country, try again", {
                title: "Invalid",
                variant: "danger",
                solid: true,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            this.$bvToast.toast("error", {
              title: "Error",
              variant: "danger",
              solid: true,
            });
          });
      }
    },
  },
};
</script>

<style>
</style>