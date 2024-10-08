import { message } from "antd";
import axios from "axios";
import { PageResponseModel } from "../models/PageModel";
import { UserModel, UserParamModel } from "../models/UserModel";
import { API, axiosConfig } from "../utils/Config";


export const getUserUrl = (params: UserParamModel) => API + "/users" + buildParam(params);
export const getUserUrlWithParam = (params: string) => API + "/users" + params;

export const userFetcher = async (url: string) => {
    // message.loading({ content: 'Loading Users...', key: 'loadingUsers', duration: 0 });
    await simulateLongApiCall();
    const response = await axios.get(url, axiosConfig())
    const data: PageResponseModel<UserModel> = response.data;
    // message.destroy('loadingUsers')
    return data;
}
function buildParam(params: UserParamModel) {
    const param = "?"
        + (params.email ? "email=" + params.email + "&" : "")
        + (params.username ? "username=" + params.username + "&" : "")
        + (params.first_name ? "first_name=" + params.first_name + "&" : "")
        + (params.last_name ? "last_name=" + params.last_name + "&" : "")
        + (params.page ? "page=" + params.page + "&" : "")
        + (params.size ? "size=" + params.size : "")
    return param;
}
const simulateLongApiCall = (): Promise<string> => {
    const duration = Math.floor((Math.random() * 1000) + 1);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("API call completed");
        }, duration);
    });
};