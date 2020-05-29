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
            <span
                class="el-icon-star-off"
                @click="hToggleCollect(image)"
                :style="{color:image.is_collected?'red':'#fff'}"
            ></span>
            <span class="el-icon-delete" @click="hDelImage(image.id)"></span>
          </div>
       </el-col>
      </el-row>
      <el-pagination
        :hide-on-single-page="true"
        style="margin-top:10px;"
        background
        layout="prev, pager, next"
        @current-change="hPageChange"
        :page-size="per_page"
        :total="total_count">
      </el-pagination>
    <el-dialog
        title="上传图片素材"
        :append-to-body="true"
        :visible.sync="showDialog">
        <!-- action="https://jsonplaceholder.typicode.com/posts/" 上传接口地址 -->
        <!-- :show-file-list="false" 上传一张图片，不需要文件列表 -->
        <!-- :on-success="handleAvatarSuccess" 绑定的函数在上传成功后户调用 -->
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          name="image"
          :show-file-list="false"
          :on-success="hUploadSuccess">
          <!-- 两个标签  上传按钮  预览图片 只能显示一个 -->
          <!-- v-if="imageUrl" 有图片地址，那显示图片，把地址绑定src -->
          <el-image v-if="imageUrl" :src="imageUrl" class="avatar" />
          <!-- v-else  没有图片地址 ，那显示上传按钮  +号按钮 -->
          <!-- 同级的标签，才能v-if和v-else配合使用  -->
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
// vuecli工具中，提供一个路径别名： @表示 src/  的绝对地址
import MyBreadcrumb from '@/components/MyBreadcrumb'
// eslint-disable-next-line no-unused-vars
import { getImages, delImage, modImage } from '@/api/image.js'
import { getUser } from '@/utils/storage'

export default {
  name: 'ImageIndex',
  props: { },
  components: {
    MyBreadcrumb
  },
  data () {
    return {
      imageUrl: null,
      headers: {
        Authorization: `Bearer ${getUser().token}`
      },
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
    async hDelImage (id) {
      this.$confirm('此操作将永久删除该图片素材, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 点击确认
        try {
          // 请求
          await delImage(id)
          // 成功提示
          this.$message.success('删除成功')
          // 更新当前页素材列表
          this.loadImages()
        } catch (e) {
          console.log(e)
          // 失败提示
          this.$message.error('删除失败')
        }
      }).catch(() => {})
    },
    // 收藏部分第一种
    async hToggleCollect (image) {
      try {
        const result = await modImage(image.id, { collect: !image.is_collected })
        image.is_collected = result.data.data.collect
      } catch (e) {
        console.log(e)
        this.$message.error('操作失败')
      }
    },
    // 收藏部分第二种需要改为驼峰命名法
    // async hToggleCollect (image) {
    //   const { id, is_collected } = image
    //   try {
    //     await modImage(id, !is_collected)
    //     image.is_collected = !is_collected
    //   } catch (e) {
    //     console.log(e)
    //     this.$message.error('操作失败')
    //   }
    // },
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
    // 上传素材
    hUploadSuccess (res) {
      // 预览
      this.imageUrl = res.data.url
      // 提示
      this.$message.success('上传素材成功')
      this.loadImages()
      this.hLoadedImage()
    },

    hLoadedImage () {
      // 3s后
      window.setTimeout(() => {
        // 关闭对话框
        this.showDialog = false

        this.imageUrl = null
      }, 3000)
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
