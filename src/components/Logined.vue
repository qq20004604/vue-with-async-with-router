<template>
    <div class="main">
        <search-search></search-search>
        <leftSide></leftSide>
    </div>
</template>
<style scoped>
    .main {
        width: 1200px;
        margin: 0 auto;
        min-height: 800px;
    }

</style>
<script>
    import leftSide from './leftside-info.vue'
    export default{
        name: "main",
        created: function () {
        },
        data(){
            return {}
        },
        methods: {},
        components: {
            searchSearch: function (resolve) {
                //异步组件写法
                require(['./service-telphone.vue'], resolve)
            },
            leftSide
        }
    }
</script>
