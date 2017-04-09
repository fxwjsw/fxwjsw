<template>
<div class="statistics">
    <h2>{{msg}}</h2>
    <table class="statisticsTable" cellspacing="0" cellpadding="0">
        <tr>
            <th>排名</th>
            <th>玩家</th>
            <th>用时(秒)</th>
            <th>翻牌次数</th>
        </tr>
        <tr v-for="(item,index) in statisticsArray"  v-if="item===lastSSItem" class="lastTr">
             <td>{{index+1}}</td>
             <td>{{item.userName}}</td>
             <td>{{item.useTime}}</td>
             <td>{{item.totalDegree}}</td>
        </tr>
        <tr v-else>
             <td>{{index+1}}</td>
             <td>{{item.userName}}</td>
             <td>{{item.useTime}}</td>
             <td>{{item.totalDegree}}</td>
        </tr>         
         
    </table>
    <router-link to="/Game"><button class="goGameBtn">返回游戏</button></router-link>
</div>
</template>
<script>

export default{
    name:'statistics',
    data(){
        return {
           msg:'游戏统计', 
        }
    },
    computed:{
        lastSSItem(){
            return this.$store.state.game.lastSSItem;
        },
        statisticsArray(){
            return this.$store.state.statistics.statisticsArray;
        }
    }
}
</script>
<style scoped>

.statisticsTable,.statisticsTable td,.statisticsTable th{
    border:1px solid black;
}
.lastTr td{background-color:lightgreen;}
.statisticsTable th{background-color:lightblue;height:50px;}
.statisticsTable td{height:35px;}
.statisticsTable{
    width:100%;    
}
.goGameBtn{
    position: absolute;
    left:10%;
    bottom:20px;
    width:80%;
    height:50px;
}
</style>