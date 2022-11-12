<template>
<div class="character-list-container">
    <!-- Title -->
    <div class="page-title">Characters</div>    
    <!-- Filter -->
    <div class="page-filter flex">
        <div class="elemental flex align-center">
            <button class="filter-button mr-2">
                <img src="@/assets/img/elemental/anemo_50.webp" alt="anemo" width="40" height="40">
            </button>
            <button class="filter-button mr-2">
                <img src="@/assets/img/elemental/cryo_50.webp" alt="cryo" width="40" height="40">
            </button>
            <button class="filter-button mr-2">
                <img src="@/assets/img/elemental/dendro_50.webp" alt="dendro" width="40" height="40">
            </button>
            <button class="filter-button mr-2">
                <img src="@/assets/img/elemental/electro_50.webp" alt="electro" width="40" height="40">
            </button>
            <button class="filter-button mr-2">
                <img src="@/assets/img/elemental/geo_50.webp" alt="geo" width="40" height="40">
            </button>
            <button class="filter-button mr-2">
                <img src="@/assets/img/elemental/hydro_50.webp" alt="hydro" width="40" height="40">
            </button>
            <button class="filter-button mr-2">
                <img src="@/assets/img/elemental/pyro_50.webp" alt="pyro" width="40" height="40">
            </button>
        </div>
        <div class="weapon-type flex align-center">
            <button class="filter-button mr-2" @click="buttonClick('bow')">
                <img src="@/assets/img/weapon/bow_50.webp" alt="bow" width="40" height="40">
            </button>
            <button class="filter-button mr-2">
                <img src="@/assets/img/weapon/catalyst_50.webp" alt="catalyst" width="40" height="40">
            </button>
            <button class="filter-button mr-2">
                <img src="@/assets/img/weapon/claymore_50.webp" alt="claymore" width="40" height="40">
            </button>
            <button class="filter-button mr-2">
                <img src="@/assets/img/weapon/polearm_50.webp" alt="polearm" width="40" height="40">
            </button>
            <button class="filter-button mr-2">
                <img src="@/assets/img/weapon/sword_50.webp" alt="sword" width="40" height="40">
            </button>
        </div>
        <div class="search flex align-center">
            <m-input labelText=""/>
            <label class="label-search">Tìm kiếm nhanh</label>
        </div>
        <div class="flex align-y-end">
            <button @click="addRow">
                Thêm dòng
            </button>
        </div>        
    </div> 
    <!-- Grid -->
    <div class="character-grid">
        <m-grid ref="characterGrid"
         :listData="storeCharacter"
         :columns="columns"
         :multiSelect="false"
         @dblClick="handleDoubleClick"
         :tableFunction="tableFunction"
         @eMainButtonClick="handleFunctionClick"
         @eDoubleClick="handleDoubleClick"/>
    </div>
</div>
</template>

<script>
export default {
    created(){
        let me = this;
        me.initStaticData();
    },
    data() {
        return {
            x: localStorage.getItem("quyet"),
            storeCharacter: [
                {   character_icon:'',
                    src: 'https://picsum.photos/200/300',
                    type: 'link'
                    
                },
                {
                    character_icon:'',
                    src: 'img/weapon/sword_50',
                    format: 'webp'          
                }
                ], //danh sách nhân vật
            columns:[],
        }
    },
    methods:{
        buttonClick(action){
            switch(action){
                case 'bow':
                    break;
            }
            //add thêm class active
        },
        scrollToTop(){
            window.scrollTo(0,0);
        },
        addRow(){
            let me = this;
            let object ={
                character_icon:'',
                src: 'img/weapon/sword_50',
                format: 'webp'          
            }
            me.storeCharacter.push(object);
        },

        initStaticData(){
            let me = this;
            //cấu hình các cột tĩnh
            me.columns=[
                {
                    title: "Icon",
                    key:'character_icon',
                    width: 100,
                    dataType: 'image',                    
                },
                {
                    title: "Tên nhân vật",
                    key: "currency_name",
                    width: 200
                },
                {
                    title: "Loại vũ khí",
                    key: "weapon_type",
                    width: 200
                },
               
            ];
        },
        cacheSave(){
            this.$cache.set("quyet", "test localStorage");
        },

        cacheRemove(){
            this.$cache.remove("quyet");
        }

    }
}
</script>

<style>
.label-search{
    font-size: 15px;
    color: white;
    margin-left: 10px;
}
.page-title{
    font-size: 30px;
    font-weight: 900;
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
    margin-left: 10px;
}
.page-filter{
    margin-bottom: 20px;
    background: #171B42;
    padding: 10px;
}
.filter-button{
    width: 50px;
    height: 50px;
    padding: 5px;
    /* border: 1px solid var(--brown-color); */
    border-radius: 6px;    
    overflow: hidden;
    /* background: var(--main-color); */
}
.filter-button:hover{
    /* box-shadow: inset 0 0 9px #c1c1c1; */
    outline: none;
    background-color: #2D3668;
}
.filter-button.active{
    outline: none;
    background-color: #2D3668;
}
.elemental{
    margin-right: 20px;
}
.weapon-type{
    margin-right: 20px;
}
</style>