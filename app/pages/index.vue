<script setup lang="ts">
import HeroSection from "~/components/Organism/HeroSection/index.vue";
import PartnerSection from "~/components/Organism/PartnerSection/index.vue";
import StaffSection from "~/components/Organism/StaffSection/index.vue";
import InfographicSection from "~/components/Organism/InfographicSection/index.vue";
import FacilitySection from "~/components/Organism/FacilitySection/index.vue";
import NewsSection from "~/components/Organism/NewsSection/index.vue";
import VideoSection from "~/components/Organism/VideoSection/index.vue";
import Footer from "~/components/Organism/Footer/index.vue";

const route = useRoute();
console.log("Current route path:", route.path);
</script>

<template>
  <div class="bg-white">
    <HeroSection />
    <PartnerSection />
    <StaffSection />
    <InfographicSection />
    <FacilitySection />
    <NewsSection />
    <VideoSection />
    <Footer />
  </div>
</template>

<style scoped></style>
