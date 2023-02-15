<template>
  <div>
    <Card>
      <tables ref="tables" border editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addConfig">新增销售汇总</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal"
      width="600px">
      <div style="text-indent: 25px;">
        商品名称： <Input v-model="commodityName" placeholder="请输入商品名称" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        销售类型：
        <Select v-model="commodityType" placeholder="请选择销售类型" style="width: 400px;">
          <Option v-for="item in saleTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px;">
        现金支付： <Input number v-model="cashPay" type="number" placeholder="请输入" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        数量： <Input number v-model="cashAmount" type="number" placeholder="请输入" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        微信支付(H)： <Input number v-model="wechatPay" type="number" placeholder="请输入" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        数量： <Input number v-model="wechatAmount" type="number" placeholder="请输入" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        支付宝扫码支付(H)： <Input number v-model="alipayScanCode" type="number" placeholder="请输入" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        数量： <Input number v-model="alipayAmount" type="number" placeholder="请输入" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        微信刷脸支付： <Input number v-model="wechatFacePay" type="wechatFacePay" placeholder="请输入" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        数量： <Input number v-model="wechatFaceAmount" type="number" placeholder="请输入" style="width: 400px;" />
      </div>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import {
  saleTypes,
  saleTypeList,
  timeTypeList,
  commoditys,
} from '@/mock/data/option-data.js'

export default {
  name: 'sales_summary_statis_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        {
          title: '商品信息',
          align: 'center',
          children: [
            { title: '商品编号', key: 'commodityNum' },
            { title: '商品名称', key: 'commodityName' },
            { title: '销售类型', key: 'commodityType' },
          ],
        },
        {
          title: '支付类型',
          align: 'center',
          children: [
            { title: '现金支付', key: 'cashPay' },
            { title: '数量', key: 'cashAmount' },
            { title: '微信支付', key: 'wechatPay' },
            { title: '数量', key: 'wechatAmount' },
            { title: '支付宝扫码支付(H)', key: 'alipayScanCode' },
            { title: '数量', key: 'alipayAmount' },
            { title: '微信刷脸支付(H)', key: 'wechatFacePay' },
            { title: '数量', key: 'wechatFaceAmount' },
          ],
        },
        {
          title: '合计',
          align: 'center',
          children: [
            { title: '利润', key: 'profit' },
            { title: '毛利', key: 'grossProfit' },
            { title: '所占比例(%)', key: 'proportion' },
            { title: '总金额', key: 'totalAmount' },
            { title: '总数量', key: 'totalQuantity' },
          ],
        },
        {
          title: '操作',
          key: 'action',
          width: 140,
          align: 'center',
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
                    this.title = '修改销售汇总';
                    this.visible = true;
                    this.commodityNum = params.row.commodityNum;
                    this.commodityName = params.row.commodityName;
                    this.commodityType = params.row.commodityType;
                    this.cashPay = params.row.cashPay;
                    this.cashAmount = params.row.cashAmount;
                    this.wechatPay = params.row.wechatPay;
                    this.wechatAmount = params.row.wechatAmount;
                    this.alipayScanCode = params.row.alipayScanCode;
                    this.alipayAmount = params.row.alipayAmount;
                    this.wechatFacePay = params.row.wechatFacePay;
                    this.wechatFaceAmount = params.row.wechatFaceAmount;
                    this.profit = params.row.profit;
                    this.grossProfit = params.row.grossProfit;
                    this.proportion = params.row.proportion;
                    this.totalAmount = params.row.totalAmount;
                    this.totalQuantity = params.row.totalQuantity;
                    this.machineGroupIndex = params.row.initRowIndex;
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
      saleTypeList,
      timeTypeList,
      // 新增/修改销售汇总
      title: '新增销售汇总',
      visible: false,
      commodityNum: '',
      commodityName: '',
      commodityType: '',
      cashPay: '',
      cashAmount: '',
      wechatPay: '',
      wechatAmount: '',
      alipayScanCode: '',
      alipayAmount: '',
      wechatFacePay: '',
      wechatFaceAmount: '',
      profit: '',
      grossProfit: '',
      proportion: '',
      totalAmount: '',
      totalQuantity: '',
      machineGroupIndex: -1,
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `销售汇总统计-${(new Date()).valueOf()}.csv`
      })
    },
    addConfig() {
      this.title = '新增配置参数';
      this.visible = true;
      this.commodityNum = '';
      this.commodityName = '';
      this.commodityType = '';
      this.cashPay = '';
      this.cashAmount = '';
      this.wechatPay = '';
      this.wechatAmount = '';
      this.alipayScanCode = '';
      this.alipayAmount = '';
      this.wechatFacePay = '';
      this.wechatFaceAmount = '';
      this.profit = '';
      this.grossProfit = '';
      this.proportion = '';
      this.totalAmount = '';
      this.totalQuantity = '';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          ...{
            id: this.tableData.length + 1,
            commodityNum: Mock.mock({ regexp: /\d{10,10}/ }).regexp,
            commodityName: this.commodityName,
            commodityType: this.commodityType,
            cashPay: this.cashPay,
            cashAmount: this.cashAmount,
            wechatPay: this.wechatPay,
            wechatAmount: this.wechatAmount,
            alipayScanCode: this.alipayScanCode,
            alipayAmount: this.alipayAmount,
            wechatFacePay: this.wechatFacePay,
            wechatFaceAmount: this.wechatFaceAmount,
          },
          ...Mock.mock({
            'profit|1-100.2': 1,
            'grossProfit|1-100.2': 1,
            'proportion|1-100.2': 1,
            'totalAmount|200-400.2': 1,
            'totalQuantity|200-400.2': 1,
          }),
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        commodityNum: this.commodityNum,
        commodityName: this.commodityName,
        commodityType: this.commodityType,
        cashPay: this.cashPay,
        cashAmount: this.cashAmount,
        wechatPay: this.wechatPay,
        wechatAmount: this.wechatAmount,
        alipayScanCode: this.alipayScanCode,
        alipayAmount: this.alipayAmount,
        wechatFacePay: this.wechatFacePay,
        wechatFaceAmount: this.wechatFaceAmount,
        profit: this.profit,
        grossProfit: this.grossProfit,
        proportion: this.proportion,
        totalAmount: this.totalAmount,
        totalQuantity: this.totalQuantity,
      });
    },

    cancelModal() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-20': [{
        'id|+1': 1,
        'commodityNum': /\d{10,10}/,
        'commodityName|1': commoditys,
        'commodityType|1': saleTypes,
        'cashPay|1-100.2': 1,
        'cashAmount|1-100': 1,
        'wechatPay|1-100.2': 1,
        'wechatAmount|1-100': 1,
        'alipayScanCode|1-100.2': 1,
        'alipayAmount|1-100': 1,
        'wechatFacePay|1-100.2': 1,
        'wechatFaceAmount|1-100': 1,
        'profit|1-100.2': 1,
        'grossProfit|1-100.2': 1,
        'proportion|1-100.2': 1,
        'totalAmount|200-400.2': 1,
        'totalQuantity|200-400.2': 1,
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>

</style>
