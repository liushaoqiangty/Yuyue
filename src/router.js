import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/recomend/:id",
      name: "recomend",
      component: () => import("./views/RecommedDetail.vue")
    },
    {
      path: "/rank/:id",
      name: "rank",
      component: () => import("./views/RankDetail.vue")
    },
    {
      path: "/singer/:id",
      name: "singer",
      component: () => import("./views/SingerDetail.vue")
    },
    {
      path: "/search",
      name: "search",
      component: () => import("./views/Search.vue")
      // children:[
      //   {

      //   }
      // ]
    },
    {
      path: "/searchrank/:id",
      name: "searchRank",
      component: () => import("./views/SearchRankDetail.vue")
    },
    {
      path: "/player/:id",
      name: "player",
      component: () => import("./views/Player.vue"),
      
    }
  ]
});
