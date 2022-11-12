<template>
  <!-- Radio Button -->
  <label :for="idForInput" class="m-radio-container align-center">
    <input
      type="radio"
      :name="name"
      :disabled="disabled"
      :id="idForInput"
      :checked="modelValue == value || checkedComputed"
      @change="$emit('update:modelValue', value)"
    />

    <span class="checkmark"></span>
    <span class="m-radio-label">{{ label }}</span>
  </label>
</template>
<script>
export default {
  emits: ["update:modelValue"],
  props: {
    //label cho radio button
    label: {
      type: String,
      default: "label",
    },
    idForInput: String,
    //name dùng để group 1 nhóm radio button
    name: {
      type: String,
      default: "gender",
    },
    //giá trị của radio để update
    modelValue: {
      type: Number,
      default: 0,
    },
    //giá trị truyền vào của checkbox
    value: {
      type: Number,
      default: 0,
    },
    //radio có đang được chọn hay không?
    checked: {
      type: Boolean,
      default: false,
    },
    disabled:{
      type: Boolean,
      default: false,
    }
  },
  computed: {
    /**------------------------------------------
    *Gán giá trị cho checkbox nếu checked = true
    *Author: quyetkaito (09/04/2022)
    --------------------------------------------*/
    checkedComputed() {
      if (this.checked) {
        this.$emit("update:modelValue", this.value);
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
/**-----------------------
    Custom radio button vẽ
 -------------------------*/

.m-radio-container {
  cursor: pointer;
  display: inline-flex;
  position: relative;
  padding-left: 0px;
  box-sizing: border-box;
}

/*Ẩn radio mặc định*/
.m-radio-container input {
  opacity: 0;
  width: 20px;
  height: 20px;
  margin: 0;
  cursor: pointer;
  outline: unset;
  border: none;
  box-sizing: border-box;
}

/*vẽ checkmark*/
.checkmark {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #bbbbbb;
  box-sizing: border-box;
}
/* .checkmark:hover {
  border: 1px solid var(--default-color);
} */

.m-radio-container:hover input ~ .checkmark {
  background-color: transparent;
}
/*tạo nút check*/
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.m-radio-container input:checked ~ .checkmark {
  border-color: var(--default-color);
}
.m-radio-container input:checked ~ .checkmark:after {
  display: block;
}

/*style cho dấu chấm bên trong*/
.m-radio-container .checkmark:after {
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--default-color);
}

.m-radio-label {
  margin-left: 10px;
  margin-right: 10px;
}

/* tạo vòng tròn bao ngoài khi focus */
.m-radio-container input::after {
  display: none;
}
/* .m-radio-container input:focus {
  opacity: 100%;
} */
/* .m-radio-container input:focus::after {
  position: absolute;
  display: block;
  content: "";
  top: -3px;
  left: -3px;
  width: 24px;
  height: 24px;
  border: 1px solid aqua;
  border-radius: 50%;
} */
</style>