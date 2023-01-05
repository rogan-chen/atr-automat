<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addMachineGroup">新增机器组</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <div>
        机器组名：<Input v-model="machineGroupName" placeholder="请输入机器组名" style="width: 400px" />
      </div>
      <div style="margin-top: 20px;">
        管理员：<Input v-model="administrator" placeholder="请输入管理员" style="width: 400px; text-indent: 11px;" />
      </div>
      <div style="margin-top: 20px;">
        描述： <Input v-model="machineGroupDescribe" placeholder="请输入描述" type="textarea" :rows="4"
          style="width: 400px; text-indent: 18px;" />
      </div>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'

export default {
  name: 'commodity_type_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器组名', key: 'machineGroupName' },
        { title: '描述', key: 'machineGroupDescribe' },
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
                    this.visible = true;
                    this.machineGroupName = params.row.machineGroupName;
                    this.machineGroupDescribe = params.row.machineGroupDescribe;
                    this.administrator = params.row.administrator;
                    this.machineGroupIndex = params.row.initRowIndex;
                  }
                }
              }, '修改'),
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
      // 新增/修改机器组名
      title: '新增机器组名',
      visible: false,
      machineGroupName: '',
      machineGroupDescribe: '',
      administrator: '',
      machineGroupIndex: -1,
    }
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `机器组-${(new Date()).valueOf()}.csv`
      })
    },
    addMachineGroup() {
      this.visible = true;
      this.machineGroupName = '';
      this.machineGroupDescribe = '';
      this.administrator = '';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          machineGroupName: this.machineGroupName,
          machineGroupDescribe: this.machineGroupDescribe,
          administrator: this.administrator,
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        machineGroupName: this.machineGroupName,
        machineGroupDescribe: this.machineGroupDescribe,
        administrator: this.administrator,
      });
    },
    cancelModal() {

    },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|3-8': [{
        'id|+1': 1,
        'machineGroupName|+1': [
          '东莞塘厦分组',
          '香港九龙分组',
          '广州天河分组',
          '深圳南山分组',
          '佛山禅城分组',
          '珠海香洲分组',
        ],
        'machineGroupDescribe|+1': [
          '来看时代峻峰可视对讲分开了',
          'ad上岛咖啡几十块等级分类考试的借款分类进来看',
          '方法反馈反馈反馈反馈反馈',
          '勒紧裤带公交卡',
          '时空裂缝世纪东方看时间邓弗里斯觉得浪费时间浪费了',
          '速度发货反馈更好发挥454东莞的方法法国',
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
