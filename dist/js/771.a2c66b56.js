"use strict";(self["webpackChunktraveller"]=self["webpackChunktraveller"]||[]).push([[771],{2771:function(e,t,s){s.r(t),s.d(t,{default:function(){return X}});var o=s(3396),n=s(7139),a=s(9242),r=s(2035);const i={class:"loginpage"},c={class:"login-top-content flex justify-center h-1/4"},l={class:"flex-col"},m={class:"flex justify-center mb-1"},u=(0,o._)("div",{class:"appname font-medium text-2xl justify-center flex text-white"}," Traveller ",-1),d={class:"login-bottom-content flex justify-center"},h={class:"warp-form m-card flex flex-col"},g={class:"form-title-text"},p={class:"wrap-form-body"},f={key:0,class:"social"},w={class:"social-description"},k={class:"social-items flex flex-col"},b=(0,o.uE)('<button class="btn social-item google h-11"><span class="btn-content"><img src="'+r+'" alt="google-icon" width="20" height="30"><span class="social-item-name">Connect with Google</span></span></button><button class="btn social-item h-11 facebook"><span class="social-item-name"> Connect with Facebook </span></button><button class="btn social-item h-11 apple"><span class="social-item-name">Sign in with Apple</span></button>',3),$=(0,o._)("span",{class:"social-item-name"},"Quay lại trang chủ",-1),_=[$],T={key:1,class:"network"},v={class:"using-ml-account-text"},y={class:"form-auth"},I={class:"forgot-password"},x={class:"btn-content"},C={class:"suggestion"},P={key:2,class:"network register"},S={class:"form-auth"},V={class:"btn-content"},R={class:"suggestion"},U={key:3,class:"network"},z={class:"using-ml-account-text"},A=(0,o.Uk)(" Mã kích hoạt đã được gửi tới email "),F={class:"form-auth"},L={class:"btn-content"},O={class:"suggestion"},D={key:4,class:"network"},E={class:"form-auth"},M={class:"btn-content"},N={key:5,class:"network"},B={class:"using-ml-account-text"},q=(0,o.Uk)(" Mã xác nhận đã được gửi tới email "),Z={class:"form-auth"},W={class:"btn-content"},G={class:"suggestion"};function H(e,t,s,$,H,j){const K=(0,o.up)("m-input");return(0,o.wg)(),(0,o.iD)("div",i,[(0,o._)("div",c,[(0,o._)("div",l,[(0,o._)("div",m,[(0,o._)("img",{src:r,alt:"logo",width:"100",height:"100",onClick:t[0]||(t[0]=(...e)=>j.backToHome&&j.backToHome(...e))})]),u])]),(0,o._)("div",d,[(0,o._)("div",h,[(0,o._)("div",g,(0,n.zw)(H.formTitle),1),(0,o._)("div",p,[H.showSocial?((0,o.wg)(),(0,o.iD)("div",f,[(0,o._)("div",w,(0,n.zw)(e.$t("login.use_social_account")),1),(0,o._)("div",k,[b,(0,o._)("button",{class:"btn social-item h-11 apple",onClick:t[1]||(t[1]=(...e)=>j.backToHome&&j.backToHome(...e))},_)])])):(0,o.kq)("",!0),1==H.formType?((0,o.wg)(),(0,o.iD)("div",T,[(0,o._)("div",v,(0,n.zw)(e.$t("login.use_traveller_account")),1),(0,o._)("form",y,[(0,o.Wm)(K,{ref:"email",showLabel:!1,placeholder:"Email",modelValue:H.currentItem.email,"onUpdate:modelValue":t[2]||(t[2]=e=>H.currentItem.email=e),class:"mb-3 caret-red",height:44,onKeyup:t[3]||(t[3]=(0,a.D2)((e=>j.buttonClick("Login")),["enter"]))},null,8,["modelValue"]),(0,o.Wm)(K,{ref:"password",showLabel:!1,placeholder:"Password",modelValue:H.currentItem.password,"onUpdate:modelValue":t[4]||(t[4]=e=>H.currentItem.password=e),type:"password",viewPassword:!1,class:"mb-2 caret-red",height:44,onKeyup:t[5]||(t[5]=(0,a.D2)((e=>j.buttonClick("Login")),["enter"]))},null,8,["modelValue"]),(0,o._)("div",I,[(0,o._)("span",{class:"forgot-password-text",onClick:t[6]||(t[6]=(...e)=>j.gotoForgotPassword&&j.gotoForgotPassword(...e))},(0,n.zw)(e.$t("ForgotPassword")),1)]),(0,o._)("button",{class:"btn-submit-ml btn",type:"button",onClick:t[7]||(t[7]=e=>j.buttonClick("Login"))},[(0,o._)("span",x,(0,n.zw)(e.$t("Login")),1)])]),(0,o._)("div",C,[(0,o.Uk)((0,n.zw)(e.$t("NoAccount"))+" ",1),(0,o._)("span",{class:"suggestion-action",onClick:t[8]||(t[8]=(...e)=>j.gotoRegister&&j.gotoRegister(...e))},(0,n.zw)(e.$t("Register")),1)])])):(0,o.kq)("",!0),2==H.formType?((0,o.wg)(),(0,o.iD)("div",P,[(0,o._)("form",S,[(0,o.Wm)(K,{ref:"email",labelText:"Nhập email",placeholder:"Email",modelValue:H.currentItem.email,"onUpdate:modelValue":t[9]||(t[9]=e=>H.currentItem.email=e),class:"mb-3 caret-red",height:44},null,8,["modelValue"]),(0,o.Wm)(K,{ref:"password",labelText:"Nhập mật khẩu",placeholder:"Password",type:"password",modelValue:H.currentItem.password,"onUpdate:modelValue":t[10]||(t[10]=e=>H.currentItem.password=e),class:"mb-2 caret-red",height:44},null,8,["modelValue"]),(0,o._)("button",{class:"btn-register-ml btn mt-2 h-10",type:"button",onClick:t[11]||(t[11]=e=>j.buttonClick("Register"))},[(0,o._)("span",V,(0,n.zw)(e.$t("Register")),1)])]),(0,o._)("div",R,[(0,o.Uk)((0,n.zw)(e.$t("AlreadyHasAccount"))+" ",1),(0,o._)("span",{class:"suggestion-action",onClick:t[12]||(t[12]=(...e)=>j.gotoLogin&&j.gotoLogin(...e))},(0,n.zw)(e.$t("Login")),1)])])):(0,o.kq)("",!0),3==H.formType?((0,o.wg)(),(0,o.iD)("div",U,[(0,o._)("div",z,[A,(0,o._)("b",null,(0,n.zw)(H.currentItem.email),1),(0,o.Uk)(". Vui lòng kiểm tra và nhập mã kích hoạt. Mã có hiệu lực trong : "+(0,n.zw)(H.minuteString)+":"+(0,n.zw)(H.secondString),1)]),(0,o._)("form",F,[(0,o.Wm)(K,{ref:"otp",labelText:"Nhập mã kích hoạt",placeholder:"OTP",modelValue:H.currentItem.otp_code,"onUpdate:modelValue":t[13]||(t[13]=e=>H.currentItem.otp_code=e),class:"mb-3 caret-red",height:44},null,8,["modelValue"]),(0,o._)("button",{class:"btn-submit-ml btn mt-2 h-10",type:"button",onClick:t[14]||(t[14]=e=>j.buttonClick("Active"))},[(0,o._)("span",L,(0,n.zw)(e.$t("Active")),1)])]),(0,o._)("div",O,[(0,o.Uk)((0,n.zw)(e.$t("NoOTPReceipt"))+" ",1),(0,o._)("span",{class:"suggestion-action",onClick:t[15]||(t[15]=e=>j.buttonClick("ResendOTP"))},(0,n.zw)(e.$t("ResendOTP")),1)])])):(0,o.kq)("",!0),4==H.formType?((0,o.wg)(),(0,o.iD)("div",D,[(0,o._)("form",E,[(0,o.Wm)(K,{ref:"email",labelText:"Nhập email",placeholder:"Email",modelValue:H.currentItem.email,"onUpdate:modelValue":t[16]||(t[16]=e=>H.currentItem.email=e),class:"mb-3 caret-red",height:44},null,8,["modelValue"]),(0,o._)("button",{class:"btn-register-ml btn mt-2 h-10",type:"button",onClick:t[17]||(t[17]=e=>j.buttonClick("GetPasswordBack"))},[(0,o._)("span",M,(0,n.zw)(e.$t("forgot_password.GetPasswordBack")),1)])])])):(0,o.kq)("",!0),5==H.formType?((0,o.wg)(),(0,o.iD)("div",N,[(0,o._)("div",B,[q,(0,o._)("b",null,(0,n.zw)(H.currentItem.email),1),(0,o.Uk)(". Vui lòng kiểm tra và nhập mã kích hoạt. Mã có hiệu lực trong : "+(0,n.zw)(H.minuteString)+":"+(0,n.zw)(H.secondString),1)]),(0,o._)("form",Z,[(0,o.Wm)(K,{ref:"otp",labelText:"Nhập mã xác nhận",placeholder:"OTP",modelValue:H.currentItem.otp_code,"onUpdate:modelValue":t[18]||(t[18]=e=>H.currentItem.otp_code=e),class:"mb-3 caret-red",height:44},null,8,["modelValue"]),(0,o._)("button",{class:"btn-submit-ml btn mt-2 h-10",type:"button",onClick:t[19]||(t[19]=e=>j.buttonClick("ChangePassword"))},[(0,o._)("span",W,(0,n.zw)(e.$t("forgot_password.ChangePassword")),1)])]),(0,o._)("div",G,[(0,o.Uk)((0,n.zw)(e.$t("NoOTPReceipt"))+" ",1),(0,o._)("span",{class:"suggestion-action",onClick:t[20]||(t[20]=e=>j.buttonClick("ResendOTP"))},(0,n.zw)(e.$t("ResendOTP")),1)])])):(0,o.kq)("",!0)])])])])}var j=s(9852),K={name:"LoginPage",data(){return{currentItem:{},formType:1,formTitle:this.$t("Login"),showSocial:!1,minute:14,second:59,minuteString:"",secondString:""}},created(){let e=this;e.checkAlreadyLogin()&&e.$router.push({name:"post"})},methods:{gotoForgotPassword(){this.formType=4,this.formTitle=this.$t("forgot_password.GetPasswordBack")},async resendOTP(){let e=this;e.$commonFunc.load();let t={email:e.currentItem.email,password:e.currentItem.password};try{let s=await j.Z.request(j.Z.urlName+"/resend_otp","POST",t);s&&s.data&&(200==s.data.StatusCode?(e.$store.commit("showInfo",{message:"Mã xác nhận đã gửi lại thành công. Vui lòng kiểm tra email của bạn."}),e.countDown(15)):s.data.DevMsg&&e.$store.commit("showInfo",{message:s.data.DevMsg}))}catch(s){console.error(s),e.$commonFunc.unload()}e.$commonFunc.unload()},countDown(e){this.minute=e?e-1:14,this.second=59,this.minuteString=this.minute.toString().length<2?"0"+this.minute.toString():this.minute.toString(),this.secondString=this.second+"",setInterval((()=>{if(this.second=this.second-1,this.second<=0&&(this.minute-=1,this.second=59),this.minute<0)return this.minuteString="00",void(this.secondString="00");this.minuteString=this.minute.toString(),this.secondString=this.second.toString(),this.minuteString.length<2&&(this.minuteString="0"+this.minute),this.secondString.length<2&&(this.secondString="0"+this.second)}),1e3)},gotoLogin(){this.formType=1,this.formTitle=this.$t("Login"),this.$nextTick((()=>{this.$refs.email.focus()}))},gotoRegister(){this.formType=2,this.formTitle=this.$t("register.RegisterNewAccount"),this.$nextTick((()=>{this.$refs.email.focus()}))},checkAlreadyLogin(){let e=this;return null!=e.$cache.get("AccessToken")},backToHome(){this.$router.push({name:"postList"})},buttonClick(e){switch(e){case"Login":this.login();break;case"Register":this.register();break;case"Active":this.activeAccount();break;case"ResendOTP":this.resendOTP();break;case"GetPasswordBack":this.forgotPassword();break;case"ConfirmOTP":this.confirmOTP();break;default:break}},confirmOTP(){},async forgotPassword(){let e=this;if(e.currentItem.email){e.$commonFunc.load();let t=await j.Z.request(`${j.Z.urlName}/forgot_password?email=${e.currentItem.email}`,"GET");e.$commonFunc.unload(),t&&t.data&&(200==t.data.StatusCode?(this.$store.commit("showInfo",{message:t.data.UserMsg?t.data.UserMsg:"Mã xác nhận đã được gửi thành công."}),this.formType=5,this.formTitle="Nhập mã xác nhận thay đổi mật khẩu",this.countDown(15)):this.$store.commit("showError",{message:t.data.UserMsg?t.data.UserMsg:"Đã có lỗi xảy ra."}))}},async activeAccount(){let e=this,t={email:e.currentItem.email,password:e.currentItem.password,active_code:e.currentItem.otp_code};e.$commonFunc.load();let s=await j.Z.request(j.Z.urlName+"/active_user","POST",t);s&&(e.$commonFunc.unload(),200==s.data.StatusCode?(e.$store.commit("showSuccess",{message:"Tài khoản đã được kích hoạt thành công. Vui lòng đăng nhập lại."}),e.formType=1,e.formTitle=e.$t("Login"),e.$nextTick((()=>{e.$refs.email.focus()}))):(e.$store.commit("showError",{message:"Mã xác nhận không hợp lệ. Vui lòng kiểm tra lại."}),e.$refs.otp_code.focus(),e.$refs.otp_code.addRedBorder())),e.$commonFunc.unload()},async login(){let e=this;if(e.validateComponent()){let s={email:e.currentItem.email,password:e.currentItem.password};try{e.$commonFunc.load();let t=await j.Z.login(s);e.$commonFunc.unload(),t?t.token?(e.$cache.remove("AccessToken"),e.$cache.set("AccessToken",t.token),t.account&&(t.account.refresh_token&&(e.$cache.remove("RefreshToken"),e.$cache.set("RefreshToken",t.account.refresh_token),e.$cache.remove("AccessToken"),e.$cache.set("AccessToken",t.token)),e.$session.set("FullName",t.account.full_name),e.$session.set("UserID",t.account.user_id),e.$store.state.userAvatar=t.account.user_avatar_img,e.$session.set("UserAvatar",t.account.user_avatar_img),e.$session.set("UserRole",t.account.role)),e.$router.push({name:"postList"})):(e.$store.commit("showError",{message:"Tài khoản hoặc mật khẩu không chính xác."}),e.$nextTick((()=>{e.$refs.email.focus()}))):(e.$store.commit("showError",{message:"Tài khoản hoặc mật khẩu không chính xác."}),e.$refs.email.focus())}catch(t){console.error(t)}}},validateComponent(){let e=this;if(e.currentItem){if(!e.currentItem.email&&e.$refs.email&&"function"==typeof e.$refs.email.addRedBorder)return e.$refs.email.addRedBorder(),e.$refs.email.focus(),e.$store.commit("showError",{message:"Email/tài khoản không được bỏ trống"}),!1;if(e.currentItem.email&&!e.$commonFunc.validateEmail(e.currentItem.email)&&e.$refs.email&&"function"==typeof e.$refs.email.addRedBorder)return e.$refs.email.addRedBorder(),e.$refs.email.focus(),e.$store.commit("showError",{message:"Email không hợp lệ"}),!1;if(!e.currentItem.password&&e.$refs.password&&"function"==typeof e.$refs.password.addRedBorder)return e.$refs.password.addRedBorder(),e.$refs.password.focus(),e.$store.commit("showError",{message:"Mật khẩu không được bỏ trống"}),!1}return!0},async register(){let e=this;if(e.validateComponent()){let t={email:e.currentItem.email,password:e.currentItem.password};e.$commonFunc.load();let s=await j.Z.request(j.Z.urlName+"/register","POST",t);s?s.data&&200==s.data.StatusCode?(e.formTitle="Kích hoạt tài khoản",e.formType=3,e.countDown(15)):s.data.UserMsg&&e.$store.commit("showWarning",{message:s.data.UserMsg}):(e.$store.commit("showError",{message:"Tài khoản hoặc mật khẩu không chính xác."}),e.$refs.email.focus()),e.$commonFunc.unload()}}}},Q=s(89);const J=(0,Q.Z)(K,[["render",H]]);var X=J}}]);
//# sourceMappingURL=771.a2c66b56.js.map