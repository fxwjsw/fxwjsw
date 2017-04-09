<template>
<div v-bind:class="cls">
    <div class="promptBg">
    </div>
    <div class="promptDiv">
            <h3>{{title}}</h3>
            <input class="changeInput" type="text" v-model="inputValue">
            <button class="promptSubmit" v-on:click="change">确定</button>
    </div>
</div>
</template>
<script>

export default{
    name:'logo',
    data(){
        return {   
            inputValue:''       
        }
    },
    computed:{
        cls(){
            return this.$store.state.prompt.cls;
        },
        title(){
            return this.$store.state.prompt.title;
        }
    },
    methods:{    
        change(){
            if(this.inputValue!=null&&this.inputValue!=""){
                if(this.$store.state.prompt.title=="你的名字："){
                    this.$store.state.prompt.userName=this.inputValue;    
                }
                this.$store.commit("closePrompt");
            }                                       
        }
    }
}
</script>
<style scoped>
.promptHide{display:none; }
.openPrompt{display:block;}
.promptBg{       
    position: absolute;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    background-color:grey;
    opacity:0.5;
    z-index:1000;
}
.promptDiv{
    position: absolute;
    width:200px;
    height:150px;
    top:30%;
    left:50%;
    margin:-60px auto auto -100px;
    padding:10px;
    background-color:white;
    z-index:1001;
}
.promptSubmit{
    width:100px;
    height:35px;
    margin:10px auto;
}
</style>