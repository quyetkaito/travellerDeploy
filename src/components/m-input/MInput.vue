<template>
  <div>
    <label for="" class="m-label" v-show="showLabel" :title="labelTextFull">
      {{ labelText }}
      <span class="require-mark" v-show="required">{{requiredSymbol}}</span>
    </label>
    <div style="position: relative">
      <!-- Nếu là input bình thường -->
      <div class="flex align-y-center" v-if="!isTextArea">
        <input
          ref="input"
          :type="inputType"
          :name="name"
          :readonly="readonly"
          :maxlength="maxlength"
          :disabled="disabled"
          :tabindex="tabindex"
          class="m-input"
          :value="modelValue"
          @input="sendChange"
          :style="{ height: height + 'px', style }"
          v-bind:class="{
            'm-input-icon': isHasIcon,
            error: isError,
            'text-align-right': isNumberInput, //căn phải nếu là số
            'disabled' : disabled || readonly
          }"
          :placeholder="placeholder"
          @blur="$emit('blur', $event)"
          @change="$emit('onChange', modelValue)"
        />
        <div
          class="m-search m-icon m-icon-16 m-icon-search"
          v-show="isHasIcon"
          @click="$emit('findData')"
        ></div>
        <div
          class="m-search m-icon m-icon-24"
          :class="inputType=='password'?'m-unview': 'm-view'"
          v-if="type=='password' && viewPassword"          
          @click="togglePassword"          
        ></div>
      </div>

      <!-- Nếu là textarea -->
      <div class="flex align-y-center" v-if="isTextArea">
        <textarea
          ref="input"
          class="m-input m-textarea"
          :placeholder="placeholder"
          :style="{ height: height + 'px!important', style, 'max-height': maxHeight + 'px!important'}"
          @input="sendChange"
          :value="modelValue"
          @change="$emit('onChange', modelValue)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as base from "@/script/base";

