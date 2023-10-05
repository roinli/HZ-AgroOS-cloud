<template lang="html">
  <div class="ement_manage">
    <h4 class="ement-title" v-if="detailInfo.index == 1">企业名称:&nbsp; {{companyName}}&nbsp;单元名称:&nbsp;{{detailInfo.displayName}}</h4>
    <h4 class="ement-title" v-else-if="detailInfo.index == 2">企业名称:&nbsp; {{companyName}}&nbsp;仓库名称:&nbsp;{{detailInfo.display_name}}</h4>
    <deviceCommon :manageTypes="manageTypes" :companyId="companyId" :detailInfo="detailInfo" />
  </div>
</template>

<script>
import MyStorage from '@/utils/cache'
// import { mapGetters } from 'vuex'
import deviceCommon from '@/views/common/device_common'

export default {
  data() {
    return {
      // 传值类型
      manageTypes: 1
    }
  },

  methods: {},
  mounted() {},
  computed: {
    // ...mapGetters(['busiid', 'businame', 'controlinfo']),
    detailInfo() {
      return this.$route.query
    },
    companyId() {
      return MyStorage.getItem('companyId')
    },
    companyName() {
      return MyStorage.getItem('companyName')
    }
  },
  components: {
    deviceCommon
  }
}
</script>

<style lang="scss">
.ement_manage {
  padding: 30px;
  .ement-title {
    padding-bottom: 10px;
    line-height: 32px;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
  }
}
</style>
