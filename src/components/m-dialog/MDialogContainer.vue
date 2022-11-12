<template>
  <!-- Dialog Container dùng chung cho các dialog khác nhau -->
  <div :class="['m-dialog', classCustom]" :style="dialogStyle" v-show="isShow">
    <div
      ref="mDialog"
      class="m-dialog-box h-625 w-900"
      :style="boxStyle"
    >
      <!-- Header -->
      <slot name="header"/>      
      <slot name="body"/>
      <slot name="footer"/>


    </div>  
  </div>
</template>

<script>
export default {
  props: {
    dialogStyle:{
      type: String,
      default: null,
    },
    //style custom cho form
    boxStyle:{
      type: String,
      default: null,
    },
    //class custom cho dialog
    classCustom:{
      type: String,
      default: null
    }
  },

  data() {
    return {
      //dialog có đang hiện không?
      isShow: false,
    };
  },

  methods: {

    /**--------------------------
   * Hàm thực hiện show dialog.
   * Author: quyetkaito (29/03/2022)
  ----------------------------*/
    show() {
      this.isShow = true;
    },

    /**
     * Hàm thực hiện hide dialog.
     * Author: quyetkaito (29/03/2022)
     */
    hide() {
      this.isShow = false;
    },

    /**---------------------------------
     * Hàm bind phím tắt từ ngoài vào.
     * Author: quyetkaito (31/03/2022)
    -----------------------------------*/
    addEventListener(event, handler){
        this.$refs.mDialog.addEventListener(event,handler);
    }
  },
};
</script>

<style scoped>
@import url("@/style/common/base-dialog.css");
</style>