<template>
  <Tabs>
    <TabPane label="微信参数设置" name="微信参数设置">
      <Card>
        <template #title>
          <strong>微信参数设置</strong>
        </template>
        <Row class="row">
          <Col span="12" class="title">
          <strong>是否启用微信支付：</strong>
          </Col>
          <Col span="12">
          <Select v-model="wechatParams.enable" placeholder="请选择是否启用微信支付" class="form">
            <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button class="disableBtn" type="primary" @click="onWechatDisable">{{ wechatParams.disable ? '启用' : '禁用'
          }}</Button>
          </Col>
        </Row>
        <div v-show="wechatParams.enable === '是'">
          <Row class="row">
            <Col span="12" class="title">
            <strong>微信绑定模式：</strong>
            </Col>
            <Col span="12">
            <Select v-model="wechatParams.bindModel" placeholder="请选择微信绑定模式" class="form">
              <Option :value="wechatParams.bindModel" :key="wechatParams.bindModel">{{ wechatParams.bindModel }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>微信折扣：</strong>
            </Col>
            <Col span="12">
            <Tooltip content="默认100不打折" placement="right-start">
              <InputNumber class="form" :max="100" :min="1" v-model="wechatParams.discount"
                :formatter="value => `${value}%`" />
            </Tooltip>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>微信商户号：</strong>
            </Col>
            <Col span="12">
            <Tooltip content="请填写小微商户号" placement="right-start">
              <Input v-model="wechatParams.merchantID" placeholder="请输入微信商户号" class="form" />
            </Tooltip>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>姓名：</strong>
            </Col>
            <Col span="12">
            <Input v-model="wechatParams.name" placeholder="请输入姓名" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>银行账户：</strong>
            </Col>
            <Col span="12">
            <Input v-model="wechatParams.bankAccount" placeholder="请输入银行账户" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>客服电话：</strong>
            </Col>
            <Col span="12">
            <Input v-model="wechatParams.servicePhone" placeholder="请输入客服电话" class="form" />
            </Col>
          </Row>
        </div>
        <div class="band">
          <strong class="bandTitle">微信个人收款,收取6‰手续费。请慎重填写并认真核对，提交后不支持修改！</strong>
          <Button :disabled="wechatParams.disable" class="bandBtn" type="primary" @click="onWechatBind">绑定</Button>
        </div>
      </Card>
    </TabPane>
    <TabPane label="支付宝参数设置" name="支付宝参数设置">
      <Card>
        <template #title>
          <strong>支付宝参数设置</strong>
        </template>
        <Row class="row">
          <Col span="12" class="title">
          <strong>是否启用支付宝：</strong>
          </Col>
          <Col span="12">
          <Select v-model="alipayParams.enable" placeholder="请选择是否启用支付宝" class="form">
            <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <div v-show="alipayParams.enable === '是'">
          <Row class="row">
            <Col span="12" class="title">
            <strong>支付宝绑定模式：</strong>
            </Col>
            <Col span="12">
            <Select v-model="alipayParams.bindModel" placeholder="请选择支付宝绑定模式" class="form">
              <Option :value="alipayParams.bindModel" :key="alipayParams.bindModel">{{ alipayParams.bindModel }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>支付宝折扣：</strong>
            </Col>
            <Col span="12">
            <Tooltip content="默认100不打折" placement="right-start">
              <InputNumber class="form" :max="100" :min="1" v-model="alipayParams.discount"
                :formatter="value => `${value}%`" />
            </Tooltip>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>支付宝参数设置：</strong>
            </Col>
            <Col span="12">
            <Button type="primary" @click="onAlipayScan">点击此处扫码设置支付宝参数</Button>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>支付宝账户名称：</strong>
            </Col>
            <Col span="12">
            <Input v-model="alipayParams.accountName" placeholder="请输入支付宝账户名称" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>支付宝商户号：</strong>
            </Col>
            <Col span="12">
            <Input v-model="alipayParams.merchantID" placeholder="请输入支付宝商户号" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>支付宝账户：</strong>
            </Col>
            <Col span="12">
            <Input v-model="alipayParams.account" placeholder="请输入支付宝账户" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>客服电话：</strong>
            </Col>
            <Col span="12">
            <Input v-model="alipayParams.servicePhone" placeholder="请输入客服电话" class="form" />
            </Col>
          </Row>
        </div>
        <div class="band">
          <strong class="bandTitle">直付通收款，收取6‰手续费，请慎重填写并认真核对，提交后不支持修改!</strong>
          <Button class="bandBtn" type="primary" @click="onAlipayBind">绑定</Button>
        </div>
      </Card>
      <Modal mask :closable="false" cancel-text=" " ok-text="扫描完成" v-model="alipayParams.visible" title="扫码设置支付宝参数">
        <p class="bandTitle">链接地址：http://www.tcnvmms.com/zftjoin/zftbind?sstid=59820</p>
        <img class="qrcode-img" src="https://www.liantu.com/images/2013/liantu.png">
        <p class="bandTitle">用申请成功的支付宝账号扫描上方二维码，扫描完成后再点击页面下方“绑定”按钮完成操作！</p>
      </Modal>
    </TabPane>
    <TabPane label="刷脸参数设置" name="刷脸参数设置">
      <Card>
        <template #title>
          <strong>刷脸参数设置</strong>
        </template>
        <Row class="row">
          <Col span="12" class="title">
          <strong>是否启用支付宝刷脸参数配置：</strong>
          </Col>
          <Col span="12">
          <Select v-model="faceSwipParams.enable" placeholder="请选择是否启用支付宝刷脸参数配置" class="form">
            <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <div v-show="faceSwipParams.enable === '是'">
          <Row class="row">
            <Col span="12" class="title">
            <strong>刷脸模式：</strong>
            </Col>
            <Col span="12">
            <Select v-model="faceSwipParams.swipModel" placeholder="请选择刷脸模式" class="form">
              <Option :value="faceSwipParams.swipModel" :key="faceSwipParams.swipModel">{{ faceSwipParams.swipModel }}
              </Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>Pid：</strong>
            </Col>
            <Col span="12">
            <Input v-model="faceSwipParams.pid" placeholder="请输入Pid" class="form" />
            </Col>
          </Row>
        </div>
        <div class="band">
          <Button class="bandBtn" type="primary" @click="onFaceSwipSave">保存</Button>
        </div>
      </Card>
    </TabPane>
    <TabPane label="京东参数设置" name="京东参数设置">
      <Card>
        <template #title>
          <strong>京东参数设置</strong>
        </template>
        <Row class="row">
          <Col span="12" class="title">
          <strong>是否启用京东支付：</strong>
          </Col>
          <Col span="12">
          <Select v-model="jdParams.enable" placeholder="请选择是否是否启用京东支付" class="form">
            <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <div v-show="jdParams.enable === '是'">
          <Row class="row">
            <Col span="12" class="title">
            <strong>京东支付模式：</strong>
            </Col>
            <Col span="12">
            <Select v-model="jdParams.payModel" placeholder="请选择京东支付模式" class="form">
              <Option v-for="item in jdPayModelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>京东折扣：</strong>
            </Col>
            <Col span="12">
            <Tooltip content="默认100不打折" placement="right-start">
              <InputNumber class="form" :max="100" :min="1" v-model="jdParams.discount"
                :formatter="value => `${value}%`" />
            </Tooltip>
            </Col>
          </Row>
          <div v-show="jdParams.payModel === '默认设置'">
            <Row class="row">
              <Col span="12" class="title">
              <strong>结算银行名称：</strong>
              </Col>
              <Col span="12">
              <Input v-model="jdParams.bankName" placeholder="请输入结算银行名称" class="form" />
              </Col>
            </Row>
            <Row class="row">
              <Col span="12" class="title">
              <strong>个人银行结算姓名：</strong>
              </Col>
              <Col span="12">
              <Input v-model="jdParams.name" placeholder="请输入个人银行结算姓名" class="form" />
              </Col>
            </Row>
            <Row class="row">
              <Col span="12" class="title">
              <strong>结算卡号：</strong>
              </Col>
              <Col span="12">
              <Input v-model="jdParams.cardNum" placeholder="请输入结算卡号" class="form" />
              </Col>
            </Row>
          </div>
          <div v-show="jdParams.payModel === '自定义设置'">
            <Row class="row">
              <Col span="12" class="title">
              <strong>京东商户号：</strong>
              </Col>
              <Col span="12">
              <Input v-model="jdParams.merchantID" placeholder="请输入京东商户号" class="form" />
              </Col>
            </Row>
            <Row class="row">
              <Col span="12" class="title">
              <strong>京东秘钥：</strong>
              </Col>
              <Col span="12">
              <Input v-model="jdParams.secretKey" placeholder="请输入京东秘钥" class="form" />
              </Col>
            </Row>
            <Row class="row">
              <Col span="12" class="title">
              <strong>京东私密：</strong>
              </Col>
              <Col span="12">
              <Input v-model="jdParams.privateKey" placeholder="请输入京东私密" class="form" />
              </Col>
            </Row>
          </div>
        </div>
        <div class="band">
          <strong class="bandTitle">京东个人收款，收取6‰手续费;结算到个人银行卡固定收每笔1.5元手续费。请慎重填写并认真核对，提交后不支持修改！</strong>
          <Button class="bandBtn" type="primary" @click="onJDBind">绑定</Button>
        </div>
      </Card>
    </TabPane>
    <TabPane label="翼支付参数设置" name="翼支付参数设置">
      <Card>
        <template #title>
          <strong>翼支付参数设置</strong>
        </template>
        <Row class="row">
          <Col span="12" class="title">
          <strong>是否启用翼支付：</strong>
          </Col>
          <Col span="12">
          <Select v-model="bestpayParams.enable" placeholder="请选择是否是否启用翼支付" class="form">
            <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <div v-show="bestpayParams.enable === '是'">
          <Row class="row">
            <Col span="12" class="title">
            <strong>翼支付模式：</strong>
            </Col>
            <Col span="12">
            <Select v-model="bestpayParams.payModel" placeholder="请选择翼支付模式" class="form">
              <Option v-for="item in bestPayModelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>翼支付折扣：</strong>
            </Col>
            <Col span="12">
            <Tooltip content="默认100不打折" placement="right-start">
              <InputNumber class="form" :max="100" :min="1" v-model="bestpayParams.discount"
                :formatter="value => `${value}%`" />
            </Tooltip>
            </Col>
          </Row>
          <div v-show="bestpayParams.payModel === '自定义设置'">
            <Row class="row">
              <Col span="12" class="title">
              <strong>翼支付商户号：</strong>
              </Col>
              <Col span="12">
              <Input v-model="bestpayParams.merchantID" placeholder="请输入翼支付商户号" class="form" />
              </Col>
            </Row>
            <Row class="row">
              <Col span="12" class="title">
              <strong>翼支付交易key：</strong>
              </Col>
              <Col span="12">
              <Input v-model="bestpayParams.tradeKey" placeholder="请输入翼支付交易key" class="form" />
              </Col>
            </Row>
            <Row class="row">
              <Col span="12" class="title">
              <strong>翼支付数据key：</strong>
              </Col>
              <Col span="12">
              <Input v-model="bestpayParams.dataKey" placeholder="请输入翼支付数据key" class="form" />
              </Col>
            </Row>
          </div>
          <div v-show="bestpayParams.payModel === 'V3个人'">
            <Row class="row">
              <Col span="12" class="title">
              <strong>翼支付分帐商户号：</strong>
              </Col>
              <Col span="12">
              <Input v-model="bestpayParams.subledgerMerchantID" placeholder="翼支付分帐商户号" class="form" />
              </Col>
            </Row>
          </div>
          <div v-show="bestpayParams.payModel === 'V4企业'">
            <Row class="row">
              <Col span="12" class="title">
              <strong>翼支付商户号：</strong>
              </Col>
              <Col span="12">
              <Input v-model="bestpayParams.merchantID" placeholder="请输入翼支付商户号" class="form" />
              </Col>
            </Row>
            <Row class="row">
              <Col span="12" class="title">
              <strong>用户证书物理路径：</strong>
              </Col>
              <Col span="12">
              <Upload action="//jsonplaceholder.typicode.com/posts/" :on-success="onUserCertUpload"
                :on-remove="onUserCertRemove">
                <Button icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
              </Col>
            </Row>
            <Row class="row">
              <Col span="12" class="title">
              <strong>用户证书密码：</strong>
              </Col>
              <Col span="12">
              <Input type="password" v-model="bestpayParams.userCertificatePwd" placeholder="请输入用户证书密码" class="form" />
              </Col>
            </Row>
            <Row class="row">
              <Col span="12" class="title">
              <strong>服务器证书物理路径：</strong>
              </Col>
              <Col span="12">
              <Upload action="//jsonplaceholder.typicode.com/posts/" :on-success="onServerCertUpload"
                :on-remove="onServerCertRemove">
                <Button icon="ios-cloud-upload-outline">选择文件</Button>
              </Upload>
              </Col>
            </Row>
          </div>
        </div>
        <div class="band">
          <strong class="bandTitle">翼支付个人收款,收取6‰手续费；请慎重填写并认真核对，提交后不支持修改！</strong>
          <Button class="bandBtn" type="primary" @click="onBestPayBind">绑定</Button>
        </div>
      </Card>
    </TabPane>
    <TabPane label="银商参数配置" name="银商参数配置">
      <Card>
        <template #title>
          <strong>银商参数配置</strong>
        </template>
        <Row class="row">
          <Col span="12" class="title">
          <strong>是否启用银商支付：</strong>
          </Col>
          <Col span="12">
          <Select v-model="silverParams.enable" placeholder="请选择是否启用银商支付" class="form">
            <Option v-for="item in whetherList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          </Col>
        </Row>
        <div v-show="silverParams.enable === '是'">
          <Row class="row">
            <Col span="12" class="title">
            <strong>银商折扣：</strong>
            </Col>
            <Col span="12">
            <Tooltip content="默认100不打折" placement="right-start">
              <InputNumber class="form" :max="100" :min="1" v-model="silverParams.discount"
                :formatter="value => `${value}%`" />
            </Tooltip>
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>银联商户号：</strong>
            </Col>
            <Col span="12">
            <Input v-model="silverParams.merchantID" placeholder="请输入银联商户号" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>银联终端号：</strong>
            </Col>
            <Col span="12">
            <Input v-model="silverParams.terminalID" placeholder="请输入银联终端号" class="form" />
            </Col>
          </Row>
          <Row class="row">
            <Col span="12" class="title">
            <strong>数字货币：</strong>
            </Col>
            <Col span="12">
            <Tooltip :max-width="200" content="开启前请确保已开通数字货币，否则消费者无法使用数字货币支付，开通步骤请在“云数加盟”联系云数客服进行开通"
              placement="right-start">
              <Checkbox v-model="silverParams.enableCurrency">是否开启数字货币</Checkbox>
            </Tooltip>
            </Col>
          </Row>
        </div>
        <div class="band">
          <strong class="bandTitle">银联商务收款，收取6‰手续费；请慎重填写并认真核对，提交后不支持修改！</strong>
          <Button class="bandBtn" type="primary" @click="onSilverBind">绑定</Button>
        </div>
      </Card>
    </TabPane>
  </Tabs>
</template>

<script>

import {
  whetherList,
  jdPayModelList,
  bestPayModelList,
} from '@/mock/data/option-data.js'

export default {
  name: 'agent-trademark-page',
  data() {
    return {
      // 微信参数设置
      wechatParams: {
        enable: '是', // 是否启用
        disable: false, // 是否禁用
        bindModel: '云商服务器', // 绑定模式
        discount: 100, // 折扣
        merchantID: '1626599950', // 微信商户号
        name: '林荣', // 姓名
        bankAccount: '工商银行 6222***********3820', // 银行账号
        servicePhone: '18929455118', // 客服电话
      },

      // 支付宝参数设置
      alipayParams: {
        enable: '是', // 是否启用
        bindModel: '直付通', // 绑定模式
        discount: 100, // 折扣
        accountName: '林荣', // 账户名称
        merchantID: '2088610367330373', // 商户ID
        account: '18929455118', // 账号
        servicePhone: '18929455118', // 客服电话
        visible: false, // 扫码设置支付宝参数
      },

      // 刷脸参数设置
      faceSwipParams: {
        enable: '是', // 是否启用
        swipModel: '个人刷脸模式', // 刷脸模式
        pid: '2088442364921821',
      },

      // 京东参数设置
      jdParams: {
        enable: '是', // 是否启用
        payModel: '默认设置', // 支付模式
        discount: 100, // 折扣
        bankName: '', // 结算银行名称
        name: '', // 个人银行结算姓名
        cardNum: '', // 结算卡号
        merchantID: '', // 商户号
        secretKey: '', // 秘钥
        privateKey: '', // 私钥
      },

      // 翼支付参数设置
      bestpayParams: {
        enable: '是', // 是否启用
        payModel: '默认设置', // 支付模式
        discount: 100, // 折扣
        merchantID: '', // 商户号
        tradeKey: '', // 交易key
        dataKey: '', // 数据key
        subledgerMerchantID: '', // 分账商户号
        userCertificatePath: [], // 用户证书物理路径
        userCertificatePwd: '', // 用户证书密码
        serverCertificatePath: [], // 服务器证书物理路径
      },

      // 银商参数设置
      silverParams: {
        enable: '是', // 是否启用
        discount: 100, // 折扣
        merchantID: '', // 商户号
        terminalID: '', // 终端号
        enableCurrency: true, // 是否开通数字货币
      },

      // 选择器数据
      whetherList,
      jdPayModelList,
      bestPayModelList,
    };
  },
  methods: {
    // 微信参数设置 -> 是否禁用
    onWechatDisable() {
      this.wechatParams.disable = !this.wechatParams.disable;
      this.$Message.info('微信支付参数修改成功！');
    },
    // 微信参数设置 -> 绑定
    onWechatBind() {
      if (this.wechatParams.enable === '否') {
        this.$Message.info('绑定成功！');
        return;
      }

      if (this.wechatParams.merchantID.length === 0) {
        this.$Message.error('微信商户号不能为空');
        return;
      }
      if (this.wechatParams.name.length === 0) {
        this.$Message.error('姓名不能为空');
        return;
      }
      if (this.wechatParams.bankAccount.length === 0) {
        this.$Message.error('银行账号不能为空');
        return;
      }
      if (this.wechatParams.servicePhone.length === 0) {
        this.$Message.error('客服电话不能为空');
        return;
      }

      this.$Message.info('绑定成功！');
    },

    // 支付宝参数设置 -> 扫码
    onAlipayScan() {
      this.alipayParams.visible = true;
      console.log(213)
    },
    // 支付宝参数设置 -> 绑定
    onAlipayBind() {
      if (this.alipayParams.enable === '否') {
        this.$Message.info('绑定成功！');
        return;
      }

      if (this.alipayParams.accountName.length === 0) {
        this.$Message.error('支付宝账号名称不能为空');
        return;
      }
      if (this.alipayParams.merchantID.length === 0) {
        this.$Message.error('支付宝商户号不能为空');
        return;
      }
      if (this.alipayParams.account.length === 0) {
        this.$Message.error('支付宝账号不能为空');
        return;
      }
      if (this.alipayParams.servicePhone.length === 0) {
        this.$Message.error('客服电话不能为空');
        return;
      }

      this.$Message.info('直付通绑定成功！');
    },

    // 刷脸参数设置 -> 保存
    onFaceSwipSave() {
      if (this.faceSwipParams.enable === '否') {
        this.$Message.info('保存成功！');
        return;
      }

      if (this.faceSwipParams.pid.length === 0) {
        this.$Message.error('Pid不能为空');
        return;
      }

      this.$Message.info('保存成功！');
    },

    // 京东参数设置-> 绑定
    onJDBind() {
      if (this.jdParams.enable === '否') {
        this.$Message.info('绑定成功！');
        return;
      }

      if (this.jdParams.payModel === '默认设置') {
        if (this.jdParams.bankName.length === 0) {
          this.$Message.error('结算银行名称不能为空！');
          return;
        }
        if (this.jdParams.name.length === 0) {
          this.$Message.error('个人银行结算姓名不能为空！');
          return;
        }
        if (this.jdParams.cardNum.length === 0) {
          this.$Message.error('结算卡号不能为空！');
          return;
        }

        this.$Message.info('绑定成功！');
        return;
      }

      if (this.jdParams.payModel === '自定义设置') {
        if (this.jdParams.merchantID.length === 0) {
          this.$Message.error('京东商户号不能为空！');
          return;
        }
        if (this.jdParams.secretKey.length === 0) {
          this.$Message.error('京东秘钥不能为空！');
          return;
        }
        if (this.jdParams.privateKey.length === 0) {
          this.$Message.error('京东私密不能为空！');
          return;
        }

        this.$Message.info('绑定成功！');
        return;
      }

      this.$Message.info('绑定成功！');
    },

    // 翼支付参数设置 -> 用户证书 -> 上传
    onUserCertUpload(response, file, fileList) {
      this.bestpayParams.userCertificatePath = fileList;
    },
    // 翼支付参数设置 -> 用户证书 -> 移除
    onUserCertRemove(file, fileList) {
      this.bestPayModelList.userCertificatePath = fileList;
      console.log(fileList);
    },
    // 翼支付参数设置 -> 服务器证书 -> 上传
    onServerCertUpload(response, file, fileList) {
      this.bestpayParams.serverCertificatePath = fileList;
    },
    // 翼支付参数设置 -> 服务器证书 -> 移除
    onServerCertRemove(file, fileList) {
      this.bestPayModelList.serverCertificatePath = fileList;
    },
    // 翼支付参数设置 -> 绑定
    onBestPayBind() {
      if (this.bestpayParams.enable === '否') {
        this.$Message.info('绑定成功！');
        return;
      }

      if (this.bestpayParams.payModel === '自定义设置') {
        if (this.bestpayParams.merchantID.length === 0) {
          this.$Message.error('翼支付商户号不能为空！');
          return;
        }
        if (this.bestpayParams.tradeKey.length === 0) {
          this.$Message.error('翼支付交易key不能为空！');
          return;
        }
        if (this.bestpayParams.dataKey.length === 0) {
          this.$Message.error('翼支付数据key不能为空！');
          return;
        }

        this.$Message.info('绑定成功！');
        return;
      }

      if (this.bestpayParams.payModel === 'V3个人') {
        if (this.bestpayParams.subledgerMerchantID.length === 0) {
          this.$Message.error('翼支付分帐商户号不能为空！');
          return;
        }

        this.$Message.info('绑定成功！');
        return;
      }

      if (this.bestpayParams.payModel === 'V4企业') {
        if (this.bestpayParams.merchantID.length === 0) {
          this.$Message.error('翼支付商户号不能为空！');
          return;
        }
        if (this.bestpayParams.userCertificatePath.length === 0) {
          this.$Message.error('请上传用户证书！');
          return;
        }
        if (this.bestpayParams.userCertificatePwd.length === 0) {
          this.$Message.error('用户证书密码不能为空！');
          return;
        }
        if (this.bestpayParams.serverCertificatePath.length === 0) {
          this.$Message.error('请上传服务器证书！');
          return;
        }

        this.$Message.info('绑定成功！');
        return;
      }

      this.$Message.info('绑定成功！');
      return;
    },

    // 银商参数设置 -> 绑定
    onSilverBind() {
      if (this.silverParams.enable === '否') {
        this.$Message.info('绑定成功！');
        return;
      }

      if (this.silverParams.merchantID.length === 0) {
        this.$Message.error('银联商户号不能为空！');
        return;
      }

      if (this.silverParams.terminalID.length === 0) {
        this.$Message.error('银联终端号不能为空！');
        return;
      }

      this.$Message.info('绑定成功！');
      return;
    },
  },
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
  width: 300px;
}

.disableBtn {
  margin-left: 7px;
}

.band {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
}

.bandTitle {
  color: red;
  font-size: 15px;
}

.bandBtn {
  margin-top: 10px;
  width: 100px;
}

.qrcode-img {
  width: 240px;
  height: 240px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>