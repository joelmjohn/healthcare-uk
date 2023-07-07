<template>
    <b-modal size="xl" :title="actionType" v-model="jobModal" type="submit" centered @ok="handleModal" @cancel="cancelJobModal"
        @close="closeJobModal" :no-close-on-backdrop="true">
        <b-container>
            <b-row>
                <b-col>
                    <label>Job Name</label>
                    <b-form-input required v-model="jobDetails.jobName" :state="jobNameCheck" placeholder="Enter Job Name"
                        trim></b-form-input></b-col>
                <b-col>
                    <label>Job Description</label>
                    <b-form-textarea type="number" :state="jobDescriptionCheck" class="rows-sm" required id="textarea" v-model="jobDetails.jobDescription"
                        placeholder="Enter Job Description"></b-form-textarea></b-col>
                <b-col>
                    <label>Company Name</label>
                    <b-form-input required v-model="jobDetails.companyName" :state="companyNameCheck" placeholder="Enter Company Name"
                        trim></b-form-input></b-col></b-row>
            <b-row>
                <b-col>
                    <label>Company Description</label>
                    <b-form-textarea required id="textarea" :state="companyDescriptionCheck" v-model="jobDetails.companyDescription"
                        placeholder="Enter Company Description"></b-form-textarea></b-col>
                <b-col cols="4">
                    <label>Job status</label>
                    <b-form-select :state="statusCheck" required v-model="jobDetails.status" class="custom-select custom-select-sm"
                        aria-label="Default select example">
                        <option value="" disabled>Select</option>
                        <option v-for="(statusValue, index) in statusSelected" :key="index">
                            {{ statusValue }}
                        </option>
                    </b-form-select></b-col>

                <b-col>
                    <label>Industry</label>
                    <b-form-input :state="industryTypeCheck" required v-model="jobDetails.industryType"
                        placeholder="Enter Industry"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col>
                    <label>Vacancy</label>
                    <b-form-input :state="vacancyCheck" required v-model="jobDetails.vacancy"
                        placeholder="Enter Vacancy"></b-form-input></b-col>
                <b-col>
                    <label>Employment Type</label>
                    <b-form-select required v-model="jobDetails.employmentType" :state="employmentTypeCheck" class="custom-select custom-select-sm"
                        aria-label="Default select example">
                        <option value="" disabled>Select</option>
                        <option v-for="(type, index) in employmentTypeSelected" :key="index">
                            {{ type }}
                        </option>
                    </b-form-select>
                </b-col>
                <b-col>
                    <label>Experience Required</label>
                    <b-form-input :state="experienceCheck" required v-model="jobDetails.experienceRequired"
                        placeholder="Enter Experience"></b-form-input></b-col>
            </b-row>
            <b-row>
                <b-col>
                    <label>Address</label>
                    <b-form-textarea required id="textarea" v-model="jobDetails.address" :state="addressCheck"
                        placeholder="Enter Address"></b-form-textarea></b-col>
                <b-col>
                    <label>Country</label>
                    <b-form-select :state="countryCheck" required v-model="jobDetails.countrySelected" class="custom-select custom-select-sm"
                        aria-label="Default select example">
                        <option value="" disabled>Select</option>
                        <option v-for="(country, index) in countrys"  :value="country.id" :key="index">
                            {{ country.name }} ({{ country.countryCode }})
                        </option>
                    </b-form-select></b-col>
                <b-col>
                    <label>Skills Required</label>
                    <multiselect :required="true" v-model="jobDetails.skillsRequired" :options="skillsDetails" :multiple="true"
                        :close-on-select="true">
                    </multiselect>
                    <span v-if="!isValid" class="error">Please select at least one option.</span>
                </b-col>
                
            </b-row>
            <b-row>
                <b-col cols="4">
                    <label>Valid Till Date</label>
                    <b-form-datepicker v-model="jobDetails.validTillDate" :state="validTillDateCheck" class="mb-2"></b-form-datepicker></b-col>
            </b-row>
        </b-container>
    </b-modal>
