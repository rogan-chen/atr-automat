<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
    </Card>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'

export default {
  name: 'role_management_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '序号', key: 'serialNumber', sortable: true },
        { title: '类型', key: 'type' },
        { title: '标题', key: 'headline', editable: true },
        { title: '下级类型', key: 'subtype', editable: true },
        { title: '状态', key: 'status' },
        { title: '时间', key: 'time' },
        {
          title: '操作',
          key: 'action',
          width: 170,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  ghost: true,
                },
                on: {}
              }, '进入'),
            ]);
          }
        }
      ],
      tableData: [],
    }
  },
  methods: {
    exportExcel() {},

    addMachineGroup() {},

    okModal() {},

    cancelModal() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|3-9': [{
        'id|+1': 1,
        'serialNumber|+1': 1,
        'type': '问题',
        'headline': '@cparagraph(1)',
        'subtype': '问题',
        'status': '通过审核',
        'time': '@datetime()',
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>

</style>
