<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <!-- <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addMachineGroup">新增机器</Button> -->
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
        { title: '机器编号', key: 'machineNumber', sortable: true },
        { title: '机器名', key: 'machineName', editable: true },
        { title: '厢体ID', key: 'carbodyID', sortable: true },
        { title: '账户锁定', key: 'accountLockout', sortable: true },
        { title: '部署地址', key: 'deployAddress', editable: true },
        { title: '经度', key: 'longitude' },
        { title: '纬度', key: 'latitude' },
        { title: '机器出货网络异常自动退款次数', key: 'refund', sortable: true },
        { title: '收款账户', key: 'collectionAccount' },
        { title: '便利店购物车', key: 'shoppingCar' },
        { title: '是否支持预定', key: 'preorder' },
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
                    // this.title = '修改机器组';
                    // this.visible = true;
                    // this.machineGroupName = params.row.machineGroupName;
                    // this.machineGroupDescribe = params.row.machineGroupDescribe;
                    // this.administrator = params.row.administrator;
                    // this.machineGroupIndex = params.row.initRowIndex;
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
      // 新增/修改机器组名
      title: '新增机器组',
      visible: false,
      // machineGroupName: '',
      // machineGroupDescribe: '',
      // administrator: '',
      // machineGroupIndex: -1,
    }
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `机器-${(new Date()).valueOf()}.csv`
      })
    },
    addMachineGroup() {
      this.title = '新增机器';
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
        'machineNumber': /\d{11,11}/,
        'machineName': '@title(1)',
        'carbodyID': /\d{8,8}/,
        'accountLockout|1': ['未锁定', '已锁定'],
        'deployAddress': '@city()',
        'longitude|40-42.6': 40.08605,
        'latitude|114-118.6': 116.479604,
        'refund|3-10': 5,
        'collectionAccount': /\d{15,15}/,
        'shoppingCar|1': ['关闭', '开启'],
        'preorder|1': ['否', '是'], 
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>

</style>
