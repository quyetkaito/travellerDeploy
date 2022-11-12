// Form CKEditor
<template>
  <div>
    <div class="function-container">
        <div class="save-btn-container">
         <button
            class="m-btn-second btn-save mr-2"
            @click="buttonClick('SaveTemp')"                  
        >
            {{$t('SaveTemp')}}
        </button>
        <button
            class="m-btn btn-save"
            @click="buttonClick('Save')"                  
        >
            {{$t('Save')}}
        </button>
        </div>
    </div>
    <div class="post-title">
        <input 
        class="input-title"
        type="text"
        v-model="currentItem.post_title"
        placeholder="Title"/>
        <!-- <m-input
            ref="inputTitle"
            v-model="currentItem.post_title"
            placeholder="Tiêu đề"
            :style="{'width': 100 + 'px;'}"
            labelText="Tiêu đề"
        >

        </m-input> -->
    </div>
    <ckeditor :editor="editor"
        v-model="currentItem.post_content"
        :upload-adapter="UploadAdapter"
        ref="editorComponent"
        class="editor-component"
    >
    </ckeditor>
    <button @click="emptyEditor">Empty the editor</button>    
    <code>{{ currentItem.post_content }}</code>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PostAPI from '@/api/PostAPI';
export default {
    data() {
        return {
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            currentItem: {},
            styleCustom:{
                'font-weight': 'bold!important;',
            },
            
        }
    },
    methods:{
        
        buttonClick(action){
            let me = this;
            switch (action) {
                case 'Save':// lưu vào csdl
                me.savePost() ;                   
                    break;
                case 'SaveTemp'://lưu tạm                    
                    break;
                default:
                    break;
            }
        },

        async savePost(isTemp){
            let me = this;
            if(me.validateBusiness()){
                me.prepareDataBeforeSave(isTemp);
                let res = await PostAPI.request(PostAPI.urlName, 'POST', me.currentItem);
                if(res){
                    debugger
                }
            }

        },

        prepareDataBeforeSave(isTemp){
            let me = this;
            me.currentItem.posted_date = new Date();
            me.currentItem.status = isTemp? me.$enum.PostStatus.Temp : me.$enum.PostStatus.Posted; 
            me.currentItem.author = me.$session.get('UserID') ? me.$session.get('UserID') : "";
        },

        async validateBusiness(){
            let me = this;
            if(!me.currentItem.post_title){
                return false;
            }
            return true;

        },

        emptyEditor() {
            this.editorData = '';
        },

        UploadAdapter: function (loader) {
            this.loader = loader;
            loader.file.then(response =>{
                let file = response;
                this.upload = () => {
                    const body = new FormData();
                    body.append('file', this.loader.file);

                    return fetch('http://localhost:8000/api/imageUpload', {
                    headers: {
                        'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2),
                        'Accept': 'application/json'
                    },
                    body: body,
                    method: 'post'
                            })
                    .then(response => response.json())
                    .then(downloadUrl => {
                        return {
                            default: downloadUrl
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
                this.abort = () => {
                    console.log('Abort upload.')
                }
            })
            

        }
    }
}
</script>

<style>
.function-container{
    padding: 10px;
}
.save-btn-container{
    display: flex;
    justify-content: flex-end;
}
.post-title{
    width: 100%;
}
.post-title .input-title{
    width: 100%;
    outline: none;
    font-family: inherit;    
    font-weight: bold;
    padding: 10px;
}
.input-title-custom{
    border-radius: 0!important;
}

.editor-component{
    height: 100vh;
}
.ck-editor__editable {
    min-height: 500px!important;
}
</style>