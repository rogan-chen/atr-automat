<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addConfig">新增优惠码</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal"
      width="900">
      <Row>
        <Col span="12">
          <Row class="row" style="margin-top:0;">
            <Col span="6">
              <strong class="title">机器编号：</strong>
            </Col>
            <Col span="18">
              <Select v-model="machineNum" placeholder="请选择机器编号" class="form">
                <Option v-for="item in machineNumberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">机器名：</strong>
            </Col>
            <Col span="18">
              <Input v-model="machineName" placeholder="请输入机器名" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">货道号：</strong>
            </Col>
            <Col span="18">
              <Input v-model="trackNum" placeholder="请输入货道号" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">商品编号：</strong>
            </Col>
            <Col span="18">
              <Input v-model="commodityNum" placeholder="请输入商品编号" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">商品：</strong>
            </Col>
            <Col span="18">
              <Select v-model="commodity" placeholder="请选择商品" class="form">
                <Option v-for="item in commodityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">商品数量：</strong>
            </Col>
            <Col span="18">
              <InputNumber :precision="0" v-model="commodityQuantity" placeholder="请输入商品数量" class="form" />
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="row" style="margin-top: 0;">
            <Col span="6">
              <strong class="title">订单号：</strong>
            </Col>
            <Col span="18">
              <Input v-model="orderNum" placeholder="请输入订单号" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">优惠码：</strong>
            </Col>
            <Col span="18">
              <Input v-model="couponCode" placeholder="请输入优惠码" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">推广人：</strong>
            </Col>
            <Col span="18">
              <Input v-model="promoter" placeholder="请输入推广人" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">支付时间：</strong>
            </Col>
            <Col span="18">
              <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择支付时间" class="form" v-model="paymentTime" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">优惠折扣：</strong>
            </Col>
            <Col span="18">
              <Input v-model="discount" placeholder="请输入优惠折扣" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">实付金额：</strong>
            </Col>
            <Col span="18">
              <InputNumber :precision="2" v-model="payAmount" placeholder="请输入实付金额" class="form" />
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
  commoditys, 
  discounts,
  machineNumberList,
  machineNumberValues,
  commodityList,
} from '@/mock/data/option-data.js'

export default {
  name: 'discount_code_statis_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器编号', key: 'machineNum', sortable: true },
        { title: '机器名', key: 'machineName', editable: true, width: 120 },
        { title: '货道号', key: 'trackNum', sortable: true },
        { title: '商品编号', key: 'commodityNum', sortable: true },
        { title: '商品', key: 'commodity', sortable: true },
        { title: '商品数量', key: 'commodityQuantity', editable: true },
        { title: '订单号', key: 'orderNum', sortable: true },
        { title: '优惠码', key: 'couponCode', sortable: true },
        { title: '推广人', key: 'promoter', editable: true },
        { title: '支付时间', key: 'paymentTime', sortable: true, width: 150 },
        { title: '优惠折扣', key: 'discount', sortable: true },
        { title: '实付金额', key: 'payAmount' },
        {
          title: '操作',
          key: 'action',
          width: 140,
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
                    this.machineGroupIndex = params.row.initRowIndex;
                    this.title = '修改优惠码';
                    this.visible = true;
                    this.machineNum = params.row.machineNum;
                    this.machineName = params.row.machineName;
                    this.trackNum = params.row.trackNum;
                    this.commodityNum = params.row.commodityNum;
                    this.commodity = params.row.commodity;
                    this.commodityQuantity = params.row.commodityQuantity;
                    this.orderNum = params.row.orderNum;
                    this.couponCode = params.row.couponCode;
                    this.promoter = params.row.promoter;
                    this.paymentTime = new Date(params.row.paymentTime);
                    this.discount = params.row.discount;
                    this.payAmount = params.row.payAmount;
                  }
                }
              }, '修改'),
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
              }, '删除')
            ]);
          }
        }
      ],
      tableData: [],
      machineNumberList,
      commodityList,
      // 新增修改优惠码
      machineGroupIndex: -1,
      title: '新增优惠码',
      visible: false,
      machineNum: '',
      machineName: '',
      trackNum: '',
      commodityNum: '',
      commodity: '',
      commodityQuantity: 0,
      orderNum: '',
      couponCode: '',
      promoter: '',
      paymentTime: '',
      discount: 0,
      payAmount: 0,
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `优惠码统计-${(new Date()).valueOf()}.csv`
      })
    },
    addConfig() {
      this.machineGroupIndex = -1;
      this.title = '新增优惠码';
      this.visible = true;
      this.machineNum = '';
      this.machineName = '';
      this.trackNum = '';
      this.commodityNum = '';
      this.commodity = '';
      this.commodityQuantity = 0;
      this.orderNum = '';
      this.couponCode = '';
      this.promoter = '';
      this.paymentTime = '';
      this.discount = 0;
      this.payAmount = 0;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          machineNum: this.machineNum,
          machineName: this.machineName,
          trackNum: this.trackNum,
          commodityNum: this.commodityNum,
          commodity: this.commodity,
          commodityQuantity: this.commodityQuantity,
          orderNum: this.orderNum,
          couponCode: this.couponCode,
          promoter: this.promoter,
          paymentTime: this.paymentTime.toLocaleString().replace('/', '-').replace('/', '-'),
          discount: this.discount,
          payAmount: this.payAmount,
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        machineNum: this.machineNum,
          machineName: this.machineName,
          trackNum: this.trackNum,
          commodityNum: this.commodityNum,
          commodity: this.commodity,
          commodityQuantity: this.commodityQuantity,
          orderNum: this.orderNum,
          couponCode: this.couponCode,
          promoter: this.promoter,
          paymentTime: this.paymentTime.toLocaleString().replace('/', '-').replace('/', '-'),
          discount: this.discount,
          payAmount: this.payAmount,
      });
    },
    cancelModal() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-20': [{
        'id|+1': 1,
        'machineNum|1': machineNumberValues,
        'machineName': '@ctitle(2, 5)' + '售货机',
        'trackNum|1-30': 1,
        'commodityNum': /\d{10,10}/,
        'commodity|+1': commoditys,
        'commodityQuantity|1-10': 1,
        'result': '已出库',
        'orderNum|2': /\d{5,8}\-/,
        'couponCode': '@title(1)',
        'promoter': '@cname',
        'paymentTime': '@datetime()',
        'discount|+1': discounts,
        'payAmount|1-100.2': 1,
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style scoped>
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
