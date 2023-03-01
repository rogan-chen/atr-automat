<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addData">新增货道</Button>
      <Button style="position:absolute; top: 27px; right: 110px;" type="primary" @click="removeAllData">清空全部</Button>
    </Card>
    <Modal width="1200" v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <Row>
        <Col span="8" class="upload-img-container">
        <Upload :show-upload-list="false" action="//jsonplaceholder.typicode.com/posts/"
          :format="['jpg', 'jpeg', 'png', 'jfif']" :on-format-error="handleFormatError" :before-upload="beforeUpload">
          <img class="upload-img" :src="image" />
        </Upload>
        </Col>
        <Col span="8">
        <Row class="row" style="margin-top: 0;">
          <Col span="8" class="title">
          <strong>货道号：</strong>
          </Col>
          <Col span="16">
          <Input disabled v-model="freightWay" placeholder="请输入货道号" class="form" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>机器组名：</strong>
          </Col>
          <Col span="16">
          <Select v-model="machineGroupName" placeholder="请选择机器组名" class="form">
            <Option v-for="item in machineGroupNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>机器编号：</strong>
          </Col>
          <Col span="16">
          <Select v-model="machineNumber" placeholder="请选择机器编号" class="form">
            <Option v-for="item in machineNumberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>机器设置价格：</strong>
          </Col>
          <Col span="16">
          <InputNumber v-model="machinePrice" placeholder="请输入机器设置价格" class="form" :precision="2"
            :formatter="value => `￥${value}`" :parser="value => value.replace('￥', '')" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>容量：</strong>
          </Col>
          <Col span="16">
          <Tooltip content="现存和容量最多999999" placement="right-start">
            <InputNumber :max="999999" :precision="0" v-model="capacity" placeholder="请输入容量" class="form" />
          </Tooltip>
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>微信折扣：</strong>
          </Col>
          <Col span="16">
          <Tooltip content="默认100不打折" placement="right-start">
            <InputNumber :precision="0" :max="100" v-model="wechatDiscount" placeholder="请输入微信折扣" class="form" />
          </Tooltip>
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>ID卡折扣：</strong>
          </Col>
          <Col span="16">
          <Tooltip content="默认100不打折" placement="right-start">
            <InputNumber :precision="0" :max="100" v-model="idDiscount" placeholder="请输入ID卡折扣" class="form" />
          </Tooltip>
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>是否启用多货道：</strong>
          </Col>
          <Col span="16">
          <Select v-model="enableFreightWays" placeholder="请选择是否启用多货道" class="form">
            <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        </Col>
        <Col span="8" class="right-form-container">
        <Row class="row" style="margin-top: 0;">
          <Col span="8" class="title">
          <strong>商品名称：</strong>
          </Col>
          <Col span="16">
          <Select v-model="commodityName" placeholder="请选择商品名称" class="form">
            <Option v-for="item in commodityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>机器名：</strong>
          </Col>
          <Col span="16">
          <Input v-model="machineName" placeholder="请输入机器名" class="form" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>厢体ID：</strong>
          </Col>
          <Col span="16">
          <Input v-model="carbodyID" placeholder="请输入厢体ID" class="form" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>自定义价格：</strong>
          </Col>
          <Col span="16">
          <InputNumber v-model="customPrice" placeholder="请输入自定义" class="form" :precision="2"
            :formatter="value => `￥${value}`" :parser="value => value.replace('￥', '')" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>现存：</strong>
          </Col>
          <Col span="16">
          <Tooltip content="现存不可大于容量" placement="right-start">
            <InputNumber :max="999999" :precision="0" v-model="extant" placeholder="请输入现存数量" class="form" />
          </Tooltip>
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>支付宝折扣：</strong>
          </Col>
          <Col span="16">
          <Tooltip content="默认100不打折" placement="right-start">
            <InputNumber :precision="0" :max="100" v-model="alipayDiscount" placeholder="请输入支付宝折扣" class="form" />
          </Tooltip>
          </Col>
        </Row>
        <Row class="row">
          <Col span="8" class="title">
          <strong>预警数量：</strong>
          </Col>
          <Col span="16">
          <InputNumber v-model="warnAmount" placeholder="请输入预警数量" class="form" />
          </Col>
        </Row>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import {
  machineGroupNameList,
  machineGroupNameValues,
  machineNumberList,
  machineNumberValues,
  commodityImgs,
  commoditys,
  commodityList,
  whetherList,
  whetherValues,
  fileToBase64Async,
} from '@/mock/data/option-data.js';

