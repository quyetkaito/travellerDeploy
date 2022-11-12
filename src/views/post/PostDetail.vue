<!--
File này là popup thêm mới bài viết
-->
<template>
     <!-- Dialog thêm mới -->
  <div class="m-popup" v-bind:class="{ show: isShow }" ref="dialog">
    <div class="m-popup-box h-625 w-800">
      <!-- Header -->
      <div class="m-popup-header header-post">
        <div>
            <div class="popup-title-text">{{formTitle}}</div>            
        </div>
        <div>          
            <div class="popup-close m-icon m-icon-24 m-close" @click="hide"></div>            
        </div>
      </div>
      <!-- Header end-->
      <div class="category-container flex">
            <div class="post-category-item" v-for="category in listCategory" v-bind:key="category">{{category.category_name}}</div>            
      </div>
      <!-- Form -->
      <div class="m-popup-body">
        <!-- Detail -->
        <div class="form-container">            
           <m-input     
                ref="content"            
                isTextArea
                :height="90"
                :maxHeight="300"
                :showLabel="false"
                placeholder="Viết bài..."
                v-model="currentItem.post_content"                
           />
           <div class="m-card flex align-center mt-2" style="height: 250px; width:100%;">
                <div class="choose-image-button flex m-card-bottom" @click="chooseImage" v-if="!hasImage && editMode!='Edit' || listImage?.length == 0">
                    <div class="mr-2" title="Chọn ảnh/ video"> <i class="fas fa-images" @click="chooseImage" title="Chọn ảnh"></i></div>
                    <div>Chọn ảnh/ video</div>
                </div>
                <div class="image-preview-container" v-if="listImage?.length > 0">
                    <Carousel :items-to-show="1">
                        <slide v-for="image in listImage" :key="image">                                        
                            <img :src="getSrc(image)" alt="" class="img-slide" @click="zoomImage">     
                            <div class="delete-button m-icon-24" title="Xóa ảnh này" @click="removeImage(image)"><i class="fas fa-times-circle"></i></div> 
                        </slide>                  
                        <template #addons>
                        <navigation v-if="listImage?.length > 1" />
                        <pagination v-if="listImage?.length > 1" />
                        </template>
                    </Carousel>
                </div>
                <!-- <img id="imagePreview" alt="image-preview" class="image-upload"> -->
           </div>
           <div class="m-card more-info">
                <div class="flex align-y-center">
                    <div class="mr-2">Thêm vào bài viết của bạn</div>
                    <div class="attachment-plus" title="Chọn ảnh/ video" @click="chooseImage"><i class="fas fa-images" title="Chọn ảnh"></i></div>
                    <div class="attachment-plus category" title="Thêm danh mục" @click="openCategory"><i class="fas fa-tags"></i></div>
                    <div class="attachment-plus location" title="Thêm địa điểm"><i class="fas fa-map-marker-alt"></i></div>
                </div>
           </div>
           <div class="attachment">                
                <input id="inputUpload" type="file" @change="uploadImage" style="display:none;" accept=".gif,.jpg,.jpeg,.png,.jfif"/>
           </div>    
           <div class="rating m-card">
                <div class="rating-box-title font-bold">Đánh giá chung</div>
                <div class="rating-component" ref="ratingComponent1">
                    <div class="rating-title mr-2">Cảnh đẹp</div>
                    <i class="rating-star fas fa-star mr-2" v-for="index in 5" :key="index" @click="starClick('Beauty',index)"></i>                    
                    <div class="rating-description">{{getRatingText(currentItem.beauty_star)}}</div>
                </div>
                <div class="rating-component" ref="ratingComponent2">
                    <div class="rating-title mr-2">Dịch vụ</div>
                    <i class="rating-star fas fa-star mr-2" v-for="index in 5" :key="index" @click="starClick('Service', index)"></i>                    
                    <div class="rating-description">{{getRatingText(currentItem.service_star)}}</div>
                </div>
            </div>       
        </div>
        <!-- Detail end-->

        <!-- Footer -->
        <div class="footer-container flex-grow">
          <div class="footer-line">
            <m-button 
                text="Đăng" 
                class="w-full" 
                :disabled="!currentItem.post_content" 
                :btnClass="!currentItem.post_content?'m-btn-second':'m-btn'"
                @click="saveFull"
            />            
          </div>
        </div>
        <!-- Footer end-->
      </div>
      <!-- Form end -->
    </div>
  </div>
  <category-detail ref="categoryDetail" @changeValue="getCategory"/>
