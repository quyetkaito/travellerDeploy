<!--
File xem hình ảnh khi click đúp vào ảnh trên bài viết
-->
<template>
  <div class="image-viewer-fullscreen" v-show="isShow">
     <div class="image-viewer__header">
         <div class="m-icon-48 icon-close flex align-center" @click="backToOriginSize"><i class="fas fa-expand"></i></div>
         <div class="m-icon-48 icon-close flex align-center" @click="hide"><i class="fas fa-times"></i></div>
     </div>
     <div ref="imageViewerContainer" id="imageViewerContainer" class="image-viewer__container" @mousedown="mousedownListener" @mouseup="mouseupListener" @mousemove="mousemoveListener" @wheel="scrollListener">
        <img alt="" src="https://picsum.photos/seed/picsum/200/300" id="imageViewer" ref="imageViewer" class="image-preview" @dblclick="backToOriginSize">     
     </div>
  </div>
</template>

<script>
export default {   
    data() {
        return {
            isShow: false, //show component
            scale: 1, //tỉ lệ phóng to
            panning: false, //có đang kéo thả ko
            pointX: 0, //vị trí chuột
            pointY: 0,
            start: { x: 0, y: 0 }            
        }
    },

    methods:{
        getSrc(src){
            return src;
        },

        show(src){
            this.isShow = true;
            if(src){                
                if(this.$refs.imageViewer){
                    this.$refs.imageViewer.src = src;
                }                
            }
            this.backToOriginSize();
        },

        hide(){
            this.isShow = false;
        },

        setTransform() {            
            let zoom = this.$refs.imageViewerContainer;
            if(zoom){
                zoom.style.transform = "translate(" + this.pointX + "px, " + this.pointY + "px) scale(" + this.scale + ")";
            }
        },
        
        /**
        * Nhấn giữ chuột
        * @created : quyetkaito 28/10/2022
        */
        mousedownListener(e){
            e.preventDefault();
            this.start = { x: e.clientX - this.pointX, y: e.clientY - this.pointY };
            this.panning = true;
        },

        mouseupListener(e){
            this.panning = false;
        },

        /**
        * Nhấn giữ chuột để kéo thả ảnh
        * @created : quyetkaito 28/10/2022
        */
        mousemoveListener(e){
             e.preventDefault();
            if (!this.panning) {
             return;
            }
            this.pointX = (e.clientX - this.start.x);
            this.pointY = (e.clientY - this.start.y);
            this.setTransform();
        },

        /**
         * Tính toán khi scroll để phóng to ảnh
         * @created : quyetkaito 28/10/2022
         */
        scrollListener(e){
            e.preventDefault();
            var xs = (e.clientX - this.pointX) / this.scale,
            ys = (e.clientY - this.pointY) / this.scale,
            delta = (e.wheelDelta ? e.wheelDelta : - e.deltaY);
            (delta > 0) ? (this.scale *= 1.2) : (this.scale /= 1.2);
            this.pointX = e.clientX - xs * this.scale;
            this.pointY = e.clientY - ys * this.scale;

            this.setTransform();
        },

        /**
         * Quay trở về kích thước ban đầu
         */
        backToOriginSize(){
            this.pointX = 0;
            this.pointY = 0;
            this.scale = 1;
            this.setTransform();
        }
    }
}
</script>

<style>
.image-viewer-fullscreen{
    position: fixed;
    z-index: 1000;
    top:0;
    left:0;
    bottom: 0;
    right:0;
    width: 100;
    background-color: rgba(0, 0, 0, 0.85);
}

/* #imageViewer{
    height: auto;
    max-height: 100vh;
    cursor: grab;
} */

.image-viewer__header{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
.image-viewer__header .icon-close{
    color: white;    
    font-size: 30px;
    cursor: pointer;
    z-index: 1001;
}
.image-viewer__container{
    object-fit: contain;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    transform-origin: 0px 0px;
    transform: scale(1) translate(0px, 0px);
}
.image-viewer__container .image-preview{
    height: auto;
    max-height: 100vh;
    cursor: grab;
}
</style>