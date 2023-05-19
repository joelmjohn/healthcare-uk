<template>
  <div>
    <b-card>
      <b-container>
        <h1>
          <b>ADD COUNTRY</b>
        </h1>
        <div class="form mb-3">
          <b-form-input
            v-model="country.name"
            placeholder="Enter the CountryName"
            required
          ></b-form-input>
        </div>
        <div class="form mb-3">
          <b-form-input
            v-model="country.description"
            placeholder="Description"
            required
          ></b-form-input>
        </div>
        <div class="form mb-3">
          <b-form-input
            v-model="country.countryCode"
            placeholder="Country Code"
            required
          ></b-form-input>
        </div>
        <b-button variant="outline-primary" size="lg" @click="handleAdd"
          >Add</b-button
        >
      </b-container>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      root: process.env.VUE_APP_ROOT_API,
      country: { name: "", description: "", countryCode: "" },
    };
  },
  props: { countryListing: { type: Function, required: true } },
  methods: {
    handleAdd() {
      this.country.name = this.country.name.toUpperCase();

      this.$axios
        .post(`${this.root}/country/create`, this.country)

        .then((response) => {
          if (response.data.status) {
            this.countryListing();
            this.country.name = "";
            this.country.description = "";
            this.country.countryCode = "";
          }
        })
        .catch((err) => {
          console.log(err);
          this.$bvToast.toast("Error Occured", {
            title: "Error ",
            variant: "danger",
            solid: true,
          });
        });
    },
  },
};
</script>

<style></style>