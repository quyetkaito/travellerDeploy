<template>
  <!-- Content riêng của trang Employee -->
  <div class="content">
    <div class="employee-top">
      <div class="content-top">
        <div class="page-title">{{ $t('VoucherList') }}</div>
        <m-button :text="$t('common.add_new')" @click="showToast" />
      </div>
    </div>
    <div class="employee-bottom">
      <div class="content-bottom">
        <div class="filter-area flex">
          <!-- Xóa nhiều -->
          <div class="flex align-x-y-center">
            <button class="m-btn-dropdown">
              <div class="m-btn-text text-dropdown">Thực hiện hàng loạt</div>
              <div class="m-icon m-icon-16 m-icon-dropdown"></div>
            </button>
            <div
              class="dropdown-button"
              v-if="isShowMultiAction && listEmployeeChecked.length > 0"
            >
              <div class="m-dropdown-item" @click="handleMultiDelete">
                {{ multiDeleteText }}
              </div>
            </div>
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
                class="m-icon m-icon-24 m-refresh btn-refresh"
                @click="loadData()"
              ></div>
              <!-- <ms-tooltip
                class="hide"
                text="Lấy lại dữ liệu"
                :isRectangle="true"
              /> -->
            </div>
            <div style="position: relative">
              <div
                class="m-icon m-icon-24 m-excel__nav btn-export"
                @click="exportData"
              ></div>
              <!-- <ms-tooltip
                class="hide"
                text="Xuất ra excel"
                :isRectangle="true"
              /> -->
            </div>
          </div>
        </div>

        <!-- Bảng -->
        <div class="content-grid">
          <div class="table-container">
            <m-grid
              ref="mygrid"
              :listData="storeVoucher"
              :columns="columns"
              :pageSize="pageSize"
              :isShowSkeleton="isShowSkeleton"
              functionText="Sửa"
              @onUpdate="handleUpdate"
              @onDelete="handleDelete"
              @eShowFunc="showFunction"
              @handleHideFunc="hideFunction"
              @eMultiSelect="getitemSelected"
              @delete="handleDelete"
            />
          </div>
        </div>

        <!-- Ảnh hiển thị nếu không có dữ liệu -->
        <div
          class="flex align-center"
          style="width: 100%; flex-direction: column"
          v-show="Object.keys(storeVoucher).length === 0 && dataFilter != ''"
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
        <div class="m-paging" v-show="Object.keys(storeVoucher).length !== 0">
          <div class="paging-left">
            <!-- <ms-table-counter :record="totalEmp" /> -->
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
            />
            <!-- Paging action -->
            <!-- <m-pagination
              :totalPage="totalPage"
              :currentPage="pageNumber"
              :pageSize="pageSize"
              @changeCurrentPage="setCurrentPage"
            /> -->
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

    <!-- <ms-dropdown-content
      ref="mTableFunction"
      directionY="right"
      :optionObjects="tableFunction"
      @eData="getValueFromDropdown"
    /> -->
  </div>
</template>

<script>
//import Library
import SimpleDialog from '@/components/m-message/SimpleDialog.vue'
import { ref } from 'vue'
import axios from "axios";
// import vClickOutside from "click-outside-vue3";
import _ from "lodash";
// const FileDownload = require("js-file-download");
//multi vue 3
import vMultiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";

