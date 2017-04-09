<template>
<div class="toStatistics">
    <router-link to="/statistics"><button class="toStatisticsBtn">{{msg}}</button></router-link>
</div>
</template>
<script>

export default{
    name:'ranking',
    data(){
        return {
           msg:'统计'
        }
    }
}
</script>
<style scoped>
.toStatistics{
    width:20%;
    padding:0px;
}
.toStatisticsBtn{
    width:100%;
    height:68px;
}
</style>