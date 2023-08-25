import { createApp } from 'vue'
import router from "@/router";
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router)
app.mount('#app')

function checkRouter(path) {
    let hasCheck = router.getRoutes().filter(route => route.path == path).length
    return hasCheck
  }
router.beforeEach((to, from, next) => {
//store.commit('getToken')
const token = localStorage.getItem("token");
//console.log("router.beforeEach token:", token)
if (!token && to.name !== 'guest') {
    next({ name: 'guest' })
} else if (!checkRouter(to.path)) {
    next({ name: 'home' })
} else {
    next()
}
})