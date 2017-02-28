/*  说明：
 *  插件demo，供学习使用
 *  本页面用于提供各种处理服务
 *  作者：王冬   QQ：20004604
 *  功能有：
 *  1、时间格式化过滤器
 *  2、电话号码合法性检查；
 *  3、
 * */
export default {
    install: function (Vue, options) {
        //  时间格式化过滤器，输入内容是number或者Date对象，输出是YYYY-MM-DD HH-MM-SS
        Vue.filter('formatTime', function (value) {
            Date.prototype.Format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt))
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
            return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
        })

        //数字过滤为 XX.YY元 格式的人民币显示过滤器
        Vue.filter('formatMoney', function (value) {
            var number = Number(value);
            if ((typeof value !== 'number' && typeof value !== 'string') || isNaN(number)) {
                return "- 元";
            }
            return number.toFixed(2) + " 元";
        })

        //  服务组，将实例方法整合到$service中，避免命名冲突
        Vue.prototype.$service = {
            //电话号码合法性检查
            telNumberCheck: function (tel) {
                var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
                return pattern.test(tel)
            },
            //输入合法性检查，只允许是字母（大小写）数字下划线
            onlyLetterNumberCharacter: function (val) {
                //不是字符串直接返回错误
                if (typeof val !== 'string') {
                    return false;
                }
                //如果要修改匹配规则，则修改这里
                var reg = /\w/g;
                //替换掉所有符合规则的字符，如果剩余字符长度大于0，显然不符合
                if (val.replace(reg, "").length > 0) {
                    return false;
                }
                return true;
            }
        }
    }
};
