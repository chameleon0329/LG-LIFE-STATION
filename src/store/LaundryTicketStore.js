import { defineStore } from "pinia";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8082',
  // baseURL: 'http://10.0.2.2:8082',
  baseURL: 'http://192.168.0.89:8082',
  timeout: 5000, // 요청 제한 시간 설정
});

export const useLaundryTicketStore = defineStore("laundryTicketStore", {
  state: () => ({
    laundryTickets: [], // 세탁권 데이터
    laundryTicket: null
  }),
  getters: {
    MultiLaundryTicket: (state) => state.laundryTickets,
    SingleLaundryTicket: (state) => state.laundryTicket
  },
  actions: {
    async fetchLaundryTickets() {
      try {
        const response = await axiosInstance.get(`/laundryTicket/get/all`);
        this.laundryTickets = response.data;
      } catch (error) {
        console.error("Failed to fetch laundry tickets:", error);
      }
    },
  },
});
