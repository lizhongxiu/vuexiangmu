<template>
  <el-container class="layout-container">
    <el-aside class="aside" :width="isCollapse ? '64px': '200px'">
        <div class="logo" :class="{minLogo:isCollapse}"></div>
        <el-menu
        class="nav-menu"
        default-active="/"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/articles">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/addArticle">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-setting"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/settings">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <!-- 内容有两部分：公司名 + 右侧的下拉菜单 -->
        <div>
          <i
          @click="isCollapse=!isCollapse"
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold' "></i>
          <span>江苏传智播客科技教育有限公司</span>
        </div>

        <el-dropdown>
          <!-- 默认插槽：直接显示出来 -->
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <!-- 具名插槽：设置下拉菜单的内容 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <!-- 不是所有组件都支持@click -->
            <el-dropdown-item @click.native="hQuit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { userGetProfile } from '../../api/index'
import { delUser } from '../../utils/storage'

export default {
  name: 'Layout',
  props: { },
  data () {
    return {
      user: {},
      isCollapse: false // 默认侧边栏不折叠（展开）
    }
  },
  computed: { },
  created () {
    this.$eventBus.$on('updatausername', newname => {
      console.log('在layout中', newname)
      this.user.name = newname
    })
    this.$eventBus.$on('updatauserphoto', newphoto => {
      console.log('在layout中', newphoto)
      this.user.photo = newphoto
    })
    // 组件创建完成就去调用
    this.setUserProfile()
  },
  methods: {
    // 方法：设置用户信息
    setUserProfile () {
      userGetProfile().then(res => {
        console.log(res)
        // 注意： res.data.data 这里有两层.data才能取回真正的数据
        this.user = res.data.data
      }).catch(err => {
        console.dir(err)
        // 401表示没有权限
        if (err.response.status === 401) {
          //
          alert('无权访问')
          this.$router.push('/login')
        }
      })
    },
    hQuit () {
      this.$confirm('确认退出码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser()
        this.$router.push('./login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less">
  /* 外层的容器
    占满整个页面
  */
  .layout-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .aside {
    background-color: #002033;
    .el-menu {
      border-right: none;
    }
    .logo{
        width: 100%;
        height: 60px;
        background: #002244 url(../../assets/logo_admin.png) no-repeat center / 140px auto;
      }
      // 覆盖background 的图片和大小，类书写在logo的下方。
      .minLogo{
        background-image: url(../../assets/logo_admin_01.png);
        background-size: 36px auto;
      }
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .avatar-wrap {
      display: flex;
      align-items: center;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

  .main {
    background-color: #e9eef3;
  }
</style>
