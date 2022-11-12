<template>
  <div class="wrapper" id="wapperApp">
    <TheSidebar />
    <div class="main-content">
      <TheHeader/>
      <TheContent/>
    </div>
  </div>
</template>

<script>
//1. Import components

import TheSidebar from "@/layout/sidebar/TheSidebar.vue";
import TheContent from "@/layout/TheContent.vue";
import TheHeader from "@/layout/TheHeader.vue";
export default {
  name: "AdminPage",
  components: {
    TheSidebar,  TheContent, TheHeader
  },
  methods:{

  },
};
</script>

<style>
</style>