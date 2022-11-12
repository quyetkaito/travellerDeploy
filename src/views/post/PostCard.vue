<template>
  <div class="m-card post-card">
    <div class="post__header flex">
        <div class="author-info flex">
            <div class="post-author-image rounded-full"><img :src="getSrc(post.user_avatar_img)" alt="" class="img-author rounded-full"></div>
            <div>
                <div class="post-author">{{post.author_name}}</div>
                <div class="post-date">{{$commonFunc.formatDateTime(post.posted_date)}}</div> <!--nếu là ngày hôm nay thì hiện giờ, nếu khác thì hiện ngày tháng-->
            </div>
        </div>
        <div class="collapse-button flex align-center" v-if="isExpand" @click="collapseContent">Thu gọn nội dung</div>
        <div class="flex align-center" v-if="userID == post.author">
            <i class="fas fa-edit edit_icon mr-1" @click="handleEdit" v-if="editMode!='Edit'"></i>
            <i class="fas fa-trash-alt trash-icon action_icon" style="color: red;" @click="handleDelete"></i>
            <div class="m-icon m-icon-24 m-extension" title="tính năng mở rộng"></div>            
        </div>
    </div>
    <div class="post__content">
        <div class="post_category flex">            
            <!-- <div class="post-category-item">Tây Bắc</div> -->
            <div class="post-category-item" v-for="(category, index) in listCategory" :key="index">{{category.category_name}}</div>
        </div>
        <div v-if="editMode!='Edit'" class="post-content-text" style="white-space: pre-wrap;" :class="{'non-max-height': isExpand}">{{post.post_content}}</div>
        <div class="expand-button" @click="expandContent" v-if="!isExpand && post.post_content.length > 500">Đọc tiếp</div>
         <div class="collapse-button" v-if="isExpand" @click="collapseContent">Thu gọn</div>
        <div v-if="editMode=='Edit'">
            <textarea ref="postContent" name="postContent" class="post-content-editor" v-model="post_temp.post_content"></textarea>    
        </div>        
    </div>
    <div class="m-card-gray-bottom post__image" v-if="listPostImage.length > 0">
        <Carousel :items-to-show="1">
            <slide v-for="image in listPostImage" :key="image">                                        
                <img :src="getSrc(image)" alt="" class="img-slide" @dblclick="zoomImage(image)" title="click đúp để xem ảnh to">      
            </slide>                  
            <template #addons>
            <navigation v-if="listPostImage.length > 1" />
            <pagination v-if="listPostImage.length > 1" />
            </template>
        </Carousel>
    </div>  
    <div class="post__action_counter flex">
        <div class="flex">
            <div class="m-icon-like m-icon-24"></div>
            <div class="reaction-counter">{{post_temp.like_count >0 ? post_temp.like_count : 'Bày tỏ cảm xúc'}}</div>
        </div>
        <div class="flex">
            <div class="comment-counter" @click="commentClick">{{listComment_temp.length}} bình luận</div>
            <div class="share-counter">2 lượt chia sẻ</div>
        </div>        
    </div>
    <div class="post_action">
        <div class="flex" v-if="editMode!='Edit'">
            <div class="button-action button-like w-1/3 p-1 flex align-center" @click="handleLike()">
                <div class="m-like mr-1" v-if="!isLiked"></div>
                <div class="m-liked mr-1" v-if="isLiked"></div>
                <div ref="buttonLike" class="button-like-text" :class="{'liked': isLiked}">Thích</div>
            </div>
            <div class="button-action button-comment w-1/3 p-1 flex align-center" @click="commentClick">
                <div class="m-fb-icon m-comment m-icon-24 mr-1"></div>
                <div>Bình luận</div>
            </div>
            <div class="button-action button-share w-1/3 p-1 flex align-center">
                <div class="m-fb-icon m-share m-icon-24 mr-1"></div>
                <div>Chia sẻ</div>
            </div>
        </div>
        <div v-if="editMode == 'Edit'">
            <div class="flex">
                <m-button
                    ref="buttonSave"
                    type="info"
                    text="Lưu"
                    class="button-save mr-2"
                    @click="handleSave"
                />
                <m-button
                    ref="buttonSave"
                    type="secondary"
                    text="Hủy"
                    class="button-save"
                    @click="handleCancel"
                />
            </div>
        </div>
    </div>
    <div class="post__comment" v-if="editMode!='Edit'">
        <div class="comment-write flex align-center">            
            <input                 
                ref="inputComment" 
                v-model="newComment"
                type="text"
                class="input-comment"
                placeholder="Viết bình luận..."
                @keyup.enter="enterComment"
                @keyup="handleTyping"/>
        </div>
        <div class="comment-write flex align-center" v-if="editCommentMode">  
            <div class="user-avatar rounded-full mr-2">
                <img :src="getSrc(userAvatar)" alt="" class="comment-avatar rounded-full">
            </div>         
            <input                 
                ref="inputCommentEdit" 
                v-model="commentContent"
                type="text"
                class="input-comment"
                placeholder="Viết bình luận..."
                @keyup.enter="updateComment"
                @keyup="handleTyping"/>
            <div class="btn-cancel" @click="cancelEditComment">Hủy bỏ</div>
        </div>
        <div class="comment-list">
            <div class="comment-item flex" v-for="comment in listComment_temp" v-bind:key="comment.comment_id">
                <div class="user-avatar rounded-full">
                    <img :src="getSrc(comment.user_avatar_img)" alt="" class="comment-avatar rounded-full">
                </div>
                <div>
                    <div class="comment-box ml-1">
                        <div class="user-name">{{comment.full_name? comment.full_name : 'Ẩn danh'}}</div>
                        <div class="user-comment">{{comment.comment_content}}</div>
                    </div>
                    <div class="comment-action flex">
                        <div class="btn-like-comment mr-2" @click="likeComment">Thích</div>
                        <div class="btn-reply mr-3">Phản hồi</div>
                        <div class="btn-reply mr-3" @click="editComment(comment)" v-if="userID == comment.user_id">Chỉnh sửa</div>
                        <div class="btn-reply mr-3" @click="deleteComment(comment)" v-if="userID == post.author">Xóa</div>
                        <!-- <div class="comment-time">{{$commonFunc.formatDateTime(comment.created_date)}}</div> -->
                        <div class="comment-time">{{$commonFunc.formatDateTime(comment.modified_date)}}</div>
                    </div>
                </div>
                <div class=""></div>
            </div>
        </div>
    </div>    
  </div>  
  <m-message ref="mMessage"/>
  <image-view-full ref="imageViewer"/>
