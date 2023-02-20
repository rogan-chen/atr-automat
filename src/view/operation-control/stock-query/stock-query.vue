<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="stockDetail">缺货商品明细</Button>
    </Card>
    <Modal v-model="detailVisible" :title="detailTitle" :mask-closable="false" width="600px" cancelText=" " okText="关闭">
      <tables ref="detailTables" v-model="detailTableData" :columns="detailColumns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportDetailExcel">导出为excel文件</Button>
    </Modal>
    <Modal v-model="goodsVisible" :title="goodsTitle" :mask-closable="false" width="80%" cancelText=" " okText="关闭">
      <Row>
        <Col span="8">
        <strong style="font-size:15px;">机器分组：{{ machineGroupName }}</strong>
        </Col>
        <Col span="8">
        <strong style="font-size:15px;">机器编号：{{ machineNum }}</strong>
        </Col>
        <Col span="8">
        <strong style="font-size:15px;">机器名：{{ machineName }}</strong>
        </Col>
      </Row>
      <Row>
        <br>
        <Col span="8">
        <strong style="font-size:15px;">管理员：{{ administrator }}</strong>
        </Col>
        <Col span="8">
        <strong style="font-size:15px;">描述：{{ description }}</strong>
        </Col>
        <Col span="8">
        </Col>
      </Row>
      <br>
      <Row>
        <Col span="12">
          <div style="margin-right:5px;">
            <span>机器缺货商品信息：</span>
            <tables style="margin-top:7px;" ref="stockTables" v-model="stockTableData" :columns="stockColumns" />
            <Button style="margin-top: 10px;" type="primary" @click="exportStockExcel">缺货excel导出</Button>
          </div>
        </Col>
        <Col span="12">
          <div style="margin-left:5px;">
            <span>机器未缺货商品信息：</span>
            <tables style="margin-top:7px;" ref="unstockTables" v-model="unstockTableData" :columns="unstockColumns" />
            <Button style="margin-top: 10px;" type="primary" @click="exportUnstockExcel">未缺货excel导出</Button>
          </div>
        </Col>
      </Row>
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
        { title: '地址', key: 'address' },
        { title: '缺货数量', key: 'stockAmount', className: 'stock-amount' },
        { title: '库存类型', key: 'stockType' },
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
                    this.goodsVisible = true;
                    this.machineGroupName = params.row.machineGroupName;
                    this.machineNum = params.row.machineNum;
                    this.machineName = params.row.machineName;
                    this.administrator = Mock.mock('@cname()');
                    this.description = Mock.mock('@ctitle()');
                    // 机器缺货商品信息
                    this.stockTableData = Mock.mock({
                      'list|5-10': [{
                        'id|+1': 1,
                        'commodityName|1': commoditys,
                        'inventory|1-100': 1,
                        'capacity|1-100': 1,
                        'stockAmount|1-100': 1,
                      }],
                    }).list;
                    // 机器缺货商品信息
                    this.unstockTableData = Mock.mock({
                      'list|5-10': [{
                        'id|+1': 1,
                        'commodityName|1': commoditys,
                        'inventory|1-100': 1,
                        'capacity|1-100': 1,
                        'stockAmount|1-100': 1,
                      }],
                    }).list;
                  },
                },
              }, '详细信息'),
            ]);
          }
        }
      ],
      tableData: [],

      // 缺货商品明细
      detailVisible: false,
      detailTitle: '缺货商品明细',
      detailColumns: [
        { title: '商品名称', key: 'commodityName', align: 'center' },
        { title: '缺货数量', key: 'stockAmount', className: 'stock-amount', align: 'center' },
      ],
      detailTableData: [],

      // 机器商品明细
      goodsVisible: false,
      goodsTitle: '机器商品明细',
      machineGroupName: '',
      machineNum: '',
      machineName: '',
      administrator: '',
      description: '',
      // 机器缺货商品信息
      stockColumns: [
        { title: '商品名称', key: 'commodityName', align: 'center' },
        { title: '库存量', key: 'inventory', align: 'center' },
        { title: '容量', key: 'capacity', align: 'center' },
        { title: '缺货数量', key: 'stockAmount', className: 'stock-amount', align: 'center' },
      ],
      stockTableData: [],
      // 机器未缺货商品信息
      unstockColumns: [
        { title: '商品名称', key: 'commodityName', align: 'center' },
        { title: '库存量', key: 'inventory', align: 'center' },
        { title: '容量', key: 'capacity', align: 'center' },
        { title: '缺货数量', key: 'stockAmount', className: 'stock-amount', align: 'center' },
      ],
      unstockTableData: [],
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    stockDetail() {
      this.detailVisible = true;
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `机器缺货查询-${(new Date()).valueOf()}.csv`
      })
    },
    exportDetailExcel() {
      this.$refs.detailTables.exportCsv({
        filename: `缺货商品明细-${(new Date()).valueOf()}.csv`
      })
    },
    exportStockExcel() {
      this.$refs.stockTables.exportCsv({
        filename: `机器缺货商品信息-${(new Date()).valueOf()}.csv`
      })
    },
    exportUnstockExcel() {
      this.$refs.unstockTables.exportCsv({
        filename: `机器未缺货商品信息-${(new Date()).valueOf()}.csv`
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
        'address': '@city()',
        'stockAmount|0-10': 1,
      }],
    });

    mockData.list.map(item => {
      item.stockType = Number(item.stockAmount) === 0 ? '未缺货' : '缺货';
    })

    this.tableData = mockData.list;

    // 缺货商品明细
    this.detailTableData = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        'commodityName|1': commoditys,
        'stockAmount|1-50': 1,
      }],
    }).list;
  }
}
</script>

<style>
.stock-amount {
  color: red;
  font-weight: bold;
}

.goods-content {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>
