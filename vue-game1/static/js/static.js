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