<template>
  <div id="navbarComponent" class="navbar-component flex flex-grow">
        <div class="navbar__left flex align-y-center w-1/3">
            <img src="@/assets/logo-law.png" alt="" class="logo-page" @click="logoClick">
            <input
            ref="searchInput" 
            type="text"
            class="search-input"
            placeholder="Tìm kiếm" 
            v-model="textSearch" 
            @input="searchInput"
            @keyup.enter="searchData"
            @click="openSearchBox"
            >
            <!-- @change="searchData"  -->
            <!-- @blur="hideResult"  -->
            <div
                ref="searchPreview"
                class="search-preview"               
            >                
                <div v-if="listOldSearch.length==0">Không có tìm kiếm nào gần đây</div>
                <div class="search-title flex justify-between align-y-center" v-if="listOldSearch.length > 0">
                    <div class="search-cache">Tìm kiếm gần đây</div>                
                    <div class="delete-cache" @click="deleteCache">Xóa lịch sử tìm kiếm</div>                
                </div>
                <div class="search-result-item" v-for="item in listOldSearch" :key="item" @click="searchItemClick(item)">
                    <div class="flex justify-between">
                        <div class="flex">
                            <div class="icon-history"><i class="fas fa-history"></i></div>
                            <div>{{item.search_content}}</div>
                        </div>
                        <div class="delete-icon" @click="deleteHistory(item)">
                            <i class="far fa-times-circle"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar-item-container flex w-1/3"> 
           <div class="navbar-item" @click="gotoTop">Trang chủ</div>           
           <div class="navbar-item" @click="filterByLocation(1)">Miền bắc</div>
           <div class="navbar-item">Miền trung</div>
           <div class="navbar-item">Miền nam</div>
           <div class="navbar-item">Trekking</div>             
        </div>
        <div class="login-area flex w-1/3">
            <div class="login-button" @click="gotoLogin" v-if="!isLogged">{{$t('Login')}}</div>
            <div class="register-button" @click="gotoRegister" v-if="!isLogged">{{$t('Register')}}</div>
            <div class="user-info" @click="gotoInfo" v-if="isLogged">Xin chào <b>{{full_name}}</b></div>            
        </div>        
  </div>
</template>

<script>
import SearchHistoryAPI from "@/api/SearchHistoryAPI"
export default {
    data() {
        return {
            full_name: "bạn",
            isLogged: false,
            textSearch : '',
            listOldSearch:[],
            userID: this.$session.get('UserID'),
        }
    },
    created(){
        this.initStaticData();
    },
    methods:{
        searchItemClick(item){
            if(item){
                this.textSearch = item.search_content;
                this.searchData();
                this.hideResult();
            }
        },

        filterByLocation(i){
            this.$router.push({name:'postFilterList', params: {title: 'Miền Bắc'}});
        },

        /**
        * Lấy lịch sử tìm kiếm của user này
        * @created : quyetkaito 08/11/2022
        */
        async getSearchData(){
            try {
                let me = this;
                if(me.userID){
                    let res = await SearchHistoryAPI.request(SearchHistoryAPI.urlName+`/history_by_user/${me.userID}`, 'GET');
                    if(res && res.data){   
                        this.listOldSearch = [];                     
                        this.listOldSearch = res.data.filter((x,index)=> index<5);
                    }
                }else{ //nếu ko có userID thì lấy trong cache

                }
            } catch (error) {
                console.error(error)
            }
        },

        deleteCache(){
            let me = this;
            //nếu ko đăng nhập thì xóa cache
            if(me.userID){
                this.$router.push("/search-history");
                this.hideResult();
            }else{
                this.$cache.remove("searchData");
                this.listOldSearch = [];
            }
        },

        async deleteHistory(item){
            if(item){
                try {
                  let res = await SearchHistoryAPI.request(SearchHistoryAPI.urlName, 'DELETE', [item.id]);
                  if(res && res.data){
                    console.log(res.data.UserMsg);
                  }
                } catch (error) {
                console.error(error)
                }
            }
        },

        initStaticData(){            
            let name = this.$session.get('FullName');
            if(name){
                this.full_name = name;
                this.isLogged = true;
            }
        },
        gotoLogin(){
            this.$router.push({name: "login"});
        },
        
        /**
        * Chuyển sang màn hình đăng ký
        * @created : quyetkaito 11/10/2022
        */
        gotoRegister(){

        },
        gotoInfo(){
            //quay sang trang thông tin người dùng
            this.$router.push({name: "UserInfo"});
        },       
        searchData() {
            let me = this;
            //tìm kiếm
            if(me.textSearch){
                this.$router.push("/home");
                me.$store.textSearch = me.textSearch;
                me.$eventBus.emit('test', me.textSearch);
                this.hideResult();
                //nếu có userID thì lưu vào db
                if(me.userID){
                     this.insertHistory();
                }else{ //nếu ko thì lưu vào cache 
                    this.openSearchBox();
                    //lưu lại textsearch vào cache
                    // let oldSearchData = me.$cache.get("searchData");
                    // if(oldSearchData){
                    //     this.listOldSearch = oldSearchData;
                    //     if(Array.isArray(oldSearchData)){
                    //         oldSearchData.unshift(me.textSearch);
                    //         me.$cache.set("searchData", oldSearchData);
                    //     }
                    // }else if(me.textSearch){
                    //     me.$cache.set("searchData", [me.textSearch]);
                    // }
                }                
            }
        }, 

        async insertHistory(){
            try {
                let me = this;
                if(me.userID){
                    let obj = {
                        user_id: me.userID,
                        search_content: me.textSearch,
                        search_date: me.$commonFunc.setTimeZone(new Date())
                    };
                    let res = await SearchHistoryAPI.request(SearchHistoryAPI.urlName, 'POST', obj);
                    if(res && res.data){                        
                        if(res.data.StatusCode == 201){
                            console.log("Lưu lịch sử thành công");
                        }
                    }
                }
            } catch (error) {
                console.error(error)
            }
        },

        openSearchBox(){
            let me = this;
            //hiện content kết quả
            if (me.$refs.searchInput) {
                let searchPosition = me.$refs.searchInput.getBoundingClientRect();
                let resultCmp = me.$refs.searchPreview;
                resultCmp.style.left = 0 + "px";
                resultCmp.style.width = searchPosition.right + "px";
                resultCmp.style.top = searchPosition.bottom + "px";
                resultCmp.style.display = "block";        
            }
            if(me.userID){ //nếu có thông tin người dùng thì lấy trong db
                this.getSearchData();
            }else{ //nếu ko thì lấy cache
                // let oldSearch = me.$cache.get("searchData");
                // if(oldSearch){
                //     this.listOldSearch = oldSearch;
                // }
            }

        },

        hideResult(){
            let me = this;
            let resultCmp = me.$refs.searchPreview;
            resultCmp.style.display = "none";        
        },

        searchInput(e){
            if(!e){
                this.hideResult();
            }
            let me = this;
            if (me.$refs.searchInput) {
                let searchPosition = me.$refs.searchInput.getBoundingClientRect();
                let resultCmp = me.$refs.searchPreview;
                resultCmp.style.left = 0 + "px";
                resultCmp.style.width = searchPosition.right + "px";
                resultCmp.style.top = searchPosition.bottom + "px";
                resultCmp.style.display = "block";        
            }
        },

        /**
        * Sự kiện khi nhấn vào nút Trang chủ
        * @created : quyetkaito 22/10/2022
        */
        gotoTop(){
            //di chuyển lên trên cùng và reload lại trang
            this.$eventBus.emit("gotoTop");
            this.$router.push('/home');
        },

        logoClick(){
            //move to top
        },
    }
}
</script>

