<template>
  <div>
    <Header />
    <SingleJob/>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SingleJob from "../components/SingleJob.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "SingleJob",
  components: {
    Header,
    SingleJob,
  },
};
</script>

<style>
</style>
