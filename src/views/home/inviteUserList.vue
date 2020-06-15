<template>
  <div class="mine_bg">
      <!-- <img src="../../assets/images/mine/waiting.png" alt /> -->
    <!-- <div class="top-bar">
      <span>挖礦</span>
    </div> -->

    <div class="scrollConter">
        <!-- <div class="top-bar al">
            <img class="back" @click="goBack" src="../../../static/back.png" alt srcset>
            <div class="left">邀请人</div>
        </div> -->
        
        <div class="listtitle">
            <div class="titleparent">
                <div class="registerTime">注册时间</div>
                <div class="userName">被邀请人</div>
                <div class="awardCount">贡献奖励</div>
            </div>

            <div class="nodata" v-show="inviteListInfo.length<=0">
              <img src="../../../static/nullobj.png" alt="" >
              <div>暂无数据~</div>
            </div>
            
            <Scroll :class="['scroll', heightStatus == 2 ? 'scrollTopsl' : '', iosConter == 2 ? 'iosConter' : '']" ref="scroll" :pull-up-load="true" :probe-type="3" @pullingUp="loadMore">
                
                <div :class="[index%2==0?'inviteItem1':'inviteItem']" v-for="(item,index) in inviteListInfo">
                    <div class="time">{{item.formatDateByCreateTime}}</div>
                    <div class="user">{{item.serviceRemark}}</div>
                    <div class="count">{{item.income}} {{item.codeSymbol}}</div>
                </div>

            </Scroll>
              
        </div>
        
    </div>
  </div>
</template>

<script>
import Scroll from '../../components/Scroll';
import cookie from 'js-cookie'
import axios from 'axios'
export default {
  updated(){
    // if(this.isshichang)
    // {
    //     let img = document.getElementsByClassName('content')[0].getElementsByTagName('img')
    //     let count = 0
    //     let length = img.length
    //     if (length) {
    //         let timer = setInterval(() => {
    //             if (count == length) {
    //                 // console.log('refresh')
    //                 this.$refs.scroll.refresh()
    //                 clearInterval(timer)
    //             } else if (img[count].complete) {
    //                 count ++
    //             }
    //         }, 50)
    //     }
    // }
    
  },
  components:{
    Scroll
  },
  name: "",
  data() {
    return {
      data: "data",
      isshowmore:false,
      UserID:"",
      contentHeight:'',
      contentStyleObj:{
　　　　　height:''
　　　},
      heightFlag: true,
      heightStatus:1,
      iosConter:1,
      pageNumber:1,
      pageSize:15,
      inviteListInfo:[],
      tempinviteListInfo:[]
    };
  },
  beforeCreate() {},
  beforeDestroy() {},
  mounted() {
     window.onresize = () => {
        this.clientHeight = document.documentElement.clientHeight;
    }
  },
  destroyed(){
    window.removeEventListener('resize', this.getConterHeight)
    window.removeEventListener('resize', this.getHeight)
  },
  activated(){},
    watch: {
 
  },
  created(){
    // let Userid_cwv = Cookie.get("Userid_cwv");
    // let smidlocal = Cookie.get("Smid");
    // let inviteidlocal = Cookie.get("inviteid");
    // let mobilelocal = Cookie.get("Mobile");
    // let Nicknamelocal = Cookie.get("Nickname");
    this.UserID = cookie.get("userID")
    window.addEventListener('resize', this.getConterHeight);
    window.addEventListener('resize', this.getHeight);
    this.getConterHeight()
    this.getHeight()


    this.appSource()

    this.getUserInviteList();


  },
  methods: {
    getUserInviteList(){
      //记录请求Type： 1000邀请记录  2000返佣记录 3000分红记录 4000锁仓明细 4001锁仓认购 4002锁仓赎回 4003锁仓收益
      // if(this.currentPageNumber<=this.pageNumber+1) this.pageNumber = this.totalPage ;
      let data = {
        uid:this.UserID,
        // balanceType:"1000",
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      this.$ajax.post('/partner/invite/page', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
          console.log("查询用户信息====",res.data)
        if (res.data.success == true && res.data.body.number <= res.data.body.totalPages) {
          console.log("赋值")
          res.data.body.content.map((item) => {
            this.inviteListInfo.push(item);
          })
        }

      }).catch(err=>{

      }).then(() => {

      })
    },
    appSource() {
      // const u = navigator.userAgent;
      // const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      // if (isiOS) {
      //   this.iosConter = 2
      //   return "ios";
      // } else {
      //   this.iosConter = 1
      //   return "andriod";
      // }
    },
    goBack() {
      this.$router.go(-1);
    },
    getConterHeight(){
      if(this.heightFlag){
        this.height = document.documentElement.clientHeight;
        this.heightFlag = false
      }
    },
    getHeight(){
        this.contentStyleObj.height = window.innerHeight;
        if(this.height >= this.contentStyleObj.height){
            this.heightStatus = 1
        }else{
            this.heightStatus = 2
        }
    },
    changeshowtip(isshow){
      this.isshowtip = isshow
    },

    loadMore(){
      this.pageNumber++;
      this.getUserInviteList();
      this.$refs.scroll.finishPullUp()
    }
  }
};
</script>

