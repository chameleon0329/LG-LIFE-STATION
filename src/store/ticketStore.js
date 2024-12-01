import { defineStore } from "pinia";

export const useTicketStore = defineStore("ticketStore", {
  state: () => ({
    kitchen: [
      { id: "kitchen", name: "주방 이용권 (3시간)", price: 3000, description: "광파오븐, 인덕션, 정수기 등 LG 가전을 이용하여 밀키트를 조리해보세요.", url: "@/assets/images/kitchen.png" },
    ],
    tickets: [
      { id: "ticket001", name: "세탁기 (1회)", price: 3000, description: "세탁기 1회 이용권입니다.", url: "@/assets/images/washingmachine.png" },
      { id: "ticket002", name: "건조기 (1회)", price: 5000, description: "건조기 1회 이용권입니다.", url: "@/assets/images/dryingmachine.png" },
      { id: "ticket003", name: "스타일러 (1회)", price: 5000, description: "스타일러 1회 이용권입니다.", url: "@/assets/images/styler.png" },
      { id: "ticket004", name: "슈케어 (1회)", price: 5000, description: "슈케어 1회 이용권입니다.", url: "@/assets/images/shoecare.png" },
    ],
    products: [
      { id: 1, name: "오즈치킨 철판감자탕볶음밥", type: "한식", price: 6700, description: "들깨 감자탕의 고소한 맛을 담은", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1657002195388l0.jpg" },
      { id: 2, name: "바르게 만든 한우 설렁탕", type: "한식", price: 3600, description: "아이가 먹어도 걱정없는 한우 설렁탕", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1572585621224l0.jpg" },
      { id: 3, name: "바르게 만든 한우 미역국", type: "한식", price: 3800, description: "국산 한우와 미역으로 부드럽게 끓인", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1572585567414l0.jpg" },
      { id: 4, name: "정통 순두부찌개 KIT", type: "한식", price: 3900, description: "물 없이도 5분이면 간편하게 완성", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1636437164709l0.jpg" },
      { id: 5, name: "얼큰 순두부찌개 KIT", type: "한식", price: 3900, description: "물 없이 완성하는 5분 찌개", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1636437291887l0.jpg" },
      { id: 7, name: "양배추케일쌈과 견과강된장", type: "한식", price: 4400, description: "담백하고 정갈한 한식 한 상", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/82f25919-8a6c-44d9-bea6-6e19cb9b3b4c.jpeg" },
      { id: 8, name: "IQF 버팔로윙", type: "한식", price: 5400, description: "매콤한 감칠맛이 쏙쏙", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/261bd176-6cdc-4837-940f-c4de1e8a2b23.jpg" },
      { id: 9, name: "아임뽀끼 컵 떡볶이 3종", type: "분식", price: 1900, description: "간편하게 즐기는 컵 떡볶이", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/4e0f4254-49c0-4501-9f2f-c32557d5bb2b.jpg" },
      { id: 10, name: "카레우동", type: "일식", price: 2300, description: "진한 풍미를 가진 일본식 카레 우동", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/aea217db-1429-48ba-b139-e103cb75656a.jpg" },
      { id: 11, name: "불닭 컵떡볶이 3종", type: "분식", price: 3500, description: "떡에 쏙 밴 화끈한 매운맛", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/f98f4f20-fcd1-4486-8eed-1d80edc34400.jpg" },
      { id: 12, name: "통등심 돈까스 2종", type: "분식", price: 5400, description: "에어프라이어로 더 바삭하게", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/86256ee3-da62-40f3-ad8e-3616fd182a6e.jpg" },
      { id: 13, name: "컵떡볶이 3종", type: "분식", price: 3500, description: "용기 그대로 조리하는 순대/어묵/치즈라볶이", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/65df4207-b52d-4e2f-b316-69b59d3763b7.jpg" },
      { id: 14, name: "밀누들 국물떡볶이", type: "분식", price: 1900, description: "오롯이 맛보는 탱글한 밀떡", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/3f2caa9b-6f24-4187-90a0-eab71499d264.jpg" },
      { id: 15, name: "쌀 국물떡볶이 2인분", type: "분식", price: 1900, description: "6가지 야채로 우려내 매콤달콤한 진한 국물", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/ab037e7b-2478-4033-98f6-a10bf798f8cf.jpg" },
      { id: 16, name: "대구식 납작만두 300g", type: "분식", price: 4100, description: "색다른 매력의 별미 만두", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1637301571627l0.jpg" },
      { id: 17, name: "쫀득한 떡구이 떡볶이 4종", type: "분식", price: 4500, description: "떡구이 속 부드러운 치즈 가득", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/8a82ce1b-1e58-4c1d-b8c1-8f9d17532468.jpg" },
      { id: 18, name: "오리지널 우동", type: "일식", price: 4700, description: "맑고 깊은 우동의 정석", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/682bfbd7-26cb-4e37-8a00-6aeacdd354f0.jpg?v=0531" },
      { id: 19, name: "목련 어묵 우동 3종", type: "일식", price: 5000, description: "탱글한 어묵이 담긴 우동 한 그릇", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/465278d1-bd3a-4616-b915-8bfcfb85ad8d.jpg" },
      { id: 20, name: "떡꼬치", type: "분식", price: 5000, description: "집에서 즐기는 추억의 맛", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/b24e977e-065f-4436-8de2-39c6e5d66793.jpg" },
      { id: 21, name: "육즙가득 그시절 물만두", type: "분식", price: 6500, description: "그때 그맛 그대로", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1621581567796l0.jpg" },
      { id: 22, name: "키츠네 유부우동", type: "일식", price: 5100, description: "짭조롬한 유부를 올린", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1652072424404l0.jpg" },
      { id: 23, name: "튀김 우동", type: "일식", price: 5400, description: "튀김을 푹 적셔 먹는", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1653035243279l0.jpeg" },
      { id: 24, name: "마제소바", type: "일식", price: 5000, description: "마지막 한 입까지 맛있게 즐기는 한 그릇", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/d5edcc1e-1c87-45e1-ab6c-d3ef3cb380ab.jpg" },
      { id: 25, name: "붓카케 냉우동", type: "일식", price: 5900, description: "자박하게 즐기는 시원한 우동", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1652072574453l0.jpg" },
      { id: 26, name: "우동 3종", type: "일식", price: 2900, description: "추억의 맛 그대로 완성", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/d8b442d7-eaf1-4a39-95b5-2fea4cc2c500.jpg" },
      { id: 27, name: "들깨 미역국", type: "한식", price: 3900, description: "완도산 건미역으로 끓인 들깨 미역국", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1651821251468l0.jpg?v=0418" },
      { id: 28, name: "대구식 납작만두 300g", type: "분식", price: 4100, description: "색다른 매력의 별미 만두", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1637301571627l0.jpg" },
      { id: 29, name: "국산콩 유부초밥", type: "한식", price: 3900, description: "국내산 콩으로 만들어 담백한 맛", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/da3c9565-c622-495a-bfc7-97af53c19d3f.jpg" },
      { id: 30, name: "양배추케일쌈과 견과강된장", type: "한식", price: 4400, description: "담백하고 정갈한 한식 한 상", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/82f25919-8a6c-44d9-bea6-6e19cb9b3b4c.jpeg" },
      { id: 31, name: "쫀득한 떡구이 떡볶이 4종", type: "분식", price: 4500, description: "떡구이 속 부드러운 치즈 가득", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/8a82ce1b-1e58-4c1d-b8c1-8f9d17532468.jpg" },
      { id: 32, name: "IQF 버팔로윙", type: "한식", price: 5400, description: "매콤한 감칠맛이 쏙쏙", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/261bd176-6cdc-4837-940f-c4de1e8a2b23.jpg" },
      { id: 33, name: "고소한 유부초밥", type: "한식", price: 4600, description: "고소한 감칠맛이 매력적인", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/88ebc81c-434f-4f26-8f95-2b373c08c7d0.jpeg" },
      { id: 34, name: "통편육 250g", type: "한식", price: 4700, description: "국내산 돈육으로 만든 통편육", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1648210443826l0.jpeg" },
      { id: 35, name: "떡꼬치", type: "분식", price: 5000, description: "집에서 즐기는 추억의 맛", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/b24e977e-065f-4436-8de2-39c6e5d66793.jpg" },
      { id: 36, name: "육즙가득 그시절 물만두", type: "분식", price: 6500, description: "그때 그맛 그대로", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1621581567796l0.jpg" },
      { id: 37, name: "진짜 부산 떡볶이 322g", type: "분식", price: 5100, description: "달짝지근한 부산식 떡볶이", url: "https://img-cf.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/shop/data/goods/1647244459401l0.jpg" },
      { id: 38, name: "일반 떡볶기", type: "분식", price: 5100, description: "달짝지근한 추억의 맛", url: "https://product-image.kurly.com/hdims/resize/%5E%3E360x%3E468/cropcenter/360x468/quality/85/src/product/image/6dab98d4-9c36-487b-90df-7c530c6511bc.jpg" },
      
      // 세탁용품 (조리 관련 속성은 추가하지 않음)
      { id: "product019", type: "세탁용품", name: "퍼실 딥클린 라벤더젤 (캡슐)", price: 500, url: "https://img.danawa.com/prod_img/500000/336/880/img/19880336_1.jpg?shrink=130:130&_v=20230421095415"},
      { id: "product020", type: "세탁용품", name: "리큐 얼룩제거 올인원 (캡슐)", price: 500, url: "https://img.danawa.com/prod_img/500000/333/309/img/7309333_1.jpg?shrink=130:130&_v=20240308101002"},
      { id: "product021", type: "세탁용품", name: "겔업 오리지날 (캡슐)", price: 500, url: "https://img.danawa.com/prod_img/500000/109/328/img/2328109_1.jpg?shrink=130:130&_v=20211214142211"},
      { id: "product022", type: "세탁용품", name: "다우니 초고농축 엑스퍼트 (캡슐)", price: 500, url: "https://img.danawa.com/prod_img/500000/288/633/img/11633288_1.jpg?shrink=130:130&_v=20240911161028"},
      { id: "product023", type: "세탁용품", name: "스너글 허거블 코튼 (캡슐)", price: 500, url: "https://img.danawa.com/prod_img/500000/491/186/img/12186491_1.jpg?shrink=130:130&_v=20230926130131"},
      { id: "product024", type: "세탁용품", name: "피죤 핑크로즈 (캡슐)", price: 500, url: "https://img.danawa.com/prod_img/500000/765/224/img/15224765_1.jpg?shrink=130:130&_v=20220513103054"},
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
