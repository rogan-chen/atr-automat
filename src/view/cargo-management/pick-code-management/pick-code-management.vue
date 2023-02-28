<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addPickCode">提货码批量生成</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <Row class="row" style="margin-top: 0;">
        <Col span="6" class="title">
        <strong>机器组名：</strong>
        </Col>
        <Col span="18">
        <Select v-model="machineGroupName" placeholder="请选择机器分组" class="form">
          <Option v-for="item in machineGroupNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      <Row class="row">
        <Col span="6" class="title">
        <strong>机器编号：</strong>
        </Col>
        <Col span="18">
        <Select v-model="machineNumber" placeholder="请选择机器编号" class="form">
          <Option v-for="item in machineNumberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </Col>
      </Row>
      <Row class="row">
        <Col span="6" class="title">
        <strong>提货码数量：</strong>
        </Col>
        <Col span="18">
        <Input v-model="pickCodeCount" placeholder="请输入提货码数量" class="form" />
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
} from '@/mock/data/option-data.js';

export default {
  name: 'commodity_type_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器组名', key: 'machineGroupName' },
        { title: '机器号', key: 'machineNumber', editable: true },
        { title: '提货码', key: 'pickCode' },
        { title: '提货码生成时间', key: 'pickCodeTime', sortable: true },
        { title: '提货码状态', key: 'pickCodeState' },
        { title: '取货时间', key: 'pickupTime' },
      ],
      machineGroupNameList,
      machineNumberList,
      tableData: [],
      // 新增/修改机器组名
      title: '提货码批量生成',
      visible: false,
      machineGroupName: '',
      machineNumber: '',
      pickCodeCount: '',
    }
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `提货码-${(new Date()).valueOf()}.csv`
      })
    },
    addPickCode() {
      this.title = '提货码批量生成';
      this.visible = true;
      this.machineGroupName = '';
      this.machineNumber = '';
      this.pickCodeCount = '';
    },
    okModal() {
      for (let index = 0; index < this.pickCodeCount; index++) {
        this.tableData.unshift({
          machineGroupName: this.machineGroupName,
          machineNumber: this.machineNumber,
          pickCode: this.getRandomStr(5),
          pickCodeTime: new Date().toLocaleString().replace('/', '-').replace('/', '-'),
          pickCodeState: '未使用',
          pickupTime: '',
        });
      }
    },
    cancelModal() {

    },
    getRandomStr(len) {
      var x = "123456789poiuytrewqasdfghjklmnbvcxzQWERTYUIPLKJHGFDSAZXCVBNM";
      var str = "";
      for (var i = 0; i < len; i++) {
        str += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
      }
      return str;
    },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|3-8': [{
        'machineGroupName|+1': machineGroupNameValues,
        'machineNumber|1': machineNumberValues,
        'pickCode|+1': '@title(1)',
        'pickCodeTime': '@datetime()',
        'pickCodeState|+1': ['已使用', '未使用'],
        'pickupTime': '@datetime()',
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
  width: 300px;
}
</style>
