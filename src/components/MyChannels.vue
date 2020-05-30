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
  name: 'MyChannels',
  props: { },
  data () {
    return {
      channelId: '', // 当前选中的频道
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
      this.$emit('zdy', value)
    },
    async loadChannels () {
      const result = await getArticleChannels()
      console.log(result)
      this.channels = result.data.data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
