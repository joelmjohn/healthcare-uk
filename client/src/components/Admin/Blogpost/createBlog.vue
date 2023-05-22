<template>
    <div class="blog-page">
        <editor @finalized="createBlog" />
    </div>
</template>

<script>
import editor from './editor.vue'

export default {
    name: "createBlog",
    components: {
        editor
    },
    data() {
        return {
            adminId: localStorage.getItem("adminId"),
            root: process.env.VUE_APP_ROOT_API
        }
    },
    methods: {
        createBlog(blogData) {
            const data = {
                name: blogData.name,
                richTextBody: blogData.richTextBody,
                adminId: this.adminId
            }
            this.$axios
                .post(`${this.root}/blog/create`, data)
                .then((response) => {
                    if (response.data.status) {
                        this.$bvToast.toast("Blog created", {
                            title: "Success",
                            variant: "success",
                            solid: true,
                        });
                        this.$router.push({ path: '/admin/blogpost' });
                    } else {
                        this.$bvToast.toast("Couldn't create blog, try again", {
                            title: "Invalid",
                            variant: "danger",
                            solid: true,
                        });
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
    mounted() {
    }
}
</script>

<style>
.blog-page {
    padding: 20px;

}

.ProseMirror {
    background-color: rgb(253, 253, 253);
    border-radius: 0.5rem;
    padding: 0.75rem;
    color: black;
    outline: 1px solid black;
}

.editor-selector {
    padding: 0.75rem;
    text-align: center;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
    backdrop-filter: blur(10px);
}

img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

pre {
    background-color: black;
    color: rgb(131, 218, 255) !important;
}
</style>