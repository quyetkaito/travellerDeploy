"use strict";(self["webpackChunktraveller"]=self["webpackChunktraveller"]||[]).push([[37],{9037:function(e,t,a){a.r(t),a.d(t,{default:function(){return j}});var l=a(3396),n=a(2035);const o={class:"flex-1 toolbar-container wscontainer flex"},i=(0,l.uE)('<div class="flex left-toolbar"><div class="wallet-toolbar-menu"><div class="wallet-icon"><img src="'+n+'" alt="Wallet-icon" width="48" height="48"></div><div class="info"><div class="name">Card Agribank</div><div class="amount">+98,500.00đ</div></div></div></div>',1),s={class:"flex-1 right-toolbar"},r=(0,l.uE)('<div class="item-toolbar"><i class="fas fa-calendar-alt text-gray-400"></i></div><div class="item-toolbar"><i class="fas fa-shapes text-gray-400"></i></div><div class="item-toolbar"><i class="fas fa-search text-gray-400"></i></div>',3),c=(0,l._)("span",{class:"btn-content"},"ADD TRANSACTION",-1),u=[c],d={class:"content-filter grid grid-cols-6 gap-4"},m={class:"col-span-2"},h={class:"content-grid"},g={class:"table-container"};function p(e,t,a,n,c,p){const v=(0,l.up)("m-label"),b=(0,l.up)("v-multiselect"),f=(0,l.up)("m-input"),D=(0,l.up)("m-grid"),y=(0,l.up)("transaction-dialog"),T=(0,l.Q2)("tooltip");return(0,l.wg)(),(0,l.iD)(l.HY,null,[(0,l._)("div",o,[i,(0,l._)("div",s,[r,(0,l.wy)(((0,l.wg)(),(0,l.iD)("button",{class:"m-btn",onClick:t[0]||(t[0]=(...e)=>p.showDialog&&p.showDialog(...e))},u)),[[T,"Thêm mới giao dịch"]])])]),(0,l._)("div",d,[(0,l._)("div",null,[(0,l.Wm)(v,{text:"Date Range"}),(0,l.Wm)(b,{ref:"dateRange",modelValue:c.filterParam.date,"onUpdate:modelValue":t[1]||(t[1]=e=>c.filterParam.date=e),options:e.datePickerConfig,mode:"single","close-on-select":"",clearOnSelect:"",searchable:"",noResultsText:"Không có dữ liệu hiển thị",disabled:!1,canClear:!1,onSelect:t[2]||(t[2]=e=>p.comboSelected("date"))},null,8,["modelValue","options"])]),(0,l._)("div",null,[(0,l.Wm)(v,{text:"Wallet"}),(0,l.Wm)(b,{ref:"wallet",modelValue:c.filterParam.wallet,"onUpdate:modelValue":t[3]||(t[3]=e=>c.filterParam.wallet=e),options:[{label:"Tổng",value:1},{label:"Chi tiêu hàng ngày",value:2}],mode:"single","close-on-select":"",clearOnSelect:"",searchable:"",noResultsText:"Không có dữ liệu hiển thị",disabled:!1,canClear:!1},null,8,["modelValue"])]),(0,l._)("div",null,[(0,l.Wm)(v,{text:"Category"}),(0,l.Wm)(b,{ref:"wallet",modelValue:c.filterParam.category,"onUpdate:modelValue":t[4]||(t[4]=e=>c.filterParam.category=e),options:[{label:"Tiền gửi",value:1},{label:"Cho vay",value:2}],mode:"single","close-on-select":"",clearOnSelect:"",searchable:"",noResultsText:"Không có dữ liệu hiển thị",disabled:!1,canClear:!1},null,8,["modelValue"])]),(0,l._)("div",null,[(0,l.Wm)(v,{text:"Type"}),(0,l.Wm)(b,{ref:"wallet",modelValue:c.filterParam.type_of_transaction,"onUpdate:modelValue":t[5]||(t[5]=e=>c.filterParam.type_of_transaction=e),options:[{label:"Tiền ra",value:1},{label:"Tiền vào",value:2}],mode:"single","close-on-select":"",clearOnSelect:"",searchable:"",noResultsText:"Không có dữ liệu hiển thị",disabled:!1,canClear:!1},null,8,["modelValue"])]),(0,l._)("div",m,[(0,l.Wm)(f,{placeholder:"Nhập từ khóa tìm kiếm",labelText:"Tìm kiếm nhanh"})])]),(0,l._)("div",h,[(0,l._)("div",g,[(0,l.Wm)(D,{listData:c.storeTransaction,columns:e.columns,onDblClick:p.handleDoubleClick,tableFunction:e.tableFunction,onEMainButtonClick:p.handleFunctionClick,onEDoubleClick:p.handleDoubleClick},null,8,["listData","columns","onDblClick","tableFunction","onEMainButtonClick","onEDoubleClick"])])]),(0,l.Wm)(y,{ref:"transactionDialog",onSave:p.save},null,8,["onSave"])],64)}var v=a(7139);const b={class:"m-dialog-header"},f={class:"m-dialog-header__left"},D={class:"title-container"},y={class:"dialog-title-text"},T={class:"m-dialog-header__right flex-end"},w=(0,l._)("div",{class:"button-box mr-2"},[(0,l._)("div",{class:"m-icon m-icon-24 m-help__nav"})],-1),O=(0,l._)("div",{class:"m-icon m-icon-24 m-close"},null,-1),x=[O],_={class:"grid grid-cols-4 gap-4"},C={class:"col-span-4"},k={class:"grid grid-cols-3 gap-4"},S={class:"col-end-7 flex pt-4"},V={class:"mr-2"};function W(e,t,a,n,o,i){const s=(0,l.up)("m-label"),r=(0,l.up)("v-multiselect"),c=(0,l.up)("m-input"),u=(0,l.up)("v-date-picker"),d=(0,l.up)("m-button"),m=(0,l.up)("m-dialog-container");return(0,l.wg)(),(0,l.j4)(m,{ref:"transactionDialog",boxStyle:o.boxStyle,dialogStyle:o.dialogStyle},{header:(0,l.w5)((()=>[(0,l._)("div",b,[(0,l._)("div",f,[(0,l._)("div",D,[(0,l._)("div",y,(0,v.zw)(e.formTitle),1)])]),(0,l._)("div",T,[w,(0,l._)("div",{class:"button-box",onClick:t[0]||(t[0]=e=>i.buttonClick("Cancel"))},x)])])])),body:(0,l.w5)((()=>[(0,l._)("div",_,[(0,l._)("div",null,[(0,l.Wm)(s,{text:"Wallet"}),(0,l.Wm)(r,{ref:"wallet",modelValue:o.currentItem.wallet,"onUpdate:modelValue":t[1]||(t[1]=e=>o.currentItem.wallet=e),options:[{label:"Batman",value:1},{label:"Hello",value:2}],mode:"single","close-on-select":"",clearOnSelect:"",searchable:"",noResultsText:"Không có dữ liệu hiển thị",disabled:!1,placeholder:"chọn đi",canClear:!1},null,8,["modelValue"])]),(0,l._)("div",null,[(0,l.Wm)(c,{ref:"category",labelText:"Category",modelValue:o.currentItem.category,"onUpdate:modelValue":t[2]||(t[2]=e=>o.currentItem.category=e)},null,8,["modelValue"])]),(0,l._)("div",null,[(0,l.Wm)(c,{ref:"amount",isNumberInput:"",labelText:"Amount",style:{"text-align":"left"},modelValue:o.currentItem.amount,"onUpdate:modelValue":t[3]||(t[3]=e=>o.currentItem.amount=e)},null,8,["modelValue"])]),(0,l._)("div",null,[(0,l.Wm)(s,{text:"Date"}),(0,l.Wm)(u,{ref:"date",value:o.currentItem.date,"onUpdate:value":t[4]||(t[4]=e=>o.currentItem.date=e),format:e.$enum.DateFormat,placeholder:"Ngày giao dịch",lang:e.$enum.LangString.vi,clearable:!1},null,8,["value","format","lang"])]),(0,l._)("div",C,[(0,l.Wm)(c,{ref:"note",labelText:"Note",isTextArea:"",height:"160",modelValue:o.currentItem.note,"onUpdate:modelValue":t[5]||(t[5]=e=>o.currentItem.note=e)},null,8,["modelValue"])])])])),footer:(0,l.w5)((()=>[(0,l._)("div",k,[(0,l._)("div",S,[(0,l._)("div",V,[(0,l.Wm)(d,{text:"CANCEL",type:"secondary",onClick:t[6]||(t[6]=e=>i.buttonClick("Cancel"))})]),(0,l._)("div",null,[(0,l.Wm)(d,{text:"SAVE",type:"primary",onClick:t[7]||(t[7]=e=>i.buttonClick("Save"))})])])])])),_:1},8,["boxStyle","dialogStyle"])}var I={};const M=I;var Z=M,F=a(9810),A=a(3332),N=(a(533),{extends:Z,components:{"v-multiselect":F.Z,"v-date-picker":A["default"]},data(){return{boxStyle:"height:fit-content!important; margin-top: 48px; max-height: calc(100vh - 100px);",dialogStyle:"align-items:flex-start!important;",currentItem:{wallet:null}}},created(){this.initStaticData()},methods:{initStaticData(){let e=this;e.formTitle="Thông tin giao dịch",e.formMode=e.$enum.FormMode.Insert},show(e){let t=this;this.$refs["transactionDialog"].show(),t.$refs.wallet&&t.$refs.wallet.$el.children[0].focus(),this.processDataBeforeShow(e)},hide(){this.$refs["transactionDialog"].hide()},processDataBeforeShow(e){let t=this;e&&(t.currentItem=e),t.formMode==t.$enum.FormMode.Insert&&(t.currentItem.amount=0)},buttonClick(e){switch(e){case"Cancel":this.hide();break;case"Save":this.focusFirstInput(),this.save();break;default:return}},save(){let e=this;e.$commonFunc.load();let t=e.currentItem;console.log("object: ",t),e.$emit("save",e.currentItem),e.hide()},focusFirstInput(){let e=this.$refs["category"];if(e)try{e.focus()}catch(t){console.log(t)}}}}),$=a(89);const P=(0,$.Z)(N,[["render",W]]);var E=P,L=a(676);const J={DateOptions:{January:"Tháng 1",February:"Tháng 2",March:"Tháng 3",April:"Tháng 4",May:"Tháng 5",June:"Tháng 6",July:"Tháng 7",August:"Tháng 8",September:"Tháng 9",October:"Tháng 10",November:"Tháng 11",December:"Tháng 12",ThisMonth:"Tháng này",LastMonth:"Tháng trước",ThisYear:"Năm nay",LastYear:"Năm trước",LastThreeMonth:"Ba tháng gần đây"}};var U=J;const R=[{label:U.DateOptions.ThisMonth,value:L.Z.DateOptions.ThisMonth},{label:U.DateOptions.LastMonth,value:L.Z.DateOptions.LastMonth},{label:U.DateOptions.ThisYear,value:L.Z.DateOptions.ThisYear},{label:U.DateOptions.LastYear,value:L.Z.DateOptions.LastYear},{label:U.DateOptions.LastThreeMonth,value:L.Z.DateOptions.LastThreeMonth},{label:U.DateOptions.January,value:L.Z.DateOptions.January},{label:U.DateOptions.February,value:L.Z.DateOptions.February},{label:U.DateOptions.March,value:L.Z.DateOptions.March},{label:U.DateOptions.April,value:L.Z.DateOptions.April},{label:U.DateOptions.May,value:L.Z.DateOptions.May},{label:U.DateOptions.June,value:L.Z.DateOptions.June},{label:U.DateOptions.July,value:L.Z.DateOptions.July},{label:U.DateOptions.August,value:L.Z.DateOptions.August},{label:U.DateOptions.September,value:L.Z.DateOptions.September},{label:U.DateOptions.October,value:L.Z.DateOptions.October},{label:U.DateOptions.November,value:L.Z.DateOptions.November},{label:U.DateOptions.December,value:L.Z.DateOptions.December}];var B=R,Y={components:{"v-multiselect":F.Z,"transaction-dialog":E},created(){this.initStaticData()},data(){return{storeTransaction:[{},{},{},{},{}],filterParam:{date:null}}},mounted(){},methods:{initStaticData(){let e=this;e.tableFunction={mainButtonText:"Sửa",mainFunction:"Edit",isShow:!0},e.columns=[{title:"Wallet",key:"wallet",width:200},{title:"Category",key:"category",width:200},{title:"Date",key:"date",width:200,dataType:"date",titleAlign:"center"},{title:"Amount",key:"amount",dataType:"number",titleAlign:"right",width:200},{title:"Note",key:"note",width:500,visible:!1}],e.datePickerConfig=B},showDialog(e){this.$refs["transactionDialog"].show(e)},save(e){let t=this;e&&t.storeTransaction.push(e)},handleFunctionClick(e){let t=this;if(e)switch(t.tableFunction.mainFunction){case"Edit":t.showDialog(e)}},handleDoubleClick(e){let t=this;switch(console.log("object",e),t.tableFunction.mainFunction){case"Edit":t.showDialog(e)}},comboSelected(e){let t=this;switch(e){case"date":console.log("date: ",t.filterParam.date)}}}};const K=(0,$.Z)(Y,[["render",p]]);var j=K}}]);
//# sourceMappingURL=37.b9604112.js.map