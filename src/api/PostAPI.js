import apiConfig from "./apiConfig";
import BaseAPI from "./BaseAPI";

class PostAPI extends BaseAPI {
    constructor() {
        super();
    }
    urlName = apiConfig.post;
}

export default new PostAPI();