import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import VuePlyr from 'vue-plyr'

// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlyr, {
  plyr: {
    fullscreen: { enabled: false }
  },
  emit: ['ended']
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
