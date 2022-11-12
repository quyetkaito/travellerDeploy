import apiConfig from "./apiConfig";
import BaseAPI from "./BaseAPI";

class CategoryAPI extends BaseAPI {
    constructor() {
        super();
    }
    urlName = apiConfig.category;
}

export default new CategoryAPI();