import { defineStore } from "pinia";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8082', // localhost
  // baseURL: 'http://10.0.2.2:8082', // 안드로이드
  baseURL: 'http://192.168.0.89:8082',
  timeout: 5000, // 요청 제한 시간 설정
});

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

    // Meal Kit ID와 수량
    mealKitQuantities(state) {
      return state.productItems.reduce((result, item) => {
        if (item.category === "meal_kit") {
          result[item.id] = item.quantity;
        }
        return result;
      }, {});
    },

    // 세탁 용품 ID와 수량
    laundrySuppliesQuantities(state) {
      return state.productItems.reduce((result, item) => {
        if (item.category === "laundry_supplies") {
          result[item.id] = item.quantity;
        }
        return result;
      }, {});
    },
    // 세탁권 ID와 사용 여부
    laundryTicketUsage(state) {
      return state.ticketItems.reduce((result, item) => {
        result[item.id] = item.isUsed || false;
        return result;
      }, {});
    },
    // 가전 ID와 사용 여부
    homeAppliancesUsage(state) {
      return state.ticketItems.reduce((result, item) => {
        result[item.id] = item.isUsed || false;
        return result;
      }, {});
    },

    // 데이터 변환
    cartPayload(state) {
      // 공간 이용 여부 (ID가 5인 항목이 있으면 true)
      const spaceIsUsed = state.ticketItems.some(item => item.id === 5);
    
      // 세탁권 사용 여부
      const laundryTicketUsage = state.ticketItems.reduce((map, item) => {
        map[item.id] = item.category === 'laundry_ticket' && item.quantity > 0;
        return map;
      }, {});
    
      // 가전 사용 여부
      const homeAppliancesUsage = state.ticketItems.reduce((map, item) => {
        map[item.id] = item.category === 'home_appliance' && item.quantity > 0;
        return map;
      }, {});
    
      return {
        userId: 3816344641, // 사용자 ID
        storeId: 1, // 스토어 ID
        spaceIsUsed, // 공간 사용 여부
        totalPrice: state.totalProductAmount - state.discountAmount + state.ticketAmount, // 총 결제 금액
        mealKitQuantities: state.productItems
          .filter(item => item.category === "meal_kit")
          .reduce((map, item) => {
            map[item.id] = item.quantity;
            return map;
          }, {}),
        laundrySuppliesQuantities: state.productItems
          .filter(item => item.category === "laundry_supplies")
          .reduce((map, item) => {
            map[item.id] = item.quantity;
            return map;
          }, {}),
        laundryTicketUsage,
        homeAppliancesUsage,
      };
    },
    
  },
  actions: {
    async postOrder() {
      try {
        const payload = this.cartPayload;
        console.log("서버로 전송할 payload:", payload); // 디버깅용 로그
        const response = await axiosInstance.post("/shopCart/buy", payload);
        console.log("주문 성공:", response.data);
        this.resetCart(); // 성공 후 장바구니 초기화
      } catch (error) {
        console.error("주문 실패:", error.response?.data || error.message);
      }
    },
    
    
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
      if (!item || !item.id) {
        console.error("유효하지 않은 상품 데이터:", item);
        return;
      }
    
      // classification 값에 따라 category 매핑
      let category;
      if (item.classification) {
        if (["한식", "양식", "중식"].includes(item.classification)) {
          category = "meal_kit";
        } else if (["세제", "섬유유연제"].includes(item.classification)) {
          category = "laundry_supplies";
        } else {
          category = "general"; // 기본값
        }
      } else {
        category = "general"; // classification이 없으면 기본값
      }
    
      // 동일한 상품이 이미 있는지 확인
      const existingItem = this.productItems.find((i) => i.id === item.id);
    
      if (existingItem) {
        // 수량 업데이트
        existingItem.quantity += item.quantity || 1;
        console.log(`기존 상품 업데이트됨: ${existingItem.name}, 새 수량: ${existingItem.quantity}`);
      } else {
        // 새로운 상품 추가
        const newItem = {
          id: item.id,
          name: item.name || "이름 없음",
          price: item.price || 0,
          quantity: item.quantity || 1,
          category, // 매핑된 category
          url: item.url || "https://via.placeholder.com/150", // 기본 이미지 URL
        };
    
        this.productItems.push(newItem);
        console.log("새 상품 추가됨:", newItem);
      }
    
      // 현재 상태 출력
      console.log("현재 productItems 상태:", this.productItems);
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
