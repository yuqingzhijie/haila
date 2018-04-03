<template>
  <div id="search" class="search">
    <haila-header></haila-header>
    <haila-search></haila-search>
    <haila-navbar></haila-navbar>
    <div class="haila-banner">
      <img src="./../../static/imgs/海拉.png">
    </div>
    <div class="haila-product">
      <div class="container">
        <div class="haila-list" id="baby">
          <div class="haila-list-header">
            <h2>搜索结果</h2>
          </div>
          <div class="haila-list-content">
            <ul class="haila-product-list">
              <!-- <li class="haila-product-item" v-for="item in list">
                <img v-bind:src="'./../../static/imgs/'+item.place+'.png'" class="product-country">
                <router-link v-bind:to="{path:'product',query:{'productId':item._id}}">
                  <img v-bind:src="'./../../'+item.picture" class="product-pic">
                </router-link>
                <div class="product-info">
                  <span class="product-name">{{item.title}}</span>
                  <div class="product-box">
                    <div class="product-price-box">
                      <span class="product-price-title">价格</span>
                      <span class="product-price-now">￥{{item.priceNow}}</span>
                      <span class="product-price-old">￥{{item.priceOld}}</span>
                    </div>
                    <a href="javascript:void(0)" class="btn-add-dart product-add-cart" @click="addCart(item._id)">加入购物车</a>
                  </div>
                </div>
              </li> -->
              <haila-product v-for="item in list" :productItem="item" :key="item._id" @suc="showModal"></haila-product>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Modal :mdShow="modalConfirm" @close="closeModal">
      <p slot="message">{{tip}}</p>
      <div slot="btnGroup">
        <a class="btn btn-left" href="javascript:;" @click="closeModal">继续购物</a>
        <a class="btn btn-right" href="javascript:;" @click="goCart">查看购物车</a>
      </div>
    </Modal>
    <haila-footer></haila-footer>
  </div>
</template>

<script>
  import './../assets/css/index.css';
  import './../assets/css/reset.css';
  import './../assets/css/modal.css';
  import HailaHeader from './../components/header.vue';
  import HailaSearch from './../components/search.vue';
  import HailaFooter from './../components/footer.vue';
  import HailaNavbar from './../components/navbar.vue';
  import Modal from './../components/modal.vue';
  import HailaProduct from './../components/HailaProduct.vue';
  import axios from 'axios';
  export default {
    data () {
      return {
        /************************************
        list            搜索列表
        *************************************/
        category: "",
        list: [],
        tip: "加入成功",
        modalConfirm: false
      }
    },
    components: {
      HailaHeader,
      HailaSearch,
      HailaFooter,
      HailaNavbar,
      Modal,
      HailaProduct
    },
    mounted() {
      this.getList();
    },
    watch: {
      '$route' (val) {
        this.getList();
      }
    },
    methods: {
      getList() {
        var keyword = this.$route.query.keyword;
        var param = {
          page: 1,
          pageSize: 16,
          sort: 1,
          keyword: keyword
        }
        axios.get("/product/search", {params: param}).then((res) => {
          var response = res.data;
          if (response.status == "0") {
            alert("对不起, 服务器维修中");
          }
          else {
            this.list = response.result;
          }
        });
      },
      showModal() {
        this.modalConfirm = true;
      },
      closeModal() {
        this.modalConfirm = false;
      },
      goCart() {
        this.$router.push('cart');
      }
    }
  }
</script>
