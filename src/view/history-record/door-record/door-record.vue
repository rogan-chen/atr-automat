<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addMachineGroup">新增记录</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <Row class="row" style="margin-top:0;">
        <Col span="8">
        <strong class="title">机器分组：</strong>
        </Col>
        <Col span="16">
        <Select class="form" v-model="machineGroupName" placeholder="请选择机器分组">
          <Option v-for="item in machineGroupNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      <Row class="row">
        <Col span="8">
        <strong class="title">机器编号：</strong>
        </Col>
        <Col span="16">
        <Select class="form" v-model="machineNumber" placeholder="请选择机器编号">
          <Option v-for="item in machineNumberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      <Row class="row">
        <Col span="8">
        <strong class="title">机器名： </strong>
        </Col>
        <Col span="16">
        <Input class="form" v-model="machineName" placeholder="请输入机器名" />
        </Col>
      </Row>
      <Row class="row">
        <Col span="8">
        <strong class="title">部署地址： </strong>
        </Col>
        <Col span="16">
        <Input class="form" v-model="deployAddress" placeholder="请输入部署地址" />
        </Col>
      </Row>
      <Row class="row">
        <Col span="8">
        <strong class="title">操作类型： </strong>
        </Col>
        <Col span="16">
        <Select class="form" v-model="handleType" placeholder="请选择操作类型">
          <Option v-for="item in doorList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import {
  machineGroupNameList,
  machineGroupNameValues,
  machineNumberList,
  machineNumberValues,
  doorList,
  doorValues,
} from '@/mock/data/option-data.js';

export default {
  name: 'door_record_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器组名', key: 'machineGroupName' },
        { title: '机器编号', key: 'machineNumber', sortable: true },
        { title: '机器名', key: 'machineName', editable: true },
        { title: '部署地址', key: 'deployAddress', editable: true },
        { title: '操作类型', key: 'handleType' },
        { title: '操作时间', key: 'handleTime' },
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
                    this.title = '修改记录';
                    this.visible = true;
                    this.machineGroupName = params.row.machineGroupName;
                    this.machineNumber = params.row.machineNumber;
                    this.machineName = params.row.machineName;
                    this.deployAddress = params.row.deployAddress;
                    this.handleType = params.row.handleType;
                    this.handleTime = params.row.handleTime;
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
      machineGroupNameList,
      machineNumberList,
      doorList,
      // 新增/修改机器
      title: '新增机器',
      visible: false,
      machineGroupName: '', // 机器组名
      machineNumber: '',  // 机器编号
      machineName: '', // 机器名
      deployAddress: '', // 部署地址
      handleType: '', // 操作类型
      handleTime: '', // 操作时间
      machineGroupIndex: -1,
    }
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `开关门记录-${(new Date()).valueOf()}.csv`
      })
    },
    addMachineGroup() {
      this.title = '新增记录';
      this.visible = true;
      this.machineGroupName = '';
      this.machineNumber = '';
      this.machineName = '';
      this.deployAddress = '';
      this.handleType = '';
      this.handleTime = '';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          machineGroupName: this.machineGroupName,
          machineNumber: this.machineNumber,
          machineName: this.machineName,
          deployAddress: this.deployAddress,
          handleType: this.handleType,
          handleTime: new Date().toLocaleString().replace('/', '-').replace('/', '-'),
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        machineGroupName: this.machineGroupName,
        machineNumber: this.machineNumber,
        machineName: this.machineName,
        deployAddress: this.deployAddress,
        handleType: this.handleType,
        handleTime: new Date().toLocaleString().replace('/', '-').replace('/', '-'),
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
        'machineGroupName|+1': machineGroupNameValues,
        'machineNumber|1': machineNumberValues,
        'machineName': '@title(1)',
        'deployAddress': '@city()',
        'handleType|1': doorValues,
        'handleTime': '@datetime()',
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
  width: 80%;
}
</style>
