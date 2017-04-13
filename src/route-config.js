// 同步组件
import notLogined from './components/Not Logined.vue'
import USER from './user'
// 异步组件b
// 异步写法如下
const Logined = resolve => require(['./components/Logined.vue'], resolve)
const notFound = resolve => require(['./components/Not Found.vue'], resolve)
// import Logined from './components/Logined.vue'


export default [
    {
        path: '/user',
        component: Logined,
        beforeEnter (to, from, next) {
            if (to.fullPath !== '/') {
                if (USER.getUser().length === 0) {
                    next('/');
                    return;
                }
            }
            next();
        }
    },
    {
        path: '',
        component: notLogined
    },
    {
        path: "*", component: notFound
    }
]