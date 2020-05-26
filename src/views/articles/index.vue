<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header">
        <!-- 面包屑路径导航 -->
        <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb> -->
        <my-breadcrumb>内容管理</my-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <!-- clearable： 表示可清空的单选 -->
          <el-select v-model="form.channelId" clearable placeholder="请选择频道">
            <el-option
            v-for="channel in channels"
            :key="channel.id"
            :label="channel.name"
            :value="channel.id"></el-option>
          </el-select>
        </el-form-item>
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
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{total_count}} 条结果：
      </div>
      <!-- 数据列表 -->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
      >
      <!-- prop代表下面data中的数据 值是多少显示什么-->
      <!-- label代表表头显示出的标题 -->
        <el-table-column
          label="封面"
          width="180">
        <template slot-scope="scope">
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
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
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
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getArticles, getArticleChannels, deleteArticle } from '../../api/articles'
export default {
  name: 'ArticleIndex',
  components: {
    MyBreadcrumb
  },
  props: {},
  data () {
    return {
      form: {
        channelId: null, // 下拉列表选中的值
        delivery: false,
        date: null,
        status: null
      },
      channels: [],
      curPage: 1,
      total_count: 0,
      articles: [] // 文章列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadAricles()
    this.loadChanels()
  },
  mounted () {},
  methods: {
    loadChanels () {
      getArticleChannels().then(res => {
        // console.log('获取频道的数据', res)
        this.channels = res.data.data.channels
      })
    },
    onSubmit () {
      // console.log('submit!')
      this.loadAricles()
      this.page = 1
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
      // console.log('当前页数：' + curPage)
      this.curPage = curPage
      this.loadAricles()
    },
    // 获取文章列表
    loadAricles (curPage) {
      const beginPubdate = this.form.date && this.form.date[0]
      const endPubdate = this.form.date && this.form.date[1]
      getArticles({
        channel_id: this.form.channelId || null,
        status: this.form.status,
        begin_pubdate: beginPubdate,
        end_pubdate: endPubdate,
        page: this.curPage
      }).then(res => {
        // console.log('获取文章', res, beginPubdate, endPubdate)
        this.articles = res.data.data.results
        this.total_count = res.data.data.total_count
      })
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
</style>
