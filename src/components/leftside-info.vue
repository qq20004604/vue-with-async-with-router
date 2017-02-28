<template>
    <div class="nav">
        <div v-if="telState=='start-page'" class="tel">
            <div class="tel-title">起始页</div>
            <div class="tel-main"></div>
        </div>
        <div v-if="telState=='error-page'">
            <div class="tel-title">错误的电话号码</div>
            <div class="tel-main"></div>
        </div>
        <div v-if="telState=='tel-page'" class="tel">
            <div class="tel-title">{{telInfo.id}}</div>
            <div class="tel-main">
                <div class="row" v-for="(val, key) in infoList">
                    <template v-if="val.type==='n'">
                        <span class="row-left">{{val.text}}：</span>
                        <span class="row-right">{{telInfo[val.key]}}</span>
                    </template>
                    <div v-if="val.type==='m'">
                        <span class="row-left">{{val.text}}：</span>
                        <span class="row-right">{{telInfo[val.key] | formatMoney}}</span>
                    </div>
                    <div v-if="val.type==='f'">
                        <span class="row-left">{{val.text}}：</span>
                        <span class="row-right" style="color:#E3017F">2G:{{telInfo[val.key][0]}} | 3G:{{telInfo[val.key][1]}} | 4G:{{telInfo[val.key][2]}}</span>
                    </div>
                    <div v-if="val.type==='g'">
                        <span class="row-left">{{val.text}}：</span>
                        <span class="row-right">
                            <template v-for="v in telInfo[val.key]">
                                <span class="group-word">{{v}}</span>
                            </template>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .nav {
        height: 600px;
        width: 230px;
        background-color: white;
    }

    .tel {
        height: 100%;
        width: 100%;
        position: relative;
    }

    .tel-title {
        width: 100%;
        height: 30px;
        font-size: 18px;
        background-color: #349cd3;
        color: white;
        text-align: center;
        line-height: 30px;
    }

    .tel-main {
        position: absolute;
        top: 30px;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .row {
        line-height: 30px;
        font-size: 12px;
        min-height: 30px;
    }

    .row-left {
        width: 70px;
        display: inline-block;
        float: left;
        text-align: right;
    }

    .row-right {
        width: 150px;
        margin-left: 10px;
        display: inline-block;
        float: left;
        text-align: left;
        word-wrap: break-word;
    }

    .group-word {
        outline: 1px solid #333;
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        vertical-align: middle;
        text-align: center;
        margin-left: 5px;
        font-weight: 800;
    }

    .row-right .group-word:first-child {
        margin-left: 0;
    }
</style>
<script>
    //

    export default{
        data(){
            return {
                infoList: [
                    /*  王冬2017/2/27
                     *   type的值：
                     *   普通文本：n
                     *   群组：g
                     *   钱：m
                     *   流量：f
                     * */
                    {
                        key: "user",
                        text: "客户",
                        type: "n"
                    },
                    {
                        key: "certType",
                        text: "证件类型",
                        type: "n"
                    },
                    {
                        key: "netYear",
                        text: "网龄",
                        type: "n"
                    },
                    {
                        key: "localCity",
                        text: "归属地",
                        type: "n"
                    },
                    {
                        key: "package",
                        text: "套餐",
                        type: "n"
                    },
                    {
                        key: "group",
                        text: "群组",
                        type: "g"
                    },
                    {
                        key: "cash",
                        text: "账单",
                        type: "n"
                    },
                    {
                        key: "atLeast",
                        text: "保底",
                        type: "m"
                    },
                    {
                        key: "flow",
                        text: "流量",
                        type: "f"
                    },
                    {
                        key: "payType",
                        text: "付费",
                        type: "n"
                    },
                    {
                        key: "balance",
                        text: "余额",
                        type: "m"
                    }
                ],
                "telInfo": {
                    "id": "13429280040",
                    "user": "曹奕洁",
                    "certType": "身份证",
                    "netYear": "2012-03(5年)",
                    "localCity": "宁波市鄞州",
                    "package": "动感地带穿越套餐（第三代）",
                    "group": ['亲', '统', '虚', '融'],
                    "cash": '略', //不知道显示东西
                    "atLeast": "0", //需要被人民币显示过滤器处理
                    "flow": ["0%", "0%", "0%"], //流量，依次分为2、3、4G来显示
                    "payType": "后付费",
                    "balance": "10", //需要被人民币显示过滤器处理
                }
            }
        },
        computed: {
            telState: function () {
                if (typeof this.telInfo === 'null') {
                    return "start-page";
                }
                else if (typeof this.telInfo !== 'object') {
                    return "error-page"
                } else {
                    return "tel-page"
                }
            }
        },
        methods: {
            getInfo: function () {
                this.$on("")
            }
        }
    }


</script>
