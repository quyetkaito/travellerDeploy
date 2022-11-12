<template>
  <!-- Content riêng của trang Employee -->
  <div class="content">
    <div class="content-top-container">
      <div class="content-top">
        <div class="page-title">{{ $t('category.CategoryManager') }}</div>
        <m-button :text="$t('common.add_new')" @click="buttonClick('Add')" />
      </div>
    </div>
    <div class="">
      <div class="content-bottom">
        <div class="filter-area flex">
          <!-- Xóa nhiều -->
          <div class="flex align-center" v-if="selected >= 1">
            <button class="m-btn-dropdown" disabled :class="{'disabled' : selected < 1}">
              <div class="m-btn-text text-dropdown">Xóa hàng loạt</div>
            </button>           
          </div>
          <!-- Các component filter dữ liệu -->
          <div class="content-filter flex align-y-center justify-center">
            <!-- Input Search -->
            <div style="width: 240px">
              <m-input
                ref="searchInput"
                :showLabel="false"
                :maxlength="255"
                :width="240"
                v-model="dataFilter"
                placeholder="Tìm kiếm"
                @input="lodashDelay(value)"
                @findData="filterData"
              />
            </div>

            <div style="position: relative">
              <div
                title="Lấy lại dữ liệu"
                class="m-icon m-icon-24 m-refresh btn-refresh"
                @click="loadData"
              ></div>              
            </div>            
          </div>
        </div>

        <!-- Bảng -->
        <div class="content-grid">
          <div class="table-container">
            <m-grid
              ref="mygrid"
              :listData="storeCategory"
              :columns="columns"
              :pageSize="pageSize"
              :isShowSkeleton="isShowSkeleton"
              functionText="Sửa"
              @eShowFunc="showFunction"
              @handleHideFunc="hideFunction"
              @eMultiSelect="getItemSelected"
              @eDoubleClick="edit"
              @gridAction="handleGridAction"
              :tableFunction="tableFunction"
            />
          </div>
        </div>

        <!-- Ảnh hiển thị nếu không có dữ liệu -->
        <div
          class="flex align-center"
          style="width: 100%; flex-direction: column"
          v-show="Object.keys(storeCategory).length === 0 && dataFilter != ''"
        >
          <img
            src="@/assets/img/bg_report_nodata.76e50bd8.svg"
            alt=""
            width="100"
            height="100"
          />
          <p style="margin: 0px; padding: 0px">Không có dữ liệu </p>
        </div>

        <!-- Paging -->
        <div class="m-paging" v-show="Object.keys(storeCategory).length !== 0">
          <div class="paging-left">
            <!-- Paging action -->
            <m-pagination
              :totalPage="totalPage"
              :currentPage="pageNumber"
              :pageSize="pageSize"
              @changeCurrentPage="setCurrentPage"
            />
          </div>
          <div class="paging-right">
            <!-- <v-multiselect
              ref="comboPaging"
              style="width: 250px !important"
              v-model="pageSize"
              :options="$commonConfig.pagingOptions"
              label="label"
              :close-on-select="true"
              :clearOnSelect="true"
              :searchable="false"
              noResultsText="Không có dữ liệu hiển thị"
              :disabled="false"
              :canClear="false"
              :canDeselect="false"
              openDirection="top"
            /> -->
            
          </div>
        </div>
      </div>
    </div>
  </div>
  <category-detail ref="categoryDetail"/>
</template>

<script>
import CategoryAPI from "@/api/CategoryAPI";
//multi vue 3
import vMultiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
//lodash
import _ from "lodash";
//
import CategoryDetail from "@/views/category/CategoryDetail.vue";

export default {
  components :{
      // "v-multiselect": vMultiselect,
      "category-detail": CategoryDetail,
  },
  data() {
    return {
        storeCategory: [], //dữ liệu danh mục
        pageSize:10 ,
        dataFilter: '',
        isShowSkeleton: false,     
        selected: 0,  
        storeAll: [], 
        totalPage: 0,
        pageNumber: 1,        
    }
  },
  created(){
      this.initStaticData();
      this.loadData();
  },
  methods:{
    initStaticData(){
      this.columns = [
          {
            title: 'Tên danh mục',            
            key: 'category_name',
            titleAlign: 'left',            
          },          
      ];
      this.tableFunction = {          
          isShow: true,
          viewButton: false,
          editButton: true,
          deleteButton: true,
      }
    },
    async loadData(){
        let me = this;
        try {
          // me.$commonFunc.load();
          this.isShowSkeleton = true;
          this.storeCategory = [];
          let res = await CategoryAPI.request(CategoryAPI.urlName, 'GET');
          if(res && res.data){
              this.storeCategory = JSON.parse(JSON.stringify(res.data));
              this.storeAll = JSON.parse(JSON.stringify(res.data));  
              this.totalPage = Math.round(res.data.length/10);      
          }
          this.isShowSkeleton = false;
          // me.$commonFunc.unload();
        } catch (error) {
          console.error(error);
        }
    },

    setCurrentPage(page){
      if(this.pageNumber == page) return;
       this.pageNumber = page;
      //thực hiện filter lại
      // this.filterDataServer(this.pageNumber);
    },

    handleGridAction(options){
       if(options){
            if(options.object){
                if(options.action == 'View'){
                    // this.view(options.object);
                }
                else if(options.action == 'Delete'){
                  this.deleteObject(options.object);
                }
                else if(options.action == 'Edit'){
                    this.edit(options.object);
                }
            }
        }
    },
    getItemSelected(selectedRow){
        if(selectedRow && selectedRow.length > 0){
            this.selected = selectedRow.length;
        }else{
          this.selected = 0;
        }
    },
    hideFunction(){

    },
    showFunction(){

    },

    lodashDelay: _.debounce(function () {
      this.filterData();
    }, 1200),

    async filterData(){
        //hiện tại chỉ đáp ứng filter local do dữ liệu ít
        let me = this;
        me.isShowSkeleton = true;
        me.storeCategory = await me.storeAll.filter(x=>x.category_name.toLowerCase().includes(this.dataFilter.toLowerCase()));
        me.isShowSkeleton = false;
    },
    view(){

    },
    buttonClick(action){
        switch (action) {
          case 'Add':
            this.openCategoryDetail();
            break;
        
          default:
            break;
        }
    },

    openCategoryDetail(){
      this.$refs.categoryDetail.show();
    },

    edit(object){
      this.$refs.categoryDetail.showEdit(object);
    },

    async deleteObject(object){
      let me = this;
      if(object && object.category_id){
          if(confirm(this.$t('message.delete_confirm'))){
            try {
              me.$commonFunc.load();
              let res = await CategoryAPI.request(CategoryAPI.urlName, 'DELETE', [object.category_id]);
              if(res && res.data){
               if(res.data.StatusCode == 200){
                 me.$store.commit("showSuccess", {message: me.$t('message.success_delete')});
                 me.loadData();
               }else{  
                  me.$store.commit("showError", {message: res.data.DevMsg});
                  console.log(res.data.DevMsg);
               }
              }             
              me.$commonFunc.unload();
            } catch (error) {
              me.$store.commit("showError", {message: me.$t('common.error_message')});
              console.error(error);
              me.$commonFunc.unload();     
            }
        }
      }
    }
  }
}
</script>

<style>
@import url("/src/style/page/base-page.css");
</style>