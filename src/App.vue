<template>
  <div id="app">
    <div class="container">
      <transition :name="transitionName">
        <keep-alive v-if="$route.meta.footer">
          <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import cookie from 'js-cookie'
export default {
  components: {  },
  name: "App",
  data() {
    return {
      show: true,
      transitionName: "",
      docmHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight
    };
  },
  mounted() {
    // window.onresize监听页面高度的变化
    var elements = document.getElementById("leader");
    elements.parentNode.removeChild(elements);
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight;
      })();
    };
  },
  created() {
    let name = this.$route.name;
    if (this.$route.meta.footer) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.getCode();
    // console.log("3222222")
    cookie.remove("userToken")
  },
  watch: {
    showHeight(n, o) {
      if (this.docmHeight > n) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    $route(to, from) {
      if (to.meta.footer) {
        this.show = true;
      } else {
        this.show = false;
      }
      if (to.meta.index >= 0) {
        // //console.log("to", to.meta.index, "from", from.meta.index);

        if (to.meta.index < from.meta.index) {
          this.transitionName = "slide-right";
        } else {
          this.transitionName = "slide-left";
        }
      }
    }
  },
  methods: {
    getCode() {
      var url = window.location.href;
      var arr = "code=";
      var index = url.indexOf(arr);
      if (index != -1) {
        // //console.log(index);
        var code = url.slice(index + 5, url.length);

        if (code) {
          this.$router.push("/register/?code=" + code);
          // window.location.href = "http://192.168.3.190:8080/register/?code="+code;
        } else {
        }
      }
    }
  }
};
</script>

<style lang='less'>
@import "./index.less"; //引入全局less文件
#app {
  font-family: "PingFangSC", Helvetica, Arial, sans-serif;
  // color: rgba(255, 255, 255, .8);
  // padding-bottom: 4.166667rem;
  .container {
    // min-height: 95vh;
    background: #fff;
  }
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: absolute;
  width: 100%;
  left: 0;
  height: 100%;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}

.van-swipe__indicator {
  width: 0.583333rem!important;
  height: 0.25rem!important;
  border-radius: 0.166667rem!important;
  transition: width 0.3s linear!important;
}

.van-swipe__indicator--active {
  transition: width 0.3s linear!important;
  width: 0.916667rem!important;
}

.van-swipe__indicator:not(:last-child) {
  margin-right: 0.333333rem!important;
}
</style>
