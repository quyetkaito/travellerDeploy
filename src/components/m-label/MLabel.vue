<template>
  <label for="" class="m-label">
    {{ text }}
    <span class="require-mark" v-show="required">{{requiredSymbol}}</span>   
  </label>
</template>

<script>
export default {
  props: {
    //label là gì?
    text: {
      type: String,
      default: "",
      required: true, //bắt buộc có label text
    },
    //có bắt buộc không?
    required:{
      type:Boolean,
      default:false,
    },
    //ký hiệu bắt buộc là gì
    requiredSymbol:{
      type: String,
      default : '*',
    }
  },
};
</script>

<style scoped>
.m-label {
  font-size: 13px;
  font-weight: 700;
  color: #000000;
  margin-bottom: 4px;
  white-space: nowrap;
}
.require-mark {
  color: red;
  font-weight: normal!important;;
}
</style>