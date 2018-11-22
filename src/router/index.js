import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'/*首页*/
import homeOld from '@/components/homeOld'/*旧版首页*/
import works from '../static/works'/*作品*/
import worksDetail from '../static/worksDetail'/*作品详情*/
import designerList from '../static/designerList'/*设计师*/
import designerDetail from '../static/designerDetail'/*设计师详情*/
import designInstitute from '../static/designInstitute'/*设计院*/
import instituteDetail from '../static/instituteDetail'/*设计院详情*/
import atlas from '../static/atlas'/*图集*/
import detailsAtlas from '../static/detailsAtlas'/*图集详情*/
import articleList from '../static/articleList'/*博文*/
import articleDetail from '../static/articleDetail'/*博文详情*/
import aboutUs from '../static/aboutUs'/*关于我们*/
import business from '../static/business'/*业务*/

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      //name: 'home',
      component: home
    },
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/',
      name: 'homeOld',
      component: homeOld
    },

    {
      path: '/works',
      name: 'works',
      component: works
    },
    {
      path: '/worksDetail',
      name: 'worksDetail',
      component: worksDetail
    },
    {
      path: '/designerList',
      name: 'designerList',
      component: designerList
    },
    {
      path: '/designerDetail',
      name: 'designerDetail',
      component: designerDetail
    },
    {
      path: '/designInstitute',
      name: 'designInstitute',
      component: designInstitute
    },
    {
      path: '/instituteDetail',
      name: 'instituteDetail',
      component: instituteDetail
    },
    {
      path: '/atlas',
      name: 'atlas',
      component: atlas
    },
    {
      path: '/detailsAtlas',
      name: 'detailsAtlas',
      component: detailsAtlas
    },
    {
      path: '/articleList',
      name: 'articleList',
      component: articleList
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: articleDetail
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    },
    {
      path: '/business',
      name: 'business',
      component: business
    }
  ],
  linkExactActiveClass: 'asty', //给对应点击内容附加类名
})
