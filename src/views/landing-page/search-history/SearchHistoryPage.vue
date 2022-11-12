<template>
<div class="search-history-page">
    <div class="page-header flex justify-between align-y-center">
        <div class="title-page">Lịch sử tìm kiếm</div>
        <div class="delete-all" @click="deleteAll" v-if="histories.length > 0">Xóa các tìm kiếm</div>
    </div>
    <div class="search-history-item" v-for="(item,index) in histories" :key="index">
        <div class="flex justify-between">
            <div class="search-date mr-2">{{$commonFunc.formatDate(item.search_date)}}</div>
            <div class="cursor-pointer" title="Xóa" @click="deleteItem(item)"><i class="fas fa-trash-alt text-red-500"></i></div>
            
        </div>        
        <blockquote><div>Bạn đã tìm kiếm: "{{item.search_content}}"</div></blockquote>
        <div class="time">{{$commonFunc.getTimeOnly(item.search_date)}}</div>
    </div>
</div>
</template>

<script>
import SearchHistoryAPI from "@/api/SearchHistoryAPI"
export default {
    name: "SearchHistory",
    data() {
        return {
            histories: [],
            userID: this.$session.get("UserID"),
        }
    },
    created(){
        this.getData();
    },
    methods:{
        /**
        * Lấy lịch sử tìm kiếm của user này
        * @created : quyetkaito 08/11/2022
        */
        async getData(){
            try {
                let me = this;
                if(me.userID){
                    let res = await SearchHistoryAPI.request(SearchHistoryAPI.urlName+`/history_by_user/${me.userID}`, 'GET');
                    if(res && res.data){                        
                        this.histories = res.data;
                    }
                }else{ //nếu ko có userID thì lấy trong cache

                }
            } catch (error) {
                console.error(error)
            }
        },

        /**
        * hàm xóa lịch sử
        * @created : quyetkaito 08/11/2022
        */
        async deleteItem(item){
            let me = this;
            try {
                if(me.userID && item && item.id){
                    let res = await SearchHistoryAPI.request(SearchHistoryAPI.urlName+`/${item.id}`, 'DELETE');
                    if(res && res.data){
                        if(res.data.StatusCode == 200){
                            me.$store.commit("showSuccess", {message: me.$t('message.success_delete')});
                            this.getData();
                        }
                    }
                }             
            } catch (error) {
                console.error(error)
            }
        },

        /**
        * Xóa hết lịch sử tìm kiếm
        * @created : quyetkaito 08/11/2022
        */
        async deleteAll(){
            try {
                let me = this;
                if(me.userID){
                    let res = await SearchHistoryAPI.request(SearchHistoryAPI.urlName+`/delete_all/${me.userID}`, 'DELETE');
                    if(res && res.data){
                        if(res.data.StatusCode == 200){
                            me.$store.commit("showSuccess", {message: me.$t('message.success_delete')});
                            this.getData();
                        }
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
.search-history-page{
    padding: 10px;

    .page-header {
        .title-page{
            margin-top: 15px;
            margin-bottom: 10px;
            font-size: 20px;
            font-weight: 700;
        }
        .delete-all{
            color: var(--info-color);
            cursor: pointer;
        }

    }
}
.search-history-item{
    background: white;
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
    @apply shadow-md;
    .search-date{
        font-weight: 700;
        font-size: 16px;
    }
    .time{
        font-size: 13px;        
    }
}
</style>