</template>
  
<script>
import Multiselect from "vue-multiselect";
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
                employmentType: "",
                skillsRequired: "",
                status: "",
                countrySelected: "",
            },
            employmentTypeSelected: ["FULL TIME", "PART TIME"],
            skillsDetails: [
                "Situational Awareness",
                "Empathy",
                "Leadership",
                "Teamwork",
            ],
            countryId: "",
            statusSelected: ["ACTIVE", "EXPIRED"],
            adminId: localStorage.getItem("adminId"),
            vacancyCheck: false,
            experienceCheck: false,
            jobNameCheck:false,
            jobDescriptionCheck:false,
            companyNameCheck:false,
            companyDescriptionCheck:false,
            statusCheck:false,
            industryTypeCheck:false,
            employmentTypeCheck:false,
            addressCheck:false,
            validTillDateCheck:false,
            countryCheck:false
        };
    },

    props: {
        jobModal: { required: true, type: Boolean, default: false },
        countrys: { required: true, type: Array, default: [] },
        actionType: {
            type: String,
            default: "Create",
        },
        jobDataDetails: { required: true, type: Object },
    },
    computed: {
    isValid() {
      return this.skillsRequired=="";
    },
  },
    watch: {
    
        jobDataDetails() {
            this.jobDetails = this.jobDataDetails;
            if (this.actionType === "Update") {
                this.jobDetails.countrySelected = this.jobDataDetails.countryId;
            }
        },
        "jobDetails.vacancy": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if (!Number.isInteger(Number(data)) || this.jobDetails.vacancy == "") {
                    this.vacancyCheck = false;
                } else {
                    this.vacancyCheck = true;
                }
            }
            else { this.vacancyCheck = false; }
        },
        "jobDetails.jobName": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if(data==""){this.jobNameCheck = false;}
                else { this.jobNameCheck = true; }
            }
            else { this.jobNameCheck = false; }
            
        },
        "jobDetails.jobDescription": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if(data==""){this.jobDescriptionCheck = false;}
                else { this.jobDescriptionCheck = true; }
            }
            else { this.jobDescriptionCheck = false; }
            
        },
        "jobDetails.companyName": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if(data==""){this.companyNameCheck = false;}
                else { this.companyNameCheck = true; }
            }
            else { this.companyNameCheck = false; }
            
        },
        "jobDetails.companyDescription": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if(data==""){this.companyDescriptionCheck = false;}
                else { this.companyDescriptionCheck = true; }
            }
            else { this.companyDescriptionCheck = false; }
            
        },
        "jobDetails.status": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if(data==""){this.statusCheck = false;}
                else { this.statusCheck = true; }
            }
            else { this.statusCheck = false; }
            
        },
        "jobDetails.industryType": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if(data==""){this.industryTypeCheck = false;}
                else { this.industryTypeCheck = true; }
            }
            else { this.industryTypeCheck = false; }
            
        },
        "jobDetails.employmentType": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if(data==""){this.employmentTypeCheck = false;}
                else { this.employmentTypeCheck = true; }
            }
            else { this.employmentTypeCheck = false; }
            
        },
        "jobDetails.address": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if(data==""){this.addressCheck = false;}
                else { this.addressCheck = true; }
            }
            else { this.addressCheck = false; }
            
        },
        "jobDetails.validTillDate": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if(data==""){this.validTillDateCheck = false;}
                else { this.validTillDateCheck = true; }
            }
            else { this.validTillDateCheck = false; }
            
        },
        "jobDetails.countrySelected": function (data) {
            if (this.actionType === "Create") {
                if(data==""){this.countryCheck = false;}
                else { this.countryCheck = true; }
            }
            else { this.countryCheck = false; }
            
        },
        "jobDataDetails.countryId": function (data) {
            if (this.actionType === "Update") {
                if(data==""){this.countryCheck = false;}
                else { this.countryCheck = true; }
            }
            else { this.countryCheck = false; }
            
        },
        "jobDetails.experienceRequired": function (data) {
            if (this.actionType === "Create" || this.actionType === "Update") {
                if (
                    !Number.isInteger(Number(data)) ||
                    this.jobDetails.experienceRequired == ""
                ) {
                    this.experienceCheck = false;
                } else {
                    this.experienceCheck = true;
                }
            }
            else { this.experienceCheck = false; }
        },
        "jobDetails.countrySelected":function(data){
            if (this.actionType === "Create") {
            if(data==""){this.countrySelectedState=false}
        else{this.countrySelectedState=true}
        } 
        },
        
        "jobDetails.jobName":function(data){
            if (this.actionType === "Create" || this.actionType === "Update") {
            if(data==""){this.jobNameState=false}
        else{this.jobNameState=true}
        } 
        },
        "jobDetails.status":function(data){
            if (this.actionType === "Create" || this.actionType === "Update") {
            if(data==""){this.statusSelectedState=false}
        else{this.statusSelectedState=true}
        } 
        },
        "jobDetails.employmentType":function(data){
            if (this.actionType === "Create" || this.actionType === "Update") {
            if(data==""){this.employmentTypeState
=false}
        else{this.employmentTypeState=true}
        } 
        },
    
        "jobDetails.validTillDate":function(data){
            if (this.actionType === "Create" || this.actionType === "Update") {
            if(data==""){this.validTillDateState=false}
        else{this.validTillDateState=true}
        } 
        },
        "jobDetails.companyDescription":function(data){
            if (this.actionType === "Create" || this.actionType === "Update") {
            if(data==""){this.companyDescription=false}
        else{this.companyDescription=true}
        } 
        },
        "jobDetails.address":function(data){
            if (this.actionType === "Create" || this.actionType === "Update") {
            if(data==""){this.addressState=false}
        else{this.addressState=true}
        } 
        },
        "jobDetails.companyName":function(data){
            if (this.actionType === "Create" || this.actionType === "Update") {
            if(data==""){this.companyName=false}
        else{this.companyName=true}
        } 
        },
        "jobDetails.jobDescription":function(data){
            if (this.actionType === "Create" || this.actionType === "Update") {
            if(data==""){this.jobDescription=false}
        else{this.jobDescription=true}
        } 
        },
        "jobDetails.industryType":function(data){
            if (this.actionType === "Create" || this.actionType === "Update") {
            if(data==""){this.industryTypeState=false}
        else{this.industryTypeState=true}
        } 
        }
    },
    methods: {
        toggleStatus() {
            this.status = !this.status;
        },
        handleModal(evt) {
            evt.preventDefault();
            if (this.actionType === "Create") {
                

                const isEmpty = Object.values(this.jobDetails).some(
                    (value) => value === undefined || this.jobDetails.skillsRequired == [] || value === ""
                );
                if (isEmpty) {
                    this.toast("Error", "Please fill all the details", "danger");
                } else {
                    this.$emit("displayJobs", data);
                    this.$emit("closeJobModal");
                    this.countryId = this.jobDetails.countrySelected;
                    for (const key in this.jobDetails) {
                        this.jobDetails[key]="";
                    }
                }
            } else if (this.actionType === "Update") {
                const isEmpty = Object.values(this.jobDataDetails).some(
                    (value) => value === "" || this.jobDataDetails.skillsRequired.length == 0
                );
                if (isEmpty) {
                    this.toast("Error", "Please fill all the details", "danger");
                } else {
                    this.jobDataDetails.countryId = this.jobDetails.countrySelected;

                    this.$emit("newDataDetails", this.jobDataDetails);
                    this.$emit("closeJobModal");
                }
            }
        },
        cancelJobModal(evt) {
            evt.preventDefault();
            this.$emit("closeJobModal");
            this.countrySelectedState=false

        },
        closeJobModal(evt) {
            evt.preventDefault();
            this.$emit("closeJobModal");
            this.countrySelectedState=false

        },
        toast(title, msg, variant) {
            this.$bvToast.toast(msg, {
                title: title,
                variant: variant,
                solid: true,
            });
        },
    },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">

</style>
  