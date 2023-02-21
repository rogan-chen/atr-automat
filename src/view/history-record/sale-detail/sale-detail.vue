<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addConfig">付款方式</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" width="900px" cancelText=" ">
      <tables ref="paymentTypeTable" v-model="paymentTypeTableData" :columns="paymentTypeColumns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportAdviceExcel">导出为excel文件</Button>
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
} from '@/mock/data/option-data.js'

export default {
  name: 'discount_code_statis_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器组名', key: 'machineGroupName' },
        { title: '机器编号', key: 'machineNum', sortable: true },
        { title: '机器名', key: 'machineName', editable: true },
        { title: '箱体编号', key: 'carbodyID' },
        { title: '销售金额', key: 'saleAmount' },
        { title: '销售数量', key: 'saleCount' },
        { title: '出货失败金额', key: 'shipFailAmount' },
        { title: '出货失败数量', key: 'shipFailCount' },
        { title: '现金收款金额', key: 'cashCollectionAmount' },
        { title: '找零金额', key: 'changeAmount' },
        { title: '管理员', key: 'administrator' },
        {
          title: '操作',
          key: 'action',
          width: 175,
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
      // 付款方式
      visible: false,
      title: '付款方式',
      paymentTypeColumns: [
        { title: '支付类型', key: 'paymentType' },
        { title: '销售金额', key: 'saleAmount' },
        { title: '销售数量', key: 'saleCount' },
        { title: '出货失败金额', key: 'shipFailAmount' },
        { title: '出货失败数量', key: 'shipFailCount' },
        { title: '现金收款金额', key: 'cashCollectionAmount' },
        { title: '找零金额', key: 'changeAmount' },
      ],
      paymentTypeTableData: [],
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
        filename: `销售明细-${(new Date()).valueOf()}.csv`
      })
    },
    exportAdviceExcel() {
      this.$refs.paymentTypeTable.exportCsv({
        filename: `付款方式-${(new Date()).valueOf()}.csv`
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
        'carbodyID': /\d{8,8}/,
        'saleAmount|0-500.2': 1,
        'saleCount|1-50': 1,
        'shipFailAmount|0-500.2': 1,
        'shipFailCount|1-50': 1,
        'cashCollectionAmount|0-500.2': 1,
        'changeAmount|0-500.2': 1,
        'administrator': '@cname()',
      }],
    });

    this.tableData = mockData.list;

    // 付款方式
    this.paymentTypeTableData = Mock.mock({
      'list|5-15': [{
        'id|+1': 1,
        'paymentType|1': paymentTypes,
        'saleAmount|0-500.2': 1,
        'saleCount|1-50': 1,
        'shipFailAmount|0-500.2': 1,
        'shipFailCount|1-50': 1,
        'cashCollectionAmount|0-500.2': 1,
        'changeAmount|0-500.2': 1,
      }],
    }).list;
  }
}
</script>

<style>

</style>
