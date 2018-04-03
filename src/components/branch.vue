<template>
  <div class="haila-branch">
    <div class="container">
      <a href="/">海拉</a>
      <span>/</span>
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        msg:'hello vue'
      }
    }
  }
</script>
