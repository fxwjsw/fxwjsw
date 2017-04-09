<template>
<div class="againGame">
    <button v-on:click="againGame">{{msg}}</button>
</div>
</template>
<script>

export default{
    name:'againGame',
    data(){
        return {
           msg:'重新开始'
        }
    },
    methods:{
        againGame(){
            this.$store.commit("initGame");
        }
    }
}
</script>
<style scoped>
.againGame{
    width:40%;
    height:50px;
}
.againGame button{
    float:left;
    width:100%;
    height:100%;
}
</style>