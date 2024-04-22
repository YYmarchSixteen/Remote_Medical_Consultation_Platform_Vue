<template>
    <div class="header">
        <Header></Header>
    </div>
    <div class="main">
        <el-icon size="30px">
            <View />
        </el-icon>最新上线&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-icon size="30px">
            <ChatDotRound />
        </el-icon>胃癌：田艳涛主任医师
    </div>

    <div class="carousel">
        <Carousel></Carousel>
    </div>

    <div class="demo1-video">
        <video id="myVideo" class="video" controls autoplay preload="auto"
            poster="http://1256913445.vod2.myqcloud.com/b8de9d62vodbj1256913445/17442e8a387702302273121894/pjGb8V.jpeg?size=355*200">
            <source src="file:///C:/Users/1/Videos/dance.mp4" type="video/mp4">
        </video>
    </div>

    <div class="list1">
        <ul class="custom-list">
            <li v-for="(item, index) in list" :key="index">
                <el-icon>
                    <Star />
                </el-icon> &nbsp; {{ item }}
            </li>
        </ul>
    </div>

    <div class="list2">
        <ul class="custom-list">
            <li v-for="(item, index) in list2" :key="index">
                <el-icon>
                    <Star />
                </el-icon> &nbsp; {{ item }}
            </li>
        </ul>
    </div>

    <div class="word">
        <span class="expert">专家</span>
        <span class="popularize">科普</span>
    </div>

    <div class="custom-line"></div>

</template>
  
<script>
import Header from '../userLayout/Header/header.vue';
import Carousel from '../userLayout/Carousel/carousel.vue';

export default {
    components: {
        Header,
        Carousel
    },
    data() {
        return {
            list: [
                '脚上长鸡眼，是怎么回事？',
                '喝酒后拉肚子？与这6个原因有关',
                '“难以启齿”的肛门癌，听说过吗',
                '为什么女人不要割“双眼皮”',
                '经常喝普洱茶，是养生还是养癌',
                '睡觉时，手机放床头辐射有多大',
                '很会藏的鼻咽癌，其实有明显症状',
                '鼻毛太长，能不能拔掉或剪掉？',
                '吃饭时出现4个怪象，或患胰腺癌',
            ],
            list2: [
                '有脂肪肝，这4种食物不要再吃了',
                '除马桶，公厕这3个地方最好少碰',
                '脚后跟经常痛是怎么回事',
                '长期不感冒的人，更易患癌？',
                '老了跟儿子or女儿住有什么差别',
                '研究发现：多吃番茄或可防前列腺癌，靠谱吗',
                '有些人对香菜敬而远之，却不知香菜有4大功效',
                '这张最全的 “食物嘌呤等级表”，痛风患者收好',
                '“三高”人群不能吃肉？辟谣：4种肉可放心吃',
            ],
        };
    },
};
</script>
  
<style scoped>
.carousel {
    margin-top: 1%;
    margin-left: 20%;
    float: left;
}

.main {
    margin-top: 5%;
    margin-left: 20%;
    font-size: x-large;
}

.video {
    width: 500px;
    height: 300px;
    margin-left: 50px;
}

.custom-list {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 500px;
    margin-left: 450px;
    margin-top: 50px;
}

.custom-list li {
    margin-bottom: 10px;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 8px;
    font-size: 20px;
    color: #333;
    border: 2px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
}

.custom-list li:hover {
    background-color: #e0e0e0;
}

/* .list1{
    float: left;
} */
.list2 {
    float: right;
    margin-right: 650px;
    margin-top: -540px;
}

.word {
    font-size: 30px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}

.expert {
    color: black;
}

.popularize {
    color: #0093E8;
}
.custom-line {
  height: 3px; /* 设置高度 */
  width: 100%; /* 设置宽度 */
  background-color: #0093E8; /* 设置颜色 */
  margin-top: 5px;
}


</style>
