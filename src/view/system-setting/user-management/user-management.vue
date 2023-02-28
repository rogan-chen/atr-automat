<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addMachineGroup">新增用户</Button>
    </Card>
    <Modal width="1000" v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <Row>
        <Col span="12">
        <Row class="row" style="margin-top:0;">
          <Col span="6">
          <strong class="title">
            <strong class="redDot">*</strong>
            用户名称：
          </strong>
          </Col>
          <Col span="18">
          <Input class="form" v-model="userName" placeholder="请输入用户名称" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="6">
          <strong class="title">
            <strong class="redDot">*</strong>
            所属角色：
          </strong>
          </Col>
          <Col span="18">
          <Select class="form" v-model="role" placeholder="请选择所属角色">
            <Option v-for="item in roleNameList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <Row class="row">
          <Col span="6">
          <strong class="title">
            <strong class="redDot">*</strong>
            电话号码：
          </strong>
          </Col>
          <Col span="18">
          <Input class="form" v-model="phoneNumber" placeholder="请输入电话号码" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="6">
          <strong class="title">是否启用：</strong>
          </Col>
          <Col span="18">
          <Select v-model="starUse" placeholder="请选择是否启用" class="form">
            <Option value="是" key="是">是</Option>
            <Option value="否" key="否">否</Option>
          </Select>
          </Col>
        </Row>
        <Row class="row">
          <Col span="6">
          <strong class="title">
            <strong class="redDot">*</strong>
            用户组：
          </strong>
          </Col>
          <Col span="18">
          <Select v-model="userGroup" placeholder="请选择用户组" class="form">
            <Option v-for="item in userGroupNames" :value="item" :key="item">{{ item }}</Option>
          </Select>
          </Col>
        </Row>
        </Col>
        <Col span="12">
        <Row class="row" style="margin-top: 0;">
          <Col span="6">
          <strong class="title">
            <strong class="redDot">*</strong>
            登录账号：
          </strong>
          </Col>
          <Col span="18">
          <Input v-model="account" placeholder="请输入登录账号" class="form" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="6">
          <strong class="title">
            <strong class="redDot">*</strong>
            身份证：
          </strong>
          </Col>
          <Col span="18">
          <Input v-model="idNumber" placeholder="请输入身份证" class="form" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="6">
          <strong class="title">设置密码：</strong>
          </Col>
          <Col span="18">
          <Input v-model="pwd" placeholder="请输入密码" type="password" password
            class="form" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="6">
          <strong class="title">E-Mail：</strong>
          </Col>
          <Col span="18">
          <Input v-model="email" placeholder="请输入e-mail" class="form" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="6">
          <strong class="title">籍贯：</strong>
          </Col>
          <Col span="18">
          <Input v-model="nativePlace" placeholder="请输入籍贯" class="form" />
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
  roleNames,
  roleNameList,
  userGroupNames,
} from '@/mock/data/option-data.js'

export default {
  name: 'role_management_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '用户名称', key: 'userName', editable: true },
        { title: '登录账号', key: 'account' },
        { title: '电话号码', key: 'phoneNumber', editable: true },
        { title: 'E-Mail', key: 'email', editable: true },
        { title: '微信公众号权限', key: 'authority' },
        {
          title: '操作',
          key: 'action',
          width: 230,
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
                    this.userName = params.row.userName;
                    this.role = params.row.role;
                    this.phoneNumber = params.row.phoneNumber;
                    this.starUse = params.row.starUse;
                    this.userGroup = params.row.userGroup;
                    this.account = params.row.account;
                    this.idNumber = params.row.idNumber;
                    this.email = params.row.email;
                    this.nativePlace = params.row.nativePlace;
                    this.authority = params.row.authority;
                    this.pwd = params.row.pwd;
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
                  click: () => this.$Message.info('用户未锁定，无需解锁！')
                },
              }, '解锁'),
              h('span', {}, ' '),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => this.$Message.info('密码重置成功！')
                },
              }, '密码重置'),
            ]);
          }
        }
      ],
      tableData: [],
      roleNameList,
      userGroupNames,
      // 新增/修改用户
      title: '新增用户',
      visible: false,
      userName: '',
      role: '',
      phoneNumber: '',
      starUse: '',
      userGroup: '',
      account: '',
      pwd: '',
      idNumber: '',
      email: '',
      nativePlace: '',
      authority: '',
      machineGroupIndex: -1,
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
      this.userName = '';
      this.role = '';
      this.phoneNumber = '';
      this.starUse = '';
      this.userGroup = '';
      this.account = '';
      this.pwd = '';
      this.idNumber = '';
      this.email = '';
      this.nativePlace = '';
      this.authority = '';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          userName: this.userName,
          role: this.role,
          phoneNumber: this.phoneNumber,
          starUse: this.starUse,
          userGroup: this.userGroup,
          account: this.account,
          pwd: this.pwd,
          idNumber: this.idNumber,
          email: this.email,
          nativePlace: this.nativePlace,
          authority: Math.random().toString(36).substr(2),
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        userName: this.userName,
        role: this.role,
        phoneNumber: this.phoneNumber,
        starUse: this.starUse,
        userGroup: this.userGroup,
        account: this.account,
        pwd: this.pwd,
        idNumber: this.idNumber,
        email: this.email,
        nativePlace: this.nativePlace,
        authority: this.authority,
      });
    },
    cancelModal() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|3-9': [{
        'id|+1': 1,
        'userName|+1': '@cname()',
        'role|1': roleNames,
        'phoneNumber': /^1(3|5|7|8)[0-9]{9}$/,
        'starUse|1': ['是', '否'],
        'userGroup|1': userGroupNames,
        'account': '@title(1)',
        'idNumber': /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9XxAa]$/,
        'email': '@email()',
        'nativePlace': '@province()',
        'authority': '@title(1)',
        'pwd': '000000',
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

.redDot {
  color: red;
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
