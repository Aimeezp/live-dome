<template>
  <div class="title-conter">
    <div class="title-left">网红直播带货DEMO</div>
    <div class="title-box">
      <router-link :to="{name:'home'}"> 全部商品 </router-link><span></span>
      <router-link :to="{name:'inviteList'}" > <i  :class="{ 'activeClass' : istbActive}">淘宝主播</i> </router-link><span></span>
      <router-link :to="{name:'rewardRecordList'}" > <i  :class="{ 'activeClass' : isdyActive}">抖音主播</i>  </router-link>
      <!-- <router-link :to="{name:'detail'}"> 详情 </router-link> -->
    </div>
    <div>
      <el-date-picker
        :readonly="true"
        v-model="date"
        type="daterange"
        value-format='yyyy-MM-dd'
        range-separator="～"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      date: "",
      istbActive: true,
      isdyActive:false,
    };
  },
  mounted() {
    this.getTime();
    if(this.$route.query.name && this.$route.query.name === 'tb') {
      this.istbActive = true;
    } else {
      this.istbActive = false;
    }
      if(this.$route.query.name && this.$route.query.name === 'dy') {
      this.isdyActive = true;
    } else {
      this.isdyActive = false;
    }
  },
  methods: {
    getTime() {
      axios
        .get("http://43.254.55.231:8080/api/index/date_range", {
          params: {},
        })
        .then((res) => {
          if (res.data.code && res.data.code == 200) {
            this.date = res.data.data;
          }
        })
        .catch((e) => {
          console.log("获取数据失败");
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang='less'>
.title-conter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  border-bottom: 1px solid #6b6e81;
  i{
        font-style: normal;
  }
  .activeClass{
    color:#0c87ff
  }
  .title-box span {
    display: inline-block;
    height: 10px;
    border-right: 1px solid #6b6e81;
    margin: 0 10px;
  }
  a {
    color: #fff;
    font-weight: bold;
  }
  a:hover {
    color: #409eff;
  }
  .router-link-exact-active {
    color: #409eff;
  }
  .title-left {
    color: #0c87ff;
    font-weight: bold;
    font-size: 18px;
  }
  .el-input__inner {
    background: #262837;
    color: #fff;
    border: none;
  }
  .el-date-editor .el-range-input {
    background: #262837;
    color: #fff;
  }
  .el-date-editor .el-range-separator {
    color: #fff;
  }
}
</style>
