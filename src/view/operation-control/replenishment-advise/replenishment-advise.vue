<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addConfig">补货建议</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" width="80%">
      <tables ref="adviceTables" v-model="adviceTableData" :columns="adviceColumns" />
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
  commoditys,
  commodityTypes,
  commodityImgs,
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
        { title: '管理员', key: 'administrator' },
        { title: '缺货商品数量', key: 'stockNumber', className: 'stock-amount' },
        { title: '售空货道数量', key: 'freightWayNumber', className: 'freight-way' },
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
              h('span', {}, ' '),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => this.$Message.info('成功生成！'),
                },
              }, '生成补货建议'),
            ]);
          }
        }
      ],
      tableData: [],
      // 补货建议
      visible: false,
      title: '补货建议',
      adviceColumns: [
        {
          title: '商品图片',
          key: 'commodityImg',
          width: 120,
          render: (h, { row }) => {
            return (
              <img 
                src={row.commodityImg}
                alt='cover'
                fit='cover'
                class='commodity-img'
              />
            )
          }
        },
        { title: 'SKU/商品名称', key: 'commodityName' },
        { title: '类型', key: 'commodityType' },
        { title: '商品条码', key: 'commodityCode' },
        { title: '现存', key: 'extant' },
        { title: '容量', key: 'capacity' },
        { title: '待补货数量', key: 'replenishedCount' },
      ],
      adviceTableData: [],
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `补货建议-${(new Date()).valueOf()}.csv`
      })
    },
    exportAdviceExcel() {
      this.$refs.adviceTables.exportCsv({
        filename: `补货建议-${(new Date()).valueOf()}.csv`
      })
    },
    addConfig() {
      this.visible = true;
      this.title = '补货建议';
      this.adviceTableData = Mock.mock({
        'list|5-10': [{
          'id|+1': 1,
          'commodityImg|1': commodityImgs,
          'commodityName|1': commoditys,
          'commodityType|1': commodityTypes,
          'commodityCode': '@title(1)',
          'extant|1-50': 1,
          'capacity|1-50': 1,
          'replenishedCount|1-50': 1,
        }],
      }).list;
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
        'administrator': '@cname()',
        'stockNumber|1-100': 1,
        'freightWayNumber|1-5': 1,
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>
.stock-amount {
  color: red;
  font-weight: bold;
}

.freight-way {
  color: red;
  font-weight: bold;
}

.commodity-img {
  width: 80px;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
