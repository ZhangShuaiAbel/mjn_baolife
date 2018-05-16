let baseUrl = require('../../../config/config.dev.env');

/*
* https://www.easy-mock.com/mock/5a0915e8c645f1227829960e/example  // demo
* https://beta-baogonglife.mujinnong.com // 测试
* https://baogonglife.mujinnong.com // 生产
*/

export default {
    baseURL: 'https://beta-baogonglife.mujinnong.com',  
    timeout: 8000,
    headers: {
        // 'Content-Type': 'application/json;charset=UTF-8' 
        //'Content-Type': 'application/x-www-form-urlencoded',
    }, 
    proxy: {
        host: '127.0.0.1', 
        port: 9000,
        auth: {
          username: 'mikeymike', 
          password: 'rapunz3l'
        }
    },
}