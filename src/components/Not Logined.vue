<template>
    <div>
        <!--中间-->
        <div class="login-main-container">
            <!--左侧logo-->
            <div class="left-logo"></div>
            <!--右侧登录框-->
            <div class="right-login-area">
                <h1 class="login-title">
                    登录
                </h1>
                <div class="login-row">
                    <div class="row-left">账号：</div>
                    <div class="row-input"><input type="text" :class="{error:nameState}" v-model="username"
                                                  @blur="checkInput" :disabled="disabledInput"/></div>
                    <div class="row-right-alert" v-if="nameState">
                        <span v-if="nameState==='no-words'">请输入用户名</span>
                    </div>
                </div>
                <div class="login-row">
                    <div class="row-left">密码：</div>
                    <div class="row-input"><input type="password" :class="{error:pwState}" v-model="password"
                                                  @blur="checkInput" :disabled="disabledInput"/></div>
                    <div class="row-right-alert" v-if="pwState">
                        <span v-if="pwState==='no-words'">请输入密码</span>
                        <span v-if="pwState==='error-input'">密码只允许输入字母、数字和下划线</span>
                    </div>
                </div>
                <div class="login-info-area">
                    <span v-if="nameState==='error-input'" style="color:red">账号只允许输入字母、数字和下划线</span>
                    <span v-if="loginState==='isLogin'" style="color:#2f96b4" class="logining">登录中...........</span>
                    <span v-if="loginState==='errorNameOrPW'" style="color:red">用户名或密码错误</span>
                    <span v-if="loginState==='timeout'" style="color:red">登录失败，请客官重新登录...</span>
                    <span v-if="loginState==='successLogin'" style="color:#51a351">登录成功！</span>
                </div>
                <div class="btn" @click="login">登录</div>
            </div>
            <div style="clear:both"></div>
        </div>
        <!--中间-->
    </div>
