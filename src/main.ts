//import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Vuetify from './plugins/vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { registerPlugins } from '@/plugins'
import { useAuthStore } from './stores/authStore'
import 'leaflet/dist/leaflet.css'

;(async () => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)
  app.use(Vuetify)

registerPlugins(app)


  const authStore = useAuthStore()
  await authStore.verifyToken()
  app.mount('#app')
})()
