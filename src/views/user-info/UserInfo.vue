<template>
  <div class="userinfo-container flex">
    <div class="w-1/3 overview">
      <div class="flex align-x-center">
        <div class="user-avatar mt-10 rounded-full">
           <input type="file" style="display: none;" id="choose-avt" ref="chooseAvt" @change="changeAvatar">
           <img id="userAvatar" ref="userAvatar" :src="imgSrc" alt="" class="rounded-full" @click="chooseAvatar">
        </div>
      </div>
      <div class="name flex align-x-center mt-4">{{currentItem.full_name}}</div>
    </div>  
    <div class="w-2/3 info-detail">
      <div class=" form-title flex align-y-center">
        <div class="mr-10 title">Thông tin cá nhân</div>
        <div class="btn-save">
          <m-button
            :text="$t('Save')"
            :type="typeButton"
            @click="saveInfo"
          ></m-button>
        </div>
      </div>
      
      <div class="m-form-field">
        <div class="form-item" style="width: 50%; margin-right: 10px;">
          <m-input
            :labelText="$t('Email')"
            v-model="currentItem.email"            
            :readonly="true"
            :isAutoFocus="true"
            :maxlength="20"
            placeholder=""
            :style="{ width: '100%' }"
            ref="email"            
          />
        </div>    
        <div class="form-item" style="width: 50%">
          <m-input
            :labelText="$t('Phone')"
            v-model="currentItem.phone"            
            :readonly="isViewing"
            :isAutoFocus="true"
            :maxlength="20"
            placeholder=""
            :style="{ width: '100%' }"
            ref="email"            
          />
        </div>              
      </div>
      <div class="m-form-field">
        <div class="form-item" style="width: 100%">
          <m-input
            :labelText="$t('FullName')"
            v-model="currentItem.full_name"            
            :readonly="isViewing"
            :isAutoFocus="true"
            :maxlength="20"
            placeholder=""
            :style="{ width: '100%' }"
            ref="email"            
          />
        </div>                  
      </div>
      <div class="m-form-field">
          <div class="form-item" style="padding-right: 6px; width: 40%">
            <m-label text="Ngày sinh" />
            <v-date-picker
              v-model:value="currentItem.date_of_birth"
              :format="$store.state.dateFormat"
              :placeholder="$store.state.dateFormat"
              :lang="$store.state.langString"
              :disabled-date="disabledDateBeforeToday"
              :clearable="false"
              title-format="DD/MM/YYYY"
            />
          </div>
          <div class="form-item" style="width: 60%; padding-left: 6px">
            <m-label text="Giới tính" />
            <div class="mt-3 m-field-gender">
              <m-radio v-model="currentItem.gender" :value="1" label="Nam"/>
              <m-radio v-model="currentItem.gender" :value="0" label="Nữ" />
              <m-radio v-model="currentItem.gender" :value="2" label="Khác"/>                      
            </div>
          </div>
      </div>
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
    </div>    
  </div>
</template>

<script>
import UserAPI from '@/api/UserAPI';
// import DatePicker
import NextDatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
import "vue-datepicker-next/locale/vi";
import { getStorage, ref, uploadBytes, getMetadata, getDownloadURL } from "firebase/storage";
const storage = getStorage();
import { v4 as uuidv4 } from 'uuid';

