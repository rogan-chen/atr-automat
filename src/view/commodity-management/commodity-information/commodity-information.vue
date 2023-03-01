<template>
  <div>
    <Card>
      <tables ref="tables" editable searchable search-place="top" v-model="tableData" :columns="columns"
        @on-delete="handleDelete" />
      <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为excel文件</Button>
      <Button style="position:absolute; top: 27px; right: 17px;" type="primary" @click="addCommodity">新增商品</Button>
    </Card>
    <Modal v-model="topVisible" :title="isTop ? '取消置顶商品' : '置顶商品'" @on-ok="onTopOk">
      是否确认{{ isTop ? '取消置顶该商品' : '置顶该商品' }}？
    </Modal>
    <Modal v-model="visible" :title="title" @on-ok="okModal" @on-cancel="cancelModal" width="1200">
      <Row>
        <Col span="6" class="upload-img-container">
          <Upload :show-upload-list="false" action="image/upload" :before-upload="handleBeforeUpload">
            <img class="upload-img" :src="commodityImg" />
          </Upload>
        </Col>
        <Col span="9">
          <Row class="row" style="margin-top: 0;">
            <Col span="8" class="title">
              <strong style="color:red;">*</strong>
              <strong>商品编码：</strong>
            </Col>
            <Col span="16">
              <Input v-model="commodityNum" placeholder="请输入商品条形码" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="8" class="title">
            <strong style="color:red;">*</strong>
            <strong>规格：</strong>
            </Col>
            <Col span="16">
            <Input v-model="specs" placeholder="请输入规格" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="8" class="title">
            <strong style="color:red;">*</strong>
            <strong>供应商：</strong>
            </Col>
            <Col span="16">
            <Select v-model="supplier" placeholder="请选择供应商" class="form">
              <Option v-for="item in supplierList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="8" class="title">
            <strong style="color:red;">*</strong>
            <strong>商品名称：</strong>
            </Col>
            <Col span="16">
            <Input v-model="commodityName" placeholder="请输入商品名称" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="8" class="title">
            <strong style="color:red;">*</strong>
            <strong>商品类型：</strong>
            </Col>
            <Col span="16">
            <Select v-model="commodityType" placeholder="请选择商品类型" class="form">
              <Option v-for="item in commodityTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
        </Col>
        <Col span="9" class="right-form-container">
          <Row class="row" style="margin-top: 0;">
            <Col span="8" class="title">
            <strong style="color:red;">*</strong>
            <strong>单价：</strong>
            </Col>
            <Col span="16">
            <InputNumber 
              v-model="unitPrice" 
              placeholder="请输入单价" 
              class="form"
              :min="0"
              :precision="2" 
              :formatter="value => `￥${value}`"
            />
            </Col>
          </Row>
          <Row class="row">
            <Col span="8" class="title">
            <strong>进价：</strong>
            </Col>
            <Col span="16">
            <InputNumber 
              v-model="bidPrice" 
              placeholder="请输入进价" 
              class="form" 
              :min="0"
              :precision="2" 
              :formatter="value => `￥${value}`"
            />
            </Col>
          </Row>
          <Row class="row">
            <Col span="8" class="title">
            <strong>保质期：</strong>
            </Col>
            <Col span="16">
            <Input v-model="sellbyDate" placeholder="请输入保质期" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="8" class="title">
            <strong>说明：</strong>
            </Col>
            <Col span="16">
            <Input v-model="describe" placeholder="请输入说明" class="form" type="textarea" :rows="4" />
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
  commoditys,
  commodityImgs,
  commodityTypes,
  commodityTypeList,
  supplierList,
  supplierValues,
  fileToBase64Async,
} from '@/mock/data/option-data.js';

