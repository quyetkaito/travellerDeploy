<template>
  <div class="post-filter-list">
        <div class="page-title">{{pageTitle}}</div>
        <!-- Phần list các bài viết -->
        <div class="grid grid-cols-1 gap-4">
            <div class="post-group" v-for="(postDetail,index) in listPostDetail" :key="index">
                <div class="category-group-name" @click="collapseContent(index)">"{{postDetail.category.category_name}}" : {{postDetail.listPost.length}} lượt đề cập</div>
                <div class="list-post" v-if="postDetail.visible">
                    <post-filter-item v-for="(post, index) in postDetail.listPost" v-bind:key="index" 
                        :post="post"                                    
                    />   
                </div>
            </div>               
        </div>      
  </div>
</template>

<script>
import PostFilterItem from "@/views/post/PostFilterItem.vue"
import PostAPI from '@/api/PostAPI';
export default {
    components:{
        "post-filter-item": PostFilterItem
    },
    created(){
        if(this.$route && this.$route.params){            
            this.pageTitle += `"${this.$route.params.title}"` || '';    
            if(this.$route.params.filterKey == 'hotPlace'){
                this.loadHotPlace();
            }        
        }
    },
    data() {
        return {
            listPosts: [{post_content: 'xxx'},{post_content: 'yyy'}],
            pageTitle: 'Kết quả cho: ',
            listPostDetail: [],
        }
    },
    methods:{
        /**
         * Hàm thu gọn/ mở rộng nội dung của 1 group
         */
        collapseContent(index){
            if(this.listPostDetail){
                this.listPostDetail[index].visible = !this.listPostDetail[index].visible;
            }
        },

        /**
         * API lấy danh sách các địa điểm đang hot
         */
        async loadHotPlace(){
            try {
                let me = this;
                let res = await PostAPI.request(PostAPI.urlName+'/hot_place', 'GET');
                if(res && res.data){                    
                    if(res.data.ListPostDetail){
                        me.listPostDetail = res.data.ListPostDetail;    
                        me.listPostDetail.forEach(x=>{
                            x.visible = true;
                        })                    
                    }
                }
            } catch (error) {
             console.error(error)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.post-filter-list{
    padding: 10px;
    .page-title{
        font-size: 20px;
        font-weight: 700;
    }
    .post-group{
        border-left: 5px solid var(--disabled-color);
        padding-left: 10px;
        .category-group-name{
            font-size: 16px;
            font-weight: bold;
            background: var(--brown-color);
            border-radius: 5px;
            padding: 3px;
            margin-bottom: 3px;
        }
    }
}
</style>