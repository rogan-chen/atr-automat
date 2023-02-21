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
        { title: '机器名', key: 'machineName', editable: true, width: 120 },
        { title: '支付类型', key: 'paymentType' },
        { title: '收金额/退币后金额', key: 'balance' },
        { title: '需退金额', key: 'refundedAmount' },
        { title: '操作金额', key: 'operationAmount' },
        { title: '时间', key: 'handleDate' },
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
        filename: `钱币记录-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-15': [{
        'id|+1': 1,
        'machineGroupName|1': machineGroupNameValues,
        'machineNum|1': machineNumberValues,
        'machineName': '@ctitle(2, 5)' + '售货机',
        'paymentType|1': paymentTypes,
        'balance|1-100.2': 1,
        'refundedAmount|1-200.2': 1,
        'operationAmount|1-300.2': 1,
        'handleDate': '@datetime()',
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>

</style>
