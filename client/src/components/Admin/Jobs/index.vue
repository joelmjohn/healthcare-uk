<template>
    <div>
        <b-container>
            <b-card> <b-button @click="createJob">Create Job</b-button></b-card></b-container>
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
                                </select>
                            </b-form-group>
                        </b-card>
                    </b-collapse>
                </div>
                <div class="form text-center">
                    <b-button variant="outline-primary" size="md" @click="fetchJobs" :disabled="loading">Search</b-button>
                </div>

            </b-card>
        </b-container>

        <b-card v-if="jobList.length">
            <b-skeleton-wrapper :loading="loading">
                <template #loading>
                    <b-skeleton-table :rows="5" :columns="4" :table-props="{ bordered: true, striped: true }">
                    </b-skeleton-table>
                </template>
                <table class="table table-bordered" v-if="!loading">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>JobName</th>
                            <th>Job Description</th>
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
                    <tbody v-for="(data, idx) in jobList" :key="idx">
                        <tr>
                            <td>{{ idx + 1 }}</td>
                            <td>{{ data.jobName }}</td>
                            <td>{{ handleDescription(data.jobDescription) }}</td>
                            <td>{{ data.companyName }}</td>
                            <td>{{ data.companyDescription }}</td>
                            <td>{{ data.countryDetails[0].name }}</td>
                            <td>{{ data.industryType }}</td>
                            <td>{{ data.vacancy }}</td>
                            <td :class="data.status == 'ACTIVE' ? 'table-success' : 'table-danger'">{{ data.status }}
                            </td>
                            <td>{{ data.adminDetails[0].name }}</td>
                            <td>
                                <b-button variant="outline-primary" size="sm" @click="handleEdit()">
                                    <b-icon icon="pencil"></b-icon>
                                    Edit
                                </b-button>
                                <b-button variant="outline-danger" size="sm" @click="handleDelete(data.id)">
                                    <b-icon icon="trash"></b-icon>
                                    Delete
                                </b-button>
                            </td>

                        </tr>
                    </tbody>
                </table>
            </b-skeleton-wrapper>
        </b-card>
        <jobComponent :countrys="countrys" @displayJobs="jobDetail" :createJobModal="createJobModal"
            @closeCreateModal="createJobModal = false" />
    </div>
</template>

<script>
import { AlertPlugin } from 'bootstrap-vue';
import jobComponent from './jobComponent.vue';
export default {
    components: { jobComponent },
    name: "jobList",
    data() {
        return {
            searchData: "",
            filterOpen: true,
            countrys: [],
            selectedCountry: '',
            loading: false,
            jobList: [],
            root: process.env.VUE_APP_ROOT_API,
            createJobModal: false,
            jobModal: false,
        }
    },
    mounted() { this.jobDetail, this.selectedStatus },
    methods: {
        jobDetail(val) {
            const isEmptyObjectValuesEmpty = Object.values(val).every(value => {
                return value === '' || value === null || value === undefined;
            });
            if (isEmptyObjectValuesEmpty == true) {
                this.$bvToast.toast("Please fill all the details", {
                    title: "Error",
                    variant: "danger",
                    solid: true,
                });
            }
            else {
                Object.assign(val, { adminId: localStorage.getItem("adminId") });
                this.$axios
                    .post(`${this.root}/job/create`, val)
                    .then((response) => {
                        const responseData = response.data;
                        if (responseData.status) {

                            console.log("success");
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
        fetchJobs() {
            this.loading = true;
            this.$axios
                .post(`${this.root}/job`)
                .then((response) => {
                    const responseData = response.data;
                    if (responseData.status) {
                        this.jobList = responseData.data.jobs;
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
        },
        createJob() { this.createJobModal = true },
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
        },
        fetchJobs() {
            this.loading = true;
            this.$axios
                .get(`${this.root}/job`)
                .then((response) => {
                    const responseData = response.data;
                    if (responseData.status) {
                        this.jobList = responseData.data.jobs;
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
        },
        handleDescription(str) {
            if (str.length > 20) {
                return str.slice(0, 20) + ' ...'
            }
        },
        handleEdit() {
        },
    },
    mounted() {
        this.fetchCountries();
    }
}
</script>

<style scoped></style>