</template>

<script>
import PostAPI from "@/api/PostAPI";
import { getStorage, ref, uploadBytes, getMetadata, getDownloadURL, list } from "firebase/storage";
const storage = getStorage();
import { v4 as uuidv4 } from 'uuid';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
//postcategory
import CategoryDetail from "@/views/category/CategoryDetail.vue";

export default {
    components:{
         /* eslint-disable vue/no-unused-components */        
        Carousel,        
        Slide,        
        Pagination,        
        Navigation,
        "category-detail": CategoryDetail,
    },
    data() {
        return {
            //currentItem.post_content: "", //nội dung của bài viết
            isShow: false, //popup có hiện ko
            listImage: [], //danh sách ảnh của bài viết
            hasImage: false,
            listCategory: [], //danh sách danh mục của bài viết
            formTitle: "Tạo bài viết",
            editMode: 'Add',
            currentItem: {}, //đối tượng post
            ratingText1: 'Tuyệt vời', //nội dung đánh giá 1
            ratingText2: 'Tuyệt vời'
        }
    },    
    created(){
        let me = this;
        me.initStaticData();        
    },
    methods:{       
        /**
         * Hàm khởi tạo dữ liệu tĩnh
         * @created : nvquyet
         */
        initStaticData(){
            let me = this;
            me.initNewItem();
        },

        initNewItem(){
            let me = this;
            me.currentItem.beauty_star = 5;
            me.currentItem.service_star = 5;
        },

        /**
         * Hàm xử lý rating
         * @param {Number} index
         * @param {String} key : đánh dấu là sao nào(dùng chung)
         */
        starClick(key, index){
            if(index != null && typeof index != "undefined"){
                let me = this;                  
                let component = null;
                if(key == 'Beauty') {
                    me.currentItem.beauty_star = index;
                    component = me.$refs.ratingComponent1 ;                    
                }
                if(key == 'Service') {
                    me.currentItem.service_star = index;
                    component = me.$refs.ratingComponent2;                      
                }
                if(component && component.querySelectorAll(`.rating-star`)){                    
                    //tìm tất cả các star
                    let listStar = component.querySelectorAll(`.rating-star`);
                    //set full màu như ban đầu
                    //set mất màu cho các index > index hiện tại
                    if(listStar && listStar.length > 0){
                        for(let i = 0; i < listStar.length; i++){
                            listStar[i].classList.remove('unselected');
                            if(i>index-1){
                                listStar[i].classList.add('unselected');
                            }
                        }
                    }
                }
            }
        },

        /**
         * Lấy text theo số sao
         * @param {Number} star : số sao
         */
        getRatingText(star){
            switch (star) {
                case 1:
                    return 'Tệ';
                case 2:
                    return 'Chưa tốt';
                case 3:
                    return 'Bình thường';
                case 4:
                    return 'Tốt';
                case 5:
                    return 'Tuyệt với';
                default:
                    return '';
            }
        },

        /**
         * hàm xử lý xóa 1 ảnh khỏi danh sách ảnh hiện tại
         */
        removeImage(image){
            if(image){
                this.listImage.splice(this.listImage.indexOf(image),1);
            }
        },

        /**
         * Hàm nhận emit từ categoryDetail.
         * @param {Array} list
         */
        getCategory(list){
            if(list && list.length > 0){
                this.listCategory = JSON.parse(JSON.stringify(list));
            }else{
                this.listCategory = [];
            }
        },

        openCategory(){
            this.$refs.categoryDetail.showQuickAdd();
            //xử lý binding dữ liệu hiện có lên combo
            if(this.listCategory && this.listCategory.length > 0){
                this.$refs.categoryDetail.bindingData(this.listCategory);
            }
        },

        chooseImage(){
            document.getElementById("inputUpload").click();
        },

        /**
         * hàm xử lý up ảnh lên firebase
         */
        uploadImage(e){    
            let me = this;
            const metadata = {
            contentType: 'image/jpeg',
            };
            if(me.$commonFunc.validateInputImage(e.target)){
            const storageRef = ref(storage, `image/${uuidv4()}.jpeg`);
            // Upload the file and metadata            
            const uploadTask = uploadBytes(storageRef, e.target.files[0], metadata).then(()=>{
                getDownloadURL(storageRef).then((x)=>{      
                debugger               
                this.listImage.push(x);
                this.hasImage = true;
                })            
            });
            // getMetadata(storageRef).then((metadata)=>{
            //     debugger
            // })

            }
        },

        /**
         * Chỉnh sửa bài viết
         */
        async editPost(){
            let me = this;
            if(!me.currentItem.post_content && !me.listImage) return; //nếu bài viết ko nội dung hoặc ko có ảnh nào thì ko cho lưu      
            me.$commonFunc.load();
            let obj = {
                post_id: me.currentItem.post_id,
                post_content: me.currentItem.post_content,
                author: me.$session.get('UserID'),                
                post_image: JSON.stringify(this.listImage),                
            }
            let res = await PostAPI.request(PostAPI.urlName, 'PUT', obj);
            if(res && res.data){
                if(res.data.StatusCode == 200){
                    console.log("Sua thành công");
                    //clear dữ liệu trong form và đóng popup
                    me.afterInsert();
                }else{
                    console.log("Thêm mới thất bại");
                }
            }
            me.$commonFunc.unload();
        },

        /**
         * Thêm mới bài viết
         */
        async savePost(){
            let me = this;
            if(!me.currentItem.post_content && !me.listImage) return;    
            if(me.editMode == 'Add'){
                me.$commonFunc.load();
                let obj = {
                    post_content: me.currentItem.post_content,
                    author: me.$session.get('UserID'),
                    posted_date: new Date(),
                    post_image: JSON.stringify(this.listImage),
                }
                let res = await PostAPI.request(PostAPI.urlName, 'POST', obj);
                if(res && res.data){
                    if(res.data.StatusCode == 201){
                        console.log("Thêm mới thành công");
                        //clear dữ liệu trong form và đóng popup
                        me.afterInsert();
                    }else{
                        console.log("Thêm mới thất bại");
                    }
                }
                me.$commonFunc.unload();                           
            }else{
                me.editPost();
            }        
        },

        /**
         * Hàm thêm mới có cả danh mục
         */
        async saveFull(){
            let me = this;
            if(!me.currentItem.post_content && !me.listImage) return;    
            if(me.editMode == 'Add'){
                me.$commonFunc.load();
                let obj = {
                    post:{
                        post_content: me.currentItem.post_content,
                        author: me.$session.get('UserID'),
                        posted_date: me.$commonFunc.setTimeZone(new Date()),
                        post_image: JSON.stringify(this.listImage)
                    },
                    categories:this.listCategory
                }
                let res = await PostAPI.request(PostAPI.urlName+"/save_full", 'POST', obj);
                if(res && res.data){
                    if(res.data.StatusCode == 201){
                        console.log("Thêm mới thành công");
                        //clear dữ liệu trong form và đóng popup
                        me.afterInsert();
                    }else{
                        console.log("Thêm mới thất bại");
                    }
                }
                me.$commonFunc.unload();                           
            }else{
                me.editFull();
            } 
        },

        async editFull(){
            let me = this;
            me.$commonFunc.load();
            let obj = {
                post:Object.assign(this.currentItem,{
                    post_content: me.currentItem.post_content,
                    post_image: JSON.stringify(this.listImage)
                }),
                categories:this.listCategory
            }
            let res = await PostAPI.request(PostAPI.urlName+"/save_full", 'PUT', obj);
            if(res && res.data){
                debugger
                if(res.data.StatusCode == 200){
                    console.log("Sửa thành công");
                    //clear dữ liệu trong form và đóng popup
                    me.afterInsert();
                }else{
                    console.log("Sửa thất bại");
                }
            }
            me.$commonFunc.unload();  
        },

        hide(){            
            this.isShow = false;
            if(this.editMode =='Edit'){
                this.resetForm();
            }
        },

        show(){
            this.isShow = true;
             this.editMode = 'Add';
             this.formTitle = "Tạo bài viết";
             this.listCategory = [];
             this.initNewItem();
            this.$nextTick(()=>{
                this.$refs.content.focus();
            })
        },

        /**
         * Show edit
         * @param {Object} post : thông tin bài viết
         * @param {Array} listCategory : category của bài viết này
         */
        showEdit(object, listCategory){
            this.isShow = true;
            this.editMode = 'Edit';
            this.$nextTick(()=>{
                this.$refs.content.focus();
            });            
            this.formTitle = "Chỉnh sửa bài viết";
            if(object){
                this.currentItem = JSON.parse(JSON.stringify(object));
                this.currentItem.post_content = object.post_content;
                this.starClick('Beauty', this.currentItem.beauty_star);
                this.starClick('Service', this.currentItem.service_star);
                this.listImage = object.post_image? JSON.parse(object.post_image) : [];                                
                this.listCategory = listCategory;
            }
        },

        afterInsert(){            
            this.currentItem = {};
            this.currentItem.post_content = '';
            this.hide();
            //gọi parent load lại data
            this.$parent.loadData(); 
            this.$eventBus.emit("gotoTop");           
        },

        resetForm(){
            this.currentItem = {};
            this.currentItem.post_content = '';
            this.listImage = [];
            this.editMode = 'Add';
        },

        getSrc(src){
            return src;
        }
    }
}
</script>

