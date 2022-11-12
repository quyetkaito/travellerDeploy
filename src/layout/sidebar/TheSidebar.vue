<template>
  <!--Phần Sidebar(menu) bên tay trái -->
  <div
    class="m-sidebar"
    :style="[
      $store.state.isSideBarCollapse ? { width: '50px' } : { width: '178px' },
    ]"
  >
    <div class="m-sidebar__top" v-if="!$store.state.isSideBarCollapse">
      <div class="sidebar-top-home m-icon-24"><i class="fas fa-th icon-home"></i></div>  
      <div class="admin-text"></div>    
    </div>
    <div
      class="m-sidebar__top flex align-center"
      v-if="$store.state.isSideBarCollapse"
    >
      <div
        class="m-icon m-icon-24 m-three-stripes--white"
        title="Mở rộng sidebar"
        @click="openSideBar()"
      ></div>
    </div>
    <div class="m-sidebar__bottom">
      <div class="quick-add flex align-center" v-if="!$store.state.isSideBarCollapse && $store.state.showQuickAddPostButton">Thêm bài viết mới</div>
      <div v-for="(item, index) in sidebarItem" :key="index">
        <ms-sidebar-item
          ref="items"
          :visible="item.visible"
          :text="item.text"
          :icon="item.icon"
          :href="item.href"
          @click="handleActive(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MSSidebarItem from "@/layout/sidebar/MSSidebarItem.vue";
import router from '@/router';
export default {
  components: {
    "ms-sidebar-item": MSSidebarItem,
  },
  data() {
    return {
      sidebarItem: [
        {
          text: "Tổng quan",
          icon: '<i class="fas fa-tachometer-alt"></i>',
          href: "/dashboard",
        },
        {
          text: "Bài đăng",
          icon: '<i class="fas fa-photo-video"></i>',  
          href: "/post",        
        },
        {
          text: "Địa điểm",
          icon: '<i class="fas fa-map-marker-alt"></i>',  
          href: "/location",        
        },
        {
          text: "Quản lý danh mục",
          icon: '<i class="fas fa-th-large"></i>',  
          href: "/category",  
          visible: this.$session.get("UserRole") == this.$enum.UserRole.Admin,      
        },        
        //  {
        //   text: "Mã giảm giá/Voucher",
        //   icon: "m-sidebar-cash",  
        //   href: "/voucher",        
        // },
        {
          text: "Quản lý người dùng",
          icon: '<i class="fas fa-users"></i>',  
          href: "/user-list",        
          visible: this.$session.get("UserRole") == this.$enum.UserRole.Admin,   
        },        
        {
          text: "Thông tin cá nhân",
          icon: '<i class="fas fa-user"></i>',  
          href: "/user-info",        
        },
        {
          text: "Sang landingpage",
          icon: '<i class="fas fa-pager"></i>',  
          href: "/home",        
        },
        {
          text: "Cài đặt",
          icon: '<i class="fas fa-tools"></i>',  
          href: "/settings",        
        },
      ],
      myStyle: {
        width: "50px",
      },
    };
  },
  methods: {
    /**
     * Quay về trang chủ
     */
    goHome(){
        router.push({path:"/home"});
    },

    /**------------------------------------------------
     * Hàm thực hiện mở rộng sidebar nếu đang collapse
     * Author: quyetkaito (04/03/2022)
    ---------------------------------------------------*/
    openSideBar() {
      this.$store.state.isSideBarCollapse = false;
    },

    /**-------------------------------------
     * Xử lý khi sidebar item được [click].
     * @param {Number} index - số thứ tự của sidebarItem.
     * Author: quyetkaito (04/03/2022)
     --------------------------------------*/
    handleActive(index) {
      const me = this;
      //1.lấy ra danh sách các ref của sidebarItem
      var ref = me.$refs.items;
      //2.remove hết các class active của item khác
      for (var i = 0; i < ref.length; i++) {
        ref[i].removeActive();
      }
      //3.active item hiện tại
      ref[index].active();
    },
  },
};
</script>

<style>
.m-sidebar__bottom .quick-add{
    color: white;
    font-family: inherit;
    border: 3px solid #e5e5e5;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
     @apply shadow-sm;
    margin-right: 10px;
    padding: 10px;
}
.m-sidebar__bottom .quick-add:hover{
  background-color: #6d6d6d;
  color: var(--default-color);
}
</style>