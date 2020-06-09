<template>
  <div class="mine_bg">
      <!-- <img src="../../assets/images/mine/waiting.png" alt /> -->
    <!-- <div class="top-bar">
      <span>挖礦</span>
    </div> -->

    <div class="scrollConter">
        <div class="top-bar al">
            <img class="back" @click="goBack" src="../../../static/back.png" alt srcset>
            <div class="left">邀请返佣</div>
        </div>

        <div class="totalandyestoday">
            <div class="yestoday">
                <span class="yestodaytitle">昨日收益:</span> 
                <span class="yestodaycount">{{userInfo.incomeByYesterday}}</span>
            </div>

            <div class="total">
                <span class="totaltitle">累计收益:</span> 
                <span class="totalcount">{{userInfo.incomeByAll}}</span>
            </div>
        </div>

        <div class="listtitle">
            <div class="titleparent">
                <div class="registerTime">时间</div>
                <div class="userName">被邀请人</div>
                <div class="awardCount">奖励</div>
            </div>

            <div class="nodata" v-show="inviteListInfo.length<=0">
              <img src="../../../static/nullobj.png" alt="">
              <div>暂无数据~</div>
            </div>
            
            <Scroll :class="['scroll', heightStatus == 2 ? 'scrollTopsl' : '', iosConter == 2 ? 'iosConter' : '']" ref="scroll" :pull-up-load="true" :probe-type="3" @pullingUp="loadMore">
                
                <div :class="[index%2==0?'inviteItem1':'inviteItem']" v-for="(item,index) in inviteListInfo">
                    <div class="time">{{item.formatDateByCreateTime}}</div>
                    <div class="user">{{item.serviceRemark}}</div>
                    <div class="count">{{item.income}}{{item.codeSymbol}}</div>
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
      UserID:"",
      data: "data",
      jiaoyiType:"购买",
      isshichang:true,
      isshowmore:false,
      mininglist:[],
      mymininglist:[],
      currentshichangpage:1,
      currentmypage:1,
      pagesize:10,
      mininglistTotal:0,
      mymininglistTotal:0,
      isshowtip:false,
      waitTotalAmount:0,
      contentHeight:'',
      contentStyleObj:{
　　　　　height:''
　　　},
      heightFlag: true,
      heightStatus:1,
      iosConter:1,
      isinviteReward:true,
      requestType:"2000",
      pageNumber:1,
      pageSize:15,
      inviteListInfo:[],
      userInfo:{
        balanceByLock:"0",
        incomeByAll:"0",
        incomeByYesterday:"0",
        inviteNumber:"0",
        levelId:"0",
        levelRuleNext:{
          levelRuleContent:[
            {
              conditionId:"0",
              conditionTitle:"Title",
              conditionValue:"1"
            }
          ],
          levelId:"0",
          levelTitle:""
        },
        
        partnerTitle:"Title",
        partnerType:"Type",
        partnerTypeTitle:"partnerTypeTitle",
        shareCode:"null",
        uid:"null"
      }
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
    this.checkUserInfo();

  },
  methods: {
    checkUserInfo(){
      //partner
      //    /account
      let data = {
        uid:this.UserID
      }
      this.$ajax.post('/partner/account', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
          // console.log("查询用户信息====",res.data)
        if (res.data.success == true) {

          this.userInfo = res.data.body;
        }

      }).catch(err=>{

      }).then(() => {

      })
    },
    getUserInviteList(){
      //记录请求Type： 1000邀请记录  2000返佣记录 3000分红记录 4000锁仓明细 4001锁仓认购 4002锁仓赎回 4003锁仓收益
      let data = {
        uid:this.UserID,
        balanceType:this.requestType,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }
      this.$ajax.post('/partner/account/balance/page', data,{
                        headers: {
                          'Content-Type': 'application/json;charset=UTF-8'
                        },
        }).then( res => {
          console.log("查询用户信息====",res.data)
        if (res.data.success == true && res.data.body.number <= res.data.body.totalPages) {
          res.data.body.content.map((item) => {
            this.inviteListInfo.push(item);
          })
        }

      }).catch(err=>{

      }).then(() => {

      })
    },
    changeStatuetrue(){
      this.isinviteReward = true
      this.requestType = "2000"
      this.pageNumber = 1;
      this.inviteListInfo = []
      this.getUserInviteList();
    },
    changeStatuefalse(){
      this.isinviteReward = false
      this.requestType = "3000"
      this.pageNumber = 1;
      this.inviteListInfo=[]
      this.getUserInviteList();
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
      console.log("刷新")
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

      .selectcontent{
    position: fixed;
    top:7rem;
    width: 94%;
    height: 3rem;
    line-height: 3rem;
    display: flex;
    margin: 0 auto;
    flex-direction: row;
    margin-left: calc(3%);
    background-color: #1A1B30;
                border-top-left-radius: 6px;
            border-top-right-radius: 6px;
    .noselect{
      flex: 1;
      line-height: 3rem;
      text-align: center;
      color: white;
      font-size: 1.2rem;
    }
    .select{
      flex: 1;
      line-height: 3rem;
      text-align: center;
      color: #C00B43;
      font-size: 1.2rem;
      .xianshichang{
        width: 2rem;
        height: 0.2rem;
        background: #C00B43;
        margin-left: calc(50%*0.85);
      }
    }
  }

    .totalandyestoday{
        flex-direction: row;
        color: white;
        margin-top: 5rem;
        margin-bottom: 2rem;
        text-align: center;
        width: 94%;
        height: 1rem;
        line-height: 1rem;
        display: flex;
        flex-direction: row;
        .yestoday{
          flex: 1;
        }
        .total{
          flex: 1;
        }
    }

    

    .listtitle{
      border-top: white;
        .titleparent{
            color: rgba(255, 255, 255, 0.4);
            display: flex;
            flex-direction: row;
            width: 94%;
            height: auto;
            background: #1A1B30;
            text-align: center;
            margin: -0.9rem auto;
            padding-bottom: 1rem;
            padding-top: 1rem;
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
        background: #1a1b30;
        border-top: 1px solid #171827;
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

      .nodata{
      width: 100%;
      align-items: center;
      z-index: 9999;
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

      .scroll{
        overflow-y: scroll;
        position: fixed;
        top: 10rem;
        bottom: 0px;
        margin-bottom: 0rem;
        left: 0;
        right: 0;
        align-items: center;
        
      }
      .scrollTopsl{
        
      }
      .iosConter{
        margin-bottom: 0px;
      }
      
</style>

