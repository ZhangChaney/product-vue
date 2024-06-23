<script setup lang="ts">

import {ref, onMounted} from "vue";
import { useRouter } from 'vue-router'


const router = useRouter()
onMounted( () => {
  // auth()
})

const auth = () => {
  // 登录验证
  const user = sessionStorage.getItem('username')
  if (user === '' || user == null){
    // session里没有用户信息，说明用户没有登录,跳转到登录页面
    router.push('/login')
  }else {
    // session里有用户信息，说明已经登录，可以访问首页
    router.push('/ProductManage')
  }
}

const isActive1 = ref(true)
const isActive2 = ref(false)
const isActive3 = ref(false)

const active1 = () => {
  isActive1.value = true
  isActive2.value = false
  isActive3.value = false
}

const active2 = () => {
  isActive2.value = true
  isActive1.value = false
  isActive3.value = false
}

const active3 = () => {
  isActive3.value = true
  isActive2.value = false
  isActive1.value = false
}

</script>

<template>
  <div class="common-layout">
    <el-container>

      <el-header class="header">商品管理后台</el-header>

      <el-container>

        <el-aside class="aside">
          <ul>
            <li :class="{active: isActive1}" @click="active1">
              <RouterLink to="/ProductManage">商品管理</RouterLink>
            </li>
            <li :class="{active: isActive2}" @click="active2">
              <RouterLink to="UserManage">用户管理</RouterLink>
            </li>
            <li :class="{active: isActive3}" @click="active3">
              <RouterLink to="DataCount">数据统计</RouterLink>
            </li>
          </ul>

        </el-aside>

        <el-main class="main">
          <RouterView></RouterView>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.header{
  background-color: plum;
  height: 15vh;
  line-height: 15vh;
  text-align: center;

}
.aside{
  background-color: cyan;
  height: 85vh;
  width: 12%;

  li{
    text-align: center;
    font-size: 1.3em;
    height: 60px;
    line-height: 60px;

    a{
      text-decoration: none;
      color: black;
    }

  }

}
.main{
  background-color: white;
}

.active{
  background-color: yellowgreen;
}
</style>