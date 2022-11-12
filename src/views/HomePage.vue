<template>
  <div class="home-container">
    <div class="m-card">
      <div class="card-title">Traveller - chia sẻ kinh nghiệm du lịch</div>
      <div class="card-image">
        <img src="@/assets/img/traveler.jpg" alt="" width="500" height="250">
      </div>
      <div>
          Traveller là một website tổng hợp thông tin và chia sẻ các kinh nghiệm về du lịch trên khắp mọi miền Tổ Quốc Việt Nam cho những bạn đam mê du lịch. Với tôn chỉ “Ai cũng có thể tự đi du lịch“, chúng tôi cam kết mang đến cho các bạn những thông tin cần thiết, thú vị, cập nhật liên tục.
      </div>        
    </div>
    <div class="m-card">
      <div>Nội Dung Nổi Bật Phiên Bản 3.0</div>
      <div>
         Nhiệm vụ mới
      </div>
      <div>
         Nhân vật mới
      </div>
      <div>
         Vũ khí mới
      </div>
    </div>
    <div>Timers</div>
    <img src="@/assets/img/tut_cat_1_35.webp">
    <div>Việc có thể làm hôm nay</div>
  </div>
  
</template>

<script>
export default {
    name: "HomePage"
}
</script>

<style scoped>
.home-container{
  padding: 20px;
}
.card-title{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-color);
  border-radius: 6px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
}
.card-image{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>