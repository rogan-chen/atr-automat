<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal" width="80%"
      cancelText=" " okText="关闭">
      <strong>销售明细备注：机器时间，是出货时机器记录的时间；上传服务器时间，是指交易数据到达服务器的时间。有可能机器时间和服务器时间存在时间差，是因为机器时间不准确导致的。</strong>
      <Row>
        <br>
        <Col span="6">
          <strong style="font-size:15px;">机器编号：{{machineNum}}</strong>
        </Col>
        <Col span="6">
          <strong style="font-size:15px;">机器名：{{machineName}}</strong>
        </Col>
        <Col span="6">
          <strong style="font-size:15px;">现金收款金额：{{cashCollectionAmount}}</strong>
        </Col>
        <Col span="6">
          <strong style="font-size:15px;">找零金额：{{changeAmount}}</strong>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <strong style="font-size:15px;">销售金额：{{saleAmount}}</strong>
        </Col>
        <Col span="6">
          <strong style="font-size:15px;">销售数量：{{saleCount}}</strong>
        </Col>
        <Col span="6">
          <strong style="font-size:15px;">部署地址：{{deployAddress}}</strong>
        </Col>
        <Col span="6">
          <strong style="font-size:15px;">管理员：{{administrator}}</strong>
        </Col>
      </Row>
      <br>
      <Tabs>
        <TabPane label="交易流水" name="交易流水">
          <tables ref="streamTable" v-model="streamTableData" :columns="streamColumns" />
        </TabPane>
        <TabPane label="销售汇总统计" name="销售汇总统计">
          <tables ref="streamTable" v-model="saleSummaryTableData" :columns="saleSummaryColumns" />
        </TabPane>
        <TabPane label="出货记录" name="出货记录">
          <tables ref="streamTable" v-model="shipRecordTableData" :columns="shipRecordColumns" />
        </TabPane>
        <TabPane label="门开关流水" name="门开关流水">
          <tables ref="streamTable" v-model="doorSwitchTableData" :columns="doorSwitchColumns" />
        </TabPane>
        <TabPane label="补货记录" name="补货记录">
          <tables ref="streamTable" v-model="replenishmentRecordTableData" :columns="replenishmentRecordColumns" />
        </TabPane>
        <TabPane label="应收金额" name="应收金额">
          <tables ref="streamTable" v-model="receivableAmountTableData" :columns="receivableAmountColumns" />
        </TabPane>
      </Tabs>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import {
  machineNumberValues,
  machineGroupNameValues,
  networkStates,
  paymentTypes,
  commoditys,
  doorStates,
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
        { title: '机器名', key: 'machineName', editable: true },
        { title: '箱体编号', key: 'carbodyID' },
        { title: '网络状态', key: 'networkState' },
        { title: '温度(­°C)', key: 'temperature', sortable: true },
        { title: '支付类型', key: 'paymentType' },
        { title: '销售金额', key: 'saleAmount' },
        { title: '销售数量', key: 'saleCount' },
        { title: '零钱消耗', key: 'changeConsume' },
        { title: '出货失败金额', key: 'shipFailAmount' },
        { title: '出货失败数量', key: 'shipFailCount' },
        { title: '现金收款金额', key: 'cashCollectionAmount' },
        { title: '找零金额', key: 'changeAmount' },
        { title: '收纸币金额', key: 'noteAmount' },
        { title: '收硬币金额', key: 'coinAmount' },
        { title: '纸币找零金额', key: 'noteChangeAmount' },
        { title: '当前硬币金额', key: 'currentCoinAmount' },
        { title: '时间', key: 'datetime' },
        { title: '部署地址', key: 'deployAddress' },
        { title: '管理员', key: 'administrator' },
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    this.title = '查询明细';
                    this.machineNum = Mock.mock({ 'machineNum|1': machineNumberValues }).machineNum;
                    this.machineName = params.row.machineName;
                    this.cashCollectionAmount = params.row.cashCollectionAmount;
                    this.changeAmount = params.row.changeAmount;
                    this.saleAmount = params.row.saleAmount;
                    this.saleCount = params.row.saleCount;
                    this.deployAddress = params.row.deployAddress;
                    this.administrator = params.row.administrator;
                    // 交易流水
                    this.streamTableData = Mock.mock({
                      'list|5-10': [{
                        'freightWay|+1': 1,
                        'commodityName|1': commoditys,
                        'paymentType|1': paymentTypes,
                        'unitPrice|0-100.2': 1,
                        'result': '正常',
                        'machineDate': '@datetime()',
                        'serviceDate': '@datetime()',
                        'coinAmount|0-500.2': 1,
                        'needRefundAmount|0-500.2': 1,
                        'actualRefundAmount|0-500.2': 1,
                        'amountDate': '@datetime()',
                      }]
                    }).list;
                    // 销售汇总统计
                    this.saleSummaryTableData = Mock.mock({
                      'list|5-10': [{
                        'commodityName|1': commoditys,
                        'saleAmount|0-500.2': 1,
                        'saleCount|1-50': 1,
                      }]
                    }).list;
                    // 出货记录
                    this.shipRecordTableData = Mock.mock({
                      'list|5-10': [{
                        'freightWay|+1': 1,
                        'paymentType|1': paymentTypes,
                        'commodityName|1': commoditys,
                        'unitPrice|0-100.2': 1,
                        'result': '正常',
                        'machineDate': '@datetime()',
                        'serviceDate': '@datetime()',
                      }]
                    }).list;
                    // 开关门流水
                    this.doorSwitchTableData = Mock.mock({
                      'list|5-10': [{
                        'machineNum': this.machineNum,
                        'machineName': this.machineName,
                        'state|1': doorStates,
                        'datetime': '@datetime()',
                      }]
                    }).list;
                    // 补货记录
                    this.replenishmentRecordTableData = Mock.mock({
                      'list|5-10': [{
                        'commodityName|1': commoditys,
                        'replenishmentCount|1-10': 1,
                        'datetime': '@datetime()',
                      }]
                    }).list;
                    // 应收金额
                    this.receivableAmountTableData = Mock.mock({
                      'list|5-10': [{
                        'receivableAmount|0-100.2': 1,
                        'createDate': '@datetime()',
                        'endDate': '@datetime()',
                      }]
                    }).list;
                    this.visible = true;
                  }
                },
              }, '查询明细'),
            ]);
          }
        }
      ],
      tableData: [],
      // 查询明细
      title: '查询明细',
      visible: false,
      machineNum: '',
      machineName: '',
      cashCollectionAmount: '',
      changeAmount: '',
      saleAmount: '',
      saleCount: '',
      deployAddress: '',
      administrator: '',
      // 交易流水
      streamColumns: [
        { title: '货道', key: 'freightWay' },
        { title: '商品名称', key: 'commodityName' },
        { title: '支付类型', key: 'paymentType' },
        { title: '单价', key: 'unitPrice' },
        { title: '结果', key: 'result' },
        { title: '机器时间', key: 'machineDate' },
        { title: '服务器时间', key: 'serviceDate' },
        { title: '投币金额', key: 'coinAmount' },
        { title: '需退金额', key: 'needRefundAmount' },
        { title: '实退金额', key: 'actualRefundAmount' },
        { title: '时间', key: 'amountDate' },
      ],
      streamTableData: [],
      // 销售汇总统计
      saleSummaryColumns: [
        { title: '商品名称', key: 'commodityName' },
        { title: '销售金额', key: 'saleAmount' },
        { title: '销售数量', key: 'saleCount' },
      ],
      saleSummaryTableData: [],
      // 出货记录
      shipRecordColumns: [
        { title: '货道', key: 'freightWay' },
        { title: '支付类型', key: 'paymentType' },
        { title: '商品名称', key: 'commodityName' },
        { title: '单价', key: 'unitPrice' },
        { title: '结果', key: 'result' },
        { title: '机器时间', key: 'machineDate' },
        { title: '服务器时间', key: 'serviceDate' },
      ],
      shipRecordTableData: [],
      // 门开关流水
      doorSwitchColumns: [
        { title: '机器编号', key: 'machineNum' },
        { title: '机器名', key: 'machineName' },
        { title: '状态', key: 'state' },
        { title: '时间', key: 'datetime' },
      ],
      doorSwitchTableData: [],
      // 补货记录
      replenishmentRecordColumns: [
        { title: '商品名称', key: 'commodityName' },
        { title: '补货数量', key: 'replenishmentCount' },
        { title: '时间', key: 'datetime' },
      ],
      replenishmentRecordTableData: [],
      // 应收金额
      receivableAmountColumns: [
        { title: '应收金额', key: 'receivableAmount' },
        { title: '创建时间', key: 'createDate' },
        { title: '结束时间', key: 'endDate' },
      ],
      receivableAmountTableData: [],
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `当日销售监控-${(new Date()).valueOf()}.csv`
      })
    },
    okModal() { },
    cancelModal() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-15': [{
        'id|+1': 1,
        'machineGroupName|1': machineGroupNameValues,
        'machineName': '@ctitle(2, 5)' + '售货机',
        'carbodyID': /\d{8,8}/,
        'networkState|1': networkStates,
        'temperature|10-100': 1,
        'paymentType|1': paymentTypes,
        'saleAmount|0-500.2': 1,
        'saleCount|1-50': 1,
        'changeConsume|0-500.2': 1,
        'shipFailAmount|0-500.2': 1,
        'shipFailCount|1-50': 1,
        'cashCollectionAmount|0-500.2': 1,
        'changeAmount|0-500.2': 1,
        'noteAmount|0-500.2': 1,
        'coinAmount|0-500.2': 1,
        'noteChangeAmount|0-500.2': 1,
        'currentCoinAmount|0-500.2': 1,
        'datetime': '@datetime()',
        'deployAddress': '@city()',
        'administrator': '@cname()',
        'machineNum': /\d{12,12}/,
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style scoped>

</style>
