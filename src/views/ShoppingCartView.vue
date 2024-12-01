<template>
  <div class="app-container">
    <!-- 장바구니 헤더 -->
    <div class="cart-header">
      <div style="display: flex; align-items: center; color: #FFF7EF;">
        <img src="@/assets/images/shopping-cart2.png" alt="" style="width: 30px; height: 30px; margin-right: 8px;" />
        장바구니
      </div>
      <button @click="$router.push('/')" class="close-btn">닫기</button>
    </div>

    <!-- 장바구니 항목 -->
    <div class="cart-content">
      <p v-if="ticketItems.length === 0 && productItems.length === 0" class="empty-cart">장바구니에 담긴 상품이 없습니다.</p>

      <!-- 이용권 리스트 -->
      <div v-if="ticketItems.length > 0" class="cart-section">
        <h3 style="margin-top: 0;">이용권</h3>
        <div v-for="(item, index) in ticketItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <img :src="getImageUrl(item.url)" alt="" class="item-image" />
            <div>
              <p class="item-name">{{ item.name }}</p>
              <p class="item-quantity">수량: {{ item.quantity }}</p>
            </div>
          </div>
          <div class="item-sub-info">
            <button class="remove-item" @click="removeTicketFromCart(item.id)">X</button>
            <p class="item-price">{{ (item.price * item.quantity).toLocaleString() }}원</p>
          </div>
        </div>
      </div>

      <!-- 상품 리스트 -->
      <div v-if="productItems.length > 0" class="cart-section">
        <h3 style="margin-top: 0;">상품</h3>
        <div v-for="(item, index) in productItems" :key="item.id" class="cart-item">
          <div class="item-info">
            <img :src="getImageUrl(item.url)" alt="" class="item-image" />
            <div>
              <p class="item-name">{{ item.name }}</p>
              <p class="item-quantity">수량: {{ item.quantity }}</p>
            </div>
          </div>
          <div class="item-sub-info">
            <button class="remove-item" @click="removeProductFromCart(item.id)">X</button>
            <p class="item-price">{{ (item.price * item.quantity).toLocaleString() }}원</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 결제 정보 -->
    <div class="payment-information">
      <div class="cart-summary">
        <div class="summary-row">
          <span>총 금액 (주방 이용권 제외)</span>
          <span>{{ totalProductAmount.toLocaleString() }}원</span>
        </div>
        <div class="discount-row">
          <span style="padding-left: 10px;">└ 정기권 / 주방 이용 할인 (10%)</span>
          <span style="font-weight: bold;">－{{ discountAmount.toLocaleString() }}원</span>
        </div>
        <div class="ticket-row">
          <span>주방 이용권 금액</span>
          <span>{{ ticketAmount.toLocaleString() }}원</span>
        </div>
      </div>
      <div class="payment">
        <div class="summary-total">
          <span>총 {{ totalQuantity }}건 결제금액</span>
          <span>{{ paymentAmount.toLocaleString() }}원</span>
        </div>
        <router-link to="/paymentcomplete">
          <button @click="handlePayment" class="checkout-button" :disabled="ticketItems.length === 0 && productItems.length === 0">결제하기</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "vue-router";

export default {
  name: "ShoppingCartView",
  setup() {
    const cartStore = useCartStore();
    const router = useRouter();

    const handlePayment = () => {
      cartStore.setExpirationTime(); // 만료 시간 설정
      router.push({ path: '/paymentcomplete' }); // PaymentCompleteView로 이동
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
      ticketItems: cartStore.ticketItems,
      productItems: cartStore.productItems,
      totalProductAmount: computed(() => cartStore.totalProductAmount),
      discountAmount: computed(() => cartStore.discountAmount),
      ticketAmount: computed(() => cartStore.ticketAmount),
      totalQuantity: computed(() => cartStore.totalQuantity),
      paymentAmount: computed(() => cartStore.paymentAmount),
      removeTicketFromCart: cartStore.removeTicketFromCart,
      removeProductFromCart: cartStore.removeProductFromCart,
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
  