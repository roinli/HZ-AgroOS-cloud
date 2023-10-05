<template lang="html">
  <div class="ware_list">
    <div class="header">
      <h4 class="title">设备名称 SDDSDSDSDS</h4>
      <el-input v-model="search_txt" class="search" placeholder="请输入要搜索的主控ID名称" />
      <el-button type="primary">搜索</el-button>
    </div>
    <div class="content">
      <h4 class="title">以下仓库已使用该设备</h4>
      <el-table
        :data="wareData"
        :header-cell-class-name="tableheaderClassName"
        style="width: 100%">
        <el-table-column
          prop="index"
          label="编号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="主控ID名称">
        </el-table-column>
        <el-table-column
          prop="key1"
          label="所属单元">
        </el-table-column>
        <el-table-column
          prop="key2"
          label="所属公司">
        </el-table-column>
        <el-table-column
          prop="key3"
          label="创建时间">
        </el-table-column>
        <el-table-column
          width="180"
          label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small">修改</el-button>
            <el-button type="warning" size="small" @click="menuDel(scope.row)">取消使用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search_txt: '',
      wareData: [
        {
          index: 1,
          name: '今天天气不错',
          key1: 'dasdasda',
          key2: 'asdasdadsad',
          key3: '2019-1521250'
        }
      ]
    }
  },
  methods: {
    // table头部样式
    tableheaderClassName ({ row, rowIndex }) {
      return 'table-head-th'
    }
  }
}
</script>

<style lang="scss">
.ware_list {
  padding: 30px;
  .header {
    padding-bottom: 20px;
    .title {
      padding-bottom: 10px;
      line-height: 32px;
      font-size: 16px;
      color: #fff;
      font-weight: 600;
    }
    .search {
      width: 300px;
    }
  }
  .content {
    .title {
      line-height: 20px;
      padding-bottom: 10px;
      font-size: 14px;
      color: #fff;
    }
  }
  .table-head-th {
    background: #F1F8FF;
    font-weight: 600;
    font-size: 14px;
    color: #4A4A4A;
  }
}
</style>
