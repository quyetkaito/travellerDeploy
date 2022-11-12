<template>
    <!-- Dialog thêm mới -->
  <div class="m-popup m-add-popup" v-bind:class="{ show: isShow }" ref="dialog">
    <div class="m-popup-box h-625 w-800">
      <!-- Header -->
      <div class="m-popup-header">
        <div class="m-popup-header__left">
          <div class="title-container">
            <div class="popup-title-text">{{ formTitle }}</div>            
          </div>
        </div>
        <div class="m-popup-header__right">
          <div style="position: relative">
            <div
              class="m-icon m-icon-24 m-help__nav"
              style="margin-right: 6px"
            ></div>
            <!-- <ms-tooltip class="hide" text="Giúp (F1)" :isTop="true" /> -->
          </div>
          <div style="position: relative">
            <div class="m-icon m-icon-24 m-close" @click="buttonClick('Close')"></div>
            <!-- <ms-tooltip class="hide" text="Đóng (ESC)" :isTop="true" /> -->
          </div>
        </div>
      </div>
      <!-- Header end-->
      <!-- Form -->
      <div class="m-popup-form">
        <!-- Detail -->
        <div class="form-container">
          <div class="form-detail">
            <div class="general-info">
              <div class="info-left">
                <div class="m-form-field">
                  <div class="form-item" style="width: 100%">
                    <m-input
                      :labelText="$t('EmailLogin')"
                      v-model="currentItem.email"
                      required
                      :readonly="isViewing"
                      :isAutoFocus="true"
                      :maxlength="100"
                      placeholder=""
                      :style="{ width: '100%' }"
                      ref="email"
                      @change="emailChange"
                    />
                  </div>                  
                </div>
                <div class="m-form-field">
                    <div class="form-item" style="width: 100%">
                        <m-input
                            :labelText="$t('FullName')"
                            :maxlength="100"
                            required
                            :readonly="isViewing"
                            v-model="currentItem.full_name"
                            placeholder=""
                            ref="fullname"
                        />
                    </div>                 
                </div>
                <div class="m-form-field">
                    <!-- <div class="form-item" style="padding-right: 6px; width: 100%">
                        <m-input
                            :labelText="$t('UserName')"                            
                            :maxlength="50"
                            v-model="currentItem.username"
                            placeholder=""
                            ref="username"
                            disabled
                        />
                    </div> -->
                    <div class="form-item" style="width: 100%">
                        <m-input
                            :labelText="$t('Password')"                            
                            :maxlength="50"
                            required
                            :readonly="isViewing"
                            v-model="currentItem.password"
                            placeholder=""
                            ref="password"
                        />
                    </div>
                   <!-- <div class="form-item" style="width: 100%">
                    <m-label text="Vai trò" />                    
                    <v-multiselect
                    ref="department"
                      v-model="currentItem.role"
                      :options="storeUserRole"
                      label="label"
                      :close-on-select="true"
                      :clearOnSelect="true"
                      :searchable="true"
                      noResultsText="Không có dữ liệu hiển thị"
                      :disabled="false"                      
                      :canClear="false"
                      :canDeselect="false"
                    />
                  </div> -->
                </div>
              </div>
              <div class="info-right">
                <div class="m-form-field">
                  <div class="form-item" style="padding-right: 6px; width: 40%">
                    <m-label text="Ngày sinh" />
                    <v-date-picker
                      v-model:value="currentItem.date_of_birth"
                      :format="dateFormat"
                      :disabled="isViewing"
                      :placeholder="dateFormat"
                      :lang="langString"
                      :disabled-date="disabledDateBeforeToday"
                      :clearable="false"
                      title-format="DD/MM/YYYY"
                    />
                  </div>
                  <div class="form-item" style="width: 60%; padding-left: 6px">
                    <m-label text="Giới tính" />
                    <div class="m-row m-field-gender">
                      <m-radio v-model="currentItem.gender" :value="1" label="Nam" :disabled="isViewing"/>
                      <m-radio v-model="currentItem.gender" :value="0" label="Nữ" :disabled="isViewing"/>
                      <m-radio v-model="currentItem.gender" :value="2" label="Khác" :disabled="isViewing"/>                      
                    </div>
                  </div>
                </div>
                <div class="m-form-field">
                  <div class="form-item" style="width: 100%">
                    <m-input
                      :labelText="$t('PhoneNumber')"
                      :maxlength="25"
                      :readonly="isViewing"
                      v-model="currentItem.phone"
                      placeholder=""
                      ref="phoneNumber"
                    />
                    </div>                  
                </div>
                <div class="m-form-field">
                  <div class="form-item" style="width: 100%">
                    <m-label text="Vai trò" />                    
                    <v-multiselect
                    ref="department"
                      v-model="currentItem.role"
                      :options="storeUserRole"
                      label="label"
                      :close-on-select="true"
                      :clearOnSelect="true"
                      :searchable="true"
                      noResultsText="Không có dữ liệu hiển thị"
                      :disabled="isViewing"                      
                      :canClear="false"
                      :canDeselect="false"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="contact-info">
              <div class="m-form-field">
                <div class="form-item" style="width: 100%">
                  <m-input
                    labelText="Địa chỉ"
                    :maxlength="255"
                    :readonly="isViewing"
                    v-model="currentItem.address"
                    placeholder=""
                    :style="{ width: '100%' }"
                    ref="address"
                  />
                </div>
              </div>
              <div class="m-form-field">                
                <div class="form-item">
                  <m-input
                    labelText="Trạng thái"                    
                    :maxlength="50"
                    :readonly="isViewing"
                    v-model="currentItem.status"
                    placeholder=""
                    ref="status"
                  />
                </div>                
              </div>
            </div>
          </div>
        </div>
        <!-- Detail end-->

        <!-- Footer -->
        <div class="footer-container">
          <div class="footer-line">
            <button class="m-btn-second" @click="buttonClick('Cancel')"> {{$t('Cancel')}}</button>
            <div class="group-btn-popup align-right" v-if="!isViewing">
              <div style="position: relative">
                <button
                  class="m-btn-second btn-save"
                  @click="buttonClick('Save')"                  
                >
                  {{$t('Save')}}
                </button>
                <!-- <ms-tooltip class="hide" text="Cất (Ctrl + S)" :isTop="false" /> -->
              </div>
              <div style="position: relative">
                <button
                  class="m-btn btn-multi-add tooltip"
                  style="margin-left: 16px"
                >
                   {{$t('SaveAndAdd')}}
                </button>
                <!-- <ms-tooltip
                  class="hide"
                  text="Cất và thêm (Ctrl + Shift + S)"
                  :isTop="false"
                /> -->
              </div>
            </div>
            <div class="group-btn-popup align-right" v-if="isViewing">
              <div style="position: relative">
                <button
                  class="m-btn btn-save"
                  @click="buttonClick('Edit')"                  
                >
                  {{$t('Edit')}}
                </button>               
              </div>              
            </div>
          </div>
        </div>
        <!-- Footer end-->
      </div>
      <!-- Form end -->
    </div>
  </div>
