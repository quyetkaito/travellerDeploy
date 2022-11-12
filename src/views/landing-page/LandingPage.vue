<template>
<div id="landingPage" ref="landingPage" class="landing-page" @scroll="lazyLoading">
  <div class="navbar-container">
    <nav-bar />
  </div>
  <div class="main-content-container">
    <div class="flex">
      <div class="filter-container w-1/4">          
          <div class="filter-item" @click="gotoMyPost">
            <i class="fas fa-book-open my-post"></i>
            <div>Bài viết của bạn</div>
          </div>
          <div class="filter-item" @click="getHotPlace">
            <i class="fab fa-hotjar hot-place"></i>
            <div>Các địa điểm đang hot</div>
          </div>
          <div class="filter-item">
            <i class="fas fa-map-marker-alt location"></i>
            <div>Lọc theo khu vực</div>
          </div>
          <div class="filter-item" @click="test">Lọc theo tỉnh huyện</div>
          <div class="filter-item" @click="test">Lịch sử tìm kiếm</div>
          <div class="filter-item" @click="gotoAdmin" v-if="$session.get('UserRole') == $enum.UserRole.Admin">Cài đặt</div>
      </div>
      <div class="post-container">
        <router-view :key="$route"/>
        <!-- <post-list/> -->
      </div> 
      <div class="w-1/4 more-content">
        <div class="title">Kinh nghiệm du lịch</div>
        <div class="new-container">
          <post-item v-for="(item,index) in listNews" :key="index" :post="item"/>
        </div>
      </div>     
    </div>    
  </div>
  <post-image-viewer ref="postImageViewer"/>
</div>
</template>

<script>
import vClickOutside from "click-outside-vue3";
import Navbar from "@/layout/TheNavbar.vue";
import PostItem from "@/views/post/PostItem.vue";
import PostList from "@/views/post/PostList.vue";
import PostImageViewer from "@/views/post/PostImageViewer.vue";
import PostAPI from "@/api/PostAPI"
export default {
  name: "LandingPage",
  components: {
    /* eslint-disable */
    "post-item": PostItem,
    "nav-bar": Navbar,
    "post-list": PostList,
    "post-image-viewer": PostImageViewer,
  },
  //click ra ngoài để đóng combobox options.
  directives: {
    clickOutside: vClickOutside.directive,
  },  
  data() {
    return {
      listNews: [],
    }
  },
  mounted(){
    this.$eventBus.on('gotoTop', e=> {
        this.scrollTop(e);
    });  
    this.getNews();  
  },
  methods: {
    test(){
      this.$router.push("search-history");
    },

    /**
     * hàm lấy danh sách địa điểm đang hot
     */
    getHotPlace(){
       this.$router.push({name: 'postFilterList', params: {title: 'Các địa điểm đang hot', filterKey: 'hotPlace'}});
    },

    /**
    * Lấy thông tin tin tức gắn vào phần nội dung bên phải
    * @created : quyetkaito 07/11/2022
    */
    async getNews(){
      try {
          let res = await PostAPI.request(PostAPI.urlName+"/experience_post", 'GET');
          if(res && res.data){
              this.listNews = res.data;
          }
      } catch (error) {
        console.error(error)
      }
      
    },

    gotoMyPost(){
        // this.$eventBus.emit('myPost', this.textSearch);
    },

    back() {
      this.$router.push("/post");
    },

    gotoAdmin(){
      this.$router.push("/dashboard");
    },

    /**
    * Thực hiện get tiếp dữ liệu nếu tới cuối trang
    * @created : quyetkaito 16/10/2022
    */
    async lazyLoading(){            
      if(this.$route && this.$route.name == 'postList'){ //chỉ lazy cho trang bài viết
        var myDiv = document.getElementById("landingPage");
        var total = myDiv.clientHeight + Math.floor(myDiv.scrollTop);
        if (total == myDiv.scrollHeight || total == myDiv.scrollHeight - 1) {
          // console.log("đang ở bottom");
          await this.$eventBus.emit('nextPage', this.textSearch);
        }
      }
    },

    /**
     * Xử lý scroll lên top
     */
    scrollTop(){
      document.getElementById("landingPage").scrollTo(0,0);
    }

  },
};
</script>

<style lang="scss">
.landing-page{
   /* max-height: 720px;
   height: 720px; */
   height: 100vh;
  overflow: auto;
  background: #F5F5F5;
  .navbar-container{
    @apply shadow-md;  
  }
  .main-content-container{
    /* padding-right: 100px;*/
    box-sizing: border-box;
    background: #F5F5F5;
    padding-top: 56px;

    .filter-container{
      position: fixed; 
      box-sizing: border-box;

      .filter-item{
        display: flex;
        padding: 10px;
        cursor: pointer;
        width: 100%;
        height: 48px;
        align-items: center;
        border-radius: 8px;

        i{
          margin-right: 10px;
          font-size: 30px;
        }

        .hot-place{
          color: #FE6501;
        }

        .my-post{
          color: var(--info-color);
        }

        .location{
          color: var(--default-color);
        }
      }
      .filter-item:hover{
        background: #E4E6E9;
      }       
    }

    .post-container {
      width: 100%;
      padding-left: 25%;
      padding-right: 30%;
    }
    .more-content{
       position: fixed;
       right: 10px;       

       .title{
          margin-top: 5px;
          font-weight: 600;
          font-size: 20px;
       }

       .new-container{
         overflow: auto; 
          height: calc(100vh - 100px);   
          padding-right: 5px; 
          box-sizing: border-box;             
       }   
       .new-container:hover::-webkit-scrollbar-thumb{
         visibility: visible;
       }
       .new-container::-webkit-scrollbar {
          width: 5px;
          height: 5px;
          background-color: #e5e5e5;
        }
        .new-container::-webkit-scrollbar-thumb {
          background-color: #b8bcc3;
          border-radius: 5px;
          height: 4px;
          visibility: hidden;
        }

        .new-container::-webkit-scrollbar-thumb:hover {
          background-color: #888888;          
        }
    }
  } 
}

</style>