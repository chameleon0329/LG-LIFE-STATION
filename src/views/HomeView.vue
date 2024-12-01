<template>
  <div id="app">
    <div class="app-container">
      <!-- 프로모션 -->
      <div>
          <p class="promotion">정기권 또는 주방 이용권 구매 시 장바구니 상품 10% 할인</p>
      </div>

      <!-- 메인 네비게이션 -->
      <nav class="main-nav">
        <button
          :class="{ active: currentMainTab === 'ticket' }"
          @click="switchMainTab('ticket')"
        >
          <p>이용권</p>
        </button>
        <button
          :class="{ active: currentMainTab === 'product' }"
          @click="switchMainTab('product')"
        >
          <p>상품</p>
        </button>
        <button class="cart">
          <router-link to="/shoppingcart" class="cart-btn">
            <img src="@/assets/images/shopping-cart.png" alt="" style="width: 30px; height: 30px;" />
          </router-link>
          <div v-if="cartCount > 0" class="cart-count">
            {{ cartCount > 9 ? '9+' : cartCount }}
          </div>
        </button>
      </nav>

      <!-- 서브 네비게이션 -->
      <nav class="sub-nav">
        <button
          v-for="(tab, index) in subTabs"
          :key="index"
          :class="{ active: currentSubTab === index }"
          @click="switchSubTab(index)"
        >
          <p>{{ tab }}</p>
        </button>
      </nav>

      <!-- Content -->
      <component
        :is="currentComponent"
        :type="currentSubTabType"
        @open-popup="openModal"
      ></component>

      <!-- Modal -->
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal">
          <h3 class="modal-title">{{ selectedItem.name }}</h3>
          <p class="modal-description">
            {{ selectedItem.description || '상품 설명이 없습니다.' }}
          </p>
          <div class="modal-image">
            <img :src="getImageUrl(selectedItem.url)" alt="상품 이미지" v-if="selectedItem.url" />
          </div>

          <div v-if="['한식', '분식', '일식', '세탁용품'].includes(selectedItem.type)" class="quantity-control">
            <button @click="decreaseQuantity" :disabled="quantity === 1">-</button>
            <span class="quantity">{{ quantity }}</span>
            <button @click="increaseQuantity" :disabled="quantity >= 9">+</button> <!-- 최대 수량 9 -->
          </div>

          <div class="modal-actions">
            <button class="cancel-button" @click="closeModal">취소</button>
            <button class="add-to-cart-button" @click="addToCart">장바구니 담기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useCartStore } from "@/store/cartStore";
import ContentProduct from "@/components/ContentProduct.vue";
import ContentSeason from "@/components/ContentSeason.vue";
import ContentTicket from "@/components/ContentTicket.vue";

export default {
  name: "HomeView",
  components: {
    ContentProduct,
    ContentSeason,
    ContentTicket,
  },
  setup() {
    const cartStore = useCartStore();

    const getImageUrl = (url) => {
      if (url.startsWith("@/assets")) {
        // Webpack/Vite가 인식 가능한 경로로 변환
        return new URL(`../${url.split("@/")[1]}`, import.meta.url).href;
      }
      return url; // 외부 URL은 그대로 반환
    };

    return {
      cartCount: computed(() => cartStore.cartCount), // 총 수량 계산
      addToCart: cartStore.addTicketToCart, // 이용권 추가
      addProductToCart: cartStore.addProductToCart, // 상품 추가
      getImageUrl,
    };
  },
  data() {
    return {
      currentMainTab: "ticket",
      currentSubTab: 0,
      ticketSubTabs: ["1회 이용권", "정기권 전용"],
      productSubTabs: ["한식", "분식", "일식", "세탁용품"],
      showModal: false,
      selectedItem: null,
      quantity: 1, // 초기 수량
    };
  },
  computed: {
    subTabs() {
      return this.currentMainTab === "ticket"
        ? this.ticketSubTabs
        : this.productSubTabs;
    },
    currentComponent() {
      if (this.currentMainTab === "ticket") {
        return this.currentSubTab === 0 ? "ContentTicket" : "ContentSeason";
      }
      return "ContentProduct";
    },
    currentSubTabType() {
      return this.currentMainTab === "product"
        ? this.productSubTabs[this.currentSubTab]
        : null;
    },
  },
  methods: {
    switchMainTab(tab) {
      this.currentMainTab = tab;
      this.currentSubTab = 0;
    },
    switchSubTab(index) {
      this.currentSubTab = index;
    },
    openModal(item) {
      this.selectedItem = item;
      this.showModal = true;
      this.quantity = 1;
    },
    closeModal() {
      this.showModal = false;
      this.selectedItem = null;
    },
    increaseQuantity() {
      if (this.quantity < 9) {
        this.quantity++;
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    addToCart() {
      const itemToAdd = {
        id: this.selectedItem.id, // 유니크 ID 필요
        name: this.selectedItem.name,
        price: this.selectedItem.price,
        quantity: this.quantity,
        url: this.selectedItem.url || null, // url 추가
      };

      if (this.currentMainTab === "ticket") {
        this.addToCart(itemToAdd); // 이용권은 addTicketToCart로 추가
      } else if (this.currentMainTab === "product") {
        this.addProductToCart(itemToAdd); // 상품은 addProductToCart로 추가
      }

      this.closeModal();
    },
  },
};
</script>

<style scoped>
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f8f8f8;
}
.app-container {
    width: 375px;
    height: 637px;
    margin: 0 auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    /* overflow-y: hidden; */
    /* scrollbar-gutter: stable; */
}
.promotion {
    display: block;
    font-size: 11px;
    height: 28px;
    box-sizing: border-box;
    text-align: center;
    color: #5D5D5D;
    margin: 0;
    padding-top: 5px;
}

/* Main Navigation */
.main-nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0px 10px 0px;
  border-bottom: 1px solid #ddd;
  position: relative;
  height: 57px;
  box-sizing: border-box;
}

