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
import { adviceImgs } from '@/mock/data/option-data.js'

export default {
  name: 'discount_code_statis_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器编号', key: 'machineNum', sortable: true },
        {
          title: '图片',
          key: 'image',
          width: 120,
          render: (h, { row }) => {
            return (
              <img 
                src={row.image}
                alt='cover'
                fit='cover'
                class='commodity-img'
              />
            )
          }
        },
        { title: '广告类型', key: 'advertType' },
        { title: '开始时间', key: 'startTime' },
        { title: '结束时间', key: 'endTime' },
        { title: '状态', key: 'state' },
        { title: '备注', key: 'remark' },
        { title: '手机号' , key: 'phoneNumber'},
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
        filename: `机器广告-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-20': [{
        'id|+1': 1,
        'machineNum': /\d{12,12}/,
        'image|1': adviceImgs,
        'advertType|1': [
          '告知广告',
          '促销广告',
          '形象广告',
          '建议广告',
          '公益广告',
          '推广广告',
        ],
        'startTime': '@datetime()',
        'endTime': '@datetime()',
        'state|1': ['开启', '关闭'],
        'remark': '@title()',
        'phoneNumber': /^1(3|5|7|8)[0-9]{9}$/,
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>
.commodity-img {
  width: 80px;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
