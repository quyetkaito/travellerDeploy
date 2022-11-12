import apiConfig from "./apiConfig";
import BaseAPI from "./BaseAPI";
import axios from "axios";

class AuthAPI extends BaseAPI {
    constructor() {
        super();
    }
    urlName = apiConfig.auth;

    async login(param) {
        try {
            let me = this;
            if (param) {
                let res = await axios.post(me.urlName + "/login", param);
                if (res && res.data) {
                    return res.data;
                } else {
                    return null;
                }
            }
        } catch (error) {
            console.error(error)
        }


    }
}

export default new AuthAPI();