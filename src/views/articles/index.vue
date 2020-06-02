<template>
  <div class='article-container'>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑导航
        https://element.eleme.cn/#/zh-CN/component/breadcrumb#tu-biao-fen-ge-fu -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb> -->
        <my-breadcrumb>内容管理</my-breadcrumb>
      </div>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <!-- label用来决定选择项被选中之后，它表示的值 -->
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="频道">
          <el-select v-model="form.channelId" clearable placeholder="请选择频道">
            <el-option
            v-for="channel in channels"
            :key="channel.id"
            :label="channel.name"
            :value="channel.id"></el-option>
          </el-select>
        </el-form-item> -->
        <vmodel1 v-model="form.channelId"></vmodel1>
        <!--
          daterange:
               date日期，range:区域
          value-format：
            绑定值的格式。不指定则绑定值为 Date 对象
          -->
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="hQuery" :loading="loading">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!--
    下部是一个表格区域
      https://element.eleme.cn/#/zh-CN/component/table

      1. 表格的列，结构。
        列由el-table-column决定。
          label：决定当前列显示出的标题
          prop：决定当前列数据的来源。prop="date"。对于表格来说，
                它的数据是一个数组，每一个元素是一个对象，表示一行。
                这里的prop就是用来从每一个对象中取出属性名为prop值（date）的
                属性值。

      2. 表格的行，数据。
    -->
    <el-card style="margin-top:20px;">
      <div slot="header">
        根据筛选条件查询到{{total_count}}条数据,当前是第{{curPage}}页：
      </div>
      <el-table
        v-loading="loading"
        :data="articles"
        style="width: 100%">
        <el-table-column
          label="封面"
         >
          <template slot-scope="scope">
            <!-- scope.row用于获取当前行的数据 -->
            <!-- 图片 -->
            <!-- <div>{{scope.row.cover.images[0]}}</div> -->

            <!-- el-image:
            - lazy懒加载效果 https://element.eleme.cn/#/zh-CN/component/image#lan-jia-zai
             -->
            <el-image
              :src="scope.row.cover.images[0]"
              style="width:150px;height:100px"
              lazy
              >
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <!-- s由于后端回传的数据是数值，而我们要显示出来是对应字符串，
        所以，这里不能直接使用status -->
        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-else-if="scope.row.status===1" type="info">待审核</el-tag>
            <el-tag v-else-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status===3" type="warning">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status===4" type="danger">已删除</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="pubdate"
          label="发布时间"
        >
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              circle
              @click="hEdit(scope.row)"></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="hDelete(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件
        它只是根据total和page-size来显示页码，而与具体的表格数据无关

        1. total是总条数数；
        默认情况，它会以每页10条进行计算总页数
        2. current-change。当点击页码时，它会触发,会传入当前的页码。
      -->
      <el-pagination
        :disabled="loading"
        style="margin-top:10px;"
        background
        layout="prev, pager, next"
        @current-change="hPageChange"
        :page-size="10"
        :total="total_count">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
import vmodel1 from '@/components/vmodel1'
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getArticles, getArticleChannels, deleteArticle } from '../../api/articles'
export default {
  name: 'ArticleIndex',
  props: { },
  data () {
    return {
      loading: false, // 是否正在查询
      form: {
        channelId: null, // 下拉列表选中的值
        date: null, // 查询日期区间，默认为null
        status: null // 查询文章的状态，默认为null
      },
      curPage: 1, // 当前要查询的页码
      total_count: 0, // 当前查询能查到的总条数
      channels: [], // 保存所有获取的频道
      articles: [
        // {cover:Object,id,pubdate,status,title}
      ] // 文章列表
    }
  },
  components: {
    MyBreadcrumb,
    vmodel1
  },
  created () {
    // 相当于window.onload 。
    // 当组件创建时，会自动调用created
    this.loadArticles()

    this.loadChanels()
  },
  methods: {
    loadChanels () {
      getArticleChannels().then(res => {
        // console.log('获取频道的数据', res)
        this.channels = res.data.data.channels
      })
    },
    loadArticles () {
      // 调用导入的方法
      // 补充一个查询参数 page
      // 分析后端接口，补充begin_pubdate，end_pubdate参数

      // 求这个式子的值：this.form.date && this.form.date[0]
      //    - 如果 this.form.date 是 null，  则整个式子的值是 null
      //    - 如果 this.form.date不是 null， 则整个式子的值是 this.form.date[0]

      // 如果用户选择了日期范围，则传入即可；
      // 如果用户没有选择日期范围，则要把参数设置为null---axios会把参数值为null的数据过滤掉，即不传递这个参数给后端

      let beginPubdate = null
      if (this.form.date) {
        beginPubdate = this.form.date[0]
      }

      // const beginPubdate = this.form.date && this.form.date[0]

      const endPubdate = this.form.date && this.form.date[1]

      // 如果this.form.channelId = ''，此时应该把值设置为null
      // 只有值为null，axios才不会传递这个参数
      // 只有值为null，axios才不会传递这个参数
      // 只有值为null，axios才不会传递这个参数
      let channelId = null
      if (this.form.channelId) {
        channelId = this.form.channelId
      }

      // 开始加载状态
      this.loading = true
      getArticles({
        channel_id: channelId, // this.form.channelId || null
        status: this.form.status,
        begin_pubdate: beginPubdate,
        end_pubdate: endPubdate,
        page: this.curPage
      }).then(res => {
        console.log('获取文章的文章', res)
        this.articles = res.data.data.results
        // 保存总数
        this.total_count = res.data.data.total_count

        // 关闭加载状态
        this.loading = false
      }).catch(err => {
        console.log(err)
        // alert('错误！')
        this.$message({
          message: '查询失败，参数无效',
          type: 'error'
        })

        // 关闭加载状态
        this.loading = false
      })
    },
    hQuery () {
      console.log(this.form.date)
      // 再次调用 查询方法
      // 用户点击查询，重置页码
      this.curPage = 1
      this.loadArticles()
    },
    hEdit (row) {
      // 路由跳转到编辑页，并传入id号
      const id = row.id.toString()

      // 编程式导航
      this.$router.push('/editArticle/' + id)
    },
    hDelete (row) {
      // 用户点击了删除
      console.log('要删除的数据如下', row)
      const id = row.id.toString()
      console.log('要删除的文章的编号是', id)

      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 根据id去删除文章：调用接口传入id
        deleteArticle(id).then(res => {
          // 删除成功
          // 1. 提示
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          // 2. 重新加载当前页的数据
          this.loadArticles()
        }).catch(err => {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
          console.dir(err)
        })
      }).catch(() => {
      })
    },
    hPageChange (curPage) {
      console.log(curPage)
      // 1. 更新当前页码
      this.curPage = curPage
      // 2. 再发请求
      this.loadArticles()
    }
  }
}
</script>

<style scoped lang='less'></style>
