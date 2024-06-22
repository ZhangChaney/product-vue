<script setup lang="ts">
import { reactive, ref } from 'vue'
import router from "@/router";
import http from "@/api/http";
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名！'))
  } else {
    callback()
  }
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码！'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
})

const rules = reactive<FormRules<typeof ruleForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
})

const login = (formEl: FormInstance | undefined) => {
  let username = ruleForm.username
  let password = ruleForm.password
  // alert('开始请求登录！')
  // 使用axios发送请求
  http({
    url: '/admin/user/login',
    method: 'post',
    data: {username, password}
  }).then(res => {
    // 1.登录成功完成跳转，并存储用户信息
    const code = (res as any).code
    if (code > 0){
      sessionStorage.setItem("username", (res as any).data.username)
      sessionStorage.ge
      router.replace('/')
    }else {
      // 2. 登录失败
      alert((res as any).message)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="container">
    <div class="form">
      <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
              v-model="ruleForm.password"
              type="password"
              autocomplete="off"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login(ruleFormRef)">
            Login
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<style scoped>
.container{
  background: radial-gradient(circle, cyan, plum);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;

  .form{
    padding: 15px;
    margin-top: 20vh;
    width: 40%;
    height: 25vh;
    border: black 1px solid;
    border-radius: 10px;
    background-color: white;
  }

}
</style>