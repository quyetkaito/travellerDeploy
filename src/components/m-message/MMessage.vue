<!--
===========================================================
FileName: MMessage.vue
Created: quyetkaito
Component hiển thị messagebox, có thể gọi ở mọi nơi, tham số truyền vào là text và loại cảnh báo, loại message
===========================================================
-->
<template>
  <div id="mMessage" class="m-message" ref="mMessage" v-if="isShow">
    <div class="m-message" >
    <div class="m-message-box message-444">
      <div class="m-message-box__body">
        <div class="m-message-context">
          <div class="m-message-icon">
            <div class="m-icon m-icon-48" :class="boxStyle"></div>
          </div>

          <!-- Nội dung của message -->
          <div class="m-message-text-container">
            <div class="m-message-text" id="messageContent">
              {{ messageContent_local }}
            </div>
          </div>
        </div>
      </div>
      <!-- Các Button bên dưới message -->
      <div class="m-message-box__footer">
        <div v-if="!type_local || type_local == $enum.PopupType.Notify || type_local == $enum.PopupType.DataError" class="flex align-x-center">
          <m-button text="Đóng" @click="hide()" ref="btnAutofocus" />
        </div>

        <div v-if="type_local == $enum.PopupType.Confirm" class="flex justify-end">          
          <div class="group-btn-popup">
            <m-button
              text="Không"
              btnClass="m-btn-second"
              style="margin-right: 10px"
              @click="noAnswer()"
            />
            <m-button text="Có" @click="yesAnswer()" />
          </div>
        </div>

        <div v-if="type_local == $enum.PopupType.DataDelete" class="flex justify-spacebetween">
          <m-button  text="Không" @click="hide()" />
          <m-button text="Có" @click="confirmDelete()" ref="btnAutofocus" />
        </div>

        <div v-if="type_local == 3" class="flex justify-end">
          <m-button
            text="Đồng ý"
            @click="hide()"
            ref="btnAutofocus"
          />
        </div>
      </div> 
    </div>
  </div>
  </div>
</template>

<script>
export default {
    props:{
        type:{
            type: Number,
            default: 0
        },
        messageContent:{
            type: String,
            default: "message-content",
        }
    },
  data() {
    return {
      text: 'text',
      isShow: false,
      messageContent_local: "",
      type_local: 5,
      //danh sách các icon và type của message
      message: [
        { type: this.$enum.PopupType.Notify, icon: "m-exclamation-info-48" }, //message[0] - xanh
        { type: this.$enum.PopupType.DataChange, icon: "m-exclamation-question-48" }, //message[1] - hỏi chấm
        { type: this.$enum.PopupType.DataDelete, icon: "m-exclamation-warning-48" }, //message[2] - cảnh báo
        {
          type: this.$enum.PopupType.DataDuplicate,
          icon: "m-exclamation-warning-48",
        }, //message[3] - cảnh báo trùng lặp dữ liệu
        { type: this.$enum.PopupType.DataError, icon: "m-exclamation-error-48-2" }, //message[4] - đỏ
      ],
    };
  },
  computed:{
     boxStyle(){
        if(this.type!=null){
            return this.message[this.type].icon;
        }else{
            return this.message[1].icon;
        }
    },    
  },
  methods: {
    noAnswer(){
      this.hide();      
    },
    yesAnswer(){
      this.hide();

    },
    /**------------------------------------------
    * Hiện message
    * @created : quyetkaito (29/09/2022)
    --------------------------------------------*/
    show(message) {      
      this.isShow = true;
      if(message){
        this.messageContent_local = message;
      }
      this.type_local = this.$enum.PopupType.Notify;
    },

    showConfirm(message){
      this.isShow = true;
      if(message){
        this.messageContent_local = message;
      }
      this.type_local = this.$enum.PopupType.Confirm;     
    },

    /**------------------------------------------
    * ẩn message
    * @created : quyetkaito (29/09/2022)
    --------------------------------------------*/
    hide() {
      this.isShow = false;       
    },
  },
};
</script>

<style>
@import url("@/style/common/messagebox.css");
</style>