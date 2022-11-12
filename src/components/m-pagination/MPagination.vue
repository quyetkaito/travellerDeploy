<template>
  <div class="paging-action flex align-y-center">
    <div
      class="prev-button"
      :style="[
        currentPage == 1
          ? { opacity: '50%', cursor: 'default' }
          : { opacity: '100%' },
      ]"
      @click="prevPageClick()"
    >
      Trước
    </div>
    <div class="paging-number-group flex align-center">
      <div
        class="m-paging-number"
        :class="{ active: page === currentPage }"
        v-for="(page, index) in pages"
        :key="index"
        @click="numberPageClick(page)"
      >
        {{ page }}
      </div>
    </div>
    <div
      class="next-button"
      @click="nextPageClick()"
      :style="[
        currentPage == totalPage
          ? { opacity: '50%', cursor: 'default' }
          : { opacity: '100%' },
      ]"
    >
      Sau
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //tổng số trang
    totalPage: {
      type: Number,
      default: 1,
    },
    //trang hiện tại
    currentPage: {
      type: Number,
      default: 1,
    },
    //số bản ghi trên 1 trang
    pageSize: {
      type: [Number,String],
      default: 10,
    },
  },
  data() {
    return {

    };
  },
  methods: {
    /**-------------------------------------
     * Hàm xử lý khi click vào nút [Trước].
     * Author: quyetkaito (13/03/2022)
     ---------------------------------------*/
    prevPageClick() {
      if(this.currentPage == 1) return; //nếu là trang đầu rồi thì ko làm gì cả.
      let page = this.currentPage;
      if (page > 1) {
        page--;
        this.$emit("changeCurrentPage", page);
      }
    },

    /**-------------------------------------
     * Hàm xử lý khi click vào nút [Sau].
     * Author: quyetkaito (13/03/2022)
     ---------------------------------------*/
    nextPageClick() {
      if(this.currentPage == this.totalPage) return; //nếu là trang cuối rồi thì ko làm gì cả.
      let page = this.currentPage;
      if (page < this.totalPage) {
        page++;
        this.$emit("changeCurrentPage", page);
      }
    },

    /**-------------------------------------
     * Hàm xử lý khi click vào số trang.
     * @param {Number} page - trang cần chuyền đến.
     * Author: quyetkaito (13/03/2022)
     ---------------------------------------*/
    numberPageClick(page) {
      if (!isNaN(page)) {
        this.$emit("changeCurrentPage", page);
      }
    },

    /**--------------------------------------------
     * Thực hiện tính toán các trang được hiển thị
     * Author: quyetkaito (13/03/2022)
    ----------------------------------------------*/
    pagination(c, m) {
      var current = c, //trang hiện tại
        last = m; //trang cuối

      var delta = 1; //số trang hiển thị cạnh trang hiện tại       
      if(current==1||current==this.totalPage) delta = 2; 
      var left = current - delta, //số bên trái trang hiện tại
        right = current + delta + 1, //số bên phải trang hiện tại
        range = [], //dãy số ở giữa
        rangeWithDots = [], //dãy số có cả chấm
        l;
      
      for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || (i >= left && i < right)) {
          range.push(i); //push các số vào
        }
      }

      for (let i of range) {
        if (l) {
          if (i - l === 2) {
            rangeWithDots.push(l + 1);
          } else if (i - l !== 1) {
            rangeWithDots.push("...");
          }
        }
        rangeWithDots.push(i);
        l = i;
      }
      return rangeWithDots;
    },
  },
  computed: {
    // Số trang được visible
    pages() {
      return this.pagination(this.currentPage, this.totalPage);
    },
  },
};
</script>

<style>
@import url("/src/style/common/paging.css");
</style>