</template>
<style scoped>
    /* 中间区域 */
    .login-main-container {
        margin-right: auto;
        margin-left: auto;
        width: 1200px;
        position: relative;
        padding-bottom: 100px;
    }

    .left-logo {
        padding-top: 50px;
        height: 700px;
        width: 500px;
        background: url("/src/assets/login-logo.png") no-repeat center;
        display: inline-block;
        float: left;
    }

    .right-login-area {
        position: absolute;
        top: 150px;
        height: 400px;
        width: 600px;
        display: inline-block;
        float: left;
        background: linear-gradient(#fff 0%, #ebebeb 100%);
        border: 2px solid #d0d0d0;
        border-radius: 20px;
    }

    .login-title {
        font-size: 24px;
        font-family: ProximaNovaSoft-Bold, Arial, sans-serif;
        font-weight: 400;
        text-transform: uppercase;
        text-align: center;
        margin-top: 100px;
    }

    /* 输入框组 */
    .login-row {
        height: 34px;
        line-height: 34px;
        margin-top: 20px;
    }

    .row-left {
        display: inline-block;
        width: 20%;
        height: 34px;
        line-height: 34px;
        vertical-align: top;
        text-align: right;
    }

    .row-input {
        display: inline-block;
        width: 50%;
        height: 34px;
        vertical-align: top;
    }

    .row-right-alert {
        display: inline-block;
        width: 25%;
        vertical-align: top;
        line-height: 30px;
        text-align: left;
        font-size: 14px;
        color: red;
    }

    .row-input input {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        display: table-cell;
        position: relative;
        z-index: 2;
        float: left;
        width: 100%;
        margin-bottom: 0;
        height: 34px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;
        color: #555;
        background-image: none;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
        transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
        background-color: white;
    }

    .row-input input.error {
        border: 2px solid red;
    }

    .row-input input.error:focus {
        outline: 2px solid red;
    }

    .row-input input[disabled] {
        cursor: not-allowed;
        background-color: #eee;
    }

    .login-info-area {
        height: 40px;
        line-height: 40px;
        padding-left: 71px;
    }

    .btn {
        position: relative;
        left: 40%;
        transform: translateX(-50%);
        margin-top: 20px;
        background-image: linear-gradient(to bottom, #5bc0de 0, #2aabd2 100%);
        background-repeat: repeat-x;
        text-shadow: 0 -1px 0 rgba(0, 0, 0, .2);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, .15), 0 1px 1px rgba(0, 0, 0, .075);
        color: #fff;
        background-color: #5bc0de;
        border-color: #46b8da;
        display: inline-block;
        padding: 10px 22px;
        font-size: 18px;
        font-weight: 400;
        line-height: 1.42857143;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        cursor: pointer;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: visible;
        text-transform: none;
        box-sizing: border-box;
    }

    .btn:hover {
        color: #fff;
        background-color: #31b0d5;
        border-color: #269abc;
    }

    .logining {
        overflow: hidden;
        display: inline-block;
        white-space: nowrap;
        animation: logining-text infinite 3s both;
    }

    @keyframes logining-text {
        0% {
            width: 48px;
        }
        100% {
            width: 70px;
        }
    }

    @media (max-width: 1200px) {
        .login-header-container, .login-main-container {
            width: 1170px;
        }
    }
</style>
<script>
    import Bus from '../event-bus.js'
    import USER from '../user'

    /*  王冬  2017/2/27
     *   登录逻辑：
     *   1、没点过登录按钮不提示任何信息；
     *   2、点过登录按钮后；
     *       2.1 用户名没填提示；
     *       2.2 密码没填提示；
     *       2.3 用户名和密码规则检查，不符合则提示；
     *       2.4 发起ajax，并提示登录中；
     *       2.5 登录中不能点击按钮或者修改用户名、密码，若登录失败/成功/过期则恢复；
     *   3、登录请求过期提示；
     *   4、登录请求成功：
     *       4.1 密码和账号不符合提示；
     *       4.2 登录成功后提示，然后延迟一秒后跳转；
     * */
    export default{
        created: function () {
        },
        data(){
            return {
                username: "1",
                password: "1",
                nameState: "",
                pwState: "",
                haveClickLoginBtn: false,   //是否已点过登录按钮
                loginState: "",
            }
        },
        computed: {
            disabledInput: function () {
                if (this.loginState === 'isLogin') {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            //输入检查
            checkInput: function () {
                //点击过登录按钮后才处理相关事件
                if (!this.haveClickLoginBtn) {
                    return;
                }
                //检查时，首先重置所有提示
                this.nameState = '';
                this.pwState = '';
                this.loginState = '';

                if (this.username.length === 0) {
                    this.nameState = "no-words";
                }
                if (this.password.length === 0) {
                    this.pwState = 'no-words';
                }
                if (!this.$service.onlyLetterNumberCharacter(this.username)) {
                    this.nameState = 'error-input';
                }
                if (!this.$service.onlyLetterNumberCharacter(this.password)) {
                    this.pwState = 'error-input';
                }
                //登录有错误状态则提示
                if (this.nameState || this.pwState) {
                    return false;
                }
                //否则返回true表示登录验证通过
                return true;
            },
            //登录函数
            login: function () {
                //todo test测试代码，变量控制，主要用来测试效果的
                var random = false; //每次随机生成效果
                if (random) {
                    var logining = Math.random() > 0.5;
                    var ajax = Math.random() > 0.5 ? 1 : 2;
                    var successLogin = Math.random() > 0.5;
                } else {
                    var logining = false;   //一直在登录true，跳过登录中效果false
                    var ajax = 1;   //请求成功1，失败/过期2
                    var successLogin = true;   //成功登录1，密码错误2
                }
                //如果已经登录成功了，则拒绝继续发起登录请求，防止重复点击登录
                if (this.loginState === 'successLogin') {
                    return;
                }

                this.haveClickLoginBtn = true;
                if (this.checkInput()) {
                    /*  王冬  2017/2/27
                     *   此时经过输入检查，应准许发起登录请求
                     *   通过这里发起ajax，然后设置ajax的过期时间
                     *   先设置isLogin为true，表示登录中
                     *   然后无论是请求成功/失败(过期)，都应该设置其为false
                     * */
                    this.loginState = 'isLogin';
                    if (logining) {
                        return;
                    }

                    //请求成功
                    if (ajax === 1) {
                        this.loginState = '';
                        //然后查看是否登录成功
                        if (successLogin) {
                            //重置其他状态
                            this.nameState = '';
                            this.pwState = '';
                            //登录成功
                            this.loginState = 'successLogin';

                            //这个应该是通过ajax拿到的用户名，这里写个测试用例
                            var username = "张三";   //todo test

                            //todo 然后在这里写跳转逻辑
                            //1秒后跳转
                            setTimeout(function () {
                                //emit事件，进行跳转
                                USER.user = username;
                                router.push("user")
                            }, 1000);
                            return;
                        } else {
                            //登录失败
                            this.loginState = 'errorNameOrPW';
                            //重置其他状态
                            this.nameState = '';
                            this.pwState = '';
                            //清空用户名
                            this.password = '';
                            return;
                        }

                    }
                    //请求失败、过期
                    else if (ajax === 2) {
                        this.loginState = 'timeout';

                    }
                }
            }
        }
    }
</script>
