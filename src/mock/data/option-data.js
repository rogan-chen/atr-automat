// file 转 base64
export const fileToBase64Async = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      resolve(e.target.result);
    };
  });
}

// 折扣
export const discounts = [
  '95折',
  '97折',
  '88折',
  '93折',
  '85折',
  '64折',
  '73折',
  '56折',
];

// 活动方式
export const actionTypes = [
  '限时折扣',
  '商品限购',
  '优惠券',
];

export const actionTypeList = [
  { value: '限时折扣', label: '限时折扣' },
  { value: '商品限购', label: '商品限购' },
  { value: '优惠券', label: '优惠券' },
];

// 活动状态
export const actionStates = [
  '已停止',
  '未开始',
  '进行中',
  '已结束',
];

export const actionStateList = [
  { value: '已停止', label: '已停止' },
  { value: '未开始', label: '未开始' },
  { value: '进行中', label: '进行中' },
  { value: '已结束', label: '已结束' },
];

// 商品
export const commoditys = [
  '雀巢咖啡',
  '可口可乐',
  '百事可乐',
  '康师傅方便面',
  '农夫山泉',
  '雪碧',
  '麦香熔岩蛋糕',
  '周杰伦手抓饼',
  '嘉士利威化饼干',
  '统一冰红茶',
  '三只松鼠松果',
  '良品铺子开心果',
  '脆脆鲨威化饼干',
];

export const commodityList = [
  { value: '雀巢咖啡', label: '雀巢咖啡' },
  { value: '可口可乐', label: '可口可乐' },
  { value: '百事可乐', label: '百事可乐' },
  { value: '康师傅方便面', label: '康师傅方便面' },
  { value: '农夫山泉', label: '农夫山泉' },
  { value: '雪碧', label: '雪碧' },
  { value: '麦香熔岩蛋糕', label: '麦香熔岩蛋糕' },
  { value: '周杰伦手抓饼', label: '周杰伦手抓饼' },
  { value: '嘉士利威化饼干', label: '嘉士利威化饼干' },
  { value: '统一冰红茶', label: '统一冰红茶' },
  { value: '三只松鼠松果', label: '三只松鼠松果' },
  { value: '良品铺子开心果', label: '良品铺子开心果' },
  { value: '脆脆鲨威化饼干', label: '脆脆鲨威化饼干' },
];

// 商品图片
export const commodityImgs = [
  'https://img1.baidu.com/it/u=1108956425,1388955701&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  'https://p1.itc.cn/images01/20210911/ed59ab26380e4e42910c67afa52e486f.jpeg',
  'https://img14.360buyimg.com/n1/jfs/t1/115224/28/9301/140005/5ed89532E882226c7/5288c95cf80e9699.jpg',
  'https://img2.baidu.com/it/u=3517319194,1260086257&fm=253&fmt=auto&app=138&f=JPEG?w=671&h=500',
  'https://i9.taou.com/maimai/p/28432/6026_13_81E8SHibtTKeuMzE',
  'https://img1.baidu.com/it/u=1826211017,3442640748&fm=253&fmt=auto&app=138&f=JPEG?w=490&h=354',
  'https://img1.baidu.com/it/u=2280902125,276833071&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=604',
  'https://img0.baidu.com/it/u=1225324665,3529680893&fm=253&fmt=auto&app=138&f=JPEG?w=470&h=285',
  'https://img0.baidu.com/it/u=2021451734,4240739035&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300',
  'https://bms.spdl.com/SPDL/UploadFiles/NewsImages/20171017083849_9649.jpg',
  'https://image5.suning.cn/uimg/nmps/ZJYDP/100020940106914658picA_1_392x294.jpg',
  'http://t13.baidu.com/it/u=1525178058,2142616207&fm=224&app=112&f=JPEG?w=500&h=500',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Ftfscom%2Fi1%2F2478532816%2FTB2uDtWhzuhSKJjSspdXXc11XXa_%21%212478532816.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1679474483&t=df5ee2d3a2ae5859a0661bcd17a13c6f',
  'https://img2.baidu.com/it/u=849995377,520435495&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
  'https://img0.baidu.com/it/u=3875972442,3590056617&fm=253&fmt=auto&app=138&f=JPEG?w=781&h=500',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw%2Fba4b4515-f48a-499e-aa23-7a0af7b9db05%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1680163842&t=5dcbae714c0705fa88f8960ca8107c09',
  'https://img0.baidu.com/it/u=3483141975,540804301&fm=253&fmt=auto&app=138&f=JPEG?w=801&h=500',
];

// 商品类型
export const commodityTypes = [
  '咖啡类',
  '功能饮料',
  '碳酸饮料',
  '饮用水',
  '凉茶',
  '方便面',
  '纯牛奶',
  '生鲜食品',
  '预调酒',
  '养生酒',
];

