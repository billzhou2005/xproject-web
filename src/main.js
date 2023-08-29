import { createApp } from 'vue'
import router from "@/router";
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia).use(router)
app.mount('#app')

function checkRouter(path) {
    let hasCheck = router.getRoutes().filter(route => route.path == path).length
    return hasCheck
  }
router.beforeEach((to, from, next) => {
    let user= JSON.parse(localStorage.user)
    if (!user.isLogin) {
        if (to.name === 'guest' || to.name === 'registration') {
            next()
        } else {
            next({ name: 'guest' })
        }
    } else if (!checkRouter(to.path)) {
        next({ name: 'home' })
    } else {
        next()
    }
})