import MMessage from '@/components/m-message/MMessage';
import { createApp } from 'vue';
class MessageBox {
    /**------------------------------------------
    * hàm xử lý show chung cho tất cả các loại popup
    * @created : quyetkaito (29/09/2022)
    --------------------------------------------*/
    show(message) {
        //tạo mới instance
        var instance = createApp(MMessage);
        const container = document.getElementById('wrapperApp');
        instance.mount(container); //mount vào DOM
        //truyền thêm props vào cho nó //pending
        instance.props = {
                type: 2
            }
            //gọi hàm show
        if (instance._component && instance._component.methods && typeof instance._component.methods.show == "function") {
            instance._component.methods.show(message);
        }

    }

    /**
     * Hàm show popup error
     * @param {string} message - nội dung cần hiện
     */
    showError(message) {
        let messageBox = document.getElementById('mMessage');
        if (messageBox) {
            messageBox.style.display = 'block';
        }
    }

}

export default new MessageBox();