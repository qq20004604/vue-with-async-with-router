/**
 * Created by 王冬 qq:20004604 on 2017/2/22.
 * /login-success    登录成功
 */
import Vue from 'vue'

export default new Vue({
    name: "event-bus",
    methods: {
        //登录
        login: function () {
            //test
            //这里应该写ajax方法，登录成功后触发以下事件
            // this.$emit("/login-success", 用户名);
        },
        //登出
        logout: function () {
            console.log("/logout");
        },
        //输入电话号码，然后通过ajax获取该号码的相关信息
        getTelInfoByTelNumber: function () {

        }
    }
})