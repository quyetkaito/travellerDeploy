<template>
  <m-dialog-container ref="transactionDialog" :boxStyle="boxStyle" :dialogStyle="dialogStyle">
        <template v-slot:header>
            <div class="m-dialog-header">
                <div class="m-dialog-header__left">
                    <div class="title-container">
                        <div class="dialog-title-text">{{ formTitle }}</div>
                    </div>
                </div>
                <div class="m-dialog-header__right flex-end">
                    <div class="button-box mr-2">
                        <div class="m-icon m-icon-24 m-help__nav"></div>
                    </div>
                    <div class="button-box" @click="buttonClick('Cancel')">
                        <div class="m-icon m-icon-24 m-close"></div>
                    </div>
                </div>
            </div>         
        </template>
        <template v-slot:body>
            <div class="grid grid-cols-4 gap-4">
                <div><m-label text="Wallet"/>
                     <v-multiselect
                        ref="wallet"
                        v-model="currentItem.wallet"
                        :options="[
                        { label: 'Batman', value: 1 },
                        { label: 'Hello', value: 2 },
                        ]"
                        mode="single"
                        close-on-select
                        clearOnSelect
                        searchable
                        noResultsText="Không có dữ liệu hiển thị"
                        :disabled="false"
                        placeholder="chọn đi"
                        :canClear="false"
                    />
                </div>
                <div><m-input ref="category" labelText="Category" v-model="currentItem.category"/></div>
                <div><m-input ref="amount" isNumberInput labelText="Amount" style="text-align: left;" v-model="currentItem.amount"/></div>
                <div>              
                    <m-label text="Date"/>      
                     <v-date-picker
                     ref="date"
                      v-model:value="currentItem.date"
                      :format="$enum.DateFormat"
                      placeholder="Ngày giao dịch"
                      :lang="$enum.LangString.vi"                      
                      :clearable="false"
                    />
                </div>                
                <div class="col-span-4"><m-input ref="note" labelText="Note" isTextArea height="160" v-model="currentItem.note"/></div>
            </div>
        </template>
        <template v-slot:footer>
             <div class="grid grid-cols-3 gap-4">
                 <div class="col-end-7 flex pt-4">
                    <div class="mr-2"><m-button text="CANCEL" type="secondary" @click="buttonClick('Cancel')"/></div>
                    <div><m-button text="SAVE" type="primary" @click="buttonClick('Save')"/></div>
                </div>
            </div>      
        </template>
  </m-dialog-container>
</template>

<script>
import BaseDialog from '@/components/m-dialog/BaseDialog.vue';
//combobox
import vMultiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
// import DatePicker
import NextDatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/vi";

export default {
    extends: BaseDialog,
    components:{
        "v-multiselect": vMultiselect,
        "v-date-picker": NextDatePicker,
    },
    data() {
        return {            
            boxStyle:"height:fit-content!important; margin-top: 48px; max-height: calc(100vh - 100px);",
            dialogStyle:"align-items:flex-start!important;",
            //đối tượng hiện tại đang xử lý
            currentItem:{
                wallet: null,
            }
        }
    },
    created(){
        this.initStaticData();
    },

    methods:{
        /**------------------------------------------
        * Hàm khởi tạo dữ liệu tĩnh
        * @created : quyetkaito (25/06/2022)
        --------------------------------------------*/
        initStaticData(){
            let me = this;
            me.formTitle = "Thông tin giao dịch";
            me.formMode = me.$enum.FormMode.Insert;
        },
        
        /**------------------------------------------
        * Hàm show dialog
        * @created : quyetkaito (18/06/2022)
        --------------------------------------------*/
        show(object){
            let me = this;
            this.$refs['transactionDialog'].show();
            //focus vào ô input đầu tiên
            if(me.$refs.wallet){
                me.$refs.wallet.$el.children[0].focus(); //chưa được
            }
            this.processDataBeforeShow(object);
        },

        /**------------------------------------------
        * Ẩn dialog
        * @created : quyetkaito (18/06/2022)
        --------------------------------------------*/
        hide(){
            this.$refs['transactionDialog'].hide();
        },

        /**------------------------------------------
        * Hàm xử lý data trước khi show
        * @created : quyetkaito (25/06/2022)
        --------------------------------------------*/
        processDataBeforeShow(object){
            let me = this;
            if(object){
                me.currentItem = object;
            }
            if(me.formMode == me.$enum.FormMode.Insert){
                me.currentItem.amount = 0;
            }
        },

        /**------------------------------------------
        *  Xử lý khi button được click
        * @param {String} action: sự kiện cho button
        * @created : quyetkaito (16/06/2022)
        --------------------------------------------*/
        buttonClick(action){            
            switch(action){
                case 'Cancel':{
                    this.hide(); break;
                }
                case 'Save':{
                    this.focusFirstInput();
                    this.save();
                    break;
                }
                default: {
                    return;                    
                }
            }            
        },

        /**------------------------------------------
        * Hàm thực hiện xử lý khi bắt đầu lưu dữ liệu
        * @created : quyetkaito (25/06/2022)
        --------------------------------------------*/
        save(){
            //build object
            let me = this;
            me.$commonFunc.load();
            let object = me.currentItem;
            //tính toán lại giá trị dạng số
            console.log(`object: `, object);
            //validate
            //gọi api
            //xử lý kết quả trả về
            me.$emit("save",me.currentItem);
            //đóng dialog
            me.hide();
            // me.$commonFunc.unload();
        },



        /**------------------------------------------
        * Hàm thực hiện focus vào ô input đầu tiên khi mở form
        * @created : quyetkaito (18/06/2022)
        --------------------------------------------*/
        focusFirstInput(){
            //tìm ô input đầu tiên trong form
            let firstInput = this.$refs['category'];
            if(firstInput){
                try {
                    firstInput.focus();
                } catch (error) {
                    console.log(error)
                }
                
            }
        }
    }
}
</script>

<style>
@import url('@/style/common/base-dialog.css');
</style>