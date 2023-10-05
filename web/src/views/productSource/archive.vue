<template>
  <div class="vx-data" style="min-width: 900px;width:98%;">
    <el-tabs type="border-card">
      <el-tab-pane label="产品信息">
        <el-form :model="productForm" label-width="120px">
            <el-form-item label="产品名称">
              <el-input v-model="productForm.productName" style="width: 600px;" maxlength="50"></el-input>
            </el-form-item>
            <div class="double-line">
              <el-form-item label="产品类型">
                <el-select v-model="productForm.sourceType" placeholder="请选择产品类型">
                  <el-option label="农业" value="0"></el-option>
                  <el-option label="渔业" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="stitle+'区域'" prop="productName">
                <el-select v-model="productForm.areaId" :placeholder="stitle+'区域'">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.displayName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="double-line">
              <el-form-item :label="stitle+'时间'" >
                <el-date-picker
                  value-format="yyyy-MM-dd hh:mm:ss"
                  v-model="productForm.plantTime"
                  type="datetime"
                  :placeholder="'选择'+stitle+'时间'"
                ></el-date-picker>
              </el-form-item>
              <el-form-item :label="stitle+'季次'" v-show="productForm.sourceType==0">
                <el-select v-model="productForm.season" :placeholder="'请选择'+stitle+'季次'">
                  <el-option label="第一季" value="1"></el-option>
                  <el-option label="第二季" value="2"></el-option>
                  <el-option label="第三季" value="3"></el-option>
                  <el-option label="第四季" value="4"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="double-line">
              <el-form-item :label="productForm.sourceType==0?'种植作物':'养殖鱼类'">
                <el-input v-model="productForm.productDetail" :placeholder="'请输入'+(productForm.sourceType==0?'种植作物':'养殖鱼类')" style="width: 220px;"></el-input>
              </el-form-item>
              <el-form-item :label="stitle+'品种'" >
                <el-input v-model="productForm.productType" :placeholder="'请输入'+stitle+'品种'"  style="width: 220px;" maxlength="100" ></el-input>
              </el-form-item>
            </div>
            <div class="double-line">
              <el-form-item label="负责人">
                <el-select v-model="productForm.employeeId" placeholder="请选择负责人">
                  <el-option v-for="item in userList" :key="item.id" :value="item.id" :label="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="productForm.remarks" placeholder="请输入备注" style="width: 220px;" maxlength="200" ></el-input>
              </el-form-item>
            </div>
            <el-form-item label="产品简介">
              <el-input v-model="productForm.productInformation" type="textarea" placeholder="请输入产品简介" style="width: 600px;" line="5" maxlength="500"></el-input>
            </el-form-item>

            <el-form-item label="产品图片">
              <el-upload
                ref="upload"
                :multiple="false"
                :limit="1"
                accept="image/jpeg, image/gif, image/png"
                action
                :show-file-list="false"
                :before-upload="authInfoBeforeProductIconUpload"
              >
                <div style="width:50px;height:50px;" v-if="productForm.productIcon">
                  <img
                    style="max-width:100%;max-height:100%;"
                    :src="productForm.productIcon"
                    class="avatar"
                  />
                </div>

                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="生长期图片">
        <el-form >
          <el-form-item >
            <el-button @click="addDrowthPic" type="primary">添加</el-button>
            <div
              style="border-bottom: 1px dashed #606266;padding: 5px;"
              v-for="(item,index) in growthPicList"
              :key="index"
            >
              <div class="double-line">
                <div>
                  拍照时间：{{item.time}}
                </div>
                <div>地理位置：{{item.loc}}</div>
                <el-button
                  style="margin-left:100px;"
                  size="mini"
                  type="danger"
                  @click="deleteDrowthPic(index)"
                  icon="el-icon-delete"
                ></el-button>
              </div>

              <div>图片描述：{{item.dec}}</div>
              <div>
                图片：
                <div style="width:50px;height:50px;">
                  <img style="max-width:100%;max-height:100%;" :src="item.img" />
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="喂养/施肥记录">
        <el-form >
          <el-form-item >
            <el-button @click="addFer" type="primary">添加</el-button>
            <div
              style="border-bottom: 1px dashed #606266;padding: 5px;"
              v-for="(item,index) in fertilizationRec"
              :key="index"
            >
              <div class="double-line">
                <div>
                  施肥时间：{{item.time}}
                </div>
                <div>化肥名称：{{item.name}}</div>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteFer(index)"
                  icon="el-icon-delete"
                ></el-button>
              </div>
              <div class="double-line">
                <div>化肥类型：{{item.type}}</div>
                <div>化肥用量：{{item.val}}</div>
                <div style="width: 40px;"></div>
              </div>
              <div class="double-line">
                <div>化肥品牌：{{item.pinpai}}</div>
                <div>化肥供应商：{{item.gongys}}</div>
                <div style="width: 40px;"></div>
              </div>
              <div class="double-line">
                <div>土壤壤情：{{item.dec}}</div>
                <div>检测人员：{{item.testUser}}</div>
                <div style="width: 40px;"></div>
              </div>
              <div>操作人员：{{item.opUser}}</div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="用药记录">
        <el-form >
          <el-form-item >
            <el-button @click="addPesticide" type="primary">添加</el-button>
            <div style="border-bottom: 1px dashed #606266;" v-for="(item,index) in pesticideRec" :key="index">
              <div class="double-line">
                <!--<div>-->
                  <!--施肥时间：{{item.time}}-->
                <!--</div>-->
                <!--<div>化肥名称：{{item.name}}</div>-->
                <el-button
                  size="mini"
                  type="danger"
                  @click="deletePesticide(index)"
                  icon="el-icon-delete"
                ></el-button>
              </div>
              <div class="double-line">
                <div>用药时间：{{item.time}}</div>
                <div>药品名称：{{item.name}}</div>
                <div style="width: 40px;"></div>
              </div>
              <div class="double-line">
                <div>药品用量：{{item.val}}</div>
                <div>药品品牌：{{item.pinpai}}</div>
                <div style="width: 40px;"></div>
              </div>
              <div class="double-line">
                <div>药品供应商：{{item.gongys}}</div>
                <div>病因：{{item.yin}}</div>
                <div style="width: 40px;"></div>
              </div>
              <div class="double-line">
                <div>检测人员：{{item.testUser}}</div>
                <div>打药人员：{{item.opUser}}</div>
                <div style="width: 40px;"></div>
              </div>
              <div>药品出厂日期：{{item.upDate}}</div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="农事记录">
        <el-form >
          <el-form-item >
            <el-button @click="addFarmingRec" type="primary">添加</el-button>
            <div style="border-bottom: 1px dashed #606266;" v-for="(item,index) in farmingRec" :key="index">
              <div class="double-line">
                <div>
                  农事时间：{{item.time}}
                </div>
                <div>操作人员：{{item.user}}</div>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteFarmingRec(index)"
                  icon="el-icon-delete"
                ></el-button>
              </div>
              <div class="double-line">
                <div>农事内容：{{item.content}}</div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="认证信息">
        <el-form >
          <el-form-item >
            <el-button @click="addAuthInfo " type="primary">添加</el-button>
            <div
              style="border-bottom: 1px dashed #606266;padding: 5px;"
              v-for="(item,index) in authInfo"
              :key="index"
            >
              <div class="double-line">
                <div>
                  认证类型：{{item.type}}
                </div>
                <div>颁证日期：{{item.date}}</div>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteAuthInfo(index)"
                  icon="el-icon-delete"
                ></el-button>
              </div>
              <div class="double-line">
                <div>认证编号：{{item.id}}</div>
                <div>有效日期：{{item.enabelDate}}</div>
                <div style="width: 40px;"></div>
              </div>
              <div>颁证机构：{{item.jg}}</div>
              <div>
                图片：
                <div style="width:50px;height:50px;">
                  <img style="max-width:100%;max-height:100%;" :src="item.img" />
                </div>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="种源来源">
        <el-form :model="seedSource" label-width="120px">
          <div class="double-line">
            <el-form-item label="类型">
              <el-select v-model="seedSource.type">
                <el-option label="种子" value="种子"></el-option>
                <el-option label="种苗" value="种苗"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="种子名称">
              <el-input v-model="seedSource.name" style="width: 220px;"></el-input>
            </el-form-item>
          </div>
          <div class="double-line">
            <el-form-item label="种子生产厂家">
              <el-input v-model="seedSource.source" style="width: 220px;" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="采购与入库日期">
              <el-date-picker
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="seedSource.inDate"
                type="datetime"
                placeholder="采购与入库日期"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="double-line">
            <el-form-item label="种子出厂日期">
              <el-date-picker
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="seedSource.outDate"
                type="datetime"
                placeholder="采购与入库日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="采购人">
              <el-select v-model="seedSource.user">
                <el-option v-for="item in userList" :key="item.id" :value="item.name" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="double-line">
            <el-form-item label="生产合格证">
              <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUploadImg1"
              >
                <div style="width:100px;height:100px;" v-if="seedSource.img1">
                  <img style="max-width:100%;max-height:100%;" :src="seedSource.img1" class="avatar" />
                </div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="销售商的记录或证书	">
              <el-upload
                class="avatar-uploader"
                action
                :show-file-list="false"
                :before-upload="beforeAvatarUploadImg2"
              >
                <div style="width:100px;height:100px;" v-if="seedSource.img2">
                  <img style="max-width:100%;max-height:100%;" :src="seedSource.img2" class="avatar" />
                </div>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </div>
        </el-form>
        <el-form :model="seedSource" label-width="120px">
          <el-form-item label="非转基因证明">
            <el-upload
              class="avatar-uploader"
              action
              :show-file-list="false"
              :before-upload="beforeAvatarUploadImg3"
            >
              <div style="width:100px;height:100px;" v-if="seedSource.img3">
                <img style="max-width:100%;max-height:100%;" :src="seedSource.img3" class="avatar" />
              </div>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="种值周期信息">
        <el-form :model="growingCycles" label-width="120px">
          <div class="double-line">
            <el-form-item label="播种日期">
              <el-date-picker
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="growingCycles.val1"
                type="datetime"
                placeholder="采购与入库日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="幼苗存活率">
              <el-input type="number" v-model="growingCycles.val2" style="width: 220px;" maxlength="10"></el-input>
            </el-form-item>
          </div>
          <div class="double-line">
            <el-form-item label="挂果日期">
              <el-date-picker
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="growingCycles.val3"
                type="datetime"
                placeholder="采购与入库日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="成熟日期日期">
              <el-date-picker
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="growingCycles.val4"
                type="datetime"
                placeholder="采购与入库日期"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="double-line">
            <el-form-item label="收获日期">
              <el-date-picker
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="growingCycles.val5"
                type="datetime"
                placeholder="采购与入库日期"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="挂果率">
              <el-input type="number" v-model="growingCycles.val6" style="width: 220px;" maxlength="10"></el-input>
            </el-form-item>
          </div>
          <div class="double-line">
            <el-form-item label="化肥残留量">
              <el-input type="number" v-model="growingCycles.val7" style="width: 220px;" maxlength="10"></el-input>
            </el-form-item>

            <el-form-item label="记录日期">
              <el-date-picker
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="growingCycles.val8"
                type="datetime"
                placeholder="采购与入库日期"
              ></el-date-picker>
            </el-form-item>
          </div>
          <el-form-item label="记录人">
            <el-select v-model="growingCycles.val9">
              <el-option v-for="item in userList" :key="item.id" :value="item.name" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="其他信息">
        <el-form >
          <el-form-item style="margin-top:20px" label="环境数据">
            <el-checkbox-group v-model="envDataCK" >
              <el-checkbox :label="item.id" v-for="(item,i) in envData">{{item.deviceName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item style="margin-top:20px" label="销售人员信息">
            <el-select v-model="saler" multiple style="width: 600px;">
              <el-option v-for="item in userList" :key="item.id" :value="item.id" :label="item.name" ></el-option>
            </el-select>
          </el-form-item>
          <el-form label-width="100px">

            网 店 链 接 :
            <el-button @click="addWebLinks" size="mini" icon="el-icon-plus" type="primary"></el-button>
            <el-form-item
              style="margin-top:20px"
              v-for="(item,index) in webLinks"
              :key="index"
              label="网店链接"
            >
              <el-input style="width:300px" v-model="webLinks[index]" maxlength="50"></el-input>
              <el-button type="danger" @click="delWebLink(index)" icon="el-icon-delete"></el-button>
            </el-form-item>
          </el-form>
          <el-form style="margin-top:20px" label-width="100px">
            实体店地址:
            <el-button @click="addshopAddress" size="mini" icon="el-icon-plus" type="primary"></el-button>
            <el-form-item
              style="margin-top:20px"
              v-for="(item,index) in shopAddress"
              :key="index"
              label="实体店地址"
            >
              <el-input style="width:300px" v-model="shopAddress[index]" maxlength="50"></el-input>
              <el-button type="danger" @click="delshopAddress(index)" icon="el-icon-delete"></el-button>
            </el-form-item>
          </el-form>
      </el-form>


      </el-tab-pane>
    </el-tabs>
    <div style="padding:20px;width: 100%;text-align: center;background-color: #051929">
      <el-button @click="$router.back()">取消</el-button>
      <el-button type="primary" @click="Confim">提交</el-button>
    </div>
    <el-dialog :visible.sync="GrowthPicDialog" width="50%">
      <el-form :model="GrowthPicForm" label-width="120px">
        <div class="double-line">
          <el-form-item label="拍照日期">
            <el-date-picker
              value-format="yyyy-MM-dd hh:mm:ss"
              v-model="GrowthPicForm.time"
              type="datetime"
              placeholder="拍照日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="地理位置">
            <el-input v-model="GrowthPicForm.loc" style="width: 220px;" maxlength="100"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="图片描述">
          <el-input type="textarea" v-model="GrowthPicForm.dec" style="width: 600px;" maxlength="500"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <div style="width:100px;height:100px;" v-if="GrowthPicForm.img">
              <img style="max-width:100%;max-height:100%;" :src="GrowthPicForm.img" class="avatar" />
            </div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="GrowthPicDialog = false">取 消</el-button>
        <el-button type="primary" @click="GrowthPicConfim">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 增加施肥记录 -->
    <el-dialog title="增加喂养/施肥记录" :visible.sync="ferPicDialog" width="50%">
      <el-form :model="ferForm" label-width="120px">
        <div class="double-line">
          <el-form-item label="喂养/施肥日期">
            <el-date-picker
              value-format="yyyy-MM-dd hh:mm:ss"
              v-model="ferForm.time"
              type="datetime"
              placeholder="喂养/施肥日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="饲料/化肥名称">
            <el-input v-model="ferForm.name" style="width: 220px;" maxlength="50"></el-input>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item label="饲料/化肥类型">
            <el-input v-model="ferForm.type" style="width: 220px;" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="饲料/化肥用量">
            <el-input v-model="ferForm.val" style="width: 220px;" maxlength="50"></el-input>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item label="饲料/化肥品牌">
            <el-input v-model="ferForm.pinpai" style="width: 220px;" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="饲料/化肥供应商">
            <el-input v-model="ferForm.gongys" style="width: 220px;" maxlength="50"></el-input>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item label="喂养/施肥操作员">
            <!-- <el-input v-model="ferForm.dec"></el-input> -->
            <el-select v-model="ferForm.opUser" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="土壤壤情" >-->
            <!--<el-input v-model="ferForm.dec" style="width: 220px;" maxlength="50"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="检测人员">
            <!-- <el-input v-model="ferForm.dec"></el-input> -->
            <el-select v-model="ferForm.testUser" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ferPicDialog = false">取 消</el-button>
        <el-button type="primary" @click="ferConfim">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 增加用药记录 -->
    <el-dialog title="增加用药记录" :visible.sync="pesticideDialog" width="50%">
      <el-form :model="pesticideForm" label-width="120px">
        <!--<div class="double-line">-->
          <!--<el-form-item label="用药时间">-->
            <!--<el-date-picker-->
              <!--value-format="yyyy-MM-dd hh:mm:ss"-->
              <!--v-model="pesticideForm.time"-->
              <!--type="datetime"-->
              <!--placeholder="用药时间"-->
            <!--&gt;</el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="药品名称">-->
            <!--<el-input v-model="pesticideForm.name" style="width: 220px;" maxlength="50"></el-input>-->
          <!--</el-form-item>-->
        <!--</div>-->
        <div class="double-line">
          <el-form-item label="药品用量">
            <el-input v-model="pesticideForm.val" style="width: 220px;" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="药品品牌">
            <el-input v-model="pesticideForm.pinpai" style="width: 220px;" maxlength="50"></el-input>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item label="药品供应商">
            <el-input v-model="pesticideForm.gongys" style="width: 220px;" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="病因">
            <el-input v-model="pesticideForm.yin" style="width: 220px;" maxlength="50"></el-input>
          </el-form-item>
        </div>
        <div class="double-line">
          <el-form-item label="检测人员">
            <el-select v-model="pesticideForm.testUser" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="打药人员">
            <el-select v-model="pesticideForm.opUser" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="药品生产日期">
          <el-date-picker
            value-format="yyyy-MM-dd hh:mm:ss"
            v-model="pesticideForm.upDate"
            type="datetime"
            placeholder="药品生产日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pesticideDialog = false">取 消</el-button>
        <el-button type="primary" @click="pesticideConfim">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 增加农事记录 -->
    <el-dialog title="增加农事记录" :visible.sync="farmingRecDialog" width="50%">
      <el-form :model="farmingRecForm" label-width="120px">
        <div class="double-line">
          <el-form-item label="农事时间">
            <el-date-picker
              value-format="yyyy-MM-dd hh:mm:ss"
              v-model="farmingRecForm.time"
              type="datetime"
              placeholder="农事时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="操作人员">
            <el-select v-model="farmingRecForm.user" placeholder="请选择">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :value="item.name"
                :label="item.name"
              ></el-option>
            </el-select>
            <!-- <el-input v-model="farmingRecForm.user"></el-input> -->
          </el-form-item>
        </div>
        <el-form-item label="农事内容">
          <el-input v-model="farmingRecForm.content" style="width: 600px;" maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="farmingRecDialog = false">取 消</el-button>
        <el-button type="primary" @click="farmingRecConfim">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新增认证信息 -->
    <el-dialog title="增加认证信息" :visible.sync="authInfoDialog" width="50%">
      <el-form :model="authInfoForm">
        <div class="double-line">
          <el-form-item label="认证类型">
            <el-select v-model="authInfoForm.type">
              <el-option
                v-for="(item,index) in authInfoType"
                :key="index"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="颁证日期">
            <el-date-picker
              value-format="yyyy-MM-dd hh:mm:ss"
              v-model="authInfoForm.date"
              type="datetime"
              placeholder="颁证日期"
            ></el-date-picker>
          </el-form-item>

        </div>
        <div class="double-line">
          <el-form-item label="证书编号">
            <el-input v-model="authInfoForm.id" style="width: 220px;" maxlength="50"></el-input>
          </el-form-item>
          <el-form-item label="有效日期">
            <el-date-picker
              value-format="yyyy-MM-dd hh:mm:ss"
              v-model="authInfoForm.enabelDate"
              type="datetime"
              placeholder="有效日期"
            ></el-date-picker>
          </el-form-item>
        </div>



        <el-form-item label="颁证机构">
          <el-input v-model="authInfoForm.jg" style="width: 600px;"></el-input>
        </el-form-item>
        <el-form-item label="检测图片">
          <el-upload
            class="avatar-uploader"
            action
            :show-file-list="false"
            :before-upload="authInfoBeforeAvatarUpload"
          >
            <div style="width:100px;height:100px;" v-if="authInfoForm.img">
              <img style="max-width:100%;max-height:100%;" :src="authInfoForm.img" class="avatar" />
            </div>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="authInfoDialog = false">取 消</el-button>
        <el-button type="primary" @click="authInfoConfim">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>
<script>
import { getMyAreaList } from '@/api/myAreaManage'
import { getDeviceInfoList } from '@/api/deviceInfo'
import { queryList } from '@/api/user'
import { getArchive, updateArchive, upoadBaseImgData } from '@/api/source'
import MyStorage from '@/utils/cache'
import { format } from 'path'
export default {
  data() {
    return {
      stitle: '种植',
      saler: '',
      growingCycles: {
        val1: '',
        val2: '',
        val3: '',
        val4: '',
        val5: '',
        val6: '',
        val7: '',
        val8: '',
        val9: ''
      },
      shopAddress: [],
      webLinks: [],
      envData: [],
      envDataCK: [],
      seedSource: {
        type: '',
        name: '',
        source: '',
        inDate: '',
        outDate: '',
        user: '',
        img1: '',
        img2: '',
        img3: ''
      },
      authInfoDialog: false,
      authInfoType: [
        { name: '农药残留检测' },
        { name: '无公害农产品认证' },
        { name: '绿色食品认证' },
        { name: '有机食品认证' },
        { name: 'HACCP认证' },
        { name: '土壤检测报告' },
        { name: '国家地理认证' },
        { name: '食品安全检测报告' },
        { name: 'ISO质量管理体系认证' },
        { name: '优良种子认证' },
        { name: 'ISO食品安全管理体系认证' },
        { name: '大米检测报告' },
        { name: '营养检测报告' },
        { name: 'QS食品质量安全认证' },
        { name: '食品流通许可证' },
        { name: '大米监测报告' },
        { name: '其他认证' }
      ],
      authInfoForm: {
        type: '',
        date: '',
        id: '',
        enabelDate: '',
        jg: '',
        img: ''
      },
      farmingRecDialog: false,
      farmingRecForm: {
        time: '',
        content: '',
        user: ''
      },
      pesticideDialog: false,
      pesticideForm: {
        time: '',
        name: '',
        val: '',
        pinpai: '',
        gongys: '',
        yin: '',
        testUser: '',
        opUser: '',
        upDate: ''
      },
      ferForm: {
        time: '',
        name: '',
        type: '',
        val: '',
        pinpai: '',
        gongys: '',
        dec: '',
        testUser: '',
        opUser: ''
      },
      ferPicDialog: false,
      GrowthPicDialog: false,
      userList: [],
      GrowthPicForm: {
        time: '',
        loc: '',
        dec: '',
        img: ''
      },
      growthPicList: [],
      fertilizationRec: [],
      pesticideRec: [],
      farmingRec: [],
      authInfo: [],
      productForm: {
        productId: '',
        sourceType: '',
        productName: '',
        areaId: '',
        productIcon: '',
        plantTime: '',
        season: '',
        productDetail: '',
        productType: '',
        employeeId: '',
        remarks: '',
        productInformation: '',
        growthPic: [],
        fertilizationRec: '',
        pesticideRec: '',
        farmingRec: '',
        authInfo: '',
        growingCycles: '',
        seedSource: '',
        webLinks: '',
        shopAddress: '',
        fertilizer: '',
        envData: '',
        saler: '',
        custom: '',
        fishSource: '',
        growInfo: '',
        feedInfo: '',
        vaccineInfo: '',
        drugInfo: ''
      },
      options: []
    }
  },
  watch: {
    'productForm.sourceType': {
      deep: true,
      handler(val) {
        if(val==0){
          this.stitle='种植'
        }
        if(val==1){
          this.stitle='养殖'
        }
      }
    },
    'productForm.areaId': {
      handler(val) {
        this._getDeviceInfoList();
      }
    },
  },
  created() {
    this.productForm =  Object.assign(this.productForm,JSON.parse(this.$route.query.data));
    this.productForm.productId = JSON.parse(this.$route.query.data).sourceId
    this.queryList()
    var para = {
      productId: JSON.parse(this.$route.query.data).sourceId
    }
    getArchive(para).then(res => {
      res = res.result
      this.productForm.plantTime = res.plantTime
      this.productForm.season = res.season
      this.productForm.productInformation = res.productInformation
      this.productForm.employeeId = res.employeeId
      this.productForm.areaId = res.areaId
      this.productForm.remarks = res.remarks
      if (res.growthPic) {
        this.growthPicList = res.growthPic.split('#')
        this.growthPicList.forEach((element, index) => {
          this.growthPicList[index] = JSON.parse(this.growthPicList[index])
        })
      }
      if (res.fertilizationRec) {
        this.fertilizationRec = res.fertilizationRec.split('#')
        this.fertilizationRec.forEach((element, index) => {
          this.fertilizationRec[index] = JSON.parse(
            this.fertilizationRec[index]
          )
        })
      }
      if (res.pesticideRec) {
        this.pesticideRec = res.pesticideRec.split('#')
        this.pesticideRec.forEach((element, index) => {
          this.pesticideRec[index] = JSON.parse(this.pesticideRec[index])
        })
      }
      if (res.farmingRec) {
        this.farmingRec = res.farmingRec.split('#')
        this.farmingRec.forEach((element, index) => {
          this.farmingRec[index] = JSON.parse(this.farmingRec[index])
        })
      }
      if (res.authInfo) {
        this.authInfo = res.authInfo.split('#')
        this.authInfo.forEach((element, index) => {
          this.authInfo[index] = JSON.parse(this.authInfo[index])
        })
      }
      if (res.growingCycles) {
        this.growingCycles = JSON.parse(res.growingCycles)
      }
      if (res.seedSource) {
        this.seedSource = JSON.parse(res.seedSource)
      }
      if (res.envDataIds) {
        this.envDataCK = res.envDataIds.split(',')
      }
      if (res.webLinks) {
        this.webLinks = res.webLinks.split('#')
      }
      if (res.shopAddress) {
        this.shopAddress = res.shopAddress.split('#')
      }
      if (res.saler) {
        this.saler = res.salerList.map((item)=>{
          return item.id
        })
      }
      this._getDeviceInfoList();
    })
    this._getWarehouseList();
    // this.productForm.growthPic = []
  },
  methods: {
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
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    Confim() {
      // 生长期图片
      this.growthPicList.forEach((element, index) => {
        this.growthPicList[index] = JSON.stringify(this.growthPicList[index])
      })
      this.productForm.growthPic = this.growthPicList.join('#')
      // 施肥记录
      this.fertilizationRec.forEach((element, index) => {
        this.fertilizationRec[index] = JSON.stringify(
          this.fertilizationRec[index]
        )
      })
      this.productForm.fertilizationRec = this.fertilizationRec.join('#')

      // 用药记录
      this.pesticideRec.forEach((element, index) => {
        this.pesticideRec[index] = JSON.stringify(this.pesticideRec[index])
      })
      this.productForm.pesticideRec = this.pesticideRec.join('#')
      // 农事记录
      this.farmingRec.forEach((element, index) => {
        this.farmingRec[index] = JSON.stringify(this.farmingRec[index])
      })
      this.productForm.farmingRec = this.farmingRec.join('#')

      // 认证信息
      this.authInfo.forEach((element, index) => {
        this.authInfo[index] = JSON.stringify(this.authInfo[index])
      })
      this.productForm.authInfo = this.authInfo.join('#')
      // 种植周期
      this.productForm.growingCycles = JSON.stringify(this.growingCycles)
      // 种子来源/种苗来源
      this.productForm.seedSource = JSON.stringify(this.seedSource)

      // 网店链接
      this.productForm.webLinks = this.webLinks.join('#')

      // 实体店地址
      this.productForm.shopAddress = this.shopAddress.join('#')

      // 环境数据
      this.productForm.envData = this.envDataCK.join(',')

      // 售卖人id
      this.productForm.saler = this.saler.join('#');

      updateArchive(this.productForm).then(res => {
        if (res.statusCode === 1) {
          this.$message({ message: res.message, type: 'success' })
          this.$router.back()
        } else {
          this.$message({ message: res.message, type: 'warning' })
        }
      })
    },
    addshopAddress() {
      this.shopAddress.push('')
    },
    delshopAddress(index) {
      this.shopAddress.splice(index, 1)
    },
    delWebLink(index) {
      this.webLinks.splice(index, 1)
    },
    addWebLinks() {
      this.webLinks.push('')
    },
    beforeAvatarUploadImg3(file) {
      var reader = new FileReader() //html5读文件
      reader.readAsDataURL(file) //转BASE64
      reader.onload = e => {
        var para = {
          baseImgData: e.target.result
        }
        upoadBaseImgData(para).then(res => {
          this.seedSource.img3 = res.result
        })
        // this.seedSource.img3 = e.target.result
      }
    },
    beforeAvatarUploadImg2(file) {
      var reader = new FileReader() //html5读文件
      reader.readAsDataURL(file) //转BASE64
      reader.onload = e => {
        var para = {
          baseImgData: e.target.result
        }
        upoadBaseImgData(para).then(res => {
          this.seedSource.img2 = res.result
        })
        // this.seedSource.img2 = e.target.result
      }
    },
    beforeAvatarUploadImg1(file) {
      var reader = new FileReader() //html5读文件
      reader.readAsDataURL(file) //转BASE64
      reader.onload = e => {
        var para = {
          baseImgData: e.target.result
        }
        upoadBaseImgData(para).then(res => {
          this.seedSource.img1 = res.result
        })
        // this.seedSource.img1 = e.target.result
      }
    },
    deleteAuthInfo(index) {
      this.authInfo.splice(index, 1)
    },
    authInfoConfim() {
      this.authInfo.push({
        type: this.authInfoForm.type,
        date: this.authInfoForm.date,
        id: this.authInfoForm.id,
        enabelDate: this.authInfoForm.enabelDate,
        jg: this.authInfoForm.jg,
        img: this.authInfoForm.img
      })
      this.authInfoDialog = false
    },
    authInfoBeforeAvatarUpload(file) {
      var reader = new FileReader() //html5读文件

      reader.readAsDataURL(file) //转BASE64
      reader.onload = e => {
        var para = {
          baseImgData: e.target.result
        }
        upoadBaseImgData(para).then(res => {
          this.authInfoForm.img = res.result
        })
      }
    },
    authInfoBeforeProductIconUpload(file) {
      var reader = new FileReader() //html5读文件

      reader.readAsDataURL(file) //转BASE64
      reader.onload = e => {
        var para = {
          baseImgData: e.target.result
        }
        upoadBaseImgData(para).then(res => {
          this.productForm.productIcon = res.result;
        })
      }
    },
    addAuthInfo() {
      this.authInfoForm.type = ''
      this.authInfoForm.date = ''
      this.authInfoForm.id = ''
      this.authInfoForm.enabelDate = ''
      this.authInfoForm.jg = ''
      this.authInfoForm.img = ''
      this.authInfoDialog = true
    },
    deleteFarmingRec(index) {
      this.farmingRec.splice(index, 1)
    },
    farmingRecConfim() {
      this.farmingRec.push({
        time: this.farmingRecForm.time,
        content: this.farmingRecForm.content,
        user: this.farmingRecForm.user
      })
      this.farmingRecDialog = false
    },
    addFarmingRec() {
      this.farmingRecForm.time = ''
      this.farmingRecForm.content = ''
      this.farmingRecForm.user = ''
      this.farmingRecDialog = true
    },
    deletePesticide(index) {
      this.pesticideRec.splice(index, 1)
    },
    pesticideConfim() {
      this.pesticideRec.push({
        time: this.pesticideForm.time,
        name: this.pesticideForm.name,
        val: this.pesticideForm.val,
        pinpai: this.pesticideForm.pinpai,
        gongys: this.pesticideForm.gongys,
        yin: this.pesticideForm.yin,
        testUser: this.pesticideForm.testUser,
        opUser: this.pesticideForm.opUser,
        upDate: this.pesticideForm.upDate
      })
      this.pesticideDialog = false
    },

    addPesticide() {
      this.pesticideForm.time = ''
      this.pesticideForm.name = ''
      this.pesticideForm.val = ''
      this.pesticideForm.pingpai = ''
      this.pesticideForm.gongys = ''
      this.pesticideForm.yin = ''
      this.pesticideForm.testUser = ''
      this.pesticideForm.opUser = ''
      this.pesticideForm.upDate = ''
      this.pesticideDialog = true
    },
    deleteFer(index) {
      this.fertilizationRec.splice(index, 1)
    },
    ferConfim() {
      this.fertilizationRec.push({
        time: this.ferForm.time,
        name: this.ferForm.name,
        type: this.ferForm.type,
        val: this.ferForm.val,
        pinpai: this.ferForm.pinpai,
        gongys: this.ferForm.gongys,
        dec: this.ferForm.dec,
        testUser: this.ferForm.testUser,
        opUser: this.ferForm.opUser
      })
      this.ferPicDialog = false
    },
    addFer() {
      this.ferForm.time = ''
      this.ferForm.name = ''
      this.ferForm.type = ''
      this.ferForm.val = ''
      this.ferForm.pinpai = ''
      this.ferForm.gongys = ''
      this.ferForm.dec = ''
      this.ferForm.testUser = ''
      this.ferForm.opUser = ''
      this.ferPicDialog = true
    },
    deleteDrowthPic(index) {
      this.growthPicList.splice(index, 1)
    },
    GrowthPicConfim() {
      this.growthPicList.push({
        time: this.GrowthPicForm.time,
        loc: this.GrowthPicForm.loc,
        dec: this.GrowthPicForm.dec,
        img: this.GrowthPicForm.img
      })
      this.GrowthPicDialog = false
    },
    beforeAvatarUpload(file) {
      var reader = new FileReader() //html5读文件

      reader.readAsDataURL(file) //转BASE64
      reader.onload = e => {
        var para = {
          baseImgData: e.target.result
        }
        upoadBaseImgData(para).then(res => {
          this.GrowthPicForm.img = res.result
        })
      }
    },
    addDrowthPic() {
      this.GrowthPicForm.time = ''
      this.GrowthPicForm.loc = ''
      this.GrowthPicForm.dec = ''
      this.GrowthPicForm.img = ''
      this.GrowthPicDialog = true
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
    _getDeviceInfoList() {
      var data = {
        companyId: this.companyId,
        areaId: this.productForm.areaId,
        deviceType: 0,
        page: 1,
        pageSize: 99
      }
      getDeviceInfoList(data).then(res => {
        this.envData = res.result;
      })
    }
  },
  computed: {
    companyId() {
      return MyStorage.getItem('companyId')
    }
  }
}
</script>
<style lang="scss">
  .el-input__inner,.el-textarea__inner{
    color: #fff!important;
  }
  .el-tabs__content{
    min-height: 450px;
  }
  .el-tabs--border-card{
    background: #051929;
    font-size: 14px;
    color: #fff;
    border:none;
  }
  .el-tabs__item{
    color: #fff!important;
  }
  .el-tabs--border-card>.el-tabs__header{
    background-color: #051929!important;
  }
  .el-tabs__nav>.is-active{
    background-color: #051929!important;
    color: #409EFF!important;
  }
  .el-form-item__label{
    color: #fff!important;
  }
.vx-data {
  margin-left: 20px;
  margin-top: 20px;
}
</style>
