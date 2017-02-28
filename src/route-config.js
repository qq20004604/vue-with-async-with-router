// 同步组件
import loginPage from './components/login-page.vue'
// import b from './components/leftside-info.vue'
// 异步组件b
// 异步写法如下
const main = resolve => require(['./components/main.vue'], resolve)

export default [
    {
        path: '*',
        components: {
            loginPage: loginPage,
            main
        }
    },

]