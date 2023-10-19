import axios from 'axios'
import {message} from "ant-design-vue";
// 创建一个 axios 实例
const request = axios.create({
    baseURL: 'http://14.29.181.103:3366', // 所有的请求地址前缀部分
    timeout: 5000, // 请求超时时间毫秒

})
export default request