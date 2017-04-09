<template>
  <div class="Game">
    <prompt></prompt>
    <div class="header">
        <logo></logo> 
        <surplusCard></surplusCard>
        <totalDegree></totalDegree>
        <toStatistics></toStatistics>
     </div>
     <div class="content">     
        <cards></cards>
     </div>
     <div class="footer">     
        <againGame></againGame>
        <user></user>
        <useTime></useTime>
        
     </div>
  </div>
  
</template>

<script>   
import logo from './gamePanel/logo'
import surplusCard from './gamePanel/surplusCard'
import totalDegree from './gamePanel/totalDegree'
import toStatistics from './gamePanel/toStatistics'

import cards from './gameCard/cards'

import againGame from './gamePanel/againGame'
import useTime from './gamePanel/useTime'
import user from './gamePanel/user'
import prompt from './gamePanel/prompt'

export default {
  
  components:{
      logo,surplusCard,totalDegree,toStatistics,cards,againGame,useTime,user,prompt
  },  
  data () { 
    return {
      
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.Game{ 
  position: absolute; 
  top:15px;
  left:0px;
  width:100%;
  height:100%; 
  overflow:hidden;   
  margin:0px;
}
.header,.content,.footer{
  display:flex;
  width:96%;
  margin:2%;
  overflow:hidden;
  font-size:0.8rem;
} 
.header{
  height:80px;
}
.footer{
  position: absolute;
  bottom:20px;
  height:60px;
  border:1px solid green;
}
.header div,.footer div{
  padding:5px;
}
.header div{        
    border:1px solid black;
    margin:5px;
}


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
