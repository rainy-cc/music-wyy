const timeExp = /\[(\d{2,}):(\d{2})(?:[\.:](\d{1,3}))?\]/g //匹配时间的正则
export function parseLrc(lrc) {
    var lrcArr=[];//存放最后生成的歌词
    var lines = lrc.split('\n'); //生成数组
    for (var i = 0; i < lines.length; i++) {
        const line = lines[i];

        var result = timeExp.exec(line);
        if (result) {
            const txt = line.replace(timeExp, '').trim();
            //if (txt) {
                lrcArr.push({
                    time: result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 1,
                    txt
                });
            //}

        }
    }
    //按时间排序
    lrcArr.sort(function( a, b ){
        return a.time - b.time;
    });
    return lrcArr;
}
