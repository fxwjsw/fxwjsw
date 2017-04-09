<template>
<div v-bind:class="cls" data-icon="0" v-on:click="clickCard">0
    <div>{{dicon}}</div>   
</div>
     
</template>
<script>

export default{
    props:['dicon'],
    name:'card',      
    data(){
        return {
           cls:"card",
           url:'../static/logo.png',
           isFrontOrBack:"front",//是正面还是反面
           
           isMatch:false//是否已匹配 
        }
    },
    mounted: function () {  
                
    },
    methods:{
        clickCard:function(e){
            
            if(this.isFrontOrBack=="back"&&this.isMatch==true){                
                return;
            } 
            this.isFrontOrBack="back";
            this.cls="card back";
            this.$store.commit("totalDegreeAdd");
            this.$emit("clickCarded",this);
                         
        }                            
    }
}
</script>
<style scoped>

.card{
    position:relative;
    width:23%;
    height:80px;   
    margin:1%;
    background:lightblue;
    font-size:4rem;
    text-align: center;
    line-height:80px;
    font-family:"Raphaelicons";
    cursor: pointer;
    border-radius:10px;
    transition: transform 1s;
    transform-style: preserve-3d;
    backface-visibility:hidden; 
}

.card div{
    position: absolute;
    display: block;
    left:0px;
    top:0px;
    height: 100%;   
    line-height:100%;
    width: 100%;  
    font-size:4rem;   
    background:lightgrey;
    border-radius:10px;    
    font-family:"Raphaelicons";
    transform: rotateY( 180deg );  
    backface-visibility:hidden;       
}
.front{ 
    transform: rotateY( 0deg );       
}
.back{ 
    transform: rotateY( 180deg );
}
</style>