export default {
  name: 'commodity_type_page',
  components: {
    Tables
  },
  data() {
    return {
      columns: [
        { title: '商品编号', key: 'commodityNum' },
        { title: '商品名称', key: 'commodityName' },
        {
          title: '图片',
          key: 'commodityImg',
          width: 120,
          render: (h, { row }) => {
            return (
              <img
                src={row.commodityImg}
                alt='cover'
                fit='cover'
                class='commodity-img'
              />
            )
          }
        },
        { title: '单价', key: 'unitPrice' },
        { title: '进价', key: 'bidPrice' },
        { title: '供应商', key: 'supplier' },
        { title: '类型', key: 'commodityType' },
        { title: '保质期', key: 'sellbyDate', width: 150 },
        { title: '时间', key: 'date', width: 150 },
        { title: '审核结果', key: 'auditResult' },
        { title: '说明', key: 'describe' },
        {
          title: '操作',
          key: 'action',
          width: 190,
          render: (h, params) => {
            return h('div', [
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
                  type: 'info',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => {
                    this.title = '修改商品';
                    this.visible = true;
                    this.commodityImg = params.row.commodityImg;
                    this.commodityNum = params.row.commodityNum;
                    this.specs = params.row.specs;
                    this.supplier = params.row.supplier;
                    this.bidPrice = params.row.bidPrice;
                    this.commodityName = params.row.commodityName;
                    this.unitPrice = params.row.unitPrice;
                    this.commodityType = params.row.commodityType;
                    this.sellbyDate = params.row.sellbyDate;
                    this.describe = params.row.describe;
                    this.machineGroupIndex = params.row.initRowIndex;
                  }
                }
              }, '修改'),
              h('span', {}, ' '),
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small',
                  ghost: true,
                },
                on: {
                  click: () => {
                    this.topVisible = true;
                    this.isTop = params.row.isTop;
                    this.topIndex = params.row.initRowIndex;
                  }
                }
              }, params.row.isTop ? '取消置顶' : '置顶'),
            ]);
          }
        }
      ],
      tableData: [],
      supplierList,
      commodityTypeList,
      // 置顶/取消置顶
      topIndex: 0,
      isTop: false,
      topVisible: false,
      // 新增/修改商品类型
      title: '新增商品信息',
      visible: false,
      commodityImg: '',
      commodityNum: '',
      specs: '',
      supplier: '',
      bidPrice: 0,
      commodityName: '',
      unitPrice: 0,
      commodityType: '',
      sellbyDate: '',
      describe: '',
      machineGroupIndex: -1,
    }
  },
  methods: {
    handleDelete(params) {
      console.log(params)
    },
    exportExcel() {
      this.$refs.tables.exportCsv({
        filename: `商品信息-${(new Date()).valueOf()}.csv`
      })
    },
    addCommodity() {
      this.title = '新增商品';
      this.visible = true;
      this.commodityImg = 'https://img2.baidu.com/it/u=3189273452,4056187285&fm=253&fmt=auto&app=138&f=JPEG?w=516&h=500';
      this.commodityNum = '';
      this.specs = '';
      this.supplier = '';
      this.bidPrice = 0;
      this.commodityName = '';
      this.unitPrice = 0;
      this.commodityType = '';
      this.sellbyDate = '';
      this.describe = '';
      this.machineGroupIndex = -1;
    },
    // 置顶/取消置顶
    onTopOk() {
      this.tableData[this.topIndex].isTop = !this.tableData[this.topIndex].isTop;
    },
    // 上传图片
    async handleBeforeUpload(file) {
      const base64Data = await fileToBase64Async(file);
      this.commodityImg = base64Data;
      return false;
    },
    okModal() {
      // 新增
      if (this.machineGroupIndex < 0) {
        this.tableData.unshift({
          id: this.tableData.length + 1,
          commodityImg: this.commodityImg,
          commodityNum: this.commodityNum,
          specs: this.specs,
          supplier: this.supplier,
          bidPrice: this.bidPrice,
          commodityName: this.commodityName,
          unitPrice: this.unitPrice,
          commodityType: this.commodityType,
          sellbyDate: this.sellbyDate,
          describe: this.describe,
        });
        return;
      }

      // 修改
      this.tableData.splice(this.machineGroupIndex, 1, {
        id: this.tableData[this.machineGroupIndex].id,
        commodityImg: this.commodityImg,
        commodityNum: this.commodityNum,
        specs: this.specs,
        supplier: this.supplier,
        bidPrice: this.bidPrice,
        commodityName: this.commodityName,
        unitPrice: this.unitPrice,
        commodityType: this.commodityType,
        sellbyDate: this.sellbyDate,
        describe: this.describe,
      });
    },
    cancelModal() { },
  },
  mounted() {
    // mock data
    const mockData = Mock.mock({
      'list|5-12': [{
        'id|+1': 1,
        'commodityNum': /\d{8,8}/,
        'commodityName|1': commoditys,
        'commodityImg|1': commodityImgs,
        'specs|100-1000': 1,
        'unitPrice|1-20.2': 1,
        'bidPrice|1-10.2': 1,
        'supplier|1': supplierValues,
        'commodityType|1': commodityTypes,
        'sellbyDate': '@datetime()',
        'date': '@datetime()',
        'auditResult': '通过审核',
        'describe': '@ctitle()',
        'isTop': false,
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

.upload-img-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-img {
  width: 245px;
  height: 245px;
}

.right-form-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
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