export const commodityTypeList = [
  { value: '咖啡类', label: '咖啡类' },
  { value: '功能饮料', label: '功能饮料' },
  { value: '碳酸饮料', label: '碳酸饮料' },
  { value: '饮用水', label: '饮用水' },
  { value: '凉茶', label: '凉茶' },
  { value: '方便面', label: '方便面' },
  { value: '纯牛奶', label: '纯牛奶' },
  { value: '生鲜食品', label: '生鲜食品' },
  { value: '预调酒', label: '预调酒' },
  { value: '养生酒', label: '养生酒' },
];

// 机器组名列表
export const machineGroupNameList = [
  { value: '东莞塘厦分组', label: '东莞塘厦分组' },
  { value: '香港九龙分组', label: '香港九龙分组' },
  { value: '广州天河分组', label: '广州天河分组' },
  { value: '深圳南山分组', label: '深圳南山分组' },
  { value: '佛山禅城分组', label: '佛山禅城分组' },
  { value: '珠海香洲分组', label: '珠海香洲分组' },
  { value: '北京分组', label: '北京分组' },
  { value: '湖南长沙分组', label: '湖南长沙分组' },
  { value: '湖南张家界分组', label: '湖南张家界分组' },
  { value: '四川成都分组', label: '四川成都分组' },
  { value: '黑龙江哈尔滨分组', label: '黑龙江哈尔滨分组' },
];

export const machineGroupNameValues = [
  '东莞塘厦分组',
  '香港九龙分组',
  '广州天河分组',
  '深圳南山分组',
  '佛山禅城分组',
  '珠海香洲分组',
  '北京分组',
  '湖南长沙分组',
  '湖南张家界分组',
  '四川成都分组',
  '黑龙江哈尔滨分组',
];

// 机器编号列表
export const machineNumberList = [
  { value: '87213214435', label: '87213214435' },
  { value: '34524352231', label: '34524352231' },
  { value: '12334551224', label: '12334551224' },
  { value: '96325120122', label: '96325120122' },
  { value: '45630046272', label: '45630046272' },
  { value: '34566456788', label: '34566456788' },
  { value: '12345683456', label: '12345683456' },
  { value: '95464534534', label: '95464534534' },
  { value: '77874546234', label: '77874546234' },
  { value: '54534534656', label: '54534534656' },
];

export const machineNumberValues = [
  '87213214435',
  '34524352231',
  '12334551224',
  '96325120122',
  '45630046272',
  '34566456788',
  '12345683456',
  '95464534534',
  '77874546234',
  '54534534656',
];

// 开启/关闭
export const switchList = [
  { value: '开启', label: '开启' },
  { value: '关闭', label: '关闭' },
];

export const switchValues = ['开启', '关闭'];

// 是/否
export const whetherList = [
  { value: '是', label: '是' },
  { value: '否', label: '否' },
];

export const whetherValues = ['是', '否'];

// 已锁定/未锁定
export const lockList = [
  { value: '已锁定', label: '已锁定' },
  { value: '未锁定', label: '未锁定' },
];

export const lockValues = ['已锁定', '未锁定'];

// 开门/关门
export const doorList = [
  { value: '开门', label: '开门' },
  { value: '关门', label: '关门' },
];

export const doorValues = ['开门', '关门'];

// 角色名称
export const roleNames = [
  '测试员',
  '补货员',
  '操作员',
  '产品经理',
  '项目经理',
  '技术总监',
  '软件开发工程师',
  '电子开发工程师',
  '人事管理员',
  '厨师',
];

export const roleNameList = [
  { value: '测试员', label: '测试员' },
  { value: '补货员', label: '补货员' },
  { value: '操作员', label: '操作员' },
  { value: '产品经理', label: '产品经理' },
  { value: '项目经理', label: '项目经理' },
  { value: '技术总监', label: '技术总监' },
  { value: '软件开发工程师', label: '软件开发工程师' },
  { value: '电子开发工程师', label: '电子开发工程师' },
  { value: '人事管理员', label: '人事管理员' },
  { value: '厨师', label: '厨师' },
];

// 用户组名称
export const userGroupNames = [
  '技术部',
  '人事部',
  '总裁办',
  '财务部',
  '研发部',
  '信息管理部',
  '工程部',
  '私董会',
];

// 销售类型
export const saleTypes = [
  '商品名称',
  '商品类型',
  '单价',
  '支付类型',
  '机器编号',
  '24小时销售统计',
];

export const saleTypeList = [
  { value: '商品名称', label: '商品名称' },
  { value: '商品类型', label: '商品类型' },
  { value: '单价', label: '单价' },
  { value: '支付类型', label: '支付类型' },
  { value: '机器编号', label: '机器编号' },
  { value: '24小时销售统计', label: '24小时销售统计' },
];

// 时间类型
export const timeTypes = [
  '按天统计',
  '按月统计',
  '按年统计',
];

