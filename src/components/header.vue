<template>
    <div>
        <!--顶部-->
        <header class="login-header">
            <div class="login-header-container">
                <a href="#">首页</a>
                <a @click="test" v-if="user">你好! {{user}}</a>
                <a @click="logout" v-if="user">登出</a>
            </div>
        </header>
        <!--顶部-->
    </div>
</template>
<style scoped>
    .login-header {
        width: 100%;
        height: 40px;
        background-image: linear-gradient(to bottom, #3c3c3c 0, #222 100%);
        color: white;
        font-size: 16px;
        line-height: 40px;
    }

    .login-header a {
        text-shadow: 0 -1px 0 rgba(0, 0, 0, .25);
        color: #9d9d9d;
        text-decoration: none;
        height: 100%;
        display: inline-block;
        padding: 0 15px;
    }

    /* 当a标签加上class为active时，颜色变化 */
    .login-header a.active {
        color: #fff;
        background-color: #080808;
        box-shadow: inset 0 3px 9px rgba(0, 0, 0, .25);
        background-image: linear-gradient(to bottom, #080808 0, #0f0f0f 100%);
        background-repeat: repeat-x;
    }

    /* header包含a标签的部分，另外的是中间部分 */
    .login-header-container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }

</style>
<script>
    import Bus from '../event-bus.js'

    export default{
        name: "header",
        created: function () {
            var self = this;
            Bus.$on("/login-success", function (val) {
                self.user = val;
            });
            Bus.$on("/logout", function () {
                self.user = "";
            })
        },
        data(){
            return {
                user: "",
                abc: "2"
            }
        },
        methods: {
            test: function () {
//                this.$router.push({path: '/index'})
                console.log(this.abc);
            },
            logout: function () {
                Bus.$emit("/logout");
            }
        },
    }
</script>
