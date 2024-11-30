import { defineStore } from "pinia";

export const useCartStore = defineStore("cartStore", {
  state: () => ({
    ticketItems: [],  // 이용권 항목
    productItems: [], // 상품 항목
    expirationTime: null, // 이용 만료 시간
  }),
  getters: {
    // 상품 금액 합계
    totalProductAmount(state) {
      if (!state.productItems) return 0;
      // 상품 금액 합계
      let productTotal = state.ticketItems.reduce((sum, item) => sum + item.price * item.quantity, 0) + state.productItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // 주방 이용권 (3시간) 가격을 빼기
      const kitchenTicket = state.ticketItems.find(item => item.name === "주방 이용권 (3시간)");
      if (kitchenTicket) {
        productTotal -= kitchenTicket.price * kitchenTicket.quantity; // 주방 이용권 가격 제외
      }

      return productTotal;
    },

    // 10% 할인 금액
    discountAmount(state) {
      if (!state.ticketItems) return 0;
      const kitchenTicket = state.ticketItems.find(item => item.name === '주방 이용권 (3시간)');
      if (kitchenTicket) {
        return Math.floor(this.totalProductAmount * 0.1); // 10% 할인
      }
      return 0;
    },

    // 주방 이용권 금액
    ticketAmount(state) {
      if (!state.ticketItems) return 0;
      const kitchenTicket = state.ticketItems.find(item => item.name === '주방 이용권 (3시간)');
      return kitchenTicket ? kitchenTicket.price : 0;
    },

    // 최종 결제 금액
    paymentAmount(state) {
      return this.totalProductAmount - this.discountAmount + this.ticketAmount;
    },

    // 총 수량
    totalQuantity(state) {
      const totalTicketQuantity = state.ticketItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalProductQuantity = state.productItems.reduce((sum, item) => sum + item.quantity, 0);
      return totalTicketQuantity + totalProductQuantity;
    },

    // 고유한 이용권과 상품의 개수를 합산
    cartCount(state) {
      const uniqueTickets = state.ticketItems.length; // 이용권의 고유한 항목 개수
      const uniqueProducts = state.productItems.length; // 상품의 고유한 항목 개수
      return uniqueTickets + uniqueProducts; // 총 고유 항목 개수 반환
    },
  },
  actions: {
    // 장바구니에 이용권 추가 (동일한 이용권은 하나만 담기, 수량은 1로 고정)
    addTicketToCart(item) {
      const existingItem = this.ticketItems.find((i) => i.id === item.id);
      if (existingItem) {
        // 이미 담긴 이용권은 수량을 1로 고정
        return; // 아무 작업도 하지 않고 종료
      } else {
        // 이용권을 담을 때 수량을 1로 고정하여 추가
        this.ticketItems.push({
          ...item, // 기존 아이템의 정보를 그대로 복사
          quantity: 1, // 수량을 1로 고정
        });
      }
    },

    // 장바구니에 상품 추가
    addProductToCart(item) {
      const existingItem = this.productItems.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.productItems.push(item);
      }
    },

    // 장바구니에서 이용권 삭제
    removeTicketFromCart(id) {
      const index = this.ticketItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.ticketItems.splice(index, 1); // 해당 항목 삭제
      }
    },

    // 장바구니에서 상품 삭제
    removeProductFromCart(id) {
      const index = this.productItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.productItems.splice(index, 1); // 해당 항목 삭제
      }
    },

    // 기존 장바구니 데이터 초기화 메서드 추가
    resetCart() {
      this.ticketItems = [];
      this.productItems = [];
      this.expirationTime = null; // 만료 시간 초기화
    },

    // 결제 시 만료 시간 설정
    setExpirationTime() {
      const now = new Date();
      now.setHours(now.getHours() + 3); // 현재 시간에 3시간 추가
      this.expirationTime = now.toISOString(); // ISO 형식으로 저장
    },
  },
});
