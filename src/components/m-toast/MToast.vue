// File Toast tự custom
// Hiện tại ko dùng, dùng thư viên thay thế npm install --save vue-toastification@next
<template>
  <div class="m-toastbox" id="toastComponent">
    <div class="m-toast-item">
      <div class="m-toast-item__content flex align-y-center">
        <div class="m-icon m-icon-48" :class="type[toastType].toastIcon"></div>
        <div class="m-toast-text">{{ toastText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowToast: false, //toast có đang show hay không?
      type:[
        {toastIcon:'m-exclamation-correct-48'},//icon thành công - 0
        {toastIcon:'m-exclamation-error-48-2'},//error - 1
        {toastIcon:'m-exclamation-warning-48'},//warning - 2
        {toastIcon:'m-exclamation-info-48'},//info - 3
        {toastIcon:'m-exclamation-question-48'},//question? - 4
      ]
    };
  },
  props: {
    //loại toast (thành công, thông báo, lỗi...)
    toastType:{
        type:Number,
        default: 0, //mặc định là thành công
    },
    //text trong toast là gì?
    toastText: {
      type: String,
      default: "toast-message",
    },
  },

  methods: {
    /**--------------------------------
     * Hàm hiện toast message.
     * Author: quyetkaito (28/03/2022)
    ----------------------------------*/
    show() {
      this.isShowToast = true;
      setTimeout(() => {
        this.isShowToast = false;
      }, 3000);
    },

    /**--------------------------------
     * Hàm ẩn toast message.
     * Author: quyetkaito (28/03/2022)
    ----------------------------------*/
    hide() {
      this.isShowToast = false;
    },
  },
};
</script>

<style scoped>
@import url("@/style/common/toast.css");
#toastComponent{
    display: none;
}
</style>

