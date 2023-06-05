<template>
    <b-modal size="xl" :title="actionType" v-model="jobModal" centered @ok="handleCreate" @cancel="cancelCreateModal"
        @close="closeCreateModal" :no-close-on-backdrop="true">
        <b-container>
            <b-row>
                <b-col> <label>Job Name</label>
                    <b-form-input required v-model="jobDetails.jobName" placeholder="Enter Job Name"
                        trim></b-form-input></b-col>
                <b-col> <label>Job Description</label>
                    <b-form-textarea class="rows-sm" required id="textarea" v-model="jobDetails.jobDescription"
                        placeholder="Enter Job Description"></b-form-textarea></b-col>
                <b-col> <label>Company Name</label>
                    <b-form-input required v-model="jobDetails.companyName" placeholder="Enter Company Name"
                        trim></b-form-input></b-col></b-row>
            <b-row>

                <b-col> <label>Company Description</label>
                    <b-form-textarea required id="textarea" v-model="jobDetails.companyDescription"
                        placeholder="Enter Company Description"></b-form-textarea></b-col>
                <b-col cols="4">
                    <label>Job status</label>
                    <select required v-model="statusSelected" class="custom-select custom-select-sm"
                        aria-label="Default select example">
                        <option value="" disabled>Select</option>
                        <option v-for="(statusValue, index) in status" :key="index">{{ statusValue }}</option>
                    </select></b-col>

                <b-col> <label>Industry</label>
                    <b-form-input required v-model="jobDetails.industryType"
                        placeholder="Enter Industry"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col>
                    <label>Vacancy</label>
                    <b-form-input :state="vacancyCheck" @input="validateVacancy" required v-model="jobDetails.vacancy"
                        placeholder="Enter Vacancy"></b-form-input></b-col>
                <b-col> <label>Employment Type</label>
                    <select required v-model="jobDetails.employmentTypeSelected" class="custom-select custom-select-sm"
                        aria-label="Default select example">
                        <option value="" disabled>Select</option>
                        <option v-for="(type, index) in employmentType" :key="index">{{ type }}</option>
                    </select>
                </b-col>
                <b-col>
                    <label>Experience Required</label>
                    <b-form-input @input="validateExperience" :state="experienceCheck" required
                        v-model="jobDetails.experienceRequired" placeholder="Enter Experience"></b-form-input></b-col>

            </b-row> <b-row>
                <b-col>
                    <label>Address</label>
                    <b-form-textarea required id="textarea" v-model="jobDetails.address"
                        placeholder="Enter Address"></b-form-textarea></b-col>

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
                    <multiselect v-model="skillsRequired" :options="skillsDetails" :multiple="true" :close-on-select="true">
                    </multiselect>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="4">
                    <label>Valid Till Date</label>
                    <b-form-datepicker v-model="jobDetails.validTillDate" class="mb-2"></b-form-datepicker></b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
    components: { Multiselect },
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
                validTillDate: "",
                employmentTypeSelected: ""
            },
            employmentType: ["FULL TIME", "PART TIME"],
            skillsRequired: "",
            skillsDetails: ["Situational Awareness", "Empathy", "Leadership", "Teamwork"],
            countryId: "", countrySelected: "",
            status: ["ACTIVE", "EXPIRED"],
            statusSelected: "",
            adminId: localStorage.getItem("adminId"),
            vacancyCheck: false,
            experienceCheck: false,
        }
    },

    props: {
        jobModal: { required: true, type: Boolean },
        countrys: { required: true, type: Array },
        actionType: {
            type: String,
            default: 'Create'
        },
    },
    methods: {
        validateVacancy() {
            if (!Number.isInteger(Number(this.jobDetails.vacancy) )|| this.jobDetails.vacancy == "") {
                this.vacancyCheck = false;
            } else {
                this.vacancyCheck = true;
            }
        },
        validateExperience() {
            if (!Number.isInteger(Number(this.jobDetails.experienceRequired) )|| this.jobDetails.experienceRequired == "") {
                this.experienceCheck = false;
            } else {
                this.experienceCheck = true;
            }
        },
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
                employmentType: this.jobDetails.employmentTypeSelected,
                validTillDate: this.jobDetails.validTillDate,
                countryId: this.countrySelected,
                status: this.statusSelected,
                adminId: this.adminId
            }
            const isEmpty = Object.values(data).some(value => value === '');
            if (isEmpty) {
                this.toast("Error", "Please fill all the details", "danger")

            }

            else if (this.vacancyCheck === false ||
                this.experienceCheck === false) { this.toast("Error", "Please enter a number", "danger") }
            else {
                this.$emit("displayJobs", data);
                this.$emit('closeJobModal');
                this.jobDetails.jobName = "";
                this.jobDetails.jobDescription = "";
                this.jobDetails.companyName = "";
                this.jobDetails.companyDescription = "";
                this.jobDetails.vacancy = "";
                this.jobDetails.address = "";
                this.jobDetails.experienceRequired = "";
                this.skillsRequired = "";
                this.jobDetails.industryType = "";
                this.jobDetails.employmentType = "";
                this.jobDetails.validTillDate = "";
                this.jobDetails.employmentTypeSelected = "";
                this.countrySelected = "";
                this.statusSelected = "";
                this.skillsRequired = "";
            }
        },
        cancelCreateModal(evt) { evt.preventDefault(); this.$emit('closeJobModal'); },
        closeCreateModal(evt) { evt.preventDefault(); this.$emit('closeJobModal'); },
        toast(title, msg, variant) {
            this.$bvToast.toast(msg, {
                title: title,
                variant: variant,
                solid: true,
            });
        }
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
