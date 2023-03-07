<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addMachineGroup">新增机器组</Button>
    </Card>
    <Modal v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <Row class="row" style="margin-top:0;">
        <Col span="6">
        <strong class="title">用户名称：</strong>
        </Col>
        <Col span="18">
        <Input v-model="machineGroupName" placeholder="请输入机器组名" class="form" />
        </Col>
      </Row>
      <Row class="row">
        <Col span="6">
        <strong class="title">管理员：</strong>
        </Col>
        <Col span="18">
        <Input v-model="administrator" placeholder="请输入管理员" class="form" />
        </Col>
      </Row>
      <Row class="row">
        <Col span="6">
        <strong class="title">描述：</strong>
        </Col>
        <Col span="18">
        <Input v-model="machineGroupDescribe" placeholder="请输入描述" type="textarea" :rows="4" class="form" />
        </Col>
      </Row>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import { machineGroupNameValues } from '@/mock/data/option-data.js';

export default {
  name: 'commodity_type_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器组名', key: 'machineGroupName' },
        { title: '描述', key: 'machineGroupDescribe' },
        { title: '管理员', key: 'administrator', editable: true },
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
                    this.machineGroupDescribe = params.row.machineGroupDescribe;
                    this.administrator = params.row.administrator;
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
      // 新增/修改机器组名
      title: '新增机器组',
      visible: false,
      machineGroupName: '',
      machineGroupDescribe: '',
      administrator: '',
      machineGroupIndex: -1,
    }
  },
  methods: {
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `机器组-${(new Date()).valueOf()}.csv`
      })
    },
    addMachineGroup() {
      this.title = '新增机器组';
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
        'machineGroupName|+1': machineGroupNameValues,
        'machineGroupDescribe': '@cparagraph(1, 2)',
        'administrator': '@cname()',
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style scoped>
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
