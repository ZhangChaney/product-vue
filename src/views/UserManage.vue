<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import http from "@/api/http";

onMounted(() => {
  getAllUsers()
})

// 对话框控制
const dialogFormVisible = ref(false)
const updateDrawer = ref(false)
const formLabelWidth = '80px'
// 表格数据
let tableData = reactive([])
// 添加用户表单数据
let userForm = reactive({
  userid: '',
  username: '',
  password: '',
  phone: '',
  email: '',
})
// 获取所有用户
const getAllUsers = async () => {
  await http({
    url: '/admin/user/getAllUser',
    method: 'get'
  }).then((res) => {
    const code = (res as any).code
    if (code > 0) {
      Object.assign(tableData, (res as any).data)
    } else {
      alert("网络超时，刷新重试！")
    }
  })
}
// 获取指定用户
const getUserById = async (user: any) => {
  const userid = user.userid
  updateDrawer.value = true
  await http({
    url: '/admin/user/getUserById/' + userid,
    method: 'get',
  }).then((res) => {
    const code = (res as any).code
    if (code > 0) {
      Object.assign(userForm, (res as any).data)
    } else {
      alert("网络超时，刷新重试！")
    }
  })

}
// 添加用户
const addUser = async () => {
  const username = userForm.username
  const password = userForm.password
  const phone = userForm.phone
  const email = userForm.email
  await http({
    url: '/admin/user/addUser',
    method: 'post',
    data: {username, password, phone, email}
  }).then((res) => {
    const code = (res as any).code
    if (code > 0) {
      location.reload()
    } else {
      alert("网络超时，刷新重试！")
    }
  })
}
// 更新用户
const updateUser = async () => {
  await http({
    url: '/admin/user/updateUser',
    method: 'put',
    data: userForm
  }).then((res) => {
    const code = (res as any).code
    if (code > 0) {
      location.reload()
    } else {
      alert("网络超时，刷新重试！")
    }
  })

}
//删除用户
const deleteUser = async (user: any) => {
  const userid = user.userid
  await http({
    url: '/admin/user/deleteUser/' + userid,
    method: 'delete'
  }).then((res) => {
    const code = (res as any).code
    if (code > 0) {
      location.reload()
    } else {
      alert("网络超时，刷新重试！")
    }
  })
}

</script>

<template>
  <!--  添加用户部分-->
  <el-button type="danger" @click="dialogFormVisible = true">添加用户</el-button>
  <el-dialog v-model="dialogFormVisible" title="添加用户" width="500">
    <el-form :model="userForm">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="userForm.username" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="userForm.password" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth">
        <el-input v-model="userForm.phone" autocomplete="off"/>
      </el-form-item>
      <el-form-item label="电子邮箱" :label-width="formLabelWidth">
        <el-input v-model="userForm.email" autocomplete="off"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="danger" plain @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" plain @click="addUser">
          添加
        </el-button>
      </div>
    </template>
  </el-dialog>

  <!--表格数据渲染-->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="userid" label="用户序号" width="auto"/>
    <el-table-column prop="username" label="用户名称" width="auto"/>
    <el-table-column prop="phone" label="手机号码" width="auto"/>
    <el-table-column prop="email" label="电子邮箱" width="auto"/>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template v-slot="scope">
        <el-button link type="primary" size="small" @click="getUserById(scope.row)">
          更新
        </el-button>

        <el-drawer v-model="updateDrawer" title="更新用户" :with-header="true">
          <el-form :model="userForm">
            <el-form-item label="用户名" :label-width="formLabelWidth" >
              <el-input disabled v-model="userForm.username" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input type="password" show-password v-model="userForm.password" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="手机号码" :label-width="formLabelWidth">
              <el-input v-model="userForm.phone" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="电子邮箱" :label-width="formLabelWidth">
              <el-input v-model="userForm.email" autocomplete="off"/>
            </el-form-item>
              <el-button type="danger" plain @click="updateDrawer = false">取消</el-button>
              <el-button type="primary" plain @click="updateUser">
                更新
              </el-button>
          </el-form>
        </el-drawer>
        <el-button link type="primary" size="small" @click="deleteUser(scope.row)">删除</el-button>
      </template>

    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>