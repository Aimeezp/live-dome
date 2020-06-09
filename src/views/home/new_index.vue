<template>
  <div class="bg convert-record">
    <scroll class="scroll">
      <img src="../../../static/home_top_logo.png" alt="" class="home_top_logo">

    <div class="home_top_quanyi">
      <div class="home_top_quanyi_top">
        <div class="imgparent">
          <img :src="signIconSrc[this.userInfo.levelId]" alt="">
        </div>

        <div class="home_top_quanyi_des">
           <div class="normalquanyi">{{userInfo.partnerLevelTitle}}</div>
           <div class="quanyitask">锁仓600BSS即可成为全球合伙人</div>
        </div>
      </div>

       <div class="invite_and_award">

         <div class="inviteaward_item" @click="openInviteList">
           <div class="inviteaward_title">邀请人数</div>
           <div class="inviteaward_content">
             <img src="../../../static/invitepeople.png" alt="">
             <span class="inviteaward_count">{{userInfo.inviteNumber}}</span>
             <div class="inviteaward_next">
               <img src="../../../static/jiantou1.png" alt="" style="width:15px;">
             </div>
           </div>
         </div>

         <div class="shufengexian"></div>

         <div class="inviteaward_item" @click="openSuoCang">
           <div class="inviteaward_title">资产</div>
           <div class="inviteaward_content">
             <img src="../../../static/awardcount.png" alt="">
             <span class="inviteaward_count">{{userInfo.balanceByAll}}</span>
             <div class="inviteaward_nextright">
               <img src="../../../static/jiantou1.png" alt="" style="width:15px;">
             </div>
           </div>
         </div>

        </div>

        <!-- <div class="invite_and_award1">
          <div class="inviteaward_item1" @click="openGlobalParent">
            <div class="inviteaward_title2">BICC全球合伙人招募中</div>
          </div>
        </div> -->
    </div>

    <div class="partnercontent">
          <div class="partnercard"  @click="openGlobalParent">
      <img src="../../../static/partnerbg.png" alt="">
      <div class="title1">BICC全球合伙人</div>
      <div class="title2">火热招募中</div>
    </div>

        <div class="partnercard"  @click="openGlobalZCParent">
      <img src="../../../static/zhongchoupartner.png" alt="">
      <div class="title1">BICC全球合伙人</div>
      <div class="title2">创世众筹计划</div>
    </div>
    </div>


    <div class="parent1">
      <div class="nameandlookdetail">
          <div class="shufengexian1"></div>
          <div class="title-name">邀请好友，坐享高收益</div>
      </div>

      <div class="guize_item">
        <img src="../../../static/guize.png" alt="">
        <div class="guize_item_right">
          <div class="item_title">返佣奖励</div>
          <div class="item_des">推荐好友，可获得好友交易手续费奖励105%返佣</div>
        </div>
      </div>

      <div class="guize_item">
        <img src="../../../static/partnet.png" alt="">
        <div class="guize_item_right">
          <div class="item_title">合伙人奖励</div>
          <div class="item_des">享受锁仓高额利息、 分红奖励、糖果收益；合伙人等级越高将享受更高收益；</div>
        </div>
      </div>
      <a href="https://bi-cc.zendesk.com/hc/zh-cn/articles/900000838723-BSS%E5%85%A8%E7%90%83%E7%A4%BE%E5%8C%BA%E5%90%88%E4%BC%99%E4%BA%BA%E6%8B%9B%E5%8B%9F"><div class="more">合伙人规则>></div></a>
      
    </div>

    <div class="temptemp"></div>
    </scroll>
    
    <div class="bottombottom">
      <div class="inviteCode" v-clipboard:copy="userInfo.shareCode" v-clipboard:success="onCopy" v-clipboard:error="onError">
        邀请码:
        <span class="codemember">{{userInfo.shareCode}}</span>
        <img src="../../../static/copy.png" alt="">
      </div>
      
      <div class="bottombaomingcontent1" >
        <div class="btnbaomingparent1">
          <div class="btnbg1"></div>
          <!-- <div class="btntitle1" v-clipboard:copy="invitLink" v-clipboard:success="onCopy" v-clipboard:error="onError">复制链接</div> -->
          <div class="btntitle1" @click="fenxiang(invitLink)">分享链接</div>
        </div>
      </div>

      <div class="bottombaomingcontent1" >
        <div class="btnbaomingparent1">
          <div class="btnbghui1"></div>
          <div class="btntitle1" @click="openHaiBao">分享海报</div>
        </div>
      </div>
    </div>

    <van-popup v-model="middleshow" position="top" class="middleshowpopup">
        <div class="creat-img" ref="box" v-show="middleshowCode">
          <div class="middleContent">
            <div class="lefttoplogo">
              <img src="../../../static/bicclogo.png" alt="" class="bicclogo">
              <img src="../../../static/bicclogotitle.png" alt="" class="bicclogotitle">
            </div>
            <div class="toptitles">
              <div class="shangtiao"></div>
              <div class="onehang">BICC全球合伙人</div>
              <div class="twohang">邀请函</div>
              <div class="threehang">邀请好友注册 最高享受<span class="redcontent">105%</span>返佣</div>
              <div class="xiatiao"></div>
              <div class="qrcodebackground">
                <div id="qrcode" class="qrcode"></div>
              </div>
              <img src="../../../static/invitebottombg.png" alt="" class="bottomlogo">
            </div>
          </div>
        </div>
        <img class="save-img" :src="imgUrl" alt="分享图" @touchmove.prevent>

        <div class="bottombg" @touchmove.prevent @click="clickCloseMiddlePopUp">
          <div class="sharetowechat"  @click="shareImgToWeChat">确定分享</div>
        </div>
        
    </van-popup> 
    <!-- <div class="popupBottomContent" v-if="middleshow">
      <div class="bottomsavecontent" @click="downs">
          <img src="../../../static/saveimg.png" alt="">
          <div class="savetitle">分享海报</div>
      </div>

      <div class="bottomcancel" @click="clickCloseMiddlePopUp">取消</div>

    </div> -->
  </div>
