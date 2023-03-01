<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addCommodityType">新增厂商</Button>
    </Card>
    <Modal width="900" v-model="visible" :title="title" :mask-closable="false" @on-ok="okModal" @on-cancel="cancelModal">
      <Row>
        <Col span="12">
          <Row class="row" style="margin-top:0;">
            <Col span="6">
              <strong class="title">厂商编号：</strong>
            </Col>
            <Col span="18">
              <Input v-model="number" placeholder="请输入厂商编号" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">厂商名称：</strong>
            </Col>
            <Col span="18">
              <Input v-model="name" placeholder="请输入厂商名称" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">合同编号：</strong>
            </Col>
            <Col span="18">
              <Input v-model="contractNumber" placeholder="请输入合同编号" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">税号编号：</strong>
            </Col>
            <Col span="18">
              <Input v-model="dutyNumber" placeholder="请输入税号编号" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">邮政编码：</strong>
            </Col>
            <Col span="18">
              <Input v-model="postalCode" placeholder="请输入邮政编码" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">注册地址：</strong>
            </Col>
            <Col span="18">
              <Input v-model="registeAddress" placeholder="请输入注册地址" class="form" />
            </Col>
          </Row>
        </Col>
        <Col span="12">
          <Row class="row" style="margin-top: 0;">
            <Col span="6">
              <strong class="title">联系人：</strong>
            </Col>
            <Col span="18">
              <Input v-model="contact" placeholder="请输入联系人" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">Email：</strong>
            </Col>
            <Col span="18">
              <Input v-model="email" placeholder="请输入email" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">联系电话：</strong>
            </Col>
            <Col span="18">
              <Input v-model="contactNumber" placeholder="请输入联系电话" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">营业地址：</strong>
            </Col>
            <Col span="18">
              <Input v-model="businessAddress" placeholder="请输入营业地址" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="6">
              <strong class="title">营业电话：</strong>
            </Col>
            <Col span="18">
              <Input v-model="telephoneNumber" placeholder="请输入营业电话" class="form" />
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

export default {
  name: 'commodity_type_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '编号', key: 'number', sortable: true },
        { title: '厂商名称', key: 'name', editable: true },
        { title: '地址', key: 'businessAddress', editable: true },
        { title: '电话号码', key: 'contactNumber', editable: true },
        { title: '联系人', key: 'contact', editable: true },
        // { title: '传真', key: 'fax', editable: true },
        { title: 'Email', key: 'email', editable: true },
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
                    this.title = '修改厂商';
                    this.visible = true;
                    this.number = params.row.number;
                    this.name = params.row.name;
                    this.contractNumber = params.row.contractNumber;
                    this.dutyNumber = params.row.dutyNumber;
                    this.postalCode = params.row.postalCode;
                    this.telephoneNumber = params.row.telephoneNumber;
                    this.contact = params.row.contact;
                    this.email = params.row.email;
                    this.contactNumber = params.row.contactNumber;
                    this.businessAddress = params.row.businessAddress;
                    this.registeAddress = params.row.registeAddress;
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
      // 新增/修改厂商
      title: '新增厂商',
      visible: false,
      number: '', // 厂商编号
      name: '', // 厂商名称
      contractNumber: '',  // 合同编号
      dutyNumber: '',  // 税号编号
      postalCode: '', // 邮政编码
      telephoneNumber: '', // 营业电话
      contact: '', // 联系人
      email: '',  // 电子邮箱
      contactNumber: '', // 联系电话
      businessAddress: '', // 营业地址
      registeAddress: '', // 注册地址
      machineGroupIndex: -1,
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `厂商-${(new Date()).valueOf()}.csv`
      })
    },
    addCommodityType() {
      this.visible = true;
      this.number = '';
      this.name = '';
      this.contractNumber = '';
      this.dutyNumber = '';
      this.postalCode = '';
      this.telephoneNumber = '';
      this.contact = '';
      this.email = '';
      this.contactNumber = '';
      this.businessAddress = '';
      this.registeAddress = '';
      this.machineGroupIndex = -1;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          number: this.number,
          name: this.name,
          contractNumber: this.contractNumber,
          dutyNumber: this.dutyNumber,
          postalCode: this.postalCode,
          telephoneNumber: this.telephoneNumber,
          contact: this.contact,
          email: this.email,
          contactNumber: this.contactNumber,
          businessAddress: this.businessAddress,
          registeAddress: this.registeAddress,
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        number: this.number,
        name: this.name,
        contractNumber: this.contractNumber,
        dutyNumber: this.dutyNumber,
        postalCode: this.postalCode,
        telephoneNumber: this.telephoneNumber,
        contact: this.contact,
        email: this.email,
        contactNumber: this.contactNumber,
        businessAddress: this.businessAddress,
        registeAddress: this.registeAddress,
      });
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
      'list|8-15': [{
        'id|+1': 1,
        'number': /\d{12,12}/,
        'name|+1': [
          '自采商品',
          '中吉公司',
          '可口可乐公司',
          '康师傅控股有限公司',
          '广州统一企业有限公司',
          '元气森林股份有限公司',
        ],
        'contactNumber': /^1(3|5|7|8)[0-9]{9}$/,
        'contact': '@cname()',
        'fax': '',
        'email': '@email()',
        'contractNumber': this.getRandomStr(16),
        'dutyNumber': this.getRandomStr(15),
        'postalCode': '@zip()',
        'telephoneNumber': /^1(3|5|7|8)[0-9]{9}$/,
        'businessAddress': '@city(true)',
        'registeAddress': '@city(true)',
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
