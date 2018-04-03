<template>
  <div class="haila-search">
    <div class="container">
      <a href="/" id="btn-home">
        <img src="./../../static/imgs/logo.png">
      </a>
      <div class="haila-search-box">
        <input type="text" v-model="content" name="searchContent" placeholder="施华洛世奇" @keyup.enter="search">
        <a href="javascript:void(0)" @click="search" id="btn-search">搜索</a>
      </div>
      <div class="haila-search-cart">
        <div>
          <span>2</span>
          <router-link :to="{path: 'cart'}" id="btn-cart">
            <img src="./../../static/imgs/cart.png">
          </router-link>
        </div>
        <span>购物车</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      content: ""
    }
  },
  methods: {
    search: function() {
      this.$router.push({path: 'SearchList', query: {keyword: this.content}})
    }
  }
}
</script>