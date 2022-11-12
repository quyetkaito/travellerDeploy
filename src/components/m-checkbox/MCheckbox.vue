<template>
  <!-- Checkbox -->
  <div class="m-checkbox">
    <input
      type="checkbox"
      ref="mCheckbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      :name="name"
    />
    <div
      class="checkbox-label"
      v-show="showLabel"
      :title="labelTextFull"
      @click="doCheck()"
    >
    
      {{ labelText }}
    </div>
  </div>
</template>

<script>
export default {
  emits:["update:modelValue"],
  props: {
    //label của checkbox là gì?
    labelText: {
      type: String,
      default: "label-checkbox",
    },
    //label đầy đủ nếu có viết tắt là gì?
    labelTextFull: {
      type: String,
      default: "",
    },
    //có label hay không?
    showLabel: {
      type: Boolean,
      default: true,
    },
    //value cho checkbox
    modelValue:{
      type:Boolean,
      default:false,
    },
    //name cho checkbox
    name:{
      type:String,
      default:"",
    }
  },

  methods: {
    /**--------------------------------------------
     * Hàm thực hiện thay đổi trạng thái checkbox
     * Author: quyetkaito (07/03/2022)
     ----------------------------------------------*/
    doCheck: function () {
      if (this.$refs.mCheckbox.checked == true) {
        this.$refs.mCheckbox.checked = false;
        this.$refs.mCheckbox.focus();
        this.$emit('update:modelValue', false)
      } else {
        this.$refs.mCheckbox.checked = true;
        this.$refs.mCheckbox.focus();
        this.$emit('update:modelValue', true)
      }
    },

    /**--------------------------------------------------
     * Hàm thực hiện lấy trạng thái checked của checkbox.
     * Author: quyetkaito (29/03/2022)
    ----------------------------------------------------- */
    getStatus: function () {
      if (this.$refs.mCheckbox.checked == true) return true;
      return false;
    },

  
  },
};
</script>

<style>
@import url("/src/style/common/checkbox.css");
</style>