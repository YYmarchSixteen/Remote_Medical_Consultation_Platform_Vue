<template>
    <div class="header">
        <Header></Header>
    </div>
    <div class="image">
        <img src="https://pimg.39.net/PictureLib/A/f76/20230912/org_1701476883792797704.jpg">
    </div>
 <div class="box">
    <p>
    </p>
 </div>
</template>
  
<script>
import Header from '../../userLayout/Header/header.vue';
export default {
    components: {
        Header,
    }
};
</script>
  
<style scoped>

.image{
    margin-left: 22%;
    margin-top: 5%;
}
p{
    font-size: xx-large;
}
.box{
    width: 50%;
    margin-left: 25%;
}
</style>
