<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary"
        @click="addCommodityType">新增商品类型</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <Row class="row" style="margin-top:0;">
        <Col span="6">
          <strong class="title">商品类型：</strong>
        </Col>
        <Col span="18">
          <Input v-model="commodityType" placeholder="请输入商品类型" class="form" />
        </Col>
      </Row>
      <Row class="row">
        <Col span="6">
          <strong class="title">商品描述：</strong>
        </Col>
        <Col span="18">
          <Input v-model="commodityDescribe" placeholder="请输入商品描述" class="form" />
        </Col>
      </Row>
      <Row class="row">
        <Col span="6">
          <strong class="title">管理员：</strong>
        </Col>
        <Col span="18">
          <Input v-model="administrator" placeholder="请输入管理员姓名" class="form" />
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import { 
  commodityTypes,
} from '@/mock/data/option-data.js';

export default {
  name: 'commodity_type_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '商品类型', key: 'commodityType' },
        { title: '描述', key: 'commodityDescribe' },
        { title: '管理员', key: 'administrator', editable: true },
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
                    this.title = '修改商品类型';
                    this.visible = true;
                    this.commodityType = params.row.commodityType;
                    this.commodityDescribe = params.row.commodityDescribe;
                    this.administrator = params.row.administrator;
                    this.machineGroupIndex = params.row.initRowIndex;
                  }
                }
              }, '修改'),
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
      // 新增/修改商品类型
      title: '新增商品类型',
      visible: false,
      commodityType: '',
      commodityDescribe: '',
      administrator: '',
      machineGroupIndex: -1,
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `商品类型-${(new Date()).valueOf()}.csv`
      })
    },
    addCommodityType() {
      this.visible = true;
      this.commodityType = '';
      this.commodityDescribe = '';
      this.administrator = '';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          commodityType: this.commodityType,
          commodityDescribe: this.commodityDescribe,
          administrator: this.administrator,
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        commodityType: this.commodityType,
        commodityDescribe: this.commodityDescribe,
        administrator: this.administrator,
      });
    },
    cancelModal() {

    },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        'commodityType|+1': commodityTypes,
        'commodityDescribe|+1': [
          '港芝出品，必属精品！',
          '这个品类的食品非常不错',
          '快来看，快来瞧！',
          '立可得感觉到了咖',
          'IE偶认为IEUR偶',
          '斯卡迪就放开我4身上发生的22',
        ],
        'administrator': '@cname()',
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>
.row {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.title {
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}

.form {
  width: 85%;
}
</style>
