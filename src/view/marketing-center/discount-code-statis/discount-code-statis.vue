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
  commoditys, 
  discounts,
} from '@/mock/data/option-data.js'

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
        { title: '订单号', key: 'orderNum', sortable: true },
        { title: '优惠码', key: 'couponCode', sortable: true },
        { title: '推广人', key: 'promoter', editable: true },
        { title: '支付时间', key: 'paymentTime', sortable: true, width: 150 },
        { title: '优惠折扣', key: 'discount', sortable: true },
        { title: '实付金额', key: 'payAmount' },
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
        filename: `优惠码统计-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-20': [{
        'id|+1': 1,
        'machineNum': /\d{11,11}/,
        'machineName': '@ctitle(2, 5)' + '售货机',
        'trackNum|1-30': 1,
        'commodityNum': /\d{10,10}/,
        'commodity|+1': commoditys,
        'commodityQuantity|1-10': 1,
        'result': '已出库',
        'orderNum|2': /\d{5,8}\-/,
        'couponCode': '@title(1)',
        'promoter': '@cname',
        'paymentTime': '@datetime()',
        'discount|+1': discounts,
        'payAmount|1-100.2': 1,
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>

</style>
