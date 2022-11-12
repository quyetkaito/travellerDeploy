<template>
    <div class="flex-1 toolbar-container wscontainer flex">
        <div class="flex left-toolbar">
            <div>Danh sách ví</div>
        </div>
        <div class="flex-1 right-toolbar">            
            <div class="item-toolbar">
                <i class="fas fa-calendar-alt text-gray-400"></i>
            </div>
            <div class="item-toolbar">
                <i class="fas fa-shapes text-gray-400"></i>
            </div>
            <div class="item-toolbar">
                <i class="fas fa-search text-gray-400"></i>
            </div>    
                <button class="m-btn" v-tooltip="'Thêm mới giao dịch'" @click="showDialog">
                <span class="btn-content">ADD TRANSACTION</span>
            </button>
        </div>
    </div>
    <div class="content-filter grid grid-cols-6 gap-4">
        <!-- Chọn khoảng thời gian -->
        <div>
            <m-label text="Date Range"/>
            <v-multiselect
            ref="dateRange"
            v-model="filterParam.date"
            :options="datePickerConfig"
            mode="single"
            close-on-select
            clearOnSelect
            searchable
            noResultsText="Không có dữ liệu hiển thị"
            :disabled="false"
            :canClear="false"
            @select="comboSelected('date')"
        />
        </div>
        <!-- Chọn ví -->
        <div>
            <m-label text="Wallet"/>
            <v-multiselect
            ref="wallet"
            v-model="filterParam.wallet"
            :options="[
            { label: 'Tổng', value: 1 },
            { label: 'Chi tiêu hàng ngày', value: 2 },
            ]"
            mode="single"
            close-on-select
            clearOnSelect
            searchable
            noResultsText="Không có dữ liệu hiển thị"
            :disabled="false"
            :canClear="false"
        />
        </div>
        <!-- Chọn loại danh mục -->
        <div>
            <m-label text="Category"/>
            <v-multiselect
            ref="wallet"
            v-model="filterParam.category"
            :options="[
            { label: 'Tiền gửi', value: 1 },
            { label: 'Cho vay', value: 2 },
            ]"
            mode="single"
            close-on-select
            clearOnSelect
            searchable
            noResultsText="Không có dữ liệu hiển thị"
            :disabled="false"
            :canClear="false"
        />
        </div>
        <!-- Chọn loại thu/chi -->
        <div>
            <m-label text="Type"/>
            <v-multiselect
            ref="wallet"
            v-model="filterParam.type_of_transaction"
            :options="[
            { label: 'Tiền ra', value: 1 },
            { label: 'Tiền vào', value: 2 },
            ]"
            mode="single"
            close-on-select
            clearOnSelect
            searchable
            noResultsText="Không có dữ liệu hiển thị"
            :disabled="false"
            :canClear="false"
        />
        </div>
        <div class="col-span-2">
            <m-input placeholder="Nhập từ khóa tìm kiếm" labelText="Tìm kiếm nhanh"/>
        </div>
    </div>
    <div class="content-grid">
          <div class="table-container">
            <!-- Grid -->
            <m-grid :listData="storeWallet" :columns="columns" @dblClick="handleDoubleClick" :tableFunction="tableFunction" @eMainButtonClick="handleFunctionClick"
            @eDoubleClick="handleDoubleClick"/>
        </div>
    </div>
  
</template>

