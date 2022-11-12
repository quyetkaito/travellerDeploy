import apiConfig from "./apiConfig";
import BaseAPI from "./BaseAPI";

class LocationAPI extends BaseAPI {
    constructor() {
        super();
    }
    urlName = apiConfig.location;
}

export default new LocationAPI();