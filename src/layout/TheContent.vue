<template>
  <!-- Content Container -->
  <div id="theContent" class="content">
    <router-view />
    <div class="fixed" @click="scrollToTop">
        <button class="btn-to-top flex align-center" title="Lên đầu trang">
            <i class="fas fa-arrow-up"></i>
        </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods:{
    scrollToTop(){
       document.getElementById("theContent").scrollTo(0,0);
    }
  }
};
</script>

<style scoped lang="scss">
@import url('@/style/layout/content.css');
.fixed{
    position: fixed;
    right: 10px;
    bottom: 20px;
    z-index: 100;
}
.btn-to-top{
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: 2px solid var(--info-color);    
}
.btn-to-top .fa-arrow-up{
  font-size: 30px;
  color: var(--info-color);
}
</style>