<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addConfig">新增营销活动</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal"
      width="600px">
      <div style="">
        活动名称： <Input v-model="actionName" placeholder="请输入活动名称" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        活动方式：
        <Select v-model="actionType" placeholder="请选择活动方式" style="width: 400px;">
          <Option v-for="item in actionTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div style="margin-top: 20px;">
        推广人： <Input v-model="promoter" placeholder="请输入推广人" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        优惠码： <Input v-model="couponCode" placeholder="请输入优惠码" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        活动时间段： <Input disabled v-model="timeSlot" placeholder="请输入活动时间段" style="width: 400px;" />
      </div>
      <div style="margin-top: 20px;">
        活动开始时间：
        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择活动开始时间" style="width: 400px" v-model="startTime" />
      </div>
      <div style="margin-top: 20px;">
        活动结束时间：
        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择活动结束时间" style="width: 400px" v-model="endTime" />
      </div>
      <div style="margin-top: 20px;">
        活动状态：
        <Select v-model="actionState" placeholder="请选择活动状态" style="width: 400px;">
          <Option v-for="item in actionStateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import {
  actionTypes,
  actionStates,
  actionTypeList,
  actionStateList,
} from '@/mock/data/option-data.js'

export default {
  name: 'discount_code_statis_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '活动名称', key: 'actionName', editable: true },
        { title: '活动方式', key: 'actionType' },
        { title: '推广人', key: 'promoter' },
        { title: '优惠码', key: 'couponCode' },
        { title: '活动时间段', key: 'timeSlot' },
        { title: '活动开始时间', key: 'startTime' },
        { title: '活动结束时间', key: 'endTime' },
        { title: '创建时间', key: 'createTime' },
        { title: '最新修改时间', key: 'modifyTime' },
        { title: '活动状态', key: 'actionState' },
        { title: '修改人', key: 'modifier' },
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
                    this.title = '修改营销活动';
                    this.visible = true;
                    this.actionName = params.row.actionName;
                    this.actionType = params.row.actionType;
                    this.promoter = params.row.promoter;
                    this.couponCode = params.row.couponCode;
                    this.timeSlot = params.row.timeSlot;
                    this.startTime = new Date(params.row.startTime);
                    this.endTime = new Date(params.row.endTime);
                    this.createTime = params.row.createTime;
                    this.modifyTime = params.row.modifyTime;
                    this.actionState = params.row.actionState;
                    this.modifier = params.row.modifier;
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
      actionTypeList,
      actionStateList,
      // 新增/修改营销活动
      title: '新增营销活动',
      visible: false,
      actionName: '',
      actionType: '',
      promoter: '',
      couponCode: '',
      timeSlot: '',
      startTime: '',
      endTime: '',
      createTime: '',
      modifyTime: '',
      actionState: '',
      modifier: '',
      machineGroupIndex: -1,
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `营销活动-${(new Date()).valueOf()}.csv`
      })
    },
    addConfig() {
      this.title = '新增营销活动';
      this.visible = true;
      this.actionName = '';
      this.actionType = '';
      this.promoter = '';
      this.couponCode = '';
      this.timeSlot = '全天';
      this.startTime = '';
      this.endTime = '';
      this.createTime = '';
      this.modifyTime = '';
      this.actionState = '';
      this.modifier = '';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          actionName: this.actionName,
          actionType: this.actionType,
          promoter: this.promoter,
          couponCode: this.couponCode,
          timeSlot: this.timeSlot,
          startTime: this.startTime.toLocaleString().replace('/', '-').replace('/', '-'),
          endTime: this.endTime.toLocaleString().replace('/', '-').replace('/', '-'),
          modifyTime: this.modifyTime,
          createTime: new Date().toLocaleString().replace('/', '-').replace('/', '-'),
          actionState: this.actionState,
          modifier: this.modifier,
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        actionName: this.actionName,
        actionType: this.actionType,
        promoter: this.promoter,
        couponCode: this.couponCode,
        timeSlot: this.timeSlot,
        startTime: this.startTime.toLocaleString().replace('/', '-').replace('/', '-'),
        endTime: this.endTime.toLocaleString().replace('/', '-').replace('/', '-'),
        modifyTime: new Date().toLocaleString().replace('/', '-').replace('/', '-'),
        createTime: this.createTime,
        actionState: this.actionState,
        modifier: this.modifier ? this.modifier : Mock.mock('@cname'),
      });
    },
    cancelModal() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-15': [{
        'id|+1': 1,
        'actionName': '@cparagraph(1)',
        'actionType|1': actionTypes,
        'promoter': '@cname',
        'couponCode': '@title(1)',
        'timeSlot': '全天',
        'startTime': '@datetime()',
        'endTime': '@datetime()',
        'createTime': '@datetime()',
        'modifyTime': '@datetime()',
        'actionState|1': actionStates,
        'modifier': '@cname',
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>

</style>
