
//取消浏览器的所有事件
document.addEventListener('touchstart',function(){
    return false;
},true);
// 禁止选择
document.oncontextmenu=function(){
    return false;
};
//禁用窗体触摸移动事件
window.ontouchmove = function(e) { e.preventDefault(); };

$(function(){
    /*点击回到顶部*/
    var connecting_2=$("#connecting-2");
    var st_panel_2=$("#st-panel-2");
    var connecting_4=$("#connecting-4");
    var st_panel_4=$("#st-panel-4");
    connecting_2.on("click",function(){
        st_panel_2.animate({ scrollTop: 0 }, 500);
    });
    connecting_4.on("click",function(){
        st_panel_4.animate({ scrollTop: 0 }, 500);
    });

    /*第二页点击选项显示相应列表*/

    var st_panel_2_title=$(".st-panel-2-title");
    //var st_panel_2_dl=st_panel_2_title.next();
    st_panel_2_title.on("click",function(){
        //var t=$(this).children(".st-panel-2-symbol").text();
        if($(this).next().is(':hidden')){//打开
            $(this).children(".st-panel-2-symbol").text("-");
            $(this).next().show();
        }else{//关闭
            $(this).children(".st-panel-2-symbol").text("+");
            $(this).next().hide();
        }
    });
});

/*技能图表*/
var skill_canvas=document.querySelector(".skill-canvas");
var sc_cxt=skill_canvas.getContext("2d");
var y_item=new Array("js","jq","h5","vue","node","ps");
var x_item=new Array("在学","一般","常用");
var xy_color_item=new Array(
    ["js","常用","red"],
    ["jq","常用","orange"],
    ["h5","一般","yellow"],
    ["vue","在学","green"],
    ["node","在学","lightGreen"],
    ["ps","在学","purple"]
);
var ratio=2;
skill_canvas.width = skill_canvas.width*ratio;
skill_canvas.height = skill_canvas.height*ratio;
sc_cxt.clearRect(0,0,320*ratio,350*ratio);
function drawSc(){//绘制图表线框
    sc_cxt.lineWidth=1;
    sc_cxt.strokeStyle="gray";
    sc_cxt.translate(50*ratio,130*ratio);

    sc_cxt.beginPath();
    sc_cxt.moveTo(0,0);
    sc_cxt.lineTo(235*ratio,0);//x轴
    sc_cxt.moveTo(0,0);
    sc_cxt.lineTo(0,-125*ratio);//Y轴
    sc_cxt.stroke();
    sc_cxt.closePath();

    sc_cxt.beginPath();
    sc_cxt.lineWidth=1;
    sc_cxt.strokeStyle="gray";
    //文本样式、大小、字体
    sc_cxt.font="lighter 20px Arial";
    //对齐方式
    sc_cxt.textAlign="center";
    //文本基线
    sc_cxt.textBaseline="middle";
    for(var i=1;i<=x_item.length;i++){//添加x轴竖线
        sc_cxt.moveTo(i*60*ratio,0);
        sc_cxt.lineTo(i*60*ratio,-120*ratio);
        //fillText(字,x坐标,y坐标);
        sc_cxt.fillText(x_item[i-1],i*60*ratio,10*ratio);
    }
    for(var j=1;j<=y_item.length;j++){//添加Y轴横线
        sc_cxt.moveTo(0,-j*17*ratio);
        sc_cxt.lineTo(220*ratio,-j*17*ratio);
        sc_cxt.fillText(y_item[j-1],-20*ratio,-j*17*ratio);
    }
    sc_cxt.stroke();
    sc_cxt.closePath();
}

function drawHistogram(degreeNumber_long){//绘制柱状图
    sc_cxt.beginPath();
    sc_cxt.fillStyle="#66ff66";
    for(var i=0;i<xy_color_item.length;i++){//添加x轴柱状图
        //fillRect(开始x坐标,开始Y坐标,宽,高);从左上向右下绘制
        sc_cxt.save()
        var degree=xy_color_item[i][1];
        var degreeNumber=0;
        if(degree=="常用"){
            degreeNumber=200;
        }else if(degree=="一般"){
            degreeNumber=100;
        }else{
            degreeNumber=50;
        }
        sc_cxt.fillStyle=xy_color_item[i][2];
        if(degreeNumber_long<=degreeNumber){
            sc_cxt.fillRect(1,-23*ratio-i*17*ratio,degreeNumber_long*ratio,12*ratio);
        }else{
            continue;
        }
        sc_cxt.restore();
    }
    sc_cxt.stroke();
    sc_cxt.closePath();
}
drawSc();
function controlHistogram() {//控制柱状图特效
    var degreeNumber_long=0;
    var drawHistogramForTime=setInterval(function () {
        drawHistogram(degreeNumber_long);
        degreeNumber_long++;
        if(degreeNumber_long>200){
            clearInterval(drawHistogramForTime);
        }
    },5);
}
var st_control_3=document.getElementById("st-control-3");
//点击技能选项重新绘制柱状图
st_control_3.addEventListener("click",function(){
    //alert(1);
    skill_canvas.width = skill_canvas.width;
    skill_canvas.height = skill_canvas.height;
    sc_cxt.clearRect(0,0,320*ratio,350*ratio);
    drawSc();
    setTimeout(controlHistogram,500);
},false);
controlHistogram();





