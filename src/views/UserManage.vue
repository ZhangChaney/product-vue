<script setup lang="ts">
import {onMounted, reactive} from "vue";
import http from "@/api/http";

onMounted(() => {
  http({
    url: '/admin/user/getAllUser',
    method: 'get'
  }).then((res) => {
    const code = (res as any).code
    if (code > 0){
      tableData = Object.assign( tableData, (res as any).data)
    }else {
      alert("网络超时，刷新重试！")
    }
  })
})

let tableData = reactive([

])
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="userid" label="用户序号" width="180" />
    <el-table-column prop="username" label="用户名称" width="180" />
    <el-table-column prop="phone" label="手机号码" />
  </el-table>
</template>

<style scoped>

</style>