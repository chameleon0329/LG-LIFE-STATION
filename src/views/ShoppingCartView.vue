<template>
  <div class="app-container">
    <div class="cart-header">
      <div style="display: flex; align-items: center; color: #FFF7EF;">
        <img src="@/assets/images/shopping-cart2.png" alt="cart" style="width: 30px; height: 30px; margin-right: 8px;" />
        장바구니
      </div>
      <button @click="$router.push('/')" class="close-btn">닫기</button>
    </div>

    <div class="cart-content">
      <p v-if="cartStore.cartCount === 0" class="empty-cart">장바구니에 담긴 상품이 없습니다.</p>

      <div v-if="cartStore.ticketItems.length > 0" class="cart-section">
        <h3>이용권</h3>
        <div v-for="item in cartStore.ticketItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <img :src="getImageUrl(item.url)" alt="ticket" class="item-image" />
            <div>
              <p class="item-name">{{ item.name }}</p>
              <p class="item-quantity">수량: {{ item.quantity }}</p>
            </div>
          </div>
          <div class="item-sub-info">
            <button @click="cartStore.removeTicketFromCart(item.id)">X</button>
            <p class="item-price">{{ (item.price * item.quantity).toLocaleString() }}원</p>
          </div>
        </div>
      </div>

      <div v-if="cartStore.productItems.length > 0" class="cart-section">
        <h3>상품</h3>
        <div v-for="item in cartStore.productItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <img :src="getImageUrl(item.url)" alt="product" class="item-image" />
            <div>
              <p class="item-name">{{ item.name }}</p>
              <p class="item-quantity">수량: {{ item.quantity }}</p>
            </div>
          </div>
          <div class="item-sub-info">
            <button @click="cartStore.removeProductFromCart(item.id)">X</button>
            <p class="item-price">{{ (item.price * item.quantity).toLocaleString() }}원</p>
          </div>
        </div>
      </div>
    </div>

    <div class="payment-information">
      <div class="cart-summary">
        <div class="summary-row">
          <span>총 금액</span>
          <span>{{ cartStore.totalProductAmount.toLocaleString() }}원</span>
        </div>
        <div class="discount-row">
          <span>할인 금액</span>
          <span>－{{ cartStore.discountAmount.toLocaleString() }}원</span>
        </div>
        <div class="ticket-row">
          <span>이용권 금액</span>
          <span>{{ cartStore.ticketAmount.toLocaleString() }}원</span>
        </div>
      </div>
      <div class="payment">
        <div class="summary-total">
          <span>총 결제금액</span>
          <span>{{ cartStore.paymentAmount.toLocaleString() }}원</span>
        </div>
        <button @click="handlePayment" class="checkout-button" :disabled="cartStore.cartCount === 0">결제하기</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useCartStore } from "@/store/CartStore";
import { useRouter } from "vue-router";

export default {
  name: "ShoppingCartView",
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();

    const handlePayment = async () => {
      try {
        await cartStore.postOrder(); // 서버로 주문 데이터를 전송
        cartStore.setExpirationTime(); // 만료 시간 설정
        router.push({ path: '/paymentcomplete' }); // PaymentCompleteView로 이동
      } catch (error) {
        console.error("결제 중 오류 발생:", error);
        alert("결제에 실패했습니다. 다시 시도해주세요.");
      }
    };

    const getImageUrl = (url) => {
      if (!url) {
        return "https://via.placeholder.com/50"; // 기본 이미지 URL
      }
      if (url.startsWith("@/assets")) {
        try {
          // Webpack 또는 Vite의 자산 경로를 변환
          return new URL(`../${url.split("@/")[1]}`, import.meta.url).href;
        } catch (error) {
          console.error("이미지 URL 변환 오류:", error);
          return "https://via.placeholder.com/50"; // 오류 시 기본 이미지 반환
        }
      }
      return url; // 외부 URL은 그대로 반환
    };
    
    return {
      handlePayment,
      getImageUrl,
      cartStore, // 전체 Store를 반환해 템플릿에서 사용
    };
  },
};
</script>

<style scoped>
.app-container {
  width: 375px;
  height: 637px;
  margin: 0 auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
}
.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #FF5E23;
  color: white;
  font-size: 16px;
  height: 50px;
  box-sizing: border-box;
}
.close-btn {
  background-color: #FF5E23; 
  border: none; 
  color: #FFF7EF;
  transition: all 0.3s ease;
  border-radius: 6px;
}
.close-btn:hover {
  transform: scale(1.1);
  /* background-color: #c7c7c7; */
}
.cart-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  border-bottom: 1px solid #f0f0f0;
}
.empty-cart {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: #999;
  font-size: 14px;
}
.cart-section{
  margin-bottom: 16px;
}
.cart-section h3 {
  font-size: 16px;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 68px;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
}
.item-info {
  display: flex;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
}
.item-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
}
.item-name {
  font-size: 16px;
  color: #333;
  margin: 0;
  margin-bottom: 10px;
}
.item-quantity {
  font-size: 12px;
  color: #777;
  margin: 0;
}
.item-sub-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50px;
  box-sizing: border-box;
}
.item-price {
  font-size: 14px;
  color: #555;
  margin: 0;
}
.remove-item {
  text-align: right;
  background: none;
  border: none;
  color: #777;
  cursor: pointer;
}
.payment-information {
  height: 231px;
}
.cart-summary {
  height: 90px;
  padding: 8px 10px 8px 10px;
  background-color: #FFF7EF;
  border-top: 1px solid #f0f0f0;
  border-radius: 8px;
  margin: 15px;
  box-sizing: border-box;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #5D5D5D;
}
.discount-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #FF5E23;
}
.ticket-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #5D5D5D;
}
.payment {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 111px;
  box-sizing: border-box;
  padding: 15px;
}
.summary-total {
  display: flex;
  justify-content: space-between;
  width: 335px;
  font-size: 16px;
  font-weight: bold;
  color: #FF5E23;
}
.checkout-button {
  width: 335px;
  height: 40px;
  background-color: #FF5E23;
  color: #FFF7EF;
  font-size: 16px;
  /* font-weight: bold; */
  border: none;
  border-radius: 100px;
  cursor: pointer;
  margin-bottom: 5px;
}
.checkout-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
  