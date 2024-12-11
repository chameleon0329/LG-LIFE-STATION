<template>
    <div class="payment-complete">
        <div class="payment-complete-header">
        <img src="@/assets/images/Checkcircle.png" alt="">
        <p style="font-size: 16px; color: #5D5D5D; margin-top: 10px">구매가 완료되었습니다.</p>
        </div>
        <div class="payment-complete-content">
        <div class="message">
            <h2>주방 이용권 (3시간)</h2>
            <h3>이용 만료 : {{ formattedExpirationTime }}</h3> <!-- 만료 시간 표시 -->
            <p>카카오톡으로 발송된 입장 QR코드를<br>도어 스캐너에 스캔해 주세요.</p>
        </div> 
        <div class="sub-message">
            <h2>상품 구매</h2>
            <h3 style="font-size: 12px; font-weight: 900;">카카오톡으로 상품 QR이 발송되었습니다.</h3>
            <p>자판기에 QR을 스캔하고 상품을 찾아가세요.</p>
        </div> 
        </div>
        <div class="payment-complete-footer">
          <button @click="handleConfirm" class="home-button">확인</button>
        </div>
        <!-- <router-link to="/home" class="home-button">확인</router-link> -->
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/CartStore';
import { computed } from "vue";

export default {
  setup() {
    const router = useRouter();
    const cartStore = useCartStore();
    
    // 만료 시간을 사용자 친화적으로 표시
    const formattedExpirationTime = computed(() => {
      if (!cartStore.expirationTime) return "없음";
      const date = new Date(cartStore.expirationTime);

      const twoDigits = (num) => String(num).padStart(2, "0");

      const year = String(date.getFullYear()).slice(2); // 두 자리 연도
      const month = twoDigits(date.getMonth() + 1); // 월은 0부터 시작하므로 +1
      const day = twoDigits(date.getDate());
      const hours = twoDigits(date.getHours());
      const minutes = twoDigits(date.getMinutes());
      const seconds = twoDigits(date.getSeconds());

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    });

    const handleConfirm = () => {
      cartStore.resetCart(); // 장바구니 데이터 초기화
      router.push({ path: '/' }); // HomeView로 이동
    };

    return {
      formattedExpirationTime,
      handleConfirm,
    };
  },
};
</script>

<style scoped>
.payment-complete {
  width: 375px;
  height: 637px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-sizing: border-box;
  border: 1px solid #ddd;
  margin: 0 auto;
}

.payment-complete-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  color: #4CAF50;
  margin-bottom: 30px;
}

.payment-complete-content {
  display: flex;
  flex-direction: column;  
  width: 335px;
  height: 194px;
  box-sizing: border-box;
  background-color: #FFF7EF;
  border-radius: 8px;
  padding: 20px;
}

.payment-complete-content h2 {
  font-size: 16px;
  font-weight: bold;
  color:#FF5E23;
  margin: 0;
  margin-bottom: 5px;
}

.payment-complete-content h3 {
  font-size: 14px;
  font-weight: bold;
  color:#5D5D5D;
  margin: 0;
  margin-bottom: 3px;
}

.payment-complete-content p {
  font-size: 12px;
  color:#5D5D5D;
  margin: 0;
}

.message {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.sub-message {
  font-size: 14px;
  color: #777;
}

.payment-complete-footer {
  display: flex;  
  width: 335px;
  height: 41px;  
  margin-top: 50px;
}

.home-button {
  flex: 1;  
  background-color: #FF5E23;
  color: white;
  padding: 10px 30px;
  border-radius: 25px;
  font-size: 16px;
  text-decoration: none;
  text-align: center;
  border: none;
  cursor: pointer;
}

.home-button:hover {
  background-color: #FF6F41;
}
</style>
