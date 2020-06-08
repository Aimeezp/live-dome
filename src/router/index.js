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

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: NewHome,
      meta: {
        index: 0,
        footer: false
      }
    },
    {
      path:'/inviteList',
      name:'inviteList',
      component:inviteList,
      meta:{
        index:4,
        footer:false
      }
    },
    {
      path:'/rewardRecordList',
      name:'rewardRecordList',
      component:rewardRecordList,
      meta:{
        index:4,
        footer:false
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
        footer:false
      }
    },
    {
      path:'/suocangandRedeem/:id',
      name:'suocangandRedeem',
      component:suocangandRedeem,
      meta:{
        index:4,
        footer:false
      }
    },
    {
      path:'/zhuanchuRedeem',
      name:'zhuanchuRedeem',
      component:zhuanchuRedeem,
      meta:{
        index:4,
        footer:false
      }
    },
    {
      path:'/suocangList',
      name:'suocangList',
      component:suocangList,
      meta:{
        index:4,
        footer:false
      }
    },
    {
      path:'/suocangandjieList',
      name:'suocangandjieList',
      component:suocangandjieList,
      meta:{
        index:4,
        footer:false
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
