<template>
  <Card>
    <div class="content-container">
      <Upload :show-upload-list="false" action="//jsonplaceholder.typicode.com/posts/" :format="['jpg', 'jpeg', 'png', 'jfif']"
        :on-format-error="handleFormatError" :before-upload="beforeUpload">
        <img class="upload-img" :src="coverImg" />
      </Upload>
      <div>
        <Row class="row">
          <Col span="12" class="title">
          <strong>省直辖市：</strong>
          </Col>
          <Col span="12">
          <Select v-model="province" placeholder="请选择" class="form" @on-select="onProvince">
            <Option v-for="item in provinceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <Row class="row">
          <Col span="12" class="title">
          <strong>城市：</strong>
          </Col>
          <Col span="12">
          <Select v-model="city" placeholder="请选择" class="form">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <Row class="row">
          <Col span="12" class="title">
          <strong>地址：</strong>
          </Col>
          <Col span="12">
          <Input v-model="address" placeholder="请输入详细地址" class="form" />
          </Col>
        </Row>
        <Row class="row">
          <Col span="12" class="title">
          <strong>微信通知总开关：</strong>
          </Col>
          <Col span="12">
          <Select v-model="wechatNotice" placeholder="请选择" class="form">
            <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <div v-show="wechatNotice === '是'">
          <Row class="row">
            <Col span="12" class="title">
            <strong>出货通知：</strong>
            </Col>
            <Col span="12">
            <Select v-model="shipNotice" placeholder="请选择" class="form">
              <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>温度预警通知：</strong>
            </Col>
            <Col span="12">
            <Select v-model="temperatureNotice" placeholder="请选择" class="form">
              <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>机器故障通知：</strong>
            </Col>
            <Col span="12">
            <Select v-model="hitchNotice" placeholder="请选择" class="form">
              <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>库存预警通知：</strong>
            </Col>
            <Col span="12">
            <Select v-model="stockNotice" placeholder="请选择" class="form">
              <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>机器离线通知：</strong>
            </Col>
            <Col span="12">
            <Select v-model="offlineNotice" placeholder="请选择" class="form">
              <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div class="band">
      <Button class="bandBtn" type="primary" @click="onSave">保存</Button>
    </div>
  </Card>
</template>

<script>
import {
  whetherList,
} from '@/mock/data/option-data.js'
import provinceCityData from './provinceCityData'

export default {
  name: 'personal-setting-page',
  data() {
    return {
      // 上传的图片
      coverImg: 'https://img2.baidu.com/it/u=2591611833,3173732768&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
      // 省直辖市
      provinceList: [],
      province: '广东省',
      // 市
      cityList: [],
      city: '东莞市',
      // 地址
      address: '塘厦镇平山先锋路50号港芝公司',
      // 微信通知总开关
      wechatNotice: '是',
      // 出货通知
      shipNotice: '是',
      // 温度预警通知
      temperatureNotice: '是',
      // 机器故障通知
      hitchNotice: '是',
      // 库存预警通知
      stockNotice: '是',
      // 机器离线通知
      offlineNotice: '是',

      whetherList,
    };
  },
  methods: {
    // file 转 base64
    fileToBase64Async(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          resolve(e.target.result);
        };
      });
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
      const base64Data = await this.fileToBase64Async(file);
      this.coverImg = base64Data;
      return false;
    },

    // 选择省份
    onProvince(value) {
      this.province = value;
      this.cityList = provinceCityData.filter(item => item.provinceName === this.province)[0].citys.map(item => ({
        value: item.cityName,
        label: item.cityName,
      }));
      this.city = this.cityList[0].value;
    },

    // 保存
    onSave() {
      if (this.address.length === 0) {
        this.$Message.error('地址不能为空');
        return;
      }

      this.$Message.info('保存成功！');
    },
  },
  mounted() {
    this.provinceList = provinceCityData.map(item => ({
      value: item.provinceName,
      label: item.provinceName,
    }));
    this.cityList = provinceCityData.filter(item => item.provinceName === this.province)[0].citys.map(item => ({
      value: item.cityName,
      label: item.cityName,
    }));
  },
}
</script>

<style>
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

.band {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
}

.bandBtn {
  margin-top: 10px;
  width: 100px;
}
</style>