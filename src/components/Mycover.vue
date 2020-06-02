<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="openDialog()">
      <!-- 如果父组件中的v-model上的值不为空，则用它的值 -->
      <img :src="value || coverImageUrl" />
    </div>
    <!-- 对话框 -->
    <el-dialog
      :append-to-body="true"
      :visible.sync="dialogVisible"
      width="720px">
      <!-- tab组件 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
            <div style="padding-bottom: 20px;">
              <el-radio-group v-model="collect"  @change="hCollectChange" size="mini">
                  <el-radio-button :label="false">全部</el-radio-button>
                  <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
            </div>
            <!-- 素材列表 -->
            <el-row :gutter="10" class="img_list">

              <!-- 只有当前的image的url与selectedImageUrl相等时，才补充一个selected类
                :class="{类名：值}"
                当值为true就有这个类名，否则就没有

              -->
                <el-col
                  v-for="image in images"
                  :key="image.id"
                  class="img_item"
                  :class="{selected: image.url===selectedImageUrl}"
                  :xs="12" :sm="6" :md="6" :lg="4"
                >
                  <el-image
                    @click.native="hImageClick(image)"
                    style="height: 100px;"
                    :src="image.url"
                    fit="cover"></el-image>
                </el-col>
            </el-row>
            <!-- /素材列表 -->

            <!-- 分页组件
              它只是根据total和page-size来显示页码，而与具体的表格数据无关

              1. total是总条数数；
              默认情况，它会以每页10条进行计算总页数
              2. current-change。当点击页码时，它会触发,会传入当前的页码。
            -->
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

        <el-tab-pane label="上传图片" name="upload">

          <!--
            本质还是ajax技术在做上传。

            action：上传地址
            show-file-list:false，不需要显示已上传的文件列表
            on-success： 上传成功之后的回调函数
            before-upload: 上传之前对文件进行检测
            name: 设置上传的文件参数名，要与后端接口中的要求一致。
          -->
          <el-upload
            class="avatar-uploader"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="headers"
            :on-success="hUploadSuccess"
            name="image"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload">
            <!--
              如果当前有预览地址就说明图片上传成功了。
              给用户展示这张图，用户成功地看到这张图时，关闭整个上传对话框。
              图片的onload事件：
              - 当你设置图片的src时，浏览器会去请求图片的资源，当图片请求回来之后
              会一有一个事件触发出来，这个事件就是onload。
            -->
            <el-image v-if="imgSrc" :src="imgSrc" class="avatar"></el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="hConfirmImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import defaultImg from '@/assets/default.png'
import { getUser } from '@/utils/storage.js'
import { getImages } from '@/api/image.js'
export default {
  name: 'MyCover',
  // value是用来接收 v-model的初值
  props: ['value'],
  data () {
    return {
      // 图片按钮上的图片地址
      // coverImageUrl: '../assets/default.png',
      coverImageUrl: defaultImg,

      // 图片上传完成之后，从服务器回传的图片地址
      imgSrc: null,

      // 由于这里的上传不是走的axios,而处理上传的接口又需要token
      // 所以这里只能手动添加token
      headers: {
        Authorization: `Bearer ${getUser().token}`
      },

      // 用它来记录当前用户选中的图片
      // 当用户点击某张图片，则把被点击的图片地址保存在这里
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
    openDialog () {
      // 重置
      this.activeName = 'image'
      this.imgSrc = null
      this.selectedImageUrl = ''

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
    },
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
    // 上传之前的验证
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 如果上传成功，则会把响应结果传给res
    hUploadSuccess (res) {
      console.log(res)
      // 保存上传成功之后的图片地址
      // 它会显示出来给用户看
      this.imgSrc = res.data.url
      this.$message.success('上传素材成功')
    },
    hConfirmImage () {
      console.log(this.activeName)
      // 1 校验，根据当前所处不同的tab选项卡，做不同判断
      if (this.activeName === 'image') {
        // 素材库，有没有有选中图
        if (!this.selectedImageUrl) {
          this.$message.warning('请先选中一张图片')
          return
        } else {
          // 2 预览图片： 把你选中的图显示在 图片按钮上
          this.coverImageUrl = this.selectedImageUrl

          // input事件，用来把值设置给v-model绑定的数据项
          this.$emit('input', this.selectedImageUrl)
        }
      } else if (this.activeName === 'upload') {
        // 上传图片， 有没有上传
        if (!this.imgSrc) {
          this.$message.warning('请先上传一张图片')
          return
        } else {
          // 2 预览图片： 把你选中的图显示在 图片按钮上
          this.coverImageUrl = this.imgSrc
          // input事件，用来把值设置给v-model绑定的数据项
          this.$emit('input', this.coverImageUrl)
        }
      }
      // 3.隐藏对话框
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang='less'>
// 对话框 上下的空去掉
.my-cover /deep/ .el-dialog__body {
    padding-bottom: 0px;
    padding-top: 0;
}
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

// 素材列表
.img_list{
  .img_item{
    // 鼠标的形状
    cursor: pointer;
    position: relative;
  }
  .selected::after{
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center / 50px 50px;
  }
}

// 上传图片
.avatar{
    width: 178px;
    height: 178px;
    line-height: 178px;
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
