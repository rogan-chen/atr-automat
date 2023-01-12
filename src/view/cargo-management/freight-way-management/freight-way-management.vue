<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addData">新增货道</Button>
      <Button style="position:absolute; top: 27px; right: 110px;" type="primary" @click="removeAllData">清空货道</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <div>
        货道号： <Input disabled v-model="freightWay" placeholder="请输入货道号" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;text-indent: 12px;">
        机器组名：
        <Select v-model="machineGroupName" placeholder="请选择机器分组" style="width: 400px;">
          <Option v-for="item in machineGroupNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px; text-indent: 12px;">
        机器编号：
        <Select v-model="machineNumber" placeholder="请选择机器编号" style="width: 400px;">
          <Option v-for="item in machineNumberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px;">
        机器名： <Input v-model="machineName" placeholder="请输入机器名" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        厢体ID： <Input v-model="carbodyID" placeholder="请输入厢体ID" style="width: 400px;" />
      </div>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'

export default {
  name: 'freight-way-management',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '货道号', key: 'freightWay', sortable: true },
        { title: '机器组名', key: 'machineGroupName' },
        { title: '机器编号', key: 'machineNumber', sortable: true },
        { title: '机器名', key: 'machineName', editable: true },
        { title: '厢体ID', key: 'carbodyID', sortable: true },
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
                on: {
                  click: () => {
                    this.title = '修改货道';
                    this.visible = true;
                    this.freightWay = params.row.freightWay;
                    this.machineGroupName = params.row.machineGroupName;
                    this.machineNumber = params.row.machineNumber;
                    this.machineName = params.row.machineName;
                    this.carbodyID = params.row.carbodyID;
                    this.machineGroupIndex = params.row.initRowIndex;
                  }
                },
              }, '修改'),
              h('span', {}, ' '),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => {
                    this.tableData.unshift({
                      id: this.tableData.length + 1,
                      freightWay: this.tableData.length + 1,
                      machineGroupName: params.row.machineGroupName,
                      machineNumber: params.row.machineNumber,
                      machineName: params.row.machineName,
                      carbodyID: params.row.carbodyID,
                    });
                  }
                },
              }, '克隆'),
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
              }, '删除'),
            ]);
          }
        }
      ],
      tableData: [],
      machineGroupNameList: [
        { value: '东莞塘厦分组', label: '东莞塘厦分组' },
        { value: '香港九龙分组', label: '香港九龙分组' },
        { value: '广州天河分组', label: '广州天河分组' },
        { value: '深圳南山分组', label: '深圳南山分组' },
        { value: '佛山禅城分组', label: '佛山禅城分组' },
        { value: '珠海香洲分组', label: '珠海香洲分组' },
      ],
      machineNumberList: [
        { value: '87213214435', label: '87213214435' },
        { value: '34524352231', label: '34524352231' },
        { value: '12334551224', label: '12334551224' },
        { value: '96325120122', label: '96325120122' },
        { value: '45630046272', label: '45630046272' },
      ],
      // 新增/修改机器
      title: '新增机器',
      visible: false,
      freightWay: '', // 货道号
      machineGroupName: '', // 机器组名
      machineNumber: '',  // 机器编号
      machineName: '', // 机器名
      carbodyID: '', // 厢体ID
      machineGroupIndex: -1,
    }
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `货道-${(new Date()).valueOf()}.csv`
      })
    },
    addData() {
      this.title = '新增货道';
      this.visible = true;
      this.machineGroupName = '';
      this.machineNumber = '';
      this.machineName = '';
      this.carbodyID = '';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          freightWay: this.tableData.length + 1,
          machineGroupName: this.machineGroupName,
          machineNumber: this.machineNumber,
          machineName: this.machineName,
          carbodyID: this.carbodyID,
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        freightWay: this.freightWay,
        machineGroupName: this.machineGroupName,
        machineNumber: this.machineNumber,
        machineName: this.machineName,
        carbodyID: this.carbodyID,
      });
    },
    cancelModal() {

    },
    // 删除全部数据
    removeAllData() {
      this.tableData = [];
    },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        'freightWay|+1': 1,
        'machineGroupName|+1': [
          '东莞塘厦分组',
          '香港九龙分组',
          '广州天河分组',
          '深圳南山分组',
          '佛山禅城分组',
          '珠海香洲分组',
        ],
        'machineNumber|1': [
          '87213214435',
          '34524352231',
          '12334551224',
          '96325120122',
          '45630046272',
        ],
        'machineName': '@title(1)',
        'carbodyID': /\d{8,8}/,
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>

</style>