.main-nav button {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  font-size: 16px;
  width: 100px;
  height: 57px;
  margin: 0;
}

.main-nav button.active {
  font-weight: bold;
  color: #ff6f61;
  border-bottom: 2px solid #FF5E23;
}

.main-nav p {
  margin: 0;
  transition: all 0.3s ease;
}

.main-nav p:hover {
  transform: scale(1.1);
}


/* Sub Navigation */
.sub-nav {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  position: relative;
  /* height: 57px; */
  box-sizing: border-box;
}

.sub-nav button {
  flex: 1;
  text-align: center;
  background: none;
  border: none;
  padding: 5px 0;
  cursor: pointer;
  color: #555;
  font-size: 14px;
  margin: 0;
}

.sub-nav button.active {
  font-weight: bold;
  color: #ff6f61;
}

.sub-nav p {
  margin: 0;
  transition: all 0.3s ease;
}

.sub-nav p:hover {
  transform: scale(1.1);
}

/* Content */
.content {
  display: flex;
  flex-wrap: wrap;
  column-gap: 15px;
  padding: 15px;
  overflow-y: auto;
  /* height: calc(637px - 28px - 57px - 57px);  */
  /* promotion + main-nav + sub-nav 높이 빼기 -> flex-wrap 요소 간 세로 방향 gap 고정 해제  */
  box-sizing: border-box;
  row-gap: 10px;
}

/* 모달 스타일 추가 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  display: flex;
  flex-direction: column;
  width: 344px;
  height: 399px;
  box-sizing: border-box;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.modal-title {
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 10px;
}
.modal-description {
  height: 50px;
  font-size: 14px;
  margin: 0 auto;
  padding: 6px
}
.modal-image {
  width: 172px; /* Modal 이미지의 너비 */
  height: 172px; /* Modal 이미지의 높이 */
  border-radius: 8px; /* 둥근 모서리 설정 */
  margin: 0 auto 16px; /* 중앙 정렬 및 아래쪽 여백 */
  display: flex; /* 이미지 정렬을 위한 Flexbox 사용 */
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  overflow: hidden; /* 이미지가 영역을 벗어나지 않도록 설정 */
  background: #f4f4f4; /* 이미지가 로드되지 않을 경우 배경색 */
}

.modal-image img {
  width: 100%; /* 이미지의 너비를 부모 요소에 맞춤 */
  height: 100%; /* 이미지의 높이를 부모 요소에 맞춤 */
  object-fit: cover; /* 부모 요소에 맞게 이미지를 잘라서 비율 유지 */
  object-position: center; /* 이미지를 중앙에 위치 */
  border-radius: 8px; /* 이미지도 모서리 둥글게 설정 */
}
.quantity-control {
  display: flex;
  justify-content: center;
  align-items: center;
}
.quantity {
  margin: 0 15px;
  font-size: 16px;
  color: #5D5D5D;
  /* font-weight: bold; */
}
.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
.cancel-button {
  width: 147px;
  height: 40px;
  background-color: #ececec;
  border: none;
  padding: 10px 20px;
  border-radius: 100px;
  color: #5D5D5D;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
}
.cancel-button:hover {
  transform: scale(1.05);
}
.cancel-button:active {
  background-color: #ddd;
}
.add-to-cart-button {
  width: 147px;
  height: 40px;
  background: #FF5E23;
  border-color: #FFFFFF;
  padding: 10px 20px;
  border-radius: 100px;
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
.add-to-cart-button:hover{
  transform: scale(1.05);
}
.add-to-cart-button:active {
  background-color: #FF6F41;
}
.cart {
  display: flex;
  /* position: relative; */
  /* padding: 13.5px; */
  /* padding-left: 50px; */
  justify-content: center;
}
.cart-btn {
  position: absolute;
  width: 30px;
  height: 30px;
  transition: all 0.3s ease;
}
.cart-btn:hover {
  transform: scale(1.1);
}
.cart-count {
  /* position: absolute; */
  top: -5px;
  right: -5px;
  color: #ff6f61;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding-left: 60px;
  padding-top: 5px;
}
</style>
