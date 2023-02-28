<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addMachineGroup">新增广告</Button>
    </Card>
    <Modal width="900" v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <div class="content-container">
        <Upload :show-upload-list="false" action="//jsonplaceholder.typicode.com/posts/"
          :format="['jpg', 'jpeg', 'png', 'jfif']" :on-format-error="handleFormatError" :before-upload="beforeUpload">
          <img class="upload-img" :src="image" />
        </Upload>
        <div>
          <Row class="row" style="margin-top: 0;">
            <Col span="10" class="title">
            <strong>机器编号：</strong>
            </Col>
            <Col span="14">
            <Select v-model="machineNum" placeholder="请选择机器编号" class="form">
              <Option v-for="item in machineNumberList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="10" class="title">
            <strong>广告类型：</strong>
            </Col>
            <Col span="14">
            <Select v-model="advertType" placeholder="请选择广告类型" class="form">
              <Option v-for="item in advertTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="10" class="title">
            <strong>开始时间：</strong>
            </Col>
            <Col span="14">
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择开始时间" class="form" v-model="startTime" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="10" class="title">
            <strong>结束时间：</strong>
            </Col>
            <Col span="14">
            <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择结束时间" class="form" v-model="endTime" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="10" class="title">
            <strong>状态：</strong>
            </Col>
            <Col span="14">
            <Select v-model="state" placeholder="请选择状态" class="form">
              <Option v-for="item in switchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="10" class="title">
            <strong>备注：</strong>
            </Col>
            <Col span="14">
            <Input v-model="remark" placeholder="请输入备注" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="10" class="title">
            <strong>手机号：</strong>
            </Col>
            <Col span="14">
            <Input v-model="phoneNumber" placeholder="请输入手机号" class="form" />
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Mock from 'mockjs'
import Tables from '_c/tables'
import {
  adviceImgs,
  fileToBase64Async,
  machineNumberList,
  machineNumberValues,
  advertTypeValues,
  advertTypeList,
  switchList,
  switchValues,
} from '@/mock/data/option-data.js'

export default {
  name: 'discount_code_statis_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '机器编号', key: 'machineNum', sortable: true },
        {
          title: '图片',
          key: 'image',
          width: 120,
          render: (h, { row }) => {
            return (
              <img
                src={row.image}
                alt='cover'
                fit='cover'
                class='commodity-img'
              />
            )
          }
        },
        { title: '广告类型', key: 'advertType' },
        { title: '开始时间', key: 'startTime' },
        { title: '结束时间', key: 'endTime' },
        { title: '状态', key: 'state' },
        { title: '备注', key: 'remark' },
        { title: '手机号', key: 'phoneNumber' },
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
                    this.title = '修改广告';
                    this.visible = true;
                    this.machineNum = params.row.machineNum;
                    this.image = params.row.image;
                    this.advertType = params.row.advertType;
                    this.startTime = new Date(params.row.startTime);
                    this.endTime = new Date(params.row.endTime);
                    this.state = params.row.state;
                    this.remark = params.row.remark;
                    this.phoneNumber = params.row.phoneNumber;
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
      machineNumberList,
      advertTypeList,
      switchList,
      // 新增/修改 广告
      title: '新增广告',
      visible: false,
      machineNum: '',
      image: '',
      advertType: '',
      startTime: '',
      endTime: '',
      state: '',
      remark: '',
      phoneNumber: '',
      machineGroupIndex: -1,
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `机器广告-${(new Date()).valueOf()}.csv`
      })
    },

    // 上传文件格式出错
    handleFormatError() {
      this.$Notice.warning({
        title: '文件格式出错',
        desc: '请选择图片格式的文件。'
      });
    },

    // 上传图片
    async beforeUpload(file) {
      const base64Data = await fileToBase64Async(file);
      this.image = base64Data;
      return false;
    },

    addMachineGroup() {
      this.title = '新增机器';
      this.visible = true;
      this.machineNum = '';
      this.image = 'https://img2.baidu.com/it/u=3189273452,4056187285&fm=253&fmt=auto&app=138&f=JPEG?w=516&h=500';
      this.advertType = '';
      this.startTime = '';
      this.endTime = '';
      this.state = '';
      this.remark = '';
      this.phoneNumber = '';
      this.machineGroupIndex = -1;
    },

    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          machineNum: this.machineNum,
          image: this.image,
          advertType: this.advertType,
          startTime: this.startTime.toLocaleString().replace('/', '-').replace('/', '-'),
          endTime: this.endTime.toLocaleString().replace('/', '-').replace('/', '-'),
          state: this.state,
          remark: this.remark,
          phoneNumber: this.phoneNumber,
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        machineNum: this.machineNum,
        image: this.image,
        advertType: this.advertType,
        startTime: this.startTime.toLocaleString().replace('/', '-').replace('/', '-'),
        endTime: this.endTime.toLocaleString().replace('/', '-').replace('/', '-'),
        state: this.state,
        remark: this.remark,
        phoneNumber: this.phoneNumber,
      });
    },
    cancelModal() {

    },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-20': [{
        'id|+1': 1,
        'machineNum|1': machineNumberValues,
        'image|1': adviceImgs,
        'advertType|1': advertTypeValues,
        'startTime': '@datetime()',
        'endTime': '@datetime()',
        'state|1': switchValues,
        'remark': '@title()',
        'phoneNumber': /^1(3|5|7|8)[0-9]{9}$/,
      }],
    });

    this.tableData = mockData.list;
  }
}
</script>

<style>
.commodity-img {
  width: 80px;
  height: 80px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.content-container {
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.upload-img {
  width: 245px;
  height: 245px;
}

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
