<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addConfig">新增配置</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal"
      width="600px">
      <div style="text-indent: 25px;">
        机器组名：
        <Select v-model="machineGroupName" placeholder="请选择机器分组" style="width: 400px;">
          <Option v-for="item in machineGroupNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px; text-indent: 25px;">
        机器编号：
        <Select v-model="machineNumber" placeholder="请选择机器编号" style="width: 400px;">
          <Option v-for="item in machineNumberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px; text-indent: 25px;">
        整机掉货检测：
        <Select v-model="machineDetection" placeholder="请选择整机掉货检测" style="width: 400px;">
          <Option v-for="item in switchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px; text-indent: 25px;">
        硬币是否找零：
        <Select v-model="isCoinChange" placeholder="请选择硬币是否找零" style="width: 400px;">
          <Option v-for="item in switchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px; text-indent: 25px;">
        设置主柜温度： <Input v-model="setMainTemperature" placeholder="请输入设置主柜温度" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px; text-indent: 25px;">
        设置副柜温度： <Input v-model="setSubTemperature" placeholder="请输入设置副柜温度" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px; text-indent: 25px;">
        异常是否锁机：
        <Select v-model="isUnusualLock" placeholder="请选择异常是否锁机" style="width: 400px;">
          <Option v-for="item in switchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px; text-indent: 25px;">
        零钱不足的金额： <Input v-model="notEnoughMoney" placeholder="请输入零钱不足的金额" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px; text-indent: 25px;">
        最大允许接收金额： <Input v-model="maxAcceptAmount" placeholder="请输入最大允许接收金额" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px; text-indent: 25px;">
        无人操作清除金额： <Input v-model="clearAmount" placeholder="请输入无人操作清除金额" style="width: 400px;" />
      </div>
      <!-- <div style="margin-top: 20px; text-indent: 25px;">
        不买货也可以找零：
        <Select v-model="canGiveChange" placeholder="请选择不买货也可以找零" style="width: 400px;">
          <Option v-for="item in switchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div> -->
      <div style="margin-top: 20px; text-indent: 25px;">
        硬币不足禁止纸币：
        <Select v-model="isBanPaperMoney" placeholder="请选择硬币不足禁止纸币" style="width: 400px;">
          <Option v-for="item in switchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px; text-indent: 25px;">
        远程状态：
        <Select v-model="remoteState" placeholder="请选择远程状态" style="width: 400px;">
          <Option v-for="item in switchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
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
        { title: '机器编号', key: 'machineNumber', editable: true },
        { title: '远程状态', key: 'remoteState', },
        { title: '整机掉货检测', key: 'machineDetection', },
        { title: '硬币是否找零', key: 'isCoinChange', },
        { title: '设置主柜温度(°C)', key: 'setMainTemperature', },
        { title: '设置副柜温度(°C)', key: 'setSubTemperature', },
        { title: '异常是否锁机', key: 'isUnusualLock', },
        { title: '零钱不足的金额', key: 'notEnoughMoney', },
        { title: '最大允许接收金额', key: 'maxAcceptAmount' },
        { title: '无人操作清除金额', key: 'clearAmount' },
        { title: '硬币不足禁止纸币', key: 'isBanPaperMoney' },
        { title: '编辑时间', key: 'setTime', },
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
                    this.title = '修改机器组';
                    this.visible = true;
                    this.machineGroupName = params.row.machineGroupName;
                    this.machineNumber = params.row.machineNumber;
                    this.machineDetection = params.row.machineDetection;
                    this.isCoinChange = params.row.isCoinChange;
                    this.setMainTemperature = params.row.setMainTemperature;
                    this.setSubTemperature = params.row.setSubTemperature;
                    this.isUnusualLock = params.row.isUnusualLock;
                    this.notEnoughMoney = params.row.notEnoughMoney;
                    this.maxAcceptAmount = params.row.maxAcceptAmount;
                    this.clearAmount = params.row.clearAmount;
                    this.canGiveChange = params.row.machineGroupName;
                    this.isBanPaperMoney = params.row.isBanPaperMoney;
                    this.remoteState = params.row.remoteState;
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
        },
      ],
      machineGroupNameList,
      machineNumberList,
      switchList,
      tableData: [],
      // 新增/修改配置信息
      title: '新增配置参数',
      visible: false,
      machineGroupName: '', // 机器组名
      machineNumber: '', // 机器编号
      machineDetection: '', // 整机掉货检测
      isCoinChange: '', // 硬币是否找零
      setMainTemperature: '', // 设置主柜温度
      setSubTemperature: '', // 设置副柜温度
      isUnusualLock: '', // 异常是否锁机
      notEnoughMoney: '', // 零钱不足的金额
      maxAcceptAmount: '', // 最大允许接收金额
      clearAmount: '', // 无人操作清除金额
      canGiveChange: '', // 不买货也可以找零
      isBanPaperMoney: '', // 硬币不足禁止纸币
      remoteState: '', // 远程状态
    }
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `配置参数-${(new Date()).valueOf()}.csv`
      })
    },
    addConfig() {
      this.title = '新增配置参数';
      this.visible = true;
      this.machineGroupName = '';
      this.machineNumber = '';
      this.machineDetection = '';
      this.isCoinChange = '';
      this.setMainTemperature = '';
      this.setSubTemperature = '';
      this.isUnusualLock = '';
      this.notEnoughMoney = '';
      this.maxAcceptAmount = '';
      this.clearAmount = '';
      this.canGiveChange = '';
      this.isBanPaperMoney = '';
      this.remoteState = '';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          machineGroupName: this.machineGroupName,
          machineNumber: this.machineNumber,
          machineDetection: this.machineDetection,
          isCoinChange: this.isCoinChange,
          setMainTemperature: this.setMainTemperature,
          setSubTemperature: this.setSubTemperature,
          isUnusualLock: this.isUnusualLock,
          notEnoughMoney: this.notEnoughMoney,
          maxAcceptAmount: this.maxAcceptAmount,
          clearAmount: this.clearAmount,
          canGiveChange: this.canGiveChange,
          isBanPaperMoney: this.isBanPaperMoney,
          remoteState: this.remoteState,
          setTime: new Date().toLocaleString().replace('/', '-').replace('/', '-'),
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        machineGroupName: this.machineGroupName,
        machineNumber: this.machineNumber,
        machineDetection: this.machineDetection,
        isCoinChange: this.isCoinChange,
        setMainTemperature: this.setMainTemperature,
        setSubTemperature: this.setSubTemperature,
        isUnusualLock: this.isUnusualLock,
        notEnoughMoney: this.notEnoughMoney,
        maxAcceptAmount: this.maxAcceptAmount,
        clearAmount: this.clearAmount,
        canGiveChange: this.canGiveChange,
        isBanPaperMoney: this.isBanPaperMoney,
        remoteState: this.remoteState,
        setTime: new Date().toLocaleString().replace('/', '-').replace('/', '-'),
      });


    },
    cancelModal() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        'machineGroupName|+1': machineGroupNameValues,
        'machineNumber|1': machineNumberValues,
        'remoteState|1': switchValues,
        'machineDetection|1': switchValues,
        'isCoinChange|1': switchValues,
        'setMainTemperature|10-40': 10,
        'setSubTemperature|10-40': 15,
        'isUnusualLock|1': switchValues,
        'notEnoughMoney|10-100': 10,
        'maxAcceptAmount|100-500': 100,
        'clearAmount|1-50': 1,
        'isBanPaperMoney|1': switchValues,
        'setTime': '@datetime()',
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>

</style>
