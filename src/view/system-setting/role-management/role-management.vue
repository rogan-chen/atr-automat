<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addMachineGroup">新增角色</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <Row class="row" style="margin-top:0;">
        <Col span="6">
        <strong class="title">角色名称：</strong>
        </Col>
        <Col span="18">
        <Input class="form" v-model="roleName" placeholder="请输入角色名称" />
        </Col>
      </Row>
      <Row class="row">
        <Col span="6">
        <strong class="title">描述：</strong>
        </Col>
        <Col span="18">
        <Input class="form" v-model="roleDescribe" placeholder="请输入描述" type="textarea" :rows="4" />
        </Col>
      </Row>
    </Modal>
    <Modal v-model="empowerVisible" title="权限设置" :mask-closable="false" @on-ok="okModalEmpower"
      @on-cancel="cancelModalEmpower">
      <Tree :data="empowerData" show-checkbox multiple></Tree>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import { roleNames } from '@/mock/data/option-data.js'

const emptyData = [
  {
    title: '日运行监控',
    expand: false,
    children: [
      { title: '机器缺货查询' },
      { title: '状态监控' },
      { title: '当日销售监控' },
      { title: '机器温度查询' },
      { title: '补货建议' },
    ],
  },
  {
    title: '历史记录',
    expand: false,
    children: [
      { title: '非现金流水记录' },
      { title: '销售明细' },
      { title: '出货记录' },
      { title: '钱币记录' },
      { title: '报警' },
      { title: '补货记录' },
      { title: '开关门记录' },
    ],
  },
  {
    title: '系统设置',
    expand: false,
    children: [
      { title: '个人设置' },
      { title: '代理商标' },
      { title: '角色管理' },
      { title: '用户管理' },
      { title: '设置支付参数' },
      { title: '帮助管理' },
    ],
  },
  {
    title: '货机管理',
    expand: false,
    children: [
      { title: '机器组设置' },
      { title: '机器管理' },
      { title: '货道管理' },
      { title: '配置参数' },
      { title: '机器广告' },
      { title: '提货码管理' },
    ],
  },
  {
    title: '商品管理',
    expand: false,
    children: [
      { title: '商品类型' },
      { title: '厂商管理' },
      { title: '商品信息' },
    ],
  },
  {
    title: '报表统计',
    expand: false,
    children: [
      { title: '销售汇总统计' },
    ],
  },
  {
    title: '营销中心',
    expand: false,
    children: [
      { title: '营销活动管理' },
      { title: '优惠码统计' },
    ],
  },
  {
    title: '机器参数设置',
    expand: false,
  },
];

export default {
  name: 'role_management_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '角色名称', key: 'roleName', editable: true },
        { title: '描述', key: 'roleDescribe', editable: true },
        { title: '创建时间', key: 'createDate' },
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
                    this.title = '修改角色';
                    this.visible = true;
                    this.roleName = params.row.roleName;
                    this.roleDescribe = params.row.roleDescribe;
                    this.createDate = params.row.createDate;
                    this.empowerData = JSON.parse(JSON.stringify(params.row.empowerData));
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
              }, '删除'),
              h('span', {}, ' '),
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => {
                    this.empowerVisible = true;
                    this.empowerData = JSON.parse(JSON.stringify(params.row.empowerData));
                    this.empowerIndex = params.row.initRowIndex;
                  }
                },
              }, '授权'),
            ]);
          }
        }
      ],
      tableData: [],
      // 新增/修改角色
      title: '新增角色',
      visible: false,
      roleName: '',
      roleDescribe: '',
      createDate: '',
      machineGroupIndex: -1,
      // 授权
      empowerVisible: false,
      empowerData: [],
      empowerIndex: -1,
    }
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `角色-${(new Date()).valueOf()}.csv`
      })
    },
    addMachineGroup() {
      this.title = '新增角色';
      this.visible = true;
      this.roleName = '';
      this.roleDescribe = '';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          roleName: this.roleName,
          roleDescribe: this.roleDescribe,
          createDate: new Date().toLocaleString().replace('/', '-').replace('/', '-'),
          empowerData: JSON.parse(JSON.stringify(emptyData)),
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        roleName: this.roleName,
        roleDescribe: this.roleDescribe,
        createDate: this.createDate,
        empowerData: this.empowerData,
      });
    },
    cancelModal() { },
    okModalEmpower() {
      // 授权
      const selectedItem = this.tableData[this.empowerIndex];
      selectedItem.empowerData = this.empowerData;
    },
    cancelModalEmpower() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        'roleName|+1': roleNames,
        'roleDescribe': '@cparagraph(1, 3)',
        'createDate': '@datetime()',
        'empowerData': JSON.parse(JSON.stringify(emptyData)),
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
