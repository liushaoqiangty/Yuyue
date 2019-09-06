import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";
import "./filter/filter";
import pinyin from "pinyin";
import { Carousel, Icon } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { Tab, Tabs, List, Popup } from "vant";
import { IndexBar, IndexAnchor } from "vant";
import VueLazyLoad from "vue-lazyload";
import { Toast } from 'vant';

Vue.use(Toast);

Vue.use(VueLazyLoad, {
  error: require("./loading/img/loading.jpg"),
  loading: require("./loading/img/loading.jpg")
});

Vue.use(IndexBar).use(IndexAnchor);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Icon);
Vue.use(Carousel);
Vue.use(Popup);
Vue.use(VueAxios, axios, pinyin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
