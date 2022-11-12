<template>
  <div class="post-list">    
    <div class="action-area">  
        <div class="add-post m-card">
          <div class="flex align-y-center">
            <div class="avatar rounded-full">
                <img :src="getSrc(userAvatar)" alt="" class="avatar-image rounded-full">
            </div>
            <div class="input">
                <input type="text" class="input-add-post" placeholder="Chia sẻ trải nghiệm của bạn..." @click="openPostDetail">
            </div>
            <div class="mr-2 ml-2">
               <i class="fas fa-images" @click="openPostDetail" title="Chọn ảnh"></i>
            </div>
          </div>          
        </div>
    </div>
<!-- Phần list các bài viết -->
    <div class="grid grid-cols-1 gap-4">
        <post-card v-for="post in listPosts" v-bind:key="post.entity.post_id" 
          :post="post.entity"
          :listComment="post.listComment"
          :listCategory="post.listCategories"
          @removeItem="handleRemoveItem"
        /> 
        <div v-if="listPosts.length == 0">
           <m-spin/>
        </div>       
    </div>    
  </div>
  <post-detail ref="postDetail"/>  
</template>

<script>
import PostEditorDetail from "@/views/post/PostEditorDetail.vue";
import PostCard from "@/views/post/PostCard.vue";
import PostAPI from '@/api/PostAPI';
import PostDetail from "@/views/post/PostDetail.vue";


export default {
  name: "PostList",
  components:{
    // "post-editor": PostEditorDetail
    "post-card": PostCard,
    "post-detail": PostDetail,    
  },
  data() {
    return {
      listPosts: [], //danh sách các bài viết,
      pageNumber: 1, //trang số mấy
      pageSize: 10, //10 bản ghi 1 trang
      imagePreview: "",
      userAvatar: this.$session.get('UserAvatar'),
    }
  },
  mounted(){
    this.$eventBus.on('test', e=> {
        this.loadData(e);
    });
    this.$eventBus.on('myPost', e=> {
        this.loadData(e);
    });
    this.$eventBus.on('nextPage', e=> {
        this.loadNextData(e);
    });
  },
  created(){
    let me = this;
    me.initStaticData();
  },
  methods:{
    /**
     * Mở form thêm mới bài viết
     */
    openPostDetail(){
      //check login
      if(this.$session.get('UserID')){
        this.$refs.postDetail.show();
      }else{
        this.$store.commit('showInfo', {message: "Vui lòng đăng nhập để thực hiện tính năng này."});
      }
    },

    /**
     * Mở form chỉnh sửa
     * @param {Object} post : thông tin bài viết
     * @param {Array} listCategory : category của bài viết này
     */
    openPostEdit(object, listCategory){
        //check login        
      if(this.$session.get('UserID')){
        this.$refs.postDetail.showEdit(object, listCategory);
      }else{
        this.$store.commit('showInfo', {message: "Vui lòng đăng nhập để thực hiện tính năng này."});
      }
    },


    /**
    * Binding image source
    * @created : quyetkaito 16/10/2022
    */
    getSrc(src){
        if(src){
            return src;
        }else{
            return require("@/assets/img/default-avatar.jpg");
        }
    },


    /**
    * hàm khởi tạo dữ liệu tĩnh
    * @created : quyetkaito 14/10/2022
    */
    async initStaticData(){
        let me = this;        
        me.loadData();
        // let res = await PostAPI.request(PostAPI.urlName+"/post_detail_paging", 'GET'); //lấy chi tiết các bài viết + comment của nó
        // if(res && res.data){
        //   // if(res.data.Data){
        //   //   this.listPosts = res.data.Data;
        //   // }
        //   if(res.data.ListPostDetail){
        //     this.listPosts = res.data.ListPostDetail;
        //   }
        // }
    },

    buttonClick(action){
      let me = this;
      switch (action) {
        case 'Add':
          this.$router.push({name: 'PostEditor'});
          break;
      
        default:
          break;
      }
    },

    /**
    * Xử lý khi xóa item thành công và emit ra danh sách
    * @created : quyetkaito 15/10/2022
    */
    handleRemoveItem(post){
        if(post){          
           let pos = this.listPosts.find(x=>x.post_id == post.post_id);
           if(pos){             
             this.listPosts.splice(this.listPosts.indexOf(pos), 1); //loại khỏi danh sách hiện tại
           }
        }
    },

    /**
    * Hàm lấy dữ liệu các bài viết, kèm 10 bình luận đầu tiên của nó
    * @created : quyetkaito 16/10/2022
    */
    async loadData(textSearch){
      let me = this;        
      if(!textSearch) textSearch = "";
      let res = await PostAPI.request(PostAPI.urlName+`/post_detail_paging?textSearch=${textSearch}&pagNumber=${me.pageNumber}&pageSize=${me.pageSize}`, 'GET'); //lấy chi tiết các bài viết + comment của nó
      if(res && res.data){                
        if(res.data.ListPostDetail){
          this.listPosts = res.data.ListPostDetail;          
        }
      }
    },

    /**
    * Hàm gọi api lấy tiếp dữ liệu
    * @created : quyetkaito 16/10/2022
    */
    async loadNextData(textSearch){
      let me = this;        
      if(!textSearch) textSearch = "";
      me.pageNumber += 1;
      let res = await PostAPI.request(PostAPI.urlName+`/post_detail_paging?textSearch=${textSearch}&pageNumber=${me.pageNumber}&pageSize=${me.pageSize}`, 'GET'); //lấy chi tiết các bài viết + comment của nó
      if(res && res.data){        
        if(res.data.ListPostDetail){
          me.listPosts = me.listPosts.concat(res.data.ListPostDetail);
        }
      }
    }
  }

}
</script>

<style>
.post-list{
  padding: 10px;
}
.action-area .image-upload{
  width: 100%;
  height: 100%;
  max-height: 300px;
  object-fit: contain;
}
.action-area .input{
  flex-grow: 1;
  margin-right: 10px;
}
.action-area .input-add-post{
  height: 40px;
  border-radius: 30px;
  font-size: 15px;
  width: 100%;
  outline: none;    
  padding-left: 20px;
  background: #f4f7fc;
  margin-left: 10px;
}
.action-area .add-post .avatar-image{
  object-fit: cover;
  width: 100%;
  height: 100%;  
}
.add-post .avatar{
  width: 50px;
  height: 50px;  
  border: 2px solid var(--info-color);
}
.add-post .fa-images{
  color: var(--default-color);
  font-size: 20px;
  cursor: pointer;
}
#imagePreview{
  display: none;
}
</style>