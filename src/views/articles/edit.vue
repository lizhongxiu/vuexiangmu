<template>
  <div class='publish-container'>
    <el-card>
      <div slot="header">
        <my-breadcrumb>编辑文章</my-breadcrumb>
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
          <!-- 切换封面类型时，重置封面数组 -->
          <el-radio-group v-model="article.cover.type" @change="article.cover.images=[]">
            <!-- 根据后端接口约定 -->
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 只有用户选中有图：1张，3张 ，才使用封面组件 -->
        <el-form-item v-if="article.cover.type > 0" label="">
          <el-row :gutter="10">
              <el-col v-for="(item,idx) in article.cover.type" :key="idx" :xs="8" :sm="6" :md="6" :lg="4">
                  {{idx}}<my-cover v-model="article.cover.images[idx]"></my-cover>
              </el-col>
          </el-row>
        </el-form-item>

        <vmodel1 v-model="article.channel_id"></vmodel1>

        <el-form-item>
          <el-button type="primary" @click="hSaveArticle(false)">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import MyCover from '@/components/Mycover'
import vmodel1 from '@/components/vmodel1'
// import MyChannels from '@/components/vmodel1'
import MyBreadcrumb from '@/components/MyBreadcrumb'
// 导入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 导入组件
import { quillEditor } from 'vue-quill-editor'

import { modeArticle, getArticle } from '@/api/articles'

/**
 * 表单验证：
 * 1. 建立验证规则
 * 2. 给表单项，绑定rules及prop
 * 3. 在提交之前，调用form组件的验证方法
 */
export default {
  name: 'EditArticle',
  props: { },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    vmodel1,
    MyBreadcrumb,
    // MyChannels,
    MyCover,
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
      // channels: [], // 频道列表
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
  created () {
    // 传入当前要编辑 的文章的id
    this.loadArticle(this.$route.params.id)
  },
  methods: {
    async loadArticle (id) {
      const result = await getArticle(id)
      console.log(result)
      // 保存数据
      this.article = result.data.data
    },
    hSaveArticle (isDraft) {
      // 先要做验证
      // this.$refs.form 是用来获取页面有ref="form"那个组件
      // validate()是el-form组件提供的验证方法
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 通过验证
          try {
            const result = await modeArticle(this.article.id, this.article)
            console.log(result)
            this.$message.success('发布成功')
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
