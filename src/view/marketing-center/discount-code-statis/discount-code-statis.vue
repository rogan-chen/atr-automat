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

export default {
  name: 'discount_code_statis_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器编号', key: 'machineNum', sortable: true },
        { title: '机器名', key: 'machineName', editable: true, width: 120 },
        { title: '货道号', key: 'trackNum', sortable: true },
        { title: '商品编号', key: 'commodityNum', sortable: true },
        { title: '商品', key: 'commodity', sortable: true },
        { title: '商品数量', key: 'commodityQuantity', editable: true },
        // { title: '结果', key: 'result' },
        { title: '订单号', key: 'orderNum', sortable: true },
        { title: '优惠码', key: 'couponCode', sortable: true },
        { title: '推广人', key: 'promoter', editable: true },
        { title: '支付时间', key: 'paymentTime', sortable: true, width: 150 },
        { title: '优惠折扣', key: 'discount', sortable: true },
        { title: '实付金额', key: 'payAmount' },
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
            }
          ]
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
        filename: `优惠码统计-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-20': [{
        'id|+1': 1,
        'machineNum': /\d{12,12}/,
        'machineName': '中吉自动售货机',
        'trackNum|1-30': 1,
        'commodityNum': /\d{10,10}/,
        'commodity|+1': [
          '雀巢咖啡',
          '可口可乐',
          '百事可乐',
          '方便面',
          '农夫山泉',
          '雪碧',
          '熔岩蛋糕',
          '手抓饼',
          '威化饼干',
          '冰红茶',
        ],
        'commodityQuantity|1-10': 1,
        'result': '已出库',
        'orderNum|2': /\d{5,8}\-/,
        'couponCode': '@title(1)',
        'promoter': '@cname',
        'paymentTime': '@datetime()',
        'discount|+1': [
          '95折',
          '97折',
          '88折',
          '93折',
          '56折',
        ],
        'payAmount|1-100.2': 1,
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>

</style>
