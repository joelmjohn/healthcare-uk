<template>
    <div>
        <b-container>
            <b-card>
                <h2>Jobs</h2>
                <div class="form mb-3">
                    <b-form-input v-model="searchData" placeholder="search"></b-form-input>
                </div>
                <div class="form mb-3">
                    <b-button v-b-toggle.collapse-1 variant="outline-secondary" size="sm">Filter</b-button>
                    <b-collapse id="collapse-1" class="mt-2" v-model="filterOpen">
                        <b-card>
                            <b-form-group label-cols-lg="1" label-size="sm" label="Country" label-for="input-country">
                                <select v-model="selectedCountry" class="custom-select custom-select-sm"
                                    aria-label="Default select example">
                                    <option value="" disabled>Select</option>
                                    <option v-for="country in countrys" :value="country.id">{{ country.name }} ({{
                                        country.countryCode }})</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </b-form-group>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="form text-center">
                    <b-button variant="outline-primary" size="md">Search</b-button>
                </div>

            </b-card>
            <b-card>
                <table class="table table-bordered" v-if="!loading">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>JobName</th>
                            <th>Company Name</th>
                            <th>Company Description</th>
                            <th>Country</th>
                            <th>Industry</th>
                            <th>Vancancy</th>
                            <th>Status</th>
                            <th>Created By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </b-card>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "jobList",
    data() {
        return {
            searchData: "",
            filterOpen: true,
            countrys: [],
            selectedCountry: '',
            loading: false,
            root: process.env.VUE_APP_ROOT_API,
        }
    },
    methods: {
        fetchCountries() {
            this.loading = true;
            this.$axios
                .get(`${this.root}/country`)
                .then((response) => {
                    const responseData = response.data;
                    if (responseData.status) {
                        this.countrys = responseData.data.country;
                    } else {
                        this.$bvToast.toast("Couldn't fetch data, try again", {
                            title: "Error",
                            variant: "danger",
                            solid: true,
                        });
                    }
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                    this.$bvToast.toast("Error Occured!", {
                        title: "Error",
                        variant: "danger",
                        solid: true,
                    });
                });
        }
    },
    mounted() {
        this.fetchCountries();
    }
}
</script>

<style scoped></style>