<template>
  <main style="margin-left: 10px;padding-top: 10px;">
    <div class="topLine2" >
      <div class="topLineLeft">
        <el-input placeholder="输入要搜索的产品名称" v-model="name"></el-input>
        <el-button style="margin-left:20px;" @click="search" type="primary">搜索</el-button>
        <el-button @click="addProduct" style="margin-left:20px;" type="primary">新增溯源产品</el-button>
      </div>
      <div class="topNoTittle">
        <div class="datePicker">
          <el-select v-model="areaId" @change="getSourceList">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.displayName"
              :value="item.id"
            ></el-option>
          </el-select>
          <el-date-picker
            v-model="datePicker"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd hh:mm:ss"
          ></el-date-picker>
        </div>
      </div>
    </div>
    <div style="margin-left:10px;margin-top:10px;">
      <el-table v-loading="loading" :data="tableData" style="width: 100%;">
        <el-table-column prop="sourceId" label="溯源id"></el-table-column>
        <el-table-column prop="sourceType" :formatter="sourceType" label="溯源类型"></el-table-column>
        <el-table-column prop="productType" label="品种"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="productIcon" label="产品图片">
          <template slot-scope="scope">
            <div style="width:50px;height:50px;">
              <img style="max-width:100%;max-height:100%;" :src="scope.row.productIcon" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="productDetail" label="作物"></el-table-column>
        <el-table-column prop="plantTime" label="种植时间"></el-table-column>
        <el-table-column prop="batch" label="已添加批次"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <p>
              <el-button size="mini" icon="el-icon-edit-outline" type="primary" v-if="scope.row.state == 0" @click="batchInfo(scope.row)" title="批次信息">批次信息</el-button>
              <el-button size="mini" icon="el-icon-edit-outline" type="primary" v-if="scope.row.state != 0" @click="batchInfoView(scope.row)" title="批次信息">批次信息</el-button>
              <el-button size="mini" icon="el-icon-check" type="success" v-if="scope.row.state == 0" @click="finish(scope.row)" title="归档">归档</el-button>
            </p>
            <p style="margin-top: 15px;">
              <el-button size="mini" icon="el-icon-edit" type="primary" v-if="scope.row.state == 0" @click="editArchive(scope.row)" title="维护档案">维护档案</el-button>
              <el-button size="mini" icon="el-icon-edit" type="primary" v-if="scope.row.state != 0" @click="editArchiveView(scope.row)" title="档案信息">档案信息</el-button>
              <el-button v-if="scope.row.state == 0" icon="el-icon-delete" type="danger"  size="mini" @click="deleteHandler(scope.row)" >删除</el-button>
            </p>
            <span v-if="scope.row.state == 1">已采集完毕</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:20px;">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
    <el-dialog title="新增" :visible.sync="dialogVisible">
      <el-form ref="form" :rules="formRule" :model="product" label-width="80px">
        <el-form-item label="产品名称" prop="productName" >
          <el-input style="width: 600px;" v-model="product.productName" placeholder="请输入产品名称" maxlength="50"></el-input>
        </el-form-item>
        <div class="double-line">
          <el-form-item label="产品类型" prop="productName">
            <!-- <el-input v-model="product.sourceType" placeholder="请输入大棚名称"></el-input> -->
            <el-select v-model="product.sourceType" placeholder="请选择">
              <el-option label="农业" value="0"></el-option>
              <el-option label="渔业" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="stitle+'区域'" prop="productName">
            <el-select v-model="product.areaId" :placeholder="stitle+'区域'">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.displayName"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="product.areaId" placeholder="种植区域"></el-input> -->
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item :label="stitle+'时间'" prop="productName">
            <el-date-picker
              value-format="yyyy-MM-dd hh:mm:ss"
              v-model="product.plantTime"
              type="datetime"
              :placeholder="'选择'+stitle+'时间'"
            ></el-date-picker>
            <!-- <el-input v-model="product.plantTime" placeholder="请输入产品名称"></el-input> -->
          </el-form-item>
          <el-form-item :label="stitle+'季次'" prop="productName" v-show="product.sourceType==0">
            <el-select v-model="product.season" :placeholder="'请选择'+stitle+'季次'">
              <el-option label="第一季" value="1"></el-option>
              <el-option label="第二季" value="2"></el-option>
              <el-option label="第三季" value="3"></el-option>
              <el-option label="第四季" value="4"></el-option>
            </el-select>
            <!-- <el-input v-model="product.season" placeholder="请输入种养季次"></el-input> -->
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item :label="product.sourceType==0?'种植作物':'养殖鱼类'" prop="productName">
            <el-input v-model="product.productDetail" :placeholder="'请输入'+(product.sourceType==0?'种植作物':'养殖鱼类')" maxlength="100" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item :label="stitle+'品种'" prop="productName">
            <el-input v-model="product.productType" :placeholder="'请输入'+stitle+'品种'" maxlength="100" style="width: 220px;"></el-input>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item label="负责人" prop="productName">
            <el-select v-model="product.employeeId" placeholder="请选择负责人">
              <el-option v-for="item in userList" :key="item.id" :value="item.id" :label="item.name" style="width: 220px;"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="productName">
            <el-input v-model="product.remarks" placeholder="请输入备注" maxlength="200" style="width: 220px;"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="产品简介" prop="productName" >
          <el-input style="width: 600px;" type="textarea" :row="3" v-model="product.productInformation" placeholder="请输入产品简介" maxlength="500"></el-input>
        </el-form-item>
        <el-form-item label="产品图片">
          <el-upload
            ref="upload"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
            accept="image/jpeg, image/gif, image/png"
            action
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- <el-input type="file" v-model="product.productIcon" placeholder="请输入产品图片"></el-input> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addHandler">确 定</el-button>
      </span>
    </el-dialog>
    <!--
    <el-dialog title="维护档案" :visible.sync="archiveDialogVisible" width="60%">
      <el-form :model="archiveForm" label-width="100px">
        <el-form-item label="产品名称">
          <el-input v-model="archiveForm.productName"></el-input>
        </el-form-item>
        <el-form-item label="产品图片">
          <el-upload
            ref="upload"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
            accept="image/jpeg, image/gif, image/png"
            action
          >
            <div style="width:50px;height:50px;" v-if="archiveForm.productIcon">
              <img
                style="max-width:100%;max-height:100%;"
                :src="archiveForm.productIcon"
                class="avatar"
              />
            </div>

            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="种植时间">
          <el-date-picker
            value-format="yyyy-MM-dd hh:mm:ss"
            v-model="archiveForm.plantTime"
            type="datetime"
            placeholder="种植时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="种植季度">
          <el-select v-model="archiveForm.season" placeholder="请选择种养季次">
            <el-option label="第一季" value="1"></el-option>
            <el-option label="第二季" value="2"></el-option>
            <el-option label="第三季" value="3"></el-option>
            <el-option label="第四季" value="4"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="种植作物">
          <el-input v-model="archiveForm.productDetail" placeholder="请输入种植作物"></el-input>
        </el-form-item>
        <el-form-item label="种植品种">
          <el-input v-model="archiveForm.productType" placeholder="请输入种植品种"></el-input>
        </el-form-item>

        <el-form-item label="负责人">
          <el-select v-model="archiveForm.employeeId" placeholder="请选择负责人">
            <el-option v-for="item in userList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品简介">
          <el-input v-model="archiveForm.productInformation" placeholder="请输入产品简介"></el-input>
        </el-form-item>
        <p>
          <span style="font-size:20px;color:#fff;">品质保证</span>
          <el-divider></el-divider>
        </p>
        <el-form-item label="生长期图片">
    <!-- <el-input v-model="archiveForm.growthPic" placeholder="请输入产品简介"></el-input>-->
    <!-- <i style="color:#fff;" @click="addGrowthPic" class="el-icon-plus"></i>
          <div v-for="(item,index) in GrowthPicList" :key="index">
            <el-button class="el-icon-delete" size="mini" @click="deleteGrowthPic(index)"></el-button>
            <el-form :model="GrowthPicList[index]" label-width="120px">
              <el-form-item label="拍照日期">
                <el-date-picker
                  value-format="yyyy-MM-dd hh:mm:ss"
                  v-model="GrowthPicList[index].date"
                  type="datetime"
                  placeholder="拍照日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="地理位置">
                <el-input v-model="GrowthPicList[index].loc"></el-input>
              </el-form-item>
              <el-form-item label="图片描述">
                <el-input type="textarea" v-model="GrowthPicList[index].dec"></el-input>
              </el-form-item>
              <el-form-item label="图片描述">
                <el-upload
                  ref="growthPicRef"
                  :auto-upload="false"
                  :multiple="false"
                  :limit="1"
                  accept="image/jpeg, image/gif, image/png"
                  action
    >-->
    <!-- <div style="width:50px;height:50px;" v-if="GrowthPicList[index].img">
                    <img
                      style="max-width:100%;max-height:100%;"
                      :src="GrowthPicList[index].img"
                      class="avatar"
                    />
                  </div>

                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="archiveDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="archiveDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->
  </main>