export default {
  name: "MInput",
  emits: ["update:modelValue", "checkBlur", "blur", "onChange"],
  data() {
    return {
      full: "width:100%",
      inputType : this.type,
    };
  },
  props: {
    maxHeight:{
      type: [Number,String],
      default: 40,
    },
    viewPassword:{ //có cho phép xem mật khẩu không
      type: Boolean,
      default: true,
    },
    readonly:{  //chỉ xem
      type: Boolean,
      default: false,
    },
    //input có label hay không?
    showLabel: {
      type: Boolean,
      default: true,
    },
    //label của input là gì
    labelText: {
      type: String,
      default: "label-text",
    },
    //label đầy đủ của input là gì
    labelTextFull: {
      type: String,
      default: "",
    },
    //hiện title khi hover cho label viết tắt
    labelTitle: {
      type: String,
      default: null,
    },
    //loại input
    type: {
      type: String,
      default: "text",
    },
    //placeholder của input
    placeholder: {
      type: String,
      default: "",
    },
    //input này có bắt buộc không?
    required: {
      type: Boolean,
      default: false,
    },
    //kí hiệu bắt buộc là gì?
    requiredSymbol:{
      type: String,
      default: "*",
    },
    //input này có icon không?
    isHasIcon: {
      type: Boolean,
      default: false,
    },
    //chiều rộng là bao nhiêu? mặc định 100% chiều dài phần tử cha
    width: {
      type: [Number,String],
      default: 'fit-content',
    },

    //chiều cao của input là bao nhiêu?
    height: {
      type: [Number,String],
      default: 40,
    },
    //số ký tự có thể nhập là bao nhiêu?
    maxlength: {
      type: Number,
      default: 255,
    },
    //giá trị khởi tạo cho input
    modelValue: {
      type: [String, Number],
      default: "",
    },
    //thêm class lỗi nếu lỗi
    isError: {
      type: Boolean,
      default: false,
    },
    //có phải input dạng số hay không?
    isNumberInput: {
      type: Boolean,
      default: false,
    },
    //có phải input dạng text area không?
    isTextArea: {
      type: Boolean,
      default: false,
    },
    //name của input
    name: {
      type: String,
      default: "",
    },
    //input có bị disabled ko?
    disabled: {
      type: Boolean,
      default: false,
    },
    //binding nhiều style
    style:{
      type: [String,Object],
      default: null
    },
    tabindex:{
      type: [Number,String],
      default:null
    }
  },
  methods: {
    /**
    * thay đổi trạng thái ẩn hiện của mật khẩu
    * @created : quyetkaito 08/10/2022
    */
    togglePassword(){
      if(this.inputType == 'password') this.inputType = 'text';
      else if(this.inputType == 'text') this.inputType = 'password';
    },
    /**----------------------------------
     * Hàm gửi dữ liệu tới component cha
     * và xử lý dữ liệu.
     * Author: quyetkaito (25/02/2022)
    -------------------------------------*/
    sendChange(event) {
      try {
        //khi nhập thì bỏ error border
        this.removeError();
        //nếu là dạng số thì format
        if (this.isNumberInput) {
          //gọi hàm format định dạng số ngay khi nhập liệu từ base
          this.onNumberInput(event);
        }
        this.$emit("onChange", true);
        this.$emit("update:modelValue", event.target.value);
      } catch (error) {
        //log ra lỗi
        console.error(error);
      }
    },

    /**-----------------------------------------------------------
 * Hàm thực hiện format định dạng số ngay trong khi nhập liệu.
 * @param {Event} event 
 * Author: quyetkaito (27/03/2022).
 -----------------------------------*/
    onNumberInput(event) {
      try {
        //lấy ra giá trị của ô input hiện tại
        let value = event.target.value;
        // console.log("ô input hiện tại: ", value);
        if (event.data == ",") {
          //nếu người dùng nhập dấu ',' và không có dấu ',' nào đã tồn tại => đang nhập số thập phân
          if ((value.match(/,/g) || []).length <= 1) {
            // console.log("chưa phải số thập phân");
            return; //cho nhập liệu tiếp
          }
        }
        //format số
        event.target.value = base.formatCurrency(value);
      } catch (error) {
        console.error(error);
      }
    },

    /**--------------------------------
     * Hàm dùng để focus vào input.
     * Author: quyetkaito (03/03/2022)
    ----------------------------------*/  
    focus: function () {
      this.$nextTick(function () {
        this.$refs.input.focus()
      });
    },

    /**------------------------------------
     * Hàm dùng để thêm css lỗi cho input.
     * Author: quyetkaito (03/03/2022)
    --------------------------------------*/
    addError: function () {
      this.$refs.input.classList.add("error");
      this.$refs.input.setAttribute(
        "title",
        `${this.labelText} không được bỏ trống`
      );
    },

    /**--------------------------
     * Hàm thêm border đỏ cho input
     * Author: quyetkaito (20/03/2022)
     -------------------------*/
    addRedBorder: function () {
      if(this.$refs.input && this.$refs.input.classList){
        this.$refs.input.classList.add("error");
      }
    },

    /**------------------------------------
     * Hàm dùng để bỏ css lỗi cho input.
     * Author: quyetkaito (03/03/2022)
    --------------------------------------*/
    removeError: function () {
      if(this.$refs.input && this.$refs.input.classList){
        this.$refs.input.classList.remove("error");
        this.$refs.input.setAttribute("title", "");
      }
    },

    /**-------------------------------
     * Hàm lấy ra tiêu đề của input.
     * Author: quyetkaito (03/03/2022)
     ---------------------------------*/
    getTitle: function () {
      return this.labelText;
    },

    setEmptyTooltip(){
      this.$refs.input.setAttribute("title",`${this.labelText} không được bỏ trống`);
    },

    setTooltip(message){
      this.$refs.input.setAttribute("title", message);
    },

    setErrorTooltip(message){
      this.$refs.input.setAttribute("title", message);      
      this.$nextTick(()=>{
        this.$refs.input.addRedBorder;
      });      
    }

  },
};
</script>

<style>
@import url("@/style/common/input.css");
.disabled{
  background: #E0E0E0;
}
</style>