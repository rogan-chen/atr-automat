<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
    </Card>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import {
  machineGroupNameValues,
  machineNumberValues,
  whetherValues,
  orderTypes,
  orderStates,
  commoditys,
} from '@/mock/data/option-data.js'

export default {
  name: 'discount_code_statis_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '货道', key: 'freightWay' },
        { title: '机器组名', key: 'machineGroupName' },
        { title: '机器编号', key: 'machineNum', sortable: true },
        { title: '机器名', key: 'machineName', editable: true, width: 120 },
        { title: '商户订单号', key: 'merchantOrderNum' },
        { title: '微信订单号', key: 'wechatOrderNum' },
        { title: '商品名称', key: 'commodityName' },
        { title: '商品价格', key: 'commodityPrice' },
        { title: '订单总金额', key: 'orderTotalAmount' },
        { title: '代金券金额', key: 'couponAmount' },
        { title: '实付金额', key: 'payAmount' },
        { title: '订单状态', key: 'orderState' },
        { title: '订单类型', key: 'orderType' },
        { title: '是否中奖', key: 'isPrize' },
        { title: '支付时间', key: 'payDate' },
        {
          title: '操作',
          key: 'action',
          width: 170,
          render: (h, params) => {
            return h('div', [
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
              h('span', {}, ' '),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => { 
                    const { orderState, initRowIndex } = params.row;
                    if (orderState !== '退款审核中') {
                      this.$Message.error('当前订单不支持驳回！');
                      return;
                    }

                    this.tableData[initRowIndex].orderState = '已驳回';
                    this.$Message.success('操作成功！');
                  }
                },
              }, '驳回'),
              h('span', {}, ' '),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => { 
                    const { orderState, initRowIndex } = params.row;
                    if (orderState === '退款审核中') {
                      this.$Message.error('当前订单退款审核中！');
                      return;
                    }

                    this.tableData[initRowIndex].orderState = '退款审核中';
                    this.$Message.success('操作成功！');
                  }
                },
              }, '退款'),
            ]);
          }
        }
      ],
      tableData: [],
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `非现金流水记录-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-12': [{
        'id|+1': 1,
        'freightWay|+1': 1,
        'machineGroupName|1': machineGroupNameValues,
        'machineNum|1': machineNumberValues,
        'machineName': '@ctitle(2, 5)' + '售货机',
        'merchantOrderNum': /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/,
        'wechatOrderNum': /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/,
        'commodityName|1': commoditys,
        'commodityPrice|1-100.2': 1,
        'orderTotalAmount|200-400.2': 1,
        'couponAmount|1-50.2': 1,
        'payAmount|1-30.2': 1,
        'orderState|1': orderStates,
        'orderType|1': orderTypes,
        'isPrize|1': whetherValues,
        'payDate': '@datetime()',
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style></style>
