<template>
    <div>
        <b-card>
            <b-container>
                <h1>
                    <b>ADD COUNTRY</b>
                </h1>
                <div class="form mb-3">

                    <b-form-input v-model="country.name" placeholder="Enter the CountryName" required></b-form-input>
                </div>
                <div class="form mb-3">
                    <b-form-input v-model="country.description" placeholder="Description" required></b-form-input>
                </div>
                <div class="form mb-3">
                    <b-form-input v-model="country.countryCode" placeholder="Country Code" required></b-form-input>
                </div>
                <b-button variant="outline-primary" size="lg" @click="handleAdd">Add</b-button>
            </b-container>
        </b-card>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">CountryName</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(countryDetails, index) in addedCountries" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ countryDetails.name }}</td>
                    <td>
                        <button type="button" class="btn btn-success" @click="handleUpdate(countryDetails)">
                            Update
                        </button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger" @click="handleDelete(countryDetails.id)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <b-modal class="modal-header-waring" id="modal-center" v-model="modalShowView" centered hide-footer>
            <div>
                <div class="form mb-3">
                    <b-form-input v-model="updateCountry.name" placeholder="Enter the CountryName"></b-form-input>
                </div>
                <div class="form mb-3">
                    <b-form-input v-model="updateCountry.description" placeholder="Description"></b-form-input>
                </div>
                <div class="form mb-3">
                    <b-form-input v-model="updateCountry.countryCode" placeholder="Country Code"></b-form-input>
                </div>
                <b-button variant="outline-primary" size="lg" @click="handleSave()">Save</b-button>
            </div>
        </b-modal>
        <b-modal class="modal-header-waring" id="modal-center" v-model="deleteModalShowView" centered hide-footer>
            <div class="d-block text-center">
                <h3>Are you sure want to Delete</h3>
            </div>
            <div class="form mb-3 text-center">
                <b-button type="button" class="btn btn-danger" @click="deleteCountry">OK</b-button>
            </div>

        </b-modal>
    </div>
</template>
<script>
export default {
    name: "country",
    data() {
        return {
            modalShowView: false,
            deleteModalShowView: false,
            deleteId: "",
            updateCountry: {},
            selectedId: "",
            country: { name: "", description: "", countryCode: "" },
            addedCountries: [],
            countryValues: {},
            root: process.env.VUE_APP_ROOT_API,
        };
    },
    mounted() {
        this.countryList()

    },
    methods: {
        countryList() {
            this.$axios
                .get(`${this.root}/country`)
                .then((response) => {
                    this.addedCountries = response.data.data
                })
                .catch((err) => {
                    console.log(err);
                    this.$bvToast.toast("Error Occured!", {
                        title: "Error",
                        variant: "danger",
                        solid: true,
                    });
                })
        },
        handleUpdate(data) {

            this.selectedId = data.id;
            this.updateCountry = {
                name: data.name,
                description: data.description,
                countryCode: data.countryCode,
            };

            this.modalShowView = true;
        },
        handleSave() {
            this.modalShowView = false;
            this.updateCountry.name = this.updateCountry.name.toUpperCase()
            this.$axios

                .patch(`${this.root}/country/` + this.selectedId, this.updateCountry)
                .then((response) => {
                    if (response.data.status) {
                        this.countryList()
                        this.$bvToast.toast("Country Details updated successfully", {
                            title: "Success",
                            variant: "success",
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

        handleAdd() {

            this.country.name = this.country.name.toUpperCase();

            this.$axios
                .post(`${this.root}/country/create`, this.country)

                .then((response) => {
                    if (response.data.status) {
                        this.countryList()
                        this.country.name = ""
                        this.country.description = ""
                        this.country.countryCode = ""
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

        handleDelete(id) {
            this.deleteId = id
            this.deleteModalShowView = true
        },
        deleteCountry() {
            if (!this.deleteId) {
                this.$bvToast.toast("Error Occured", {
                    title: "Error ",
                    variant: "danger",
                    solid: true,
                });
                return false;
            }
            else {
                this.deleteModalShowView = false
                this.$axios

                    .delete(`${this.root}/country/` + this.deleteId)
                    .then((response) => {
                        if (response.data.status) {
                            this.countryList()
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

