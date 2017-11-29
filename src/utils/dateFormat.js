function format(time, fmt) {
    var date = new Date(time);
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;

}
/*
    将歌曲持续时间么长转化为分钟加秒数
    duration : ms
*/
function changeDuration(duration) {
    duration /= 1000;
    var time;
    var min = toZero(Math.floor(duration / 60));
    var sec = toZero(Math.floor(duration - (min * 60)));
    time = min + ":" + sec;
    return time;
}

function formatDuration2(duration) {
    duration /= 1000;
    var time;
    var min = Math.floor(duration / 60);
    var sec = toZero(Math.floor(duration - (min * 60)));
    time = min + "分" + sec + "秒";
    return time;
}

//补0
function toZero(num) {
    return num < 10
        ? '0' + num
        : num + '';
}
/**
 * [getDate 计算时间差]
 * @param  {[String]} time [毫秒数]
 * @return {[String]}      [时间字符串]
 */
function getDate(time) {
    var str = '';
    var last = new Date(time);
    var now = new Date();
    var disTime = now.getTime() - last.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (now.getFullYear() > last.getFullYear()) {
        //时间差大于一年
        str =last.getFullYear()+'年'+(last.getMonth() + 1)+'月'+last.getDate()+'日';
    } else {
        //时间差小于等于1年
        if (now.getMonth() == last.getMonth()) {
            //时间差小于一个月
            if (now.getDate() == last.getDate()) {
                //时间差小于1天
                if (disTime / 1000 < 60) {
                    //差值小于60s
                    str = '刚刚';
                } else if ((disTime / 60000) < 60) {
                    //差值小于一小时
                    str =  parseInt((disTime / 60000), 10) + '分钟前';
                } else {
                    str = toZero(last.getHours()) +':'+toZero(last.getMinutes());
                }
            } else if (now.getDate() == last.getDate() + 1) {
                //时间差一天
                str='昨天'+toZero(last.getHours())+':'+toZero(last.getMinutes()) ;
            } else if (now.getDate() == last.getDate() + 2) {
                //时间差两天
                str='前天'+toZero(last.getHours())+':'+toZero(last.getMinutes());
            } else {
                //事件差大于两天就显示月日
                str = (last.getMonth() + 1) + '月' + last.getDate() + '日';
            }
        } else {
            str = (last.getMonth() + 1) + '月' + last.getDate() + '日';
        }
    }
    return str;
}
export {format,changeDuration,formatDuration2,getDate};
