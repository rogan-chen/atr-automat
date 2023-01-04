<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'

const Random = Mock.Random
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器编号', key: 'machineNum', sortable: true },
        { title: '机器名', key: 'machineName', editable: true },
        { title: '货道号', key: 'trackNum', sortable: true },
        { title: '商品编号', key: 'commodityNum', sortable: true },
        { title: '商品', key: 'commodity', sortable: true },
        { title: '商品数量', key: 'commodityQuantity', editable: true },
        { title: '结果', key: 'result' },
        { title: '订单号', key: 'orderNum', sortable: true },
        { title: '优惠码', key: 'couponCode', sortable: true },
        { title: '推广人', key: 'promoter', editable: true },
        { title: '支付时间', key: 'paymentTime', sortable: true },
        { title: '优惠折扣', key: 'discount', sortable: true },
        { title: '实付金额', key: 'payAmount' },
        {
          title: 'Handle',
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
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted() {
    // getDiscountCodeStatisTableData().then(res => {
    //   // this.tableData = res.data
    //   console.log('加载优惠码统计数据', res.data);
    // })

    // mock data
    const mockData = Mock.mock({
      'array|5-20': [{
        'id|+1': 1,
        'machineNum': '',
        'machineName': '',
        'trackNum': '',
        'commodityNum': '',
        'commodity': '',
        'commodityQuantity': '',
        'result': '',
        'orderNum': '',
        'couponCode': '',
        'promoter': '@cname',
        'paymentTime': '@datetime()',
        'discount': '',
        'payAmount': '',
      }],
    });

    this.tableData = mockData
    console.log('随机产生的数据', mockData);
  }
}
</script>

<style>

</style>
