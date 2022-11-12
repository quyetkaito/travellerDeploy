import apiConfig from "./apiConfig";
import BaseAPI from "./BaseAPI";

class SearchHistoryAPI extends BaseAPI {
    constructor() {
        super();
    }
    urlName = apiConfig.searchHistory;
}

export default new SearchHistoryAPI();