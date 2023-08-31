import { createApp } from 'vue'
import router from "@/router";
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(ElementPlus)
app.use(pinia).use(router)
app.mount('#app')

function checkRouter(path) {
    let hasCheck = router.getRoutes().filter(route => route.path == path).length
    return hasCheck
  }
router.beforeEach((to, from, next) => {
    let isLogin = false
    //console.log("localStorage.user:", localStorage.user)
    if (localStorage.user !== undefined ) {
        //console.log("........")
        let user= JSON.parse(localStorage.user)
        isLogin = user.isLogin
        //console.log("isLogin:", isLogin)
    }
    //console.log("to.path",to.path)
    if (!isLogin) {
        if (to.name === 'guest' || to.name === 'registration') {
            next()
        } else {
            next({ name: 'guest' })
        }
    } else if (!checkRouter(to.path)) {
        //console.log("branch-3")
        next({ name: 'home' })
    } else {
        if (to.name === 'guest' || to.name === 'registration') {
            next({ name: 'home' })
        } else {
            //console.log("branch-4")
            next()
        }
    }
})