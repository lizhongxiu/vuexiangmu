<template>
  <div class='setting-container'>
    <el-card>
      <div slot="header">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <my-breadcrumb>个人设置</my-breadcrumb>
        </el-breadcrumb>
        <!-- 面包屑路径导航 -->
      </div>
      <!-- 栅格 -->
      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form label-width="120px">
            <el-form-item label="编号：">100</el-form-item>
            <el-form-item label="手机：">{{userInfo.mobile}}</el-form-item>
            <el-form-item label="媒体名称：">
              <el-input v-model="userInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介：">
              <el-input v-model="userInfo.intro" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item label="联系邮箱：">
              <el-input v-model="userInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="updateUser" type="primary">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <!-- 上传组件 action必须属性-->
          <el-upload
            class="avatar-uploader"
            action=""
            :http-request="uploadPhoto"
            :show-file-list="false">
            <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="edit-photo">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '../../components/MyBreadcrumb'
import { getUserProfile, modUserProfile, modUserImage } from '@/api/user.js'
export default {
  name: 'my-setting',
  data () {
    return {
      // 用户信息
      userInfo: {
        name: 'test',
        intro: 'info',
        email: 'info@qq.com'
      },
      // 支持上传组件的数据
      imageUrl: null
    }
  },
  components: {
    MyBreadcrumb
  },
  created () {
    this.loadUserProfile()
    // eslint-disable-next-line no-undef
    console.log(this.$eventBus)
  },
  methods: {
    async loadUserProfile () {
      const res = await getUserProfile()
      this.userInfo = res.data.data
    },
    async updateUser () {
      try {
        modUserProfile(this.userInfo)
        // console.log(result)
        // this.userInfo = result
        this.$message.success('修改用户信息成功')
        // this.loadUserProfile()
        this.$eventBus.$emit('updatausername', this.userInfo.name)
      } catch (error) {
        // console.log(error)
        this.$message.success('修改用户信息失败')
      }
    },
    // 选择完成图片后，触发上传头像函数
    async uploadPhoto ({ file }) {
      // console.log(param)  === {file:'选择图片的文件对象'}
      // axios + FormData + file对象
      const formData = new FormData()
      formData.append('photo', file)
      const { data: { data } } = await modUserImage(formData)
      // 上传成功
      // 提示
      this.$message.success('修改头像成功')
      // 本地预览
      this.userInfo.photo = data.photo
      this.$eventBus.$emit('updatauserphoto', this.userInfo.photo)
    }
  }
}
</script>

<style scoped lang='less'>
.avatar{
    width: 178px;
    height: 178px;
    line-height: 178px;
  }
.avatar-uploader {
      text-align: center;
  }
.edit-photo{
  font-size: 12px;
  text-align: center;
}
</style>
