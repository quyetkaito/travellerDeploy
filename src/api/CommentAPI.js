import apiConfig from "./apiConfig";
import BaseAPI from "./BaseAPI";

class CommentAPI extends BaseAPI {
    constructor() {
        super();
    }
    urlName = apiConfig.comment;
}

export default new CommentAPI();