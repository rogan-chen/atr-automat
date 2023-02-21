<template>
  <div>
    <strong>备注：报警记录，每次关门系统默认之前异常为已处理状态</strong>
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
        { title: '货道', key: 'freightWay' },
        { title: '机器组名', key: 'machineGroupName' },
        { title: '机器编号', key: 'machineNum', sortable: true },
        { title: '机器名', key: 'machineName', editable: true, width: 120 },
        { title: '状态', key: 'state' },
        { title: '事件主题', key: 'eventSubject' },
        { title: '描述', key: 'eventDescribe' },
        { title: '记录时间', key: 'remarkDate' },
        { title: '处理时间', key: 'handleDate' },
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
        filename: `报警-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-12': [{
        'id|+1': 1,
        'machineGroupName|1': machineGroupNameValues,
        'machineNum|1': machineNumberValues,
        'machineName': '@ctitle(2, 5)' + '售货机',
        'freightWay|+1': 1,
        'state': '已处理',
        'eventSubject': '@ctitle()',
        'eventDescribe': '@cparagraph(1)',
        'remarkDate': '@datetime()',
        'handleDate': '@datetime()',
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style></style>
