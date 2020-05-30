<template>
  <div class=''>
      主页
      <el-form>
          <my-channels @zdy='zdy' ></my-channels>
          <vmodel1 v-model="channel_id"></vmodel1>
      </el-form>
  </div>
</template>

<script>
import MyChannels from '@/components/MyChannels'
import vmodel1 from '@/components/vmodel1'
export default {
  name: 'MyComponent',
  props: { },
  data () {
    return {
      channel_id: ''
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    MyChannels,
    // eslint-disable-next-line no-undef
    vmodel1
  },
  computed: { },
  created () { },
  mounted () { },
  methods: {
    // 自定义事件
    zdy (value) {
      this.channel_id = value
    }
  }
}
</script>
<style scoped lang='less'></style>
