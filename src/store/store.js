import { createStore } from "vuex";
import { useToast } from 'vue-toastification'
const toast = useToast()

export default createStore({
    state: {
        isSideBarCollapse: false, //side bar có đang thu gọn hay không?       
        isDefaultError: false, //messageBox lỗi mặc định có hiện không?
        isShowMessage: false, //messageBox có show không?
        messageType: 0, //loại message là gì?
        messageText: "message-text", //nội dung message box là gì?   
        toastCount: 0,
        locale: 'vn', //ngôn ngữ măc định của chương trình
        langString: "vi", //ngôn ngữ cho datepicker
        dateFormat: "DD/MM/YYYY",
        showQuickAddPostButton: false, //hiện nút thêm nhanh
        searchData: '', //dữ liệu tìm kiếm gửi từ navbar sang postlist
        userAvatar: "", //lưu lại thông tin link ảnh của người dùng
    },
    mutations: { //commit đồng bộ
        /**
         * Hàm show thông báo thành công
         * @created : quyetkaito 01/10/2022
         */
        showSuccess(state, options) {
            state.toastCount++;
            let message = options.message ? options.message : "Bạn chưa cấu hình giá trị message cần hiển thị.";
            toast.success(message, options);
        },

        /**
         * Show thông báo
         * @created : quyetkaito 01/10/2022
         */
        showInfo(state, options) {
            state.toastCount++;
            let message = options.message ? options.message : "Bạn chưa cấu hình giá trị message cần hiển thị.";
            toast.info(message, options);
        },

        /**
         * Show lỗi
         * @created : quyetkaito 01/10/2022
         */
        showError(state, options) {
            state.toastCount++;
            let message = options.message ? options.message : "Bạn chưa cấu hình giá trị message cần hiển thị.";
            toast.error(message, options);
        },

        /**
         * Show cảnh báo 
         * @created : quyetkaito 01/10/2022
         */
        showWarning(state, options) {
            state.toastCount++;
            let message = options.message ? options.message : "Bạn chưa cấu hình giá trị message cần hiển thị.";
            toast.warning(message, options);
        }
    },
    actions: { //commit bất đồng bộ
        increment(context) {
            context.commit('increment')
            toast.success("incremented!")
        }
    },
    modules: {},
});