import VoucherAPI from "@/api/VoucherAPI";
export default {
  name: "EmployeeList",
  components: {
    // "ms-employee-dialog": EmployeeDetail,
    // "ms-pagination": MSPagination,
    "v-multiselect": vMultiselect,
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
      pageTitle: "Mã giảm giá",
      storeVoucher: [], //danh sách mã giảm giá
      isShowDialog: false, //dialog có hiện không?
      isShowPopup: false, //popup có hiện không?

      isShowFunc: false, //function của table có hiện không?
      isShowMultiAction: false, //dropdown của thực hiện hàng loạt có hiện không?
      isShowSkeleton: false, //có đang hiện skeleton ko?
      itemSelected: {}, //đối tượng nhân viên đang được chọn để thao tác.
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
      totalEmp: null, //tổng số bản ghi dữ liệu
      dataFilter: "", //giá trị để tìm kiếm
      multiDeleteText: "Xóa",
      //thông tin khởi tạo table
      //danh sách các tiêu đề và fieldName của bảng
      columns: [
        {
          title: "Mã giảm giá",
          key: "voucher_code",
          width: 200,
        },
        {
          title: "Mô tả",
          key: "description",
          width: 200,
        },
        {
          title: "Ngày bắt đầu",
          key: "start_date",
          width: 200,
          dataType: "date",
          titleAlign: "center",
        },
        {
          title: "Ngày hết hạn",
          key: "expiration_date",
          dataType: "date",
          titleAlign: "center",
          width: 200,
        },
        {
          title: "Số lượng mã",
          key: "quantity",
          width: 50,
          titleAlign: "right",
        },
        {
          title: "Phần trăm giảm trên đơn hàng(%)",
          key: "discount_rate",
          width: 50,
          titleAlign: "right",
        },
        {
          title: "Số tiền giảm trực tiếp",
          key: "discount_amount",
          width: 200,
          titleAlign: "right",
        },
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
    onConfirm(){
        this.showLogo.value = false
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
     * Hàm thực hiện đóng dialog nhân viên.
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
    // handleMultiDelete() {
    //   this.isMultiDelete = true;
    //   //show cảnh báo xóa nhiều
    //   this.showPopup(this.$enum.PopupType.DataDelete);
    // },

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
     * @param {Array} listChecked - mảng các đối tượng nhân viên được chọn.
     * Author: quyetkaito (14/03/2022)
     -------------------------------------------------------*/
    getitemSelected(listChecked) {
      try {
        //lấy ra id của đối tượng
        listChecked.forEach((employee) => {
          //push vào mảng các id của nhân viên
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
        me.storeVoucher = [];
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
        //gọi API lấy dữ liệu nhân viên
        let res = await VoucherAPI.request(`${VoucherAPI.urlName}/filter?textFilter=${textFilter}`,"get");
        if(res && res.data){            
            if(res.data.Data && res.data.Data.length >0){
                me.storeVoucher = res.data.Data;
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

    /**-------------------------------
     * Hàm xử lý mở Dialog nhân viên
     * @param {Object} data - đối tượng nhân viên truyền vào
     * @param {Number} formMode - trạng thái form thêm/sửa/xóa
     * Author: quyetkaito (16/03/2022)
     ---------------------------------*/
    openDialog({ data, formMode }) {
      try {
        //gán formMode
        this.formMode = formMode;
        //nếu là thêm mới hoặc nhân bản
        if (
          formMode == this.$enum.FormMode.Post ||
          formMode == this.$enum.FormMode.Clone
        ) {
          //gọi lấy mã mới
          this.$refs.addDialog.getNewEmployeeCode();
        }
        this.itemSelected = data;
        if (this.itemSelected.DateOfBirth) {
          //format ngày sinh để cho vào datepicker
          this.itemSelected.DateOfBirth = new Date(
            this.itemSelected.DateOfBirth
          );
        }
        if (this.itemSelected.IdentityDate) {
          //format ngày cấp cmnd để cho vào datepicker
          this.itemSelected.IdentityDate = new Date(
            this.itemSelected.IdentityDate
          );
        }
        //show dialog
        this.isShowDialog = true;
      } catch (error) {
        this.showDefaultErrorNotify();
        console.error(error);
      }
    },

    /**-------------------------------------------------
     * Thực hiện show/hide dialog truyền cho child component.
     * @param {Boolean} value - true là hiện, false là ẩn .
     * Author: quyetkaito (24/02/2022)
     ---------------------------------------------------*/
    // showEmployeeDialog(value) {
    //   this.isShowDialog = value;
    // },

    /**-------------------------------------------
     * Hàm thực hiện xóa employee.
     * @param {Object} employee - 1 đối tượng cần xóa.
     * Author: quyetkaito (22/02/2022)
     ---------------------------------------------*/
    // deleteEmployee(employee) {
    //   const me = this;
    //   //hiện loading
    //   me.$refs.mLoading.show();
    //   //2. thực hiện xóa
    //   axios
    //     .delete(`${LOCAL_EMPLOYEE_API_URL}/${employee.EmployeeId}`)
    //     .then(function () {
    //       //đóng popup
    //       me.showMessagebox(false);
    //       //ẩn loading
    //       me.$refs.mLoading.hide();
    //       //thông báo thành công
    //     //   me.toastText = Resource.SuccessDelete;
    //       me.$refs.msToast.show();
    //       //load lại dữ liệu
    //       me.loadData();
    //     })
    //     .catch((error) => {
    //       //hiển thị popup thông báo ko thành công
    //     //   me.showPopup(this.$enum.PopupType.DataError, Resource.FailDelete);
    //       me.handleException(error);
    //       //ẩn loading
    //       me.$refs.mLoading.hide();
    //     });
    // },

    /**------------------------------------------
     * Hàm xử lý nhận sự kiện sửa từ table.
     * @param {Object} - một đối tượng cần sửa + formMode.
     * Author: quyetkaito (23/02/2022)
     --------------------------------------------*/
    handleUpdate({ data, formMode }) {
    //   let me = this;
    //   if (data) {
    //     //show loading
    //     me.$refs.mLoading.show();
    //     //lấy thông tin mới từ server bind vào form
    //     axios
    //       .get(`${LOCAL_EMPLOYEE_API_URL}/${data.employee_id}`)
    //       .then((res) => {
    //         //gán dữ liệu mới để bind vào form
    //         me.itemSelected = res.data;
    //         me.itemSelected.date_of_birth = new Date(
    //           me.itemSelected.date_of_birth
    //         );
    //         me.itemSelected.identity_date = new Date(
    //           me.itemSelected.identity_date
    //         );
    //         //chuyển trạng thái submit sang sửa
    //         me.formMode = formMode;
    //         //show dialog
    //         me.showEmployeeDialog(true);
    //         //ẩn loading
    //         me.$refs.mLoading.hide();
    //       })
    //       .catch((error) => {
    //         me.handleException(error);
    //         //ẩn loading
    //         me.$refs.mLoading.hide();
    //       });
    //   }
    },

    /**-----------------------------------------------
     * Hàm xử lý khi nút [Xóa] được click.
     * @param {Object} object - 1 đối tượng cần xóa.
     * Author: quyetkaito (25/02/2022)
     ------------------------------------------------*/
    handleDelete(object) {
      if (object) {
        //gán employeSelected hiện tại truyền cho child
        this.itemSelected = object;
        //hiện dialog cảnh báo
        
        // this.showPopup(this.$enum.PopupType.DataDelete);
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
     * @param {Object} object - đối tượng nhân viên.
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

    /**------------------------------
     * Get lựa chọn table function
     * @param {Number} value - giá trị của table function
     * Author: quyetkaito (08/03/2022)
     -------------------------------*/
    async getValueFromDropdown(value) {
      //nếu là xóa
      if (value == this.$enum.TableFunction.Delete) {
        this.handleDelete(this.itemSelected);
        this.isShowFunc = false;
      }
      //nếu là nhân bản
      if (value == this.$enum.TableFunction.Clone) {
        //gọi hàm clone
        this.openDialog({
          data: this.itemSelected,
          formMode: this.$enum.FormMode.Clone,
        });
        await this.$refs.addDialog.getDepartment();
        this.$refs.addDialog.setDepartment();
        this.$refs.addDialog.autoFocus();
        this.isShowFunc = false;
      }
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

    /**-----------------------------------------------
     * Hàm thực hiện reset lại các tùy chọn phân trang.
     * Author: quyetkaito (03/03/2022)
    -------------------------------------------------*/
    reset() {
      this.pageNumber = 1; //mặc định trang 1
      this.pageSize = 10; //mặc định 10 bản ghi 1 trang
    },
  },
  computed: {},
  watch: {
    /**-------------------------------------------
     * Bắt sự thay đổi của pageSize. Thay đổi số bản ghi hiển thị một trang
     * Author: quyetkaito (15/03/2022)
     -------------------------------------------*/
    pageSize: function () {
      this.pageNumber = 1;
      if (this.dataFilter != "") {
        this.filterDataServer(this.pageNumber);
      } else {
        this.loadData();
      }
    },

    /**-------------------------------
     *Bắt sự thay đổi của ô tìm kiếm.
     *Author: quyetkaito (16/03/2022)
     ---------------------------------*/
    dataFilter: function () {
      this.pageNumber = 1;
    },
  },
};
</script>

<style>
@import url("/src/style/page/employee.css");
@import url("/src/style/page/base-page.css");
</style>