<script>
//combobox
import vMultiselect from "@vueform/multiselect";
import "@vueform/multiselect/themes/default.css";
//
import datePickerConfig from "@/config/datePickerConfig";
import WalletAPI from "@/api/WalletAPI";
export default {
    components:{
        "v-multiselect": vMultiselect,
    },
    created(){
        this.initStaticData();
    },
    data() {
        return {
            storeWallet:[],
            filterParam:{//các điều kiện lọc
                date: null, //chọn khoảng thời gian giao dịch
            },
            api: WalletAPI,
        }
    },
    mounted(){
        // this.showDialog();
    },

    methods:{
        /**------------------------------------------
        * Hàm khởi tạo biến tĩnh
        * @created : quyetkaito (26/06/2022)
        --------------------------------------------*/
        async initStaticData(){
            let me = this;
            //cấu hình cột chức năng
            me.tableFunction = {
                mainButtonText:"Sửa",
                mainFunction: "Edit",
                isShow:true,
            };
            //cấu hình các cột tĩnh
            me.columns=[
                {
                    title: "Wallet Name",
                    key:'wallet_name',
                    width: 200
                },
                {
                    title: "Currency",
                    key: "currency_name",
                    width: 200
                },
                {
                    title: "Icon",
                    key: "date",
                    width: 200,
                    titleAlign:"center"
                },
                {
                    title: "Balance",
                    key: "balance",
                    dataType: "number",
                    titleAlign:"right",
                    width: 200
                },
                {
                    title: "Đếm chung với tổng",
                    key: "excluded_from_total",
                    dataType: "boolean",
                    titleAlign:"right",
                    width: 200
                },
                {
                    title: "created_by",
                    key: "created_by",
                    width: 200
                },
                {
                    title: "created_date",
                    key: "created_date",
                    width: 200
                },
                {
                    title: "modified_by",
                    key: "modified_by",
                    width: 200
                },
                {
                    title: "modified_date",
                    key: "modified_date",
                    width: 200
                },
            ],
            me.datePickerConfig = datePickerConfig;
            //gọi api lấy danh sách ví
            let x = await WalletAPI.request(WalletAPI.urlName, 'GET');
            console.log(`x`, x);
            if(x && x.data && x.data.length > 0) {
                // me.storeWallet = x.data;
            }
        },

        showDialog(object){
            this.$refs['transactionDialog'].show(object);            
        },

        /**
         * Emit từ dialog sang để push vào bản ghi mới thêm
         * @created : quyetkaito 26/06/2022
         */
        save(object){
            let me = this;
            if(object){
                me.storeWallet.push(object);
            }
        },

        /**------------------------------------------
        * Nhận sự kiện khi button của function được click
        * @created : quyetkaito (26/06/2022)
        --------------------------------------------*/
        handleFunctionClick(object){
            let me = this;
            if(object){
                //kiểm tra xem nó là loại gì sửa hay xem hay xóa..
                switch(me.tableFunction.mainFunction){
                    case "Edit":{
                        me.showDialog(object);
                    }
                }
            }
        },

        /**------------------------------------------
        * Bắt sự kiện double click vào hàng trong table
        * @created : quyetkaito (26/06/2022)
        --------------------------------------------*/
        handleDoubleClick(object){
            let me = this;
            console.log(`object`, object);
            switch(me.tableFunction.mainFunction){
                case "Edit":{
                    me.showDialog(object);
                }
            }
        },

        /**------------------------------------------
        * Bắt sự kiện khi combo được select
        * @param {String} comboref : xác định là combo nào
        * @created : quyetkaito (26/06/2022)
        --------------------------------------------*/
        comboSelected(comboref){
            let me = this;
            switch(comboref){
                case 'date':{
                    console.log("date: ",me.filterParam.date);
                }
            }            
        }

    }
}
</script>

<style>
@import url("@/style/page/base-page");
.toolbar-container .left-toolbar{
    position: absolute;
    display: flex;
    z-index: 100;
}
.toolbar-container .right-toolbar{
    display: inherit;
    padding: 8px 0;
    justify-content: flex-end;
    align-items: center;
}
.item-toolbar{
    width: 48px;
    height: 48px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
.item-toolbar i:hover{
    color: black!important;
}

.wallet-toolbar-menu{
    height: 48px;
    align-items: center;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}
.info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8px;    
}

.info .name{
    font-size: 12px;
    color: rgba(0,0,0,.87);
    line-height: 21px;
    position: relative;
}

.info .amount{
    font-size: 14px;
    color: #000;
    font-weight: 700;
    line-height: 18px;
}

.info div{
    white-space: nowrap;
}

.wscontainer {
    min-width: 640px;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
}
.content-filter{
    padding-left:10px;
    padding-right: 10px;
    padding-bottom:10px;
}
</style>