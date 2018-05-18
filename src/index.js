const Vue = require('vue/dist/vue');

const App = require('./components/App.vue');

const store = require('./store');

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    store
}).$mount('#app');