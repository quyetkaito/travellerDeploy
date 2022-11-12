<template>
  <!-- Header Container -->
  <div class="header">
    <div class="header-left">
      <div
        v-if="!$store.state.isSideBarCollapse"
        class="m-icon m-icon-24 m-three-stripes m-toggle"
        title="Thu gọn Sidebar"
        @click="collapseSideBar()"
      ></div>
    </div>
    <div class="header-right">
      <!-- <div class="m-icon m-icon-24 m-bell__nav" @click="translateWebsite"></div> -->
      <div class="header-right-avatar" @click="gotoUserInfo">
        <div class="user-avatar rounded-full">
            <img :src="getSrc(src)" alt="" class="user-image rounded-full">
        </div> 
      </div>
      <div class="header-right-username"  @click="gotoUserInfo">{{ userName }}</div>      
      <div class="m-2">
      <m-button type="secondary" :text="$t('Logout')" @click="logOut"></m-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      branchText: "Công ty cổ phần Quyết Kaito",
      userName: "Thông tin người dùng",
      src: null,
    };
  },
  created(){
    this.initStaticData();
  }, 

  methods: {
    /**
    * Sang màn hình chi tiết thông tin cá nhân
    * @created : quyetkaito 12/10/2022
    */
    gotoUserInfo(){
        let me = this;
        me.$router.push({name: 'UserInfo'});
    },

    initStaticData(){
        let name = this.$session.get('FullName');
        if(name){
          this.userName = name;
        }
    },

    /**
    * Xử lý đăng xuất
    * @created : quyetkaito 08/10/2022
    */
    logOut(){
      let me = this;
       if(confirm("Bạn có thực sự muốn đăng xuất.")){
          me.$session.clear(); //xóa phiên
          me.$cache.remove('AccessToken');
          me.$cache.remove('RefreshToken');
          me.$router.push({name: "login"});
       }
    },

    /**-------------------------------
     * Hàm thực hiện thu gọn sidebar.
     * Author: quyetkaito (03/03/2022)
     ---------------------------------*/
    collapseSideBar() {
      this.$store.state.isSideBarCollapse = true;
    },

    /**
    * Thay đổi ngôn ngữ website //hàm này chưa xong
    * @created : quyetkaito 02/10/2022
    */
    translateWebsite(){
      let me = this;      
      // if(me.$i18n && me.$i18n.options){
      //   if(me.$i18n.options.locale == "vn" ){
      //     me.$i18n.changeLocale('en');
      //     me.$store.state.locale = "en";
      //   }else{
      //     me.$i18n.changeLocale('vn');
      //     me.$store.state.locale = "vn";
      //   }
      // }
    },

    getSrc(src){
      if(this.$session.get("UserAvatar")){
        return this.$session.get("UserAvatar")
      }else{
       return require("@/assets/img/default-avatar.jpg");
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.user-avatar{
  width: 30px;
  height: 30px; 
  min-width: 30px;   
  min-height: 30px;         
  cursor: pointer;
  .user-image{
    width:100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>