export default {
  components: {
    "v-date-picker": NextDatePicker,
  },
  data() {
    return {
      currentItem: {}, //thông tin user
      isViewing: false,
      originalItem: {}, //lưu lại để so sánh sự thay đổi
      typeButton: 'info',
      imgSrc: "",
    }
  }, 
  created(){
    this.getUserInfo();
  },
  mounted(){    
    this.imgSrc = this.currentItem.user_avatar_img ?this.currentItem.user_avatar_img :require(`@/assets/img/default-avatar.jpg`);
  },
  /**
  * Hàm xác nhận chuyển màn hình. Nếu chưa lưu thì hỏi có muốn lưu hay không.
  * @created : quyetkaito 12/10/2022
  */
  beforeRouteLeave(to, from, next){      
    let me = this;
    if(!me.$commonFunc.isDeepEqual(me.currentItem, me.originalItem)){
      if(confirm("bạn chưa lưu, có muốn chuyển không?")){
        next();
      }else{
        next(false);
      }
    }else{
      next();
    }
  },
  methods:{
    /**
    * Xử lý khi ảnh thay đổi
    * @created : quyetkaito 13/10/2022
    */
    changeAvatar(e){
        let me = this;
        const metadata = {
          contentType: 'image/jpeg',
        };
        if(me.$commonFunc.validateInputImage(e.target)){
          const storageRef = ref(storage, `image/${uuidv4()}.jpeg`);
          // Upload the file and metadata
          debugger
          const uploadTask = uploadBytes(storageRef, e.target.files[0], metadata).then(()=>{
            getDownloadURL(storageRef).then((x)=>{                    
               document.getElementById('userAvatar').style.display = 'block';           
               document.getElementById('userAvatar').src = x;
               me.$store.state.userAvatar = x;
               me.currentItem.user_avatar_img = x;
            })            
          });        
        }      
    },

    chooseAvatar(){
      let me = this;
      if(me.$refs.chooseAvt){
        me.$refs.chooseAvt.click();
      }
    },
    disabledDateBeforeToday(date){
        return date > new Date();
    },
    /**
    * Gọi APi lưu thông tin người dùng
    * @created : quyetkaito 12/10/2022
    */
    async saveInfo(){
      let me = this;
      if(me.currentItem && this.currentItem.user_id){
          //build object
          me.currentItem.date_of_birth = me.$commonFunc.setTimeZone(me.currentItem.date_of_birth);
          let res = await UserAPI.request(UserAPI.urlName, 'PUT', this.currentItem);
          if(res && res.data){                            
              me.$store.commit('showInfo', {message: res.data.UserMsg, timeout: 1200});
              me.typeButton = 'gray';
              me.currentItem.date_of_birth = new Date(me.currentItem.date_of_birth);
              me.$session.set('UserAvatar', me.currentItem.user_avatar_img);
          }else{
              me.$store.commit('showError', {message: res.data.UserMsg, timeout: 1200});
          }
      }
    },

    /**
    * Hàm lấy thông tin người dùng
    * @created : quyetkaito 12/10/2022
    */
    async getUserInfo(){
        try {
          let me = this;
          //lấy trong sesstion nếu có
          let userInfo = me.$session.get("UserInfo");
          if(userInfo){
              me.currentItem = userInfo;
              debugger
              if(me.currentItem.hasOwnProperty('date_of_birth')){
                  me.currentItem.date_of_birth = new Date(me.currentItem.date_of_birth);
              }
              if(me.currentItem.user_avatar_img){
                if(this.$refs.userAvatar){
                  this.$refs.userAvatar.src = me.currentItem.user_avatar_img;
                }
                me.$store.state.userAvatar = me.currentItem.user_avatar_img;
              }
              me.originalItem = JSON.parse(JSON.stringify(me.currentItem));
          }else{ //lấy tươi
            let userId = me.$session.get('UserID');          
            if(userId){
              let res = await UserAPI.request(UserAPI.urlName+`/${userId}`, 'GET');
              if(res && res.data){       
                 me.$session.set("UserInfo", res.data);                     
                 me.currentItem = JSON.parse(JSON.stringify(res.data));
                 if(me.currentItem.hasOwnProperty('date_of_birth')){
                    me.currentItem.date_of_birth = new Date(me.currentItem.date_of_birth);
                 }
                 if(me.currentItem.user_avatar_img){
                    document.getElementById('userAvatar').src = me.currentItem.user_avatar_img;
                    me.$store.state.userAvatar = me.currentItem.user_avatar_img;
                 }
                 me.originalItem = JSON.parse(JSON.stringify(me.currentItem));
              }
            }
          }
        } catch (error) {
          console.error(error)
        }
    }
  }
}
</script>

<style scoped>
.m-form-field {
    display: flex;
    width: 100%;
    padding-bottom: 12px;
}

.form-item {
    box-sizing: border-box;
}
.userinfo-container {
  height: 100%;
}

.userinfo-container .overview{
  border-right: 2px solid #918e8e;  
}

.userinfo-container .overview .name{
  font-weight: bold;
}

.userinfo-container .info-detail{
  padding: 10px;
}

.user-avatar{
  width: 200px;
  height: 200px;
  border: 5px solid #16d6e4;  
}
.info-detail .form-title{
  margin-bottom: 10px;
}
.info-detail .btn-save{
  text-align: left;
}
.info-detail .title{
  font-weight: bold;
  font-size: 30px;
}
.user-avatar img{
  object-fit: cover;
  width: 100%;
  height: 100%;

}
</style>