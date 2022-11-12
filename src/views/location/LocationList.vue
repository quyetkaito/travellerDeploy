<template>
<div class="location-list">
  <div class="filter">
    <m-input :showLabel="false" v-model="textSearch" @input="searchData" placeholder="Tìm kiếm"/>   
    <div class="filter-button" @click="filterButtonClick(0)">Miền Bắc</div>   
    <div class="filter-button" @click="filterButtonClick(1)">Miền Trung</div>   
    <div class="filter-button" @click="filterButtonClick(2)">Miền Nam</div> 
    <div class="flex align-center" v-if="true">
      <div class="filter-combo">
        <v-multiselect
          ref="province"        
          v-model="provinceValue"
          :options="storeProvince"
          label="label"
          :close-on-select="true"
          :clearOnSelect="true"
          :searchable="true"
          placeholder="Chọn tỉnh"
          noResultsText="Không có kết quả"  
          noOptionsText="Không có dữ liệu"                                
          :canClear="false"
          :canDeselect="false"
          @select="comboProvinceSelected"   
          @open="comboProvinceBeforeExpand"     
        />
      </div>
      <div class="filter-combo">
        <v-multiselect
          ref="district"        
          v-model="districtValue"
          :options="storeDistrict"
          label="label"
          :close-on-select="true"
          :clearOnSelect="true"
          :searchable="true"
          placeholder="Chọn huyện"
          noResultsText="Không có kết quả"  
          noOptionsText="Không có dữ liệu"                                
          :canClear="false"
          :canDeselect="false"
          @select="comboDistrictSelected"  
          @open="comboDistrictBeforeExpand"      
        />
      </div>
      <div class="filter-combo">
        <v-multiselect
          ref="ward"        
          v-model="wardValue"
          :options="storeWard"
          label="label"
          :close-on-select="true"
          :clearOnSelect="true"
          :searchable="true"
          placeholder="Chọn xã"
          noResultsText="Không có kết quả"  
          noOptionsText="Không có dữ liệu"                                
          :canClear="false"
          :canDeselect="false"
          @select="comboWardSelected"  
          @open="comboWardBeforeExpand"  
        />
      </div>
    </div>     
  </div>
  <div class="content-grid">
    <div class="table-container">
      <m-grid
        :listData="storeLocation"
        :columns="columns"
        @dblClick="handleDoubleClick"
        :tableFunction="tableFunction"
        @eMainButtonClick="handleFunctionClick"
        @eDoubleClick="handleDoubleClick"
        :multiSelect="false"
      />      
    </div>
    <div class="m-paging" v-if="showPaging">
      <m-pagination
        :totalPage="totalPage"
        :currentPage="pageNumber"
        :pageSize="pageSize"
        @changeCurrentPage="setCurrentPage"
      />
    </div>
  </div>
</div>
</template>

<script>
import _ from "lodash";
import LocationAPI from "@/api/LocationAPI";
import locationConfigCode from "@/config/locationConfig";
// Khởi tạo một số hằng sử dụng nhiều lần
const dbName = "myDB";
const collection = "locations";

