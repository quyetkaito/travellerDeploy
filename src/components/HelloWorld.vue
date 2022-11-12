<template>
<div class="helloworld">
   <div class="m-com">
     <div class="title-com">Input bình thường</div>
     <m-input type="text" required requiredSymbol="(bắt buộc)" labelText="Họ và tên"/>
  </div>
   <div class="m-com">
     <div class="title-com">Input mật khẩu</div>
     <m-input type="password" required requiredSymbol="(bắt buộc)" labelText="Mật khẩu"/>
  </div>
  <div class="m-com">
     <div class="title-com">Input số</div>
     <m-input isNumberInput />
  </div>
   <div class="m-com">
     <div class="title-com">Button</div>
     <m-button @click="test">click me</m-button>
  </div>
  <div class="m-com">
    <div class="title-com">Grid tailwind</div>
    <div class="grid grid-cols-4 gap-4">
      <div style="background-color:red;">01</div>
      <!-- ... -->
      <div style="background-color:blue;">09</div>
      <div style="background-color:blue;">09</div>
      <div style="background-color:blue;">09</div>
      <div style="background-color:blue;">09</div>
      <div style="background-color:blue;">09</div>
      <div style="background-color:blue;">09</div>
      <div style="background-color:blue;">09</div>
    </div>
  </div>
  <div class="m-com">
    <div class="grid grid-cols-6 gap-4">
      <div class="col-start-2 col-span-4 m-border">col-start-2 col-span-4</div>
      <div class="col-start-1 col-end-3 m-border">col-start-1 col-end-3</div>
      <div class="col-end-7 col-span-2 m-border">col-end-7 col-span-2</div>
      <div class="col-start-1 col-end-7 m-border">col-start-1 col-end-7</div>
    </div>
  </div>
  <div class="m-com">
     <v-multiselect
        v-model="singleValue"
        :options="[
          { label: 'Batman', value: 1 },
          { label: 'Hello', value: 2 },
        ]"
        mode="single"
        :close-on-select="true"
        :clearOnSelect="true"
        :searchable="true"
        noResultsText="Không có dữ liệu hiển thị"
        :disabled="false"
        placeholder="chọn đi"
        :canClear="false"
      />
      Giá trị: {{ singleValue }}
  </div>
</div>
</template>

<script>
import vMultiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";


export default {
  name: "HelloWorld", 
  components:{
    "v-multiselect": vMultiselect,
  } ,
  data() {
    return {
      singleValue: '',
    }
  },
  methods:{
    test(){
      let me = this;
      me.$commonFunc.load();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.helloworld{
  padding: 10px;
  background-color: #e5e5e5;
  overflow: auto;
  height: 100%;
}

.m-com{
  @apply shadow-sm;
  border-radius: 5px;
  background-color: #ffffff;
  margin-bottom: 10px;
  border: 2px solid black;
  padding: 24px;
}
.title-com{
  font-weight: 700;
  color: red;
  margin-bottom: 10px;
}

.m-border{
  border: 1px solid black;
}
</style>
