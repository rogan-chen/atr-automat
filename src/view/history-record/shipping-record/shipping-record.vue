<template>
  <div>
    <strong>出货记录注：机器时间，是出货时机器记录的时间；上传服务器时间，是指交易数据到达服务器的时间。有可能机器时间和服务器时间存在时间差，是因为机器时间不准确或者数据延时上传。</strong>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addConfig">Excel预约下载</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" width="800px" cancelText=" ">
      <tables ref="downloadTable" v-model="downloadTableData" :columns="downloadColumns" />
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import {
  machineGroupNameValues,
  machineNumberValues,
  paymentTypes,
  commoditys,
  commonStates,
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
        { title: '机器名', key: 'machineName', editable: true },
        { title: '商品编号', key: 'commodityNum' },
        { title: '商品名称', key: 'commodityName' },
        { title: '供应商', key: 'supplier' },
        { title: '支付类型', key: 'paymentType' },
        { title: '卡号/序号', key: 'cardNum' },
        { title: '单价', key: 'unitPrice' },
        { title: '结果', key: 'result' },
        { title: '流水号', key: 'serialNum' },
        { title: '机器时间', key: 'machineDate' },
        { title: '服务器时间', key: 'serviceDate' },
        {
          title: '操作',
          key: 'action',
          width: 140,
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
            ]);
          }
        }
      ],
      tableData: [],
      // Excel预约下载
      visible: false,
      title: 'Excel预约下载',
      downloadColumns: [
        { title: '申请时间', key: 'applyDate' },
        { title: '类型', key: 'paymentType' },
        { title: '文件名', key: 'fileName' },
        { title: '状态', key: 'state' },
        {
          title: '操作',
          key: 'action',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => this.downloadTableData.splice(params.index, 1)
                },
              }, '删除'),
            ]);
          }
        }
      ],
      downloadTableData: [],
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    addConfig() {
      this.visible = true;
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `出货记录-${(new Date()).valueOf()}.csv`
      })
    },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-15': [{
        'id|+1': 1,
        'machineGroupName|1': machineGroupNameValues,
        'machineNum|1': machineNumberValues,
        'machineName': '@ctitle(2, 5)' + '售货机',
        'freightWay|+1': 1,
        'commodityNum': /\d{10,10}/,
        'commodityName|1': commoditys,
        'supplier': '@ctitle(2, 4)' + '供应商',
        'paymentType|1': paymentTypes,
        'cardNum': /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/,
        'unitPrice|0-100.2': 1,
        'result|1': commonStates,
        'serialNum': /^([1-9]{1})(\d{15}|\d{16}|\d{18})$/,
        'machineDate': '@datetime()',
        'serviceDate': '@datetime()',
      }],
    });

    this.tableData = mockData.list;

    // 付款方式
    this.downloadTableData = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        'applyDate': '@datetime()',
        'paymentType|1': paymentTypes,
        'fileName': '@ctitle(2, 5)' + '.doc',
        'state|1': commonStates,
      }],
    }).list;
  }
}
</script>

<style></style>
