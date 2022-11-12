<template>
  <router-link :to="href" exact-active-class="active" v-if="visible">
    <div ref="navItem" class="sidebar-item">
      <div class="m-icon m-icon-24" v-bind:class="icon" v-if="!icon.includes('class')"></div>
      <div class="m-icon-24 icon-aws" v-if="icon.includes('class')" v-html="icon"></div>
      <div class="sidebar-item-text" v-if="!$store.state.isSideBarCollapse">
        {{ text }}
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    href: {
      type: String,
      default: "/",
    },
    visible:{
      type: Boolean,
      default: true,
    }
  },
  methods: {
    /**---------------------------------------------
     * Hàm thực hiện thêm class active cho navItem
     * Author: quyetkaito (04/03/2022)
     -----------------------------------------------*/
    active: function () {
      this.$refs.navItem.classList.add("active");
    },

    /**-------------------------------
     * Remove class active của navItem
     * Author: quyetkaito (04/03/2022)
    ----------------------------------*/
    removeActive: function(){
      this.$refs.navItem.classList.remove("active");
    }
  },
};
</script>

<style>
@import url("/src/style/layout/sidebar.css");
</style>