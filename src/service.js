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
            },
            //封装的ajax设置，这个是promise版的
            ajaxByPromise: function (options) {
                /*  参数
                 *   1、类型对象，以下是key：
                 *   2、url：链接
                 *   3、type：请求方式
                 *  目前没有出错处理
                 *  回调函数通过ajax.then(成功函数, 失败函数)来使用\
                 *      ajax({
                 *          url: "/getForLearn",
                 *          type: "GET"
                 *      }).then(function (val) {
                 *              console.log(val)
                 *      })
                 * */
                var promise = new Promise(function (resolve, reject) {
                    var req = new XMLHttpRequest();
                    req.open(options.type, options.url);
                    //这里可以后续添加其他设置

                    req.onreadystatechange = function () {
                        console.log(req);
                        if (req.readyState != 4) {
                            return;
                        }
                        if (req.status === 200) {
                            //事件正常，请求成功
                            resolve(req.response);
                        }
                        else {
                            reject(new Error(this.statusText));
                        }
                        return true;
                    }
                    req.send();
                });
                return promise;
            },

            //封装的另外一个ajax，这个是非promise版的，类似jquery，具体见注释
            ajax: function (options) {
                /*  参数
                 *   1、类型对象，以下是key：
                 *   2、url：链接
                 *   3、type：请求方式
                 *  目前没有出错处理
                 *  回调函数通过ajax.then(成功函数, 失败函数)来使用
                 *  示例代码：
                 ajax({
                 url: "/getForLearn",
                 type: "GET"
                 }).done(function (val) {
                 console.log(val)
                 }).fail(function (err) {
                 console.error(err);
                 })
                 * */
                var obj = {};
                //分别表示成功和失败函数
                var success, fail, doing;
                obj.done = function (success2) {
                    success = success2;
                    return obj;
                }
                obj.fail = function (fail2) {
                    fail = fail2;
                    return obj;
                }
                obj.doing = function (doing2) {
                    doing = doing2;
                    return obj;
                }
                var req = new XMLHttpRequest();
                req.open(options.type, options.url, true);
                //这里可以后续添加其他设置

                req.onreadystatechange = function () {
                    //请求发出之后会执行以下这段代码
                    if (req.readyState === 2) {
                        doing();
                        return;
                    }
                    if (req.readyState !== 4) {
                        return;
                    }
                    if (req.status === 200) {
                        success(req.response);
                    }
                    else {
                        fail(this.statusText);
                    }
                    return true;
                }
                req.send();
                return obj;
            }
        }
    }
};
