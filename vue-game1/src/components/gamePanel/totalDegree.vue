<template>
<div class="totalDegree">{{msg}}<br>{{totalDegree}}</div>
</template>
<script>
export default{
    name:'totalDegree',
    data(){
        return {
            msg:'翻动次数'
        }
    },
    computed:{
        totalDegree(){
            return this.$store.state.card.totalDegree;
        }
    }
}
</script>
<style scoped>
.totalDegree{
    width:40%;
}
</style>