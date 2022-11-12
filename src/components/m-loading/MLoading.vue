<!--
===========================================================
FileName: MLoading.vue
Created: quyetkaito
Component hiển thị loading + không cho người dùng làm gì khác (dùng khi đang chờ một thao tác tốn tgian nào đó: gọi API)
===========================================================
-->
<template>
  <div id="loading-bg" class="m-loading" ref="mLoading">
    <m-loader :size="40" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowLoading: false,
    };
  },
  methods: {
    /**------------------------------------------
    *Hàm show loading.
    *Author: quyetkaito (08/04/2022)
    --------------------------------------------*/
    show() {
      this.isShowLoading = true;
    },

    /**------------------------------------------
    *Hàm ẩn loading.
    *Author: quyetkaito (08/04/2022)
    --------------------------------------------*/
    hide() {
      this.isShowLoading = false;
    },
  },
};
</script>

<style>
@import url("/src/style/common/loading.css");

#loading-bg{
  display: none;
}
</style>