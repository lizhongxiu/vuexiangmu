<template>
  <div class=''>
      <el-calendar>
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template
          slot="dateCell"
          slot-scope="{date, data}">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
          </p>
        </template>
      </el-calendar>
      <!-- <el-form>
          <my-channels @zdy='zdy' ></my-channels>
          <vmodel1 v-model="channel_id"></vmodel1>
          <my-cover></my-cover>
      </el-form> -->
  </div>
</template>

<script>
// import MyChannels from '@/components/MyChannels'
// import MyCover from '@/components/Mycover'
// import vmodel1 from '@/components/vmodel1'
export default {
  name: 'Home',
  props: { },
  data () {
    return {
      channel_id: ''
    }
  },
  components: {
    // MyChannels,
    // vmodel1,
    // MyCover
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
