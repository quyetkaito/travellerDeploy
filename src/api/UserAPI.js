import apiConfig from "./apiConfig";
import BaseAPI from "./BaseAPI";

class UserAPI extends BaseAPI {
    constructor() {
        super();
    }
    urlName = apiConfig.user;
}

export default new UserAPI();