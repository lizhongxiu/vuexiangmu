<template>
  <el-form-item label="频道" prop="channel_id">
    <el-select @change="hSelectChange"  v-model="channelId" clearable placeholder="请选择频道">
    <el-option
    v-for="channel in channels"
    :key="channel.id"
    :label="channel.name"
    :value="channel.id"></el-option>
    </el-select>
</el-form-item>
</template>

<script>
import { getArticleChannels } from '@/api/articles'
export default {
  name: 'model1',
  data () {
    return {
      props: ['value'],
      channelId: this.value, // 当前选中的频道
      channels: [] // 频道列表
    }
  },
  computed: { },
  created () {
    this.loadChannels()
  },
  mounted () { },
  methods: {
    hSelectChange (value) {
      console.log('hSelectChange', value)
      this.$emit('input', value)
    },
    async loadChannels () {
      const result = await getArticleChannels()
      console.log(result)
      this.channels = result.data.data.channels
    }
  },
  watch: {
    // 如果 value值有变化，则直接赋值给channelId（v-model中的数据）
    // value (newVal,oldVal) {
    value () {
      console.log('value的值变化了', this.value)
      this.channelId = this.value
    }
  }
}
</script>

<style scoped lang='less'></style>
