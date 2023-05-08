<template>
  <div>
    <Header />
    <SearchCourse/>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import SearchCourse from "../components/SearchCourse.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "StudyAbroad",
  components: {
    Header,
    SearchCourse,
    Footer,
  },
};
</script>

<style>
</style>
