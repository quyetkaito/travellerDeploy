<template>
  <m-loading/>
  <!-- <m-message/> -->
  <router-view/> 
</template>

<script>
import firebase from "./firebase/firebaseInit";
import AuthAPI from "@/api/AuthAPI";
export default {
  name: "App",
  created(){
    // this.checkLogin();
  },
  methods: {
    /**
    * Check xem đã login hay chưa, nếu chưa thì quay về màn đăng nhập
    * @created : quyetkaito 13/10/2022
    */
    async checkLogin(){
      let me = this;
      let refreshToken = me.$cache.get('RefreshToken');
      let accessToken = me.$cache.get('AccessToken');
      if(refreshToken && accessToken){
        let tokenModel = {
          access_token: accessToken,
          refresh_token: refreshToken
        };
          //gọi lấy accessToken mới
        try {
          let res = await AuthAPI.request(AuthAPI.urlName+`/refresh_token`, 'POST', tokenModel);          
          if(res && res.accessToken && res.refreshToken){
            alert('lấy access token mới thành công');
          }
        } catch (error) {
          me.$store.commit('showInfo', {message: 'Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.', timeuot : 3000});
          this.$router.push({name: 'login'});    
        }
      }else{  
        this.$router.push({name: 'login'});
      }

    }
  },
}
</script>

<style>
/* import font */
@import url('https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz,wght@8..144,100;8..144,700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
@import url("/src/style/common/main.css");
@import url("/src/style/layout/header.css");
@import url("/src/style/common/icon.css");
@import url("/src/style/common/button.css");
@import url("/src/style/common/card.css");
@import url("/src/style/common/table.css");
@import url("/src/style/common/paging.css");
@import url("/src/style/common/input.css");
@import url("/src/style/common/checkbox.css");
@import url("/src/style/common/tooltip.css");
@import url("/src/style/common/loading.css");
@import url("/src/style/common/custom-dropdown.css");
@import url("/src/style/common/custom-combobox.css");
@import url("/src/style/common/custom-datepicker.css");
@import url("/src/style/common/custom-multiselect.css");
@import url("@/assets/fonts/fontawesome-5.15.1/css/all.min.css");
</style>