<style lang="scss">
.navbar-component{
    width: 100%;
    height: 56px;
    background:  #00BC2A;
    box-sizing: border-box;
    padding-right: 20px;
    padding-left: 10px;
    position: fixed;
    z-index: 100;
}
.navbar__left{
    padding: 10px;
    .search-title{
        margin-bottom: 5px;
        .delete-cache{
            color: red;
            cursor: pointer;
            font-size: 13px;
        }
        .search-cache{
            font-weight: 600;
        }
    }
    .search-result-item{        
        cursor: pointer;
        padding: 10px;
        border-radius: 8px;
        .icon-history{
            color: var(--input-border);
            margin-right: 5px;
        }
        .delete-icon{
            color: var(--input-border);
            cursor: pointer;
        }
        .delete-icon:hover{
            color: black;
        }
    }
    .search-result-item:hover{
        background: var(--hover-card);
    }
}
.navbar__left .logo-page{
    width: 50px;
    height: 50px;
    cursor: pointer;
}
.navbar__left .search-input{
    height: 40px;
    border-radius: 30px;
    font-size: 15px;
    width: 250px;
    outline: none;    
    padding-left: 20px;
    background: #f4f7fc;
    margin-left: 10px;
}
.navbar-item-container{

}
.navbar-item{
    height: 56px;
    width: 111px;
    box-sizing: border-box;    
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 500;
}
.navbar-item:hover{
    /* opacity: 50%; */
    background: #dc9223;    
    color: var(--bg-main);
}
.login-area{
   justify-content: flex-end;
   align-items: center;   
}
.login-button{
    height: 30px;
    border: 2px solid black;
    box-shadow: #C7BFB7;
    border-radius: 5px;
    width: fit-content;
    text-align: center;
    margin-right: 10px;
    cursor: pointer;
    white-space: nowrap;
    padding: 2px;
}
.login-button:hover{
    background: var(--bg-main);
}
.register-button{
    margin-right: 10px;
    cursor: pointer;
}
.user-info{
    margin-right: 10px;
    cursor: pointer;
}
.search-preview-container {
  position: relative;
}
.search-preview {
  display: none;
  width: 550px;
  height: fit-content;
  max-height: 400px;
  @apply shadow-md;        
  border: 2px solid #C7BFB7;
  padding: 10px;
  position: absolute;
  z-index: 10;
  background: #F4F7FC;
  border-radius: 5px;
}
</style>

