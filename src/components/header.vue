<template>
  <div class="title-box">
    <img class="back" @click="goBack" src="../assets/images/detail/back.png" alt srcset>
    <div class="left">{{title}}</div>
    <span class="right" v-if="hasRule" @click="goRule">
      <img src="../assets/images/detail/wen.png" alt="" srcset="">
      <span>玩法</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    hasRule: {
      type: Boolean,
      default: false
    },

  },
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goRule(){
       this.$router.push('/play');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.title-box {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #21242A;
  z-index: 400;
  height: 3.666667rem;
  // box-shadow: 0rem .166667rem .166667rem 0rem rgba(46, 70, 120, 0.02);
  //   0rem -0.083333rem 0rem 0rem rgba(244, 240, 245, 1);
  .left {
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: 1.5rem;
    line-height: 3.666667rem;
    font-family:PingFangSC-Semibold;
    font-weight: 500;
    color: rgba(255, 255, 255, .8);
  }
  img.back {
    height: 1.666667rem;
    width: auto;
    position: absolute;
    top: 1rem;
    left: 1.25rem;
  }
  span.right {
    height: 1.666667rem;
    width: auto;
    position: absolute;
    top: 1rem;
    right: 1.25rem;
    line-height:1.666667rem; 
    img{
      width: 1.166667rem;
      display: inline-block;
      position: relative;
      top: .166667rem;
      left: -0.166667rem;
    }
    span{
      color: #8D98C1;
      font-size: 1.166667rem;
    }
  }
}
</style>