export default {
  name: 'freight-way-management',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '货道号', key: 'freightWay', sortable: true },
        {
          title: '图片',
          key: 'image',
          width: 120,
          render: (h, { row }) => {
            return (
              <img
                src={row.image}
                alt='cover'
                fit='cover'
                class='commodity-img'
              />
            )
          }
        },
        { title: '机器组名', key: 'machineGroupName' },
        { title: '机器编号', key: 'machineNumber', sortable: true },
        { title: '机器名', key: 'machineName', editable: true },
        { title: '厢体ID', key: 'carbodyID', sortable: true },
        { title: '商品名称', key: 'commodityName' },
        { title: '机器设置价格(￥)', key: 'machinePrice' },
        { title: '自定义价格(￥)', key: 'customPrice' },
        { title: '容量', key: 'capacity' },
        { title: '现存', key: 'extant' },
        { title: '状态', key: 'state' },
        {
          title: '操作',
          key: 'action',
          width: 170,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => {
                    this.title = '修改货道';
                    this.visible = true;
                    this.freightWay = params.row.freightWay;
                    this.image = params.row.image;
                    this.machineGroupName = params.row.machineGroupName;
                    this.machineNumber = params.row.machineNumber;
                    this.machineName = params.row.machineName;
                    this.carbodyID = params.row.carbodyID;
                    this.commodityName = params.row.commodityName;
                    this.machinePrice = params.row.machinePrice;
                    this.customPrice = params.row.customPrice;
                    this.capacity = params.row.capacity;
                    this.extant = params.row.extant;
                    this.wechatDiscount = params.row.wechatDiscount;
                    this.alipayDiscount = params.row.alipayDiscount;
                    this.idDiscount = params.row.idDiscount;
                    this.warnAmount = params.row.warnAmount;
                    this.enableFreightWays = params.row.enableFreightWays;
                    this.machineGroupIndex = params.row.initRowIndex;
                  }
                },
              }, '修改'),
              // h('span', {}, ' '),
              // h('Button', {
              //   props: {
              //     type: 'success',
              //     size: 'small',
              //     ghost: true,
              //   },
              //   on: {
              //     click: () => {
              //       this.tableData.unshift({
              //         id: this.tableData.length + 1,
              //         freightWay: this.tableData.length + 1,
              //         machineGroupName: params.row.machineGroupName,
              //         machineNumber: params.row.machineNumber,
              //         machineName: params.row.machineName,
              //         carbodyID: params.row.carbodyID,
              //       });
              //     }
              //   },
              // }, '克隆'),
              h('span', {}, ' '),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => {
                    this.tableData.splice(params.row.initRowIndex, 1, {
                      ...params.row,
                      image: 'https://img2.baidu.com/it/u=3189273452,4056187285&fm=253&fmt=auto&app=138&f=JPEG?w=516&h=500',
                      machineGroupName: '',
                      machineNumber: '',
                      machineName: '',
                      carbodyID: '',
                      commodityName: '',
                      machinePrice: 0,
                      customPrice: 0,
                      capacity: 0,
                      extant: 0,
                      wechatDiscount: 100,
                      alipayDiscount: 100,
                      idDiscount: 100,
                      warnAmount: 0,
                      enableFreightWays: '否',
                    });
                  }
                },
              }, '清空'),
              h('span', {}, ' '),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => this.tableData.splice(params.index, 1)
                },
              }, '删除'),
            ]);
          }
        }
      ],
      tableData: [],
      machineGroupNameList,
      machineNumberList,
      whetherList,
      commodityList,
      // 新增/修改货道
      title: '新增货道',
      visible: false,
      freightWay: '', // 货道号
      image: '', // 图片
      machineGroupName: '', // 机器组名
      machineNumber: '',  // 机器编号
      machineName: '', // 机器名
      carbodyID: '', // 厢体ID
      commodityName: '', // 商品名称
      machinePrice: 0, // 机器设置价格
      customPrice: 0, // 自定义价格
      capacity: 0, // 容量
      extant: 0, // 现存
      wechatDiscount: 0, // 微信折扣
      alipayDiscount: 0, // 支付宝折扣
      idDiscount: 0, // ID卡折扣
      warnAmount: 0, // 预警数量
      enableFreightWays: '', // 是否启用多货道
      machineGroupIndex: -1,
    }
  },
  methods: {
    handleDelete() { },

    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `货道-${(new Date()).valueOf()}.csv`
      })
    },

    // 上传文件格式出错
    handleFormatError() {
      this.$Notice.warning({
        title: '文件格式出错',
        desc: '请选择图片格式的文件。'
      });
    },

    // 上传图片
    async beforeUpload(file) {
      const base64Data = await fileToBase64Async(file);
      this.image = base64Data;
      return false;
    },

    addData() {
      this.title = '新增货道';
      this.visible = true;
      this.freightWay = '';
      this.image = 'https://img2.baidu.com/it/u=3189273452,4056187285&fm=253&fmt=auto&app=138&f=JPEG?w=516&h=500';
      this.machineGroupName = '';
      this.machineNumber = '';
      this.machineName = '';
      this.carbodyID = '';
      this.commodityName = '';
      this.machinePrice = 0;
      this.customPrice = 0;
      this.capacity = 0;
      this.extant = 0;
      this.wechatDiscount = 100;
      this.alipayDiscount = 100;
      this.idDiscount = 100;
      this.warnAmount = 0;
      this.enableFreightWays = '否';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          freightWay: this.tableData.length + 1,
          image: this.image,
          machineGroupName: this.machineGroupName,
          machineNumber: this.machineNumber,
          machineName: this.machineName,
          carbodyID: this.carbodyID,
          commodityName: this.commodityName,
          machinePrice: this.machinePrice,
          customPrice: this.customPrice,
          capacity: this.capacity,
          extant: this.extant,
          wechatDiscount: this.wechatDiscount,
          alipayDiscount: this.alipayDiscount,
          idDiscount: this.idDiscount,
          warnAmount: this.warnAmount,
          enableFreightWays: this.enableFreightWays,
          state: '下载中',
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        freightWay: this.tableData.length + 1,
        image: this.image,
        machineGroupName: this.machineGroupName,
        machineNumber: this.machineNumber,
        machineName: this.machineName,
        carbodyID: this.carbodyID,
        commodityName: this.commodityName,
        machinePrice: this.machinePrice,
        customPrice: this.customPrice,
        capacity: this.capacity,
        extant: this.extant,
        wechatDiscount: this.wechatDiscount,
        alipayDiscount: this.alipayDiscount,
        idDiscount: this.idDiscount,
        warnAmount: this.warnAmount,
        enableFreightWays: this.enableFreightWays,
      });
    },
    cancelModal() {

    },
    // 删除全部数据
    removeAllData() {
      this.tableData = this.tableData.map(item => ({
        ...item,
        image: 'https://img2.baidu.com/it/u=3189273452,4056187285&fm=253&fmt=auto&app=138&f=JPEG?w=516&h=500',
        machineGroupName: '',
        machineNumber: '',
        machineName: '',
        carbodyID: '',
        commodityName: '',
        machinePrice: 0,
        customPrice: 0,
        capacity: 0,
        extant: 0,
        wechatDiscount: 100,
        alipayDiscount: 100,
        idDiscount: 100,
        warnAmount: 0,
        enableFreightWays: '否',
      }));
    },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        'freightWay|+1': 1,
        'image|1': commodityImgs,
        'machineGroupName|+1': machineGroupNameValues,
        'machineNumber|1': machineNumberValues,
        'machineName': '@title(1)',
        'carbodyID': /\d{8,8}/,
        'commodityName|1': commoditys,
        'machinePrice|1-100.2': 1,
        'customPrice|1-100.2': 1,
        'capacity|1-50': 1,
        'extant|1-50': 1,
        'wechatDiscount|1-100': 1,
        'alipayDiscount|1-100': 1,
        'idDiscount|1-100': 1,
        'warnAmount|1-100': 1,
        'enableFreightWays|1': whetherValues,
        'state|1': ['下载成功', '下载中', '未下载'],
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>
.commodity-img {
  width: 80px;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.content-container {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.upload-img-container {
  display: flex;
  justify-content: flex-end;
}

.upload-img {
  width: 245px;
  height: 245px;
  margin-right: 40px;
  margin-top: 75px;
}

.right-form-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.row {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.title {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}

.form {
  width: 240px;
}
</style>
