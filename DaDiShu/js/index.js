
/*<!--声音-->*/
var da = document.querySelector('.da');
var xiao = document.querySelector('.xiao');
var shengji = document.querySelector('.shengji');
var bj = document.querySelector('.bj');
var start = document.querySelector('.start');
var isOpenVoice=true;//是否开启声音
var isPlay=true;//是否继续游戏
var voice=document.querySelector('.voice');
var index_dishu_setting=0;//选择地鼠图片下标
var index_background_setting=0;//选择背景图片下标

/*声音开关*/
voice.addEventListener("click",function () {
    if(isOpenVoice){
        isOpenVoice=false;
        voice.style.backgroundImage='url(./img/shengNew1.png)';
        bj.pause();
    }else{
        isOpenVoice=true;
        voice.style.backgroundImage='url(./img/shengNew.png)';
        bj.play();
    }
},false);
/*声音开关end*/
//页面切换方法
function changeBack(num,data_none,data_block){
    if(num=="A"){
        changePageA(data_none,data_block);
    }
}
function changePageA(data_none,data_block) {//淡入淡出
    //data_none需要淡出的元素data-page
    //data_block需要淡入的元素data-page
    $("div[data-page='"+data_block+"']").css("zIndex","2");
    $("div[data-page='"+data_none+"']").css("zIndex","1");

    $("div[data-page='"+data_block+"']").css("opacity","0");
    $("div[data-page='"+data_block+"']").css("visibility","visible");
    //stop([clearQueue],[gotoEnd]);
    //clearQueue代表是否清空未执行完的动画队列，gotoEnd代表是否直接将正在执行的动画跳转到末状态。
    $("div[data-page='"+data_block+"']").stop(true,true).animate({opacity:"1"},1000);
    $("div[data-page='"+data_none+"']").stop(true,true).animate({opacity:"0"},1000);
}
/*进度条
var interval = setInterval(increment,30);
var current = 0;
function increment(){
    current++;
    if(current ==90) {
        clearInterval(interval);
        parent.changePageA("page_loading","page_index");
    }
}
进度条end*/
parent.changePageA("page_loading","page_index");
$(function(){
    
    //进入页面计算css
    function dishusCss() {
        var height=$(window).height();
        $('.index_div').height(height);
        //地洞层实际宽度
        var dishus_wh = document.querySelector('.dishus').offsetWidth;
        //开始游戏按钮宽度
        var dianJiKaiShiDiv_play_wh=document.querySelector('.dianJiKaiShiDiv_play').offsetWidth;
        var dianJiKaiShiDiv_play_he=dianJiKaiShiDiv_play_wh*126/161;
        //地鼠实际宽度
        var dishu_wh = document.querySelector(".dishu").offsetWidth;
        var dishu_he=dishu_wh*79/74;
        $(".dishu").css("height",dishu_he);

        var dishu_d_he=dishus_wh*99/320;
        var dishu_d_he1=dishus_wh*131/320;
        var dishu_c_he=dishus_wh*22/320;
        $(".dianJiKaiShiDiv_play").css("height",dianJiKaiShiDiv_play_he);

        $(".dishus_d1").css("height",dishu_d_he);
        $(".dishus_d2").css("height",dishu_d_he);
        $(".dishus_d3").css("height",dishu_d_he);
        $(".dishus_d4").css("height",dishu_d_he1);
        $(".dishus_c1").css("height",dishu_c_he);
        $(".dishus_c2").css("height",dishu_c_he);
        $(".dishus_c3").css("height",dishu_c_he);
    }
    dishusCss();

    $("div[data-action='pageBack']").on("click",function () {//返回键
        var parentDiv=$(this).parent().parent();
        changeBack("A",parentDiv.attr("data-page"),"page_index");
    });
    /*背景选择部分*/

    var mySwiper_background_setting=new Swiper(".swiper-container-background-setting",{
        pagination : '.swiper-pagination-background-setting',
        slidesPerView:3,
        //setWrapperSize :true,//使用flexbox布局
        centeredSlides:true,//首个slide居中
        bulletClass : 'swiper-pagination-background-setting-bullet',//分页器元素类名

        onInit: function (swiper) {
            $(".swiper-container-background-setting .slideImg:eq("+swiper.activeIndex+")").addClass("changeImg");
        },
        onSlideChangeStart:function(swiper){
            $(".swiper-container-background-setting .slideImg").removeClass("changeImg");
        },
        onSlideChangeEnd:function(swiper){
            index_background_setting=swiper.activeIndex;
            $(".swiper-container-background-setting .slideImg:eq("+swiper.activeIndex+")").addClass("changeImg");
        }
    });

    /*背景选择部分end*/
    /*地鼠选择部分*/

    var mySwiper_dishu_setting=new Swiper(".swiper-container-dishu-setting",{
        pagination : '.swiper-pagination-dishu-setting',
        //loop:true,//循环模式生效
        slidesPerView:3,
        autoHeight:true,//自动高度
        setWrapperSize :true,//使用flexbox布局
        roundLengths : true,//四舍五入宽度防止文字模糊
        calculateHeight : true,
        centeredSlides:true,//首个slide居中
        onInit: function (swiper) {
            $(".swiper-container-dishu-setting .slideImg:eq("+swiper.activeIndex+")").addClass("changeImg");
        },
        onSlideChangeStart:function(swiper){
            $(".swiper-container-dishu-setting .slideImg").removeClass("changeImg");
        },
        onSlideChangeEnd:function(swiper){
            index_dishu_setting=swiper.activeIndex;
            $(".swiper-container-dishu-setting .slideImg:eq("+swiper.activeIndex+")").addClass("changeImg");
        }
    });
    /*地鼠选择部分end*/

    //进入选择地鼠界面按钮
    var background_setting=document.querySelector('.background_setting');
    background_setting.onclick=function () {
        changePageA("page_index","background_setting");
    };
    //进入选择游戏背景界面按钮
    var dishu_setting=document.querySelector('.dishu_setting');
    dishu_setting.onclick=function () {
        changePageA("page_index","dishu_setting");
    };
    //进入个人界面按钮
    var personage=document.querySelector('.personage');
    //确定选择地鼠
    var confirm_dishu_setting=$('div[data-action="confirm-dishu-setting"]');
    confirm_dishu_setting.on("click",function(){
        changeDishu(index_dishu_setting+1);
        var parentDiv=$(this).parent().parent();
        changeBack("A",parentDiv.attr("data-page"),"page_index");
    });
    function changeDishu(index) {//确定地鼠后设置地鼠图片
        $(".dishu").removeClass("dishu"+Mouse.mouseStyle);
        Mouse.mouseStyle=index;
        $(".dishu").addClass("dishu"+Mouse.mouseStyle);
    }
    //确定选择背景
    var confirm_background_setting=$('div[data-action="confirm-background-setting"]');
    confirm_background_setting.on("click",function(){
        changeBackground(index_background_setting+1);
    });
    function changeBackground(index) {
        $(".bjImg").css("background-image","url(./img/background"+index+"/bj_1.png)");
        $(".dishus_d").css("background-image","url(./img/background"+index+"/d.png)");
        $(".dishus_c").css("background-image","url(./img/background"+index+"/c.png)");
        $(".dishus_d4").css("background-image","url(./img/background"+index+"/di.png)");
    }
});






