export const defaultGET = '/user';
export const defaultPOST = '/upload';
export const defaultRandom = '/mock'; 

export const test = '/home/getCategory'; 






// 详情页商品图片列表
export const DETAILS_IMAGES = '/product/getProductImgsByChannelId';
// 详情页商品详情 
export const DETAILS_INFO = '/product/getProductDetailByChannelId';
// 详情页分期
export const DETAILS_RATIO = '/finance/get/financeInfo';
// 绑定银行卡获取-城市列表
export const TIEDCARD_CITY = '/config/getCityList';
// 绑定银行卡
export const TIEDCARD_BILLBANKCARD = '/audit/billBankCard';
// 绑定银行卡--银行卡列表
export const TIEDCARD_YINHANG = '/config/yinhang';
// 绑定银行卡--银行卡和开户行一致性校验
export const TIEDCARD_CARDBINCHECK = '/audit/cardBinCheck';
// 万能卡banner
export const UNIVERSAL_CARD_BANNER = '/cashcard/banner';
// 万能卡专区列表
export const UNIVERSAL_CARD_LIST = '/cashcard/list';
// 万能卡详情
export const UNIVERSAL_DETAILS = '/cashcard/detail';
// 万能卡额度购买
export const UNIVERSAL_SHOPING = '/cashcard/payCashCard';


// 我的银行卡--获取用户所绑定的银行卡
export const BANKCARD_MYBILLBANK = '/finance/get/myBillBank';

// 个人信息--获取行业列表
export const INFORMATION_HANGYE = '/config/hangye';
// 个人信息--获取婚姻状况列表
export const INFORMATION_HUNYIN = '/config/hunyin';
// 个人信息--获取收入列表
export const INFORMATION_SHOURU = '/config/shouru';
// 个人信息--获取学历列表
export const INFORMATION_XUELI = '/config/xueli';
// 个人信息--获取职位列表
export const INFORMATION_ZHIWEI = '/config/zhiwei';
// 个人信息--获取还款能力列表
export const INFORMATION_HUANKUAN = '/config/huankuan';
// 个人信息--获取用户信息
export const INFORMATION_GETUSERINFO = '/user/getUserInfo';
// 个人信息--获取用户信息
export const INFORMATION_SETUSERINFO = '/user/setUserInfo';

//我的购物卡
export const DETAILS_DETAIL = '/cashcard/user/detail';
//获取验证码
 export const VERIFYCODE = '/user/get/verifyCode';
// //注册
 export const REGISTER = '/user/register';

//卖卡换钱
export const CARDSALEAMOUNT = '/cashcard/getCashCardSaleAmount';
//售卡操作
export const SALECASHCARD = '/cashcard/saleCashCard';
//资金流向
export const TRADELOG = '/cashcard/user/tradelog';

//推荐产品
export const SALEPRODUCTS = '/product/getHotSaleProducts';

// 授信列表接口
export const CREDIT_LIST = '/audit/showAuth';
// 授信评估额度接口
export const CREDIT_EDU = '/audit/sendPGAudit';

// 获取主题特卖类型
export const SPORT_GETACTIVITYSALE = '/home/getActivitySale';
// 获取商品列表
export const SPORT_GETACTIVITYPRODUCTS = '/product/getActivityProducts';