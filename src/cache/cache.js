import { renderSlot } from "vue";

class Cache {
    /**
     * Hàm lưu dữ liệu vào cache 
     * @param {String} key: key để phân biệt 
     * @param {Any} value: giá trị cần lưu
     */
    set(key, value) {
        if (key == null || typeof key == "undefined") return;
        if (typeof value != "string") {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }

    /**
     * Hàm lấy cache
     * @param {String} key 
     * @created : quyetkaito
     */
    get(key) {
        let res = localStorage.getItem(key);
        if (res) {
            try {
                return JSON.parse(res);
            } catch (error) {
                return res;
            }
        }
        return null;
    }

    /**
     * Hàm xóa cache theo key
     * @param {String} key 
     * @created : quyetkaito
     */
    remove(key) {
        localStorage.removeItem(key);
    }

    /**
     * Hàm xóa tất cả cache
     * @created : quyetkaito
     */
    removeAllCache() {
        localStorage.clear();
    }

}
export default new Cache();