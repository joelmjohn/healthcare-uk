<template>
    <div>
        <b-container>
            <b-card>
                <h2>Blog Listing</h2>
                <div class="text-right">
                    <router-link to="/admin/blogpost/create">
                        <b-button variant="primary">Create a blogpage</b-button>
                    </router-link>
                    <router-view />
                </div>
                <hr />
                <div>
                    <b-skeleton-wrapper :loading="loading">
                        <template #loading>
                            <b-skeleton-table :rows="5" :columns="4" :table-props="{ bordered: true, striped: true }">
                            </b-skeleton-table>
                        </template>
                        <table class="table table-bordered" v-if="!loading">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>BlogName</th>
                                    <th>Created By</th>
                                    <th>Created On</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody v-for="(data, idx) in blogList">
                                <tr>
                                    <td>{{ idx + 1 }}</td>
                                    <td>{{ data.name }}</td>
                                    <td>{{ data.adminId }}</td>
                                    <td>{{ data.createdAt }}</td>
                                    <td>
                                        <b-button variant="outline-primary" size="sm">
                                            <b-icon icon="pencil" aria-hidden="true"></b-icon>
                                            Edit
                                        </b-button>
                                        <b-button variant="outline-danger" size="sm">
                                            <b-icon icon="trash" aria-hidden="true"></b-icon>
                                            Delete
                                        </b-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </b-skeleton-wrapper>
                </div>
            </b-card>
        </b-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            root: process.env.VUE_APP_ROOT_API,
            blogList: [],
            loading: true
        }
    },
    methods: {
        getAllBlogpost() {
            this.$axios
                .get(`${this.root}/blog`)
                .then((response) => {
                    const responseData = response.data;
                    if (responseData.status) {
                        this.blogList = responseData.data;
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
                });
        }
    },
    mounted() {
        this.getAllBlogpost();
    }
}
</script>

<style></style>