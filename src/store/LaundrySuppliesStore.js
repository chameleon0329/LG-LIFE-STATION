import { defineStore } from "pinia";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8082',
  // baseURL: 'http://10.0.2.2:8082',
  baseURL: 'http://192.168.0.89:8082',
  timeout: 5000, // 요청 제한 시간 설정
});

export const useLaundrySuppliesStore = defineStore("laundrySupplies", {
  state: () => ({
    laundrySupplies: [],
    laundrySupply: null 
  }),
  getters: {
    MultiLaundrySupply: (state) => state.laundrySupplies,
    SingleLaundrySupply: (state) => state.laundrySupply
  },
  actions: {
    async fetchLaundrySupplies() {
      try {
        const response = await axiosInstance.get(`/laundrySupplies/get/all`);
        this.laundrySupplies = response.data;
      } catch (error) {
        console.error("Failed to fetch laundry supplies:", error);
      }
    },

    async fetchLaundrySuppliesDetail(laundrySuppliesId, storeId = 1) {
      try {
        const response = await axiosInstance.get(
          `/laundrySupplies/get/one/laundrySuppliesId`,
          { params: { laundrySuppliesId, storeId } }
        );
        this.laundrySupply = response.data; // 상세 데이터 저장
      } catch (error) {
        console.error("Failed to fetch laundry supplies detail:", error);
      }
    },
  },
});
