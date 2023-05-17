<template>
    <div>
        <b-skeleton-wrapper :loading="loading">
            <template #loading>
                <div class="blog-page">
                    <b-card>
                        <b-skeleton animation="wave" width="85%"></b-skeleton>
                        <b-skeleton animation="wave" width="55%"></b-skeleton>
                        <b-skeleton animation="wave" width="70%"></b-skeleton>
                    </b-card>
                    <b-col cols="12" class="mt-3">
                        <b-skeleton-img no-aspect height="150px"></b-skeleton-img>
                    </b-col>
                    <b-card>
                        <b-skeleton animation="wave" width="85%"></b-skeleton>
                        <b-skeleton animation="wave" width="55%"></b-skeleton>
                        <b-skeleton animation="wave" width="70%"></b-skeleton>
                    </b-card>
                </div>
            </template>
            <editor v-if="!loading" :html-content="blogData.richTextBody" :action-type="`Update`" :name="blogData.name"
                @finalized="handleUpdate" />
        </b-skeleton-wrapper>
    </div>
</template>

<script>
import editor from './editor.vue';

export default {
    name: "updateBlog",
    components: { editor },
    data() {
        return {
            id: this.$route.params.id,
            root: process.env.VUE_APP_ROOT_API,
            loading: false,
            blogData: {},
        }
    },
    created() {
        this.fetchBlog();
    },
    methods: {
        fetchBlog() {
            if (!this.id) {
                return false;
            }
            this.loading = true;
            this.$axios
                .get(`${this.root}/blog/${this.id}`)
                .then((response) => {
                    const responseData = response.data;
                    if (responseData.status) {
                        this.blogData = responseData.data;
                    } else {
                        this.$bvToast.toast("Couldn't fetch data, try again", {
                            title: "Invalid",
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
                    this.loading = false;
                });
        },
        handleUpdate(blogData) {
            if (!this.id) {
                return false;
            }
            const data = {
                name: blogData.name,
                richTextBody: blogData.richTextBody,
                adminId: this.adminId
            }
            this.$axios
                .patch(`${this.root}/blog/${this.id}`, data)
                .then((response) => {
                    if (response.data.status) {
                        this.$bvToast.toast("Blog updated", {
                            title: "Success",
                            variant: "success",
                            solid: true,
                        });
                    } else {
                        this.$bvToast.toast("Couldn't update blog, try again", {
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

}
</script>

<style >
.blog-page {
    padding: 20px;

}
</style>