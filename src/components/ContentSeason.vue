<template>
  <div class="content">
    <div
      v-for="item in seasons"
      :key="item.id"
      class="ticket"
      @click="$emit('open-popup', item)"
    >
      <div class="ticket-image"></div>
      <p class="ticket-name">{{ item.name }}</p>
      <p class="ticket-price">{{ item.price.toLocaleString() }}원</p>
    </div>
  </div>
</template>

<script>
import { useTicketStore } from "@/store/ticketStore";

export default {
  name: "ContentSeason",
  setup() {
    const store = useTicketStore();
    
    return {
      seasons: store.seasons, // 정기권 데이터 가져오기
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
.ticket-image {
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
