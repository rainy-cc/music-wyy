//自定义滚动条
export function scrollFn(contentWrap, content, barWrap, scrollbar) {
    //滚动条长度
    var barHeightScale = (contentWrap.clientHeight / content.clientHeight).toFixed(2);

    if (barHeightScale >= 1) {
        scrollbar.style.display = 'none';
        contentWrap.onmousewheel=function(ev){
            ev.preventDefault();
        };
        if(contentWrap.addEventListener){
            contentWrap.addEventListener('DOMMouseScroll',function(ev){
                ev.preventDefault();
            });
        }
        return;
    }
    scrollbar.style.display = 'block';
    scrollbar.style.height = barWrap.clientHeight * barHeightScale + 'px';
    //按下滚动条
    scrollbar.onmousedown = function(ev) {
        var startPoint = ev.clientY - scrollbar.offsetTop;
        document.onmousemove = function(ev) {
            var top = ev.clientY - startPoint;
            if (top <= 0) {
                top = 0;
            }
            if (top >= barWrap.clientHeight - scrollbar.clientHeight) {
                top = barWrap.clientHeight - scrollbar.clientHeight;
            }
            //计算比例
            var scale = top / (barWrap.clientHeight - scrollbar.clientHeight);
            var cony = scale * (content.clientHeight - contentWrap.clientHeight);
            scrollbar.style.top = top + 'px';
            content.style.top = -cony + 'px';
            console.log(top);
        };
        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
        }

        ev.preventDefault();//阻止默认事件
    }
    var str = window.navigator.userAgent.toLowerCase();
    if (str.indexOf('firefox') != -1) { //火狐浏览器
        contentWrap.addEventListener('DOMMouseScroll', function(ev) {
            ev.preventDefault(); //阻止窗口默认的滚动事件
            if (ev.detail < 0) {
                var t = content.offsetTop + 20;
                if (t >= 0) {
                    t = 0;
                }
                if (t <= -(content.clientHeight - contentWrap.clientHeight)) {
                    t = -(content.clientHeight - contentWrap.clientHeight);
                }
                var scale = t / (content.clientHeight - contentWrap.clientHeight);
                var top = scale * (barWrap.clientHeight - scrollbar.clientHeight);
                content.style.top = t + 'px';
                scrollbar.style.top = -top + 'px';
            }
            if (ev.detail > 0) {
                t = content.offsetTop - 20;
                if (t >= 0) {
                    t = 0;
                };
                if (t <= -(content.clientHeight - contentWrap.clientHeight)) {
                    t = -(content.clientHeight - contentWrap.clientHeight);
                };
                scale = t / (content.clientHeight - contentWrap.clientHeight);
                top = scale * (barWrap.clientHeight - scrollbar.clientHeight);
                content.style.top = t + 'px';
                scrollbar.style.top = -top + 'px';
            };
        }, false);
    } else { //非火狐浏览器
        contentWrap.onmousewheel = function(ev) {

            if (ev.wheelDelta > 0) {
                var t = content.offsetTop + 20;
                if (t >= 0) {
                    t = 0;
                }
                if (t <= -(content.clientHeight - contentWrap.clientHeight)) {
                    t = -(content.clientHeight - contentWrap.clientHeight);
                }
                var scale = t / (content.clientHeight - contentWrap.clientHeight);
                var top = scale * (barWrap.clientHeight - scrollbar.clientHeight);
                content.style.top = t + 'px';
                scrollbar.style.top = -top + 'px';
            }
            if (ev.wheelDelta < 0) {
                t = content.offsetTop - 20;
                if (t >= 0) {
                    t = 0;
                }
                if (t <= -(content.clientHeight - contentWrap.clientHeight)) {
                    t = -(content.clientHeight - contentWrap.clientHeight);
                }
                scale = t / (content.clientHeight - contentWrap.clientHeight);
                top = scale * (barWrap.clientHeight - scrollbar.clientHeight);
                content.style.top = t + 'px';
                scrollbar.style.top = -top + 'px';
            }
            ev.preventDefault();
        };
    }
}
