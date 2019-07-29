import Vue from "vue";
import Vuetify from "vuetify";
import App from './App.vue';
import 'vuetify/dist/vuetify.min.css';


Vue.use(Vuetify);
const opts = {};
Vue.config.productionTip = false;
new Vue({
    vuetify: new Vuetify(opts),
    render: h => h(App)
}).$mount('#app')

