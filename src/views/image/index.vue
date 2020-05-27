<template>
  <div class=''>
    <el-card>
      <div slot="header" class="clearfix">
        <my-breadcrumb>素材管理</my-breadcrumb>
      </div>
      <div style="padding-bottom:20px;">
        <el-radio-group v-model="collect" @change="hCollectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini"
          type="success"
          style="float:right"
          @click="showDialog=true"
        >
          上传图片素材
        </el-button>
      </div>
      <!-- 图片列表 -->
      <el-row :gutter="10">
        <el-col
        v-for="image in images"
        :key="image.id"
        class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
          <el-image
            :src="image.url"
            style="height:180px;"
            fit="cover"
          ></el-image>
          <div class="option" v-show="!collect">
            <!-- 是否收藏 -->
            <span :style="{color:image.is_collected ? 'red': '#fff'} " class="el-icon-star-off"></span>
            <span class="el-icon-delete"></span>
          </div>
       </el-col>
      </el-row>
      <el-pagination
        style="margin-top:10px;"
        background
        layout="prev, pager, next"
        @current-change="hPageChange"
        :page-size="per_page"
        :total="total_count">
      </el-pagination>
      <el-dialog
       @click="showDialog=true"
       title="上传图片素材"
       :append-to-body="true"
       :visible.sync="showDialog"
       >
      上传
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// vuecli工具中，提供一个路径别名： @表示 src/  的绝对地址
import MyBreadcrumb from '@/components/MyBreadcrumb'
import { getImages } from '@/api/image.js'
export default {
  name: 'ImageIndex',
  props: { },
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      showDialog: false,
      images: [],
      collect: false,
      total_count: 0, // 本次查询结果总数
      cur_page: 1, // 当前页码
      per_page: 10 // 一页10张图
    }
  },
  computed: { },
  created () {
    this.loadImages()
  },
  methods: {
    // 在后面的分页，删除等操作中，加载图片会多次使用
    // 所以这里封装成一个独立的方法
    async loadImages () {
      try {
        const res = await getImages({
          collect: this.collect,
          per_page: this.per_page, // 每页几条
          page: this.cur_page // 请求的页码
        })
        // 保存当前查询结果
        this.images = res.data.data.results

        // 更新查询总结果数
        this.total_count = res.data.data.total_count
      } catch (err) {
        console.log(err)
      }
    },
    // 翻页按钮
    hPageChange (curPage) {
      // alert(curPage)
      // 1. 更新查询参数
      this.cur_page = curPage
      // 2. 再发请求
      this.loadImages()
    },
    hCollectChange () {
      this.loadImages()
    }
  }
}
</script>

<style lang="less" scoped>
  .img_item {
    position: relative;
    box-sizing: border-box;
  }
  .option {
    position: absolute;
    left: 5px;
    right:5px;
    bottom: 5px;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    color: #fff;
    span {
      margin: 0 30px;
      cursor: pointer;
    }
  }
.avatar-uploader {
    text-align: center;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
</style>
