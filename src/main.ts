import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import router from './router';

// Style Vuetify
import 'vuetify/dist/vuetify.min.css';

const app = createApp(App);

// Instance Vuetify
const vuetify = createVuetify();

app.use(vuetify);
app.use(router)
app.mount('#app');
