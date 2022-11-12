import axios from "axios";

export default class BaseAPI {
    urlName = '';
    /**------------------------------------------
    * Hàm thực hiện gọi api
    * @param {String} url : url của api
    * @param {String} method : get,post...
    * @param {any} param : tham số truyền lên
    * @created : quyetkaito (20/08/2022)
    --------------------------------------------*/
    request(url, method, param) {
        if (url && method) {
            return axios({
                method: method,
                url: url,
                data: param
            });
        }
    }

    post(url, param) {
        if (url) {
            return axios.post(
                url,
                param
            );
        }
    }
}