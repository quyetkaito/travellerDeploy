<template>
     <!-- Dialog thêm mới -->
  <div class="m-popup" v-bind:class="{ show: isShow }" ref="categoryDialog">
    <div class="m-popup-box">
      <!-- Header -->
      <div class="m-popup-header">
        <div>
            <div class="popup-title-text">{{titleForm}}</div>              
        </div>
        <div>          
            <div class="popup-close m-icon m-icon-24 m-close" @click="hide"></div>            
        </div>
      </div>
      <!-- Header end-->
      <!-- Form -->
      <div class="m-popup-body">
        <!-- Detail -->
        <div class="form-container" v-if="editMode!='QuickAdd'">
            <m-input 
              ref="categoryName"
              :labelText="$t('category.category_name')"
              v-model="currentItem.category_name"
              @keyup.enter="saveCategory"
            />
        </div>
        <div class="form-container" v-if="editMode=='QuickAdd'">
          <m-label text="Tìm danh mục" />                    
          <v-multiselect
            ref="categoryList"
            mode="tags"
            v-model="categoryValue"
            :options="storeCategory"
            label="label"
            :close-on-select="true"
            :clearOnSelect="true"
            :searchable="true"
            placeholder="Bấm vào để tìm kiếm"
            noResultsText="Không có dữ liệu hiển thị"                                  
            :canClear="false"
            :canDeselect="false"
            @select="comboCategorySelected"
            @deselect="comboCategoryDeSelected"
          />
          <div class="quick-add-action" v-if="editMode=='QuickAdd'">Không tìm thấy danh mục?
             <span class="quick-add-text" @click="changeModeAdd">Tạo mới</span>
          </div>
        </div>
        <!-- Detail end-->

        <!-- Footer -->
        <div class="footer-container flex-grow">
          <div class="footer-line">
            <m-button 
                v-if="editMode!='QuickAdd'"
                :text="$t('Save')" 
                class="w-full"                                 
                @click="saveCategory"
            />
            <m-button 
                v-if="editMode=='QuickAdd'"
                :text="$t('category.add_button')" 
                class="w-full"                                 
                @click="sendToPost"
            />            
          </div>
        </div>
        <!-- Footer end-->
      </div>
      <!-- Form end -->
    </div>
  </div>  
</template>

