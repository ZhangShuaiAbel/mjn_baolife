import Vue from 'vue';

const bus = new Vue();

const busType = {
    OPEN_POPUP_RATIO: 'OPEN_POPUP_RATIO', // 开启比例popup
    CLOSE_POPUP_RATIO: 'CLOSE_POPUP_RATIO', // 关闭比例popup
    OPEN_POPUP_SERVICE: 'OPEN_POPUP_SERVICE', // 开启服务popup
    CLOSE_POPUP_SERVICE: 'CLOSE_POPUP_SERVICE', // 关闭服务popup
    OPEN_CITY_POPUP: 'OPEN_CITY_POPUP', // 开启三级联动popup
    CLOSE_CITY_POPUP: 'CLOSE_CITY_POPUP', // 关闭三级联动popup
    ClOSE_WANNENG_POPUP: 'ClOSE_WANNENG_POPUP', // 关闭万能卡比例弹层
    OPEN_REGULATION: 'OPEN_REGULATION', // 开启使用规则弹层
    ClOSE_REGULATION: 'ClOSE_REGULATION', // 关闭使用规则弹层
}
export {
    bus,
    busType
}