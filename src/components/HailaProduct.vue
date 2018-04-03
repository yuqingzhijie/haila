<template>
  <li class="haila-product-item">
    <img v-bind:src="'./../../static/imgs/'+productItem.place+'.png'" class="product-country">
    <router-link v-bind:to="{path:'product',query:{'productId':productItem._id}}">
      <img v-bind:src="'./../../'+productItem.picture" class="product-pic">
    </router-link>
    <div class="product-info">
      <span class="product-name">{{productItem.title}}</span>
      <div class="product-box">
        <div class="product-price-box">
          <span class="product-price-title">价格</span>
          <span class="product-price-now">￥{{productItem.priceNow}}</span>
          <span class="product-price-old">￥{{productItem.priceOld}}</span>
        </div>
        <a href="javascript:void(0)" class="btn-add-cart product-add-cart" @click="addCart(productItem._id)">加入购物车</a>
      </div>
    </div>
  </li>
</template>

<script>
  import axios from 'axios';
  export default {
    props: ['productItem'],
    data () {
      return {
      }
    },
    mounted() {
    },
    methods: {
      addCart(productId) {
        axios.post('/cart/add', {
          productId: productId,
          number: 1
        }).then((res) => {
          if (res.data.status == '1') {
            this.$emit("suc");
          }
        });
      }
    }
  }
</script>