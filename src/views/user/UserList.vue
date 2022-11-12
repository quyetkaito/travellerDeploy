<template>
  <!-- Content riêng của trang Employee -->
  <div class="content">
    <div class="content-top-container">
      <div class="content-top">
        <div class="page-title">{{ $t('UserManager') }}</div>
        <m-button :text="$t('common.add_new')" @click="buttonClick('Add')" />
      </div>
    </div>
    <div class="">
      <div class="content-bottom">
        <div class="filter-area flex">
          <!-- Xóa nhiều -->
          <div class="flex align-x-y-center">
            <button class="m-btn-dropdown" :disabled="itemSelected<2" @click="multiDelete">
              <div class="m-btn-text text-dropdown">{{$t("MultiDelete")}}</div>              
            </button>            
          </div>
          <!-- Các component filter dữ liệu -->
          <div class="content-filter flex align-y-center justify-end">
            <!-- Input Search -->
            <div style="width: 240px">
              <m-input
                ref="searchInput"
                :showLabel="false"
                :maxlength="255"
                :width="240"
                :isHasIcon="true"
                v-model="dataFilter"
                placeholder="Tìm kiếm"
                @input="lodashDelay(value)"
                @findData="filterDataServer"
              />
            </div>

            <div style="position: relative">
              <div
                title="Lấy lại dữ liệu"
                class="m-icon m-icon-24 m-refresh btn-refresh"
                @click="buttonClick('Refresh')"
              ></div>              
            </div>
            <div style="position: relative">
              <div
              title="Xuất ra excel"
                class="m-icon m-icon-24 m-excel__nav btn-export"
                @click="exportData"
              ></div>              
            </div>
          </div>
        </div>

        <!-- Bảng -->
        <div class="content-grid">
          <div class="table-container">
            <m-grid
              ref="mygrid"
              :listData="storeUser"
              :columns="columns"
              :pageSize="pageSize"
              :isShowSkeleton="isShowSkeleton"
              functionText="Sửa"
              @eShowFunc="showFunction"
              @handleHideFunc="hideFunction"
              @eMultiSelect="getitemSelected"
              @eDoubleClick="view"
              @gridAction="handleGridAction"
            />
          </div>
        </div>

        <!-- Ảnh hiển thị nếu không có dữ liệu -->
        <div
          class="flex align-center"
          style="width: 100%; flex-direction: column"
          v-show="Object.keys(storeUser).length === 0 && dataFilter != ''"
        >
          <img
            src="@/assets/img/bg_report_nodata.76e50bd8.svg"
            alt=""
            width="100"
            height="100"
          />
          <p style="margin: 0px; padding: 0px">Không có dữ liệu</p>
        </div>

        <!-- Paging -->
        <div class="m-paging" v-show="Object.keys(storeUser).length !== 0">
          <div class="paging-left">
            <div class="m-table-counter flex">
              <div class="m-table-counter__label">Tổng số: </div>
              <div class="m-table-counter__number mr-1 ml-1 font-semibold">{{$commonFunc.formatNumber(totalRecord)}}</div>
              <div class="m-table-counter__record">bản ghi</div>
            </div>
          </div>
          <div class="paging-right">
            <!-- Combobox Paging -->
            <!-- <vue-select
              ref="comboPaging"
              style="width: 200px !important"
              :options="pagingOptions"
              v-model="pageSize"
              :label-by="(pagingOptions) => pagingOptions.label"
              :value-by="(pagingOptions) => pagingOptions.value"
              placeholder=""
              close-on-select
              :disabled="disableComboboxPaging"
            >
            </vue-select> -->
            <v-multiselect
              ref="comboPaging"
              style="width: 250px !important"
              v-model="pageSize"
              :options="pagingOptions"
              label="label"
              :close-on-select="true"
              :clearOnSelect="true"
              :searchable="false"
              noResultsText="Không có dữ liệu hiển thị"
              :disabled="false"
              :canClear="false"
              :canDeselect="false"
              openDirection="top"
              @select="comboPagingSelected"
            />
            <!-- Paging action -->
            <div class="pagination-container">
              <m-pagination
                :totalPage="totalPage"
                :currentPage="pageNumber"
                :pageSize="pageSize"
                @changeCurrentPage="setCurrentPage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <ms-employee-dialog
      ref="addDialog"
      :isShow="isShowDialog"
      @showDialog="showEmployeeDialog(value)"
      @eCloseDialog="closeDialog"
      @loadData="loadData()"
      :itemSelected="itemSelected"
      :formMode="formMode"
    /> -->
    <!-- <ms-popup
      ref="popup"
      :popupType="popupType"
      :isShow="isShowPopup"
      :itemSelected="itemSelected"
      @showPopup="showMessagebox(isShow)"
      @deleteComfirm="deleteEmployee(itemSelected)"
      @multiDeleteConfirm="multiDeleteEmployee"
      :text="popupText"
      :isMultiDelete="isMultiDelete"
    />    -->
  </div>
  <user-detail ref="userDialog"/>
