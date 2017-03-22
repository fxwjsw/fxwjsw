
$(function () {
    var dishus=$(".dishus");//地鼠所在地洞层
});
var isOpenVoice=true;//是否开启声音
var isPlay=true;//是否继续游戏


/*地鼠类*/
var Mouse;
Mouse = {
    mouses:document.querySelector('.dishus'),
    mouseStyle:1,
    dishus:$(".dishus"),
    init: function () {
        var _this = this;

        this.mouses.onclick = function (e) {
            _this.clickMouse(e);
        }
        this.mouses.onmousemove = function () {
            Mouse.dishus.addClass("c_1");
        }//获取鼠标
        this.mouses.onmousedown = function () {
            Mouse.dishus.addClass("c_3");
        }//按下鼠标
        this.mouses.onmouseup = function () {//松开鼠标
            Mouse.dishus.removeClass("c_3");
            Mouse.dishus.removeClass("c_2");
        }
    },
    mouseHide: function (mouse) {
        $(mouse).css("top", "100%");
    },//地鼠隐藏
    mouseShow: function (mouse) {
        $(mouse).css("top", "22.5%");
    },//地鼠出现
    creatMouse:function () {//创建地鼠
        //判断剩余多少洞，剩余洞的data-show属性为0
        var hidehole = document.querySelectorAll('.dishu[data-show="0"]');
        //没有剩余的洞时方法停止不再创建地鼠
        if (hidehole.length <= 0) {
            return;
        }
        //创建一个小于剩余洞数的随机数
        var randomNum = Math.round(Math.random() * (hidehole.length - 1));
        //更改随机数选中的这个洞的data-show属性为这个随机数
        hidehole[randomNum].setAttribute("data-show", randomNum);
        //让地鼠显示
        if (hidehole[randomNum].getAttribute("data-show") != 0&&hidehole[randomNum].getAttribute("data-c") !="c") {

            Mouse.mouseShow(hidehole[randomNum]);
            hidehole[randomNum].removeAttribute("data-surplusTime");//移除剩余时间属性
            hidehole[randomNum].setAttribute("data-showTime",(new Date()).getTime());
        }
        Mouse.fadeMouse(hidehole[randomNum]);
    },
    fadeMouse:function(randomMouse){//地鼠3秒后消失
        //当前要显示的地鼠在数组的下标
        for (var i = 0; i < Game.holes.length; i++) {
            if (randomMouse == Game.holes[i]) {
                break;
            }
        }
        if (Game.tl[i]) {
            clearTimeout(Game.tl[i]);
        }//清除地鼠消失的计时器数组

        Game.tl[i] = setTimeout(function () {
            Mouse.missMouse(randomMouse);
        },3000);

    },
    missMouse: function (mouse) {//地鼠未被击中

        if (mouse.getAttribute("data-show") != 0&&mouse.getAttribute("data-c") !="c") {
            mouse.removeAttribute("data-surplusTime");
            mouse.removeAttribute("data-showTime");

            $(mouse).addClass("dishu"+Mouse.mouseStyle+"_wjz");
            if (isOpenVoice)(xiao.play());
            setTimeout(function () {//地鼠发笑需要0.5秒
                //hideholeRandomNum.style.zIndex=-2;
                Mouse.mouseHide(mouse);

            }, 500);
            setTimeout(function () {////地鼠隐藏需要0.5秒
                $(mouse).removeClass("dishu"+Mouse.mouseStyle+"_wjz");
                mouse.setAttribute("data-show", "0");
            },1000);
            Game.chances -= 1;//血量减1
            Game.chance.innerHTML = "血量：" + Game.chances;//显示血量
            Game.gameOver();
        }
    },
    clickMouse: function (e) {
        //target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口。
        //是否点击地鼠节点
        if ($(e.target).hasClass("dishu")) {
            //data-c属性标志地鼠是否被点击
            e.target.setAttribute("data-c", "c");
            //击中后眩晕
            $(e.target).addClass("dishu"+Mouse.mouseStyle+"_jz_1");//地鼠变形
            Mouse.dishus.addClass("c_2");//鼠标指针变形

            //眩晕后受伤
            function st1() {
                $(e.target).removeClass("dishu"+Mouse.mouseStyle+"_jz_1");
                Mouse.dishus.removeClass("c_2");
                $(e.target).addClass("dishu"+Mouse.mouseStyle+"_jz_2");
            }
            //受伤后隐藏
            function st2() {
                Mouse.mouseHide(e.target);
                $(e.target).removeClass("dishu"+Mouse.mouseStyle+"_jz_2");
            }
            //隐藏需要0.5秒
            function st3() {
                e.target.setAttribute("data-show", "0");//改变地鼠data-show属性为0
                e.target.setAttribute("data-c", "s");
            }
            setTimeout(st1, 500);
            setTimeout(st2, 1000);
            setTimeout(st3, 1500);
            for (var i = 0; i < Game.holes.length; i++) {
                //该节点是当前地鼠对象
                if (e.target == Game.holes[i]) {
                    clearTimeout(Game.tl[i]);//清除地鼠消失的计时器数组
                    if (isOpenVoice)(da.play());
                    Game.points++;
                    Game.point.innerHTML = "分数：" + Game.points;
                    //升级判断
                    Game.shengJiPuanDuan();
                    break;
                }
            }

        }
    }
};

