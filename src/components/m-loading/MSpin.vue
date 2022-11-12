<!--
============================
Icon loading xoay xoay
Created: quyetkaito 
============================
-->
<template>
<div class="loading-box">
  <i class="fas fa-circle-notch loading-icon"></i>
</div>
</template>

<script>
export default {
  props: {
    //kích thước của loading là bao nhiêu?
    size: {
      type: Number,
      default: 40,
    },
  },
};
</script>

<style scoped>
.loading-box{
    background: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
}
.loading-icon {
  width: 40px;
  height: 40px;
  font-size: 40px;
  color: var(--info-color);
  animation: spin 1s linear infinite;
  z-index: 10000;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>