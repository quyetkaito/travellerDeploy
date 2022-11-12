<template>
   <div class="m-image-viewer" v-bind:class="{ show: isShow }" ref="dialog">
    <div class="image-viewer__header flex justify-end">
        <div class="close-button">
            <div class="m-icon m-icon-24 m-close" @click="closeCarousel"></div>            
        </div>
    </div>
    <!-- Hiển thị nếu ko có gì -->
    <div class="m-card-gray-bottom image-viewer__body">                      
        <img src="@/assets/img/traveler.jpg" alt="">               
    </div>
  </div> 
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
    components: {
        /* eslint-disable vue/no-unused-components */        
        Carousel,        
        Slide,        
        Pagination,        
        Navigation,
    },
    props:{
        listImage:{
            type: String,            
        }
    },
    data() {
        return {
            isShow: false,
            listImage_tmp : this.listImage?JSON.parse(this.listImage):[], 
        }
    },
    methods:{
        closeCarousel(){
            this.isShow = false;
        },

        getSrc(src){
            return src;
        }
    }
}
</script>

<style scoped>
.m-image-viewer{
    display: none;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    /* background-color: rgba(0, 0, 0, 0.5); */
    background: var(--bg-main);
}

.m-image-viewer .m-image-viewer-box {
    width: fit-content;
    height: fit-content;
    min-width: 444px;
    min-height: 150px;    
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    background-color: var(--bg-main);
    border-radius: 3px;
    border: 1px solid #e9ebee;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
}
.m-image-viewer-box {

}

.image-viewer__header .close-button{
    width: 40px;
    height: 40px;
    background: var(--bg-main);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image-viewer__header .close-button:hover{
    background: var(--disabled-color);
}

.image-viewer__body{
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>