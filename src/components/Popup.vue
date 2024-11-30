<template>
    <div class="popup">
      <div class="popup-overlay" @click="closePopup"></div>
      <div class="popup-content">
        <h3 class="popup-title">{{ item.name }}</h3>
        <p class="popup-description">{{ item.description || "설명이 없습니다." }}</p>
        <div class="popup-image"></div>
        <p class="popup-stock">남은 재고: {{ item.stock || 0 }}</p>
  
        <div class="quantity-control">
          <button @click="decreaseQuantity" :disabled="quantity === 1">-</button>
          <span class="quantity">{{ quantity }}</span>
          <button @click="increaseQuantity" :disabled="quantity >= (item.stock || 1)">+</button>
        </div>
  
        <div class="popup-actions">
          <div class="cancel-button" @click="closePopup">취소</div>
          <button class="add-to-cart-button" @click="addToCart">장바구니 담기</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { useCartStore } from "@/store/cartStore";
  
  export default {
    name: "Popup",
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    emits: ["close"],
    setup(props, { emit }) {
      const cartStore = useCartStore();
      const quantity = ref(1);
  
      const increaseQuantity = () => {
        if (quantity.value < (props.item.stock || 1)) quantity.value++;
      };
  
      const decreaseQuantity = () => {
        if (quantity.value > 1) quantity.value--;
      };
  
      const addToCart = () => {
        const itemToAdd = { ...props.item, quantity: quantity.value };
        cartStore.addToCart(itemToAdd);
        emit("close");
      };
  
      const closePopup = () => {
        emit("close");
      };
  
      return {
        quantity,
        increaseQuantity,
        decreaseQuantity,
        addToCart,
        closePopup,
      };
    },
  };
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .popup-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .popup-content {
    width: 344px;
    height: 399px;
    background: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  .popup-title {
    font-size: 18px;
    font-weight: bold;
  }
  .popup-description {
    font-size: 14px;
    margin: 10px 0;
  }
  .popup-image {
    width: 140px;
    height: 140px;
    background: #ddd;
    margin: 20px 0;
  }
  .quantity-control {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .quantity {
    margin: 0 15px;
    font-size: 16px;
    font-weight: bold;
  }
  .popup-actions {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  .cancel-button {
    background: #ccc;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
  }
  .add-to-cart-button {
    background: #ff6f61;
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
  }
  </style>
  