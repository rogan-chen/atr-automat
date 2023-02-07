<template>
  <Card style="display: flex; justify-content: center;">
    <div style="display: flex; flex-direction: row; align-items: center;">
      商标：<Input v-model="trademark" placeholder="请输入商标" style="width: 600px; margin-left: 26px;" />
    </div>
    <div style="display: flex; flex-direction: row; align-items: center; margin-top: 20px;">
      缩写商标：<Input v-model="abbrTrademark" placeholder="请输入缩写商标" style="width: 600px;" />
    </div>
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; margin-top: 20px;">
      <Button type="primary" @click="onSave">保存</Button>
    </div>
  </Card >
</template>

<script lang="ts">
export default {
  name: 'agent-trademark-page',
  data() {
    return {
      // 商标
      trademark: '',
      // 缩写商标
      abbrTrademark: '',
    };
  },
  methods: {
    // 保存
    onSave() {
      if (this.trademark.length === 0) {
        this.$Message.error('商标不能为空');
      } else if (this.abbrTrademark.length === 0) {
        this.$Message.error('缩写商标不能为空');
      } else {
        this.$Message.success('保存成功');
      }
    },
  },
}
</script>
