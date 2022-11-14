<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 150px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <p>{{ infor.title }}</p>
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ '现金：' + infor.cash.toFixed(2) + '&emsp;&emsp;' + '非现金：' + infor.noCash.toFixed(2) }}</p>
        </infor-card>
      </i-col>
      <i-col :xs="12" :md="8" :lg="6" v-for="(device, i) in deviceData" :key="`device-${i}`" style="height: 150px;padding-bottom: 10px;">
        <infor-card shadow :color="device.color" :icon="device.icon" :icon-size="36">
          <p>{{ device.title }}</p>
          <count-to :end="device.count" count-class="count-style"/>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="用户支付方式"></chart-pie>
        </Card>
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="每周在线设备量"/>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '今日销售额', icon: 'ios-calendar', count: 561, cash: 329, noCash: 232, color: '#2d8cf0' },
        { title: '昨日销售额', icon: 'md-calendar', count: 257, cash: 45, noCash: 212, color: '#19be6b' },
        { title: '本周销售额', icon: 'ios-clipboard', count: 369, cash: 192, noCash: 177, color: '#ff9900' },
        { title: '本月销售额', icon: 'md-clipboard', count: 645, cash: 567, noCash: 78, color: '#ed3f14' }
      ],
      deviceData: [
        { title: '在线设备数量', icon: 'ios-stats', count: 95, color: '#99621e' },
        { title: '离线设备数量', icon: 'ios-stats-outline', count: 631, color: '#739e82' },
        { title: '异常设备数量', icon: 'md-warning', count: 82, color: '#b97375' },
        { title: '缺货设备数量', icon: 'md-remove-circle', count: 73, color: '#414f86' }
      ],
      pieData: [
        { value: 245, name: '纸币支付' },
        { value: 679, name: '硬币支付' },
        { value: 44, name: '刷卡支付' },
        { value: 1667, name: '支付宝支付' },
        { value: 2345, name: '微信支付' }
      ],
      barData: {
        '星期一': 361,
        '星期二': 457,
        '星期三': 568,
        '星期四': 698,
        '星期五': 2221,
        '星期六': 1857,
        '星期日': 2580
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
