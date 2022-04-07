import { createApp } from 'vue'
import App from './main.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import "../styles/quasar.scss"

createApp(App).use(Quasar, quasarUserOptions).mount('#app')