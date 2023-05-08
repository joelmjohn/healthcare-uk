<template>
    <div>
        <b-alert show variant="primary">
            Welcome to admin page
        </b-alert>
        
    </div>
</template>

<script>
export default {
    name: 'admin',
    data() {
        return {
            root: process.env.VUE_APP_ROOT_API
        }
    },
    created(){
        alert('created'+this.root);
    },
    mounted(){
        alert('mounted'+this.root);
    }

}


</script>

<style scoped></style>