export default {
  data() {
    return {
      textSearch: null,
      storeLocation: [], //danh sách
      storeLocationAll: [],
      db: null, //indexedDB
      locations: [],            
      pageNumber: 1,
      pageSize: 10,
      totalPage: 0,
      showPaging: true,
      provinceValue: null,
      storeProvince: [],     
      districtValue: null,
      storeDistrict: [],
      wardValue: null,
      storeWard: [], 
    };
  },
  created() {
    let me = this;   
    this.initStaticData(); 
  },
  mounted(){        
    // Kết nối DB
    var request = window.indexedDB.open(dbName, 1);
     // Nếu thành công. Tiến hành lấy notes về
    request.onsuccess = async event => {
      this.db = request.result;      
      await this.getCacheLocation();      
    };

    // Kết nối lần đầu. Tiến hành khởi tạo objectStore với tên collection
    request.onupgradeneeded = event => {
      this.db = event.target.result;
      this.db.createObjectStore(collection, {
        autoIncrement: true
      });
    };  
  },
  methods: {
    comboProvinceBeforeExpand(){
        debugger
    },

    comboProvinceSelected(option){
        debugger
        this.districtValue = null; //xóa huyện, xã đi
        this.wardValue = null;
    },

    comboDistrictBeforeExpand(){
        debugger
        if(!this.provinceValue) return;
        else{
          let code = this.storeLocationAll.find(x=>x.location_name == this.provinceValue)?.location_code;
          this.storeDistrict = (this.storeLocationAll.filter(x=>x.parent_code == code)).map(x=>x.location_name);
        }
    },

    comboDistrictSelected(){
        debugger
       this.wardValue = null;
    },

    comboWardBeforeExpand(){
       if(!this.districtValue) return;
        else{
          let code = this.storeLocationAll.find(x=>x.location_name == this.districtValue)?.location_code;
          this.storeWard = (this.storeLocationAll.filter(x=>x.parent_code == code)).map(x=>x.location_name);
        }
    },

    comboWardSelected(){
      debugger
    },

    

    /**
     * Hàm xử lý khi click filter tỉnh thành
     * @created : quyetkaio
     * @param {Number} filterOption: 0- bắc, 1 trung, 2 nam
     */
    filterButtonClick(filterOption){
      if(filterOption != null){
        let locations = [];
         switch (filterOption) {
          case 0:{
            //filter miền bắc
            debugger
            locations = locationConfigCode.bacLocation;
            this.storeLocation = this.storeLocationAll.filter(x=> locations.includes(x.location_code));
            this.showPaging = false;
            break;
          }
          case 1: 
            //filter miền trung
            locations = locationConfigCode.trungLocation;
            this.storeLocation = this.storeLocationAll.filter(x=> locations.includes(x.location_code));
            this.showPaging = false;
            break;
          case 2:
            //filter miền nam
            locations = locationConfigCode.namLocation;
            this.storeLocation = this.storeLocationAll.filter(x=> locations.includes(x.location_code));
            this.showPaging = false;
            break;
         
          default:
            break;
         }
      }
    },

    /**
     * Hàm xử lý khi số trang thay đổi
     */
    setCurrentPage(page){
      if(this.pageNumber == page) return;
      this.pageNumber = page;
      //thực hiện filter lại
      this.filterData(this.pageNumber);
    },

    /**
     * Hàm tìm kiếm(local)
     */
    filterData(pageNumber){
        if(this.textSearch){              
              let _textSearch = this.textSearch.toLowerCase();
              this.storeLocation = this.storeLocationAll.filter((x,index) => 
                index >= (pageNumber-1)*this.pageSize && index < pageNumber*this.pageSize
                && (x.location_code.toLowerCase().includes(_textSearch) || x.location_name.toLowerCase().includes(_textSearch))
                );  
              this.showPaging = true; 
        }else{
           this.storeLocation = this.storeLocationAll.filter((x,index) => index >= (pageNumber-1)*this.pageSize && index < pageNumber*this.pageSize);
           this.showPaging = true;
        }
    },


    /**
     * Lấy dữ liệu trong indexDB ra
     */
    async getCacheLocation() {
      this.locations = [];
      var objectStore = await this.db.transaction(collection).objectStore(collection);      
      // Sử dụng cursor để lấy lần lượt dữ liệu
      // objectStore.openCursor().onsuccess = async event => {
      //   var cursor = event.target.result;        
      //   if (cursor) {
      //     // Nếu có cursor. Push dữ liệu và tiếp tục với record tiếp theo
      //     this.locations.push({
      //       id: cursor.key,
      //       value: cursor.value
      //     });
      //     cursor.continue();
      //   }
      //   if(!this.locations || this.locations?.length == 0){
      //     this.getFreshLocation();
      //   }else{
      //     debugger
      //     this.storeLocation = this.locations[0].value.filter((x,index)=> index<=10);
      //     this.storeLocationAll = this.locations[0].value;
      //   }
      // };

      let cacheLocations = objectStore.get("locations"); //get theo key
      cacheLocations.onsuccess = ()=>{
        if(cacheLocations.result && cacheLocations.result.length > 0){
          this.storeLocation = cacheLocations.result.filter((x,index)=> index<10);
          this.storeLocationAll = cacheLocations.result;
          this.totalPage = Math.round(this.storeLocationAll.length/10);
          this.initDataLocation();
        }else{
          this.getFreshLocation();
        }                 
      }      
    },

    /**
     * Thêm mới vào db
     * @param {Object|Array} data - dữ liệu cần lưu vào indexedDB
     */
    async addLocation(data) {
      // Tạo transaction với mode readwrite      
      var request = await this.db
        .transaction(collection, "readwrite")
        .objectStore(collection)
        .add(data, "locations");       
      request.onsuccess = event => {
        // Lấy lại danh sách sau khi đã thêm giá trị mới thành công
        this.getCacheLocation();
      };
    },

    searchData: _.debounce(function () {
        let me = this;
        if(me.textSearch){
            let _textSearch = me.textSearch.toLowerCase();        
            me.storeLocation = me.storeLocationAll.filter(x=>x.location_code.toLowerCase().includes(_textSearch) || x.location_name.toLowerCase().includes(_textSearch));            
        }else{
            me.storeLocation = me.storeLocationAll.filter(x=>me.storeLocationAll.indexOf(x) < 10);            
        }
        // if(me.storeLocation && me.storeLocation.length == 0) this.showPaging = false;
        // else{
        //    if(me.storeLocation && me.storeLocation.length > 0){
        //       me.totalPage = Math.round(me.storeLocationAll.length/10) ? Math.round(me.storeLocationAll.length/10) : 1;
        //       this.showPaging = true;
        //    }
        // }
    }, 1000),
    

    /**------------------------------------------
        * Nhận sự kiện khi button của function được click
        * @created : quyetkaito (26/06/2022)
        --------------------------------------------*/
    handleFunctionClick(object) {
      let me = this;
      if (object) {
        //kiểm tra xem nó là loại gì sửa hay xem hay xóa..
        switch (me.tableFunction.mainFunction) {
          case "Edit": {
            // me.showDialog(object);
          }
        }
      }
    },

    handleDoubleClick() {},

    async initStaticData() {
      //gọi api lấy tất cả danh sách tỉnh huyện xã, lưu vào cache
      let me = this;
      me.tableFunction = {
        mainButtonText: "Sửa",
        mainFunction: "Edit",
        isShow: false,
      };
      me.columns = [
        {
          title: "Tên địa điểm",
          key: "location_name",
          width: 200,
        },
        {
          title: "Mã",
          key: "location_code",
          width: 200,
        },
      ];     
    
    },

    /**
     * Hàm lấy mới danh sách địa chỉ
     */
    async getFreshLocation(){
      let me = this;      
      let res = await LocationAPI.request(LocationAPI.urlName, "get");
      if (res && res.data && res.data.length > 0) {
          me.storeLocation = res.data.filter(x=>x.parent_code == null);    
          me.storeLocationAll  = res.data;
          this.addLocation(res.data); //lưu vào indexedDB
          this.totalPage = Math.round(this.storeLocationAll.length/10);
          this.initDataLocation();
      }
    },

    initDataLocation(){
      if(this.storeLocationAll && this.storeLocationAll.length > 0){
        this.storeProvince = (this.storeLocationAll.filter(x=>x.parent_code == null)).map(x=>x.location_name);          
      }
    }
  },
};
</script>

<style lang="scss">
.location-list{
  .filter{
    margin: 10px;    
    display: flex;
    .filter-button{
      height: 40px;
      width: fit-content;
      white-space: nowrap;
      background: white;
      color: black;
      border-radius: 5px;
      margin-right: 5px;
      margin-left: 5px;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .filter-button:hover{
      background: var(--info-color);
      color: white;
    }
    .filter-button.active{
        background: var(--info-color);
        color: white;
    }
    .filter-combo{
      width: 200px;
      margin-right: 5px;
    }
  }
  .content-grid{
    // .paging-container{
    //   margin-top: 5px;
    //   margin-left: 5px;
    // }
  }
}
</style>