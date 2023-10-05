<template>
  <div>
    <el-form>
      <el-button icon="el-icon-delete" @click="deleteHandler">删除</el-button>
      <el-form-item label="拍照日期">
        <el-date-picker
          value-format="yyyy-MM-dd hh:mm:ss"
          v-model="date"
          type="datetime"
          placeholder="拍照日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'vx-growthPic',
  data() {
    return {
      date: ''
    }
  },
  methods: {
    deleteHandler() {
      this.$emit('delete')
    }
  }
}
</script>