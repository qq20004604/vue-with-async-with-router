<template>
    <div>
        <div class="service-telphone">
            <input type="number" maxlength="11" class="normal-input" v-model="tel" :class="telState"
                   @blur="testTelNumber"
                   @keyup.enter="post">
            <span class="btn-normal btn" @click="post">搜索</span>
            <span v-if="telState.fail" style="color:red" class="tips">号码不合法！</span>
            <span v-if="ajaxState==='success'" style="color:green" class="tips">请求成功！</span>
            <span v-if="ajaxState==='error'" style="color:red" class="tips">后台请求失败！</span>
        </div>
    </div>
</template>
<style scoped>
    .btn {
        margin-top: 20px;
    }

    .service-telphone {
        width: 500px;
        height: 60px;
        display: inline-block;
        overflow: hidden;
    }

    .success {
        border-color: #5cb85c;
        outline: none;
    }

    .fail {
        border-color: red;
    }

    .fail:focus {
        outline: red 1px solid;
    }

    .normal-input {
        margin-top: 20px;
        width: 200px;
    }

    /*防止输入框出现上下箭头*/
    .normal-input::-webkit-outer-spin-button,
    .normal-input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }

    .tips {
        display: inline-block;
        margin-top: 20px;
        margin-left: 10px;
        line-height: 34px;
        vertical-align: middle;
        font-size: 14px;
    }

</style>
<script>
    //号码输入区域
    import bus from '../event-bus.js'
    //    import service from '../service.js'
    export default{
        name: "service-telphone",
        created: function () {
        },
        data(){
            return {
                tel: "17740808894",
                telState: {
                    success: false,
                    fail: false
                },
                ajaxState: "",
                timeout: null
            }
        },
        computed: {},
        methods: {
            //电话号码合法性测试
            testTelNumber: function () {
                //如果电话号码长度为0，则什么都不显示
                if (this.tel.length === 0) {
                    this.telState.success = false;
                    this.telState.fail = false;
                    return false;
                }
                var result = this.$service.telNumberCheck(this.tel);
                if (result) {
                    this.telState.success = true;
                    this.telState.fail = false;
                    return true;
                } else {
                    this.telState.success = false;
                    this.telState.fail = true;
                    return false;
                }
            },
            post: function () {
                //测试通过
                if (this.testTelNumber()) {
                    var self = this;
                    if (this.ajaxState === 'success') {
                        return;
                    }
                    //todo  目前是随机生成ajax的状态
                    //理论上这里是一个ajax函数，以下内容是ajax请求成功或失败后的回调函数
                    var ajax = Math.random() > 0.5 ? true : false;
                    console.log(ajax);
                    if (ajax) {
                        //当成功后需要做一些事情，比如发个请求，将成功的信息传递给别的组件
                        bus.$emit("");
                        if (this.timeout) {
                            clearTimeout(this.timeout)
                        }
                        self.ajaxState = 'success';
                        self.tel = '';
                        self.telState.success = false;
                        self.telState.fail = false;
                        setTimeout(function () {
                            self.ajaxState = '';
                        }, 3000)
                    } else {
                        this.ajaxState = 'error';
                        if (this.timeout) {
                            clearTimeout(this.timeout)
                        }
                        this.timeout = setTimeout(function () {
                            self.ajaxState = '';
                        }, 2200)
                    }
                } else {
                    if (this.tel.length !== 0) {
                        alert("输入不合法，请重新输入");
                    }
                }
            }
        },
        components: {}
    }
</script>
