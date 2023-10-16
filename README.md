
***
***

### 智慧农业公众号，算是一个有个讨论的地方,有什么需要支持的可以联系

<img src="https://img-blog.csdnimg.cn/86e0196b0ad54c66b59fe64c51ff9d96.png"/>


### 开源智慧农业物联网平台(Version:3.0.2)


> 体验地址， V3 star star ： [点我访问](http://zhny-user-font.nxptdn.com)   http://zhny-user-font.nxptdn.com    18601938676/222112(如遇无法登录请私信：18601938676)    

> 体验地址， V2 star star ： [点我访问](http://yun.nxptdn.com)   


#### 一、简介


> 开源智慧农业物联网平台(Version:3.0.1)，支持（设备端-APP端-平台端-管理端）全业务场景包含设备采集系统、监控控制系统、溯源系统、专家系统、仓库系统，大屏系统，开源版本毫无保留给个人及企业免费使用。
> 初心：做了很多产品项目都商业落地了但是仅仅服务商业本身无法释放产品的价值，不在重复造轮子，让更多的企业和个人能够减少投入，欢迎讨论交流加群，微信18601938676  

#### 二、架构图
<table>
    <tr>
<img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/1-1.jpg"/>
    </tr>
</table>

#### 三、软件架构
```
* APP端: 安卓系统/ios/公众号/小程序
* 平台端：Springboot Mybatis Mysql vue Netty Redis(可选)/集群版本SpringCloud
* 管理端：Springboot Mybatis Mysql vue
* 摄像头：接入宇视、海康摄像头
```
#### 四、通讯协议（软硬间通讯）
```
支持两种方式：MQTT协议，TCP协议(常用)
```
<table>
    <tr>
        <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/2-xieyitu.jpg"/></td>
    </tr>
</table>

#### 五、产品功能

<img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/3-gongnengtu.jpg" />

---
***

```
采集系统：使用MQQT、TCP协议进行数据通讯采集硬件的信息
监控控制系统：主要分为设备的控制和视频监控如引入海康、宇视的视频
溯源系统：采集录入各个阶段的农产品生长销售信息
专家系统：提供行业专家实时讨论咨询
大屏系统：完整展示平台采集信息分析以及预警信息、设备状态等
```
#### 六、团队计划
```
- 用心做产品，不以赚钱为目的。
- 搭建基础性鲸哩物联网快速开发平台。
- 软件架构升级SpringCloud/产品细节优化
- 推广促进更多厂家和硬件开发者接入鲸哩智慧农业物联网云平台
- 以前做过：智慧农业，智能充电桩云平台，AI计算中心，智慧农业，智慧工业，高效节水，水肥一体化，污水处理，计量计费，水质检测，智慧大棚，农业项目
```
#### 七、如何部署
```---
请参考每个工程都有READEME.md文档（详细的开发性文档）
- 1. 导入MySQL数据库，从MySQLw文件夹中找到v3.0_zhny.sql导入到数据库中
- 2. 导入工程
- 3. 启动后端接口 
- 4. 启动前端界面

```
##### 八、实施现场和PC/手机端截图

<table>
    <tr>
        <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/4-Login.jpg"/></td>
    </tr>
</table>

<table>
    <tr>
        <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/5-Home111111.jpg"/></td>
    </tr>
</table>
<table>
    <tr>
        <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/6-xianchang-1.jpg"/></td>
        <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/6-xianchang-2.jpg"/></td>
    </tr>
</table>
<table>
    <tr>
        <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/7-shouji1.jpg"/></td>
        <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/7-shouji2.jpg"/></td>
     </tr>
    <tr>
        <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/8-shouji3.jpg"/></td>
        <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/9-shouji4.jpg"/></td>
    </tr>
    <tr>
       <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/10-shouji5.jpg"/></td>
       <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/11-shouji6.jpg"/></td>
   </tr> 
</table>


##### 九、满足不限于以下场景
<table>
    <tr>
        <td><img src="https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/img/12-changjing.jpg"/></td>
    </tr>
</table>



#### 十、代码贡献者鸣谢
小兵（全栈工程师）、鹤文（后端资深工程师）、徐帅(前端工程师)、亮亮（嵌入式架构师）、梁明（普天动能科技 CEO）、任伟军(万达 产品经理)、赵凡（APP安卓/ios工程师）


#### 十一、案例

> [宁夏贺兰渔业商业落地项目](http://www.nxptdn.com/article/29)

> [广州自然微生物集装箱渔业项目](http://www.nxptdn.com/article/28)

#### 十一、版本

> [鲸哩农业平台v2.0.1演示地址](http://yun.nxptdn.com)

> [鲸哩农业平台v2.0.1](https://gitee.com/dnxt111/wisdom-v2.0.git) 

> [鲸哩农业平台v3.0.1](https://wenhui-1251454246.cos.ap-nanjing.myqcloud.com/doc/version/%E8%A1%8C%E8%80%85%E5%86%9C%E4%B8%9A%E5%B9%B3%E5%8F%B0v3.0.1.md) 

#### 十二、解决方案

> [鲸哩水稻灌溉解决方案](http://wenhui.nxptdn.com/article/17)  

> [鲸哩智慧园林灌溉解决方案](http://wenhui.nxptdn.com/article/2) 

> [鲸哩智能温室大棚解决方案](http://wenhui.nxptdn.com/article/21)  