export const timeTypeList = [
  { value: '按天统计', label: '按天统计' },
  { value: '按月统计', label: '按月统计' },
  { value: '按年统计', label: '按年统计' },
];

// 网络状态
export const networkStates = [
  '在线',
  '离线',
  '停机',
  '报警',
];

export const networkList = [
  { value: '在线', label: '在线' },
  { value: '离线', label: '离线' },
  { value: '停机', label: '停机' },
  { value: '报警', label: '报警' },
];

// 门状态
export const doorStates = [
  '开启',
  '关闭',
];

export const doorStateList = [
  { value: '开启', label: '开启' },
  { value: '关闭', label: '关闭' },
];

// 正常/异常状态
export const commonStates = [
  '正常',
  '异常',
];

export const commonStateList = [
  { value: '正常', label: '正常' },
  { value: '异常', label: '异常' },
];

// 有/无状态
export const yesOrNoStates = [
  '有',
  '无',
];

export const yesOrNoStateList = [
  { value: '有', label: '有' },
  { value: '无', label: '无' },
];

// 支付类型
export const paymentTypes = [
  '现金支付',
  '纸币支付',
  '硬币支付',
  '微信支付',
  '支付宝支付',
];

// 库存类型
export const stockTypes = [
  '缺货',
  '未缺货',
];

// 报警状态
export const remarkStates = [
  '已处理',
  '未处理',
];

// 订单类型
export const orderTypes = [
  '在线',
  '扫码',
  '幸运购券',
  '幸运大转盘',
  '会员卡在线',
  '会员卡扫码支付',
  '两个码支付',
  '购物车在线',
  '购物车扫码',
  '刷脸',
  '刷A扣B',
  '刷A扣B余额',
  '刷A扣B赠送',
  '口红机',
  '购物车会员卡在线',
  '购物车会员卡扫码',
  '预定在线',
  '预定购物车在线',
  '预定会员卡在线',
  '预订购物车会员卡在线',
  '反扫码',
];

// 订单状态
export const orderStates = [
  '已支付',
  '已取货',
  '已退款',
  '退款审核中',
  '已驳回',
];

// 广告图片
export const adviceImgs = [
  'https://p1.itc.cn/q_70/images03/20210817/773b314b2d8a44c4a77b0074a75113ab.jpeg',
  'https://img2.baidu.com/it/u=977564963,2410139600&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500',
  'https://img0.baidu.com/it/u=2766123496,281172681&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=330',
  'https://img2.baidu.com/it/u=2351072449,2403178195&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313',
  'https://hbimg.b0.upaiyun.com/8606ab6beaad7e5bc44854b8a0d517da41c18689e994-G1KN9a_fw658',
  'https://img.zcool.cn/community/01cf895930f95ba8012193a3893ca3.jpg@1280w_1l_2o_100sh.jpg',
  'https://t7.baidu.com/it/u=1951548898,3927145&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=1831997705,836992814&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=2582370511,530426427&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=2851687453,2321283050&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=3377141529,2836503127&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=1372368482,3369119186&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=737555197,308540855&fm=193&f=GIF',
  'https://t7.baidu.com/it/u=1297102096,3476971300&fm=193&f=GIF',
];

// 京东支付模式
export const jdPayModelValus = [
  '默认设置',
  '自定义设置',
];

export const jdPayModelList = [
  { value: '默认设置', label: '默认设置' },
  { value: '自定义设置', label: '自定义设置' },
];

// 翼支付模式
export const bestPayModelValues = [
  '默认设置',
  '自定义设置',
  'V3个人',
  'V4企业',
];

export const bestPayModelList = [
  { value: '默认设置', label: '默认设置' },
  { value: '自定义设置', label: '自定义设置' },
  { value: 'V3个人', label: 'V3个人' },
  { value: 'V4企业', label: 'V4企业' },
];

// 供应商
export const supplierList = [
  { value: '自采商品', label: '自采商品' },
  { value: '方便面', label: '方便面' },
  { value: '可口可乐', label: '可口可乐' },
  { value: '康师傅控股有限公司', label: '康师傅控股有限公司' },
  { value: '广州统一企业有限公司', label: '广州统一企业有限公司' },
  { value: '中吉公司', label: '中吉公司' },
];

export const supplierValues = [
  '自采商品',
  '方便面',
  '可口可乐',
  '康师傅控股有限公司',
  '广州统一企业有限公司',
  '中吉公司',
];

// 广告类型
export const advertTypeValues = [
  '告知广告',
  '促销广告',
  '形象广告',
  '建议广告',
  '公益广告',
  '推广广告',
];

export const advertTypeList = [
  { value: '告知广告', label: '告知广告' },
  { value: '促销广告', label: '促销广告' },
  { value: '形象广告', label: '形象广告' },
  { value: '建议广告', label: '建议广告' },
  { value: '公益广告', label: '公益广告' },
  { value: '推广广告', label: '推广广告' },
];