</template>

<script>
// import DatePicker
import NextDatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/vi";

//multi vue 3
import vMultiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import UserAPI from '@/api/UserAPI';
import BaseDictionaryDetail from "@/views/base/BaseDictionaryDetail.vue";

export default {
  name: "MSDialogDetail",
  extends: BaseDictionaryDetail,
  emits: ["showDialog", "loadData", "eShowPopup", "eCloseDialog"],
  components: {
    "v-date-picker": NextDatePicker,
    /* eslint-disable vue/no-unused-components */
    "v-multiselect": vMultiselect,
  },

  props: {
    // isShow: {
    //   type: Boolean,
    //   default: false,
    // },
    employeeSelected: {}, //currentItem đang thao tác
    isShowDialog: {
      type: Boolean,
      default: false,
    },
    formMode: {
      //trạng thái của form là gì
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      isShow: false,// trạng thái ẩn hiện của form
      editMode: 'Add', //trạng thái form
      isViewing: false, //mode view
      //có đang thêm nhiều không?
      isMultiAdd: false,
      //dữ liệu có bị thay đổi không?
      isChange: false,
      listInputError: [],
      currentItem: {},
      employeeInit: {gender:null,},
      //new employeeId truyền vào dialog
      newEmployeeCode: null,
      //danh sách các phòng ban nhận từ server
      departments: {},
      //danh sách các phòng ban truyền vào combobox: title và value      
      departmentValue: null, //giá trị của combobox department
    };
  },
  created(){
    this.initStaticData();
  },
  methods:{
    /**
    * hàm xử lý bind data lên form từ màn hình danh sách
    * @created : quyetkaito 06/10/2022
    * @param {Object} object  đối tượng truyền từ ngoài danh sách vào
    * @param {String} editMode : xác định là xem hay sửa..
    */
    bindData(object, editMode){
        let me = this;
        if(object){
            if(editMode){
                me.editMode = editMode;   
                if(editMode == 'View'){
                    me.isViewing = true;
                }             
            }
            //còn đoạn xử lý datetime các kiểu
            me.currentItem = object;
            if(me.currentItem.date_of_birth){
              me.currentItem.date_of_birth = new Date(me.currentItem.date_of_birth);
            }
            me.originalItem = JSON.parse(JSON.stringify(me.currentItem));
        }
    },

    /**
    * Xử lý khi email thay đổi
    * @created : quyetkaito 05/10/2022
    */
    emailChange(){
        let me = this;
        if(me.currentItem){
            if(me.currentItem.email){
                if(! me.$commonFunc.validateEmail(me.currentItem.email)){
                    // me.$store.commit("showError", {
                    //     message: "Email không hợp lệ.",
                    // });
                    if(me.$refs.email && typeof me.$refs.email.setTooltip == "function"){
                        me.$refs.email.setErrorTooltip("Email không đúng định dạng.");
                    }
                    if(me.$refs.email && typeof me.$refs.email.focus == 'function'){
                        me.$refs.email.focus();    
                        me.$refs.email.addRedBorder();                          
                    }
                }
                //gán username theo 
                me.currentItem.username = me.currentItem.email.split('@')[0];                
            }else{
                //thông báo ko được để trống
                if(me.$refs.email && typeof me.$refs.email.focus == 'function'){
                    me.$refs.email.focus();
                    if(typeof me.$refs.email.addError == 'function'){
                        me.$refs.email.addError();
                    }
                }
            }
        }
    },
    /**
    * hàm khởi tạo biến tĩnh
    * @created : quyetkaito 04/10/2022
    */
    initStaticData(){
        let me = this;
        me.formTitle = me.$t('UserDetail'); //title của form.
        me.langString = "vi"; //ngôn ngữ cho datepicker
        me.dateFormat = "DD/MM/YYYY";
        me.storeUserRole = [
            {
                label: "Admin",
                value: 1,
            },
            {
                label: "User",
                value: 0,
            }

        ]         
    },

    initNewItem(){
        let me = this;
        me.currentItem.password =  "Abc@12345678"; //random pasword
        me.currentItem.role = 1; //mặc định là thêm người dùng
    },

    /**
    * hàm xử lý sự kiện cho các button
    * @created : quyetkaito 04/10/2022
    */
    buttonClick(action){
        let me = this;
        switch(action){
            case 'Close':
            case 'Cancel':
                me.hide();
                break;
            case 'Save':
                me.save();
                break;
            case 'Edit':
                me.edit();
                break;                
            default:
                break;            
        }        
    },
    
    edit(){
        let me = this;
        this.editMode = 'Edit';
        this.isViewing = false;   
        // focus vào ô đầu tiên 
        if(me.$refs.email && typeof me.$refs.email.focus == "function"){
            me.$refs.email.focus();
        }
    },


    /**
    * hàm xử lý cất dữ liệu
    * @created : quyetkaito 05/10/2022
    * @param {Boolean}  isClose : có đóng form sau khi cất hay không
    */
    async save(isClose){
        let me = this;
        if(!await me.validate()) return;
        //build object
        let obj = me.prepareDataBeforeSave();
        if(obj){
            me.$commonFunc.load();
            try {
                let method = 'POST';
                if(me.editMode == 'Edit') method = 'PUT';
                await UserAPI.request(UserAPI.urlName, method, obj).then((res)=>{                    
                    console.log(`res:`, res.data);
                    if(res && res.data && res.data.Data){
                        if(res.data.StatusCode == 201){
                            me.$store.commit("showSuccess", {
                                message: "Thêm mới thành công.",
                            });
                        }else if(res.data.StatusCode == 200){
                            me.$store.commit("showSuccess", {
                                message: "Thành công.",
                            });
                        }else if(![200, 201].includes(res.data.StatusCode)){
                            me.handleException(res);
                        }
                        if(isClose != false){
                            this.isShow = false; //ẩn form
                            //gọi parent reload lại danh sách
                            this.$parent.buttonClick('Refresh');
                        }
                    }else{
                        me.handleException(res);                        
                    }
                    me.$commonFunc.unload();
                })            
            } catch (error) {
                me.handleException(error);                
            }
            
        }        
    },

    async validate(){
        let me = this;
        if(!await me.validateComponent() || !await me.validateBusiness()) return false;
        return true;        
    },

    async validateComponent(){
        let me = this;
        //validate bỏ trống
        let valid = true;
        let listError = []; //chứa các refs input để tí focus hoặc gọi hàm trong MInput
        let message = "";
        if(me.currentItem){
            if(!me.currentItem.email){
                listError.push("email");
                valid = false;               
            }
            if(!me.currentItem.full_name){
                listError.push("fullname");
                valid = false;                
            }
            if(!me.currentItem.password){
                listError.push("password");
                valid = false;                
            }
            
        }
        if(listError && listError.length > 0){
            //set error đỏ cho các ô input
            for(let i = 0 ; i< listError.length ; i++){
                if(me.$refs[listError[i]] && typeof me.$refs[listError[i]].addError == "function"){
                    me.$refs[listError[i]].addError();
                }
            }
            if(typeof me.$refs[listError[0]].getTitle == "function"){
                message = me.$refs[listError[0]].getTitle() + " không được bỏ trống.";
            }
            //show message
            me.$store.commit("showError", {
                message: message,
            });
            me.focusAfterValidate(listError[0]);
        }
        return valid;
        //validate email       
    },

    /**
    * Hàm focus vào ô input khi validate có lỗi
    * @created : quyetkaito 05/10/2022
    */
    focusAfterValidate(ref){
        let me = this;        
        if(ref && me.$refs[ref] && typeof me.$refs[ref].focus == "function"){
            me.$refs[ref].focus();
            if(typeof me.$refs[ref].addError == 'function'){
                me.$refs[ref].addError();
            }
        }
    },

    /**
    * Validate nghiệp vụ khác
    * @created : quyetkaito 06/10/2022
    */
    async validateBusiness(){
        let me = this;
        //validate trùng email/username
        if(! me.$commonFunc.validateEmail(me.currentItem.email)){               
            me.$store.commit("showError", {
                message: "Email không hợp lệ.",
            });
            me.focusAfterValidate("email");         
            return false;           
        }
        return true;
    },

    prepareDataBeforeSave(){
        let me = this;
        if(me.currentItem){
            if(me.currentItem.date_of_birth){
              me.currentItem.date_of_birth = me.$commonFunc.setTimeZone(me.currentItem.date_of_birth);
            }
            return me.currentItem;
        }
    },

    hide(){
        let me = this;
        me.beforeHide();
        this.isShow = false;
        me.afterHide();
    },

    beforeHide(){
        //kiểm tra thay đổi các kiểu
        let me = this;
        if(me.$commonFunc.isDeepEqual(me.originalItem, me.currentItem)){
            console.log(`ko có thay đổi`);
        }else{
            if(confirm("Dữ liệu đã bị thay đổi. Bạn có muốn lưu không?")){
                console.log("Có lưu");
            }
        }
    },

    afterHide(){        
        this.currentItem = {};
        this.isViewing = false;
    },
    
    /**
    * hiện form lên
    * @created : quyetkaito 04/10/2022
    */
    show(editMode){
        let me = this;
        this.isShow = true;       
        if(editMode == 'Add'){
            me.initNewItem();
            me.originalItem = JSON.parse(JSON.stringify(me.currentItem));
        } 
        //focus vào ô nhập liệu đầu tiên
        if(editMode != 'View'){
            if(this.$refs.email && typeof this.$refs.email.focus == "function"){
                this.$refs.email.focus();
            }
        }
    },

    /**
    * Không cho chọn ngày lớn hơn hiện tại
    * @created : quyetkaito 04/10/2022
    */
    disabledDateBeforeToday(date ){
        return date > new Date();
    }
  }
}
</script>
<style scoped>
@import url("/src/style/common/dialog.css");
@import url("/src/style/common/custom-datepicker.css");
@import url("/src/style/page/employee-dialog.css");
.error{
  border-color: var(--danger-color)!important;
}
</style>