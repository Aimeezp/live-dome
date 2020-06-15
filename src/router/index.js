import Vue from 'vue'
import Router from 'vue-router'


// const  Home= () => import('@/views/home/index')
// const  NewHome= () => import('@/views/home/new_index')

import NewHome from '@/views/home/new_index'
// import coindetail from '@/views/home/coindetail'
// import detail from '@/views/home/detail'
// import projectjs from '@/views/home/projectjs'
// import shengouorderlist from '@/views/home/shengouorderlist'

import inviteList from '@/views/home/inviteUserList'
import rewardRecordList from '@/views/home/rewardRecordList'
import suocangDetail from '@/views/home/suocangDetail'
import suocangandjiedetail from '@/views/home/suocangandjiedetail'
import suocangandRedeem from '@/views/home/suocangandRedeem'
import zhuanchuRedeem from '@/views/home/zhuanchuRedeem'
import suocangList from '@/views/home/suocangList'
import suocangandjieList from '@/views/home/suocangandjieList'
import zcpartner from '@/views/home/zcpartner'
import enterzd from '@/views/home/enterzd'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: NewHome,
      meta: {
        index: 0,
        footer: false,
        title: '全球合伙人',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/inviteList',
      name:'inviteList',
      component:inviteList,
      meta:{
        index:4,
        footer:false,
        title: '邀请人',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/rewardRecordList',
      name:'rewardRecordList',
      component:rewardRecordList,
      meta:{
        index:4,
        footer:false,
        title: '邀请返佣',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/suocangDetail/:id',
      name:'suocangDetail',
      component:suocangDetail,
      meta:{
        index:4,
        footer:false
      }
    },
    {
      path:'/suocangandjiedetail/:id',
      name:'suocangandjiedetail',
      component:suocangandjiedetail,
      meta:{
        index:4,
        footer:false,
        title: 'BSS认购',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/suocangandRedeem/:id',
      name:'suocangandRedeem',
      component:suocangandRedeem,
      meta:{
        index:4,
        footer:false,
        title: '赎回',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/zhuanchuRedeem',
      name:'zhuanchuRedeem',
      component:zhuanchuRedeem,
      meta:{
        index:4,
        footer:false,
        title: '转出',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/suocangList',
      name:'suocangList',
      component:suocangList,
      meta:{
        index:4,
        footer:false,
        title: '资产',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/suocangandjieList',
      name:'suocangandjieList',
      component:suocangandjieList,
      meta:{
        index:4,
        footer:false,
        title: 'BSS全球合伙人',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/zcpartner',
      name:'zcpartner',
      component:zcpartner,
      meta:{
        index:4,
        footer:false,
        title: '创世众筹计划',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/enterzd/:id',
      name:'enterzd',
      component:enterzd,
      meta:{
        index:4,
        footer:false,
        title: '加入战队',
        keepAlive: true, // 需要被缓存
      }
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      savedPosition;
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
})
