import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify'; // Importez createVuetify à partir de 'vuetify'

// Importez le style de base de Vuetify
import 'vuetify/dist/vuetify.min.css';

const app = createApp(App);

// Créez une instance Vuetify
const vuetify = createVuetify();

// Utilisation de Vuetify avec votre application
app.use(vuetify);

app.mount('#app');
