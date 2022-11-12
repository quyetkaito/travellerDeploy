import apiConfig from "./apiConfig";
import BaseAPI from "./BaseAPI";

class WalletAPI extends BaseAPI {
    constructor() {
        super();
    }
    urlName = apiConfig.wallet;
}

export default new WalletAPI();