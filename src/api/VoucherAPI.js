import apiConfig from "./apiConfig";
import BaseAPI from "./BaseAPI";

class VoucherAPI extends BaseAPI {
    constructor() {
        super();
    }
    urlName = apiConfig.voucher;
}

export default new VoucherAPI();