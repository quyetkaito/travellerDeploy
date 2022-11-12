<template>
  <table ref="mTable" class="m-table">
    <!-- Table Header -->
    <thead v-if="isHasHeader">
      <tr>
        <th v-if="isDragable" class="w-50"></th>
        <th v-if="multiSelect" class="w-50 table-checkbox">
          <div class="m-checkbox">
            <input type="checkbox" v-model="selectAll" ref="selectAll" />
          </div>
        </th>
        <!-- Lấy tên các header để render ra -->
        <th
          v-for="(header, index) in columns"
          :key="index"
          :style="`width:${header.width}px!important;min-width:${header.width}px!important;`"
        >
          <div
            :title="header.titleFull"
            :style="`justify-content: ${header.titleAlign}`"
            v-if="header.visible != false"
          >
            {{ header.title }}
          </div>
        </th>
        <th v-if="tableFunction.isShow">
          <div class="justify-end">chức năng</div>
        </th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody v-if="listData.length !== 0">
      <tr
        v-for="(object, index) in listData"
        :key="index"
        @dblclick="handleDoubleClick(object)"
        @click="handleClick(object, index)"
      >
        <td v-if="isDragable" class="w-50">
          <div class="m-icon m-icon-24 m-drag-grid"></div>
        </td>
        <td v-if="multiSelect" class="w-50 table-checkbox">
          <div class="m-checkbox">
            <input
              type="checkbox"
              v-model="checkedRows"
              :value="object"
              @change="handleCheckboxChange"
            />
          </div>
        </td>
        <td
          v-for="(column, idx) in columns"
          :key="idx"
          :style="`width:${column.width}px!important;min-width:${column.width}px!important;max-width:300px!important;`"
        >
          <div
            :style="`justify-content: ${column.titleAlign}`"
            v-if="column.visible != false && column.dataType != 'image'"
          >
            <!-- {{ column.width }} -->
            {{ showData(object, column) }}
          </div>
          <div
            :style="`justify-content: ${column.titleAlign}`"
            v-if="column.visible != false && column.dataType == 'image'"
          >
            <img
              :src="getImageSrc(object.src, object.format, object.type)"
              :alt="object.imgAlt"
              :width="object.imgWidth ? object.imgWidth : 50"
              :height="object.imgHeight ? object.imgHeight : 50"
            />
          </div>
        </td>
        <td v-if="tableFunction.isShow">
          <!-- table function -->
          <!-- <div class="m-table-tool flex align-y-center justify-end">
            <div class="m-table-tool__text" @click="mainButtonClick(object)">
              <button class="tool-btn">{{ tableFunction.mainButtonText }}</button>
            </div>
            <div ref="dropdownArrow" class="m-table-tool__icon">
              <div
                class="line flex align-center"
                @click="showOptions($event, object, index)"
                @doubleClick="handleEdit(object)"
              >
                <div class="m-icon m-icon-16 m-arrow-up--blue"></div>
              </div></div>
          </div> -->
          <!-- hết table function -->
          <!-- chức năng chuyển sang dạng nút -->
          <div class="justify-end">
            <div
            v-if="tableFunction.viewButton"
              :title="$t('View')"
              class="m-icon m-icon-24 m-view view-function"
              @click="buttonClick('View', object)"
            ></div>
            <div
            v-if="tableFunction.editButton"
              :title="$t('Edit')"
              class="m-icon m-icon-24 m-edit view-function"
              @click="buttonClick('Edit', object)"
            ></div>
            <div
            v-if="tableFunction.deleteButton"
              :title="$t('Delete')"
              class="m-icon-16 view-function pointer"
              @click="buttonClick('Delete', object)"
            >
              <i class="fas fa-trash-alt text-red-500"></i>
            </div>
            <!-- <div class="m-icon m-icon-16 m-delete"></div>s -->
          </div>
          <!-- hết chức năng  -->
        </td>
      </tr>
    </tbody>
    <!-- Table body skeleton -->
    <tbody v-if="isShowSkeleton && (!listData || listData.length == 0)" class="empty">
      <tr v-for="i in pageSize" v-bind:key="i">
        <td v-for="col in columnSkeleton" :key="col"><div></div></td>
      </tr>
    </tbody>
    <!-- Table Footer -->
    <tfoot v-if="showFooter && listData.length !== 0" class="m-table-footer">
      <tr>
        <th v-if="isDragable" class="w-50"></th>
        <th v-if="multiSelect" class="w-50"></th>
        <th
          v-for="(column, index) in columns"
          :key="index"
          :style="`width:${column.width}px!important;min-width:${column.width}px!important;`"
        >
          <div v-if="index == 0" class="align-center">Tổng</div>
          <div :class="column.align" v-if="index != 0">
            {{ column.total_amount }}
          </div>
        </th>
        <th v-if="isHasFunctionColumn"></th>
      </tr>
    </tfoot>
  </table>
