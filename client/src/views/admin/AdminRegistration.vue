<template>
    <div>
        <b-container>
            <b-card>
                <b-container>
                    <h1>
                        <b>ADMIN REGISTRATION </b>
                    </h1>
                    <div class="form mb-3">
                        <b-form-input v-model="name" :state="userState" placeholder="Name"></b-form-input>
                    </div>
                    <div class="form mb-3">
                        <b-form-input v-model="userName" :state="userNameState" placeholder="UserName"></b-form-input>
                    </div>
                    <div class="form mb-3">
                        <b-form-input v-model="email" :state="emailState" placeholder="Email"></b-form-input>
                        <span v-if="emailError" class="error">{{ emailError }}</span>
                   
                    </div>
                    <div class="form mb-3">
                        <b-form-input v-model="password" :state="passwordState" type="password"
                            placeholder="Password"></b-form-input>
                    </div>
                    <b-button variant="outline-primary" size="lg" @click="registerAdmin">Register</b-button>
                </b-container>
            </b-card>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "AdminRegistration",
    watch: {
        name() {
            if (this.name.length > 2) {
                return (this.userState = true);
            }
            this.userState = false;
        },
        // email() {
        //     if (this.email.length > 2) {
        //         return (this.emailState = true);
        //     }
        //     this.emailState = false;
        // },
        email(newEmail) {
        this.validateEmail(newEmail)},
        userName() {
            if (this.userName.length > 2) {
                return (this.userNameState = true);
            }
            this.userNameState = false;
        },
        password() {
            if (this.password.length >= 7) {
                return (this.passwordState = true);
            }

            this.passwordState = false;
        },
    },
    data() {
        return {
            name: "",
            email: "",
            userName: "",
            userState: false,
            userNameState: false,
            emailState: false,
            password: "",
            passwordState: false,
            root: process.env.VUE_APP_ROOT_API,
            emailError:""
        };
    },
    methods: {
        validateEmail(email) {
        // Regular expression for email validation
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  
     if (!emailRegex.test(email)) {
          this.emailError = 'Invalid email format';
          this.emailState=false
        } else {
          this.emailError = '';
          this.emailState=true

        }
      },
        toast(title, msg, variant) {
            this.$bvToast.toast(msg, {
                title: title,
                variant: variant,
                solid: true,
            });
        },
        registerAdmin() {
            if (!this.password || !this.email || !this.name || !this.userName) {
                this.$bvToast.toast("All fields are required", {
                    title: `Invalid Input`,
                    variant: "warning",
                    solid: true,
                });
                return false;
            }
            //  else if (this.password.length != 7) {
            //     this.toast("Error", "Password must be atleast 7 characters", "danger");
            // }
             else {
                const data = {};
                data.password = this.password;
                data.role = "ADMIN";
                data.userName = this.userName;
                data.email = this.email;
                data.name = this.name;
                this.$axios
                    .post(`${this.root}/admin/create`, data)
                    .then((response) => {
                        if (response.data.status) {
                            this.$bvToast.toast("Registration Successful", {
                                title: "Success",
                                variant: "success",
                                solid: true,
                            });
                        } else {
                            this.$bvToast.toast("Invalid User", {
                                title: "Invalid",
                                variant: "danger",
                                solid: true,
                            });
                            this.userState = false;
                            this.emailState = false;
                            this.passwordState = false;
                            this.userNameState = false;
                        }
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
    },
};
</script>
<style>
.error {
  color: red;
}
</style>