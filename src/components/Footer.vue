<template>
    <footer>
        <div class="footer"></div>
        <h1>FOOTER</h1>
    </footer>
</template>

<script>
    export default {
        name: 'Footer',
    }
</script>

<style>
.footer {
    position: sticky;
    top: 0;
    z-index: 1000;
    height: 84px;
    background-color: white;
    margin-top: auto; /* footer를 #app의 맨 아래로 보냄 */
}
</style>