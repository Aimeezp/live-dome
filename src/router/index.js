import Vue from 'vue'
import Router from 'vue-router'

import NewHome from '@/views/home/new_index'

import inviteList from '@/views/home/inviteUserList'
import rewardRecordList from '@/views/home/rewardRecordList'
import detail from '@/views/home/douyin-details'
import detai from '@/views/home/taobao-details'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: NewHome,
      meta: {
        index: 0,
        footer: false,
        title: '全部',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/taobao',
      name:'inviteList',
      component:inviteList,
      meta:{
        index:4,
        footer:false,
        title: '淘宝',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/douyin',
      name:'rewardRecordList',
      component:rewardRecordList,
      meta:{
        index:4,
        footer:false,
        title: '抖音',
        keepAlive: true, // 需要被缓存
      },
    },
    {
      path:'/detaildy',
      name:'detail',
      component:detail,
      meta:{
        index:5,
        footer:false,
        title: '抖音详情',
        keepAlive: true, // 需要被缓存
      }
    },
    {
      path:'/detailtb',
      name:'detai',
      component:detai,
      meta:{
        index:6,
        footer:false,
        title: '淘宝详情',
        keepAlive: true, // 需要被缓存
      }
    },
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