<script>
import CategoryAPI from "@/api/CategoryAPI"
//multi vue 3
import vMultiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
export default {
  components:{
    /* eslint-disable vue/no-unused-components */
    "v-multiselect": vMultiselect,
  },
    data() {
        return {
            isShow: false,
            currentItem: {},
            titleForm: this.$t('category.add'),
            editMode: 'Add',
            storeCategory:[],
            categoryValue: null,
            openFromPost: false,
        }
    },
    created(){
      this.initData();
    },
    methods:{
        initData(){
          this.currentItem = {};
          this.categoryValue = null;
          this.titleForm = this.$t('category.add');
          this.editMode = 'Add';
        },

        async saveCategory(){
          let me = this;
          try {
            let method = 'POST';
            if(me.editMode == 'Edit') method = 'PUT';
            if(!await me.validate()) return;
            let res = await CategoryAPI.request(CategoryAPI.urlName, method, me.currentItem);
            if(res && res.data){
              if(res.data.StatusCode == 201){
                if(!me.openFromPost){
                  me.$store.commit("showSuccess", {message: me.$t("message.success_add")});
                }
                me.afterSave(res.data.Data);
              }else if(res.data.StatusCode == 200){
                me.$store.commit("showSuccess", {message: me.$t("message.success")});
                me.afterSave();
              }
            }
          } catch (error) {
            console.error(error);
          }
        },

        async validate(){
          let me = this;
          if(!me.currentItem.category_name){
             if(me.$refs.categoryName && typeof me.$refs.categoryName.focus == "function"){
              me.$refs.categoryName.focus();
             }
             me.$store.commit("showError", {message: "Tên danh mục không được bỏ trống."});
             return false;
          }
          return true;
        },

        hide(){
            this.isShow = false;
            this.initData();
        },

        show(){
          this.isShow = true;
          this.editMode = 'Add'; //mặc định gọi vào hàm này là thêm mới
          this.focusFirstControl();
        },

        /**
         * show form thêm nhanh , tìm kiếm tại form thêm bài viết
         */
        showQuickAdd(){
            this.editMode = 'QuickAdd';
            this.isShow = true;            
            this.$nextTick(()=>{
              if(this.$refs.categoryList && this.$refs.categoryList.$el && typeof this.$refs.categoryList.$el.focus == "function"){
                // this.$refs.categoryList.$el.focus(); //tạm thời ko focus vì auto xổ combo xấu quá
              }
            })
            this.titleForm = this.$t('category.quick_add');
            //lấy dữ liệu danh mục
            if(!this.storeCategory || this.storeCategory.length == 0){
              this.getCategoryData();
            }
        },

        /**
         * Hàm xử lý binding lên khi sửa
         */
        bindingData(listData){          
          let me = this;
          debugger
          if(listData && listData.length > 0){
             this.categoryValue = null;
             this.categoryValue = listData.map(x=>x.category_id);
          }
        },

        comboCategorySelected(option){
            // this.storeCategory.push(option);
        },

        comboCategoryDeSelected(option){
            // this.storeCategory.splice(this.storeCategory.indexOf(option),1);
        },

        /**
         * Hàm lấy dữ lệu danh mục
         */
        async getCategoryData(){
            let res = await CategoryAPI.request(CategoryAPI.urlName, 'GET');
            if(res && res.data){              
              if(res.data.length > 0){
                this.categoryOriginData = res.data;
                this.storeCategory = [];
                for(let i = 0 ; i< res.data.length ; i++){
                  this.storeCategory.push({
                    label: res.data[i].category_name,
                    value: res.data[i].category_id,
                  })
                }
                //lưu cache để tránh gọi nhiều lần
                //todo
              }              
            }
        },

        /**
         * Gửi giá trị được chọn tới bài viết
         */
        sendToPost(){
           debugger                      
           let listObject = this.categoryOriginData.filter(x=>this.categoryValue.includes(x.category_id)); //tìm ra các bản ghi trùng id, do hiện tại value chỉ chứa mỗi id
           this.$emit("changeValue", listObject);
           this.isShow = false;
        },

        focusFirstControl(){
            this.$nextTick(()=>{
              if(this.$refs.categoryName && typeof this.$refs.categoryName.focus == "function"){
                this.$refs.categoryName.focus();
              }
            })
        },

        afterSave(callbackData){
          this.hide();
          if(this.openFromPost){//nếu là mở từ form bài viết
               this.$emit("changeValue", [callbackData]);
          }else{
            this.$parent.loadData();
          }
        },

        showEdit(object){
          let me = this;
          me.editMode = 'Edit';
          me.titleForm = me.$t('category.edit');
          if(object){            
            me.currentItem = JSON.parse(JSON.stringify(object));
            me.isShow = true;
            me.focusFirstControl();
          }
        },

        /**
         * Chuyển sang mode thêm mới
         */
        changeModeAdd(){
            let me = this;
            me.editMode = 'Add';
            me.titleForm = me.$t('category.add');  
            me.$nextTick(()=>{
              me.$refs.categoryName.focus();
            });
            me.openFromPost = true;
        }
    }
}
</script>

<style scoped>
@import url("/src/style/common/dialog.css");
.quick-add-action{
  color: #000;
  margin-right: 9px;
  text-align: center;
  margin-top: 10px;
}

.quick-add-action .quick-add-text{
  color: var(--default-color);
  text-decoration: underline;
  font-weight: 400;
  cursor: pointer;
}
</style>