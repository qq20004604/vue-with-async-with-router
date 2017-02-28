<template>
    <div>
        <page-header></page-header>
        <div :class="{loginBackground:!user}">
            <router-view :name="showPage"></router-view>
        </div>
        <page-footer></page-footer>
    </div>
</template>
<style>
    * {
        margin: 0;
        padding: 0;
        border: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    .loginBackground {
        background: #56626d;
    }

    @media (max-width: 1200px) {
        body {
            width: 1200px;
        }
    }
</style>
<script>
    import header from './components/header.vue'
    import footer from './components/footer.vue'
    //global event bus，全局事件写这里
    import Bus from './event-bus.js'
    //样式列表
    import style from './components/style-list.vue'
    export default {
        name: 'app',
        created: function () {
            var self = this;
            Bus.$on("/login-success", function (val) {
                self.user = val;
            })
            Bus.$on("/logout", function (val) {
                self.user = null;
            })
        },
        data () {
            return {
                user: null  //当前用户名，未登录为空
            }
        },
        computed: {
            showPage: function () {
                if (this.user === null || this.user === undefined) {
                    return "loginPage"
                } else {
                    return "main"
                }
            }
        },
        components: {
            "page-header": header,
            "page-footer": footer
        }
    }
</script>