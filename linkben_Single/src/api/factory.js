import axios from 'axios';
import qs from 'qs';
//此文件配置请求前置操作,后置操作
//若增加log可以写到此文件
let instance = axios.create({
    method: 'post', // default
    baseURL: process.env.MOCK_ON ? "/" : (process.env.ROUTER_PATH + process.env.API_PATH),
    transformRequest: [function(data) {
        return qs.stringify(data, {arrayFormat: 'indices'});
    }],
    transformResponse: [function (data) {
        return data
    }],
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    timeout: 30000,
    responseType: 'json', // default
    maxRedirects: 0, // default
});
//参考 https://www.mmxiaowu.com/article/589af8cde9be1c5b21ef8e9c
// 添加请求拦截器
instance.interceptors.request.use(config => {
    // 在发送请求之前做些什么
    return config
}, error => {
    // 在发送请求之前做些什么
    return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(response => {
    // 对响应数据做点什么
    return response
}, error => {
    //console.log("response error")
    //console.log("response", JSON.stringify(error));
    // 对响应错误做点什么
    return Promise.resolve(error.response)
})
export default instance;