<style lang='less' scoped>

.mine_bg {
  width: 100vw;
  height: 100vh;
  background-clip: #252638;
  display: flex;
  flex-direction: column;
  background-color: #252638;
  position: relative;
  .top-bar {
      height: 4.166667rem;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 100;
      padding-left: 1.75rem;
      padding-right: 1.25rem;
      box-sizing: border-box;
      .back {
        width: 1.2rem;
        height: auto;
      }
      .left {
        font-size: 18px;
        font-family: PingFangSC-Semibold;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        width: 100%;
        height: auto;
        text-align: center;
        margin-right: 1.2rem;
      }
      .right {
        img {
          width: 1.2rem;
          height: auto;
        }
      }
    }

    .listtitle{
        
        .titleparent{
            color: rgba(255, 255, 255, 0.4);
            display: flex;
            flex-direction: row;
            width: 94%;
            height: auto;
            background: #1A1B30;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            text-align: center;
            // margin: 4.166667rem auto;
            margin: auto;
            margin-top: 1rem;
            padding-bottom: 1.5rem;
            padding-top: 1.5rem;
            position: relative;
        }
        
        .registerTime{
            flex: 1;
            text-align: left;
            padding-left: 1rem;
        }
        .userName{
            position: absolute;
            width: 100%;
            padding-left: 3rem;
        }
        .awardCount{
            flex: 1;
            text-align: right;
            padding-right: 1rem;
        }
    }

    .inviteItem{
        color: white;
        background: #171827;
        width: 94%;
        height: 4rem;
        line-height: 4rem;
        display: flex;
        margin: 0 auto;
        flex-direction: row;
        text-align: center;
        position: relative;
        .time{
            padding-left: 1rem;
            text-align: center;
        }
        .user{
            position: absolute;
            width: 100%;
            padding-left: 3rem;
        }
        .count{
            flex: 1;
            position: absolute;
            right: 1rem;
        }
    }

    .inviteItem1{
        color: white;
        background: #1A1B30;
        width: 94%;
        height: 4rem;
        line-height: 4rem;
        display: flex;
        margin: 0 auto;
        flex-direction: row;
        text-align: center;
        position: relative;
        .time{
            padding-left: 1rem;
            text-align: center;
        }
        .user{
            position: absolute;
            width: 100%;
            padding-left: 3rem;
        }
        .count{
            flex: 1;
            position: absolute;
            right: 1rem;
        }
    }
  
}

      .scroll{
        overflow-y: scroll;
        position: fixed;
        top: 5rem;
        bottom: 0px;
        margin-bottom: 0rem;
        left: 0;
        right: 0;
        align-items: center;
        
      }
      .iosConter{
        margin-bottom: 0px;
      }

      .van-cell {
      // background: transparent;
      // color: #fff;
      width:98%;
      height:4rem;
      background:rgba(26,27,48,1);
      border-radius:8px;
      margin-bottom: 0.8rem;
      
    }

    .nodata{
      width: 100%;
      align-items: center;
      img{
        display: block !important;
        margin:auto;
        margin-top: 10rem;
      }
      div{
        color: white;
        width: 100%;
        text-align: center;
        margin-top: 1rem;
      }
      
    }
      
</style>

