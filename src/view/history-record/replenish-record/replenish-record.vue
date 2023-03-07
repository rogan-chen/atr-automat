<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
    </Card>
    <Modal width="1000" v-model="visible" :title="title" :mask-closable="false" ok-text="关闭" cancel-text=" " @on-ok="okModal" @on-cancel="cancelModal">
      <Row>
        <Col span="8">
        <strong style="font-size:15px;">补货人：{{ replenishMan }}</strong>
        </Col>
        <Col span="8">
        <strong style="font-size:15px;">补货数量：{{ replenishCount }}</strong>
        </Col>
        <Col span="8">
        <strong style="font-size:15px;">补货时间：{{ replenishDate }}</strong>
        </Col>
      </Row>
      <tables style="margin-top:14px;" ref="detailTables" v-model="detailTable" :columns="detailColumns" />
      <Button style="margin-top: 10px;" type="primary" @click="exportDetailExcel">补货详情excel导出</Button>
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
  doorList,
  commoditys,
} from '@/mock/data/option-data.js';

export default {
  name: 'door_record_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器组名', key: 'machineGroupName' },
        { title: '机器编号', key: 'machineNumber', sortable: true },
        { title: '机器名', key: 'machineName', editable: true },
        { title: '补货次数', key: 'replenishTimes' },
        { title: '补货数量', key: 'replenishCount' },
        { title: '部署地址', key: 'deployAddress', editable: true },
        { title: '补货时间', key: 'replenishDate' },
        { title: '补货人', key: 'replenishMan' },
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
                    this.visible = true;
                    this.replenishDate = params.row.replenishDate;
                    this.replenishMan = params.row.replenishMan;
                    this.replenishCount = params.row.replenishCount;
                    this.detailTable = Mock.mock({
                      'list|3-8': [{
                        'id|+1': 1,
                        'freightWay|+1': 1,
                        'commodityName|1': commoditys,
                        'replenishCountBefore|1-50': 1,
                        'replenishCountAfter|60-100': 1,
                        'replenishCountWait|1-20': 1,
                      }]
                    }).list;
                  }
                }
              }, '详情'),
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
      machineGroupNameList,
      machineNumberList,
      doorList,
      // 补货详情
      title: '补货详情',
      visible: false,
      replenishDate: '',
      replenishMan: '',
      replenishCount: '',
      detailTable: [],
      detailColumns: [
        { title: '货道', key: 'freightWay' },
        { title: 'SKU/商品名称', key: 'commodityName' },
        { title: '补货前数量', key: 'replenishCountBefore' },
        { title: '补货后数量', key: 'replenishCountAfter' },
        { title: '待补货数量', key: 'replenishCountWait' },
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
                  click: () => this.detailTable.splice(params.index, 1)
                },
              }, '删除')
            ]);
          }
        }
      ],
    }
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `补货记录-${(new Date()).valueOf()}.csv`
      })
    },

    exportDetailExcel() {
      this.$refs.detailTables.exportCsv({
        filename: `补货详情-${(new Date()).valueOf()}.csv`
      })
    },

    okModal() { },

    cancelModal() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        'machineGroupName|+1': machineGroupNameValues,
        'machineNumber|1': machineNumberValues,
        'machineName': '@title(1)',
        'replenishTimes|1-10': 1,
        'replenishCount|10-50': 1,
        'deployAddress': '@city()',
        'replenishDate': '@datetime()',
        'replenishMan': '@cname()',
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style scoped></style>
