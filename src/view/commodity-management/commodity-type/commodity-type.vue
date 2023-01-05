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
      <div>
        商品类型：<Input v-model="commodityType" placeholder="请输入商品类型" style="width: 400px" />
      </div>
      <div style="margin-top: 20px;">
        商品描述：<Input v-model="commodityDescribe" placeholder="请输入商品描述" style="width: 400px" />
      </div>
      <div style="margin-top: 20px;">
        管 理 员： <Input v-model="administrator" placeholder="请输入管理员姓名" style="width: 400px" />
      </div>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
// TODO: 商品类型添加修改功能；
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
          key: 'handle',
          options: ['delete'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }, [])
            },
          ]
        }
      ],
      tableData: [],
      // 新增/修改商品类型
      title: '新增商品类型',
      visible: false,
      commodityType: '',
      commodityDescribe: '',
      administrator: '',
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
    },
    okModal() {
      this.tableData.push({
        id: this.tableData.length + 1,
        commodityType: this.commodityType,
        commodityDescribe: this.commodityDescribe,
        administrator: this.administrator,
      })
    },
    cancelModal() {
      
    },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        'commodityType|+1': [
          '咖啡类',
          '功能饮料',
          '碳酸饮料',
          '饮用水',
          '凉茶',
          '方便面',
          '纯牛奶',
          '生鲜食品',
          '预调酒',
          '养生酒',
        ],
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

</style>
