// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import LazyLoad from 'plugins/lazyload';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.use(LazyLoad, {
  fadein: true,
  speed: 20
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
