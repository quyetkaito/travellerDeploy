<template>
<div class="post-filter-item m-card">
    <div class="author-info flex">
        <div class="post-author-image rounded-full"><img :src="getSrc(post?.user_avatar_img)" alt="" class="img-author rounded-full"></div>
        <div>
            <div class="post-author">{{post?.author_name}}</div>
            <div class="post-date">{{$commonFunc.formatDateTime(post?.posted_date)}}</div> <!--nếu là ngày hôm nay thì hiện giờ, nếu khác thì hiện ngày tháng-->
        </div>
    </div>
    <div class="flex">
        <div class="post-content w-5/6" style="white-space: pre-wrap;" @click="gotoDetail(post)">
            {{post?.post_content}}
        </div>
        <div class="image-preview w-1/6" v-if="post.post_image">
            <img :src="JSON.parse(post?.post_image)[0]" alt="" width="100" height="100">
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:{
        post: {
            type: Object,
            default: ()=> {}
        }
    },
    methods:{
        getSrc(src){
            if(src) return src;
            else return require("@/assets/img/default-avatar.jpg");
        },

        gotoDetail(post){
            if(post){
                //todo
            }    
        }
    }
}
</script>

<style lang="scss" scoped>
.post-filter-item{
    .author-info{
        padding-bottom: 10px;
        align-items: center;
        border-bottom: 1px solid var(--disabled-color);
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
    }
    .post-content{
        cursor: pointer;
        max-height: 100px;
        overflow: hidden;
    }
    .image-preview{
        width: 100px;
    }
}
</style>