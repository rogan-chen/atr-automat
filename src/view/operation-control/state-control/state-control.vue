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
  networkStates,
  doorStates,
  commonStates,
  yesOrNoStates,
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
        { title: '网络状态', key: 'networkState' },
        { title: '温度|湿度(­°C)', key: 'temperature', sortable: true },
        { title: '门', key: 'door' },
        { title: '掉货检测', key: 'dropGood' },
        { title: '纸币器', key: 'noteMachine' },
        { title: '硬币器', key: 'coinMachine' },
        { title: '货道', key: 'track', sortable: true },
        { title: '读卡器', key: 'cardReader' },
        { title: '本月已用流量(M)', key: 'usedTraffic' },
        { title: '到期时间', key: 'expirationDate' },
        { title: '部署地址', key: 'deployAddress' },
        { title: '管理员', key: 'administrator' },
        { title: '版本', key: 'version' },
        { title: 'News版本', key: 'newVersion' },
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
              }, '删除')
            ]);
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `状态监控-${(new Date()).valueOf()}.csv`
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
        'networkState|1': networkStates,
        'temperature|10-100': 1,
        'door|1': doorStates,
        'dropGood|1': commonStates,
        'noteMachine|1': yesOrNoStates,
        'coinMachine|1': yesOrNoStates,
        'track|1': commonStates,
        'cardReader|1': yesOrNoStates,
        'usedTraffic|20-200.2': 1,
        'expirationDate': '@datetime()',
        'deployAddress': '@city()',
        'administrator': '@cname()',
        'version': /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/,
        'newVersion': /^([1-9]\d|[1-9])(\.([1-9]\d|\d)){2}$/,
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style scoped>

</style>
