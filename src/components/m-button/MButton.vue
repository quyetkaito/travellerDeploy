<template>
  <div ref="buttonComponent" class="button-component">
    <button class="w-full" :class="[btnClass, type]" :style="styleCustom" ref="button" :tabindex="tabindex" :disabled="disabled">
      <div class="m-btn-text">{{ text }}</div>
    </button>
  </div>
</template>
<script>
export default {
  name: 'MButton',
  props: {
    //custom lass dành cho button
    btnClass: {
      type: String,
      default: "m-btn",
    },
    //nội dung của button
    text: {
      type: String,
      default: "btn-text",
    },
    //loại button
    type: {
      type: [String,Object],
      default: "" //secondary
    },
    //custom style
    styleCustom:{
      type: [String,Object],
      default: null
    },
    tabindex:{
      type:[Number,String],
      default:null
    },
    disabled:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      
    }
  },
  methods:{
    /**---------------------------------
     * Hàm thực hiện focus vào button.
     * Author: quyetkaito (03/03/2022)
     -----------------------------------*/
    focus:function(){
      this.$refs.button.focus();
    },
 

  }
};
</script>

<style>
@import url("/src/style/common/button.css");
.primary{
  background-color: var(--default-color)!important;
  color: #fff;
}

.secondary{
  background-color: var(--secondary-color)!important;
  color: var(--default-color);
}
.secondary:focus{
  background-color: #D9EADD;
  color: #2DB84C;
}

.info{
  background-color: var(--info-color)!important;
}

.gray{
  background-color: var(--gray)!important;
  color: black;
}

.button-component{
  width: fit-content;
}
</style>