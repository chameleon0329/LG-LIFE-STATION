<template>
    <div class="login-page">
      <h1>로그인 페이지</h1>
      <button @click="navigate('/Home')">구독자</button>
      <button @click="navigate('/Home')">미구독자</button>
      <!-- <button @click="navigate('/UserManual')">이용 안내</button> -->
    </div>
  </template>
  
  <script>
  export default {
    name: "LoginPage",
    methods: {
      navigate(route) {
        this.$router.push(route); // Vue Router의 push 메서드로 경로 이동
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 50px;
  }
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  