</template>

<script>

import Scroll from '../../components/Scroll';
import { qrcanvas } from "qrcanvas";
import html2canvas from "html2canvas";

import partnerCardbg from "../../../static/partnerbg.png"
import zhongchoupartnerCardbg from "../../../static/zhongchoupartner.png"

// import Vue from 'vue'
// import { List, Cell } from 'vant'

// // 只有一个确定是dialogs,有确定有取消是dialogs3
// import dialogs from '../../components/inputdialog';
import cookie from 'js-cookie'
// Vue.use(List).use(Cell)

export default {
  data() {
    return {
      show:false,
      UserID:"",
      middleshow:false,
      codeShow:false,
      invitCode:"123456",
      invitLink:"https://m.bi.cc/register?inviteCode=",
      signIconSrc:{
        1001:require('../../../static/normal_quanyi.png'),
        1005:require('../../../static/normal_quanyi.png'),
        1015:require('../../../static/normal_quanyi.png'),
        2001:require('../../../static/normal_quanyi2001.png'),
        2002:require('../../../static/normal_quanyi2002.png'),
        2003:require('../../../static/normal_quanyi2003.png'),
        2004:require('../../../static/normal_quanyi2004.png'),
        2005:require('../../../static/normal_quanyi2005.png')
      },
      currentImgType:1,
      imgUrl:"",
      middleshowCode:false,
      productList:[],
      productQiShuLabel:"第0期",
      userInfo:{
        balanceByAll:"0",
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
      },
      fenxiangHref: '',
    }
  },
  components:{
    Scroll
  },
  watch: {
    imgUrl(val, oldval) {
      //监听到imgUrl有变化以后 说明新图片已经生成 隐藏DOM
      //   this.$refs.box.style.display = "none";
      //   console.log(val);

    }
  },
  mounted() {
    
  },
  computed: {
    
  },
  created(){
    this.$getUserID();
    this.$getUserToken();
    this.UserID = cookie.get("userID")
    // if(cookie.get("userToken"))
    // {
    //   this.ishaveuserid = true;
    // }
    // else
    // {
    //   this.ishaveuserid = false;
    // }
    this.checkUserInfo();
    // this.getProductList();
  },
  methods: {
    downs() {
      
    },
    onCopy(){//复制的链接需要补全
      this.$toast.success("复制成功");
    },
    onError(){
      this.$toast.fail("复制失败");
    },
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
        if (res.data.success == true) {
          this.userInfo = res.data.body;
            if(this.userInfo.levelId <2000)
            {
              this.userInfo.levelLogo = "../../../static/normal_quanyi.png"
              this.currentImgType = 1;
            }
            else
            {
              this.userInfo.levelLogo = "../../../static/normal_quanyi"+this.userInfo.levelId+".png"
              if(this.userInfo.levelId == 2001)
                this.currentImgType = 2;
              else if(this.userInfo.levelId == 2002)
                this.currentImgType = 3
                else if(this.userInfo.levelId == 2003)
                this.currentImgType = 4
                else if(this.userInfo.levelId == 2004)
                this.currentImgType = 5
                else if(this.userInfo.levelId == 2005)
                this.currentImgType = 6
            }
          this.invitLink = "https://m.bi.cc/register?inviteCode=" + this.userInfo.shareCode;
        }

      }).catch(err=>{

      }).then(() => {

      })
    },
    // getProductList(){
    //   let data = {
    //     uid:this.UserID,
    //     pageNumber: this.pageNumber,
    //     pageSize: this.pageSize
    //   }
    //   this.$ajax.post('/partner/product/page', data,{
    //                     headers: {
    //                       'Content-Type': 'application/json;charset=UTF-8'
    //                     },
    //     }).then( res => {
    //       this.loading = false;
    //       this.finished = true;
    //     if (res.data.success == true) {
    //       this.productList = res.data.body.content;
    //       this.productQiShuLabel = this.productList[0].productTitle
    //     }

    //   }).catch(err=>{

    //   }).then(() => {

    //   })
    // },
    openInviteList(){
      this.$router.push("/inviteList")
    },
    openRewardRecode(){
      //rewardRecordList
      this.$router.push("/rewardRecordList")
    },
    openSuoCang(){
      //suocangDetail
      this.$router.push("/suocangList")
    },
    openGlobalParent(){
      //suocangandjieList
      this.$router.push("/suocangandjieList")
    },
    openGlobalZCParent(){
      this.$router.push("/zcpartner")
    },
  
    fenxiang(invitLink){
      //分享链接
      const u = navigator.userAgent;
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isiOS) {
				//iOS端
        let iosUrl = {
          'title': 'BICC全球合伙人',
          'method': 'shareURLToWeChat',
          'link': invitLink
        }
        window.webkit.messageHandlers.JsComShare.postMessage(iosUrl)
			} else {
				//安卓端
        JsComShare.shareURLToWeChat("BICC全球合伙人 "+invitLink);
			}
    },
  
    openHaiBao(){
      this.middleshow = !this.middleshow
      this.middleshowCode = true
      this.show = !this.show
      this.initImg();
    },
    shareImgToWeChat(){
                    const u = navigator.userAgent;
              const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
              if (isiOS) {
                //iOS端
                let iosUrl = {
                  //'title': 'BICC全球合伙人',
                  'method': 'shareImgToWeChat',
                  'urlConter': this.imgUrl.split(',')[1]
                }
                window.webkit.messageHandlers.JsComShare.postMessage(iosUrl)
              } else {
                //安卓端
                JsComShare.shareImgToWeChat(this.imgUrl.split(',')[1])
              }
    },
    clickCloseMiddlePopUp(){
      this.middleshow = false;
    },
    initImg() {
      let that = this;
      this.$toast.loading({
        mask: true,
        message: "正在生成..."
      });
      let width = document.body.clientWidth * 0.94;
      let height = parseInt(width * 1.4);
      this.invitLink = "https://m.bi.cc/register?inviteCode=" + this.userInfo.shareCode;
      that.$nextTick(function() {
        //生成二维码
        var canvas1 = qrcanvas({
          data: decodeURIComponent(this.invitLink),
          size: 90
        });
       
        document.getElementById("qrcode").innerHTML = "";
        document.getElementById("qrcode").appendChild(canvas1);
        var quality = 0.7;  // 默认图片质量为0.7
        setTimeout(() => {
          html2canvas(that.$refs.box, { width: width, height: height }).then(
            canvas => {
              // that.imgUrl = canvas.toDataURL();
              // quality值越小
              that.imgUrl = canvas.toDataURL('image/jpeg', quality);
              this.middleshowCode = false;
              that.$toast.clear();
            }
          );
        }, 600);
      });
    }
  }
}
</script>