</template>

<script>
//import Library
import _ from "lodash";
// const FileDownload = require("js-file-download");
//multi vue 3
import vMultiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import UserAPI from "@/api/UserAPI";
import UserDetail from "@/views/user/UserDetail.vue";

export default {
  name: "EmployeeList",
  components: {
    // "ms-employee-dialog": EmployeeDetail,
    // "ms-pagination": MSPagination,
    "v-multiselect": vMultiselect,
    "user-detail": UserDetail
  },
  //   directives: {
  //     clickOutside: vClickOutside.directive,
  //   },

  /**---------------------------
   * Giai đoạn 2: có thể truy cập vào data, event, chưa truy cập dc DOM
   -----------------------------*/
  created() {
    this.loadData();
  },

  /**--------------
   * Data
  -----------------*/
  data() {
    return {
      storeUser: [], //danh sách người dùng
      isShowDialog: false, //dialog có hiện không?
      isShowPopup: false, //popup có hiện không?

      isShowFunc: false, //function của table có hiện không?
      isShowMultiAction: false, //dropdown của thực hiện hàng loạt có hiện không?
      isShowSkeleton: false, //có đang hiện skeleton ko?
      itemSelected: {}, //đối tượng đang được chọn để thao tác.
      formMode: 0, //trạng thái form đang là gì?
      //set text,type cho popup
      popupText: null,
      popupType: null,
      isMultiDelete: false, //có đang xóa nhiều không?
      //thông tin của toast
      toastText: "toast-text",
      toastType: 0,
      //các option cho paging
      pagingOptions: [
        {
          label: "10 bản ghi trên 1 trang",
          value: 10,
        },
        {
          label: "20 bản ghi trên 1 trang",
          value: 20,
        },
        {
          label: "30 bản ghi trên 1 trang",
          value: 30,
        },
        {
          label: "50 bản ghi trên 1 trang",
          value: 50,
        },
        {
          label: "100 bản ghi trên 1 trang",
          value: 100,
        },
      ],
      disableComboboxPaging: false,
      pageNumber: 1, //trang số bao nhiêu
      pageSize: 10, //số bản ghi trên 1 trang
      totalPage: null, //tổng số trang
      totalRecord: null, //tổng số bản ghi dữ liệu
      dataFilter: "", //giá trị để tìm kiếm
      multiDeleteText: "Xóa",
      //thông tin khởi tạo table
      //danh sách các tiêu đề và fieldName của bảng
      columns: [
        {
          title: "Họ và tên",
          key: "full_name",
          width: 200,
        },
        {
          title: "email",
          key: "email",
          width: 200,
        },
        {
          title: "Ngày sinh",
          key: "date_of_birth",
          width: 200,
          dataType: "date",
          titleAlign: "center",
        },
        {
          title: "Tên đăng nhập",
          key: "username",                    
          width: 200,
        },
        {
          title: "Vai trò",
          key: "role_name",                    
          width: 70,                  
        },
        {
          title: "Số điện thoại",
          key: "phone",
          width: 150,
          titleAlign: "left",
        },
        {
          title: "Giới tính",
          key: "gender_name",
          width: 70,
          titleAlign: "left",
        }       
      ],
      //các function của table
      tableFunction: [
        {
          title: "Nhân bản",
          value: this.$enum.TableFunction.Clone,
        },
        {
          title: "Xóa",
          value: this.$enum.TableFunction.Delete,
        },
        {
          title: "Ngừng sử dụng",
          value: this.$enum.TableFunction.Stop,
        },
      ],
      listEmployeeChecked: [],
    };
  },

  /**-----------------
   * Các phương thức
   -------------------*/
  methods: {
    /**
     * Xử lý combo paging thay đổi
     */
    comboPagingSelected(option){        
        if(option){
          this.pageSize = option;
          this.loadData();
        }
    },
    /**
    * Hàm nhận sự kiện gửi từ grid ra
    * @created : quyetkaito 07/10/2022
    */
    handleGridAction(options){
        if(options){
            if(options.object){
                if(options.action == 'View'){
                    this.view(options.object);
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
    /**
    * Hàm xử lý sự kiện cho các button trên màn hình
    * @created : quyetkaito 04/10/2022
    * @param {string} action : tên hành đông
    */
    buttonClick(action){
        if(!action) return;
        let me = this;
        switch(action){
            case 'Add':
                me.add();
                break;
            case 'Edit':
                me.edit();
                break;
            case 'View':
                me.view();
                break;
            case 'Refresh':
                me.loadData();
                break;
            default: 
            break;
        }
    },

    view(object){
        if(object){
            let me = this;            
            if(me.$refs.userDialog && typeof me.$refs.userDialog.show == "function"){
                me.$refs.userDialog.show();
                //bắn dữ liệu lên form
                if(typeof me.$refs.userDialog.bindData == "function"){
                    me.$refs.userDialog.bindData(object, 'View');                    
                }
            }           
        }
    },

    /**
    * Hàm xử lý sửa đối tượng
    * @created : quyetkaito 06/10/2022
    */
    edit(object){
        if(object){
            let me = this;            
            if(me.$refs.userDialog && typeof me.$refs.userDialog.show == "function"){
                me.$refs.userDialog.show();
                //bắn dữ liệu lên form
                if(typeof me.$refs.userDialog.bindData == "function"){
                    me.$refs.userDialog.bindData(object, 'Edit');                    
                }
            }           
        }
    },

    /**
    * hàm xử lý xóa đối tượng
    * @created : quyetkaito 07/10/2022
    */
    async deleteObject(object){
        if(object){
            //cảnh báo có thực sự muốn xóa không
            let me = this;
            if(confirm("bạn có thực sự muốn xóa ko")){
                if(object.user_id){
                    me.$commonFunc.load();
                    try {
                        await UserAPI.request(`${UserAPI.urlName}/${object.user_id}`, 'DELETE').then(res=>{
                            console.log(`res`, res);
                            me.$commonFunc.unload();
                            me.buttonClick('Refresh');
                        })        
                    } catch (error) {
                        me.handleException(error);
                    }                    
                }
            }
        }
    },

    /**
    * Hàm xử lý thêm mới đối tượng
    * @created : quyetkaito 04/10/2022
    */
    add(){  
        //mở form
        let me = this;
        if(me.$refs.userDialog && typeof me.$refs.userDialog.show == "function"){
            me.$refs.userDialog.show('Add');
        }
        //khởi tạo dữ liệu ban đầu
    },

    showToast() {
        //show toast
        //   this.$store.commit("showError", {
        //     message: "Lỗi rồi em ei",
        //   });
        // this.$store.commit("setLang", "en");
        //thay đổi ngôn ngữ
        // this.$i18n.changeLocale('en');

    },

    /**--------------------------
     * Hàm thực hiện đóng dialog
     * Author: quyetnv(22/03/2022)
     -----------------------------*/
    closeDialog() {
      this.itemSelected = {};
      this.formMode = 0;
      this.isShowDialog = false;
    },

    /**----------------------------------
     * Hàm gọi API xuất dữ liệu.
     * Author: quyetkaito (15/03/2022)
    -------------------------------*/
    exportData() {
      let me = this;
      me.$refs.mLoading.show();
      let object = {};
      object.tableInfos = me.listHeader;
      object.dataFilter = me.dataFilter;
      //gửi lên server danh sách các header
    //   axios
    //     .post(`${LOCAL_EMPLOYEE_API_URL}/export`, object, {
    //       responseType: "blob",
    //     })
    //     .then((response) => {
    //       FileDownload(response.data, "Danh_sach_nhan_vien.xlsx");
    //       me.$refs.mLoading.hide();
    //     })
    //     .catch(() => {
    //       me.$refs.mLoading.hide();
    //     });
    },

    /**--------------------------------------
     * Xử lý khi nút [Xóa hàng loạt] được chọn
     * Author: quyetkaito (14/03/2022)
    ----------------------------------*/
    multiDelete() {
      this.isMultiDelete = true;
      //show cảnh báo xóa nhiều
      // this.showPopup(this.$enum.PopupType.DataDelete);
    },

    /**----------------------------
     * Thực hiện gọi API xóa nhiều.
     * Author: quyetkaito (14/03/2022)
     ------------------------------*/
    // multiDeleteEmployee() {
    //   let me = this;
    //   //hiện loading
    //   me.$refs.mLoading.show();
    //   //gọi API xóa nhiều
    //   axios
    //     .delete(`${LOCAL_EMPLOYEE_API_URL}`, { data: me.listEmployeeChecked })
    //     .then(() => {
    //       //đóng popup
    //       me.showMessagebox(false);
    //       //thông báo thành công
    //     //   me.toastText = Resource.SuccessDelete;
    //       me.$refs.msToast.show();
    //       //reset lại danh sách employee được chọn
    //       me.listEmployeeChecked = [];
    //       me.isMultiDelete = false;
    //       //ẩn loading
    //       me.$refs.mLoading.hide();

    //       //load lại dữ liệu
    //       me.loadData();
    //       //bỏ dấu check all
    //       this.$refs.mygrid.unCheckAll();
    //     })
    //     .catch((error) => {
    //       me.handleException(error);
    //       //reset lại danh sách employee được chọn
    //       me.listEmployeeChecked = [];
    //       me.isMultiDelete = false;
    //       me.$refs.mLoading.hide();
    //     });
    // },

    /**-----------------------------------------------------
     * Lấy danh sách id của các employee được chọn từ bảng.
     * @param {Array} listChecked - mảng các đối tượng được chọn.
     * Author: quyetkaito (14/03/2022)
     -------------------------------------------------------*/
    getitemSelected(listChecked) {
      try {
        //lấy ra id của đối tượng
        listChecked.forEach((employee) => {
          //push vào mảng các id 
          this.listEmployeeChecked.push(employee.employee_id);
        });
      } catch (error) {
        //log ra lỗi
        console.error(error);
      }
    },

    /**-----------------------------------
     * Thực hiện ẩn/ hiện nút "Xóa nhiều".
     * Author: quyetkaito (14/03/2022)
     -------------------------------------*/
    toggleMultiAction() {
      this.isShowMultiAction = !this.isShowMultiAction;
    },

    /**--------------------------------
     * Thực hiện ẩn nút "Xóa nhiều".
     * Author: quyetkaito (14/03/2022)
     ---------------------------------*/
    hideMultiAction() {
      this.isShowMultiAction = false;
    },

    /**-------------------------------------
     * Thực hiện delay call API khi tìm kiếm.
     * Author: quyetkaito (15/03/2022)
    ---------------------------------*/
    lodashDelay: _.debounce(function () {
      this.filterDataServer();
    }, 1200),

    /**--------------------------------
     * Hàm gọi API tìm kiếm dữ liệu từ server.
     * Author: quyetkaito (03/03/2022)
     ----------------------------------*/
    filterDataServer() {
      let me = this;    
      me.loadData();
    },

    /**----------------------------------------
     * Hàm thực hiện load data (đã phân trang) binding vào bảng.
     * Author: quyetkaito (25/02/2022)
     ------------------------------------------*/
    async loadData() {
      try {
        let me = this;
        //không cho phân trang
        me.disableComboboxPaging = true;        
        me.storeUser = [];
        // me.itemSelected = {};
        me.formMode = 0;
        if (!me.pageSize) me.pageSize = 10;
        if (!me.pageNumber || me.pageNumber != 1) me.pageNumber = 1;
        //show loading
        me.isShowSkeleton = true;
        //mã hóa dữ liệu truyền lên
        let textFilter;
        if(me.dataFilter){
            //var buf = new Buffer(b64string, 'base64');
            debugger
            this.$commonFunc.convertToBase64(me.dataFilter);
            // const buff = Buffer.from(me.dataFilter);
            // const base64 = buff.toString('base64');            
        }
        if(!textFilter) textFilter="";
        //gọi API lấy dữ liệu
        let res = await UserAPI.request(`${UserAPI.urlName}/filter`,"get");
        if(res && res.data){            
            if(res.data.Data && res.data.Data.length >0){
                me.storeUser = res.data.Data;
                me.totalRecord = res.data.TotalRecord;
                me.totalPage = res.data.TotalPage;
            }
        }
        me.isShowSkeleton = false;
        me.disableComboboxPaging = false;        
          
      } catch (error) {
        this.showDefaultErrorNotify();
        this.isShowSkeleton = false;
        console.error(error);
      }
    },

    /**----------------------------------------------
     * show thông báo lỗi mặc định cho người dùng.
     * Author: quyetkaito (8/03/2022)
     ------------------------------------------------*/
    showDefaultErrorNotify() {
      this.$store.commit("showError",{
        message: 'lỗi rồi'
        });
    },

    /**-------------------------------
     * Hàm xử lý exception api trả về.
     * @param {Exception} error - exception từ api trả về
     * Author: quyetkaito (08/03/2022)
     ---------------------------------*/
    handleException(error) {
      let me = this;
      let response = error.response;
      if (response.status) {
        switch (error.response.status) {
          case this.$enum.StatusCode.InternalServerError: {
            if (response.data.userMsg) {
              me.showPopup(
                this.$enum.PopupType.DataError,
                response.data.userMsg
              );
            } else {
              me.showDefaultErrorNotify();
            }
            break;
          }
          case this.$enum.StatusCode.BadRequest:
            {
              //400
              //gán message vào popup
              me.showDefaultErrorNotify();
            }
            break;

          default:
            break;
        }
      } else {
        me.showDefaultErrorNotify();
      }
    },

    /**----------------------------------
     * Hàm gọi show popup (true).
     * @param {Number} type: loại popup
     * @param {String} text: nội dung popup 
     * Author: quyetkaito (24/02/2022)
     ------------------------------------*/
    showPopup(type, text) {
      if (type) {
        this.popupType = type;
      }
      if (text) {
        this.popupText = text;
      }
      this.showMessagebox(true);
      //focus vào button đầu tiên(để đóng popup = phím Enter)
      this.$refs.popup.focus();
    },

    /**---------------------------------
     * Thực hiện show/hide messsagebox.
     * @param {Boolean} isShow - true là hiện/ false là ẩn.
     * Author: quyetkaito (25/02/2022)
     -----------------------------------*/
    showMessagebox(isShow) {
      this.isShowPopup = isShow;
    },

    /**---------------------------------------------------------------
     * Hàm thực hiện show table function Xóa/Nhân bản/ Ngừng sử dụng.
     * @param {Object} object - đối tượng
     * Author: quyetkaito (08/03/2022)
     ----------------------------------------------------------------*/
    showFunction(object) {
      if (this.isShowFunc) {
        this.isShowFunc = false;
      } else {
        this.isShowFunc = true;
        this.itemSelected = object;
        this.formMode = this.$enum.FormMode.Clone;
      }
    },

    /**------------------------------------
     * Hàm thực hiện hide table function.
     * Author: quyetkaito (08/03/2022)
     -------------------------------*/
    hideFunction() {
      this.isShowFunc = false;
    },


    /**--------------------------------------
     * Hàm thực hiện cập nhật trang hiện tại.
     * @param {Number} page - số thứ tự của trang (từ 1)
     * Author: quyetkaito (03/03/2022)
    ----------------------------------------*/
    setCurrentPage(page) {
      this.pageNumber = page;
      //thực hiện filter lại
      this.filterDataServer(this.pageNumber);
    },
  },
};
</script>

<style>
@import url("/src/style/page/base-page.css");
.pagination-container{
  margin-left: 10px;  
}
</style>
