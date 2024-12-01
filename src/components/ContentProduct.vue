<template>
    <div class="content">
      <div
        v-for="(item, index) in filteredProducts"
        :key="index"
        class="product"
        @click="$emit('open-popup', item)"
      >
        <div class="product-image">
          <img :src="item.url" alt="상품 이미지" v-if="item.url" />
        </div>
        <p class="product-name">{{ item.name }}</p>
        <p class="product-price">{{ item.price.toLocaleString() }}원</p>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from "vue"; // computed를 vue로부터 가져옵니다.
  import { useTicketStore } from "@/store/ticketStore";
  
  export default {
    name: "ContentProduct",
    props: {
      type: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const store = useTicketStore();
  
      // `type` 값이 변경될 때 필터링된 데이터를 제공
      const filteredProducts = computed(() => store.filteredProducts(props.type));
  
      return {
        filteredProducts,
      };
    },
  };
  </script>
  
  <style scoped>
  .content {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
    box-sizing: border-box;
    row-gap: 0;
    overflow-y: auto;
  }
  .product {
    width: calc(33.333% - 10px);
    margin-bottom: 15px;
    text-align: center;
    height: 168px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .product:hover {
    transform: scale(1.05);
  }
  .product:active {
    transform: scale(1.05);
  }
  .product-image {
    height: 102px;
    background: white;
    margin-bottom: 5px;
    border-radius: 5px;
  }
  .product-image img {
    width: 100%; /* 이미지의 너비를 부모 요소에 맞춤 */
    height: 100%; /* 이미지의 높이를 부모 요소에 맞춤 */
    object-fit: cover; /* 부모 요소에 맞게 이미지를 잘라서 비율 유지 */
    object-position: center; /* 이미지를 중앙에 위치 */
    border-radius: 8px; /* 이미지도 모서리 둥글게 설정 */
  }
  .product-name {
    display: flex;
    font-size: 14px;
    color: #555;
    height: 40px;
    align-items: center;
    justify-content: center;
    margin: 0;
    margin-bottom: 5px;
  }
  .product-price {
    font-size: 15px;
    color: #000;
    margin-top: 0;
  }
  </style>
  