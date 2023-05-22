<template>
  <b-modal
    class="modal-header-waring"
    id="modal-center"
    v-model="updateModal"
    centered
    hide-footer
  >
    <div>
      <div class="form mb-3">
        <b-form-input
          v-model="updateCountryValue.name"
          placeholder="Enter the CountryName"
        ></b-form-input>
      </div>
      <div class="form mb-3">
        <b-form-input
          v-model="updateCountryValue.description"
          placeholder="Description"
        ></b-form-input>
      </div>
      <div class="form mb-3">
        <b-form-input
          v-model="updateCountryValue.countryCode"
          placeholder="Country Code"
        ></b-form-input>
      </div>
      <b-button variant="outline-primary" size="lg" @click="handleSave()"
        >Save</b-button
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
    updateId: { type: String, required: true },
    countryListing: { type: Function, required: true },
    updateModal: { type: Boolean, required: true },
    updateCountryValue: { type: Object, required: true },
  },
  methods: {
    handleSave() {
      this.updateCountryValue.name = this.updateCountryValue.name.toUpperCase();
      this.$axios

        .patch(`${this.root}/country/` + this.updateId, this.updateCountryValue)
        .then((response) => {
          if (response.data.status) {
            this.$emit("closeUpdateModal", $event.target.value);

            this.countryListing();

            this.$bvToast.toast("Country Details updated successfully", {
              title: "Success",
              variant: "success",
              solid: true,
            });
          } else {
            this.$bvToast.toast("Couldn't update country, try again", {
              title: "Invalid",
              variant: "danger",
              solid: true,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$bvToast.toast("Error", {
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