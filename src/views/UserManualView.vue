<template>
    <div id="app">
      <div class="app-container">
        <div style="margin: 14px;"></div>
        <!-- 네비게이션 바 -->
        <div class="navbar">
          <button
            v-for="(item, index) in navItems"
            :key="index"
            class="nav-item"
            :class="{ active: currentTab === index }"
            @click="currentTab = index"
          >
            {{ item }}
          </button>
        </div>
    
        <!-- 콘텐츠 영역 -->
        <div class="information">
          <div v-if="currentTab === 0" >
            <img src="@/assets/images/주방 이용안내.png" alt="">
          </div>
          <!-- 다른 탭 콘텐츠는 필요에 따라 추가 -->
          <div v-if="currentTab === 1">
            <img src="@/assets/images/클리닝 가전 이용안내.png" alt="">
          </div>
          <div v-if="currentTab === 2">
            <img src="@/assets/images/상품 이용안내.png" alt="">
          </div>
          <div v-if="currentTab === 3">
            <img src="@/assets/images/정기권 이용안내.png" alt="">
           </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShoopingCart',
    data() {
      return {
        navItems: ["주방 이용", "클리닝 룸", "상품 구매", "정기권"],
        currentTab: 0, // 현재 활성화된 탭 인덱스
      };
    },
  };
  </script>
  
  <style scoped>
  /* 전체 레이아웃 스타일 */
  body{
    margin: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f8f8f8;
  }

  .app-container {
    width: 375px;
    height: 637px;
    margin: 0 auto;
    background-color: white;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
  }

  .promotion {
    display: block;
    height: 28px;
  }

  /* 탭 네비게이션 */
  .navbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ddd;
    position: relative;
    height: 57px;
    box-sizing: border-box;
  }
  
  .nav-item {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    background: none;
    border: none;
    cursor: pointer;
    color: #555;
    font-size: 16px;
    width: 100px;
    height: 57px;
    box-sizing: border-box;
  }
  
  .nav-item.active {
    font-weight: bold;
    color: #f06a24;
    border-bottom: 2px solid #f06a24;
  }
  </style>
  