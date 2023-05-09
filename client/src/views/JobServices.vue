<template>
  <div>
    <Header />
    <SearchJob/>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SearchJob from "../components/SearchJob.vue"
import Footer from "../components/Footer.vue";

export default {
  name: "JobServices",
  components: {
    Header,
    SearchJob,
    Footer,
  },
};
</script>

<style>
</style>
