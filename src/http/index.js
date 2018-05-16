import axios from 'axios';
import config from './common/axiosConfig';


const _axios = axios.create(config);
const http = {};

const fetch = (url, options) => {
    return new Promise((resolve, reject) => {
        let opt = options || {};
        _axios({
            url: url,
            method: opt.type || 'GET',
            params: opt.params || {}
        })
        .then( res => {
            resolve(res);
        })
        .catch( err => {
            reject({ 'code': '-100', 'message': '网络异常或参数错误！' });
        });
    })
}

http.install = function ( vue ) {
    vue.prototype.$http = function (url, options) {
        return fetch(url, options);
    }
}

export {
    http,
    fetch
};