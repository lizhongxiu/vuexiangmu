<template>
  <div class='article-container'>
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <my-breadcrumb>评论管理</my-breadcrumb>
      </div>

      <!-- 主体表格 -->
      <el-table
        v-loading="loading"
        :data="comments"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="文章标题"
        >
        </el-table-column>

        <el-table-column
          prop="total_comment_count"
          label="总评论数"
        >
        </el-table-column>

        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数"
        >
        </el-table-column>

        <!-- 由于后端回传的数据是数值，而我们要显示出来是对应字符串，
        所以，这里不能直接使用status -->
        <el-table-column
          label="评论状态"
        >
        <!--
          如果数据中的comment_status为true表示  关闭
          如果数据中的comment_status为false表示 正常
        -->
          <template slot-scope="scope">

            <el-tag v-if="scope.row.comment_status">关闭</el-tag>
            <el-tag type="success" v-else>正常</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.comment_status"
              size="mini"
              type="primary"
              @click="hToggleComment(scope.row)" :loading="loading">打开评论</el-button>
            <el-button
              v-else
              size="mini"
              type="danger"
              @click="hToggleComment(scope.row)" :loading="loading">关闭评论</el-button>
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
        :page-size="per_Page"
        :total="total_count">
      </el-pagination>

    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getComments, modCommentStatus } from '@/api/comment'
export default {
  name: 'CommentIndex',
  props: { },
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      fullscreenLoading: false,
      page: 1, // 第一页
      per_Page: 10, // 每页10条
      loading: false, // 是否加载
      total_count: 0, // 总条数
      comments: [] // 评论数据
    }
  },
  computed: { },
  created () {
    this.loadComment()
  },
  methods: {
    async loadComment () {
      const result = await getComments(this.page, this.per_page)
      console.log(result)
      this.comments = result.data.data.results
      this.total_count = result.data.data.total_count
    },
    async hToggleComment (comment) {
      this.loading = true
      console.log(comment)
      try {
        // 发请求
        await modCommentStatus(comment.id.toString(), !comment.comment_status)
        // 更新数据
        comment.comment_status = !comment.comment_status
        this.$message.success('操作成功')
        // 关闭加载状态
        setTimeout(() => {
          this.loading = false
        }, 800)
      } catch {
        this.$message.error('操作失败')
        // 关闭加载状态
        this.loading = false
      }
    },
    // 它会自动传入当前的页码
    hPageChange (curPage) {
      // 更新页面
      this.page = curPage
      // 重发请求
      this.loadComment()
    }
  }
}
</script>

<style scoped lang='less'></style>
