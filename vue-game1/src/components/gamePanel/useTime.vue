<template>
<div class="useTime">{{msg}}<br>{{getUseTime}}</div>
</template>
<script>

export default{
    name:'useTime',
    data(){
        return {
           msg:'时间'
        }
    },
    computed:{
        getUseTime(){
            return this.$store.state.game.useTime;
        }
    }
}
</script>
<style scoped>
.useTime{
    width:20%;
    text-align: center;
}
</style>