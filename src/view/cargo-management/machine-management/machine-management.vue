<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addMachineGroup">新增机器</Button>
    </Card>
    <Modal width="900" v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <Row>
        <Col span="12">
          <Row class="row" style="margin-top:0;">
            <Col span="6">
            <strong class="title">机器组名：</strong>
            </Col>
            <Col span="18">
              <Select v-model="machineGroupName" placeholder="请选择机器分组" class="form">
                <Option v-for="item in machineGroupNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">机器编号：</strong>
            </Col>
            <Col span="18">
              <Select v-model="machineNumber" placeholder="请选择机器编号" class="form">
                <Option v-for="item in machineNumberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">机器名：</strong>
            </Col>
            <Col span="18">
              <Input v-model="machineName" placeholder="请输入机器名" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">厢体ID：</strong>
            </Col>
            <Col span="18">
              <Input v-model="carbodyID" placeholder="请输入厢体ID" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">账号锁定：</strong>
            </Col>
            <Col span="18">
              <Select v-model="accountLockout" placeholder="请选择账号锁定" class="form">
                <Option v-for="item in lockList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">部署地址：</strong>
            </Col>
            <Col span="18">
              <Input v-model="deployAddress" placeholder="请输入部署地址" class="form" />
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="row" style="margin-top:0;">
            <Col span="6">
              <strong class="title">经度：</strong>
            </Col>
            <Col span="18">
              <InputNumber v-model="longitude" placeholder="请输入经度" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">纬度：</strong>
            </Col>
            <Col span="18">
              <InputNumber v-model="latitude" placeholder="请输入纬度" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">自动退款次数：</strong>
            </Col>
            <Col span="18">
              <InputNumber v-model="refund" placeholder="请输入机器出货网络异常自动退款次数" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">收款账户：</strong>
            </Col>
            <Col span="18">
              <Input v-model="collectionAccount" placeholder="请输入收款账户" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">便利店购物车：</strong>
            </Col>
            <Col span="18">
              <Select v-model="shoppingCar" placeholder="请选择便利店购物车状态" class="form">
                <Option v-for="item in switchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">是否支持预定：</strong>
            </Col>
            <Col span="18">
              <Select v-model="preorder" placeholder="请选择是否支持预定" class="form">
                <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </Col>
          </Row>
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
  switchList,
  switchValues,
  whetherList,
  whetherValues,
  lockList,
  lockValues,
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
                    this.title = '修改机器';
                    this.visible = true;
                    this.machineGroupName = params.row.machineGroupName;
                    this.machineNumber = params.row.machineNumber;
                    this.machineName = params.row.machineName;
                    this.carbodyID = params.row.carbodyID;
                    this.accountLockout = params.row.accountLockout;
                    this.deployAddress = params.row.deployAddress;
                    this.longitude = params.row.longitude;
                    this.latitude = params.row.latitude;
                    this.refund = params.row.refund;
                    this.collectionAccount = params.row.collectionAccount;
                    this.shoppingCar = params.row.shoppingCar;
                    this.preorder = params.row.preorder;
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
      switchList,
      whetherList,
      lockList,
      // 新增/修改机器
      title: '新增机器',
      visible: false,
      machineGroupName: '', // 机器组名
      machineNumber: '',  // 机器编号
      machineName: '', // 机器名
      carbodyID: '', // 厢体ID
      accountLockout: '', // 账号是否锁定
      deployAddress: '', // 部署地址
      longitude: '', // 经度
      latitude: '', // 纬度
      refund: '', // 机器出货网络异常自动退款次数
      collectionAccount: '', // 收款账户
      shoppingCar: '', // 便利店购物车
      preorder: '', // 是否支持预定
      machineGroupIndex: -1,
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
      this.machineNumber = '';
      this.machineName = '';
      this.carbodyID = '';
      this.accountLockout = '';
      this.deployAddress = '';
      this.longitude = '';
      this.latitude = '';
      this.refund = '';
      this.collectionAccount = '';
      this.shoppingCar = '';
      this.preorder = '';
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
          carbodyID: this.carbodyID,
          accountLockout: this.accountLockout,
          deployAddress: this.deployAddress,
          longitude: this.longitude,
          latitude: this.latitude,
          refund: this.refund,
          collectionAccount: this.collectionAccount,
          shoppingCar: this.shoppingCar,
          preorder: this.preorder,
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        machineGroupName: this.machineGroupName,
        machineNumber: this.machineNumber,
        machineName: this.machineName,
        carbodyID: this.carbodyID,
        accountLockout: this.accountLockout,
        deployAddress: this.deployAddress,
        longitude: this.longitude,
        latitude: this.latitude,
        refund: this.refund,
        collectionAccount: this.collectionAccount,
        shoppingCar: this.shoppingCar,
        preorder: this.preorder,
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
        'carbodyID': /\d{8,8}/,
        'accountLockout|1': lockValues,
        'deployAddress': '@city()',
        'longitude|40-42.6': 40.08605,
        'latitude|114-118.6': 116.479604,
        'refund|3-10': 5,
        'collectionAccount': /\d{15,15}/,
        'shoppingCar|1': switchValues,
        'preorder|1': whetherValues,
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
  width: 85%;
}
</style>
