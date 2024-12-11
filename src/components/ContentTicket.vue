<template>
  <div class="content">
    <div
      v-for="(item, index) in allTickets"
      :key="index"
      class="ticket"
      @click="$emit('open-popup', item)"
    >
      <div class="ticket-image">
        <img :src="getImageUrl(item.url)" alt="상품 이미지" v-if="item.url" />
      </div>
      <p class="ticket-name">{{ item.name }}</p>
      <p class="ticket-price">{{ item.price.toLocaleString() }}원</p>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useLaundryTicketStore } from "../store/LaundryTicketStore";

export default {
  name: "ContentTicket",
  setup() {
    const laundryTicketStore = useLaundryTicketStore();

    // 세탁권 데이터 매핑
    const allTickets = computed(() =>
      laundryTicketStore.laundryTickets.map((ticket) => ({
        id: ticket.laundryTicketId,
        name: ticket.laundryTicketName, // 세탁권 이름
        price: ticket.laundryTicketPrice, // 세탁권 가격
        description: ticket.laundryTicketClassification || "설명이 없습니다.", // 기본 설명
        url: ticket.laundryTicketUrl || "@/assets/images/default-ticket.png", // 기본 이미지 사용
      }))
    );

    // 이미지 URL 변환 함수
    const getImageUrl = (url) => {
      if (url.startsWith("@/assets")) {
        return new URL(`../${url.split("@/")[1]}`, import.meta.url).href;
      }
      return url;
    };

    // 세탁권 데이터 가져오기
    onMounted(async () => {
      await laundryTicketStore.fetchLaundryTickets();
    });

    return {
      allTickets,
      getImageUrl,
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
.ticket {
  width: calc(33.333% - 10px);
  margin-bottom: 15px;
  text-align: center;
  height: 168px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;
}
.ticket:hover {
  transform: scale(1.05);
}
.ticket:active {
  transform: scale(1.05);
}
.ticket-image img {
  max-width: 100%;
  max-height: 100%;
  height: 102px;
  background: #ddd;
  margin-bottom: 5px;
  border-radius: 5px;
}
.ticket-name {
  display: flex;
  font-size: 14px;
  color: #555;
  height: 40px;
  align-items: center;
  justify-content: center;
  margin: 0;
  margin-bottom: 5px;
}
.ticket-price {
  font-size: 15px;
  color: #000;
  margin-top: 0;
}
</style>
