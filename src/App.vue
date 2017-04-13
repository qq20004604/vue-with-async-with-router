<template>
    <div>
        <page-header></page-header>
        <div :class="{loginBackground:!user}">
            <router-view></router-view>
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
    import USER from './user'
    //样式列表
    import style from './components/style-list.vue'
    export default {
        name: 'app',
        created: function () {
        },
        data () {
            return {}
        },
        computed: {
            user(){
                return USER.user
            }
        },
        components: {
            "page-header": header,
            "page-footer": footer
        }
    }
</script>