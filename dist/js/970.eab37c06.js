"use strict";(self["webpackChunktraveller"]=self["webpackChunktraveller"]||[]).push([[970],{6133:function(e,t,a){a.d(t,{Z:function(){return C}});var o=a(3396),i=a(7139),s=a(9242);const l={class:"m-popup-box"},n={class:"m-popup-header"},r={class:"popup-title-text"},c={class:"m-popup-body"},d={key:0,class:"form-container"},u={key:1,class:"form-container"},g={key:0,class:"quick-add-action"},h=(0,o.Uk)("Không tìm thấy danh mục? "),m={class:"footer-container flex-grow"},y={class:"footer-line"};function p(e,t,a,p,f,w){const S=(0,o.up)("m-input"),v=(0,o.up)("m-label"),k=(0,o.up)("v-multiselect"),C=(0,o.up)("m-button");return(0,o.wg)(),(0,o.iD)("div",{class:(0,i.C_)(["m-popup",{show:f.isShow}]),ref:"categoryDialog"},[(0,o._)("div",l,[(0,o._)("div",n,[(0,o._)("div",null,[(0,o._)("div",r,(0,i.zw)(f.titleForm),1)]),(0,o._)("div",null,[(0,o._)("div",{class:"popup-close m-icon m-icon-24 m-close",onClick:t[0]||(t[0]=(...e)=>w.hide&&w.hide(...e))})])]),(0,o._)("div",c,["QuickAdd"!=f.editMode?((0,o.wg)(),(0,o.iD)("div",d,[(0,o.Wm)(S,{ref:"categoryName",labelText:e.$t("category.category_name"),modelValue:f.currentItem.category_name,"onUpdate:modelValue":t[1]||(t[1]=e=>f.currentItem.category_name=e),onKeyup:(0,s.D2)(w.saveCategory,["enter"])},null,8,["labelText","modelValue","onKeyup"])])):(0,o.kq)("",!0),"QuickAdd"==f.editMode?((0,o.wg)(),(0,o.iD)("div",u,[(0,o.Wm)(v,{text:"Tìm danh mục"}),(0,o.Wm)(k,{ref:"categoryList",mode:"tags",modelValue:f.categoryValue,"onUpdate:modelValue":t[2]||(t[2]=e=>f.categoryValue=e),options:f.storeCategory,label:"label","close-on-select":!0,clearOnSelect:!0,searchable:!0,placeholder:"Bấm vào để tìm kiếm",noResultsText:"Không có dữ liệu hiển thị",canClear:!1,canDeselect:!1,onSelect:w.comboCategorySelected,onDeselect:w.comboCategoryDeSelected},null,8,["modelValue","options","onSelect","onDeselect"]),"QuickAdd"==f.editMode?((0,o.wg)(),(0,o.iD)("div",g,[h,(0,o._)("span",{class:"quick-add-text",onClick:t[3]||(t[3]=(...e)=>w.changeModeAdd&&w.changeModeAdd(...e))},"Tạo mới")])):(0,o.kq)("",!0)])):(0,o.kq)("",!0),(0,o._)("div",m,[(0,o._)("div",y,["QuickAdd"!=f.editMode?((0,o.wg)(),(0,o.j4)(C,{key:0,text:e.$t("Save"),class:"w-full",onClick:w.saveCategory},null,8,["text","onClick"])):(0,o.kq)("",!0),"QuickAdd"==f.editMode?((0,o.wg)(),(0,o.j4)(C,{key:1,text:e.$t("category.add_button"),class:"w-full",onClick:w.sendToPost},null,8,["text","onClick"])):(0,o.kq)("",!0)])])])])],2)}a(6699);var f=a(6680),w=a(9810),S={components:{"v-multiselect":w.Z},data(){return{isShow:!1,currentItem:{},titleForm:this.$t("category.add"),editMode:"Add",storeCategory:[],categoryValue:null,openFromPost:!1}},created(){this.initData()},methods:{initData(){this.currentItem={},this.categoryValue=null,this.titleForm=this.$t("category.add"),this.editMode="Add"},async saveCategory(){let e=this;try{let t="POST";if("Edit"==e.editMode&&(t="PUT"),!await e.validate())return;let a=await f.Z.request(f.Z.urlName,t,e.currentItem);a&&a.data&&(201==a.data.StatusCode?(e.openFromPost||e.$store.commit("showSuccess",{message:e.$t("message.success_add")}),e.afterSave(a.data.Data)):200==a.data.StatusCode&&(e.$store.commit("showSuccess",{message:e.$t("message.success")}),e.afterSave()))}catch(t){console.error(t)}},async validate(){let e=this;return!!e.currentItem.category_name||(e.$refs.categoryName&&"function"==typeof e.$refs.categoryName.focus&&e.$refs.categoryName.focus(),e.$store.commit("showError",{message:"Tên danh mục không được bỏ trống."}),!1)},hide(){this.isShow=!1,this.initData()},show(){this.isShow=!0,this.editMode="Add",this.focusFirstControl()},showQuickAdd(){this.editMode="QuickAdd",this.isShow=!0,this.$nextTick((()=>{this.$refs.categoryList&&this.$refs.categoryList.$el&&this.$refs.categoryList.$el.focus})),this.titleForm=this.$t("category.quick_add"),this.storeCategory&&0!=this.storeCategory.length||this.getCategoryData()},bindingData(e){e&&e.length>0&&(this.categoryValue=null,this.categoryValue=e.map((e=>e.category_id)))},comboCategorySelected(e){},comboCategoryDeSelected(e){},async getCategoryData(){let e=await f.Z.request(f.Z.urlName,"GET");if(e&&e.data&&e.data.length>0){this.categoryOriginData=e.data,this.storeCategory=[];for(let t=0;t<e.data.length;t++)this.storeCategory.push({label:e.data[t].category_name,value:e.data[t].category_id})}},sendToPost(){let e=this.categoryOriginData.filter((e=>this.categoryValue.includes(e.category_id)));this.$emit("changeValue",e),this.isShow=!1},focusFirstControl(){this.$nextTick((()=>{this.$refs.categoryName&&"function"==typeof this.$refs.categoryName.focus&&this.$refs.categoryName.focus()}))},afterSave(e){this.hide(),this.openFromPost?this.$emit("changeValue",[e]):this.$parent.loadData()},showEdit(e){let t=this;t.editMode="Edit",t.titleForm=t.$t("category.edit"),e&&(t.currentItem=JSON.parse(JSON.stringify(e)),t.isShow=!0,t.focusFirstControl())},changeModeAdd(){let e=this;e.editMode="Add",e.titleForm=e.$t("category.add"),e.$nextTick((()=>{e.$refs.categoryName.focus()})),e.openFromPost=!0}}},v=a(89);const k=(0,v.Z)(S,[["render",p],["__scopeId","data-v-161dcab3"]]);var C=k},4970:function(e,t,a){a.r(t),a.d(t,{default:function(){return q}});var o=a(3396),i=a(7139),s=a(9242),l=a(7933);const n={class:"content"},r={class:"content-top-container"},c={class:"content-top"},d={class:"page-title"},u={class:""},g={class:"content-bottom"},h={class:"filter-area flex"},m={key:0,class:"flex align-center"},y=(0,o._)("div",{class:"m-btn-text text-dropdown"},"Xóa hàng loạt",-1),p=[y],f={class:"content-filter flex align-y-center justify-center"},w={style:{width:"240px"}},S={style:{position:"relative"}},v={class:"content-grid"},k={class:"table-container"},C={class:"flex align-center",style:{width:"100%","flex-direction":"column"}},_=(0,o._)("img",{src:l,alt:"",width:"100",height:"100"},null,-1),b=(0,o._)("p",{style:{margin:"0px",padding:"0px"}},"Không có dữ liệu ",-1),D=[_,b],$={class:"m-paging"},F={class:"paging-left"},x=(0,o._)("div",{class:"paging-right"},null,-1);function A(e,t,a,l,y,_){const b=(0,o.up)("m-button"),A=(0,o.up)("m-input"),N=(0,o.up)("m-grid"),M=(0,o.up)("m-pagination"),E=(0,o.up)("category-detail");return(0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o._)("div",n,[(0,o._)("div",r,[(0,o._)("div",c,[(0,o._)("div",d,(0,i.zw)(e.$t("category.CategoryManager")),1),(0,o.Wm)(b,{text:e.$t("common.add_new"),onClick:t[0]||(t[0]=e=>_.buttonClick("Add"))},null,8,["text"])])]),(0,o._)("div",u,[(0,o._)("div",g,[(0,o._)("div",h,[y.selected>=1?((0,o.wg)(),(0,o.iD)("div",m,[(0,o._)("button",{class:(0,i.C_)(["m-btn-dropdown",{disabled:y.selected<1}]),disabled:""},p,2)])):(0,o.kq)("",!0),(0,o._)("div",f,[(0,o._)("div",w,[(0,o.Wm)(A,{ref:"searchInput",showLabel:!1,maxlength:255,width:240,modelValue:y.dataFilter,"onUpdate:modelValue":t[1]||(t[1]=e=>y.dataFilter=e),placeholder:"Tìm kiếm",onInput:t[2]||(t[2]=t=>_.lodashDelay(e.value)),onFindData:_.filterData},null,8,["modelValue","onFindData"])]),(0,o._)("div",S,[(0,o._)("div",{title:"Lấy lại dữ liệu",class:"m-icon m-icon-24 m-refresh btn-refresh",onClick:t[3]||(t[3]=(...e)=>_.loadData&&_.loadData(...e))})])])]),(0,o._)("div",v,[(0,o._)("div",k,[(0,o.Wm)(N,{ref:"mygrid",listData:y.storeCategory,columns:e.columns,pageSize:y.pageSize,isShowSkeleton:y.isShowSkeleton,functionText:"Sửa",onEShowFunc:_.showFunction,onHandleHideFunc:_.hideFunction,onEMultiSelect:_.getItemSelected,onEDoubleClick:_.edit,onGridAction:_.handleGridAction,tableFunction:e.tableFunction},null,8,["listData","columns","pageSize","isShowSkeleton","onEShowFunc","onHandleHideFunc","onEMultiSelect","onEDoubleClick","onGridAction","tableFunction"])])]),(0,o.wy)((0,o._)("div",C,D,512),[[s.F8,0===Object.keys(y.storeCategory).length&&""!=y.dataFilter]]),(0,o.wy)((0,o._)("div",$,[(0,o._)("div",F,[(0,o.Wm)(M,{totalPage:y.totalPage,currentPage:y.pageNumber,pageSize:y.pageSize,onChangeCurrentPage:_.setCurrentPage},null,8,["totalPage","currentPage","pageSize","onChangeCurrentPage"])]),x],512),[[s.F8,0!==Object.keys(y.storeCategory).length]])])])]),(0,o.Wm)(E,{ref:"categoryDetail"},null,512)],64)}a(6699);var N=a(6680),M=(a(9810),a(4806)),E=a.n(M),P=a(6133),T={components:{"category-detail":P.Z},data(){return{storeCategory:[],pageSize:10,dataFilter:"",isShowSkeleton:!1,selected:0,storeAll:[],totalPage:0,pageNumber:1}},created(){this.initStaticData(),this.loadData()},methods:{initStaticData(){this.columns=[{title:"Tên danh mục",key:"category_name",titleAlign:"left"}],this.tableFunction={isShow:!0,viewButton:!1,editButton:!0,deleteButton:!0}},async loadData(){try{this.isShowSkeleton=!0,this.storeCategory=[];let e=await N.Z.request(N.Z.urlName,"GET");e&&e.data&&(this.storeCategory=JSON.parse(JSON.stringify(e.data)),this.storeAll=JSON.parse(JSON.stringify(e.data)),this.totalPage=Math.round(e.data.length/10)),this.isShowSkeleton=!1}catch(e){console.error(e)}},setCurrentPage(e){this.pageNumber!=e&&(this.pageNumber=e)},handleGridAction(e){e&&e.object&&("View"==e.action||("Delete"==e.action?this.deleteObject(e.object):"Edit"==e.action&&this.edit(e.object)))},getItemSelected(e){e&&e.length>0?this.selected=e.length:this.selected=0},hideFunction(){},showFunction(){},lodashDelay:E().debounce((function(){this.filterData()}),1200),async filterData(){let e=this;e.isShowSkeleton=!0,e.storeCategory=await e.storeAll.filter((e=>e.category_name.toLowerCase().includes(this.dataFilter.toLowerCase()))),e.isShowSkeleton=!1},view(){},buttonClick(e){switch(e){case"Add":this.openCategoryDetail();break;default:break}},openCategoryDetail(){this.$refs.categoryDetail.show()},edit(e){this.$refs.categoryDetail.showEdit(e)},async deleteObject(e){let t=this;if(e&&e.category_id&&confirm(this.$t("message.delete_confirm")))try{t.$commonFunc.load();let a=await N.Z.request(N.Z.urlName,"DELETE",[e.category_id]);a&&a.data&&(200==a.data.StatusCode?(t.$store.commit("showSuccess",{message:t.$t("message.success_delete")}),t.loadData()):(t.$store.commit("showError",{message:a.data.DevMsg}),console.log(a.data.DevMsg))),t.$commonFunc.unload()}catch(a){t.$store.commit("showError",{message:t.$t("common.error_message")}),console.error(a),t.$commonFunc.unload()}}}},V=a(89);const O=(0,V.Z)(T,[["render",A]]);var q=O},7933:function(e,t,a){e.exports=a.p+"img/bg_report_nodata.76e50bd8.33eab636.svg"}}]);
//# sourceMappingURL=970.eab37c06.js.map