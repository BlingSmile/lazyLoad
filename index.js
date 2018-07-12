/*
 * @Author: BlingBling 
 * @Date: 2018-07-12 15:23:51 
 * @Last Modified by: BlingBling
 * @Last Modified time: 2018-07-12 18:09:46
 */
 window.onload = function() {
     //获取所有img标签
    let imgs = document.getElementsByTagName('img');
    //可见区域高度
    let seeHeight =window.innerHeight; 
    //获取当前页面滚动条纵坐标的位置
    let scrollTop ;
    function lazyLoad(){
        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        for(let i=0;i<imgs.length;i++){
            //图片距离顶部距离
            let imgHeight = imgs[i].offsetTop;
            //图片自身高度
            let imageHeight = imgs[i].height;
            //提前一个图片加载
            if( imgHeight < seeHeight+scrollTop+imageHeight && imgs[i].src !== ''){
                imgs[i].src = imgs[i].getAttribute("data-src");
            }
        }
    }
    lazyLoad();
    
    //节流函数
    function throttle(func,delay){
        //函数节流模式开启true
        let canRun = true;
        return function () {
            if(!canRun){
                return
            }else{
                canRun = false;
                setTimeout(()=>{
                    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    func();
                    canRun = true;
                },delay);
            }
        }
    }
    // window.addEventListener('scroll',throttle(lazyLoad,500));

    //函数防抖
    function debounce (func,delay){
        let timer;
        return function(){
            clearInterval(timer);
            timer = setTimeout(()=>{
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                func();
            },delay)
        }
    }
    // window.addEventListener('scroll',debounce(lazyLoad,300));

    //结合函数防抖和函数节流
    function throttleAndDebounce (func,delay,gapTime){
        let time;
        let startTime = new Date();
        return function(){
            let curTime = new Date();
            clearInterval(time);

            if(curTime - startTime >= gapTime){
                //大于触发间隔，触发加载
                func();
                startTime = curTime;
            }else{
                //小于触发间隔，重新设置定时器
                time = setTimeout(func,delay);
            }
        }
    }
    //添加滚动条监听事件
    window.addEventListener('scroll',throttleAndDebounce(lazyLoad,500,1000));
    
 }
