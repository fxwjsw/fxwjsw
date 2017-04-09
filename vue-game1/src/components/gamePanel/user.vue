<template>
<div class="user">
    <button v-on:click="changeUserName">{{getUerName}}</button>    
</div>
</template>
<script>

export default{
    name:'user',
    data(){
        return {
           title:'你的名字：'
        }
    },
    computed:{
        getUerName(){
            return this.$store.state.prompt.userName;
        }
    },
    methods:{
        changeUserName(){
            var tle=this.title;
            this.$store.commit("openPrompt",{cls:"openPrompt",title:tle}); 
        }        
    }    
}
</script>
<style scoped>
.user{
    width:40%;
    height:50px;
    text-align: center;
}
.user button{
    display:block;
    width:100%;
    height:100%;
    overflow:hidden;
}
</style>