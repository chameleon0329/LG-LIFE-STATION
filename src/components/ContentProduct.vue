<template>
  <div class="content">
    <!-- 상품 아이템 렌더링 -->
    <div
      v-for="(item, index) in filteredProducts"
      :key="index"
      class="product"
      @click="$emit('open-popup', item)"
    >
      <div class="product-image">
        <img :src="item.laundrySuppliesUrl || item.mealKitUrl" alt="상품 이미지" />
      </div>
      <p class="product-name">
        {{ item.laundrySuppliesName || item.mealKitName }}
      </p>
      <p class="product-price">
        {{ (item.laundrySuppliesPrice || item.mealKitPrice).toLocaleString() }}원
      </p>
    </div>
    <!-- 데이터가 없을 때 메시지 표시 -->
    <p v-if="filteredProducts.length === 0" class="no-data">상품이 없습니다.</p>
  </div>
</template>  

<script>
import { useLaundrySuppliesStore } from "../store/LaundrySuppliesStore";
import { useMealKitStore } from "../store/MealKitStore";
import { onMounted, computed, watch } from "vue";

export default {
  name: "ContentProduct",
  props: {
    type: {
      type: String,
      required: true, 
    },
  },
  setup(props) {
    const mealKitStore = useMealKitStore();
    const laundrySuppliesStore = useLaundrySuppliesStore();

    const loadData = async () => {
      if (props.type === "세탁용품") {
        await laundrySuppliesStore.fetchLaundrySupplies();
      } else {
        await mealKitStore.fetchMealKits();
      }
    };

    // `props.type` 변경 시 데이터 새로 로드
    watch(() => props.type, async () => {
      await loadData();
    });

    // 초기 데이터 로드
    onMounted(loadData);

    // 필터링된 상품 리스트 반환
    const filteredProducts = computed(() => {
      if (props.type === "세탁용품") {
        // "세탁용품"인 경우 "세제"와 "섬유유연제" 모두 필터링
        return laundrySuppliesStore.laundrySupplies.filter(
          (item) =>
            item.laundrySuppliesClassification === "세제" ||
            item.laundrySuppliesClassification === "섬유유연제"
        );
      } else if (props.type === "한식" || props.type === "중식" || props.type === "양식") {
        return mealKitStore.mealKits.filter(
          (mealKit) => mealKit.mealKitClassification === props.type
        );
      }
      return [];
    });

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
  