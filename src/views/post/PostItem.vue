<template>
  <div class="post-item m-card">
    <div class="flex">
        <div class="post-thumb w-1/3">
            <img :src="getSrc(listImage[0])">
        </div>    
        <div class="post-title ml-2">{{post.post_content.substring(0,50)}}...</div>
    </div>
    <div class="post-description">{{post.post_content.substring(0,90)}}...</div>
    <div class="view-detail-button">Xem chi tiết</div>
  </div>
</template>

<script>
export default {
    props:{
        post:{
            type: Object,
            default: ()=> {}
        }
    },
    data() {
        return {
            currentItem:null,
            listImage: this.post.post_image ? JSON.parse(this.post.post_image) : [],
        }
    },
    created(){
        this.initStaticData();
    },
    methods:{
        /**
        * hàm khởi tạo biến tĩnh
        * @created : quyetkaito 02/10/2022
        */
        initStaticData(){
            this.currentItem = {
                imageSrc: "",
                title: "Kinh nghiệm chuẩn bị đồ đi cắm trại",
                description:  "Trong thời gian gần đây, cùng với sự phát triển chung của ngành du lịch thì những chuyến đi chơi với bạn bè, gia đình cũng dần được mở rộng thêm với nhiều hình thức mới lạ, độc đáo.",
            };
            this.listImage = this.post.post_image ? JSON.parse(this.post.post_image) : [];
        },
        getSrc(src){
            if(src){
                return src;
            }else{
                return require('@/assets/img/image-test-1.jpg');
            }
        }
    }

};
</script>

<style lang="scss">
.post-item{
    width: 100%;        
    box-sizing: border-box;
    overflow: hidden;
 
    .post-description{
        margin-top: 5px;
        font-size: 15px;
        max-height: 50px;
        overflow: hidden;
    }
}
.post-title{
    font-size: 16px;
    font-weight: bold;   
    cursor: pointer; 
}
.view-detail-button{
    font-size: 13px;
    font-style: italic;
    color: var(--info-color);
}
.view-detail-button:hover{
    text-decoration: underline;
    cursor: pointer;
    width: fit-content;
}
.post-thumb{
    overflow: hidden;
    cursor: pointer;
    object-fit: cover;
    width: 100%;
    height: 100%; 
}
.post-thumb:hover img{
    transform: scale(1.1) rotate(2deg);    
    transition: all .2s ease-in-out;
}

</style>