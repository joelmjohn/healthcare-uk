<template>
    <b-modal title="Update Country" id="modal-center" v-model="updateModal" centered @close="closeUpdateModal"
        @cancel="cancelUpdateModal" @ok="handleSave" :no-close-on-backdrop="true">
        <div>
            <div class="form mb-3">
                <b-form-input v-model="updateCountryValue.name" placeholder="Enter the CountryName"></b-form-input>
            </div>
            <div class="form mb-3">
                <b-form-input v-model="updateCountryValue.description" placeholder="Description"></b-form-input>
            </div>
            <div class="form mb-3">
                <b-form-input v-model="updateCountryValue.countryCode" placeholder="Country Code"></b-form-input>
            </div>
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
        handleSave(evt) {
            evt.preventDefault();

            if (
                !this.updateCountryValue.name ||
                !this.updateCountryValue.description ||
                !this.updateCountryValue.countryCode
            ) {
                this.$bvToast.toast("Please fill all the details", {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                });

            }
            else {

                this.updateCountryValue.name = this.updateCountryValue.name.toUpperCase();
                this.$axios

                    .patch(`${this.root}/country/` + this.updateId, this.updateCountryValue)
                    .then((response) => {
                        if (response.data.status) {
                            this.countryListing();
                            this.$bvToast.toast("Country Details updated successfully", {
                                title: "Success",
                                variant: "success",
                                solid: true,
                            });
                            this.$emit("closeUpdateModal");

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
            }
        },
        closeUpdateModal(evt) {
            evt.preventDefault(),
                this.$emit('closeUpdateModal');
        },
        cancelUpdateModal(evt) {
            evt.preventDefault();
            this.$emit('closeUpdateModal');
        },

    },
};
</script>

<style></style>