<style lang="less" scoped>
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    background: #252638;
  }

  .home_top_logo{
    width: 100vw;
    height: auto;
    margin-top: -5rem;
  }

  .home_top_quanyi{
    width: 96%;
    height: 15.444rem;
    background: #1A1B30;
    position: absolute;
    left: 0;
    right: 0;
    margin: -9rem auto;
    border-radius:8px;
  }

  .home_top_quanyi_top{
    padding: 1.5rem 0rem 1rem 1rem;
    display: flex;
    flex-direction: row;
    .imgparent{
      width: 4rem;
      height: 4rem;
      text-align: center;
      img{
        height: 100%;
        
      }
    }

    .home_top_quanyi_des{
      padding-left: 1.3333rem;
      display:flex;
      flex-direction: column;
      justify-content:center;
      align-items:left;
      .normalquanyi{
        color: #FFFFFF;
        font-size: 1.2222rem;
        font-weight: 600;
        line-height: 2rem;
      }
      .quanyitask{
        color: #A3A3AC;
        font-size: 0.77rem;
        line-height: 1.4rem;
      }
    }
    
  }

  .invite_and_award{
      background: #171827;
      width: 94%;
      height: 8rem;
      margin-left: calc(100vw * 0.03);
      display: flex;
      flex-direction: row;
      border-radius: 8px;
    }

    .inviteaward_item{
      color: #ffffff;
      width: 100%;
      height: 8rem;
      display:flex;
      flex-direction: column;
      justify-content:center;
      align-items:left;
      padding: 1.33rem;
      
      
      .inviteaward_title{
        font-size: 1.1rem;
      }
      .inviteaward_content{
        padding-top: 0.6rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        
      }
      .inviteaward_content img{
        width: 2rem;
        height: auto;
      }
      .inviteaward_count{
        padding-left: 0.66rem;
        font-size: 1.2rem;
        font-weight: 700;
        em{
          font-style: inherit;
          font-size: .8rem;
        }
      }
      .inviteaward_next{
        position: absolute;
        right: calc(54%);
        color: rgba(255, 255, 255, 0.4);
      }
      .inviteaward_nextright{
        position: absolute;
        right: calc(7%);
        color: rgba(255, 255, 255, 0.4);
      }
    }

    .partnercontent{
      display: flex;
      flex-direction: row;
            margin-top: 7rem;
      .partnercard{
        flex: 1;
      position: relative;
      img{
        width: 92%;
        margin-left: calc(100% * 0.04);
      }
      .title1{
        margin-top: -6rem;
        margin-left: calc(100% * 0.1);
        color: #C10C43;
        font-size: 1.1rem;
        font-weight: 600
      }
      .title2{
        color: #FFFFFF;
        padding-top: 0.3rem;
        opacity: 0.6;
        margin-left: calc(100% * 0.1);
      }
    }
    }

  
    .inviteaward_item1{
      color: #ffffff;
      height: 4rem;
      display:flex;
      flex-direction: row;
      justify-content:center;
      align-items:left;
      padding-top: 1.5rem;
      position: absolute;
      right: 6vw;
      .suocangcount{
        color: #FEDB02;
      }
      
      .inviteaward_title2{
        flex: 10;
        font-size: 14px;
        color: red;
        line-height: 1.5rem;
      }

      .inviteaward_count1{
        padding-left: 0.66rem;
        font-size: 1.2rem;
        font-weight: 700;
      }
      .inviteaward_next1{
        color: rgba(255, 255, 255, 0.4);
        flex: 1;
        width: 100%;
        height: auto;
        text-align: right;
        margin-right: 1.3rem;
      }
    }

    .shufengexian{
      height: 4rem;
      width: 0.15rem;
      background: #2D2F3C;
      align-self: center;
    }

    //border-right: 2px solid #2D2F3C;
    
      .parent1{
        width:96%;
        height:auto;
        background:rgba(26,27,48,1);
        border-radius:8px;
        margin-left: calc(100% * 0.02);
        margin-top: 3.333rem;
        padding-left: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        margin-bottom: 2rem;
        .more{
          width: 100%;
          height: 2rem;
          line-height: 2rem;
          text-align: center;
          font-size:13px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(255,255,255,0.3);
        }
      }

      .nameandlookdetail{
        display: flex;
        flex-direction: row;
        margin-bottom: 1rem;
        .shufengexian1{
          background: #C10B44;
          width: 0.4rem;
          height: 1.3rem;
          margin-top: 0.3rem;
          margin-right: 0.4rem;
        }
        .title-name{
          font-size:1.3rem;
          font-family:PingFangSC-Semibold,PingFang SC;
        
          color:rgba(255,254,255,1);
          line-height:25px;

        }
        .lookdetail{
          width:8rem;
          height:1rem;
          font-size:1.1rem;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(193,12,67,1);
          line-height:17px;
          position: absolute;
          right: 2rem;
          line-height: 2rem;
          text-align: right;
        }

      }
      
      .guize_item{
        width: 96%;
        height: 8rem;
        background: #171827;
        display:flex;
        flex-direction: row;
        justify-content:left;
        align-items:center;
        border-radius:8px;
        margin-bottom: 1rem;
        img{
          width: 4rem;
          height: auto;
          margin-left: 1rem;
        }

        .guize_item_right{
          padding-left: 1rem;
        }
        .item_title{
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 600;
        }
        .item_des{
          color: #A2A1A8;
          margin-top: 0.6rem;
        }

      }


      .bottombottom{
        position: absolute;
        bottom: 0;
        left: 0;
        right:0;
        display: flex;
        flex-direction: row;
        background: #171417;
        width: 100%;
        height: 6rem;
      }
      .bottombaomingcontent1{
        width: 90%;
        height: 5.9rem;
        padding-top: 1.6rem;
        .btnbaomingparent1{
          position: relative;
          width: 100%;
          height: 2.66rem;
          
          .btnbg1{
            background: #252638;
            width: 80%;
            height: 2.66rem;
            transform: skewX(-30deg);
            position: absolute;
            z-index: 0;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
          .btnbghui1{
            background: #C10C43;
            width: 80%;
            height: 2.66rem;
            transform: skewX(-30deg);
            position: absolute;
            z-index: 0;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
          .btntitle1{
            color: white;
            position: absolute;
            z-index: 1;
            line-height: 2.8rem;
            font-weight:600;
            width: 80%;
            text-align: center;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
          .btntitlehui1{
            color: rgba(255, 255, 255, 0.6);
            position: absolute;
            z-index: 1;
            line-height: 2.8rem;
            font-weight:600;
            width: 80%;
            text-align: center;
            left: 0;
            right: 0;
            margin: 1rem auto;
          }
        }

      }

      .inviteCode{
        color: rgba(255, 255, 255, 0.3);
        position: absolute;
        bottom: 4.3rem;
        left: 2rem;
        right:0;
        .codemember{
          color: white;
        }
        img{
          width: 0.85rem;
        }
      }

      .scroll{
        overflow: hidden;

        position: absolute;
        top: 0rem;
        bottom: 5rem;
        left: 0;
        right: 0;
        
      }
      .temptemp{
        height: 1rem;
      }
      

    .van-popup{
      background:#252638;
      border-radius: 12px;
      width: 100%;
      height: 17rem;
    }

    .shareType{
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 2rem;
      
     
    }
     .btn_cancel{
       font-size: 1.3rem;
       width: 100%;
       text-align: center;
        position: absolute;
        bottom: 3rem;
        color: #C10C43;
        font-weight: 800;
        letter-spacing: 0.2rem;
      }

      .middleshowpopup{
        background:#1A1B30;
        border-radius: 12px;
        width: 94%;
        height: 100%;
        margin-top: 4rem;
        margin-left: calc(3%);
      }
      .shareItem{
        margin-bottom: 1rem;
        z-index: 99999;
      }
      // .bottompopup{
      //   background:#1A1B30;
      //   border-radius: 12px;
      //   width: 94%;
      //   height: 10rem;
      //   margin-top: 4rem;
      //   margin-left: calc(3%);
      //   z-index: 9999;
      // }

      .middleContent{
        width: 100%;
        height: 80rem;
        background: #1A1B30;
      }
      .lefttoplogo{
        margin-left: 1.8rem;
        margin-top: 1.8rem;
        .bicclogo{
          width: 2rem;
          height: auto;
        }
        .bicclogotitle{
          width: 4rem;
          height: auto;
        }
      }
      .toptitles{
        color: white;
        .shangtiao{
          background: #2A2B3E;
          width: 35%;
          height: 0.4rem;
          margin-left: 60%;
        }
        .onehang{
          width: 100%;
          color: #1EFCF1;
          font-size: 13pt;
          text-align: center;
          margin-top: 1rem;
        }
        .twohang{
          width: 100%;
          color: white;
          font-size: 40pt;
          text-align: center;
          margin-top: 0.4rem;
          font-family: "DIN Alternate";
        }
        .threehang{
          width: 100%;
          color: white;
          font-size: 1rem;
          text-align: center;
          
        }
        .redcontent{
          color: #C10C43;
          font-size: 1.2rem;
          font-weight: 700;
        }
        .xiatiao{
          background: #2A2B3E;
          width: 35%;
          height: 0.4rem;
          margin-left: 10%;
          margin-top: 1rem;
        }
        .qrcodebackground{
          background: white;
          width: 110px;
          height: 110px;
          margin: 1.5rem auto;
          text-align: center;
          padding-top: 10px;
          border-radius: 8px;
        }
        .qrcode{
          margin: 0 auto;
          text-align: center;
        }
        .bottomlogo{
          width: 100%;
          height: auto;
        }
      }

      .share-img{
        width: 100%;
        height: auto;
      }

      .save-img {
    width: 100%;
    height: auto;
    padding-top: 2rem;
  }
  .bottombg{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    padding-top: 3rem;
    .sharetowechat{
      width: 10rem;
      height: 3.666rem;
      line-height: 3.666rem;
      font-size: 1.55rem;
      background: #C10C43;
      color: white;
      border-radius: 1px;
      text-align: center;
      margin: auto;
    }
  }
  .saveImg_btn{
    z-index: 9999;
  }
  .popupBottomContent{
    width: 100%;
    height: 12rem;
    background: #252638;
    color: white;
    position: absolute;
    bottom: 0rem;
    z-index: 99999;
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    .bottomsavecontent{
      text-align: center;
      margin-top: 1rem;
      img{
        width: 4rem;
        height: auto;
      }
      .savetitle{
        color: white;
        font-size: 1rem;
        line-height: 2rem;
      }
      
    }
    .bottomcancel{
        color: red;
        font-size: 1.3rem;
        width: 100%;
        text-align: center;
        margin-top: 2rem;
    }
    
  }
</style>