</template>

<script>
import PostAPI from "@/api/PostAPI";
import CommentAPI from "@/api/CommentAPI"
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import ImageViewFull from "@/views/post/ImageViewFull.vue";
export default {
    emits:[
        "removeItem"
    ],
    components:{
        /* eslint-disable vue/no-unused-components */        
        Carousel,        
        Slide,        
        Pagination,        
        Navigation,
        "image-view-full": ImageViewFull,
    },
    props:{
        post:{
            type: Object,
            default: ()=>{}
        },
        listComment:{
            type: Array,
            default: ()=>[]
        },
        listCategory:{
            type: Array,
            default: ()=>[]
        }
    },
    data() {
        return {
            isLiked: false,
            editMode: 'View',
            post_temp: this.post ? this.post : {},
            newComment: "",
            listComment_temp: this.listComment? this.listComment : [],
            userID: this.$session.get('UserID'),
            userAvatar: this.$session.get("UserAvatar"),
            fullName: this.$session.get('FullName'),
            listPostImage: this.post.post_image? JSON.parse(this.post.post_image) : [],            
            //listPostImage: ["https://picsum.photos/200/300", "https://picsum.photos/id/237/200/300"]        
            editCommentMode: false,    
            commentContent: '', // vmodel cho chỉnh sửa comment
            currentComment: {},
            isExpand: false,            
        }
    },
    methods:{
        /**
        * Hàm thu gọn nội dung bài viết
        * @created : quyetkaito 06/11/2022
        */
        collapseContent(){
            this.isExpand = false;
        },

        /**
        * Hàm mở rộng nội dung bài viết
        * @created : quyetkaito 06/11/2022
        */
        expandContent(){
            this.isExpand = true;
        },

        /**
         * hàm hủy chỉnh sửa comment
         */
        cancelEditComment(){
            this.listComment_temp.unshift(this.currentComment);
            this.editCommentMode = false;
        },

        /**
        * Hàm chỉnh sửa comment
        * @created : quyetkaito 28/10/2022
        * @param {Object} comment : comment đang chỉnh sửa
        */
        editComment(comment){
            if(comment){
                let me = this;
                //chuyển thành dạng input
                me.editCommentMode = true;
                me.commentContent = comment.comment_content;                
                me.$nextTick(()=>{
                    me.$refs.inputCommentEdit.focus();
                });
                me.currentComment = comment;
                //bỏ comment đó trong list hiện tại đi
                this.listComment_temp.splice(this.listComment_temp.indexOf(comment), 1);
            }
        },

        async updateComment(){
            let me = this;
            me.editCommentMode = false;
            let obj = {
                comment_id: me.currentComment.comment_id,
                comment_content: me.commentContent, //nội dung
                post_id: me.post.post_id, //id bài viết
                user_id: me.userID,   
                modified_date: me.$commonFunc.setTimeZone(new Date()),  
                full_name: me.fullName,   
                user_avatar_img: me.userAvatar,
                created_date: me.currentComment.created_date,            
            };
            //gọi api post comment này     
            try {
                let res = await CommentAPI.request(CommentAPI.urlName, 'PUT', obj);
                if(res && res.data){
                    debugger
                    if(res.data.StatusCode == 200){
                        console.log("Bình luận thành công");
                        //clear text ở ô bình luận
                        this.newComment = "";
                        //push một đối tượng comment vào ô bình luận
                        let newObj = Object.assign({comment_id: res.data.Data.comment_id}, obj); 
                        this.listComment_temp.unshift(newObj); //callback để lấy thông tin id
                    }else{
                        console.log("Bình luận thất bại");
                        console.log(res.data.DevMsg);
                    }
                }                    
            } catch (error) {
                console.error(error);
            }       
        },

        /**
         * Like bình luận
         */
        likeComment(){
            //đổi text thành màu xanh
            let me = this;            
            // this.$refs.mMessage.showConfirm("hí");
        },

        /**
         * Xóa bình luận
         */
        async deleteComment(comment){
            if(comment){
                try {
                    let me = this;
                    if(confirm("Bạn có chắc chắn muốn xóa")){
                        let res = await CommentAPI.request(CommentAPI.urlName, 'DELETE', [comment.comment_id]);
                        if(res && res.data && res.data.StatusCode == 200){                            
                            console.log("xóa bình luận thành công");
                            //loại bỏ comment khỏi bài viết này                            
                            this.listComment_temp.splice(this.listComment_temp.indexOf(comment), 1);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        },

        /**
        * Phóng to ảnh khi bấm vào
        * @param {Link} src : link ảnh
        * @created : quyetkaito 23/10/2022
        */
        zoomImage(src){
            //bản chất là mở một postcard full màn hình
            if(src){
                this.$refs.imageViewer.show(src);
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

        getListSrc(){

        },

        handleTyping(){
            //thực hiện resize text-area
            let textarea = this.$refs.inputComment;
            textarea.style.height = textarea.scrollHeight; 
        },
        handleCancel(){
            this.editMode = 'View';
        },

        checkLogin(){
            if(this.$session.get('UserID')){
                return true;
            }else{
                return false;
            }
        },

        /**
        * Hàm xủ lý khi enter ở ô input bình luận
        * @created : quyetkaito 15/10/2022
        */
        async enterComment(){
            let me = this;
            if(!me.checkLogin()){
                this.$store.commit('showInfo', {message: "Vui lòng đăng nhập để thực hiện tính năng này."})
                return;
            }
            if(me.newComment){
                let obj = {
                    comment_content: me.newComment, //nội dung
                    post_id: me.post.post_id, //id bài viết
                    user_id: me.$session.get('UserID'),   
                    full_name: me.$session.get('FullName'),   
                    user_avatar_img: me.$session.get('UserAvatar'),            
                };
                //gọi api post comment này     
                try {
                    let res = await CommentAPI.request(CommentAPI.urlName, 'POST', obj);
                    if(res && res.data){
                        if(res.data.StatusCode == 201){
                            console.log("Bình luận thành công");
                            //clear text ở ô bình luận
                            this.newComment = "";
                            //push một đối tượng comment vào ô bình luận
                            let newObj = Object.assign(res.data.Data, obj); 
                            this.listComment_temp.unshift(newObj); //callback để lấy thông tin id
                        }else{
                            console.log("Bình luận thất bại");
                            console.log(res.data.DevMsg);
                        }
                    }                    
                } catch (error) {
                    console.error(error);
                }           
            }
        },

        /**
        * Xử lý khi click vào nút bình luận
        * @created : quyetkaito 15/10/2022
        */
        commentClick(){
            //show ra danh sách bình luận. lúc này mới gọi api cho chuẩn
            //focus vào ô viết bình luận
            this.$refs.inputComment.focus();
        },

        /**
        * Xử lý chỉnh sửa bài viết
        * @created : quyetkaito 15/10/2022
        */
        async handleEdit(){
            let me =  this;
            // this.editMode = 'Edit';
            // me.$nextTick(()=>{
            //     this.$refs.postContent.focus();
            // })            
            //đổi sang dùng popup, gọi tới post list yêu cầu hiển thị popup
            this.$parent.openPostEdit(this.post, this.listCategory);
        },

        async handleSave(){
            let me = this;
            if(me.post_temp){
                try {
                    let res = await PostAPI.request(PostAPI.urlName, 'PUT', me.post_temp);
                    if(res && res.data){
                        if(res.data.StatusCode == 200){
                            console.log("Câp nhật thành công");
                            this.editMode = 'View';
                        }else{
                            console.error("Cập nhật thất bại.", res.data.DevMsg);
                        }
                    }
                } catch (error) {
                    console.error(error)
                }
            }
        },

        /**
        * Hàm xử lý khi bấm nút like
        * @created : quyetkaito 15/10/2022
        */
        async handleLike(){
            let me = this;
            this.isLiked  = !this.isLiked;
            if(!this.isLiked){
                if(this.$refs.buttonLike){
                    this.$refs.buttonLike.classList.remove('liked'); 
                    if(this.post_temp.like_count > 0){
                        this.post_temp.like_count -= 1;
                        await me.handleSave();                   
                    }
                }
            }else{
                if(this.$refs.buttonLike){
                    this.$refs.buttonLike.classList.add('liked');
                    this.post_temp.like_count += 1;                   
                    await me.handleSave();
                }
            }
        },

        /**
        * Hàm thực hiện xóa 
        * @created : quyetkaito 15/10/2022
        */
        async handleDelete(){
            if(confirm("Bạn có chắc chắn muốn xóa bài viết này?")){
                let me = this;
                if(me.post.post_id){
                    try {
                        let res = await PostAPI.request(PostAPI.urlName+`/${me.post.post_id}`, 'DELETE');                        
                        if(res && res.data){
                            if(res.data.StatusCode == 200){
                                console.log("Xóa thành công:", me.post.post_id);
                                this.$parent.loadData();
                                me.$emit('removeItem', me.post);
                            }else{
                                console.error("Xóa không thành công:", me.post.post_id);
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
.post-card{
    .post__header{
        justify-content: space-between;
        .author-info{
            align-items: center;
        }
        .post-author-image{
            width: 50px;
            height: 50px;    
            border: 2px solid var(--info-color);
            margin-right: 10px;
    
            .img-author{
                object-fit: cover;
                width: 100%;
                height: 100%;    
            }
        }
        .post-date{
            font-size: 12px;
        }
        .collapse-button{
            color: var(--info-color);
            font-style: italic;
            cursor: pointer;
        }
    }

    .post__content{
        padding: 5px 10px 10px 10px;
        .post-content-editor{
            width: 100%;
            outline: none;
            min-height: 18px;
        }
        .post-content-text{
            max-height: 145px;
            overflow: hidden;
        }
        .expand-button,
        .collapse-button{
            color: var(--info-color);
            font-style: italic;
            cursor: pointer;
        }
    }
    .post__action_counter{
        padding-top: 10px;
        padding-bottom: 10px;
        justify-content: space-between;
        .reaction-counter{
            margin-left: 5px;
        }
        .share-counter{
        
        }
        .share-counter:hover{
            text-decoration: underline;
            cursor: pointer;
        }
        .comment-counter{
            margin-right: 10px;
        }
        .comment-counter:hover{
            text-decoration: underline;
            cursor: pointer;
        }
    }
    
    .post_action{
        .button-action{
            border-radius: 8px;
            text-align: center;
            cursor: pointer;
            padding-top: 10px;
            padding-bottom: 10px;
        }
        .button-action:hover{
            background: #F2F2F2;
        }

    }

}


.button-like-text.liked{
    color: var(--info-color);
    font-weight: bold;
}
.post_category .post-category-item{
    border-radius: 3px;
    background: #e5e5e5;
    font-size: 11px;
    cursor: pointer;
    padding: 3px 5px 3px 5px;
    margin-right: 2px;
}
.edit_icon{
    width: 24px;
    height: 24px;      
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;
    color: var(--info-color);
}
.edit_icon:hover{
    background: #e5e5e5;
    color: var(--info-color);
}
.trash-icon{
    width: 24px;
    height: 24px;
    background: #e5e5e5;    
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;
}
.trash-icon:hover{
    background: var(--border-color);
}

.m-extension{
    width: 24px;
    height: 24px;       
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;
}
.post_action .button-save{
    width: 100%!important;
}
.post_action .button-save button{
    width: 100%!important;
}

.post__comment .comment-write{
    padding-top:5px;
    textarea{
        resize: none;
        height: fit-content;     
        max-height: 100px;
        overflow: auto;
    }
    .btn-cancel{
        margin-left: 8px;
        white-space: nowrap;
        cursor: pointer;
    }
}
.input-comment{
    padding-left: 10px;
    outline: none;    
    height: 36px;
    border-radius: 10px;
    background: #F0F2F5;
    font-size: 15px;
    width: 100%;    
}
.input-comment::placeholder{
    font-size: 15px;
}
.comment-item{
    padding: 10px;
}
.comment-write .user-avatar,
.comment-item .user-avatar{
    width: 40px;
    height: 40px; 
    min-width: 40px;   
    min-height: 40px;   
    border: 2px solid var(--info-color);  
    margin-top: 10px;
    cursor: pointer;
}
.comment-write .user-avatar .comment-avatar,
.comment-item .user-avatar .comment-avatar{
    width:100%;
    height: 100%;
    object-fit: cover;
}
.comment-box{
    background: #F0F2F5;
    border-radius: 10px;    
    padding: 10px;
}
.comment-box .user-name{
    font-weight: 500;
    cursor: pointer;
}
.comment-box .user-name:hover{
    text-decoration: underline;
}
.comment-item .comment-action{
    margin-left: 10px;
    .btn-like-comment{
        font-size: 13px;
        cursor: pointer;
        font-weight: 500;
    }
    .btn-like-comment:hover{
        text-decoration: underline;
    }
    .btn-reply{
        font-size: 13px;
        cursor: pointer;
        font-weight: 500;
    }
    .btn-reply:hover{
        text-decoration: underline;
    }
    .comment-time{
        font-size: 12px;    
        cursor: pointer;
    }
    .comment-time:hover{
        text-decoration: underline;
    }
}

.non-max-height{
    max-height: unset!important;
}

</style>
