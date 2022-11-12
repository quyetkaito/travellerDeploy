<template>
  <div class="loginpage">
    <!-- logo -->
    <div class="login-top-content flex justify-center h-1/4">
      <div class="flex-col">
        <div class="flex justify-center mb-1">
          <img
            src="@/assets/logo-law.png"
            alt="logo"
            width="100"
            height="100"
            @click="backToHome"
          />
        </div>
        <!-- tên app -->
        <div
          class="appname font-medium text-2xl justify-center flex text-white"
        >
          Traveller
        </div>
      </div>
    </div>
    <div class="login-bottom-content flex justify-center">
      <!-- Form đăng nhập -->
      <div class="warp-form m-card flex flex-col">
        <div class="form-title-text">{{ formTitle }}</div>
        <div class="wrap-form-body">
          <div class="social" v-if="showSocial">
            <div class="social-description">
              {{$t('login.use_social_account')}}
            </div>
            <div class="social-items flex flex-col">
              <button class="btn social-item google h-11">
                <span class="btn-content">
                  <img
                    src="@/assets/logo-law.png"
                    alt="google-icon"
                    width="20"
                    height="30"
                  />
                  <span class="social-item-name">Connect with Google</span>
                </span>
              </button>
              <button class="btn social-item h-11 facebook">
                <span class="social-item-name"> Connect with Facebook </span>
              </button>
              <button class="btn social-item h-11 apple">
                <span class="social-item-name">Sign in with Apple</span>
              </button>
              <button class="btn social-item h-11 apple" @click="backToHome">
                <span class="social-item-name">Quay lại trang chủ</span>
              </button>
            </div>
          </div>
          <!-- Màn hình đăng nhập -->
          <div class="network" v-if="formType == 1">
            <div class="using-ml-account-text">{{$t('login.use_traveller_account')}}</div>
            <form class="form-auth">
              <m-input
                ref="email"
                :showLabel="false"
                placeholder="Email"
                v-model="currentItem.email"
                class="mb-3 caret-red"
                :height="44"
                @keyup.enter="buttonClick('Login')"
              ></m-input>

              <m-input
                ref="password"
                :showLabel="false"
                placeholder="Password"
                v-model="currentItem.password"
                type="password"
                :viewPassword="false"
                class="mb-2 caret-red"
                :height="44"
                @keyup.enter="buttonClick('Login')"
              ></m-input>

              <div class="forgot-password">
                <span class="forgot-password-text" @click="gotoForgotPassword">{{
                  $t("ForgotPassword")
                }}</span>
              </div>
              <button
                class="btn-submit-ml btn"
                type="button"
                @click="buttonClick('Login')"
              >
                <span class="btn-content">{{ $t("Login") }}</span>
              </button>
            </form>
            <div class="suggestion">
              {{ $t("NoAccount") }}
              <span class="suggestion-action" @click="gotoRegister">{{
                $t("Register")
              }}</span>
            </div>
          </div>
          <!-- Màn hình đăng ký tài khoản -->
          <div class="network register" v-if="formType == 2">
            <!-- <div class="using-ml-account-text">Nhập thông tin đăng ký</div> -->
            <form class="form-auth">
              <m-input
                ref="email"
                labelText="Nhập email"
                placeholder="Email"
                v-model="currentItem.email"
                class="mb-3 caret-red"
                :height="44"
              ></m-input>

              <m-input
                ref="password"
                labelText="Nhập mật khẩu"
                placeholder="Password"
                type="password"
                v-model="currentItem.password"
                class="mb-2 caret-red"
                :height="44"
              ></m-input>

              <button
                class="btn-register-ml btn mt-2 h-10"
                type="button"
                @click="buttonClick('Register')"
              >
                <span class="btn-content">{{ $t("Register") }}</span>
              </button>
            </form>
            <div class="suggestion">
              {{ $t("AlreadyHasAccount") }}
              <span class="suggestion-action" @click="gotoLogin">{{
                $t("Login")
              }}</span>
            </div>
          </div>
          <!-- Màn hình nhập mã kích hoạt tài khoản -->
          <div class="network" v-if="formType == 3">
            <div class="using-ml-account-text">
              Mã kích hoạt đã được gửi tới email <b>{{ currentItem.email }}</b>. Vui
              lòng kiểm tra và nhập mã kích hoạt. Mã có hiệu lực trong :
              {{ minuteString }}:{{ secondString }}
            </div>
            <form class="form-auth">
              <m-input
                ref="otp"
                labelText="Nhập mã kích hoạt"
                placeholder="OTP"
                v-model="currentItem.otp_code"
                class="mb-3 caret-red"
                :height="44"
              ></m-input>

              <button
                class="btn-submit-ml btn mt-2 h-10"
                type="button"
                @click="buttonClick('Active')"
              >
                <span class="btn-content">{{ $t("Active") }}</span>
              </button>
            </form>
            <div class="suggestion">
              {{ $t("NoOTPReceipt") }}
              <span class="suggestion-action" @click="buttonClick('ResendOTP')">{{
                $t("ResendOTP")
              }}</span>
            </div>
          </div>
          <!-- Màn hình quên mật khẩu -->
          <div class="network" v-if="formType == 4">            
            <form class="form-auth">
              <m-input
                ref="email"
                labelText="Nhập email"
                placeholder="Email"
                v-model="currentItem.email"
                class="mb-3 caret-red"
                :height="44"
              ></m-input>            

              <button
                class="btn-register-ml btn mt-2 h-10"
                type="button"
                @click="buttonClick('GetPasswordBack')"
              >
                <span class="btn-content">{{ $t("forgot_password.GetPasswordBack") }}</span>
              </button>
            </form>            
          </div>
          <!-- Màn hình nhập mã xác nhận mật khẩu -->
          <div class="network" v-if="formType == 5">
            <div class="using-ml-account-text">
              Mã xác nhận đã được gửi tới email <b>{{ currentItem.email }}</b>. Vui
              lòng kiểm tra và nhập mã kích hoạt. Mã có hiệu lực trong :
              {{ minuteString }}:{{ secondString }}
            </div>
            <form class="form-auth">
              <m-input
                ref="otp"
                labelText="Nhập mã xác nhận"
                placeholder="OTP"
                v-model="currentItem.otp_code"
                class="mb-3 caret-red"
                :height="44"
              ></m-input>

              <button
                class="btn-submit-ml btn mt-2 h-10"
                type="button"
                @click="buttonClick('ChangePassword')"
              >
                <span class="btn-content">{{ $t("forgot_password.ChangePassword") }}</span>
              </button>
            </form>
            <div class="suggestion">
              {{ $t("NoOTPReceipt") }}
              <span class="suggestion-action" @click="buttonClick('ResendOTP')">{{
                $t("ResendOTP")
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AuthAPI from "@/api/AuthAPI";
export default {
  name: "LoginPage",
  data() {
    return {
      currentItem: {}, //đối tuont57 để
      formType: 1, //1 là đăng nhập, 2 là đăng ký, 3 là màn hình kích hoạt tài khoản, 4 là màn hình quên mật khẩu
      formTitle: this.$t("Login"),
      showSocial: false, //có show cục tài khoản mạng xã hội hay không?
      minute: 14,
      second: 59,
      minuteString: "",
      secondString: "",
    };
  },
  created() {
    let me = this;
    if (me.checkAlreadyLogin()) {
      me.$router.push({ name: "post" });
    }
  },
  methods: {
    /**
    * Chuyển sang màn hình quên mật khẩu
    * @created : quyetkaito 10/10/2022
    */
    gotoForgotPassword(){
        this.formType = 4; //chuyển sang màn quên mật khẩu
        this.formTitle = this.$t('forgot_password.GetPasswordBack');
    },

    /**
     * Hàm yêu cầu gửi lại mã xác nhận
     */
    async resendOTP(){
        let me = this;
        me.$commonFunc.load();
        let object = {
          email: me.currentItem.email,
          password: me.currentItem.password
        }
        try {
          let res = await AuthAPI.request(
            AuthAPI.urlName + "/resend_otp",
            "POST",
            object
          );
          if(res && res.data){
              if(res.data.StatusCode == 200){
                me.$store.commit("showInfo",{ message : "Mã xác nhận đã gửi lại thành công. Vui lòng kiểm tra email của bạn."}); 
                me.countDown(15); //countdown lại
              }else if(res.data.DevMsg){
                me.$store.commit("showInfo", {message : res.data.DevMsg});
              }
          }
        } catch (error) {
          console.error(error);
          me.$commonFunc.unload();   
        }
        
        
        me.$commonFunc.unload();
    },

    /**
    * Hàm tạo đồng hồ đếm ngược thời gian hết hạn của mã xác nhận.
    * @created : quyetkaito 09/10/2022
    * @param {Number} time : 15 phút => countdown từ 14:59
    */
    countDown(time) {
      this.minute = time? time - 1: 14; //mặc định countdown 15 phút
      this.second = 59;
      this.minuteString = this.minute.toString().length <2 ? "0"+this.minute.toString() : this.minute.toString();
      this.secondString = this.second+"";
      setInterval(() => {        
        this.second = this.second - 1;
        if (this.second <= 0) {
          this.minute -= 1;
          this.second = 59;
        }
        if (this.minute < 0) {
          this.minuteString = "00";
          this.secondString = "00";
          return; 

        } //hết thời gian
        this.minuteString = this.minute.toString();
        this.secondString = this.second.toString();
        if(this.minuteString.length <2) this.minuteString = "0" + this.minute;
        if(this.secondString.length <2) this.secondString = "0" + this.second;
      }, 1000);
    },

    /**
    * Chuyển sang màn hình login
    * @created : quyetkaito 10/10/2022
    */
    gotoLogin() {
      this.formType = 1;
      this.formTitle = this.$t("Login");
      //focus vào ô email
      this.$nextTick(() => {
        this.$refs.email.focus();
      });
    },

    /**
     * chuyển sang màn hình đăng ký
     * @created : quyetkaito 08/10/2022
     */
    gotoRegister() { 
      let me = this;     
      this.formType = 2;
      this.formTitle = this.$t("register.RegisterNewAccount");
      //focus vào ô email
      this.$nextTick(() => {
        this.$refs.email.focus();
      });            
    },

    checkAlreadyLogin() {
      let me = this;
      if (me.$cache.get("AccessToken") != null) {
        return true;
      }
      return false;
    },

    /**
     * Quay lại trang chủ, ko muốn đăng nhập đăng ký gì nữa
     * @created : quyetkaito 02/10/2022
     */
    backToHome() {
      this.$router.push({ name: "postList" });
    },

    /**------------------------------------------
    * Hàm xử lý khi button Login được Click
    * Author: quyetkaito (22/05/2022)
    --------------------------------------------*/
    buttonClick(action) {
      switch (action) {
        case "Login":
          this.login();
          break;
        case "Register":
          this.register();
          break;
        case "Active":
          this.activeAccount();
          break;
        case "ResendOTP":
          this.resendOTP();
          break;        
        case "GetPasswordBack":
          this.forgotPassword();
          break;
        case "ConfirmOTP":
          this.confirmOTP();
          break;
        default:
          break;
      }
    },

    confirmOTP(){

    },

    /**
    * gọi API quên mật khẩu
    * @created : quyetkaito 10/10/2022
    */
    async forgotPassword(){
        let me = this;
        if(me.currentItem.email){
          me.$commonFunc.load();          
          let res = await AuthAPI.request(`${AuthAPI.urlName}/forgot_password?email=${me.currentItem.email}`, 'GET');
          me.$commonFunc.unload();
          if(res && res.data){
            if(res.data.StatusCode == 200){
              this.$store.commit('showInfo', {message: res.data.UserMsg ? res.data.UserMsg : 'Mã xác nhận đã được gửi thành công.'});
              //chuyển sang màn nhập mã
              this.formType = 5;
              this.formTitle = "Nhập mã xác nhận thay đổi mật khẩu";
              this.countDown(15);
            }else {
              this.$store.commit('showError', {message: res.data.UserMsg ? res.data.UserMsg : 'Đã có lỗi xảy ra.'});
            }
          }
        }        
    },

    /**
     * Hàm thực hiện kích hoạt tài khoản người dùng.
     * @created : quyetkaito 08/10/2022
     */
    async activeAccount() {
      let me = this;
      let object = {
        email: me.currentItem.email,
        password: me.currentItem.password,
        active_code: me.currentItem.otp_code,
      };
      me.$commonFunc.load();
      let res = await AuthAPI.request(
        AuthAPI.urlName + "/active_user",
        "POST",
        object
      );
      if (res) {
        me.$commonFunc.unload();
        if (res.data.StatusCode == 200) {
          me.$store.commit("showSuccess", {
            message:
              "Tài khoản đã được kích hoạt thành công. Vui lòng đăng nhập lại.",
          });
          me.formType = 1;
          me.formTitle = me.$t("Login");
          me.$nextTick(() => {
            me.$refs.email.focus();
          });
        }else{
          me.$store.commit("showError", {
            message:
              "Mã xác nhận không hợp lệ. Vui lòng kiểm tra lại.",
          });
          me.$refs.otp_code.focus();
          me.$refs.otp_code.addRedBorder();
        }
      }
      me.$commonFunc.unload();
    },

    /**
     * Hàm xử lý gọi API đăng nhập
     */
    async login() {
      let me = this;
      //validate
      if (me.validateComponent()) {
        //gọi api login
        let object = {
          email: me.currentItem.email,
          password: me.currentItem.password,
        };
        try {
          me.$commonFunc.load();
          let res = await AuthAPI.login(object);
          me.$commonFunc.unload();
          if (res) {
            if (res.token) {
              //lấy token lưu vào accesstoken
              me.$cache.remove("AccessToken");
              me.$cache.set("AccessToken", res.token);
              if (res.account) {
                if (res.account.refresh_token) {
                  me.$cache.remove("RefreshToken");
                  me.$cache.set("RefreshToken", res.account.refresh_token);
                  me.$cache.remove("AccessToken");
                  me.$cache.set('AccessToken', res.token);                
                }
                me.$session.set("FullName", res.account.full_name);
                me.$session.set("UserID", res.account.user_id);
                me.$store.state.userAvatar = res.account.user_avatar_img;
                me.$session.set("UserAvatar", res.account.user_avatar_img);
                me.$session.set("UserRole", res.account.role);
              }
              me.$router.push({ name: "postList" });
            } else {
              me.$store.commit("showError", {
                message: "Tài khoản hoặc mật khẩu không chính xác.",
              });
              me.$nextTick(() => {
                me.$refs.email.focus();
              });
            }
          } else {
            me.$store.commit("showError", {
              message: "Tài khoản hoặc mật khẩu không chính xác.",
            });
            me.$refs.email.focus();
          }
        } catch (error) {
          console.error(error);
          // me.handleException(error);
        }

        //lưu vào localstorage
      }
    },

    /**
    * Validate trước khi login
    * @created : quyetkaito 12/10/2022
    */
    validateComponent() {
      let me = this;
      if (me.currentItem) {
        if (!me.currentItem.email) {
          if (
            me.$refs.email &&
            typeof me.$refs.email.addRedBorder == "function"
          ) {
            me.$refs.email.addRedBorder();
            me.$refs.email.focus();
            me.$store.commit("showError", {
              message: "Email/tài khoản không được bỏ trống",
            });
            return false;
          }
        }
        if (
          me.currentItem.email &&
          !me.$commonFunc.validateEmail(me.currentItem.email)
        ) {
          if (
            me.$refs.email &&
            typeof me.$refs.email.addRedBorder == "function"
          ) {
            me.$refs.email.addRedBorder();
            me.$refs.email.focus();
            me.$store.commit("showError", { message: "Email không hợp lệ" });
            return false;
          }
        }
        if (!me.currentItem.password) {
          if (
            me.$refs.password &&
            typeof me.$refs.password.addRedBorder == "function"
          ) {
            me.$refs.password.addRedBorder();
            me.$refs.password.focus();
            me.$store.commit("showError", {
              message: "Mật khẩu không được bỏ trống",
            });
            return false;
          }
        }        
      }
      return true;
    },

    /**
    * Hàm xử lý cho người dùng đăng ký tài khoản
    * @created : quyetkaito 09/10/2022
    */
    async register() {
      let me = this;
      //validate
      if (me.validateComponent()) {
        //gọi api login
        let object = {
          email: me.currentItem.email,
          password: me.currentItem.password,
        };
        me.$commonFunc.load();
        let res = await AuthAPI.request(
          AuthAPI.urlName + "/register",
          "POST",
          object
        );
        if (res) {
          if (res.data && res.data.StatusCode == 200) {
            //chuyển sang màn hình nhập mã
            me.formTitle = "Kích hoạt tài khoản";
            me.formType = 3;
            me.countDown(15);            
          }else if(res.data.UserMsg){
            me.$store.commit("showWarning", {
              message: res.data.UserMsg,
            });
          }
        } else {
          me.$store.commit("showError", {
            message: "Tài khoản hoặc mật khẩu không chính xác.",
          });
          me.$refs.email.focus();
        }
        me.$commonFunc.unload();
      }
    },
  },
};
</script>

<style>
.appname {
  font-weight: 500;
  font-size: 40px;
}
.loginpage {
  width: 100%;
  height: 100vh;
  background: linear-gradient(#00710f 314px, #ebebeb -100%);
}
.login-top-content {
  padding-top: 20px;
}
.login-bottom-content {
  /* background-color: #ebebeb; */
  /* @apply h-3/4; */
}
.warp-form {
  background-color: #fff;
  border-radius: 20px;
  width: 670px;
  padding: 34px 40px 40px;
}
.wrap-form-body {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  margin-top: 34px;
}
.form-title-text {
  @apply font-bold text-4xl text-center;
}
.social {
  position: relative;
  overflow: hidden;
  max-width: 280px;
  width: 100%;
  margin-right: 14px;
}
.social-description {
  color: #707070;
  margin-bottom: 18px;
}
.network {
  flex: 1 1 auto;
}
.wrap-form-body .social-item {
  border-radius: 10px !important;
  border: 2px solid !important;
  width: 100% !important;
  padding: 8px 16px !important;
  letter-spacing: normal !important;
  justify-content: center !important;
  text-transform: unset !important;
  background-color: #fff !important;
  margin-bottom: 12px !important;
}
.google {
  color: #fa5d5d !important;
}
.google:hover {
  background-color: #fa5d5d !important;
}

.wrap-form-body .social-item-name {
  line-height: 19px;
  font-size: 16px;
  margin-left: 14px !important;
}
.wrap-form-body .social-item:hover .social-item-name {
  color: #fff !important;
}
.wrap-form-body .network .using-ml-account-text {
  color: #707070;
  margin-bottom: 18px !important;
  margin-left: 16px !important;
}
.wrap-form-body .network .suggestion {
  color: #000;
  margin-right: 9px;
  text-align: center;
}
.wrap-form-body .network .suggestion-action {
  color: var(--default-color);
  text-decoration: underline;
  font-weight: 400;
  cursor: pointer;
}
.form-auth {
  border-left: 2px solid #e0e0e0;
  padding-left: 14px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
}
.forgot-password {
  text-align: right;
  margin-bottom: 16px;
}
.forgot-password-text {
  color: var(--default-color);
}
.forgot-password-text:hover {
  color: var(--hover-color);
  cursor: pointer;
}
.btn-submit-ml {
  border-radius: 10px !important;
  background-color: #00bc2a !important;
  color: #fff !important;
  font-size: 16px !important;
  cursor: pointer;
}

.btn-register-ml {
  border-radius: 10px !important;
  background-color: #004bbc !important;
  color: #fff !important;
  font-size: 16px !important;
  cursor: pointer;
}
.h-52 {
  height: 52px !important;
}
.facebook {
  color: #1877f2 !important;
}
.facebook:hover {
  background-color: #1877f2 !important;
}
.apple {
  color: #000;
}
.apple:hover {
  background-color: #000 !important;
}
</style>

