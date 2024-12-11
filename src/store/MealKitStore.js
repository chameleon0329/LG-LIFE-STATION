import { defineStore } from "pinia";
import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:8082',
  // baseURL: 'http://10.0.2.2:8082',
  baseURL: 'http://192.168.0.89:8082',
  timeout: 5000, // 요청 제한 시간 설정
});

export const useMealKitStore = defineStore("mealKitStore", {
  state: () => ({
    mealKits: [], // 서버에서 받아올 밀키트 데이터
    mealKit: null
  }),
  getters: {
    MultiMealKit: (state) => state.mealKits,
    SingleMealKit: (state) => state.mealKit
  },
  actions: {
    async fetchMealKits() {
      try {
        const response = await axiosInstance.get("/mealKit/get/all"); // API 엔드포인트
        this.mealKits = response.data; // 서버에서 받은 데이터 저장
      } catch (error) {
        console.error("Failed to fetch meal kits:", error);
      }
    },

    async fetchMealKitDetail(mealKitId, storeId = 1) {
      try {
        const response = await axiosInstance.get(
          `/mealKit/get/one/mealKitId`,
          { params: { mealKitId, storeId } }
        );
        this.mealKit = response.data; // 상세 데이터 저장
      } catch (error) {
        console.error("Failed to fetch meal kit detail:", error);
      }
    },
  },
});