</template>
<script>
import { getWarehouseList } from '@/api/reserveInfo'
import { getMyAreaList } from '@/api/myAreaManage'
import MyStorage from '@/utils/cache'
import {
  getSourceList,
  getSourceCount,
  addProduct,
  delProduct,
  getBatchByList,
  updateArchiveFinish
} from '@/api/source'

import { queryList } from '@/api/user'
export default {
  components: {
    // VxGrowthPic
  },
  data() {
    return {
      stitle: '种植',
      addGrowpic: [],
      GrowthPicList: [],
      growthPic: 0,
      archiveDialogVisible: false,
      innerVisible: false,
      batchdialogVisible: false,
      dialogVisible: false,
      loading: true,
      name: '',
      areaId: null,
      options: [],
      bacthData: [],
      newGrowthPic: {
        date: '',
        img: '',
        loc: '',
        dec: ''
      },

      archiveForm: {},
      batchForm: {
        productId: '',
        companyId: '',
        listedTime: '',
        quotaDesc: '',
        testingRec: '',
        machiningRec: '',
        distributeRec: ''
      },
      sourceId: '',
      product: {
        companyId: '',
        areaId: '',
        sourceType: '',
        productName: '',
        plantTime: '',
        season: '',
        productDetail: '',
        productType: '',
        employeeId: '',
        remarks: '',
        productInformation: '',
        productIcon: ''
      },
      coverName: '',
      userList: '',
      inputValue: '',
      imageUrl: '',
      datePicker: [],
      pageSize: 10,
      // 总数据
      tableData: [],
      // 默认显示第几页
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      total: 0,
      // 默认每页显示的条数（可修改）
      page: 1,
      // 表单数据
      form: {
        name: '北京公园',
        label: '蔬菜大棚'
      },
      formRule: {
        productName: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ]
      },
      batchFormrule: {
        productName: [
          { required: true, message: '请输入必填项', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    'product.sourceType': {
      deep: true,
      handler(val) {
        if(val==0){
          this.stitle='种植'
        }
        if(val==1){
          this.stitle='养殖'
        }
      }
    }
  },
  computed: {
    companyId() {
      return MyStorage.getItem('companyId')
    },
    companyName() {
      return MyStorage.getItem('companyName')
    }
  },
  methods: {
    sourceType(val){
      if (val.sourceType === '0') {
        return '农业'
      } else {
        return '渔业'
      }
    },
    deleteGrowthPic(index) {
      this.GrowthPicList.splice(index, 1)
    },
    addGrowthPic() {
      this.GrowthPicList.push(this.newGrowthPic)
    },
    editArchive(row) {
      this.$router.push({
        path: 'archive',
        query: {
          data: JSON.stringify(row)
        }
      })
    },
    editArchiveView(row) {
      this.$router.push({
        path: 'archiveView',
        query: {
          data: JSON.stringify(row)
        }
      })
    },
    finish(row) {
      var para = {
        productId: row.sourceId
      }
      updateArchiveFinish(para).then(res => {
        if (res.statusCode === 1) {
          this.getSourceList()
          this.getSourceCount()
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    queryList() {
      var para = {
        page: 1,
        pageSize: 1000,
        companyId: this.companyId
      }
      queryList(para).then(res => {
        this.userList = res.result
      })
    },
    batchInfo(row) {
      this.$router.push({
        path: 'batchInfo',
        query: {
          productId: row.sourceId
        }
      })
    },
    batchInfoView(row) {
      this.$router.push({
        path: 'batchInfoView',
        query: {
          productId: row.sourceId
        }
      })
    },
    search() {
      this.getSourceList()
      this.getSourceCount()
    },
    addHandler() {
      this.$refs.form.validate(valid => {
        if (valid) {
          var That = this
          var file = this.$refs.upload.$refs['upload-inner'].$refs.input //获取文件数据
          var fileList = file.files
          var imgFile
          var reader = new FileReader() //html5读文件
          reader.readAsDataURL(fileList[0]) //转BASE64
          reader.onload = e => {
            //读取完毕后调用接口
            imgFile = e.target.result
            this.product.productIcon = imgFile
            addProduct(this.product).then(res => {
              if (res.statusCode === 1) {
                this.getSourceList()
                this.getSourceCount()
                this.dialogVisible = false
                this.$message({ message: res.message, type: 'success' })
              } else {
                this.$message({ message: res.message, type: 'warning' })
              }
            })
          }
        }
      })
    },
    addProduct() {
      this.product.companyId = this.companyId
      this.product.areaId = ''
      this.product.sourceType = ''
      this.product.productName = ''
      this.product.plantTime = ''
      this.product.season = ''
      this.product.productDetail = ''
      this.product.productType = ''
      this.product.employeeId = ''
      this.product.remarks = ''
      this.product.productInformation = ''
      this.product.productIcon = ''
      this.dialogVisible = true
    },
    getSourceList() {
      this.loading = true
      var para = {
        companyId: this.companyId,
        areaId: this.areaId,
        name: this.name,
        page: this.page,
        pageSize: 10,
        startTime: this.datePicker[0],
        endTime: this.datePicker[1]
      }
      getSourceList(para).then(res => {
        this.loading = false
        this.tableData = res.result
      })
    },
    getSourceCount() {
      var para = {
        companyId: this.companyId,
        areaId: this.areaId,
        name: this.name,
        startTime: this.datePicker[0],
        endTime: this.datePicker[1]
      }
      getSourceCount(para).then(res => {
        this.total = res.result
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.queryListCount()
      this.getSourceList()
    },
    _getWarehouseList() {
      var data = {
        companyId: this.companyId,
        page: 1,
        pageSize: 99
      }
      getMyAreaList(data).then(res => {
        if (res.statusCode === 1) {
          this.options = res.result
          this.areaId = res.result[0].id
          this.getSourceList()
          this.getSourceCount()
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    deleteHandler(row) {
      var para = {
        productId: row.sourceId
      }
      delProduct(para).then(res => {
        if (res.statusCode === 1) {
          this.getSourceList()
          this.getSourceCount()
          this.dialogVisible = false
          this.$message({ message: res.message, type: 'success' })
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    }
  },
  created() {
    this._getWarehouseList()
    this.queryList()
  }
}
</script>
<style>
  /*.el-input{width: 220px;}*/
.tittle {
  margin-left: 10px;
  padding-right: 10px;
  margin-top: 10px;
}
.topAndTittle {
  margin-top: 10px;
  margin-left: 20px;
}
.topNoTittle {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.topLine2 {
  margin-top: 10px;
  margin-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.topLineLeft {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

/*.double-line {*/
  /*display: flex;*/
/*}*/
  /*.double-line > div {*/
    /*width: 50%;*/
  /*}*/
</style>