<style scoped lang="scss">
@import url("/src/style/common/dialog.css");
.form-container{
    overflow: auto;
    padding-right: 5px;
    .attachment{
        cursor: pointer;
    }

    .rating{
        .rating-component{
            display: flex;
            align-items:center;
            height: 40px;
            .rating-title{
                width: 70px;
            }
            .rating-star{
                font-size: 24px;       
                color: var(--warning-color);       
                cursor: pointer;                  
            }
            .rating-star.unselected{
                font-size: 24px;      
                color: var(--disabled-color);                                     
            }
            .rating-description{
                color: var(--warning-color);                         
            }
        }
    }
}

.form-container .fa-images{
  color: var(--default-color);
  font-size: 20px;
  cursor: pointer;
}

.form-container .choose-image{
    cursor: pointer;
}
.form-container .more-info{
    align-items: center;
}
.form-container .more-info .attachment-plus{
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;    
    margin-left: 2px;
    margin-right: 2px;
    cursor: pointer;
    border-radius: 10px;
    background: var(--bg-main);
}
.form-container .more-info .attachment-plus:hover{
    background: var(--input-border);
}

.attachment-plus.category{
    color: var(--info-color);
}

.attachment-plus.location{
    color: var(--warning-color);
}
.image-upload{
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.choose-image-button{
    cursor: pointer;
}
.choose-image-button:hover{
    background: var(--disabled-color);
}
.image-preview-container{
    height: 100%;
    width:100%;
}
.image-preview-container .img-slide{
    height: 230px!important;
}
.image-preview-container .carousel{
    height: 100%;
}
.image-preview-container .carousel .carousel_viewport{
    height: calc(100% - 15px);
}
.image-preview-container .carousel .carousel_viewport .carousel__slide{
    width: fit-content;
}
.category-container{
    margin-bottom: 3px;
}
.category-container .post-category-item{
    border-radius: 3px;
    background: #e5e5e5;
    font-size: 11px;
    cursor: pointer;
    padding: 3px 5px 3px 5px;
    margin-right: 2px;
}
.header-post{
    height: 35px!important;
}
.delete-button{
    position: absolute;
    top: 0;
    right: 10px;
}
.delete-button .fa-times-circle{
    font-size: 24px;
    color: red;
    cursor: pointer;
}
</style>