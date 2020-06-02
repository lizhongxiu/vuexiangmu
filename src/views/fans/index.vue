<template>
  <div class="fans-container">
    <el-card>
      <div slot="header">
       <my-breadcrumb>粉丝管理 </my-breadcrumb>
      </div>

      <!-- tabs组件 -->
      <el-tabs v-model="activeName" type="card" @tab-click='hTabClick'>

        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans_list">
            <div class="fans_item"
            v-for="(fan, idx) in list"
            :key="idx">
              <el-avatar
              :size="80"
              :src="fan.photo"></el-avatar>
              <p>{{fan.name}}</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>

          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="per_page"
            @current-change="hChangePage"
            :total="total">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="粉丝画像" name="img">
          <!-- 准备dom容器，让echarts在这里画图
            注意：
            1. 要指定宽，高
            2. 设置ref，方便我们访问这个dom元素
           -->
          <div ref="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>

      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import MyBreadcrumb from '../../components/MyBreadcrumb'
// eslint-disable-next-line no-unused-vars
import { getFans, getFansStatistics } from '@/api/fans'
import echarts from 'echarts'
export default {
  components: {
    MyBreadcrumb
  },
  created () {
    this.loadFans()
  },
  name: 'my-fans',
  data () {
    return {
      // tabs的当前激活选项卡的name属性值
      activeName: 'list',
      per_page: 20,
      page: 1,
      list: [],
      total: 0,
      // 测试头像
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  methods: {
    async loadFans () {
      const result = await getFans(this.page, this.per_page)
      console.log(result)
      // 保存到数据项
      this.list = result.data.data.results
      this.total = result.data.data.total_count
    },
    hChangePage (curPage) {
      // 更新页码
      this.page = curPage
      // 重发请求
      this.loadFans()
    },
    hTabClick (tab) {
      if (tab.name === 'img') {
        this.draw()
      }
    },
    async draw () {
      // 用echarts来画图
      // 1. 初始化echarts对象。
      //  格式： const echartobj = echarts.init(dom结构)
      // 2. 通过固定格式的option来画图
      //    echartobj.setOption(option)
      const result = await getFansStatistics()
      const ages = result.data.data.age
      const ageY = []
      const ageX = []
      for (const key in ages) {
        ageY.push(ages[key])
        ageX.push(key.replace('le', '小于').replace('gt', '大于') + '岁')
      }
      console.log(ageX, ageY)
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)

      // 指定图表的配置项和数据
      var option = {
        xAxis: {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          data: ageX
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          // data: [120, 200, 150, 80, 70, 110, 130],
          data: ageY,
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang='less'>
.fans_list {
  .fans_item {
    width: 120px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 30px;
    p {
      margin: 10px 0;
    }
  }
}
</style>
