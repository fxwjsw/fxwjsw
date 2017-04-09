// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(Vuex);

//声明一个只读的卡片状态集
const moduleCard={
  state:{
    cards:null,//存放card的vue对象集合
    surplusCard:16,//剩余卡片数
    totalDegree:0,//翻动的总次数
  },
  //同步变化
  mutations:{
    //减剩余卡片数
    surplusCardMinus(state){        
      state.surplusCard=state.surplusCard-2;         
    },
    //加翻动总次数
    totalDegreeAdd(state){     
      state.totalDegree++; 
    }
  }
}
//提问框状态
const modulePrompt={
  state:{
    cls:'promptHide',
    title:'',
    userName:'玩家1'
  },
  mutations:{
    openPrompt(state,newPrompt){
      state.cls=newPrompt.cls;
      state.title=newPrompt.title;
    },    
    closePrompt(state){
      state.cls='promptHide';
      state.title='';
    }
  }
}
//游戏状态
const moduleGame={
  state:{
    useTime:0,//游戏使用时间
    getRandomArr:[],//存放随机数组
    isStartGame:false,//是否开始游戏
    lastSSItem:null//最后插入统计数组的数据
  },
  mutations:{  
    getRandomArr(state){
      var arr=["A","A","B","B","C","C","D","D","E","E","F","F","G","G","H","H"];
      //随机排列数组
      function shuffle(arr){
        for(var i=arr.length-1;i>=0;i--){
          var randomIndex=Math.floor(Math.random()*(i+1));
          var itemAtIndex=arr[randomIndex];
          arr[randomIndex]=arr[i];
          arr[i]=itemAtIndex;
        }
      } 
      shuffle(arr);
      store.state.game.getRandomArr=arr;
    },
    initGame(state){
       
      if(store.state.card.cards!=null){
        
        let cardVueArray=store.state.card.cards.$children;
        //初始化所有card
        for(let i=0;i<cardVueArray.length;i++){
                
                cardVueArray[i].cls="card front";
                cardVueArray[i].isFrontOrBack="front";
                cardVueArray[i].isMatch="false";
        }
      }
      //重新获取随机数组
      store.state.game.getRandomArr=moduleGame.mutations.getRandomArr();
      store.state.card.surplusCard=16;
      store.state.card.totalDegree=0;
      store.state.game.useTime=0;
      store.state.game.isStartGame=false;
      clearInterval(state.getUseTime);
    },
    startGame(state){  
      
      state.isStartGame=true;
      state.getUseTime=setInterval(function(){
          state.useTime++;
      },1000);
    },
    gameOver(state){
      //游戏结束后添加一条统计数据到statisticsArray  
      let ssItem={
        userName:store.state.prompt.userName,
        useTime:store.state.game.useTime,
        totalDegree:store.state.card.totalDegree
      };
      state.lastSSItem=ssItem;
      if(store.state.statistics.statisticsArray.length==10){
        store.state.statistics.statisticsArray.splice(9,1);
      }
      store.state.statistics.statisticsArray.push(ssItem);
      if(store.state.statistics.statisticsArray.length>1){
        moduleStatistics.mutations.sortItem(store.state.statistics);
      }  
      moduleGame.mutations.initGame(state); 
    }
  }
}
//统计表格状态
const moduleStatistics={
  state:{
    statisticsArray:[]
  },
  mutations:{
    
    sortItem(state){
      //按所用时间从小到大排列
      function compare(value1,value2){
        if(value1.useTime<value2.useTime){
          return -1;
        }else if(value1.useTime>value2.useTime){
          return 1;
        }else{
          return 0;
        }
      }
      state.statisticsArray.sort(compare);
    }
  }
}
//状态管理
let store=new Vuex.Store({
  modules:{
    card:moduleCard,
    game:moduleGame,
    prompt:modulePrompt,
    statistics:moduleStatistics
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