</template>

<script>
// import vClickOutside from "click-outside-vue3";
import * as base from "@/script/base";

export default {
  component: {},
  emits: [
    "eUpdate",
    "onDelete",
    "eDoubleClick",
    "eClick",
    "eShowFunc",
    "handleHideFunc",
    "eMultiSelect",
    "eMainButtonClick", //button chính của function click
    "gridAction"
  ],
  //config của thư viện v-click-outside
  // directives: {
  //   clickOutside: vClickOutside.directive,
  // },

  //danh sách các prop
  props: {
    //list data render ra bảng
    listData: {
      type: Object,
      default: null,
      required: true, //bắt buộc có
    },
    //list các column của bảng
    columns: {
      type: Array, //mảng các object cột
      default: null,
      required: true, //bắt buộc
    },
    //số bản ghi trên một trang
    pageSize: {
      type: [Number, String],
      default: null,
    },
    //loading skeleton có show hay không?
    isShowSkeleton: {
      type: Boolean,
      default: false,
    },
    //cấu hình cột chức năng
    tableFunction: {
      type: Object,
      default() {
        return {
          mainButtonText: "Edit",
          mainFunction: "Edit",
          isShow: true,
          viewButton: true,
          editButton: true,
          deleteButton: true,
        };
      },
    },
    //có cột checkbox hay không?
    multiSelect: {
      type: Boolean,
      default: true,
    },
    //các hàng có thể kéo thả để thay đổi vị trí không?
    isDragable: {
      type: Boolean,
      default: false,
    },
    //bảng này có hiện header không?
    isHasHeader: {
      type: Boolean,
      default: true,
    },
    //footer có show không?
    showFooter: {
      type: Boolean,
      default: false,
    },
    //icon loading có show không?
    isShowLoading: {
      type: Boolean,
      default: false,
    },
  },

  //danh sách các data
  data() {
    return {
      isCheckAll: false, //nút check all có đang check hay không?
      checkedRows: [], //số hàng đang được chọn => (mảng các object)
    };
  },
  mounted() {},
  watch: {
    /**----------------------------------------------------------
     * nếu checkedRows thay đổi thì cập nhật lại các hàng dc select
     * Author: quyetkaito (14/03/2022)
     ---------------------------------*/
    checkedRows() {
      this.changeSelected();
    },

    /**--------------------------------------
     * Nếu đang hiện skeleton thì bỏ check tất cả.
     * Author: quyetkaito (22/-3/2022)
     ---------------------------------*/
    isShowSkeleton() {
      this.checkedRows = [];
    },
  },

  //các hàm
  methods: {
    /**
     * Hàm xử lý sự kiện click trong grid
     * @created : quyetkaito 02/10/2022
     * @param {String} action : hành động
     * @param {Object} object : đối tượng đang thao tác
     */
    buttonClick(action, object) {
      if (!action) return;
      switch (action) {
        case "View":
          this.$emit("gridAction", {object: object, action: 'View'});
          break;
        case "Edit":
          this.$emit("gridAction", {object: object, action: 'Edit'});
          break;
        case "Delete":
          this.$emit("gridAction", {object: object, action: 'Delete'});
          break;
      }
    },

    /**
     * Trả về source của image bind động
     * @param src : tên file/ link ảnh
     * @param ext : đuôi file
     * @param type : loại source
     */
    getImageSrc(src, format, type = "local") {
      try {
        src = src.toString(); //chuyển về string cho chắc
        if (type == "link") {
          //nếu type là link thì trả về link luôn
          return src;
        }
        switch (format) {
          case "webp":
            return require(`@/assets/${src}.webp`); //phải viết sẵn như này mới ăn, viết kiểu + string thì chết
          case "png":
            return require(`@/assets/${src}.png`);

          default:
            return null;
        }
      } catch (error) {
        console.log(error);
        return null;
      }
    },

    /**------------------------------------------
    * Xử lý khi button chính trong cột chức năng được click
    * @created : quyetkaito (26/06/2022)
    * @param {Object} object - hàng chứa thông tin đối tượng được click
    ---------------------------------------------*/
    mainButtonClick(object) {
      if (object) {
        this.$emit("eMainButtonClick", object);
      }
    },

    /**------------------------------------------
    * Xử lý khi double click vào hàng
    * @param {Object} object : hàng chứa thông tin đối tượng
    * @created : quyetkaito (26/06/2022)
    --------------------------------------------*/
    handleDoubleClick(object) {
      if (object) {
        this.$emit("eDoubleClick", object);
      }
    },

    /**---------------------------------------------
     * Thực hiện bỏ dấu checkAll sau khi xóa nhiều.
     * Author: quyetkaito (18/03/2022)
     ---------------------------------*/
    unCheckAll() {
      if (this.$refs.selectAll.checked == true)
        this.$refs.selectAll.checked = false;
    },

    /**-----------------------------------
     * Hàm show data tương ứng với các cột của header.
     * @param {String} object - object hàng hiện tại.
     * @param {String} column - cấu hình của cột hiện tại
     * Author: quyetkaito (16/03/2022)
     ------------------------------------*/
    showData(object, column) {
      //chuyển column key sang snake_case (nếu cần)
      if (column.key && object) {
        let objTemp = JSON.parse(JSON.stringify(object));
        let field = base.camelToUnderscore(column.key);
        //nếu dữ liệu dạng số
        if (column.dataType && column.dataType == "number") {
          if (objTemp[field]) {
            return base.formatCurrency(objTemp[field].toString());
          }
        }
        //nếu dữ liệu là ngày tháng
        if (column.dataType && column.dataType == "date") {
          return !base
            .formatDate(objTemp[field], this.$enum.DateFormat)
            .includes("NaN")
            ? base.formatDate(objTemp[field], this.$enum.DateFormat)
            : "";
        }
        //nếu không => trả về data với field tương ứng từ header(dạng text bình thường)
        return objTemp[field] ? objTemp[field] : "";
      }
      return "";
    },

    /**----------------------------------------------
     * Hàm emit tới cha danh sách các hàng được chọn.
     * Author: quyetkaito (15/03/2022)
    ------------------------------------*/
    changeSelected() {
      // console.log(this.checkedRows);
      //emit tới cha danh sách đối tượng
      this.$emit("eMultiSelect", this.checkedRows);
    },

    /**-------------------------------------------------
     * Hàm xử lý khi click vào nút [Sửa] trên bảng.
     * @param {Object} obj - đối tượng thao tác
     * @param {Number} formMode - trạng thái của form
     * Author: quyetkaito (27/02/2022)
     -----------------------------------------------*/
    handleEdit(obj) {
      //emit tới cha nhận sự kiện update
      this.$emit("eUpdate", { data: obj, formMode: 2 });
      //emit tới cha đóng function
      this.$emit("handleHideFunc");
    },

    /**------------------------------------------
    *Xử lý khi 1 hàng được click
    *Author: quyetkaito (13/04/2022)
    --------------------------------------------*/
    handleClick(object, index) {
      try {
        //emit tới cha đối tượng được click
        this.$emit("eClick", { object, index });
        //xóa background cho tất cả các hàng khác, giữ lại hàng đang được click
        this.$refs.mTable.querySelectorAll(`tbody tr`).forEach((e) => {
          e.classList.remove("selected");
        });
        this.$refs.mTable
          .querySelector(`tbody tr:nth-child(${index + 1})`)
          .classList.add("selected");
      } catch (error) {
        //log ra lỗi
        console.error(error);
      }
    },

    /**------------------------------------------------
         * Hàm xử lý khi click vào nút [Xóa] trên bảng.
         * @param {Object} obj - đối tượng cần xóa.
         * Author: quyetkaito (27/02/2022)
         ----------------------------------------------*/
    handleDelete(obj) {
      this.$emit("onDelete", obj);
    },

    /**------------------------------------------------------
     * Hàm thực hiện lấy vị trí click để hiện dropdown content.
     * @param {Object} object - đối tượng ứng với hàng.
     * @param {Event} event
     * @param {Number} index - số thứ tự của hàng được chọn
     * Author: quyetkaito (07/03/2022)
     -----------------------------------------------------------*/
    showOptions(event, object, index) {
      // console.log(index);
      // console.log(this.$refs.dropdownArrow[index]);
      //lấy ra arrow tại hàng đó
      let arrow = this.$refs.dropdownArrow[index];
      //lấy ra vị trí của arrow
      let arrowPosition = arrow.getBoundingClientRect();

      //emit tới cha show dropdowncontent hiện tại
      this.$emit("eShowFunc", { object, arrowPosition });
    },

    /**------------------------------------------------
     * Xử lý đóng table Function khi click ra ngoài bảng
     * Author: quyetkaito (13/03/2022)
    -------------------------------------*/
    hideOptions() {
      //emit tới cha ẩn dropdowncontent hiện tại
      this.$emit("handleHideFunc");
    },

    /**------------------------------------------
    *CSS cho những hàng đang được chọn
    *@param {Object} selectedRow - hàng đang chọn.
    selectedRow, value
    *Author: quyetkaito (15/04/2022)
    --------------------------------------------*/
    addSelectedRow(index) {
      if (this.listData.length > 0) {
        let allRow = this.$el.querySelectorAll(`tbody tr`);
        let thisRow = this.$el.querySelector(
          `tbody tr:nth-child(${index + 1})`
        );
        if (allRow) {
          //xóa background cho tất cả các hàng khác, giữ lại hàng đang được click
          allRow.forEach((e) => {
            e.classList.remove("selected");
          });
          if (thisRow) thisRow.classList.add("selected");
        }
      }
    },

    /**------------------------------------------
    *Hàm lấy thông tin 1 hàng của table.
    *@param {Number} index số thứ tự hàng, bắt đầu từ 0
    *Author: quyetkaito (01/05/2022)
    --------------------------------------------*/
    getRow(index) {
      return this.listData[index];
    },
  },

  /**------------------------------------------
  *Tính toán data trong grid.
  *Author: quyetkaito (09/04/2022)
  --------------------------------------------*/
  computed: {
    /**-------------------------------------
     * Thực hiện chọn tất cả/ bỏ chọn tất cả
     * Author: quyetkaito (14/03/2022)
     ---------------------------------*/
    selectAll: {
      get: function () {
        //trả về true nếu listData = số hàng được check, false ngược lại
        return this.listData
          ? this.checkedRows.length == this.listData.length &&
              this.listData.length != 0
          : false;
      },

      //select All
      set: function (value) {
        var selected = [];
        try {
          if (value) {
            console.log(value);
            //tạo danh sách các đối tượng được chọn
            this.listData.forEach(function (data) {
              selected.push(data);
            });
          }
          this.checkedRows = selected;
        } catch (error) {
          this.checkedRows = selected;
          console.error(error);
        }
      },
    },

    /**------------------------------
     * Tính toán số lượng các cột skeleton.
     * Author: quyetkaito (27/03/2022)
     --------------------------------*/
    columnSkeleton() {
      if (this.multiSelect) {
        return this.columns.length + 2;
      } else {
        return this.columns.length + 1;
      }
    },
  },
};
</script>

<style scoped>
@import url("/src/style/common/table.css");
.tool-btn {
  white-space: nowrap;
  font-weight: 600 !important;
}
.view-function {
  margin-right: 5px;
  cursor: pointer;
}
</style>