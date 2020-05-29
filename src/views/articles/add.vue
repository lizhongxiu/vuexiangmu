<template>
  <div class='publish-container'>
    <el-card>
      <div slot="header">
        <my-breadcrumb>发布文章</my-breadcrumb>
      </div>

      <!-- ref属性为了让vue可以找到这个组 -->
      <el-form ref="form" :rules="rules" :model="article" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model.trim="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor v-model="article.content" :options="editorOption"></quill-editor>
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <!-- 根据后端接口约定 -->
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择活动区域">
            <el-option
            v-for="channel in channels"
            :key="channel.id"
            :label="channel.name"
            :value="channel.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="hAddArticle(false)">发表</el-button>
          <el-button @click="hAddArticle(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
// 导入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入组件
import { quillEditor } from 'vue-quill-editor'

import { getArticleChannels, addArticle } from '@/api/articles'

/**
 * 表单验证：
 * 1. 建立验证规则
 * 2. 给表单项，绑定rules及prop
 * 3. 在提交之前，调用form组件的验证方法
 */
export default {
  name: 'AddArticle',
  props: { },
  components: {
    MyBreadcrumb,
    // 注册组件
    quillEditor
  },
  data () {
    return {
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在5到30之间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' },
          { min: 20, max: 30000, message: '最少20个字', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: 'blur' }
        ]
      },
      channels: [], // 频道列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 封面
          type: 0, // 封面图片的张数
          images: [] // 封面的地址
        },
        channel_id: '' // 频道id
      },
      editorOption: { // quillEditor的配置项，用来自定义工具栏
        // 占位配置
        placeholder: '',
        modules: {
          // 配置工具栏
          toolbar: [
            ['bold', 'italic'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  computed: { },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const result = await getArticleChannels()
        // console.log(result)
        this.channels = result.data.data.channels
      } catch (err) {
        console.log(err)
      }
    },
    hAddArticle (isDraft) {
      // 先要做验证
      // this.$refs.form 是用来获取页面有ref="form"那个组件
      // validate()是el-form组件提供的验证方法
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 通过验证
          try {
            const result = await addArticle(isDraft, this.article)
            console.log(result)
            this.$message.success('发布成功')

            // 清空发布区域
            this.article.title = ''
            this.article.content = ''
          } catch (err) {
            console.log(err)
            this.$message.error('发布失败')
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang='less'>
// 在父组件中去设置子组件的样式，加上/deep/ 实现穿透功能
.publish-container /deep/ .ql-editor{
  height: 300px;
}
.publish-container /deep/ .ql-toolbar.ql-snow{
  padding: 0 8px;
}
</style>
