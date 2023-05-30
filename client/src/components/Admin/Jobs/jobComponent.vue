<template>
    <b-modal size="xl" title="Create Modal" v-model="createJobModal" centered @ok="handleCreate" @cancel="cancelCreateModal"
        @close="closeCreateModal" :no-close-on-backdrop="true">
        <b-container>
            <b-row>
                <b-col> <label>Job Name</label>
                    <b-form-input required v-model="jobDetails.jobName" placeholder="Enter Job Name"
                        trim></b-form-input></b-col>
                <b-col> <label>Job Description</label>
                    <b-form-textarea required id="textarea" v-model="jobDetails.jobDescription"
                        placeholder="Enter Job Description"></b-form-textarea></b-col>
                <b-col> <label>Company Name</label>
                    <b-form-input required v-model="jobDetails.companyName" placeholder="Enter Company Name"
                        trim></b-form-input></b-col></b-row>
            <b-row>

                <b-col> <label>Company Description</label>
                    <b-form-textarea required id="textarea" v-model="jobDetails.companyDescription"
                        placeholder="Enter Company Description"></b-form-textarea></b-col>
                <b-col>
                    <label>Address</label>
                    <b-form-textarea required id="textarea" v-model="jobDetails.address"
                        placeholder="Enter Address"></b-form-textarea></b-col>
                <b-col> <label>Industry</label>
                    <b-form-input required v-model="jobDetails.industryType"
                        placeholder="Enter Industry"></b-form-input></b-col>
            </b-row>

            <b-row>
                <b-col>
                    <label>Vacancy</label>
                    <b-form-input required v-model="jobDetails.vacancy" placeholder="Enter Vacancy"></b-form-input></b-col>
                <b-col> <label>Employment Type</label>
                    <b-form-input required v-model="jobDetails.employmentType"
                        placeholder="Enter Employment Type"></b-form-input></b-col>
                <b-col>
                    <label>Experience Required</label>
                    <b-form-input required v-model="jobDetails.experienceRequired"
                        placeholder="Enter Vacancy"></b-form-input></b-col>

            </b-row> <b-row>

                <b-col> <label>Valid Till Date</label>
                    <datepicker required v-model="jobDetails.validTillDate" name="uniquename"></datepicker>
                </b-col>

                <b-col>
                    <label>Country</label>
                    <select required v-model="countrySelected" class="custom-select custom-select-sm"
                        aria-label="Default select example">
                        <option value="" disabled>Select</option>
                        <option v-for="(country, index) in countrys" :value="country.id" :key="index">{{
                            country.name }} ({{
        country.countryCode }})</option>
                    </select></b-col>
                <b-col>
                    <label>Skills Required</label>
                    <select v-model="skillsRequired" class="custom-select custom-select-sm"
                        aria-label="Default select example">
                        <option value="" disabled>Select</option>
                        <option v-for="(skill, index) in skillsDetails" :key="index">{{ skill }}
                        </option>
                    </select></b-col>
            </b-row>
            <b-row> <b-col cols="4">
                    <label>Status</label>
                    <select required v-model="statusSelected" class="custom-select custom-select-sm"
                        aria-label="Default select example">
                        <option value="" disabled>Select</option>
                        <option v-for="(statusValue, index) in status" :key="index">{{ statusValue }}</option>
                    </select></b-col></b-row>
        </b-container>
    </b-modal>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
    data() {
        return {
            jobDetails: {
                jobName: "",
                jobDescription: "",
                companyName: "",
                companyDescription: "",
                address: "",
                vacancy: "",
                experienceRequired: "",
                industryType: "",
                employmentType: "",
                validTillDate: "",
            },
            skillsRequired: "",
            skillsDetails: ["Situational Awareness", "Empathy", "Leadership", "Teamwork"],
            countryId: "", countrySelected: "", status: ["ACTIVE", "EXPIRED"], statusSelected: "",
        }
    },
    components: { Datepicker },
    props: {
        createJobModal: { required: true, type: Boolean },
        countrys: { required: true, type: Array }
    },
    methods: {
        toggleStatus() {
            this.status = !this.status;
        },
        handleCreate(evt) {
            evt.preventDefault();
            const data = {
                jobName: this.jobDetails.jobName,
                jobDescription: this.jobDetails.jobDescription,
                companyName: this.jobDetails.companyName,
                companyDescription: this.jobDetails.companyDescription,
                vacancy: this.jobDetails.vacancy,
                address: this.jobDetails.address,
                experienceRequired: this.jobDetails.experienceRequired,
                skillsRequired: this.skillsRequired,
                industryType: this.jobDetails.industryType,
                employmentType: this.jobDetails.employmentType,
                validTillDate: this.jobDetails.validTillDate,
                countryId: this.countrySelected,
                status: this.statusSelected
            }
            this.jobDetails = {}
            this.countrySelected = ""
            this.skillsRequired = ""

            this.$emit("displayJobs", data);
            this.$emit('closeCreateModal');
        },
        cancelCreateModal(evt) { evt.preventDefault(); this.$emit('closeCreateModal'); },
        closeCreateModal(evt) { evt.preventDefault(); this.$emit('closeCreateModal'); }
    }
}
</script>

<style>
.vdp-datepicker * {
    box-sizing: border-box;
    width: 100%;
}
</style>
