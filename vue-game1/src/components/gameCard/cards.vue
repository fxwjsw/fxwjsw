<template>
<div class="cards">    
    <card  v-for="randomItem in randomItems" :dicon="randomItem" v-on:clickCarded="onReversal"></card>
</div>
</template>
<script>

import card from './card'

export default{
    name:'cards',   
    components:{card}, 
    data(){
        return {
           lastCard:null,//最后点击的卡片
           useTime:0,//使用时间

        }
    },
    computed:{
        randomItems(){
            this.$store.commit("getRandomArr");//首次获取随机数组
            return this.$store.state.game.getRandomArr;
        }
    },
    methods:{
          
          onReversal(card){
            
            if(this.lastCard==null){
                
                if(this.$store.state.game.isStartGame==false){
                    this.$store.state.card.cards=this;//开始游戏前将cards的组件对象传入card状态
                    this.$store.commit("startGame");
                }
                return this.lastCard=card;
            }
            
            //匹配成功
            if(this.lastCard!=card&&this.lastCard.dicon==card.dicon){
                this.lastCard.isMatch=true;
                this.lastCard.cls="card back";
                card.isMatch=true;
                
                this.$store.commit("surplusCardMinus");//减少剩余卡片
                let vimGame=this.$store;
                if(this.$store.state.card.surplusCard==0){
                    (function(vimGame){
                    setTimeout(function(){
                        vimGame.commit("gameOver");                        
                    },1000);
                    })(vimGame);             
                }
                return this.lastCard=null;
            }
            
            let lastCard=this.lastCard;
            this.lastCard=null; 
             
            (function(lastCard){
                setTimeout(function(){
                    lastCard.cls="card front";
                    card.cls="card front";
                    card.isFrontOrBack="front";
                        
                },1000); 
            })(lastCard);         
              
          }                         
    }
}
</script>
<style scoped>

.cards{
    display:flex;
    flex-wrap:wrap;
    width:100%;                
}
</style>