/*地鼠类end*/
/*游戏类*/
//重置游戏开关
var Game={
    points:0,//分数
    chances:3,//血量
    ranks:1,//级别
    tl:[],//地鼠消失的计时器数组
    t:"",//每隔一段时间创建地鼠
    point:"",//分数dom
    chance:"",//血量dom
    rank:"",//等级dom
    holes:document.querySelectorAll('.dishu'),//地鼠数组
    background_setting:document.querySelector('.background_setting'),
    dishu_setting:document.querySelector('.dishu_setting'),
    /*personage:document.querySelector('.personage'),*/
    pause:document.querySelector('.pause'),//暂停游戏开关
    playAgain:document.querySelector('.playAgain'),
    dianJiKaiShiDiv:document.querySelector('.dianJiKaiShiDiv'),
    init:function(){
        var _this=this;
        Mouse.init();
        this.point=document.querySelector('.point');
        this.chance=document.querySelector('.chance');
        this.rank=document.querySelector('.rank');

        var timing=true;
        this.pause.onclick= function () {
            if(isPlay){//暂停
                _this.pauseGame();
                timing=false;
                setTimeout(function(){
                    timing=true;
                },1000);//一秒后才能再次点击继续
            }else{//继续
                if(timing){
                    _this.pauseGame();
                }
            }
        };
    },
    startGame: function () {
        Game.dishu_setting.style.display="none";
        /*Game.personage.style.display="none";*/
        Game.background_setting.style.display="none";
        voice.style.display='block';

        this.point.style.display='block';
        this.rank.style.display='block';
        this.chance.style.display='block';
        this.playAgain.style.display='block';
        this.pause.style.display='block';
        if(isOpenVoice)(bj.play());
        if(isOpenVoice)(start.play());
        dianJiKaiShiDiv.style.display="none";
        //每隔一段时间执行创建地鼠方法
        Game.t=setInterval(Mouse.creatMouse,1000-Game.ranks*100);
    },
    resetGame: function () {
        Mouse.mouseHide($(".dishu"));
        if(!isPlay){
            isPlay=true;
            this.pause.style.backgroundImage='url(./img/stopXiao.png)';
        }
        $(".dishu").attr("data-show","0");
        if(Game.t){clearInterval(Game.t);}

        //遍历地鼠数组并清空地鼠计时器数组
        for (var i=0; i<Game.holes.length; i++) {
            if(Game.tl[i]){clearTimeout(Game.tl[i])};
            Game.holes[i].removeAttribute("data-surplusTime");
            Game.holes[i].removeAttribute("data-showTime");
        }
        Game.dishu_setting.style.display="block";
        /*Game.personage.style.display="block";*/
        Game.background_setting.style.display="block";
        playGame.style.display="block";
        this.playAgain.style.display='none';
        this.pause.style.display='none';
        this.point.style.display='none';
        this.rank.style.display='none';
        this.chance.style.display='none';
        this.points=0;//分数
        this.chances=3;//血量
        this.ranks=1;//级别
        this.tl=[];//地鼠消失的计时器数组
        this.t="";//随机出地鼠
        this.dianJiKaiShiDiv.style.display='block';

        this.point.innerHTML='分数：'+this.points;
        this.chance.innerHTML='血量：'+this.chances;
        this.rank.innerHTML='等级：'+this.ranks;
    },
    //暂停继续游戏
    pauseGame: function () {
        if(isPlay){//暂停
            isPlay=false;
            Game.pause.style.backgroundImage='url(./img/play1.png)';
            //if(isOpenVoice){bj.pause();}
            clearInterval(Game.t);
            Mouse.mouses.onclick=function(){};
            //console.log("事件解绑");
            var pauseTime=(new Date()).getTime();//暂停时间
            var surplusTime=0;//剩余时间
            var showTime=0;//创建或继续时间

            //遍历地鼠数组并清空地鼠计时器数组
            for (var i=0; i<Game.holes.length; i++) {
                clearTimeout(Game.tl[i]);
                //当前未隐藏的地鼠
                if(Game.holes[i].getAttribute("data-show") != 0&&Game.holes[i].getAttribute("data-c") !="c"){
                    //点击暂停时尚未隐藏的地鼠的剩余时间（尚未暂停过的为3000）
                    surplusTime=Game.holes[i].getAttribute("data-surplusTime");
                    showTime=Game.holes[i].getAttribute("data-showTime");
                    //为剩余时间大于0的地鼠添加剩余时间
                    if(Game.holes[i].style.top=="22.5%"){

                        if(surplusTime!=null&&surplusTime>0) {
                            surplusTime = surplusTime - (pauseTime - showTime);
                        }
                        if(surplusTime==null){
                            surplusTime = 3000 - (pauseTime - showTime);
                        }
                    }else{
                        Game.holes[i].removeAttribute("data-surplusTime");
                    }

                    Game.holes[i].setAttribute("data-surplusTime", surplusTime);
                }
            }
        }else{//继续
            isPlay=true;
            this.pause.style.backgroundImage='url(./img/stopXiao.png)';
            Mouse.mouses.onclick=function (e) {Mouse.clickMouse(e);};
            var continueTime=(new Date()).getTime();//点击继续时系统时间
            var surplusTime=0;
            //if(isOpenVoice){bj.play();}
            for (var i=0; i<Game.holes.length; i++) {
                //当前未隐藏的地鼠
                if(Game.holes[i].getAttribute("data-show") != 0&&Game.holes[i].getAttribute("data-c") !="c"){
                    surplusTime=Game.holes[i].getAttribute("data-surplusTime");
                    //剩余时间不为0的地鼠
                    if(surplusTime>0){
                        //用点击继续时的时间替换创建地鼠时的时间
                        Game.holes[i].setAttribute("data-showTime",continueTime);
                        //在剩余时间后执行隐藏地鼠方法
                        (function (i) {
                            Game.tl[i] = setTimeout(function () {
                                Mouse.missMouse(Game.holes[i]);
                            },surplusTime);
                        })(i);
                    }else{
                        Mouse.missMouse(Game.holes[i]);
                    }
                }
            }
            Game.t=setInterval(Mouse.creatMouse,1000-Game.ranks*100);

        }
    },
    gameOver: function () {
        //血量小于1
        if (this.chances<1) {
            clearInterval(Game.t);
            //遍历地鼠数组并清空地鼠计时器数组
            for (var i=0; i<Game.holes.length; i++) {
                clearTimeout(Game.tl[i]);
            }
            if(isOpenVoice){bj.pause();}//pause() 方法停止（暂停）当前播放的音频或视频。
            setTimeout(function(){
                alert("game over");
                Game.resetGame();
            },500);
            //window.location.reload();//刷新页面
        }
    },
    shengJiPuanDuan: function () {
        if (this.points>15+(this.ranks*5)) {
            this.ranks+=1;
            if(isOpenVoice)(shengji.play());
            alert("等级"+this.ranks);
            this.points=0;
            this.point.innerHTML="分数："+this.points;
            this.rank.innerHTML="等级："+this.ranks;
        }
    }
}
//开始游戏开关
var playGame=document.querySelector('.dianJiKaiShiDiv_play');
//点击开始
var dianJiKaiShiDiv=document.querySelector('.dianJiKaiShiDiv');
playGame.onclick= function () {
    Game.init();
    Game.resetGame();
    Game.startGame();
};
//重新开始
Game.playAgain.onclick= function () {
    Game.init();
    Game.resetGame();
};
/*游戏类end*/
/*
 * 面向对象
 * */
/*
 <!--新浪微博分享-->
 (function(){
 var share=document.querySelector('.share');
 var _w = 60 , _h = 42;
 var param = {
 url:location.href,
 type:'2',
 appkey:'', */
/**您申请的应用appkey,显示分享来源(可选)*//*
 title:'这是一款可爱的打地鼠游戏',
 pic:'', */
/**分享图片的路径(可选)*//*

 ralateUid:'', */
/**关联用户的UID，分享微博会@该用户(可选)*//*

 language:'zh_cn', */
/**设置语言，zh_cn|zh_tw(可选)*//*

 rnd:new Date().valueOf()
 }
 var temp = [];
 for( var p in param ){
 temp.push(p + '=' + encodeURIComponent( param[p] || '' ) )
 }
 share.innerHTML ='<iframe allowTransparency="true" frameborder="0" scrolling="no" src="http://hits.sinajs.cn/A1/weiboshare.html?' + temp.join('&') + '" width="'+ _w+'" height="'+_h+'"></iframe>';
 })()*/
