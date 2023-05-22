<template>
    <div>
        <createCountry :countryListing="countryList" />
        <updateCountry @closeUpdateModal="closeUpdateModal()" :updateModal="modalShowView" :countryListing="countryList"
            :updateId="selectedId" :updateCountryValue="updateCountry" />

        <deleteCountry @closeDeleteModal="deleteModalShowView = false" :countryListing="countryList" :id="deleteId"
            :show="deleteModalShowView" />
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">CountryName</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(countryDetails, index) in addedCountries.country" :key="index">
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
    </div>
</template>
<script>
import createCountry from "../Country/createCountry.vue";
import updateCountry from "../Country/updateCountry.vue";
import deleteCountry from "../Country/deleteCountry.vue";
export default {
    name: "country",
    components: {
        createCountry,
        updateCountry,
        deleteCountry,
    },
    data() {
        return {
            root: process.env.VUE_APP_ROOT_API,
            addedCountries: [],
            deleteId: "",
            deleteModalShowView: false,
            updateCountry: {},
            selectedId: "",
            modalShowView: false,
        };
    },
    mounted() {
        this.countryList();
    },
    methods: {
        handleUpdate(data) {
            this.selectedId = data.id;
            this.updateCountry = {
                name: data.name,
                description: data.description,
                countryCode: data.countryCode,
            };

            this.modalShowView = true;
        },
        countryList() {
            this.$axios
                .get(`${this.root}/country`)
                .then((response) => {
                    this.addedCountries = response.data.data;
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
        handleDelete(id) {
            this.deleteId = id;
            this.deleteModalShowView = true;
        },
        closeUpdateModal() {

            this.modalShowView = false;
        }
    },
};
</script>

