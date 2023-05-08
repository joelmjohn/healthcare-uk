<template>
  <div class="IndexView">
    <Header />
    <HomeSlider />
    <AboutSection />
    <ServiceSection />
    <CourseOpportunity />
    <OurClients />
    <BlogSection />
    <Footer />
  </div>
</template>
  
<script>
import Header from "../components/Header.vue";
import HomeSlider from "../components/HomeSlider.vue";
import AboutSection from "../components/AboutSection.vue";
import ServiceSection from "../components/ServiceSection.vue";
import JobOpportunity from "../components/JobOpportunity.vue";
import CourseOpportunity from "../components/CourseOpportunity.vue";
import OurClients from "../components/OurClients.vue";
import BlogSection from "../components/BlogSection.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "IndexView",
  components: {
    Header,
    HomeSlider,
    AboutSection,
    ServiceSection,
    JobOpportunity,
    CourseOpportunity,
    OurClients,
    BlogSection,
    Footer,
  },
};
</script>
  