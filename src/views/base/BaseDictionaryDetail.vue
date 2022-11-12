<!--
File base chứa các thao tác chung như đóng form, buttonClick
-->
<template>
   <div></div>
</template>

<script>
export default {
    methods:{
        /**
        * Hàm xử lý lỗi
        * @created : quyetkaito 06/10/2022
        */
        handleException(ex){
            let me = this;
            if(ex){
                console.error(ex)
                me.$store.commit("showError", {
                    message: "Đã có lỗi xảy ra. Vui lòng liên hệ quản trị viên để được trợ giúp.",
                    timeout: 5000,
                });
                me.$commonFunc.unload();
            }
        },

        handleStatusCode(){

        },

        /**
         * Hàm thực hiện check thay đổi khi nhập liệu
         */
        isDeepEqual(obj1, obj2){
            let me = this;
            if(obj1 && obj2){
                //so sánh từng key - value mới chuẩn
                let objKeys1 = Object.keys(obj1);
                let objKeys2 = Object.keys(obj2);
                if(objKeys1.length != objKeys2.length) return false; //nếu độ dài của 2 object khác nhau => khác nhau                
                for(let key of objKeys1){
                    let value1 = obj1[key];
                    let value2 = obj2[key];
                    const isObjects = me.isObject(value1) && me.isObject(value2);

                    if ((isObjects && !me.isDeepEqual(value1, value2)) || (!isObjects && value1 !== value2)) return false;                    
                }                
                
                return true;
            }
        },

        /**
         * Kiểm tra xem một biến có phải là object không
         */
        isObject(object){
            return object != null && typeof object === "object";
        },
    }
}
</script>

<style>

</style>