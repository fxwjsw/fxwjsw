<template>
<div class="surplusCard">{{msg}}<br>{{surplusCard}}</div>
</template>
<script>
export default{
    name:'surplusCard',
    data(){
        return {
            msg:'剩余卡片'
        }
    },
    computed:{
        surplusCard(){
            return this.$store.state.card.surplusCard;
        }
    }
}
</script>
<style scoped>
.surplusCard{
    width:20%;
}
</style>