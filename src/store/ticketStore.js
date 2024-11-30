import { defineStore } from "pinia";

export const useTicketStore = defineStore("ticketStore", {
  state: () => ({
    kitchen: [
      { id: "kitchen", name: "주방 이용권 (3시간)", price: 3000 },
    ],
    tickets: [
      { id: "ticket001", name: "세탁기 (1회)", price: 3000 },
      { id: "ticket002", name: "건조기 (1회)", price: 5000 },
      { id: "ticket003", name: "스타일러 (1회)", price: 5000 },
      { id: "ticket004", name: "슈케어 (1회)", price: 5000 },
    ],
    products: [
      // 한식
      { id: "product001", type: "한식", name: "고깃집 된장찌개", price: 4400, method: "인덕션", cookingTime: 15 },
      { id: "product002", type: "한식", name: "신의주 얼큰순대국", price: 5400, method: "인덕션", cookingTime: 10 },
      { id: "product003", type: "한식", name: "밀리터리 부대찌개", price: 3200, method: "인덕션", cookingTime: 20 },
      { id: "product004", type: "한식", name: "황기품은 순살족발", price: 7800, method: "광파오븐", cookingTime: 25 },
      { id: "product005", type: "한식", name: "홍익쭈꾸미", price: 4800, method: "인덕션", cookingTime: 15 },
      { id: "product006", type: "한식", name: "우삼겹 순두부찌개", price: 3900, method: "인덕션", cookingTime: 15 },
    
      // 양식
      { id: "product007", type: "양식", name: "머쉬룸 크림 파스타", price: 3000, method: "인덕션", cookingTime: 15 },
      { id: "product008", type: "양식", name: "바질 토마토 파스타", price: 7000, method: "인덕션", cookingTime: 15 },
      { id: "product009", type: "양식", name: "미트볼 라구 파스타", price: 3600, method: "광파오븐", cookingTime: 25 },
      { id: "product010", type: "양식", name: "치즈피자", price: 4600, method: "광파오븐", cookingTime: 20 },
      { id: "product011", type: "양식", name: "고르곤졸라 피자", price: 5900, method: "광파오븐", cookingTime: 20 },
      { id: "product012", type: "양식", name: "불고기피자", price: 4800, method: "광파오븐", cookingTime: 20 },
    
      // 중식
      { id: "product013", type: "중식", name: "삼선짬뽕", price: 6700, method: "인덕션", cookingTime: 20 },
      { id: "product014", type: "중식", name: "마라탕", price: 7100, method: "인덕션", cookingTime: 25 },
      { id: "product015", type: "중식", name: "찹쌀 탕수육", price: 9100, method: "광파오븐", cookingTime: 30 },
      { id: "product016", type: "중식", name: "동파육", price: 7900, method: "광파오븐", cookingTime: 40 },
      { id: "product017", type: "중식", name: "짜장면", price: 3500, method: "인덕션", cookingTime: 10 },
      { id: "product018", type: "중식", name: "멘보샤", price: 7600, method: "광파오븐", cookingTime: 20 },
    
      // 세탁용품 (조리 관련 속성은 추가하지 않음)
      { id: "product019", type: "세탁용품", name: "퍼실 딥클린 라벤더젤", price: 500 },
      { id: "product020", type: "세탁용품", name: "리큐 얼룩제거 올인원", price: 500 },
      { id: "product021", type: "세탁용품", name: "겔업 오리지날", price: 500 },
      { id: "product022", type: "세탁용품", name: "다우니 초고농축 엑스퍼트", price: 500 },
      { id: "product023", type: "세탁용품", name: "스너글 허거블 코튼", price: 500 },
      { id: "product024", type: "세탁용품", name: "피죤 핑크로즈", price: 500 },
    ]    
  }),
  getters: {
    // filteredProducts: 특정 유형의 상품만 필터링하여 반환
    filteredProducts: (state) => (type) =>
      state.products.filter((product) => product.type === type),

    // seasons: kitchen과 tickets 리스트를 결합하고 price를 0으로 설정하여 반환
    seasons: (state) => {
      const allTickets = [...state.kitchen, ...state.tickets];  // kitchen과 tickets 리스트 합침
      return allTickets.map(item => ({
        ...item,        // 기존 아이템을 그대로 복사
        price: 0,       // price 값을 0으로 변경
      }));
    },
  },
});
