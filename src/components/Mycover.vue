<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog()">
      <img src="../assets/default.png" />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true" width="720px">
      <!-- tab组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <div style="padding-bottom: 20px;">
            <el-radio-group v-model="collect" size="mini" @change="hCollectChange">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">收藏</el-radio-button>
            </el-radio-group>
          </div>
          <!-- 素材列表 -->
          <el-row :gutter="10" class="img_list">
                <el-col
                v-for="image in images"
                :key="image.id"
                :class="{selected: image.url===selectedImageUrl}"
                class="img_item" :xs="12" :sm="6" :md="6" :lg="4">
                  <el-image
                    @click.native="hImageClick(image)"
                    style="height: 100px;"
                    :src="image.url"
                    fit="cover"></el-image>
                </el-col>
            </el-row>
          <!-- /素材列表 -->
          <!-- 分页组件 -->
          <el-pagination
              style="margin-top:10px;"
              :hide-on-single-page="true"
              background
              @current-change="hPageChange"
              layout="prev, pager, next"
              :page-size="per_page"
              :total="total_count">
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">上传图片内容</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from '@/api/image.js'
export default {
  name: 'MyCover',
  data () {
    return {
      selectedImageUrl: null,
      // 控制对话框显示隐藏
      dialogVisible: false,
      // 当前tabs组件激活的选项卡的name属性的值
      activeName: 'image',
      images: [], // 当前显示的图片列表
      collect: false, // 是否是 收藏的图片， true表示是收藏，false表示是全部
      cur_page: 1, // 当前页码
      per_page: 10, // 一页10张图
      total_count: 0 // 本次查询结果总数
    }
  },
  methods: {
    // 翻页按钮
    hPageChange (curPage) {
      // alert(curPage)
      // 1. 更新查询参数
      this.cur_page = curPage
      // 2. 再发请求
      this.loadImages()
    },
    // 全部&收藏 的切换
    hCollectChange () {
      // console.log(this.collect)
      // 重发请求
      this.loadImages()
    },
    hImageClick (image) {
      this.selectedImageUrl = image.url
      console.log(image, this.selectedImageUrl)
    },
    openDialog () {
    // 打开对话框
      this.dialogVisible = true
      // 发请求，获取当前的图片列表
      this.loadImages()
    },
    async loadImages () {
      try {
        const res = await getImages({
          collect: this.collect, // 是否是收藏
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
    }
  }
}
</script>

<style scoped lang='less'>
// 图片按钮
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.selected::after{
    content: "";
    position: absolute;
    left: 4px;
    top: 0;
    width: 93%;
    height: 95%;
    background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center / 50px 50px;
  }
// 素材列表

  .img_item{
  position: relative;
  }
</style>
