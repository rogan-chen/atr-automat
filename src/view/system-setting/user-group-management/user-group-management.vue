<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addMachineGroup">新增用户组</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <div>
        用户组名称：<Input v-model="userGroupName" placeholder="请输入用户组名称" style="width: 400px" />
      </div>
      <div style="margin-top: 20px;">
        描述： <Input v-model="describe" placeholder="请输入描述" type="textarea" :rows="4"
          style="width: 400px; text-indent: 32px;" />
      </div>
      <div style="margin-top: 20px;">
        微信公众号权限： 
        <CheckboxGroup v-model="authority">
          <Checkbox label="今日收益报表"></Checkbox>
          <Checkbox label="日运行管理"></Checkbox>
          <Checkbox label="销售报表"></Checkbox>
          <Checkbox label="移动支付报表"></Checkbox>
          <Checkbox label="手动退款"></Checkbox>
          <Checkbox label="K12校园统计"></Checkbox>
          <Checkbox label="异常警告"></Checkbox>
          <Checkbox label="网络监控"></Checkbox>
          <Checkbox label="建议补货"></Checkbox>
          <Checkbox label="机器组管理"></Checkbox>
          <Checkbox label="货机管理"></Checkbox>
          <Checkbox label="商品管理"></Checkbox>
          <Checkbox label="上货管理"></Checkbox>
          <Checkbox label="流量卡充值"></Checkbox>
        </CheckboxGroup>
      </div>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import { userGroupNames } from '@/mock/data/option-data.js'

export default {
  name: 'role_management_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '用户组名称', key: 'userGroupName' },
        { title: '描述', key: 'describe', editable: true },
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
                    this.title = '修改用户组';
                    this.visible = true;
                    this.userGroupName = params.row.userGroupName;
                    this.describe = params.row.describe;
                    this.createDate = params.row.createDate;
                    this.authority = JSON.parse(JSON.stringify(params.row.authority));
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
            ]);
          }
        }
      ],
      tableData: [],
      // 新增/修改 用户组
      title: '新增用户组',
      visible: false,
      userGroupName: '',
      describe: '',
      createDate: '',
      authority: [],
      machineGroupIndex: -1,
    }
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `用户组-${(new Date()).valueOf()}.csv`
      })
    },
    addMachineGroup() {
      this.title = '新增用户组';
      this.visible = true;
      this.userGroupName = '';
      this.describe = '';
      this.authority = [];
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          userGroupName: this.userGroupName,
          describe: this.describe,
          createDate: new Date().toLocaleString().replace('/', '-').replace('/', '-'),
          authority: this.authority,
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        userGroupName: this.userGroupName,
        describe: this.describe,
        createDate: this.createDate,
        authority: this.authority,
      });
    },
    cancelModal() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-10': [{
        'id|+1': 1,
        'userGroupName|+1': userGroupNames,
        'describe': '@cparagraph(1, 3)',
        'createDate': '@datetime()',
        'authority': [],
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>

</style>
